import * as grpc from "@grpc/grpc-js";
import { orderPackage } from "./orderPackage.js";
import { orderDB } from "./db.js";
import { order, orderDetail } from "./orderSchema.js";
import { InventoryServiceClient } from "../InventoryService/inventoryServiceClient.js";
import { UpdateResponse } from "../InventoryService/inventory.pb.js";
import { OrderDetails } from "./order.pb.js";
import crypto from "crypto";

const server = new grpc.Server();

const createOrder = async (call: any, callback: Function) => {
  const { customerUUID, orderDetails } = call.request;

  const orderUUID = crypto.randomUUID();

  const { productUUID, productPrice, productQuantity } =
    orderDetails as OrderDetails;

  const createdOrder = await orderDB
    .insert(order)
    .values({ customerUUID, orderUUID })
    .returning();

  const createdOrderDetails = await orderDB
    .insert(orderDetail)
    .values({
      orderUUID: createdOrder[0].orderUUID,
      productUUID,
      productPrice,
      productQuantity,
    })
    .returning();

  InventoryServiceClient.updateInventory(
    {
      updateType: "DECREASE",
      productUUID,
      productQuantity,
    },
    (err: Error, response: UpdateResponse) => {
      if (err) throw err;
      console.log(response);
    }
  );

  callback(null, {
    order: createdOrder[0],
    orderDetails: createdOrderDetails[0],
  });
};
//@ts-ignore
server.addService(orderPackage.OrderService.service, {
  createOrder,
});

server.bindAsync(
  "localhost:5010",
  grpc.ServerCredentials.createInsecure(),
  (err) => {
    if (err) throw err;
    console.log("OrderService Running");
    server.start();
  }
);
