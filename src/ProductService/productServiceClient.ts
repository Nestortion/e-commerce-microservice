import * as grpc from "@grpc/grpc-js";
import { productPackage } from "./productPackage.js";

export const ProductServiceClient = new productPackage.ProductService(
  "localhost:5008",
  grpc.credentials.createInsecure()
);
