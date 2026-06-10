import { prisma } from "@/lib/prisma";
import { Lock, MessageSquare, Mail, Phone, Calendar } from "lucide-react";
import Link from "next/link";
import { format } from "date-fns";
import { PLAN_LIMITS,PlanType } from "@/lib/plan_limits";

export default async function EnquiriesPage({ params }: { params: Promise<{ instituteId: string }> }) {
    const { instituteId } = await params;

    const institute = await prisma.institute.findUnique({
        where: { id: instituteId },
        include: {
            enquiries: { orderBy: { createdAt: 'desc' } } // Latest leads first
        }
    });

    if (!institute) return <div>Institute not found</div>;

    const limits = PLAN_LIMITS[institute.subscriptionPlan as PlanType];

    // 🔒 LOCK SCREEN FOR BASIC PLAN
    if (!limits.hasLeads) {
        return (
            <div className="min-h-[500px] flex flex-col items-center justify-center text-center p-8 bg-slate-50/50 rounded-3xl border border-dashed border-slate-200">
                <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mb-6">
                    <Lock className="w-8 h-8" />
                </div>
                <h2 className="text-2xl font-bold text-slate-800 mb-2">Student Leads Locked</h2>
                <p className="text-slate-500 max-w-md mb-6">
                    Unlock direct student enquiries and lead generation. Upgrade to the <b>Verified, Premium  Plan</b> or <b>Featured </b>to see who is trying to contact your academy.
                </p>
                <Link href={`/manager/${instituteId}/subscription`} className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-xl font-medium transition">
                    View Upgrade Plans
                </Link>
            </div>
        );
    }

    // 🔓 UNLOCKED VIEW FOR PREMIUM/ULTRA
    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            <div>
                <h2 className="text-2xl font-extrabold text-slate-900 flex items-center gap-2">
                    <MessageSquare className="w-6 h-6 text-blue-600" /> Student Enquiries
                </h2>
                <p className="text-sm text-slate-500 mt-1">Manage all the direct contact requests from students.</p>
            </div>

            {institute.enquiries.length === 0 ? (
                <div className="p-12 text-center border rounded-3xl bg-slate-50">
                    <p className="text-slate-500">No enquiries yet. Keep your profile updated to attract more students!</p>
                </div>
            ) : (
                <div className="grid gap-4">
                    {institute.enquiries.map((enquiry) => (
                        <div key={enquiry.id} className="p-5 border border-slate-100 rounded-2xl shadow-sm bg-white hover:border-blue-100 transition-colors">
                            <div className="flex justify-between items-start mb-3">
                                <div>
                                    <h3 className="font-bold text-lg text-slate-800">{enquiry.name}</h3>
                                    <span className="inline-block mt-1 text-[10px] bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded font-bold tracking-wider">
                                        {enquiry.status}
                                    </span>
                                </div>
                                <div className="text-xs text-slate-400 flex items-center gap-1">
                                    <Calendar className="w-3 h-3" /> {format(new Date(enquiry.createdAt), "PPp")}
                                </div>
                            </div>
                            
                            <p className="text-sm text-slate-700 bg-slate-50 p-3 rounded-xl mb-4 italic">
                                "{enquiry.message || "No message provided."}"
                            </p>
                            
                            <div className="flex items-center gap-6 text-sm text-slate-600">
                                <a href={`mailto:${enquiry.email}`} className="flex items-center gap-1.5 hover:text-blue-600">
                                    <Mail className="w-4 h-4" /> {enquiry.email}
                                </a>
                                <a href={`tel:${enquiry.phone}`} className="flex items-center gap-1.5 hover:text-blue-600">
                                    <Phone className="w-4 h-4" /> {enquiry.phone}
                                </a>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}