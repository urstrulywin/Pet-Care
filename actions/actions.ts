"use server";

import { revalidatePath } from "next/cache";
import bcrypt from "bcrypt";
import { AuthError } from "next-auth";
import { checkAuth, getPetById } from "@/lib/server-utils";
import { authSchema, petFormSchema, petIdSchema } from "@/lib/validations";
import { signIn, signOut } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { Prisma } from "@/generated/prisma/client";
import { redirect } from "next/navigation";
import Stripe from "stripe";

export async function logIn(
  _prevState: unknown,
  formData: unknown,
): Promise<string | null> {
  // check if formData is a FormData type
  if (!(formData instanceof FormData)) {
    return "Invalid form data.";
  }

  // convert formData to a plain object
  const formDataEntries = Object.fromEntries(formData.entries());

  // validation
  const validatedFormData = authSchema.safeParse(formDataEntries);
  if (!validatedFormData.success) {
    return "Validation Error.";
  }

  const { email, password } = validatedFormData.data;

  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: "/app/dashboard",
    });

    return null;
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return "Invalid credentials!";
        default:
          return "Something went wrong!";
      }
    }
    throw error; // Preserve redirect and unexpected errors
  }
}

export async function signUp(
  _prevState: unknown,
  formData: unknown,
): Promise<string | null> {
  // check if formData is a FormData type
  if (!(formData instanceof FormData)) {
    return "Invalid form data.";
  }

  // convert formData to a plain object
  const formDataEntries = Object.fromEntries(formData.entries());

  // validation
  const validatedFormData = authSchema.safeParse(formDataEntries);
  if (!validatedFormData.success) {
    return "Validation Error.";
  }

  const { email, password } = validatedFormData.data;
  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    await prisma.user.create({
      data: {
        email,
        hashedPassword,
      },
    });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        return "Email already exists.";
      }
    }
    return "Error creating user.";
  }

  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: "/app/dashboard",
    });
    return null;
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return "Invalid credentials!";
        default:
          return "Something went wrong!";
      }
    }
    throw error; // Preserve redirect and unexpected errors
  }
}

export async function logOut() {
  await signOut({ redirectTo: "/" });
}

export async function addPet(
  pet: unknown,
): Promise<{ message: string } | undefined> {
  const session = await checkAuth();

  const validatedPet = petFormSchema.safeParse(pet);
  if (!validatedPet.success) {
    return {
      message: "Invalid pet data.",
    };
  }
  try {
    await prisma.pet.create({
      data: {
        ...validatedPet.data,
        user: {
          connect: {
            id: session.user.id,
          },
        },
      },
    });
  } catch (error) {
    console.error("Add pet failed:", error);
    return {
      message: "Error adding pet.",
    };
  }
  revalidatePath("/app", "layout");
}

export async function editPet(
  petId: unknown,
  newPetData: unknown,
): Promise<{ message: string } | undefined> {
  // authentication
  const session = await checkAuth();

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

  // authorization
  const pet = await getPetById(validatedPetId.data);
  if (!pet) {
    return {
      message: "Pet not found.",
    };
  }
  if (pet.userId !== session.user.id) {
    return {
      message: "You do not have permission to edit this pet.",
    };
  }

  // edit pet
  try {
    await prisma.pet.update({
      where: {
        id: validatedPetId.data,
      },
      data: validatedPet.data,
    });
  } catch (error) {
    console.error("Edit pet failed:", error);
    return {
      message: "Error updating pet.",
    };
  }

  revalidatePath("/app", "layout");
}

export async function deletePet(
  petId: unknown,
): Promise<{ message: string } | undefined> {
  //authentication
  const session = await checkAuth();
  const validatedPetId = petIdSchema.safeParse(petId);
  if (!validatedPetId.success) {
    return {
      message: "Invalid pet ID.",
    };
  }

  // authorization
  const pet = await getPetById(validatedPetId.data);
  if (!pet) {
    return {
      message: "Pet not found.",
    };
  }
  if (pet.userId !== session.user.id) {
    return {
      message: "You do not have permission to delete this pet.",
    };
  }

  // delete pet
  try {
    await prisma.pet.delete({
      where: {
        id: validatedPetId.data,
      },
    });
  } catch (error) {
    console.error("Delete pet failed:", error);
    return {
      message: "Error deleting pet.",
    };
  }

  revalidatePath("/app", "layout");
}

export async function createCheckoutSession() {
  const session = await checkAuth();
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

  if (!baseUrl) {
    throw new Error("NEXT_PUBLIC_BASE_URL is missing");
  }
  console.log("BASE URL:", baseUrl);

  const checkoutSession = await stripe.checkout.sessions.create({
    customer_email: session.user.email!,
    line_items: [
      {
        price: process.env.STRIPE_PRICE_ID!,
        quantity: 1,
      },
    ],
    mode: "payment",
    metadata: {
      userId: session.user.id,
    },
    success_url: `${baseUrl}/payment?success=true`,
    cancel_url: `${baseUrl}/payment?canceled=true`,
  });
  redirect(checkoutSession.url!);
}
