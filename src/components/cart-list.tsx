"use client";
import { CartItemType } from "~/server";
import { CartItem } from "./cart-item";
import { For } from "./for";
import { trpc } from "~/lib/trpc";
import { PopoverContent, PopoverTrigger } from "./ui/popover";
import { ShoppingCart } from "lucide-react";
import { Button } from "./ui/button";

export function CartList(props: { items: CartItemType[] }) {
  const cart = trpc.cart.getCartItems.useQuery(undefined, {
    initialData: props.items,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });

  return (
    <>
      <PopoverTrigger className="relative">
        <ShoppingCart />
        <div className="flex absolute top-[-0.50rem] right-[-0.50rem] bg-red-600 w-5 h-5 justify-center items-center rounded-full text-xs text-white">
          <p>{Math.min(cart.data.length, 99)}</p>
        </div>
      </PopoverTrigger>
      <PopoverContent className="flex flex-col gap-4 max-h-96 ">
        <h4 className="font-medium">Shopping Cart</h4>
        <div className="flex flex-col gap-4 overflow-auto :">
          <For each={cart.data}>
            {(item) => <CartItem key={item.id} {...item} />}
          </For>
        </div>
        <Button>Go to checkout</Button>
      </PopoverContent>
    </>
  );
}
