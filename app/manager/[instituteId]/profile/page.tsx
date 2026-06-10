import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import EditProfileForm from "./edit/EditProfileForm";

export default async function ManagerProfilePage({
    params
}: {
    params: Promise<{ instituteId: string }>
}) {
    // 🚀 Await params properly to avoid type errors
    const { instituteId } = await params;

    // Fetch Institute Data
    const institute = await prisma.institute.findUnique({
        where: { id: instituteId },
        include:{
            teachers: true
        }
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
        </div>
    );
}