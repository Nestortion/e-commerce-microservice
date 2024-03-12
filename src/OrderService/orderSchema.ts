import {
  integer,
  pgTable,
  serial,
  uuid,
  text,
  boolean,
} from "drizzle-orm/pg-core";

export const order = pgTable("orders", {
  orderId: serial("order_id").primaryKey(),
  orderUUID: uuid("order_uuid").notNull(),
  customerID: text("customer_uuid").notNull(),
  customerName: text("customer_name").notNull(),
  email: text("email").notNull(),
  phoneNumber: integer("phone_number").notNull(),
  address: text("address").notNull(),
  city: text("city").notNull(),
  zipCode: integer("zip_code").notNull(),
  totalPrice: integer("total_price").notNull(),
  paymentOption: text("payment_option").notNull(),
  sameBillAddress: boolean("same_billing_address").notNull().default(false),
});

export const orderItems = pgTable("order_items", {
  orderUUID: uuid("order_uuid").notNull(),
  productUUID: uuid("product_uuid").notNull(),
  productQuantity: integer("product_quantity").notNull(),
});
