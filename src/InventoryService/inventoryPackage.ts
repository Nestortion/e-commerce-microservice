import { loadSync } from "@grpc/proto-loader";
import * as grpc from "@grpc/grpc-js";

const protoPath = "inventory.proto";

export const packageDefinition = loadSync(protoPath, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});

export const inventoryDescriptor =
  grpc.loadPackageDefinition(packageDefinition);
export const inventoryPackage = inventoryDescriptor.inventory;
