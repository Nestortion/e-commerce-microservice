import { loadSync } from "@grpc/proto-loader";
import * as grpc from "@grpc/grpc-js";
import { ProtoGrpcType } from "./proto/order";

const protoPath = "/order.proto";

export const packageDefinition = loadSync(__dirname + protoPath, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
  arrays: true,
});

export const orderDescriptor = grpc.loadPackageDefinition(
  packageDefinition
) as unknown as ProtoGrpcType;
export const orderPackage = orderDescriptor.order;
