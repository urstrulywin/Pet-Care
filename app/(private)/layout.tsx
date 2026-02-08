import Background from "@/components/background";
import Footer from "@/components/footer";
import Header from "@/components/header";
import { Toaster } from "@/components/ui/sonner";
import PetContextProvider from "@/contexts/pet-ctx-prov";
import SearchContextProvider from "@/contexts/search-ctx-prov";
import { prisma } from "@/lib/prisma";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pets = await prisma.pet.findMany();

  return (
    <>
      <Background />

      <div className="flex flex-col max-w-260 mx-auto px-4 min-h-screen">
        <Header />

        <SearchContextProvider>
          <PetContextProvider data={pets}>{children}</PetContextProvider>
        </SearchContextProvider>

        <Footer />
      </div>

      <Toaster position="top-right" />
    </>
  );
}
