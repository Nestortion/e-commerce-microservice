import { fontStyles } from "@/components/ui/Font";
import { useUser } from "@clerk/clerk-react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import gcashLogo from "../assets/gcash.svg";
import { FaCreditCard, FaPaypal } from "react-icons/fa";
import { buttonStyles } from "@/components/ui/Button";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const PAYMENT_OPTION = {
  GCASH: "GCASH",
  CARD: "CARD",
  PAYPAL: "PAYPAL",
} as const;

type CurrentCart = {
  productsInCart: Array<{
    productName: string;
    productPrice: number;
    productDescription: string;
    productUUID: string;
    productImage: string;
    productQuantity: number;
  }>;
};

type ObjectValues<T> = T[keyof T];

type PaymentOption = ObjectValues<typeof PAYMENT_OPTION>;

type OrderDetails = {
  customerID: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: number;
  address: string;
  city: string;
  zipCode: number;
  totalPrice: number;
  paymentOption: PaymentOption;
  sameBillAddress: boolean;
};

type OrderItem = {
  productUUID: string;
  productQuantity: number;
};

type CreateOrderPayload = {
  orderDetails: Omit<OrderDetails, "firstName" | "lastName"> & {
    customerName: string;
  };
  orderItems: Array<OrderItem>;
};

function CheckOutPage() {
  const { user } = useUser();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const [orderDetails, setOrderDetails] = useState<OrderDetails>({
    customerID: user!.id,
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: 0,
    address: "",
    city: "",
    zipCode: 0,
    totalPrice: 0,
    paymentOption: "CARD",
    sameBillAddress: false,
  });
  const [orderItems, setOrderItems] = useState<Array<OrderItem>>([]);

  const { data, isSuccess } = useQuery({
    queryKey: ["cartItems", { customerID: user!.id }],
    queryFn: async () => {
      const result = await fetch(
        `http://localhost:5000/viewCart/${user!.id}`,
        {}
      );
      return result.json() as Promise<CurrentCart>;
    },
  });

  const createOrder = useMutation({
    mutationKey: ["createOrder"],
    mutationFn: async (payload: CreateOrderPayload) => {
      const response = await fetch("http://localhost:5000/order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const createOrderData = response.json() as Promise<{ orderUUID: string }>;

      return createOrderData;
    },
    onSuccess: (data) => {
      queryClient.refetchQueries({
        queryKey: ["cartItems", { customerID: user!.id }],
      });
      Swal.fire({
        title: "Thank you for your order!",
        icon: "success",
        text: `Your order reference number is ${data.orderUUID}`,
        confirmButtonText: "Continue Browsing",
      });
      navigate("/");
    },
    onError: (error) => {
      Swal.fire({
        title: "Ah snap!",
        text: error.message,
        icon: "error",
        cancelButtonText: "Continue",
      });
    },
  });

  useEffect(() => {
    if (!isSuccess) return;

    const items = data.productsInCart.map((item) => {
      return {
        productUUID: item.productUUID,
        productQuantity: item.productQuantity,
      };
    });

    setOrderItems(items);
    setOrderDetails({
      ...orderDetails,
      totalPrice: data?.productsInCart.reduce(
        (acc, product) => acc + product.productPrice * product.productQuantity,
        0
      ),
    });
  }, [data]);

  const handleOrderDetailsChange = (e: any) => {
    if (e.target.name === "sameBillAddress") {
      setOrderDetails({
        ...orderDetails,
        [e.target.name]: !orderDetails.sameBillAddress,
      });
      return;
    }
    const { name, value } = e.target as HTMLInputElement;
    setOrderDetails({ ...orderDetails, [name]: value });
  };

  const handlePlaceOrder = () => {
    const {
      address,
      city,
      customerID,
      email,
      firstName,
      lastName,
      paymentOption,
      phoneNumber,
      sameBillAddress,
      totalPrice,
      zipCode,
    } = orderDetails;

    if (
      !address ||
      !city ||
      !email ||
      !firstName ||
      !lastName ||
      !paymentOption ||
      !phoneNumber ||
      !sameBillAddress ||
      !totalPrice ||
      !zipCode
    ) {
      Swal.fire({
        title: "Oops!",
        text: "Please fill out all the fields below!",
        icon: "error",
        cancelButtonText: "Continue",
      });
      return;
    }

    const orderDetailsReq: CreateOrderPayload["orderDetails"] = {
      address: address,
      city: city,
      customerID: customerID,
      customerName: `${firstName} ${lastName}`,
      email: email,
      paymentOption: paymentOption,
      phoneNumber: phoneNumber,
      sameBillAddress: sameBillAddress,
      totalPrice: totalPrice,
      zipCode: zipCode,
    };

    createOrder.mutate({ orderDetails: orderDetailsReq, orderItems });
  };

  return (
    <div className={`min-h-[85vh] flex justify-evenly pt-10`}>
      <div className="bg-zinc-100 w-[25%] max-h-[70vh] h-fit rounded-md shadow-sm p-4">
        <div
          className={`flex justify-center ${fontStyles({
            intent: "CheckOutPage",
          })}`}
        >
          1. Your Items
        </div>
        <div className="flex flex-col gap-2 max-h-96  overflow-y-scroll">
          {isSuccess &&
            data.productsInCart.map((product) => (
              <div
                className={`flex gap-3 items-center ${fontStyles({
                  intent: "CheckOutPageSub",
                })}`}
                key={product.productUUID}
              >
                <div className="rounded-md overflow-hidden">
                  <img
                    className="
                    w-20
                    object-fill
                    aspect-square
                  "
                    src={`http://localhost:5000/${product.productImage}`}
                    alt="http://localhost:5000/default-image.png"
                  />
                </div>
                <div className="flex-1 ">
                  <div>{product.productName}</div>
                  <div className="flex justify-between">
                    <div>Qty: {product.productQuantity}</div>
                    <div>
                      ₱{product.productPrice * product.productQuantity} PHP
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>
        <div
          className={`flex justify-between border-t-2 border-gray-300 mt-2 ${fontStyles(
            {
              intent: "CheckOutPage",
            }
          )}`}
        >
          <div>Total</div>
          <div>
            ₱
            {data?.productsInCart.reduce(
              (acc, product) =>
                acc + product.productPrice * product.productQuantity,
              0
            )}{" "}
            PHP
          </div>
        </div>
      </div>
      <div className="bg-zinc-100 w-[25%] max-h-[70vh] h-fit rounded-md shadow-sm p-4">
        <div
          className={`flex justify-center ${fontStyles({
            intent: "CheckOutPage",
          })}`}
        >
          2. Delivery Address
        </div>
        <div className="flex flex-col gap-1">
          <div
            className={`flex flex-col 
          gap-1
          ${fontStyles({
            intent: "CheckOutPageSub",
          })}`}
          >
            <label>First Name</label>
            <input
              className="appearance-none rounded-md border-4 border-cyan-200 focus:outline-none focus:placeholder:opacity-0 h-10 pl-2"
              type="text"
              name="firstName"
              onChange={handleOrderDetailsChange}
            />
          </div>
          <div
            className={`flex flex-col 
          gap-1
          ${fontStyles({
            intent: "CheckOutPageSub",
          })}`}
          >
            <label>Last Name</label>
            <input
              className="appearance-none rounded-md border-4 border-cyan-200 focus:outline-none focus:placeholder:opacity-0 h-10 pl-2"
              type="text"
              name="lastName"
              onChange={handleOrderDetailsChange}
            />
          </div>
          <div
            className={`flex flex-col 
          gap-1
          ${fontStyles({
            intent: "CheckOutPageSub",
          })}`}
          >
            <label>Email</label>
            <input
              className="appearance-none rounded-md border-4 border-cyan-200 focus:outline-none focus:placeholder:opacity-0 h-10 pl-2"
              type="email"
              name="email"
              placeholder="eg. myemail@email.com"
              onChange={handleOrderDetailsChange}
            />
          </div>
          <div
            className={`flex flex-col 
          gap-1
          ${fontStyles({
            intent: "CheckOutPageSub",
          })}`}
          >
            <label>Phone Number (+63)</label>
            <input
              className="appearance-none rounded-md border-4 border-cyan-200 focus:outline-none focus:placeholder:opacity-0 h-10 pl-2"
              type="text"
              maxLength={11}
              name="phoneNumber"
              placeholder="9*********"
              onChange={handleOrderDetailsChange}
            />
          </div>
          <div
            className={`flex flex-col 
          gap-1
          ${fontStyles({
            intent: "CheckOutPageSub",
          })}`}
          >
            <label>Address</label>
            <input
              className="appearance-none rounded-md border-4 border-cyan-200 focus:outline-none focus:placeholder:opacity-0 h-10 pl-2"
              type="text"
              placeholder="Block/Lot/Street/barangay"
              name="address"
              onChange={handleOrderDetailsChange}
            />
          </div>
          <div
            className={`flex flex-col 
          gap-1
          ${fontStyles({
            intent: "CheckOutPageSub",
          })}`}
          >
            <label>City</label>
            <input
              className="appearance-none rounded-md border-4 border-cyan-200 focus:outline-none focus:placeholder:opacity-0 h-10 pl-2"
              type="text"
              name="city"
              onChange={handleOrderDetailsChange}
            />
          </div>
          <div
            className={`flex flex-col 
          gap-1
          ${fontStyles({
            intent: "CheckOutPageSub",
          })}`}
          >
            <label>ZIP Code</label>
            <input
              className="appearance-none rounded-md border-4 border-cyan-200 focus:outline-none focus:placeholder:opacity-0 h-10 pl-2"
              type="text"
              name="zipCode"
              onChange={handleOrderDetailsChange}
            />
          </div>
          <div
            className={`flex gap-2
          ${fontStyles({
            intent: "CheckOutPageSub",
          })}`}
          >
            <input
              type="checkbox"
              name="sameBillAddress"
              onClick={handleOrderDetailsChange}
            />
            <label>Same billing address</label>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-4 bg-zinc-100 w-[25%] max-h-[70vh] rounded-md shadow-sm p-4 h-fit">
        <div
          className={`flex justify-center ${fontStyles({
            intent: "CheckOutPage",
          })}`}
        >
          3. Payment Options
        </div>
        <div className={`${fontStyles({ intent: "CheckOutPageSub" })}`}>
          <div className="flex items-center justify-between gap-2 px-4 py-2 border-2 border-gray-300">
            <div className="flex items-center gap-4">
              <FaCreditCard size={40} />
              <div>Card</div>
            </div>
            <input
              type="radio"
              name="paymentOption"
              value="CARD"
              checked
              onChange={handleOrderDetailsChange}
            />
          </div>
          <div className="flex items-center justify-between gap-2 px-4 py-2 border-l-2 border-r-2 border-gray-300">
            <div className="flex items-center gap-4">
              <FaPaypal size={40} />
              PayPal
            </div>
            <input
              type="radio"
              name="paymentOption"
              value="PAYPAL"
              onChange={handleOrderDetailsChange}
            />
          </div>
          <div className="flex items-center justify-between gap-2 px-4 py-2 border-2 border-gray-300">
            <div className="flex items-center gap-4">
              <div>
                <img
                  className="object-fill aspect-square w-10"
                  src={gcashLogo}
                />
              </div>
              <div>G-CASH</div>
            </div>
            <input
              type="radio"
              name="Option"
              value="GCASH"
              onClick={handleOrderDetailsChange}
            />
          </div>
        </div>
        <div
          className={`flex justify-center items-center h-16 ${fontStyles({
            intent: "CheckOutButton",
          })} ${buttonStyles({ intent: "primary" })}`}
          onClick={handlePlaceOrder}
        >
          Place Order
        </div>
      </div>
    </div>
  );
}

export default CheckOutPage;
