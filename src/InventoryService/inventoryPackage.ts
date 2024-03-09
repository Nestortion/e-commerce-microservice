import { loadSync } from "@grpc/proto-loader";
import * as grpc from "@grpc/grpc-js";
import { ProtoGrpcType } from "./proto/inventory";

const protoPath = "/inventory.proto";

export const packageDefinition = loadSync(__dirname + protoPath, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});

export const inventoryDescriptor = grpc.loadPackageDefinition(
  packageDefinition
) as unknown as ProtoGrpcType;
export const inventoryPackage = inventoryDescriptor.inventory;
