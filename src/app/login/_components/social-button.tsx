"use client";
import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { Button } from "~/components/ui/button";
import { Facebook } from "~/icons/facebook";
import { Google } from "~/icons/google";
import { LinkedIn } from "~/icons/linkedIn";
import { X } from "~/icons/x";

const icons = {
  facebook: Facebook,
  google: Google,
  linkedin: LinkedIn,
  twitter: X,
} as const;

export function SocialButton(props: { provider: keyof typeof icons }) {
  const Icon = icons[props.provider];
  const searchParams = useSearchParams();

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={() =>
        signIn(props.provider, {
          callbackUrl: searchParams.get("callbackUrl") ?? undefined,
        })
      }
    >
      <Icon width="1.5rem" height="1.5rem" />
    </Button>
  );
}
