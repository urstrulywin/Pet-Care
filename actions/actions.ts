"use server";

import { sleep } from "@/lib/utils";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { petFormSchema, petIdSchema } from "@/lib/validations";

export async function addPet(pet: unknown) {
  await sleep(2000);

  const validatedPet = petFormSchema.safeParse(pet);
  if (!validatedPet.success) {
    return {
      message: "Invalid pet data.",
    };
  }
  try {
    await prisma.pet.create({
      data: validatedPet.data,
    });
  } catch (error) {
    console.log(error);
    return {
      message: "Could not add pet.",
    };
  }
  revalidatePath("/app", "layout");
}

export async function editPet(petId: unknown, newPetData: unknown) {
  await sleep(2000);
  const validatedPetId = petIdSchema.safeParse(petId);
  if (!validatedPetId.success) {
    return {
      message: "Invalid pet ID.",
    };
  }
  const validatedPet = petFormSchema.safeParse(newPetData);
  if (!validatedPet.success) {
    return {
      message: "Invalid pet data.",
    };
  }
  try {
    await prisma.pet.update({
      where: {
        id: validatedPetId.data,
      },
      data: validatedPet.data,
    });
  } catch (error) {
    console.log(error);
    return {
      message: "Could not edit pet.",
    };
  }

  revalidatePath("/app", "layout");
}

export async function deletePet(petId: unknown) {
  await sleep(2000);
  const validatedPetId = petIdSchema.safeParse(petId);
  if (!validatedPetId.success) {
    return {
      message: "Invalid pet ID.",
    };
  }
  try {
    await prisma.pet.delete({
      where: {
        id: validatedPetId.data,
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
