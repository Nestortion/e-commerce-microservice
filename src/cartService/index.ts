import * as grpc from "@grpc/grpc-js";
import { cartPackage } from "./cartPackage.js";
import { cartDB } from "./db.js";
import { cart, cartItems } from "./cartSchema.js";

import { sql } from "drizzle-orm";
import crypto from "crypto";
import { ProductServiceClient } from "../ProductService/productServiceClient.js";
import { CartServiceHandlers } from "./proto/cart/CartService.js";
import { RemoveCartItemRequest } from "./proto/cart/RemoveCartItemRequest.js";
import { RemoveCartItemResponse } from "./proto/cart/RemoveCartItemResponse.js";
import { ViewCartRequest__Output } from "./proto/cart/ViewCartRequest.js";
import { CurrentCart, CurrentCart__Output } from "./proto/cart/CurrentCart.js";
import { CartRequest__Output } from "./proto/cart/CartRequest.js";
import { Product__Output } from "./proto/cart/Product.js";

const server = new grpc.Server();

type CustomerCart = {
  cartID: number;
  cartUUID: string;
  customerID: string;
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

const addToCart = async (
  call: grpc.ServerUnaryCall<CartRequest__Output, Product__Output>,
  callback: grpc.sendUnaryData<Product__Output>
) => {
  const { productUUID, customerID, productQuantity } = call.request;

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

  if (checkExisting)
    callback({
      code: grpc.status.ALREADY_EXISTS,
      details: "Product Already in Cart!",
    });

  await cartDB.insert(cartItems).values({
    cartUUID: customerCart.cartUUID,
    productUUID,
    productQuantity,
  });

  ProductServiceClient.viewProductsById(
    {
      productUUID: [productUUID],
    },
    (err, response) => {
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
          productQuantity,
        });
      } else {
        throw new Error("Response in undefined");
      }
    }
  );
};

const viewCart = async (
  call: grpc.ServerUnaryCall<ViewCartRequest__Output, CurrentCart__Output>,
  callback: grpc.sendUnaryData<CurrentCart>
) => {
  const { customerID } = call.request;

  const cart = await checkCustomerCart(customerID);

  const currentCartItems = await cartDB.query.cartItems.findMany({
    //@ts-ignore
    where: (cartItems, { eq }) => eq(cartItems.cartUUID, cart!.cartUUID),
  });

  ProductServiceClient.viewProductsById(
    {
      productUUID: currentCartItems.map((cartItem) => cartItem.productUUID),
    },
    (err, response) => {
      if (err) throw err;

      const productsInCart = response!.productList?.map((product) => {
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

const removeCartItem = async (
  call: grpc.ServerUnaryCall<RemoveCartItemRequest, RemoveCartItemResponse>,
  callback: grpc.sendUnaryData<RemoveCartItemResponse>
) => {
  const {} = call.request;
};

server.addService(cartPackage.cart.CartService.service, {
  addToCart,
  viewCart,
  removeCartItem,
} as CartServiceHandlers);

server.bindAsync(
  "localhost:5011",
  grpc.ServerCredentials.createInsecure(),
  (err) => {
    if (err) throw err;
    console.log("Cart service is running");
    server.start();
  }
);
