import { trpc as client } from "./client";
import { trpc as server } from "./server";

export const api = {
  client,
  server,
} as const;

export { TRPCProvider } from "./client";
