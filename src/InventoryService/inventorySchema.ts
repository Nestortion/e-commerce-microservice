import { integer, pgEnum, pgTable, serial, uuid } from "drizzle-orm/pg-core";

export const statusEnum = pgEnum("status", ["DEPLETED", "WARNING", "GOOD"]);

export const inventory = pgTable("inventory", {
  inventoryId: serial("inventory").primaryKey().notNull(),
  productUUID: uuid("product_UUID").unique().notNull(),
  inventoryUUID: uuid("inventory_UUID").unique().notNull(),
  quantity: integer("quantity").notNull().default(100),
  status: statusEnum("status").default("GOOD"),
});
