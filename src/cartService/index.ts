import * as grpc from "@grpc/grpc-js";
import { cartPackage } from "./cartPackage.js";
import { cartDB } from "./db.js";
import { cart, cartItems } from "./cartSchema.js";
import { CartRequest, Product, ViewCartRequest } from "./cart.pb.js";
import { sql } from "drizzle-orm";
import crypto from "crypto";
import { ProductList } from "../ProductService/product.pb.js";
import { ProductServiceClient } from "../ProductService/productServiceClient.js";

const server = new grpc.Server();

type AddToCartRequest = {
  request: CartRequest;
};

type CheckCartRequest = {
  request: ViewCartRequest;
};

type CustomerCart = {
  customerID: string;
  cartID: number;
  cartUUID: string;
};

const checkCustomerCart = async (customerID: string): Promise<CustomerCart> => {
  let customerCart = await cartDB
    .select()
    .from(cart)
    .where(sql`${cart.customerID} = ${customerID}`);

  const cartUUID = crypto.randomUUID();

  if (!customerCart[0]) {
    customerCart = await cartDB
      .insert(cart)
      .values({ customerID, cartUUID })
      .returning();
  }

  return customerCart[0];
};

const addToCart = async ({ request }: AddToCartRequest, callback: Function) => {
  const { productUUID, customerID } = request;

  const customerCart = await checkCustomerCart(customerID);

  const checkExisting = await cartDB.query.cartItems.findFirst({
    where: (cartItems, { eq, and }) =>
      and(
        //@ts-ignore
        eq(cartItems.productUUID, productUUID),
        //@ts-ignore
        eq(cartItems.cartUUID, customerCart.cartUUID)
      ),
  });

  if (checkExisting) throw new Error("Product already in Cart!");

  await cartDB.insert(cartItems).values({
    cartUUID: customerCart.cartUUID,
    productUUID,
  });

  ProductServiceClient.viewProductsById(
    {
      productUUID: [productUUID],
    },
    (err: Error, response: ProductList) => {
      if (err) throw err;

      if (
        typeof response === "object" &&
        response &&
        "productList" in response &&
        Array.isArray(response.productList)
      ) {
        callback(null, {
          productName: response.productList[0].productName,
          productDescription: response.productList[0].productDescription,
          productUUID: response.productList[0].productUUID,
          productPrice: response.productList[0].productPrice,
          productImage: response.productList[0].productImage,
        });
      } else {
        throw new Error("Response in undefined");
      }
    }
  );
};

const viewCart = async ({ request }: CheckCartRequest, callback: Function) => {
  const { customerID } = request;

  const cart = await checkCustomerCart(customerID);

  const currentCartItems = await cartDB.query.cartItems.findMany({
    //@ts-ignore
    where: (cartItems, { eq }) => eq(cartItems.cartUUID, cart!.cartUUID),
  });

  ProductServiceClient.viewProductsById(
    {
      productUUID: currentCartItems.map((cartItem) => cartItem.productUUID),
    },
    (err: Error, response: ProductList) => {
      if (err) throw err;

      const productsInCart = response.productList?.map((product) => {
        const cartItem = currentCartItems.find(
          (cart) => cart.productUUID === product.productUUID
        );

        return {
          ...product,
          productQuantity: cartItem?.productQuantity,
        };
      });

      callback(null, {
        productsInCart,
      });
    }
  );
};
//@ts-ignore
server.addService(cartPackage.CartService.service, {
  addToCart,
  viewCart,
});

server.bindAsync(
  "localhost:5011",
  grpc.ServerCredentials.createInsecure(),
  (err) => {
    if (err) throw err;
    console.log("Cart service is running");
    server.start();
  }
);
