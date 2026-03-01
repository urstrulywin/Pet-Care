"use client";
import { logIn, signUp } from "@/actions/actions";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import AuthFormBtn from "./auth-form-btn";
import { useActionState } from "react";

type AuthFormProps = {
  type: "logIn" | "signUp";
};

export default function AuthForm({ type }: AuthFormProps) {
  const [signUpError, dispatchSignUp] = useActionState(signUp, null);
  const [logInError, dispatchLogIn] = useActionState(logIn, null);
  return (
    <form
      action={type === "logIn" ? dispatchLogIn : dispatchSignUp}
      className="space-y-4 "
    >
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          className="border-black/40"
          name="email"
          id="email"
          type="email"
          required
          maxLength={100}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <Input
          className="border-black/40"
          name="password"
          id="password"
          type="password"
          required
          maxLength={100}
        />
      </div>
      <AuthFormBtn type={type} />
      {type === "signUp" && signUpError && (
        <p className="text-red-500 text-sm">{signUpError}</p>
      )}

      {type === "logIn" && logInError && (
        <p className="text-red-500 text-sm">{logInError}</p>
      )}
    </form>
  );
}
