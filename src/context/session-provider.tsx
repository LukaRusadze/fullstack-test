"use client";
import { Session } from "next-auth";
import { SessionProvider as NextSessionProvider } from "next-auth/react";

export function SessionProvider(props: {
  session: Session | null;
  children: React.ReactNode | React.ReactNode[];
}) {
  return <NextSessionProvider {...props} />;
}
