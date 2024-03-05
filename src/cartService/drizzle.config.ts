import type { Config } from "drizzle-kit";
import dotenv from "dotenv";

dotenv.config();

export default {
  schema: "./cartSchema.ts",
  out: "../../drizzle",
  driver: "pg",
  dbCredentials: {
    host: String(process.env.CartDB_HOST),
    user: process.env.CartDB_USER,
    password: process.env.CartDB_PASS,
    database: String(process.env.CartDB_DB),
  },
} satisfies Config;
