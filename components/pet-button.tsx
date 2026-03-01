"use client";

import { PlusIcon } from "@radix-ui/react-icons";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import PetForm from "./pet-form";
import { usePetContext } from "@/lib/hooks";

type PetButtonProps = {
  actionType: "add" | "edit" | "checkout";
  disabled?: boolean;
  children?: React.ReactNode;
};

export default function PetButton({
  actionType,
  disabled,
  children,
}: PetButtonProps) {
  const {
    isFormOpen,
    openModal,
    closeModal,
    selectedPetId,
    handleCheckoutPet,
  } = usePetContext();

  if (actionType === "checkout") {
    return (
      <Button
        variant="secondary"
        disabled={disabled}
        onClick={() => selectedPetId && handleCheckoutPet(selectedPetId)}
      >
        {children}
      </Button>
    );
  }

  return (
    <Dialog
      open={isFormOpen}
      onOpenChange={(open) => {
        if (open) openModal();
        else closeModal();
      }}
    >
      <DialogTrigger asChild onClick={openModal}>
        {actionType === "add" ? (
          <Button size="icon">
            <PlusIcon className="h-6 w-6" />
          </Button>
        ) : (
          <Button variant="secondary">{children}</Button>
        )}
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {actionType === "add" ? "Add a new pet" : "Edit pet"}
          </DialogTitle>
        </DialogHeader>

        <PetForm actionType={actionType} />
      </DialogContent>
    </Dialog>
  );
}
