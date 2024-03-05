import { integer, pgTable, serial, uuid } from "drizzle-orm/pg-core";

export const order = pgTable("orders", {
  orderId: serial("order_id").primaryKey(),
  customerUUID: uuid("customer_uuid").notNull(),
  orderUUID: uuid("order_uuid").notNull(),
});

export const orderDetail = pgTable("order_details", {
  orderUUID: uuid("order_uuid").notNull(),
  productUUID: uuid("product_uuid").notNull(),
  productPrice: integer("product_price").notNull(),
  productQuantity: integer("product_quantity").notNull(),
});
