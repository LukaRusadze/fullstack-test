import Link from "next/link";
import { Card, CardContent } from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import { Separator } from "~/components/ui/separator";
import { SocialButton } from "./_components/social-button";
import { SignInForm } from "./_components/signin-form";
import { SubmitButton } from "~/components/submit-button";

export default function Login() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="mt-6 text-3xl font-extrabold text-center text-black mb-6">
        Sign in to your account
      </h1>
      <Card className="max-w-sm w-full">
        <CardContent className="flex flex-col p-8 items-center">
          <SignInForm>
            <Input placeholder="Email" name="email" />
            <Input placeholder="Password" name="password" type="password" />
            <Link href="#" className="text-sm underline">
              Forgot password?
            </Link>
            <SubmitButton className="w-full mt-2">Sign in</SubmitButton>
          </SignInForm>
          <Separator orientation="horizontal" className="my-4" />
          <div className="flex flex-row justify-evenly w-full">
            <SocialButton provider="google" />
            <SocialButton provider="facebook" />
            <SocialButton provider="twitter" />
            <SocialButton provider="linkedin" />
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
