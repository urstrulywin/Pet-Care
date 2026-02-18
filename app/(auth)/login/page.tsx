import AuthForm from "@/components/auth-form";
import H1 from "@/components/h1";
import Link from "next/link";

export default function Login() {
  return (
    <>
      <H1 className="text-center">Log In</H1>
      <AuthForm />
      <p>
        No account yet? <Link href={"/signup"}>Sign Up</Link>
      </p>
    </>
  );
}
