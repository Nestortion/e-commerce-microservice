import type { Config } from "drizzle-kit";
import dotenv from "dotenv";

dotenv.config();

export default {
  schema: "./inventorySchema.ts",
  out: "../../drizzle",
  driver: "pg",
  dbCredentials: {
    host: String(process.env.InventoryDB_HOST),
    user: process.env.InventoryDB_USER,
    password: process.env.InventoryDB_PASS,
    database: String(process.env.InventoryDB_DB),
  },
} satisfies Config;
