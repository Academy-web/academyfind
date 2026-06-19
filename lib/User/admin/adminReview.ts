"use server"

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

// 1. Approve Review & Update Rating
export async function approveReview(reviewId: string, instituteId: string) {
  try {
    // 1. Review ko APPROVED mark karein
    await prisma.review.update({
      where: { id: reviewId },
      data: { status: "APPROVED" },
    });

    // 2. Sirf "APPROVED" reviews ka average nikalenge
    const stats = await prisma.review.aggregate({
      where: { 
        instituteId: instituteId,
        status: "APPROVED" 
      },
      _avg: { rating: true },
      _count: { rating: true },
    });

    // 3. Institute ka final averageRating aur reviewCount update karein
    await prisma.institute.update({
      where: { id: instituteId },
      data: {
        averageRating: stats._avg.rating ?? 0,
        reviewCount: stats._count.rating,
      },
    });

    // 4. UI ko turant refresh karne ke liye
    revalidatePath("/admin/reviews");
    return { success: true };

  } catch (error) {
    console.error("Approval Error:", error);
    return { success: false, error: "Failed to approve review" };
  }
}

// 2. Reject Review (Rating par koi asar nahi padega)
export async function rejectReview(reviewId: string) {
  try {
    await prisma.review.update({
      where: { id: reviewId },
      data: { status: "REJECTED" },
    });

    revalidatePath("/admin/reviews");
    return { success: true };

  } catch (error) {
    console.error("Rejection Error:", error);
    return { success: false, error: "Failed to reject review" };
  }
}