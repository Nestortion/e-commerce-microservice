import { loadSync } from "@grpc/proto-loader";
import * as grpc from "@grpc/grpc-js";

const protoPath = "cart.proto";

export const packageDefinition = loadSync(protoPath, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});

export const cartDescriptor = grpc.loadPackageDefinition(packageDefinition);
export const cartPackage = cartDescriptor.cart;
