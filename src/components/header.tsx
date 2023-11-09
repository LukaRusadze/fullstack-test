import React from "react";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { Logo } from "./logo";
import { Cart } from "./cart";

type Props = {};

export default function Header({}: Props) {
  return (
    <header className="flex px-[5%] py-4 border-b-2 justify-center md:justify-between w-full h-min items-center">
      <Logo />
      <div className="hidden md:flex items-center gap-8">
        <Cart />
        <Avatar className="hover:cursor-pointer select-none">
          <AvatarFallback>LR</AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
}
