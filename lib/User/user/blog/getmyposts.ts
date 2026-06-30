import { BlogStatus } from "@/app/generated/prisma/enums";
import { getCachedSession } from "@/lib/auth/session";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";

type GetMyPostsParams = {
  page?: number;
  limit?: number;
  status?: BlogStatus;
};

export async function getMyPosts({
  page = 1,
  limit = 9,
  status,
}: GetMyPostsParams = {}) {
  const session = await getCachedSession();

  if (!session?.user?.id) {
    redirect("/login");
  }

  const where = {
    authorProfile: {
      userId: session.user.id,
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
          userId: session.user.id,
        },
      },

      _count: true,
    }),
  ]);

  return {
    posts,

    total,

    page,

    limit,

    totalPages: Math.ceil(total / limit),

    hasNextPage: page < Math.ceil(total / limit),

    hasPreviousPage: page > 1,

    stats: {
      draft:
        stats.find((s) => s.status === "DRAFT")?._count ?? 0,

      published:
        stats.find((s) => s.status === "PUBLISHED")?._count ?? 0,

      scheduled:
        stats.find((s) => s.status === "SCHEDULED")?._count ?? 0,

      archived:
        stats.find((s) => s.status === "ARCHIVED")?._count ?? 0,

      pendingReview:
        stats.find((s) => s.status === "PENDING_REVIEW")?._count ?? 0,

      rejected:
        stats.find((s) => s.status === "REJECTED")?._count ?? 0,
    },
  };
}