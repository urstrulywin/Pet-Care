import Link from "next/link";
import Logo from "@/components/logo";
import { Button } from "@/components/ui/button";
import { PawPrint, Search, ShieldCheck } from "lucide-react";

export default function Home() {
  return (
    <main className="bg-[#5DC9A8] min-h-screen flex flex-col xl:flex-row items-center justify-center gap-10">
      <div className="max-w-6xl w-full grid xl:grid-cols-2 gap-10 items-center">
        {/* Left Section */}

        <div className="bg-white/40 p-10 rounded-4xl shadow-lg">
          <Logo />
          <h1 className="text-5xl font-semibold my-6 max-w-150">
            Manage your <span className="font-extrabold">Pet Daycare</span> with
            ease
          </h1>
          <p className="text-2xl font-medium max-w-lg leading-tight">
            Use PetCare to easily keep track of pets under your care. Get
            lifetime access for Rs.299.
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

        {/* Right Section (Features) */}
        <div className="grid gap-6">
          <div className="flex items-start gap-4 bg-white/40 backdrop-blur p-6 rounded-xl shadow-md">
            <div className="bg-white p-3 rounded-lg">
              <PawPrint className="text-[#5DC9A8]" size={24} />
            </div>
            <div>
              <h3 className="font-semibold text-lg">Add pets easily</h3>
              <p className="text-sm text-gray-600">
                Quickly register and manage pets in your daycare.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4 bg-white/40 backdrop-blur p-6 rounded-xl shadow-md">
            <div className="bg-white p-3 rounded-lg">
              <Search className="text-[#5DC9A8]" size={24} />
            </div>
            <div>
              <h3 className="font-semibold text-lg">Quick search</h3>
              <p className="text-sm text-gray-600">
                Instantly find pets using powerful search.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4 bg-white/40 backdrop-blur p-6 rounded-xl shadow-md">
            <div className="bg-white p-3 rounded-lg">
              <ShieldCheck className="text-[#5DC9A8]" size={24} />
            </div>
            <div>
              <h3 className="font-semibold text-lg">Secure data</h3>
              <p className="text-sm text-gray-600">
                Your pet records are safely stored and protected.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
