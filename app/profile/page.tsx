import {auth} from "@/lib/auth";
import {headers} from 'next/headers';
import {redirect} from 'next/navigation';
import { Card,CardContent,CardHeader,CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import Image from "next/image";
import LogoutButton from "@/components/layout/LogOut";

export default async function ProfilePage() {
    const session = await auth.api.getSession({
        headers: await headers()
    })

    if(!session){
        redirect('/login');
    }

    const {user} = session;
  

    return (
        <div className="container mx-auto py-10 max-w-3xl">
            <h1 className="text-3xl font-bold mb-8">Account Settings</h1>
            <div className="grid gap-6 px-3 lg:px-0">
                {/*Profile Card */}
                <Card className="rounded-3xl border-slate-100 shadow-sm overflow-hidden">
                    <CardHeader className="flex flex-row items-center justify-between bg-slate-50/50 border-b border-slate-100">
                        {/* Title aur Badge ko ek div mein group kar diya */}
                        <div className="flex items-center gap-3">
                            <CardTitle className="text-xl">Personal Information</CardTitle>
                            <Badge className={user.role === 'ADMIN' ? 'bg-green-500 hover:bg-green-600' : 'bg-amber-600 hover:bg-amber-700'}>
                                {user.role}
                            </Badge>
                        </div>
                        <LogoutButton />
                    </CardHeader>
                    
                    <CardContent className="space-y-8 pt-8">
                        {/* Top Section: Avatar & Name */}
                        <div className="flex items-center gap-6">
                            <div className="h-16 w-16 rounded-full bg-amber-100 flex items-center justify-center text-2xl font-bold text-amber-600 shrink-0">
                                {user.image ? (
                                    <Image
                                        src={user.image}
                                        alt={user.name || "User"}
                                        width={64}
                                        height={64}
                                        className="rounded-full border h-full w-full object-cover"
                                    />
                                ) : (
                                    <div className="flex h-full w-full items-center justify-center rounded-full bg-amber-100 font-semibold text-amber-700">
                                        {user.name?.charAt(0).toUpperCase() || "U"}
                                    </div>
                                )}
                            </div>
                            <div>
                                <h2 className="text-xl font-bold text-slate-800">{user.name}</h2>
                                <p className="text-slate-500">{user.email}</p>
                            </div>
                        </div>

                        {/* Bottom Section: Details Grid (Flex se bahar nikal diya) */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t border-slate-100">
                            <div>
                                <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Phone</label>
                                <p className="mt-1 font-medium text-slate-700">{user.phone || "Not Added"}</p>
                            </div>
                            <div>
                                <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Member Since</label>
                                <p className="mt-1 font-medium text-slate-700">{format(new Date(user.createdAt),"PPP")}</p>
                            </div>
                            <div>
                                <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Account Status</label>
                                <div className="mt-1">
                                    <span className="inline-flex items-center gap-1.5 font-medium text-slate-700">
                                        <span className={`w-2 h-2 rounded-full ${user.isActive ? 'bg-green-500' : 'bg-red-500'}`}></span>
                                        {user.isActive ? "Active" : "Inactive"}
                                    </span>
                                </div>
                            </div>
                            <div>
                                <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Verification</label>
                                <p className="mt-1 font-medium text-slate-700">{user.emailVerified ? "Verified ✅" : "Pending ⏳"}</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}