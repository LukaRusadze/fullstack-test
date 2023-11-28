"use client";
import { signIn } from "next-auth/react";
import { Button } from "./ui/button";

export function SignInButton() {
  return (
    <Button variant="outline" onClick={() => void signIn()}>
      Sign In
    </Button>
  );
}
