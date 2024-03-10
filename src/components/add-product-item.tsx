"use client";
import { Loader2, Plus, ShoppingCart } from "lucide-react";
import { Button } from "./ui/button";
import { useMutation } from "@tanstack/react-query";
import { api } from "~/server";
import { queryClient } from "~/context/query-provider";

export function AddProductItem(props: { id: number; inCart: boolean }) {
  const mutation = useMutation({
    mutationFn: api.cart.add,
  });

  function onClick() {
    mutation.mutate(props.id, {
      onSuccess() {
        queryClient.invalidateQueries({
          queryKey: ["cart"],
        });
      },
    });
  }

  const currentIcon = props.inCart ? <ShoppingCart /> : <Plus />;

  return (
    <Button onClick={onClick} size="icon" className="absolute right-0 bottom-0">
      {mutation.isPending ? <Loader2 className="animate-spin" /> : currentIcon}
    </Button>
  );
}
