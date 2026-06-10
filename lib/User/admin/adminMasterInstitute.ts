"use server"

import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"

function generateSlug(name: string) {
    return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
}

export async function createInstitute(formData: FormData, selectedCategoryIds: string[]) {
    try {
        const name = formData.get("name") as string;
        const description = formData.get("description") as string;
        const phone = formData.get("phone") as string;
        const email = formData.get("email") as string;
        const website = formData.get("website") as string;
        const address = formData.get("address") as string;
        const googleMapsUrl = formData.get("googleMapsUrl") as string;
        const cityId = formData.get("cityId") as string;
        const subscriptionPlan = formData.get("subscriptionPlan") as any || "BASIC";
        const imageUrl = formData.get("imageUrl") as string || null;

        const isVerified = formData.get("isVerified") === "true";
        const isFeatured = formData.get("isFeatured") === "true";
        const isActive = formData.get("isActive") === "true";

        const latitude = formData.get("latitude") ? parseFloat(formData.get("latitude") as string) : null;
        const longitude = formData.get("longitude") ? parseFloat(formData.get("longitude") as string) : null;
        const googleRating = formData.get("googleRating") ? parseFloat(formData.get("googleRating") as string) : null;
        const googleReviewCount = formData.get("googleReviewCount") ? parseInt(formData.get("googleReviewCount") as string) : null;

        if (!name || !cityId || !address) {
            return { success: false, error: "Name, City, and Address are required." };
        }

        let slug = generateSlug(name);
        let existing = await prisma.institute.findFirst({ where: { slug } });
        let counter = 1;
        while (existing) {
            slug = `${generateSlug(name)}-${counter}`;
            existing = await prisma.institute.findFirst({ where: { slug } });
            counter++;
        }

        // Transaction to create Institute AND link categories
        const newInstitute = await prisma.$transaction(async (tx) => {
            const institute = await tx.institute.create({
                data: {
                    name, slug, description, phone, email, website, address,
                    googleMapsUrl, cityId, subscriptionPlan, imageUrl,
                    isVerified, isFeatured, isActive, latitude, longitude,
                    googleRating, googleReviewCount
                }
            });

            if (selectedCategoryIds.length > 0) {
                await tx.instituteCategory.createMany({
                    data: selectedCategoryIds.map(catId => ({
                        instituteId: institute.id,
                        categoryId: catId
                    }))
                });
            }
            return institute;
        });

        revalidatePath("/admin/institutes");
        return { success: true, message: "Institute created successfully!", id: newInstitute.id };
    } catch (error) {
        console.error("Create Institute Error:", error);
        return { success: false, error: "Failed to create institute." };
    }
}

export async function updateInstituteByAdmin(
    instituteId: string, 
    formData: FormData, 
    selectedCategoryIds: string[] // Client form se array aayega
) {
    try {
        const name = formData.get("name") as string;
        const slug = formData.get("slug") as string;
        const description = formData.get("description") as string;
        const phone = formData.get("phone") as string;
        const email = formData.get("email") as string;
        const website = formData.get("website") as string;
        const address = formData.get("address") as string;
        const googleMapsUrl = formData.get("googleMapsUrl") as string;
        const cityId = formData.get("cityId") as string;
        const subscriptionPlan = formData.get("subscriptionPlan") as any;
        
        // Checkboxes / Toggles values
        const isVerified = formData.get("isVerified") === "true";
        const isFeatured = formData.get("isFeatured") === "true";
        const isActive = formData.get("isActive") === "true";

        const imageUrl = formData.get("imageUrl") as string || null;

        // Floats handles
        const latitude = formData.get("latitude") ? parseFloat(formData.get("latitude") as string) : null;
        const longitude = formData.get("longitude") ? parseFloat(formData.get("longitude") as string) : null;
        const googleRating = formData.get("googleRating") ? parseFloat(formData.get("googleRating") as string) : null;
        const googleReviewCount = formData.get("googleReviewCount") ? parseInt(formData.get("googleReviewCount") as string) : null;

        await prisma.$transaction([
            // 1. Direct Model Values Update Karo
            prisma.institute.update({
                where: { id: instituteId },
                data: {
                    name,
                    slug,
                    description,
                    phone,
                    email,
                    website,
                    address,
                    googleMapsUrl,
                    cityId,
                    subscriptionPlan,
                    imageUrl,
                    isVerified,
                    isFeatured,
                    isActive,
                    latitude,
                    longitude,
                    googleRating,
                    googleReviewCount,
                }
            }),

            // 2. Categories Add/Remove Logic (Delete old mappings)
            prisma.instituteCategory.deleteMany({
                where: { instituteId: instituteId }
            }),

            // 3. Insert newly selected categories array link setup
            prisma.instituteCategory.createMany({
                data: selectedCategoryIds.map((catId) => ({
                    instituteId: instituteId,
                    categoryId: catId
                }))
            })
        ]);

        // Revalidate clean cascades paths
        revalidatePath("/admin/institutes");
        revalidatePath(`/admin/institutes/${instituteId}`);
        revalidatePath(`/institute/${instituteId}-${slug}`); // Public view card update sync

        return { success: true, message: "Master properties sync completed!" }
    } catch (error) {
        console.error("Admin Master Update Error:", error);
        return { success: false, error: "Something went wrong in transaction database update." }
    }
}