import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRef, useState } from "react";
import { RiImageAddFill } from "react-icons/ri";
import { buttonStyles } from "./ui/Button";
import { fontStyles } from "./ui/Font";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { IoIosWarning } from "react-icons/io";
import { BsEmojiSunglasses } from "react-icons/bs";

type Product = {
  productName: string;
  productDescription: string;
  productPrice: number;
  productUUID: string;
};

function AddProduct() {
  const [productName, setProductName] = useState<string>("");
  const [productDescription, setProductDescription] = useState<string>("");
  const [productPrice, setProductPrice] = useState<number>(0);
  const [productImage, setProductImage] = useState<File | null>(null);
  const [productAdded, setProductAdded] = useState<boolean>(false);
  const [productError, setProductError] = useState<{
    onError: boolean;
    errorTitle: string;
    errorMessage: string;
  }>({
    onError: false,
    errorTitle: "",
    errorMessage: "",
  });
  const imageInputRef = useRef<HTMLInputElement>(null);

  const queryClient = useQueryClient();

  const addProduct = useMutation({
    mutationKey: ["addProduct"],

    mutationFn: async (newProduct: FormData) => {
      const response = await fetch("http://localhost:5000/addProduct", {
        method: "POST",
        body: newProduct,
      });
      const addProductData = (await response.json()) as Promise<Product>;
      return addProductData;
    },
    onSuccess: () => {
      queryClient.refetchQueries({ queryKey: ["products"] });
    },
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    setProductImage(e.target.files[0]);
  };

  const handleImageClick = () => {
    imageInputRef?.current?.click();
  };

  const handleAddProduct = () => {
    if (
      productName === "" ||
      productDescription === "" ||
      productPrice === 0 ||
      !productImage
    ) {
      setProductError({
        onError: true,
        errorTitle: "An input is missing!",
        errorMessage: "Please fill all corresponding fields!",
      });
      setTimeout(() => {
        setProductError({
          onError: false,
          errorTitle: "",
          errorMessage: "",
        });
      }, 2000);
      return;
    }

    const fd = new FormData();
    fd.append("productImage", productImage as File);
    fd.append("productName", productName);
    fd.append("productDescription", productDescription);
    fd.append("productPrice", String(productPrice));

    try {
      addProduct.mutate(fd);
      setProductAdded(true);
      setTimeout(() => {
        setProductAdded(false);
      }, 2000);

      setProductDescription("");
      setProductImage(null);
      setProductName("");
      setProductPrice(0);
    } catch (error) {
      setProductError({
        onError: true,
        errorTitle: (error as Error).name,
        errorMessage: (error as Error).message,
      });
      setTimeout(() => {
        setProductError({
          onError: false,
          errorTitle: "",
          errorMessage: "",
        });
      }, 2000);
    }
  };

  return (
    <div className="relative flex justify-center items-center gap-5 min-h-[85vh]">
      <Alert
        variant={"destructive"}
        className={`${
          productError.onError ? "opacity-100 top-0" : "opacity-0  top-[-2rem]"
        } absolute w-[50vw] duration-300 ease-in bg-rose-300`}
      >
        <IoIosWarning />
        <AlertTitle>{productError.errorTitle}</AlertTitle>
        <AlertDescription>{productError.errorMessage}</AlertDescription>
      </Alert>
      <Alert
        className={`${
          productAdded ? "opacity-100" : "opacity-0"
        } absolute top-0 w-[50vw] duration-300 ease-in`}
      >
        <BsEmojiSunglasses />
        <AlertTitle>Hooray!</AlertTitle>
        <AlertDescription>{`Product ${productName} successfully added!`}</AlertDescription>
      </Alert>
      <div className="flex flex-col gap-5 justify-center items-center w-[50vw] h-[70vh] bg-zinc-100 rounded-md">
        <div
          className={`${fontStyles({
            intent: "HeadersContent",
            class: "text-5xl text-cyan-400",
          })}`}
        >
          Add a new Product
        </div>
        <div className="flex justify-center  gap-10 w-full">
          <div
            className="flex justify-center items-center w-80 h-80 bg-cyan-200 rounded-md overflow-hidden p-3 hover:cursor-pointer"
            onClick={handleImageClick}
          >
            {productImage ? (
              <img src={URL.createObjectURL(productImage as File)} alt="" />
            ) : (
              <RiImageAddFill className="text-zinc-100 w-40 h-40" />
            )}
          </div>
          <input
            className="hidden"
            type="file"
            name=""
            ref={imageInputRef}
            id=""
            accept="image/jpg, image/jpeg, image/png"
            onChange={handleImageChange}
          />
          <div className={`flex flex-col gap-3 `}>
            <div className="flex flex-col gap-1">
              <label
                className={`${fontStyles({
                  intent: "addProductLabel",
                })}`}
              >
                Product Name
              </label>
              <input
                type="text"
                name=""
                id=""
                value={productName}
                className="appearance-none rounded-md border-4 border-cyan-200 w-80 focus:outline-none focus:placeholder:opacity-0 h-10 pl-2"
                onChange={(e) => setProductName(e.target.value)}
                placeholder="Product Name"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label
                className={`${fontStyles({
                  intent: "addProductLabel",
                })}`}
              >
                Product Description
              </label>
              <textarea
                value={productDescription}
                onChange={(e) => setProductDescription(e.target.value)}
                className="appearance-none rounded-md border-4 border-cyan-200 w-80 focus:outline-none h-32 resize-none focus:placeholder:opacity-0 pl-2"
                placeholder="Product Description"
              ></textarea>
            </div>
            <div className="flex flex-col gap-1">
              <label
                className={`${fontStyles({
                  intent: "addProductLabel",
                })}`}
              >
                Product Price
              </label>
              <input
                type="number"
                value={productPrice}
                name=""
                id=""
                className="appearance-none rounded-md border-4 border-cyan-200 w-80 focus:outline-none focus:placeholder:opacity-0 h-10 pl-2"
                onChange={(e) => setProductPrice(parseInt(e.target.value))}
                placeholder="Product Price in ₱"
              />
            </div>
          </div>
        </div>
        <button
          className={`${buttonStyles({ intent: "primary" })}`}
          type="button"
          onClick={handleAddProduct}
        >
          Add Product
        </button>
      </div>
    </div>
  );
}

export default AddProduct;
