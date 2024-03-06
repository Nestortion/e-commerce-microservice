import { useParams } from "react-router-dom";
import { fontStyles } from "../components/ui/Font";
import { useState } from "react";
import { FaPlus, FaMinus } from "react-icons/fa";
import { buttonStyles } from "../components/ui/Button";
import { TbTruckDelivery } from "react-icons/tb";
import { IoShieldCheckmarkOutline } from "react-icons/io5";
import AddToCart from "../components/AddToCart";
import { useQuery } from "@tanstack/react-query";

type Product = {
  product: {
    productName: string;
    productUUID: string;
    productDescription: string;
    productPrice: number;
    productImage: string;
  };
  stocksLeft: number;
  productStatus: string;
};

function ProductPage() {
  const { productID } = useParams();
  const [productQuantity, setProductQuantity] = useState<number>(1);

  const { data, isSuccess } = useQuery({
    queryKey: ["products", { productID }],
    queryFn: async () => {
      const res = await fetch(`http://localhost:5000/product/${productID}`);

      return res.json() as Promise<Product>;
    },
  });

  return (
    <div className={`min-h-[85vh] flex justify-center items-center  `}>
      <div className="bg-zinc-100 w-[50%] max-h-[70vh] rounded-md shadow-sm">
        {isSuccess && (
          <div
            className="flex flex-col gap-2 p-5"
            key={data.product.productUUID}
          >
            <div className="flex">
              <div className=" flex-shrink-0 rounded-md h-64 overflow-hidden">
                <img
                  src={`http://localhost:5000/${data.product.productImage}`}
                  className=" aspect-square h-64 object-cover"
                />
              </div>

              <div
                className={`flex-1 flex flex-col gap-4 h-fit ${fontStyles({
                  intent: "ProductPage",
                })}`}
              >
                <div className=" flex">
                  <div className="flex flex-col justify-between px-5 ">
                    <div>
                      <div className="line-clamp-4 max-w-80">
                        {data.product.productName}
                      </div>
                      <div>₱{data.product.productPrice}</div>
                    </div>
                    <div className="flex flex-col gap-2">
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <div className="mr-8">Quantity</div>
                        <div className="flex gap-1 items-center">
                          <FaMinus
                            className="hover:cursor-pointer"
                            onClick={() => {
                              if (productQuantity <= 1) return;
                              setProductQuantity(productQuantity - 1);
                            }}
                          />
                          {productQuantity}
                          <FaPlus
                            className="hover:cursor-pointer"
                            onClick={() => {
                              if (productQuantity >= 99) return;
                              setProductQuantity(productQuantity + 1);
                            }}
                          />
                        </div>
                        <div className=" self-end">{data.stocksLeft} Left</div>
                      </div>
                      <div className="flex gap-3 w-full">
                        <div
                          className={`${buttonStyles({
                            intent: "secondary",
                          })}} ${fontStyles({ intent: "Button" })}`}
                        >
                          Buy Now
                        </div>
                        <AddToCart
                          productUUID={productID as string}
                          productQuantity={productQuantity}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="flex-1 text-base h-[60%]">
                    <div className="border-b-2 pb-2 border-gray-500">
                      <div className="flex gap-2 items-center">
                        <TbTruckDelivery />
                        Delivery Options
                      </div>
                      <div className="ml-4">
                        <div className="flex text-gray-500">
                          <div className="flex-1">Drone Delivery</div>
                          <div className="basis-1/2">1-2 days</div>
                        </div>
                        <div className="flex text-gray-500">
                          <div className="flex-1">Courier Delivery</div>
                          <div className="basis-1/2">1-2 weeks</div>
                        </div>
                        <div className="flex text-gray-500">
                          <div className="flex-1">Express Delivery</div>
                          <div className="basis-1/2">1 day guaranteed</div>
                        </div>
                      </div>
                    </div>

                    <div>
                      <div className="flex gap-2 items-center mt-2">
                        <IoShieldCheckmarkOutline />
                        Warranty
                      </div>
                      <div className="flex text-gray-500">
                        <div className="flex-1 flex justify-center">1 Year</div>
                        <div className="flex-1 flex justify-center">
                          6 Months
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div
              className={`indent-8 h-[35vh] w-full overflow-y-auto text-justify ${fontStyles(
                { intent: "ProductPageDescription" }
              )}`}
            >
              {data.product.productDescription.split("\n").map((par, index) => (
                <p key={index}>
                  {par}
                  <br />
                </p>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProductPage;
