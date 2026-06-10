import { prisma } from "@/lib/prisma"
import { Users as UsersIcon, Mail, Phone, Calendar } from "lucide-react"
import { format } from "date-fns"
import { RoleSelect, UserStatusToggle } from "@/components/admin/UserClientControl" // Jo aapne pehle banaye the
import UserFilters from "@/components/admin/UserFilters"
import UserPagination from "@/components/admin/UserPagination"

export default async function AdminUsersPage({
    searchParams
}: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
    // 1. Parse Search Params
    const params = await searchParams;
    const page = Number(params.page) || 1;
    const limit = 50; // Per page 50 users load honge
    const search = typeof params.search === 'string' ? params.search : '';
    const role = typeof params.role === 'string' ? params.role : '';

    // 2. Build Prisma Where Condition dynamically
    const whereCondition: any = {};

    if (search) {
        whereCondition.OR = [
            { name: { contains: search, mode: 'insensitive' } },
            { email: { contains: search, mode: 'insensitive' } }
        ];
    }
    
    if (role) {
        // Enums ko Prisma filter mein as directly assign kiya jata hai
        whereCondition.role = role as any; 
    }

    // 3. Execute Parallel Queries
    const [totalUsers, users] = await Promise.all([
        prisma.user.count({ where: whereCondition }),
        prisma.user.findMany({
            where: whereCondition,
            take: limit,
            skip: (page - 1) * limit,
            orderBy: { createdAt: 'desc' }
        })
    ]);

    const totalPages = Math.ceil(totalUsers / limit);

    return (
        <div className="space-y-4 animate-in fade-in duration-500">
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-2">
                <div>
                    <h1 className="text-3xl font-extrabold text-slate-900 flex items-center gap-2">
                        <UsersIcon className="w-8 h-8 text-blue-600" /> User Management
                    </h1>
                    <p className="text-slate-500 mt-1">Found {totalUsers} matching users.</p>
                </div>
            </div>

            {/* 🚀 Filter Component Inserted Here */}
            <UserFilters />

            {/* Users Table */}
            <div className="bg-white border border-slate-200 rounded-t-2xl shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                        <thead className="bg-slate-50 text-slate-500 font-semibold border-b border-slate-200">
                            <tr>
                                <th className="p-4">User Details</th>
                                <th className="p-4">Contact Info</th>
                                <th className="p-4">Registered On</th>
                                <th className="p-4">Platform Role</th>
                                <th className="p-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {users.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="p-8 text-center text-slate-400">No users match your filters.</td>
                                </tr>
                            ) : (
                                users.map((user) => (
                                    <tr key={user.id} className={`hover:bg-slate-50/50 transition-colors ${!user.isActive ? 'bg-red-50/30' : ''}`}>
                                        
                                        <td className="p-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center font-bold text-slate-500 overflow-hidden shrink-0">
                                                    {user.image ? (
                                                        <img src={user.image} alt="avatar" className="w-full h-full object-cover" />
                                                    ) : (
                                                        user.name?.charAt(0).toUpperCase() || "U"
                                                    )}
                                                </div>
                                                <div>
                                                    <div className="font-bold text-slate-800">{user.name || "Unknown User"}</div>
                                                    {!user.isActive && <span className="text-[10px] text-red-500 font-bold uppercase tracking-wider">Blocked</span>}
                                                </div>
                                            </div>
                                        </td>

                                        <td className="p-4 text-slate-600 space-y-1">
                                            <div className="flex items-center gap-1.5">
                                                <Mail className="w-3.5 h-3.5 text-slate-400" /> {user.email}
                                            </div>
                                            <div className="flex items-center gap-1.5">
                                                <Phone className="w-3.5 h-3.5 text-slate-400" /> {user.phone || "N/A"}
                                            </div>
                                        </td>

                                        <td className="p-4 text-slate-500">
                                            <div className="flex items-center gap-1.5">
                                                <Calendar className="w-4 h-4" />
                                                {format(new Date(user.createdAt), "MMM dd, yyyy")}
                                            </div>
                                        </td>

                                        <td className="p-4">
                                            <RoleSelect userId={user.id} currentRole={user.role} />
                                        </td>

                                        <td className="p-4 text-right">
                                            {user.role !== "ADMIN" ? (
                                                <UserStatusToggle userId={user.id} isActive={user.isActive} />
                                            ) : (
                                                <span className="text-xs text-slate-400 font-medium px-3 py-1.5">Superuser</span>
                                            )}
                                        </td>
                                        
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* 🚀 Pagination Component Inserted Here */}
            <UserPagination totalPages={totalPages} currentPage={page} />

        </div>
    )
}