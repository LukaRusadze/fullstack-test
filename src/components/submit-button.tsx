"use client";

import { useFormStatus } from "react-dom";
import { Button, ButtonProps } from "./ui/button";
import { Loader2 } from "lucide-react";

export function SubmitButton(props: ButtonProps) {
  const formStatus = useFormStatus();

  return (
    <Button {...props} disabled={formStatus.pending}>
      {formStatus.pending ? (
        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
      ) : null}
      {props.children}
    </Button>
  );
}
