import { loadSync } from "@grpc/proto-loader";
import * as grpc from "@grpc/grpc-js";
import { ProtoGrpcType } from "./proto/cart";

const protoPath = "/cart.proto";

export const packageDefinition = loadSync(__dirname + protoPath);

export const cartDescriptor = grpc.loadPackageDefinition(
  packageDefinition
) as unknown as ProtoGrpcType;
export const cartPackage = cartDescriptor;
