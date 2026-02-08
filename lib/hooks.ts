import { PetContext } from "@/contexts/pet-ctx-prov";
import { SearchContext } from "@/contexts/search-ctx-prov";
import { useContext } from "react";

export function usePetContext() {
  const context = useContext(PetContext);

  if (!context) {
    throw new Error("usePetContext must be used within a PetContextProvider");
  }

  return context;
}

export function useSearchContext() {
  const context = useContext(SearchContext);

  if (!context) {
    throw new Error(
      "useSearchContext must be used within a SearchContextProvider"
    );
  }

  return context;
}
