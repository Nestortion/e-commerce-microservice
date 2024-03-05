import type { Config } from "drizzle-kit";
import dotenv from "dotenv";

dotenv.config();

export default {
  schema: "./productSchema.ts",
  out: "../../drizzle",
  driver: "pg",
  dbCredentials: {
    host: String(process.env.ProductDB_HOST),
    user: process.env.ProductDB_USER,
    password: process.env.ProductDB_PASS,
    database: String(process.env.ProductDB_DB),
  },
} satisfies Config;
