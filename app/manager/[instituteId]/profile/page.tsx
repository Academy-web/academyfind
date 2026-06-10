import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import EditProfileForm from "./EditProfileForm";

export default async function ManagerProfilePage({
    params
}: {
    params: Promise<{ instituteId: string }>
}) {
    // 🚀 Await params properly to avoid type errors
    const { instituteId } = await params;

    // Fetch Institute Data
    const institute = await prisma.institute.findUnique({
        where: { id: instituteId }
    });

    if (!institute) return redirect("/manager");

    return (
        <div className="max-w-4xl space-y-8 animate-in fade-in duration-500">
            {/* Header Section */}
            <div>
                <h2 className="text-2xl font-extrabold tracking-tight text-slate-900">Institute Profile</h2>
                <p className="text-sm text-slate-500 mt-1">
                    Update your academy's public information. This data will be visible to students on your public page.
                </p>
            </div>

            {/* Form Section */}
            <div className="p-6 md:p-8 bg-slate-50 border border-slate-100 rounded-3xl shadow-sm">
                <EditProfileForm institute={institute} />
            </div>

            {/* Gallery Hint (Optional Future Feature) */}
            <div className="p-6 bg-blue-50/50 border border-blue-100 rounded-3xl text-sm text-blue-800">
                <p className="font-semibold flex items-center gap-2">
                    🖼️ Want to add Photos?
                </p>
                <p className="mt-1 text-blue-600/80">
                    Gallery upload feature will be available soon. Keep your description highly detailed to attract more students!
                </p>
            </div>
        </div>
    );
}