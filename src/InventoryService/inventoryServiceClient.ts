import { inventoryPackage } from "./inventoryPackage.js";
import * as grpc from "@grpc/grpc-js";
//@ts-ignore
export const InventoryServiceClient = new inventoryPackage.InventoryService(
  "localhost:5009",
  grpc.credentials.createInsecure()
);
