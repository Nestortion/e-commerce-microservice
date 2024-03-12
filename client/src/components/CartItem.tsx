import { FaMinus, FaPlus, FaTrash } from "react-icons/fa";
import { fontStyles } from "./ui/Font";
import { useEffect, useState } from "react";
import { buttonStyles } from "./ui/Button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useUser } from "@clerk/clerk-react";
import Swal from "sweetalert2";

type Product = {
  productName: string;
  productPrice: number;
  productDescription: string;
  productUUID: string;
  productImage: string;
  productQuantity: number;
};

type RemoveCartItemPayload = {
  productUUID: string;
  customerID: string;
};

type UpdateCartItemQuantityPayload = {
  productUUID: string;
  customerID: string;
  productQuantity: number;
};

function CartItem({ product }: { product: Product }) {
  const [productQuantity, setProductQuantity] = useState<number>(
    product.productQuantity
  );
  const [allowSave, setAllowSave] = useState<boolean>(true);

  const queryClient = useQueryClient();
  const { user } = useUser();

  useEffect(() => {
    if (productQuantity !== product.productQuantity) setAllowSave(false);
    else setAllowSave(true);
  }, [productQuantity]);

  const updateCartItemQuantity = useMutation({
    mutationKey: ["updateCartItemQuantity"],
    mutationFn: async (payload: UpdateCartItemQuantityPayload) => {
      const updateResponse = await fetch("http://localhost:5000/cartItem", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!updateResponse.ok) throw new Error("Error updating quantity!");

      const data = (await updateResponse.json()) as Promise<{
        productUUID: string;
        productQuantity: number;
      }>;

      return data;
    },
    onSuccess: (data) => {
      queryClient.setQueryData(
        ["cartItems", { customerID: user!.id }],
        (oldData: { productsInCart: Array<Product> }) => {
          const productsInCart = oldData.productsInCart.map((product) => {
            if (product.productUUID === data.productUUID) {
              return {
                ...product,
                productQuantity: data.productQuantity,
              };
            } else return product;
          });

          return { productsInCart };
        }
      );
      setAllowSave(true);
      Swal.fire({
        title: "Yey!",
        icon: "success",
        text: "Item quantity updated!",
        confirmButtonText: "Continue",
      });
    },
    onError: (err) => {
      Swal.fire({
        title: "Oh no!",
        text: err.message,
        icon: "error",
        cancelButtonText: "Continue",
      });
    },
  });

  const removeCartItem = useMutation({
    mutationKey: ["removeCartItem"],
    mutationFn: async (payload: RemoveCartItemPayload) => {
      const removeResponse = await fetch("http://localhost:5000/cartItem", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!removeResponse.ok) throw new Error("Error removing item from cart!");

      const data = (await removeResponse.json()) as Promise<{
        productUUID: string;
      }>;

      return data;
    },
    onSuccess: (data) => {
      queryClient.setQueryData(
        ["cartItems", { customerID: user!.id }],
        (oldData: { productsInCart: Array<Product> }) => {
          const productsInCart = oldData.productsInCart.filter(
            (products) => products.productUUID !== data.productUUID
          );

          return { productsInCart };
        }
      );
      Swal.fire({
        title: "Cool!",
        icon: "success",
        text: "Product Removed from Cart!",
        confirmButtonText: "Continue",
      });
    },
    onError: (err) => {
      Swal.fire({
        title: "Oh no!",
        text: err.message,
        icon: "error",
        cancelButtonText: "Continue",
      });
    },
  });

  const handleIncrementQuantity = () => {
    if (productQuantity >= 99) return;
    setProductQuantity(productQuantity + 1);
  };
  const handleDecrementQuantity = () => {
    if (productQuantity <= 1) return;
    setProductQuantity(productQuantity - 1);
  };

  const handleDelete = () => {
    removeCartItem.mutate({
      customerID: user!.id,
      productUUID: product.productUUID,
    });
  };

  const handleUpdateCartItemQuantity = () => {
    updateCartItemQuantity.mutate({
      customerID: user!.id,
      productQuantity,
      productUUID: product.productUUID,
    });
  };

  return (
    <div
      className={`flex w-full py-1 border-b-zinc-300 border-b-2 ${fontStyles({
        intent: "CartLabel",
      })} `}
    >
      <div className="flex gap-2 items-center">
        <div className="overflow-hidden rounded-md flex-1 h-16 w-16">
          <img
            className="h-20 w-20"
            src={`http://localhost:5000/${product.productImage}`}
          />
        </div>
        <div className="flex flex-col w-24">
          <div className="line-clamp-2" title={`${product.productName}`}>
            {product.productName}
          </div>
          <div className="w-16 flex items-center">₱{product.productPrice}</div>
        </div>
      </div>
      <div className="flex-1 flex items-center justify-between gap-1">
        <div className="w-5 ml-5">x{productQuantity}</div>
        <div className="flex flex-col justify-center items-center gap-1">
          <div className="flex gap-1">
            <div
              className="p-1 bg-cyan-200 rounded-md text-white text-xs"
              onClick={handleDecrementQuantity}
            >
              <FaMinus />
            </div>
            <div
              className="p-1 bg-cyan-200 rounded-md text-white text-xs"
              onClick={handleIncrementQuantity}
            >
              <FaPlus />
            </div>
          </div>
          <button
            disabled={allowSave}
            onClick={handleUpdateCartItemQuantity}
            className={`text-center disabled:cursor-pointer disabled:opacity-30 disabled:hover:cursor-default ${buttonStyles(
              {
                intent: "secondary",
                class: "py-0",
              }
            )}`}
          >
            save
          </button>
        </div>

        <div
          className={`${buttonStyles({
            intent: "warning",
          })} text-white text-sm`}
          onClick={handleDelete}
        >
          <FaTrash />
        </div>
      </div>
    </div>
  );
}

export default CartItem;
