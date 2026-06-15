import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { MapPin, Briefcase, Star, IndianRupee, ArrowLeft, Target, ShieldCheck } from "lucide-react";
import Link from "next/link";
import ApplyJobForm from "@/components/User/ApplyJobForm";

export default async function JobDetailPage({ params }: { params: Promise<{ slug: string }> }) {
    const {slug} = await params;
    const job = await prisma.jobPosting.findUnique({
        where: { slug: slug, isActive: true }
    });

    if (!job) return notFound();

    return (
        <div className="min-h-screen bg-slate-50/40 font-sans pb-16">
            <header className="bg-linear-to-b from-amber-50 via-background to-transparent dark:from-amber-950/10 pt-10 pb-8 px-4">
                <div className="max-w-6xl mx-auto">
                    <Link href="/careers" className="inline-flex items-center text-sm font-bold text-amber-600 hover:text-amber-800 transition-colors mb-6 bg-white/50 px-3 py-1.5 rounded-lg border border-amber-200 shadow-sm">
                        <ArrowLeft className="w-4 h-4 mr-1.5" /> Back to Careers
                    </Link>
                    
                    <div className="flex gap-2 mb-4">
                        <span className="text-[10px] font-bold uppercase tracking-widest text-amber-700 bg-white px-2.5 py-1 rounded-md border border-amber-200 shadow-sm">{job.department}</span>
                        <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-700 bg-white px-2.5 py-1 rounded-md border border-emerald-200 shadow-sm">{job.type}</span>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight">{job.title}</h1>
                    
                    <div className="flex flex-wrap gap-x-6 gap-y-3 mt-6 text-sm font-medium text-slate-600">
                        <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-lg border border-amber-200 shadow-sm"><MapPin className="w-4 h-4 text-amber-500"/> {job.location}</div>
                        {job.experience && <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-lg border border-amber-200 shadow-sm"><Star className="w-4 h-4 text-amber-500"/> {job.experience}</div>}
                        {job.Salary && <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-lg border border-amber-200 shadow-sm"><IndianRupee className="w-4 h-4 text-amber-500"/> {job.Salary}</div>}
                    </div>
                </div>
            </header>

            <div className="max-w-6xl mx-auto px-4 mt-6 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                
                {/* Left Side: Job Details Content */}
                <div className="lg:col-span-7 space-y-6">
                    <div className="bg-white border border-amber-200 rounded-3xl p-6 md:p-8 shadow-sm flex flex-col gap-6">
                        
                        <div>
                            <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2 mb-3">
                                <div className="p-2 bg-amber-50 text-amber-600 rounded-lg"><Briefcase className="w-4 h-4" /></div> About The Role
                            </h2>
                            <p className="text-sm text-slate-600 leading-relaxed whitespace-pre-wrap">{job.description}</p>
                        </div>
                        
                        <div className="h-px w-full bg-amber-100"></div>

                        <div>
                            <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2 mb-3">
                                <div className="p-2 bg-amber-50 text-amber-600 rounded-lg"><Target className="w-4 h-4" /></div> Key Responsibilities
                            </h2>
                            <p className="text-sm text-slate-600 leading-relaxed whitespace-pre-wrap">{job.responsibilities}</p>
                        </div>

                        <div className="h-px w-full bg-amber-100"></div>

                        <div>
                            <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2 mb-3">
                                <div className="p-2 bg-emerald-50 text-emerald-600 rounded-lg"><ShieldCheck className="w-4 h-4" /></div> Requirements
                            </h2>
                            <p className="text-sm text-slate-600 leading-relaxed whitespace-pre-wrap">{job.requirements}</p>
                        </div>

                        {job.benefits && (
                            <>
                                <div className="h-px w-full bg-amber-100"></div>
                                <div>
                                    <h2 className="text-lg font-bold text-slate-800 mb-3">Benefits & Perks</h2>
                                    <p className="text-sm text-slate-600 leading-relaxed whitespace-pre-wrap">{job.benefits}</p>
                                </div>
                            </>
                        )}
                    </div>
                </div>

                {/* Right Side: Apply Form Sidebar */}
                <div className="lg:col-span-5 bg-white border border-amber-300 rounded-3xl p-6 md:p-8 shadow-xl shadow-amber-900/5 sticky top-24">
                    <div className="mb-6">
                        <h3 className="text-xl font-bold text-slate-800">Submit Application</h3>
                        <p className="text-xs text-slate-400 mt-0.5">Fill out the details below to apply for {job.title}.</p>
                    </div>
                    <ApplyJobForm jobId={job.id} />
                </div>
            </div>
        </div>
    );
}