import { cartRouter } from "./routers/cartRouter";
import { productRouter } from "./routers/productRouter";
import { router } from "./trpc";

export const appRouter = router({
  cart: cartRouter,
  product: productRouter,
});

export type AppRouter = typeof appRouter;
export const caller = appRouter.createCaller({});
