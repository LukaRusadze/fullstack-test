"use client";

import React from "react";
import Image from "next/image";
import { XIcon } from "lucide-react";
import { trpc } from "~/lib/trpc";
import { ShoppingCartType } from "~/server/routers/types";

type Props = ShoppingCartType["shoppingCartItems"][number];

export function CartItem(props: Props) {
  const utils = trpc.useUtils();
  const { mutate } = trpc.cart.reduceQuantity.useMutation();

  async function onDelete() {
    mutate(props.id, {
      onSuccess: () => {
        utils.cart.get.invalidate();
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
