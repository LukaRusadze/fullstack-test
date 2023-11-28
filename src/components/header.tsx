import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Logo } from "./logo";
import { Cart } from "./cart";
import { NavigationBar } from "./navigation-bar";
import { auth } from "~/lib/auth";
import { SignInButton } from "./signin-button";

export async function Header(props: {
  children?: React.ReactNode | React.ReactNode[];
}) {
  const session = await auth();

  return (
    <>
      <header className="flex px-[5%] py-4 justify-center md:justify-between w-full items-center sticky top-0 z-10 bg-white">
        <Logo />
        <div className="hidden md:flex items-center gap-8">
          <Cart />
          {session?.user ? (
            <Avatar className="hover:cursor-pointer select-none">
              <AvatarImage src={session.user.image ?? undefined} />
              <AvatarFallback>LR</AvatarFallback>
            </Avatar>
          ) : (
            <SignInButton />
          )}
        </div>
      </header>
      {props.children}
      <NavigationBar />
    </>
  );
}
