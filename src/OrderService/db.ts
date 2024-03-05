import { drizzle } from "drizzle-orm/node-postgres";
import * as schema from "./orderSchema.js";
import * as pg from "pg";
import dotenv from "dotenv";

dotenv.config();

const orderConnection = new pg.Pool({
  host: process.env.OrderDB_HOST,
  user: process.env.OrderDB_USER,
  database: process.env.OrderDB_DB,
  password: process.env.OrderDB_PASS,
  port: parseInt(String(process.env.OrderDB_PORT)),
});

export const orderDB = drizzle(orderConnection, {
  schema,
});
