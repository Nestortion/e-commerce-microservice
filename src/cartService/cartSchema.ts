import { integer } from "drizzle-orm/pg-core";
import { pgTable, serial, uuid, text } from "drizzle-orm/pg-core";
import { createSelectSchema } from "drizzle-zod";

export const cart = pgTable("carts", {
  cartID: serial("cart_id").primaryKey(),
  cartUUID: uuid("cart_uuid").notNull(),
  customerID: text("customer_id").notNull(),
});

export const cartItems = pgTable("cart_items", {
  cartItemID: serial("cart_item_ID").primaryKey(),
  cartUUID: uuid("cart_uuid").notNull(),
  productUUID: uuid("product_uuid").notNull(),
  productQuantity: integer("product_quantity").notNull().default(1),
});

export const insertCartSchema = createSelectSchema(cart);
