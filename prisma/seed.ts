import { PrismaClient } from "../generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import "dotenv/config";
console.log("DB URL:", process.env.DATABASE_URL);

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});

const prisma = new PrismaClient({
  adapter,
});

async function main() {
  console.log("Start seeding pets...");

  await prisma.pet.createMany({
    data: [
      {
        name: "Benjamin",
        ownerName: "John Doe",
        imageUrl: "https://bytegrad.com/course-assets/images/rn-image-4.png",
        age: 2,
        notes:
          "Doesn't like to be touched on the belly. Plays well with other dogs.",
      },
      {
        name: "Richard",
        ownerName: "Josephine Dane",
        imageUrl: "https://bytegrad.com/course-assets/images/rn-image-5.png",
        age: 5,
        notes: "Needs medication twice a day.",
      },
      {
        name: "Anna",
        ownerName: "Frank Doe",
        imageUrl: "https://bytegrad.com/course-assets/images/rn-image-6.png",
        age: 4,
        notes: "Allergic to chicken.",
      },
    ],
  });

  console.log("Seeding finished.");
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
