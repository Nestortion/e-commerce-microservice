import { cartPackage } from "./cartPackage";
import * as grpc from "@grpc/grpc-js";

export const CartServiceClient = new cartPackage.cart.CartService(
  "localhost:5011",
  grpc.credentials.createInsecure()
);
