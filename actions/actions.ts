"use server";

import { sleep } from "@/lib/utils";
import { Pet } from "@/generated/prisma/client";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { PetEssentials } from "@/lib/types";

export async function addPet(pet: PetEssentials) {
  await sleep(2000);
  try {
    await prisma.pet.create({
      data: pet,
    });
  } catch (error) {
    console.log(error);
    return {
      message: "Could not add pet.",
    };
  }
  revalidatePath("/app", "layout");
}

export async function editPet(petId: Pet["id"], newPetData: PetEssentials) {
  await sleep(2000);
  try {
    await prisma.pet.update({
      where: {
        id: petId,
      },
      data: newPetData,
    });
  } catch (error) {
    console.log(error);
    return {
      message: "Could not edit pet.",
    };
  }

  revalidatePath("/app", "layout");
}

export async function deletePet(petId: Pet["id"]) {
  await sleep(2000);
  try {
    await prisma.pet.delete({
      where: {
        id: petId,
      },
    });
  } catch (error) {
    console.log(error);
    return {
      message: "Could not delete pet.",
    };
  }

  revalidatePath("/app", "layout");
}
