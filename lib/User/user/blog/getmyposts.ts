import { Prisma } from "@/app/generated/prisma/client";
import { BlogStatus } from "@/app/generated/prisma/enums";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";

type GetMyPostsParams = {
  userId: string;
  page?: number;
  limit?: number;
  status?: BlogStatus;
};

export async function getMyPosts({
  userId,
  page = 1,
  limit = 9,
  status,
}: GetMyPostsParams) {
  if (!userId) {
    redirect("/login");
  }

  const where: Prisma.BlogPostWhereInput = {
    authorProfile: {
      userId,
    },

    ...(status && {
      status,
    }),
  };

  const [posts, total, stats] = await Promise.all([
    prisma.blogPost.findMany({
      where,

      include: {
        category: true,
        brand: true,
      },

      orderBy: {
        updatedAt: "desc",
      },

      skip: (page - 1) * limit,

      take: limit,
    }),

    prisma.blogPost.count({
      where,
    }),

    prisma.blogPost.groupBy({
      by: ["status"],

      where: {
        authorProfile: {
          userId,
        },
      },

      _count: true,
    }),
  ]);

  const totalPages = Math.ceil(total / limit);

  const statsMap = Object.fromEntries(
    stats.map((item) => [item.status, item._count])
  );

  return {
    posts,

    total,

    page,

    limit,

    totalPages,

    hasNextPage: page < totalPages,

    hasPreviousPage: page > 1,

    stats: {
      draft: statsMap.DRAFT ?? 0,

      pendingReview: statsMap.PENDING_REVIEW ?? 0,

      scheduled: statsMap.SCHEDULED ?? 0,

      published: statsMap.PUBLISHED ?? 0,

      rejected: statsMap.REJECTED ?? 0,

      archived: statsMap.ARCHIVED ?? 0,
    },
  };
}