"use client";

import { createCheckoutSession } from "@/actions/actions";
import H1 from "@/components/h1";
import { Button } from "@/components/ui/button";
import { useRouter, useSearchParams } from "next/navigation";
import { useSession } from "next-auth/react";
import { useTransition } from "react";

export default function Payment() {
  const { data: session, update, status } = useSession();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const success = searchParams.get("success");
  const canceled = searchParams.get("canceled");

  return (
    <main className="flex flex-col items-center justify-center gap-6 pt-10">
      <H1>PetCare access requires payment</H1>
      {success && (
        <Button
          onClick={async () => {
            await update(true);
            router.push("/app/dashboard");
          }}
          disabled={status === "loading" || session?.user.hasAccess}
        >
          Access PetCare Dashboard
        </Button>
      )}
      {!success && (
        <Button
          className="rounded-full"
          size="lg"
          disabled={isPending}
          onClick={async () => {
            startTransition(async () => {
              await createCheckoutSession();
            });
          }}
        >
          Buy lifetime access for ₹299
        </Button>
      )}
      {success && (
        <div className="rounded-full font-medium bg-green-100 p-4">
          <p className="text-green-600">
            Payment successful! You now have access to PetCare.
          </p>
        </div>
      )}
      {canceled && (
        <div className="rounded-full font-medium bg-red-100 p-4">
          <p className="text-red-600">
            Payment cancelled. You can try again to get access to PetCare.
          </p>
        </div>
      )}
    </main>
  );
}
