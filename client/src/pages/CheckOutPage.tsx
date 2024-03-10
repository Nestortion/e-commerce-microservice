import { fontStyles } from "@/components/ui/Font";
import { useUser } from "@clerk/clerk-react";
import { useQuery } from "@tanstack/react-query";
import gcashLogo from "../assets/gcash.svg";
import { FaCreditCard, FaPaypal } from "react-icons/fa";
import { buttonStyles } from "@/components/ui/Button";

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

function CheckOutPage() {
  const { user } = useUser();

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
              placeholder="eg. myemail@email.com"
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
              placeholder="9*********"
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
            />
          </div>
          <div
            className={`flex gap-2
          ${fontStyles({
            intent: "CheckOutPageSub",
          })}`}
          >
            <input type="checkbox" />
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
            <input type="radio" name="payment" />
          </div>
          <div className="flex items-center justify-between gap-2 px-4 py-2 border-l-2 border-r-2 border-gray-300">
            <div className="flex items-center gap-4">
              <FaPaypal size={40} />
              PayPal
            </div>
            <input type="radio" name="payment" />
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
            <input type="radio" name="payment" />
          </div>
        </div>
        <div
          className={`flex justify-center items-center h-16 ${fontStyles({
            intent: "CheckOutButton",
          })} ${buttonStyles({ intent: "primary" })}`}
        >
          Place Order
        </div>
      </div>
    </div>
  );
}

export default CheckOutPage;
