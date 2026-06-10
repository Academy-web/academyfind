import { prisma } from "@/lib/prisma";
import { CheckCircle2, CreditCard } from "lucide-react";

export default async function SubscriptionPage({ params }: { params: Promise<{ instituteId: string }> }) {
    const { instituteId } = await params;
    const institute = await prisma.institute.findUnique({ where: { id: instituteId } });
    if (!institute) return null;

    const currentPlan = institute.subscriptionPlan; // BASIC, PREMIUM, ULTRA

    const plans = [
        { name: "BASIC", price: "Free", desc: "For claiming and editing your academy profile.", features: ["Edit Profile", "Upload Gallery", "Standard Visibility"] },
        { name: "PREMIUM", price: "₹2,499/mo", desc: "Capture direct leads from students.", features: ["Everything in Basic", "Direct Enquiry Form", "Lead Management", "Verified Badge"] },
        { name: "ULTRA", price: "₹4,999/mo", desc: "Maximum reach and deep analytics.", features: ["Everything in Premium", "Audience Analytics", "Featured Ranking", "Save/Shortlist Tracking"] },
    ];

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            <div className="text-center max-w-2xl mx-auto">
                <h2 className="text-3xl font-extrabold text-slate-900 flex items-center justify-center gap-2">
                    <CreditCard className="w-7 h-7 text-amber-500" /> Subscription Plans
                </h2>
                <p className="text-sm text-slate-500 mt-2">Upgrade your plan to generate more admissions and track your performance.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
                {plans.map((plan) => (
                    <div key={plan.name} className={`relative p-6 rounded-3xl border-2 flex flex-col ${
                        currentPlan === plan.name ? "border-amber-400 bg-amber-50/10 shadow-md" : "border-slate-100 bg-white"
                    }`}>
                        {currentPlan === plan.name && (
                            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-amber-400 text-amber-950 px-3 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase">
                                Current Plan
                            </div>
                        )}
                        <h3 className="text-xl font-bold text-slate-800">{plan.name}</h3>
                        <div className="text-2xl font-extrabold text-blue-600 mt-2">{plan.price}</div>
                        <p className="text-xs text-slate-500 mt-2 mb-6 h-8">{plan.desc}</p>
                        
                        <ul className="space-y-3 mb-8 flex-1">
                            {plan.features.map((feature, i) => (
                                <li key={i} className="flex items-start gap-2 text-sm text-slate-700">
                                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" /> {feature}
                                </li>
                            ))}
                        </ul>

                        <button className={`w-full py-2.5 rounded-xl font-bold text-sm transition ${
                            currentPlan === plan.name 
                                ? "bg-slate-100 text-slate-400 cursor-not-allowed" 
                                : "bg-slate-900 text-white hover:bg-blue-600"
                        }`}>
                            {currentPlan === plan.name ? "Active" : "Upgrade Now"}
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}