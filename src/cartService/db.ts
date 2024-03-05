import { drizzle } from "drizzle-orm/node-postgres";
import * as schema from "./cartSchema.js";
import { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config();

const cartConnection = new Pool({
  host: process.env.CartDB_HOST,
  user: process.env.CartDB_USER,
  database: process.env.CartDB_DB,
  password: process.env.CartDB_PASS,
  port: parseInt(String(process.env.CartDB_PORT)),
});

export const cartDB = drizzle(cartConnection, {
  schema,
});
