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

// export default function PetButton({
//   actionType,
//   disabled,
//   children,
// }: PetButtonProps) {
//   const {
//     isFormOpen,
//     openAddModal,
//     openEditModal,
//     closeModal,
//     selectedPetId,
//     handleCheckoutPet,
//   } = usePetContext();

//   if (actionType === "checkout") {
//     return (
//       <Button
//         variant="secondary"
//         disabled={disabled}
//         onClick={() => selectedPetId && handleCheckoutPet(selectedPetId)}
//       >
//         {children}
//       </Button>
//     );
//   }

//   return (
//     <Dialog
//       open={isFormOpen}
//       onOpenChange={(open) => {
//         if (open) {
//           if (actionType === "add") openAddModal();
//           else if (actionType === "edit") openEditModal();
//         } else closeModal();
//       }}
//     >
//       <DialogTrigger asChild>
//         {actionType === "add" ? (
//           <Button size="icon">
//             <PlusIcon className="h-6 w-6" />
//           </Button>
//         ) : (
//           <Button variant="secondary" disabled={!selectedPetId}>
//             {children}
//           </Button>
//         )}
//       </DialogTrigger>

//       <DialogContent>
//         <DialogHeader>
//           <DialogTitle>
//             {actionType === "add" ? "Add a new pet" : "Edit pet"}
//           </DialogTitle>
//         </DialogHeader>

//         <PetForm actionType={actionType} />
//       </DialogContent>
//     </Dialog>
//   );
// }
