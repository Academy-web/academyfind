"use server"

import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"
import { v2 as cloudinary } from "cloudinary"
import { sec } from "better-auth/plugins";

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// 🛠️ HELPER: File Buffer to Cloudinary Uploader
async function uploadImageToCloudinary(file: File, folderName: string, idPrefix: string) {
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    // Cloudinary SDK requires a Data URI for buffers
    const dataUri = `data:${file.type};base64,${buffer.toString('base64')}`;

    const uploadResult = await cloudinary.uploader.upload(dataUri, {
        folder: `academyfind/${folderName}`,
        public_id: `${idPrefix}-${Date.now()}`, // Unique ID
        overwrite: true,
        format: "webp", // Optimization
    });

    return uploadResult.secure_url;
}

export async function addTeacher(instituteId: string, formData: FormData) {
    try {
        const name = formData.get("name") as string;
        const subject = formData.get("subject") as string;
        const experience = formData.get("experience") as string;
        const imageFile = formData.get("imageUrl") as File; // Cloudinary URL

        if (!name) return { success: false, error: "Teacher name is required." };

        let securUrl = null;
        if (imageFile && imageFile.size > 0) {
            // Server side par Cloudinary upload
            securUrl = await uploadImageToCloudinary(imageFile, "teachers", `inst-${instituteId}-tch`);
        }

        await prisma.teacherProfile.create({
            data: { name, subject, experience, imageUrl:securUrl, instituteId }
        });


        revalidatePath(`/manager/${instituteId}/profile`,'layout');
        return { success: true, message: "Teacher added successfully!" };
    } catch (error) {
        return { success: false, error: "Failed to add teacher." };
    }
}

export async function removeTeacher(teacherId: string, instituteId: string) {
    try {
        await prisma.teacherProfile.delete({ where: { id: teacherId } });
        revalidatePath(`/manager/${instituteId}/profile`,'layout');
        return { success: true, message: "Teacher removed." };
    } catch (error) {
        return { success: false, error: "Failed to remove teacher." };
    }
}
