import { Pet } from "@/generated/prisma/client";

export type PetEssentials = Omit<
  Pet,
  "id" | "userId" | "createdAt" | "updatedAt"
>;
