import { drizzle } from "drizzle-orm/node-postgres";
import dotenv from "dotenv";
import * as schema from "./productSchema.js";
import * as pg from "pg";

dotenv.config();

const productDBConnection = new pg.Pool({
  host: process.env.ProductDB_HOST,
  port: parseInt(String(process.env.ProductDB_PORT)),
  user: process.env.ProductDB_USER,
  password: process.env.ProductDB_PASS,
  database: process.env.ProductDB_DB,
});

export const productDB = drizzle(productDBConnection, { schema });

// const productDBConnection = await mysql.createConnection({
//   host: process.env.ProductDB_HOST,
//   user: process.env.ProductDB_USER,
//   database: process.env.ProductDB_DB,
//   password: process.env.ProductDB_PASS,
// });

// export const productDB = drizzle(productDBConnection, {
//   schema,
//   mode: "default",
// });
