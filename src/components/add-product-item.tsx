"use client";
import { Loader2, Plus, ShoppingCart } from "lucide-react";
import { Button } from "./ui/button";
import { trpc } from "~/lib/trpc";

export function AddProductItem(props: { id: number; inCart: boolean }) {
  const utils = trpc.useUtils();
  const mutation = trpc.cart.add.useMutation();

  function onClick() {
    mutation.mutate(props.id, {
      onSuccess() {
        utils.cart.get.invalidate();
      },
    });
  }

  const currentIcon = props.inCart ? <ShoppingCart /> : <Plus />;

  return (
    <Button onClick={onClick} size="icon" className="absolute right-0 bottom-0">
      {mutation.isLoading ? <Loader2 className="animate-spin" /> : currentIcon}
    </Button>
  );
}
