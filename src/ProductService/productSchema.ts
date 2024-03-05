import { integer, pgTable, serial, text, uuid } from "drizzle-orm/pg-core";

export const productTable = pgTable("products", {
  productID: serial("product_id").primaryKey().notNull(),
  productUUID: uuid("product_uuid").notNull(),
  productName: text("product_name").unique().notNull(),
  productDescription: text("product_description").notNull(),
  productPrice: integer("product_price").notNull(),
  productImage: text("product_image").default("default-image.png"),
});
