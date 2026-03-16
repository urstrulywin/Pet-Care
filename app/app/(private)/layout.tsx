import Background from "@/components/background";
import Footer from "@/components/footer";
import Header from "@/components/header";
import PetDialog from "@/components/pet-dialog";
import { Toaster } from "@/components/ui/sonner";
import PetContextProvider from "@/contexts/pet-ctx-prov";
import SearchContextProvider from "@/contexts/search-ctx-prov";
import { checkAuth, getPets } from "@/lib/server-utils";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await checkAuth();

  const pets = await getPets(session.user.id);

  return (
    <>
      <Background />

      <div className="flex flex-col max-w-260 mx-auto px-4 min-h-screen">
        <Header />

        <SearchContextProvider>
          <PetContextProvider data={pets}>
            {children}
            <PetDialog />
          </PetContextProvider>
        </SearchContextProvider>

        <Footer />
      </div>

      <Toaster position="top-right" />
    </>
  );
}
