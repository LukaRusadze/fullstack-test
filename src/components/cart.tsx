import { Popover } from "./ui/popover";
import { CartList } from "./cart-list";
import { api } from "~/server";

export async function Cart() {
  const cart = await api.cart.get();

  return (
    <Popover>
      <CartList items={cart} />
    </Popover>
  );
}
