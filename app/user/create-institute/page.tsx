import CreateInstituteForm from "@/components/User/CreateInstitute";
import ClaimForm from "@/components/institute/ClaimForm";
import { auth } from "@/lib/auth/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "List Your Institute | AcademyFind",
  robots: {
    index: false,
    follow: false,
  },
};

export default async function UserCreateInstitutePage() {
    // 1. Session check
    const session = await auth.api.getSession({
        headers: await headers()
    });

    if (!session) redirect('/login');

    // 2. Fetch User alongside their InstituteManager relation map
    const user = await prisma.user.findUnique({
        where: { id: session.user.id },
        include: {
            managedInstitutes: true 
        }
    });

    if (!user) redirect('/login');

    // Fetch the absolute newest request context
    const latestReq = await prisma.instituteRequest.findFirst({
        where: { userId: user.id },
        orderBy: { createdAt: "desc" }
    });


    // ==========================================
    // CASE A: User has NO permission to add (Strict Early Returns)
    // ==========================================
    if (!user.canAddInstitute) {
        if (latestReq?.status === "REJECTED") {
            return (
                <div className="container mx-auto py-10 px-4 font-sans">
                    <div className="flex flex-col items-center justify-center text-center p-8 bg-red-50 border-2 border-red-200 rounded-3xl max-w-2xl mx-auto shadow-sm">
                        <h1 className="text-2xl font-bold text-red-700 mb-2">Institute Request Rejected</h1>
                        <p className="text-red-600 mb-6 font-medium">
                            Unfortunately, your previous submission did not meet our guidelines and was not approved by the admin team.
                        </p>
                        <p className="text-sm text-slate-500">
                            Please contact support for more details or if you believe this was a mistake.
                        </p>
                    </div>
                </div>
            );
        }

        if (latestReq?.status === "PENDING") {
            const latestInstitute = await prisma.institute.findUnique({
                where: { id: latestReq.instituteId },
                select: { id: true, name: true }
            });

            return (
                <div className="container mx-auto py-10 px-4 space-y-8 font-sans">
                    <div className="flex flex-col items-center justify-center text-center p-4">
                        <h1 className="text-2xl font-bold text-slate-800">Your Institute Is Under Review</h1>
                        <p className="text-slate-500 mt-2 max-w-2xl">
                            You have already submitted a request to add an institute. Until admin approves it, complete the claim form here so ownership details stay attached to the same institute request.
                        </p>
                    </div>

                    {latestInstitute ? (
                        <ClaimForm
                            instituteId={latestInstitute.id}
                            instituteName={latestInstitute.name}
                            userId={user.id}
                        />
                    ) : (
                        <div className="text-center p-4 text-slate-500">Loading institute details...</div>
                    )}
                </div>
            );
        }

        return (
            <div className="container mx-auto py-10 px-4 font-sans">
                <div className="flex flex-col items-center justify-center text-center p-8 bg-slate-50 border rounded-3xl max-w-2xl mx-auto">
                    <h2 className="text-xl font-bold text-slate-800">Action Restricted</h2>
                    <p className="text-slate-500 mt-2">You currently do not have permission to add a new institute.</p>
                </div>
            </div>
        );
    }


    // ==========================================
    // CASE B: User CAN add (Form renders, Banner shows logic)
    // ==========================================
    const allCities = await prisma.city.findMany({ orderBy: { name: 'asc' } });
    const allCategories = await prisma.category.findMany({ orderBy: { name: 'asc' } });

    // Determine conditional banner states
    let bannerComponent = null;

    if (latestReq?.status === "REJECTED") {
        bannerComponent = (
            <div className="flex flex-col items-center justify-center text-center p-6 bg-amber-50 border border-amber-200 rounded-2xl max-w-4xl mx-auto mb-8 shadow-sm">
                <h2 className="text-lg font-bold text-amber-800 mb-1">Your Last Request Was Rejected</h2>
                <p className="text-sm text-amber-700 font-medium">
                    Your previous submission did not meet our guidelines. However, you can use the form below to submit a clean new institute listing request.
                </p>
            </div>
        );
    } 
    
    else if (latestReq?.status === "APPROVED") {
        // Look up against the complete mapping database layer array
        const isAlreadyManager = user.managedInstitutes.some(
            (manager: { instituteId: string }) => manager.instituteId === latestReq.instituteId
        );

        if (isAlreadyManager) {
            bannerComponent = (
                <div className="flex flex-col items-center justify-center text-center p-6 bg-emerald-50 border border-emerald-200 rounded-2xl max-w-4xl mx-auto mb-8 shadow-sm">
                    <h2 className="text-lg font-bold text-emerald-800 mb-1">Your Last Request Was Approved!</h2>
                    <p className="text-sm text-emerald-700 font-medium mb-3">
                        You have successfully claimed and are recognized as a manager for this institute. You can access your management zone now.
                    </p>
                    <Link href="/manager" passHref legacyBehavior>
                        <Button className="bg-emerald-600 text-white hover:bg-emerald-700 transition size-sm">
                            Go to Dashboard
                        </Button>
                    </Link>
                </div>
            );
        } else {
            bannerComponent = (
                <div className="flex flex-col items-center justify-center text-center p-6 bg-sky-50 border border-sky-200 rounded-2xl max-w-4xl mx-auto mb-8 shadow-sm">
                    <h2 className="text-lg font-bold text-sky-800 mb-1">Request Approved but Unclaimed</h2>
                    <p className="text-sm text-sky-700 font-medium mb-3">
                        Great news! Your request was approved, but you have not claimed ownership rights yet. Please fill out the claim application form.
                    </p>
                    <Link href={`/user/create-institute/${latestReq.instituteId}/claim`} passHref legacyBehavior>
                        <Button className="bg-sky-600 text-white hover:bg-sky-700 transition size-sm">
                            Claim Your Institute Now
                        </Button>
                    </Link>
                </div>
            );
        }
    }

    return (
        <div className="container mx-auto py-10 px-4">
            {/* Conditional Notification Banner if history rules match */}
            {bannerComponent}

            {/* Always Available Creation Interface for Authorized Users */}
            <div className="max-w-4xl mx-auto">
                <h1 className="text-3xl font-bold mb-2 text-slate-800">List Your Institute</h1>
                <p className="text-slate-500 mb-8">Fill up the form parameters below to propose a new corporate institute request listing.</p>
                
                <CreateInstituteForm 
                    userId={user.id} 
                    allCities={allCities} 
                    allCategories={allCategories} 
                />
            </div>
        </div>
    );
}
