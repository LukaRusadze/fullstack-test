import { Popover } from "./ui/popover";
import { caller } from "~/server";
import { CartList } from "./cart-list";

export async function Cart() {
  const cart = await caller.cart.get();

  return (
    <Popover>
      <CartList items={cart} />
    </Popover>
  );
}
