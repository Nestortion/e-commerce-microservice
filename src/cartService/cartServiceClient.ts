import { cartPackage } from "./cartPackage";
import * as grpc from "@grpc/grpc-js";
//@ts-ignore
export const CartServiceClient = new cartPackage.CartService(
  "localhost:5011",
  grpc.credentials.createInsecure()
);
