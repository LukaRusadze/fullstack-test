import { CART_ITEMS } from "./dummyData";
import { cartRouter } from "./routers/cartRouter";
import { procedure, router } from "./trpc";

export type CartItemType = (typeof CART_ITEMS)[number];

export const appRouter = router({
  cart: cartRouter,
});

export type AppRouter = typeof appRouter;
