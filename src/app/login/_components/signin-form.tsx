"use client";
import { useFormState } from "react-dom";
import { onSignInSubmit } from "../_utils/actions";
import { useToast } from "~/components/ui/use-toast";
import { useEffect } from "react";

type FormState = Parameters<typeof onSignInSubmit>[0];

const initialState: FormState = [];

export function SignInForm(props: {
  children?: React.ReactNode | React.ReactNode[];
}) {
  const [state, formAction] = useFormState(onSignInSubmit, initialState);
  const { toast } = useToast();

  useEffect(() => {
    state.forEach((error) => {
      toast({
        className: "mt-2",
        title: error.title,
        description: error.message,
        variant: "destructive",
      });
    });
  }, [state, toast]);

  return (
    <form
      action={formAction}
      className="flex flex-col gap-2 w-full items-center"
    >
      {props.children}
    </form>
  );
}
