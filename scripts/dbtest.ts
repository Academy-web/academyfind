import { prisma } from "../lib/prisma";

async function main() {
  console.log("Checking Category and City details...");
  try {
    const categoryCount = await prisma.category.count();
    console.log("Total Institute Categories:", categoryCount);

    const categories = await prisma.category.findMany({
      take: 10,
      select: { id: true, name: true, slug: true },
    });
    console.log("Sample Categories:", categories);

    const cities = await prisma.city.findMany({
      take: 10,
      select: { id: true, name: true, slug: true },
    });
    console.log("Sample Cities:", cities);

  } catch (err) {
    console.error("Error:", err);
  } finally {
    await prisma.$disconnect();
  }
}

main();
