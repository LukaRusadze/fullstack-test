import type { inferRouterOutputs } from "@trpc/server";
import { AppRouter } from "..";

export type ShoppingCartType = NonNullable<
  inferRouterOutputs<AppRouter>["cart"]["get"]
>;
