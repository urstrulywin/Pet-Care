"use client";
import { Button } from "./ui/button";
import { useFormStatus } from "react-dom";

type AuthFormProps = {
  type: "logIn" | "signUp";
};
export default function AuthFormBtn({ type }: AuthFormProps) {
  const { pending } = useFormStatus();
  return (
    <Button disabled={pending}>
      {type === "logIn" ? "Log In" : "Sign Up"}
    </Button>
  );
}
