"use client";

import { PlusIcon } from "@radix-ui/react-icons";
import { Button } from "./ui/button";
import { usePetContext } from "@/lib/hooks";

type PetButtonProps = {
  actionType: "add" | "edit" | "checkout";
  disabled?: boolean;
  children?: React.ReactNode;
};

export default function PetButton({ actionType, children }: PetButtonProps) {
  const { openAddModal, openEditModal, selectedPetId, handleCheckoutPet } =
    usePetContext();

  if (actionType === "checkout") {
    return (
      <Button
        variant="secondary"
        onClick={() => selectedPetId && handleCheckoutPet(selectedPetId)}
      >
        {children}
      </Button>
    );
  }

  if (actionType === "add") {
    return (
      <Button size="icon" onClick={openAddModal}>
        <PlusIcon className="h-6 w-6" />
      </Button>
    );
  }

  return (
    <Button
      variant="secondary"
      disabled={!selectedPetId}
      onClick={openEditModal}
    >
      {children}
    </Button>
  );
}
