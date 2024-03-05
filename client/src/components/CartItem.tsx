import { FaMinus, FaPlus, FaTrash } from "react-icons/fa";
import { fontStyles } from "./ui/Font";
import { useState } from "react";
import { buttonStyles } from "./ui/Button";

type Product = {
  productName: string;
  productPrice: number;
  productDescription: string;
  productUUID: string;
  productImage: string;
  productQuantity: number;
};

function CartItem({ product }: { product: Product }) {
  const [productQuantity, setProductQuantity] = useState<number>(
    product.productQuantity
  );

  const handleIncrementQuantity = () => {
    setProductQuantity(productQuantity + 1);
  };
  const handleDecrementQuantity = () => {
    if (productQuantity <= 0) return;
    setProductQuantity(productQuantity - 1);
  };

  return (
    <div
      className={`flex w-full py-1 ${fontStyles({
        intent: "CartLabel",
      })} `}
      key={product.productUUID}
    >
      <div className="flex gap-2 items-center">
        <div className="overflow-hidden rounded-md flex-1">
          <img
            className="h-20 w-20"
            src={`http://localhost:5000/${product.productImage}`}
          />
        </div>
        <div className="flex flex-col w-32">
          <div className="line-clamp-2" title={`${product.productName}`}>
            {product.productName}
          </div>
          <div className="w-16 flex items-center">₱{product.productPrice}</div>
        </div>
      </div>
      <div className="flex-1 flex gap-1 items-center justify-center">
        <div>x{productQuantity}</div>
        <div className="flex flex-col gap-1">
          <div
            className="p-1 bg-cyan-200 rounded-md text-white text-xs"
            onClick={handleIncrementQuantity}
          >
            <FaPlus />
          </div>
          <div
            className="p-1 bg-cyan-200 rounded-md text-white text-xs"
            onClick={handleDecrementQuantity}
          >
            <FaMinus />
          </div>
        </div>
        <div className={`${buttonStyles({ intent: "warning" })} text-white`}>
          <FaTrash />
        </div>
      </div>
    </div>
  );
}

export default CartItem;
