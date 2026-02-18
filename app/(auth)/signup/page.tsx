import AuthForm from "@/components/auth-form";
import H1 from "@/components/h1";
import Link from "next/link";

export default function SignUp() {
  return (
    <>
      <H1 className="text-center">Sign Up</H1>
      <AuthForm />
      <p>
        Already have an account? <Link href={"/login"}>Log In</Link>
      </p>
    </>
  );
}
