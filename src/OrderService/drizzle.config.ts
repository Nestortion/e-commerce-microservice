import type { Config } from "drizzle-kit";
import dotenv from "dotenv";

dotenv.config();

export default {
  schema: "./orderSchema.ts",
  out: "../../drizzle",
  driver: "pg",
  dbCredentials: {
    host: String(process.env.OrderDB_HOST),
    user: process.env.OrderDB_USER,
    password: process.env.OrderDB_PASS,
    database: String(process.env.OrderDB_DB),
  },
} satisfies Config;
