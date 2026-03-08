"use client";

import { createCheckoutSession } from "@/actions/actions";
import H1 from "@/components/h1";
import { Button } from "@/components/ui/button";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useTransition } from "react";
import { useSession } from "next-auth/react";

export default function Payment() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const { data: session, update, status } = useSession();
  const searchParams = useSearchParams();
  const success = searchParams.get("success");
  const cancelled = searchParams.get("cancelled");

  useEffect(() => {
    if (success) {
      update();
    }
  }, [success, update]);

  useEffect(() => {
    if (session?.user?.hasAccess) {
      router.replace("/app/dashboard");
    }
  }, [session]);

  return (
    <main className="flex flex-col items-center justify-center gap-6 pt-10">
      <H1>PetCare access requires payment</H1>
      {success && (
        <Button
          disabled={status === "loading"}
          onClick={async () => {
            await update();
            router.replace("/app/dashboard");
          }}
        >
          Access PetCare Dashboard
        </Button>
      )}
      {!success && (
        <Button
          className="rounded-full"
          disabled={isPending}
          size="lg"
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
      {cancelled && (
        <div className="rounded-full font-medium bg-red-100 p-4">
          <p className="text-red-600">
            Payment cancelled. You can try again to get access to PetCare.
          </p>
        </div>
      )}
    </main>
  );
}
