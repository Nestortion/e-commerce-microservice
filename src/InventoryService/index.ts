import { eq, sql } from "drizzle-orm";
import { inventoryDB } from "./db.js";
import { inventoryPackage } from "./inventoryPackage.js";
import { inventory } from "./inventorySchema.js";
import * as grpc from "@grpc/grpc-js";
import crypto from "crypto";
import { InventoryServiceHandlers } from "./proto/inventory/InventoryService.js";
import { InventoryRequest__Output } from "./proto/inventory/InventoryRequest.js";
import { InventoryResponse__Output } from "./proto/inventory/InventoryResponse.js";
import { GetProductInventoryRequest__Output } from "./proto/inventory/GetProductInventoryRequest.js";
import { GetProductInventoryResponse__Output } from "./proto/inventory/GetProductInventoryResponse.js";
import { UpdateRequest__Output } from "./proto/inventory/UpdateRequest.js";
import { UpdateResponse__Output } from "./proto/inventory/UpdateResponse.js";

const server = new grpc.Server();

const addToInventory = async (
  call: grpc.ServerUnaryCall<
    InventoryRequest__Output,
    InventoryResponse__Output
  >,
  callback: grpc.sendUnaryData<InventoryResponse__Output>
) => {
  const { productUUID } = call.request;
  const inventoryUUID = crypto.randomUUID();

  const newInventory = await inventoryDB
    .insert(inventory)
    .values({
      productUUID,
      inventoryUUID,
    })
    .returning();

  callback(null, {
    inventoryId: String(newInventory[0].inventoryId),
    inventoryData: {
      productUUID: newInventory[0].productUUID,
      quantity: newInventory[0].quantity,
      status: newInventory[0].status!,
    },
  });
};

const getProductInventory = async (
  call: grpc.ServerUnaryCall<
    GetProductInventoryRequest__Output,
    GetProductInventoryResponse__Output
  >,
  callback: grpc.sendUnaryData<GetProductInventoryResponse__Output>
) => {
  const { productUUID } = call.request;

  const productInventory = await inventoryDB.query.inventory.findFirst({
    //@ts-ignore
    where: (inventory, { eq }) => eq(inventory.productUUID, productUUID),
  });

  callback(null, {
    productQuantity: productInventory?.quantity!,
    productStatus: productInventory?.status!,
  });
};

const updateInventory = async (
  call: grpc.ServerUnaryCall<UpdateRequest__Output, UpdateResponse__Output>,
  callback: grpc.sendUnaryData<UpdateResponse__Output>
) => {
  const { requestData } = call.request;

  Promise.all(
    requestData.map(async (data) => {
      await inventoryDB
        .update(inventory)
        .set({
          quantity: sql`${inventory.quantity} - ${data.productQuantity}`,
        })
        .where(eq(inventory.productUUID, data.productUUID));
    })
  );

  callback(null, {
    message: `Inventory Successfully Updated!`,
  });
};
server.addService(inventoryPackage.InventoryService.service, {
  addToInventory,
  updateInventory,
  getProductInventory,
} as InventoryServiceHandlers);

server.bindAsync(
  "localhost:5009",
  grpc.ServerCredentials.createInsecure(),
  (err) => {
    if (err) throw err;

    console.log("Inventory Service is running");
    server.start();
  }
);
