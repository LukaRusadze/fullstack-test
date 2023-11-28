"use server";

import { z } from "zod";
import { capitalizeFirstLetter } from "~/lib/utils";

const schema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long" }),
});

type State = {
  title: string;
  message: string;
}[];

export async function onSignInSubmit(
  prevState: State,
  formData: FormData,
): Promise<State> {
  const result = schema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!result.success) {
    const errors = result.error.errors.map((error) => ({
      title: capitalizeFirstLetter(String(error.path)),
      message: error.message,
    }));

    return errors;
  }
  return [];
}
