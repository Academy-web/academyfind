import { prisma } from "@/lib/prisma";

export async function getInstituteById(
  id: string
) {
  return prisma.institute.findUnique({
    where: {
      id,
    },

    include: {
      city: true,
      teachers: true,

      categories: {
        include: {
          category: true,
        },
      },

      reviews: {
        include: {
          user: {
            select: {
              id: true,
              name: true,
            },
          },
        },

        orderBy: {
          createdAt: "desc",
        },
      },
    },
  });
}