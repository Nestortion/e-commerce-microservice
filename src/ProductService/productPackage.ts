import { loadSync } from "@grpc/proto-loader";
import * as grpc from "@grpc/grpc-js";

const protoPath = "product.proto";

export const packageDefinition = loadSync(protoPath, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});

export const productDescriptor = grpc.loadPackageDefinition(packageDefinition);
export const productPackage = productDescriptor.product;
