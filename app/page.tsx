import Image from "next/image";
import Link from "next/link";
import Logo from "@/components/logo";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <main className="bg-[#5DC9A8] min-h-screen flex flex-col xl:flex-row items-center justify-center gap-10">
      <Image
        src="https://bytegrad.com/course-assets/react-nextjs/petsoft-preview.png"
        alt="Preview of PetSoft"
        width={400}
        height={400}
      />

      <div>
        <Logo />
        <h1 className="text-5xl font-semibold my-6 max-w-150">
          Manage your <span className="font-extrabold">pet daycare</span> with
          ease
        </h1>
        <p className="text-2xl font-medium max-w-150">
          Use PetSoft to easily keep track of pets under your care. Get lifetime
          access for Rs.1000.
        </p>
        <div className="mt-10 space-x-3">
          <Button asChild>
            <Link href="/signup">Get started</Link>
          </Button>
          <Button asChild variant="secondary">
            <Link href="/login">Log in</Link>
          </Button>
        </div>
      </div>
    </main>
  );
}
