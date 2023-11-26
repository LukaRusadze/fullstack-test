import React from "react";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { Logo } from "./logo";
import { Cart } from "./cart";
import {} from "next/navigation";
import { NavigationBar } from "./navigation-bar";

type Props = {
  children?: React.ReactNode | React.ReactNode[];
};

export function Header({ children }: Props) {
  return (
    <>
      <header className="flex px-[5%] py-4 justify-center md:justify-between w-full items-center sticky top-0 z-10 bg-white">
        <Logo />
        <div className="hidden md:flex items-center gap-8">
          <Cart />
          <Avatar className="hover:cursor-pointer select-none">
            <AvatarFallback>LR</AvatarFallback>
          </Avatar>
        </div>
      </header>
      {children}
      <NavigationBar />
    </>
  );
}
