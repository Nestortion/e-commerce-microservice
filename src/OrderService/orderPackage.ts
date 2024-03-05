import { loadSync } from "@grpc/proto-loader";
import * as grpc from "@grpc/grpc-js";

const protoPath = "order.proto";

export const packageDefinition = loadSync(protoPath, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});

export const orderDescriptor = grpc.loadPackageDefinition(packageDefinition);
export const orderPackage = orderDescriptor.order;
