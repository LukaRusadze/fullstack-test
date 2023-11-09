"use client";

import React from "react";
import Image from "next/image";
import { XIcon } from "lucide-react";
import { CartItemType } from "~/server";
import { trpc } from "~/lib/trpc";

export function CartItem({ id, image, name, price, quantity }: CartItemType) {
  async function onDelete() {
    await trpc.cart.deleteCartItem.mutate(id);
  }

  return (
    <div className="flex flex-row justify-between">
      <div className="flex flex-row gap-2 hover:cursor-pointer">
        <Image src={image} width={40} height={50} alt={name + " image"} />
        <div className="flex flex-col gap-0">
          <h5>{name}</h5>
          <p className="text-xs">
            {price}$ x{quantity}
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
