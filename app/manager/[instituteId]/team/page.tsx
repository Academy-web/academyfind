import { prisma } from "@/lib/prisma";
import { Users, UserPlus, ShieldAlert } from "lucide-react";

export default async function TeamPage({ params }: { params: Promise<{ instituteId: string }> }) {
    const { instituteId } = await params;

    // Fetch all managers of this institute
    const team = await prisma.instituteManager.findMany({
        where: { instituteId },
        include: { user: { select: { name: true, email: true, image: true, createdAt: true } } }
    });

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            <div className="flex justify-between items-end border-b pb-4">
                <div>
                    <h2 className="text-2xl font-extrabold text-slate-900 flex items-center gap-2">
                        <Users className="w-6 h-6 text-emerald-600" /> Team Management
                    </h2>
                    <p className="text-sm text-slate-500 mt-1">Manage staff and co-owners for this academy profile.</p>
                </div>
                {/* Is button ko aage chalkar dialog/modal mein convert kar dena "Add Staff" ke form ke liye */}
                <button className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-xl text-sm font-medium flex items-center gap-2">
                    <UserPlus className="w-4 h-4" /> Add Member
                </button>
            </div>

            <div className="bg-blue-50/50 border border-blue-100 p-4 rounded-2xl flex gap-3 text-sm text-blue-800">
                <ShieldAlert className="w-5 h-5 shrink-0 mt-0.5" />
                <p><strong>Note:</strong> Anyone added here will get full Manager access to this institute, and they will automatically share your current <b>Premium/Ultra</b> subscription benefits.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                {team.map((member) => (
                    <div key={member.userId} className="flex items-center gap-4 p-4 border border-slate-100 rounded-2xl shadow-sm bg-white">
                        <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center font-bold text-slate-500 overflow-hidden">
                            {member.user.image ? (
                                <img src={member.user.image} alt={member.user.name || "User"} className="w-full h-full object-cover" />
                            ) : (
                                member.user.name?.charAt(0).toUpperCase() || "U"
                            )}
                        </div>
                        <div>
                            <h4 className="font-bold text-slate-800">{member.user.name}</h4>
                            <p className="text-xs text-slate-500">{member.user.email}</p>
                            <span className="inline-block mt-1 text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded font-mono uppercase">
                                Co-Manager
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}