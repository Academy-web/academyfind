"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function submitStudentEnquiry(formData: FormData) {
  try {
    const name = formData.get("name") as string;
    const phone = formData.get("phone") as string;
    const message = formData.get("message") as string;
    const instituteId = formData.get("instituteId") as string;

    await prisma.instituteEnquiry.create({
      data: {
        name,
        phone,
        message,
        instituteId,
        status: "NEW",
      },
    });

    return { success: true };
  } catch (error) {
    console.error("Enquiry Error:", error);
    return { success: false, error: "Something went wrong" };
  }
}