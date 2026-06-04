import { prisma } from "@/lib/prisma";

const cities = [
  { name: "Delhi", slug: "delhi", state: "Delhi" },

  { name: "Mumbai", slug: "mumbai", state: "Maharashtra" },
  { name: "Pune", slug: "pune", state: "Maharashtra" },
  { name: "Nagpur", slug: "nagpur", state: "Maharashtra" },

  { name: "Bangalore", slug: "bangalore", state: "Karnataka" },

  { name: "Hyderabad", slug: "hyderabad", state: "Telangana" },

  { name: "Chennai", slug: "chennai", state: "Tamil Nadu" },

  { name: "Kolkata", slug: "kolkata", state: "West Bengal" },

  { name: "Ahmedabad", slug: "ahmedabad", state: "Gujarat" },
  { name: "Surat", slug: "surat", state: "Gujarat" },

  { name: "Jaipur", slug: "jaipur", state: "Rajasthan" },
  { name: "Kota", slug: "kota", state: "Rajasthan" },
  { name: "Bikaner", slug: "bikaner", state: "Rajasthan" },

  { name: "Lucknow", slug: "lucknow", state: "Uttar Pradesh" },
  { name: "Kanpur", slug: "kanpur", state: "Uttar Pradesh" },
  { name: "Noida", slug: "noida", state: "Uttar Pradesh" },

  { name: "Gurgaon", slug: "gurgaon", state: "Haryana" },
  { name: "Faridabad", slug: "faridabad", state: "Haryana" },

  { name: "Chandigarh", slug: "chandigarh", state: "Chandigarh" },

  { name: "Patna", slug: "patna", state: "Bihar" },

  { name: "Indore", slug: "indore", state: "Madhya Pradesh" },
  { name: "Bhopal", slug: "bhopal", state: "Madhya Pradesh" },

  { name: "Bhubaneswar", slug: "bhubaneswar", state: "Odisha" },

  { name: "Kochi", slug: "kochi", state: "Kerala" },

  { name: "Visakhapatnam", slug: "visakhapatnam", state: "Andhra Pradesh" },
];

async function main() {
  for (const city of cities) {
    await prisma.city.upsert({
      where: {
        slug: city.slug,
      },
      update: {},
      create: city,
    });
  }

  const count = await prisma.city.count();

  console.log(`✅ Cities Seeded (${count} cities)`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });