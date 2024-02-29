"use client";
import { CartItem } from "./cart-item";
import { For } from "./for";
import { PopoverContent, PopoverTrigger } from "./ui/popover";
import { ShoppingCart } from "lucide-react";
import { Button } from "./ui/button";
import { useQuery } from "@tanstack/react-query";
import { CartType } from "~/server/cart";
import { api } from "~/server";

export function CartList(props: { items: CartType }) {
  const cart = useQuery({
    queryFn: () => api.cart.get(),
    queryKey: ["cart"],
    initialData: props.items,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });

  return (
    <>
      <PopoverTrigger className="relative">
        <ShoppingCart />
        <div className="flex absolute top-[-0.50rem] right-[-0.50rem] bg-red-600 w-5 h-5 justify-center items-center rounded-full text-xs text-white">
          <p>{Math.min(cart.data?.totalQuantity ?? 0, 99)}</p>
        </div>
      </PopoverTrigger>
      <PopoverContent className="flex flex-col gap-4 max-h-96 ">
        <h4 className="font-medium">Shopping Cart</h4>
        <div className="flex flex-col gap-4 overflow-auto :">
          <For each={cart.data?.shoppingCartItems}>
            {(item) => <CartItem key={item.id} {...item} />}
          </For>
        </div>
        <Button>Go to checkout</Button>
      </PopoverContent>
    </>
  );
}
