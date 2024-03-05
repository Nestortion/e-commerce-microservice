import { drizzle } from "drizzle-orm/node-postgres";
import * as schema from "./inventorySchema.js";
import { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config();

const inventoryConnection = new Pool({
  host: process.env.InventoryDB_HOST,
  user: process.env.InventoryDB_USER,
  database: process.env.InventoryDB_DB,
  password: process.env.InventoryDB_PASS,
  port: parseInt(String(process.env.InventoryDB_PORT)),
});

export const inventoryDB = drizzle(inventoryConnection, {
  schema,
});
