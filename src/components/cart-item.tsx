"use client";

import React from "react";
import Image from "next/image";
import { XIcon } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { CartType } from "~/server/cart";
import { queryClient } from "~/context/query-provider";
import { api } from "~/server";

export function CartItem(
  props: Exclude<CartType, null>["shoppingCartItems"][number],
) {
  const mutation = useMutation({
    mutationFn: api.cart.reduceQuantity,
  });

  async function onDelete() {
    mutation.mutate(props.id, {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["cart"],
        });
      },
    });
  }

  return (
    <div className="flex flex-row justify-between">
      <div className="flex flex-row gap-2 hover:cursor-pointer">
        <Image
          src={props.product.image ?? ""}
          width={40}
          height={50}
          alt={props.product.title + " image"}
        />
        <div className="flex flex-col gap-0">
          <h5>{props.product.title}</h5>
          <p className="text-xs">
            {props.product.price}$ x{props.quantity}
          </p>
        </div>
      </div>
      <XIcon
        width={16}
        onClick={onDelete}
        className="justify-self-end hover:cursor-pointer"
      />
    </div>
  );
}
