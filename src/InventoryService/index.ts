import { eq, sql } from "drizzle-orm";
import { inventoryDB } from "./db.js";
import { inventoryPackage } from "./inventoryPackage.js";
import { inventory } from "./inventorySchema.js";
import * as grpc from "@grpc/grpc-js";
import crypto from "crypto";
import { GetProductInventoryRequest } from "./inventory.pb.js";

const server = new grpc.Server();

const addToInventory = async (call: any, callback: Function) => {
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
    inventoryId: newInventory[0].inventoryId,
    inventoryData: newInventory[0],
  });
};

const getProductInventory = async (call: any, callback: Function) => {
  const { productUUID } = call.request as GetProductInventoryRequest;

  const productInventory = await inventoryDB.query.inventory.findFirst({
    //@ts-ignore
    where: (inventory, { eq }) => eq(inventory.productUUID, productUUID),
  });

  callback(null, {
    productQuantity: productInventory?.quantity,
    productStatus: productInventory?.status,
  });
};

const updateInventory = async (call: any, callback: Function) => {
  const { updateType, productUUID, productQuantity } = call.request;

  await inventoryDB
    .update(inventory)
    .set({
      quantity:
        updateType === "DECREASE"
          ? sql`${inventory.quantity} - ${productQuantity}`
          : sql`${inventory.quantity} + ${productQuantity}`,
    })
    .where(eq(inventory.productUUID, productUUID));

  callback(null, {
    message: `Successfully ${updateType}D productQuantity of productId:${productUUID} by ${productQuantity}`,
  });
};
//@ts-ignore
server.addService(inventoryPackage.InventoryService.service, {
  addToInventory,
  updateInventory,
  getProductInventory,
});

server.bindAsync(
  "localhost:5009",
  grpc.ServerCredentials.createInsecure(),
  (err) => {
    if (err) throw err;

    console.log("Inventory Service is running");
    server.start();
  }
);
