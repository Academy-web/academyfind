import { getCachedSession } from "@/lib/auth/session";
import { prisma } from "@/lib/prisma";

export async function toggleBookmark(postId: string) {
  try {
    if (!postId) {
      throw new Error("Post ID is required.");
    }

    const session = await getCachedSession();

    if (!session?.user?.id) {
      throw new Error("User not authenticated.");
    }

    const userId = session.user.id;

    const existingBookmark = await prisma.blogBookmark.findUnique({
      where: {
        userId_postId: {
          userId,
          postId,
        },
      },
    });

    if (existingBookmark) {
      await prisma.blogBookmark.delete({
        where: {
          userId_postId: {
            userId,
            postId,
          },
        },
      });
    }

    else if (!existingBookmark) {
      await prisma.blogBookmark.create({
        data: {
            userId,
            postId,
        },
      });
    }

    return {
      success: true,
        isBookmarked: !existingBookmark,
    };
  } catch (error) {
    console.error("Error removing bookmark:", error);

    return {
      success: false,
      error: "Failed to remove bookmark.",
    };
  }
}