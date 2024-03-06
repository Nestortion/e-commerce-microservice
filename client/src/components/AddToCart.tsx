import { useUser } from "@clerk/clerk-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { buttonStyles } from "./ui/Button";
import { fontStyles } from "./ui/Font";
import Swal from "sweetalert2";
import { MouseEvent } from "react";

type AddToCartPayload = {
  customerID: string;
  productUUID: string;
  productQuantity: number;
};

type Product = {
  productName: string;
  productDescription: string;
  productPrice: number;
  productUUID: string;
};

function AddToCart({
  productUUID,
  productQuantity,
}: {
  productUUID: string;
  productQuantity?: number;
}) {
  const { user } = useUser();

  const queryClient = useQueryClient();

  const addtoCartMutation = useMutation({
    mutationKey: ["addToCart"],
    mutationFn: async (payload: AddToCartPayload) => {
      const response = await fetch("http://localhost:5000/addToCart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) throw new Error(response.statusText);

      const addToCartData = (await response.json()) as Promise<{
        product: Product;
      }>;

      return addToCartData;
    },
    onSuccess: (data) => {
      queryClient.setQueryData(
        ["cartItems", { customerID: user!.id }],
        (oldData: { productsInCart: Array<Product> }) => {
          return { productsInCart: [...oldData.productsInCart, data.product] };
        }
      );
    },
    onError: (error) => {
      Swal.fire({
        title: "Oh no!",
        text: error.message,
        icon: "error",
        cancelButtonText: "Continue",
      });
    },
  });

  const handleAddToCart = (e: MouseEvent) => {
    e.stopPropagation();
    addtoCartMutation.mutate({
      customerID: user!.id,
      productUUID,
      productQuantity: productQuantity ? productQuantity : 1,
    });
    Swal.fire({
      title: "Hooray!",
      icon: "success",
      text: "Product Added to Cart!",
      confirmButtonText: "Continue Browsing",
    });
  };

  return (
    <div className="self-center">
      <div
        className={` ${fontStyles({
          intent: "Button",
        })} ${buttonStyles({ intent: "primary" })}`}
        onClick={handleAddToCart}
      >
        Add to Cart
      </div>
    </div>
  );
}

export default AddToCart;
