import { z } from "zod";
import { DEFAULT_PET_IMAGE } from "./constants";

export const petIdSchema = z.string().cuid("Invalid pet ID format");

export const petFormSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Name is required")
    .max(50, "Name cannot exceed 50 characters"),

  ownerName: z
    .string()
    .trim()
    .min(3, "Owner name must be at least 3 characters")
    .max(50, "Owner name cannot exceed 50 characters"),

  imageUrl: z.preprocess((val) => {
    if (typeof val !== "string") return DEFAULT_PET_IMAGE;

    const trimmed = val.trim();

    if (trimmed === "") return DEFAULT_PET_IMAGE;

    return trimmed;
  }, z.string().url("Image must be a valid URL")),

  age: z
    .number("Age must be a number")
    .positive("Age cannot be negative")
    .max(100, "Age cannot exceed 100"),

  notes: z.preprocess(
    (val) => {
      if (typeof val !== "string") return "";
      return val.trim();
    },
    z.string().max(500, "Notes cannot exceed 500 characters"),
  ),
});

export type TPetForm = z.input<typeof petFormSchema>; // form input type
export type TPetFormParsed = z.output<typeof petFormSchema>; // after zod parse
