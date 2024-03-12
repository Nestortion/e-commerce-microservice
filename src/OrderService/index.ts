import * as grpc from "@grpc/grpc-js";
import { orderPackage } from "./orderPackage.js";
import { orderDB } from "./db.js";
import { order, orderItems } from "./orderSchema.js";
import { InventoryServiceClient } from "../InventoryService/inventoryServiceClient.js";
import crypto from "crypto";
import { OrderServiceHandlers } from "./proto/order/OrderService.js";
import { CreateOrderRequest__Output } from "./proto/order/CreateOrderRequest.js";
import { CreateOrderResponse__Output } from "./proto/order/CreateOrderResponse.js";

const server = new grpc.Server();

const createOrder = async (
  call: grpc.ServerUnaryCall<
    CreateOrderRequest__Output,
    CreateOrderResponse__Output
  >,
  callback: grpc.sendUnaryData<CreateOrderResponse__Output>
) => {
  const { orderDetails, orderItems: orderItemsRequest } = call.request;

  const orderUUID = crypto.randomUUID();

  if (orderDetails) {
    const newOrder = await orderDB
      .insert(order)
      .values({
        ...orderDetails,
        orderUUID,
      })
      .returning();

    const orderItemsValues = orderItemsRequest.map((orderItem) => {
      return { ...orderItem, orderUUID };
    });

    const insertOrderItems = await orderDB
      .insert(orderItems)
      .values([...orderItemsValues])
      .returning();

    InventoryServiceClient.updateInventory(
      {
        requestData: insertOrderItems.map((item) => {
          return {
            productQuantity: item.productQuantity,
            productUUID: item.productUUID,
          };
        }),
      },
      (err, response) => {
        if (err) throw err;
      }
    );

    callback(null, {
      orderUUID: newOrder[0].orderUUID,
    });
  }
};
server.addService(orderPackage.OrderService.service, {
  createOrder,
} as OrderServiceHandlers);

server.bindAsync(
  "localhost:5010",
  grpc.ServerCredentials.createInsecure(),
  (err) => {
    if (err) throw err;
    console.log("OrderService Running");
    server.start();
  }
);
