"use client";

import { ShoppingCart } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { CartItem } from "./cart-item";
import { Button } from "./ui/button";
import { api } from "~/lib/trpc";
import { Show } from "./show";
import { For } from "./for";

export function Cart() {
  const { data } = api.client.cart.getCartItems.useQuery();

  return (
    <Popover>
      <PopoverTrigger className="relative">
        <ShoppingCart />
        <div className="flex absolute top-[-0.50rem] right-[-0.50rem] bg-red-600 w-5 h-5 justify-center items-center rounded-full text-xs text-white">
          <p>{Math.min(data?.length ?? 0, 99)}</p>
        </div>
      </PopoverTrigger>
      <PopoverContent className="flex flex-col gap-4 max-h-96 ">
        <h4 className="font-medium">Shopping Cart</h4>
        <div className="flex flex-col gap-4 overflow-auto :">
          <Show when={Boolean(data)} fallback={"Loading..."}>
            <For each={data}>
              {(item) => <CartItem key={item.id} {...item} />}
            </For>
          </Show>
        </div>
        <Button>Go to checkout</Button>
      </PopoverContent>
    </Popover>
  );
}
