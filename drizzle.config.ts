import type { Config } from "drizzle-kit";
import * as dotenv from "dotenv";

dotenv.config({ path: "./.env.development.local" });

export default {
  schema: "./src/lib/db/schema.ts",
  out: "./migrations",
  driver: "pg",
  dbCredentials: {
    connectionString: process.env.POSTGRES_URL,
  },
} satisfies Config;
