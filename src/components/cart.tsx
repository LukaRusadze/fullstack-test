"use client";
import { ShoppingCart } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { CartItem } from "./cart-item";
import { Button } from "./ui/button";
import { trpc } from "~/lib/trpc";

export async function Cart() {
  const data = await trpc.cart.getCartItems.query();

  return (
    <Popover>
      <PopoverTrigger className="relative">
        <ShoppingCart />
        <div className="flex absolute top-[-0.50rem] right-[-0.50rem] bg-red-600 w-5 h-5 justify-center items-center rounded-full text-xs text-white">
          <p>{Math.min(data.length ?? 0, 99)}</p>
        </div>
      </PopoverTrigger>
      <PopoverContent className="flex flex-col gap-4 max-h-96 ">
        <h4 className="font-medium">Shopping Cart</h4>
        <div className="flex flex-col gap-4 overflow-auto :">
          {data.map((item) => (
            <CartItem key={item.id} {...item} />
          ))}
        </div>
        <Button>Go to checkout</Button>
      </PopoverContent>
    </Popover>
  );
}
