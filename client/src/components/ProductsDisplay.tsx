import { keepPreviousData, useQuery } from "@tanstack/react-query";
import AddToCart from "./AddToCart";
import { fontStyles } from "./ui/Font";
import { GrFormPrevious, GrFormNext } from "react-icons/gr";
import { buttonStyles } from "./ui/Button";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export type ProductList = {
  productList: Array<{
    productName: string;
    productUUID: string;
    productDescription: string;
    productPrice: number;
    productImage: string;
  }>;
};

function ProductsDisplay() {
  const [page, setPage] = useState<number>(0);
  const navigate = useNavigate();

  const { data, isSuccess } = useQuery({
    queryKey: ["products", page],
    queryFn: async () => {
      const result = await fetch(`http://localhost:5000/products/${page}`);
      return result.json() as Promise<ProductList>;
    },
    placeholderData: keepPreviousData,
  });

  const handlePrevButton = () => {
    if (page <= 0) return;
    setPage(page - 1);
  };

  const handleNextButton = () => {
    if (!isSuccess) return;
    if (data.productList.length < 10) return;
    setPage(page + 1);
  };

  const handleProductClick = (productUUID: string) => {
    navigate(`/product/${productUUID}`);
  };

  return (
    <div className="flex flex-col gap-5 min-h-[85vh]">
      <span
        className={`py-10 flex justify-center self-start w-full ${fontStyles({
          intent: "HeadersContent",
        })}`}
      >
        Available Products
      </span>
      <div className="flex flex-wrap gap-10 justify-center ">
        {isSuccess &&
          data.productList.map((product) => (
            <div
              className="flex flex-col gap-2"
              key={product.productUUID}
              onClick={() => {
                handleProductClick(product.productUUID);
              }}
            >
              <div
                className={`  bg-zinc-100 p-2  min-h-72 xl:min-h-80 2xl:min-h-96 shadow-md overflow-hidden rounded-md shadow-cyan-200 hover:scale-[1.05] hover:ease-in duration-200 hover:cursor-pointer hover:shadow-cyan-400 hover:shadow-lg hover:-translate-y-2 ${fontStyles(
                  { intent: "Label" }
                )}`}
              >
                <div className="flex flex-col h-full ">
                  <div className="mb-2">
                    <img
                      className="flex justitfy center h-48 w-48 rounded-md xl:h-56 xl:w-56 2xl:h-72 2xl:w-72"
                      src={`http://localhost:5000/${product.productImage}`}
                      alt="http://localhost:5000/default-image.png"
                    />
                  </div>
                  <div className="flex justify-between h-full">
                    <div className=" flex flex-col justify-evenly">
                      <div className=" max-w-24 xl:max-w-32 2xl:max-w-40 line-clamp-2 leading-5">
                        {product.productName}
                      </div>
                      <div>₱{product.productPrice}</div>
                    </div>
                    <AddToCart productUUID={product.productUUID} />
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>
      <div className="w-full mt-auto flex justify-center items-center my-5 gap-5">
        <GrFormPrevious
          onClick={handlePrevButton}
          className={`w-8 h-8 ${buttonStyles({ intent: "primary" })}`}
        />
        <div className={`${fontStyles({ intent: "HeadersContent" })}`}>
          {page + 1}
        </div>
        <GrFormNext
          onClick={handleNextButton}
          className={`w-8 h-8 ${buttonStyles({ intent: "primary" })}`}
        />
      </div>
    </div>
  );
}

export default ProductsDisplay;
