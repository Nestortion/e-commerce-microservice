import * as grpc from "@grpc/grpc-js";
import { orderPackage } from "./orderPackage.js";
//@ts-ignore
export const OrderServiceClient = new orderPackage.OrderService(
  "localhost:5010",
  grpc.credentials.createInsecure()
);
