import * as cart from "~/server/cart";
import * as product from "~/server/product";

export const api = {
  cart,
  product,
} as const;
