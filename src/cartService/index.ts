import * as grpc from "@grpc/grpc-js";
import { cartPackage } from "./cartPackage.js";
import { cartDB } from "./db.js";
import { cart, cartItems } from "./cartSchema.js";

import { and, eq, sql } from "drizzle-orm";
import crypto from "crypto";
import { ProductServiceClient } from "../ProductService/productServiceClient.js";
import { CartServiceHandlers } from "./proto/cart/CartService.js";
import {
  RemoveCartItemRequest,
  RemoveCartItemRequest__Output,
} from "./proto/cart/RemoveCartItemRequest.js";
import { RemoveCartItemResponse } from "./proto/cart/RemoveCartItemResponse.js";
import {
  ViewCartRequest,
  ViewCartRequest__Output,
} from "./proto/cart/ViewCartRequest.js";
import { CurrentCart, CurrentCart__Output } from "./proto/cart/CurrentCart.js";
import { CartRequest__Output } from "./proto/cart/CartRequest.js";
import { Product, Product__Output } from "./proto/cart/Product.js";
import { UpdateCartItemQuantityRequest__Output } from "./proto/cart/UpdateCartItemQuantityRequest.js";
import { UpdateCartItemQuantityResponse__Output } from "./proto/cart/UpdateCartItemQuantityResponse.js";

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
    where: (cartItems) =>
      and(
        eq(cartItems.productUUID, productUUID),
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
  call: grpc.ServerUnaryCall<ViewCartRequest__Output, CurrentCart>,
  callback: grpc.sendUnaryData<CurrentCart>
) => {
  const { customerID } = call.request;

  const cart = await checkCustomerCart(customerID);
  const currentCartItems = await cartDB.query.cartItems.findMany({
    where: (cartItems) => eq(cartItems.cartUUID, cart!.cartUUID),
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
  call: grpc.ServerUnaryCall<
    RemoveCartItemRequest__Output,
    RemoveCartItemResponse
  >,
  callback: grpc.sendUnaryData<RemoveCartItemResponse>
) => {
  const { customerID, productUUID } = call.request;

  const customerCart = await cartDB.query.cart.findFirst({
    where: (cart) => eq(cart.customerID, customerID),
  });

  const removedCartItem = await cartDB
    .delete(cartItems)
    .where(
      and(
        eq(cartItems.cartUUID, customerCart!.cartUUID),
        eq(cartItems.productUUID, productUUID)
      )
    )
    .returning();

  callback(null, {
    productUUID: removedCartItem[0].productUUID,
  });
};

const updateCartItemQuantity = async (
  call: grpc.ServerUnaryCall<
    UpdateCartItemQuantityRequest__Output,
    UpdateCartItemQuantityResponse__Output
  >,
  callback: grpc.sendUnaryData<UpdateCartItemQuantityResponse__Output>
) => {
  const { customerID, productQuantity, productUUID } = call.request;

  const customerCart = await cartDB.query.cart.findFirst({
    where: (cart) => eq(cart.customerID, customerID),
  });

  const updatedCartItem = await cartDB
    .update(cartItems)
    .set({ productQuantity })
    .where(eq(cartItems.cartUUID, customerCart!.cartUUID))
    .returning();

  callback(null, {
    productQuantity: updatedCartItem[0].productQuantity,
    productUUID: updatedCartItem[0].productUUID,
  });
};

server.addService(cartPackage.cart.CartService.service, {
  addToCart,
  viewCart,
  removeCartItem,
  updateCartItemQuantity,
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
