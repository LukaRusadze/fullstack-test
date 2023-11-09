import { CART_ITEMS } from "../dummyData";
import { procedure, router } from "../trpc";
import { z } from "zod";

let ITEMS = CART_ITEMS;

export const cartRouter = router({
  getCartItems: procedure.query(() => ITEMS),
  deleteCartItem: procedure.input(z.string()).mutation(({ input }) => {
    ITEMS = CART_ITEMS.filter((item) => item.id !== input);
  }),
});
