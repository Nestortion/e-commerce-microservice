import { loadSync } from "@grpc/proto-loader";
import * as grpc from "@grpc/grpc-js";
import { ProtoGrpcType } from "./proto/product";

const protoPath = "/product.proto";

export const packageDefinition = loadSync(__dirname + protoPath, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
  arrays: true,
});

export const productDescriptor = grpc.loadPackageDefinition(
  packageDefinition
) as unknown as ProtoGrpcType;
export const productPackage = productDescriptor.product;
