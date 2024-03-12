import { useUser } from "@clerk/clerk-react";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { FaCartShopping } from "react-icons/fa6";
import { fontStyles } from "./ui/Font";
import CartItem from "./CartItem";
import { useNavigate } from "react-router-dom";

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

function Cart() {
  const { user } = useUser();
  const navigate = useNavigate();
  const [showCart, setShowCart] = useState<boolean>(false);

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

  const handleProceedCheckOut = () => {
    navigate("/checkOut");
  };

  return (
    <div className="relative  hover:cursor-pointer h-full px-4 hover:bg-cyan-300 ease-in duration-300">
      <div
        onClick={() => {
          setShowCart(!showCart);
        }}
        className="relative flex gap-2 items-center h-full"
      >
        <FaCartShopping className=" w-8 h-8  text-white" />
        View Cart
        {isSuccess && data.productsInCart.length > 0 && (
          <div className="absolute top-4 flex justify-center items-center left-4 p-2 bg-rose-500 rounded-full text-sm h-6 w-6">
            {data.productsInCart.length}
          </div>
        )}
      </div>
      {showCart && (
        <div className="absolute top-auto right-0 flex flex-col items-center w-80 h-[30rem] z-1000 rounded-md shadow-sm">
          <div
            className={`${fontStyles({
              intent: "CartHeader",
            })} flex justify-center items-center sticky top-0 w-full bg-cyan-300 rounded-t-md`}
          >
            Your Current Cart
          </div>
          <div className="w-full overflow-y-auto px-2 bg-zinc-100">
            {isSuccess &&
              data.productsInCart.map((product) => (
                <CartItem product={product} key={product.productUUID} />
              ))}
          </div>

          <div className="flex justify-evenly bg-zinc-100 items-center sticky bottom-0 hover:cursor-pointer w-full rounded-b-md py-2">
            <div
              className={`bg-emerald-400 ${fontStyles({
                intent: "Button",
              })}  p-2 rounded-md`}
              onClick={handleProceedCheckOut}
            >
              Proceed to CheckOut
            </div>
            <div
              className={` ${fontStyles({
                intent: "Button",
              })}  bg-cyan-400 p-2 rounded-md`}
              onClick={() => setShowCart(!showCart)}
            >
              Close Cart
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;
