"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";

import { usePetContext } from "@/lib/hooks";
import PetForm from "./pet-form";

export default function PetDialog() {
  const { isFormOpen, closeModal, formMode } = usePetContext();

  if (!formMode) return null;

  return (
    <Dialog open={isFormOpen} onOpenChange={(open) => !open && closeModal()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {formMode === "add" ? "Add a new pet" : "Edit pet"}
          </DialogTitle>
        </DialogHeader>

        <PetForm actionType={formMode} />
      </DialogContent>
    </Dialog>
  );
}
