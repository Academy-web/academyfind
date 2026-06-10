"use server"

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function updateInstituteProfile(instituteId: string, formData: FormData){
    try{
        const name = formData.get("name") as string;
        const description = formData.get("description") as string;
        const email = formData.get("email") as string;
        const phone = formData.get("phone") as string;
        const website = formData.get("website") as string;
        const address = formData.get("address") as string;

        await prisma.institute.update({
            where:{
                id: instituteId
            },
            data:{
                name: name,
                description: description,
                email: email,
                phone: phone,
                website: website,
                address: address,
            }
        })

        revalidatePath(`/manager/${instituteId}/profile`);
        revalidatePath(`/institute/[idslug]`, 'page');

        return { success: true, message: "Profile updated successfully!" }
    } catch (error) {
        console.error("Update Error:", error);
        return { success: false, error: "Failed to update profile." }
    }
}