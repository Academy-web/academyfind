import { prisma } from "@/lib/prisma";
import { approveReview, rejectReview } from "@/lib/User/admin/adminReview";
import { CheckCircle, XCircle, Star, MessageSquare } from "lucide-react";

// Server Component: Database se direct PENDING reviews fetch karega
export default async function AdminReviewsPage() {
  const pendingReviews = await prisma.review.findMany({
    where: { status: "PENDING" },
    include: {
      user: { select: { name: true, email: true } },
      institute: { select: { name: true, id: true } },
    },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="p-8 max-w-7xl mx-auto min-h-screen bg-slate-50">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900">Review Moderation</h1>
        <p className="text-slate-500 mt-2">Approve or reject pending institute reviews.</p>
      </div>

      {pendingReviews.length === 0 ? (
        <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center flex flex-col items-center">
          <MessageSquare className="h-16 w-16 text-slate-200 mb-4" />
          <h3 className="text-xl font-semibold text-slate-700">All caught up!</h3>
          <p className="text-slate-500">There are no pending reviews to moderate right now.</p>
        </div>
      ) : (
        <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 text-sm">
                <th className="p-4 font-semibold">User</th>
                <th className="p-4 font-semibold">Institute</th>
                <th className="p-4 font-semibold">Rating</th>
                <th className="p-4 font-semibold w-1/3">Comment</th>
                <th className="p-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {pendingReviews.map((review) => (
                <tr key={review.id} className="hover:bg-slate-50 transition-colors">
                  
                  {/* User Info */}
                  <td className="p-4">
                    <p className="font-semibold text-slate-900">{review.user.name}</p>
                    <p className="text-xs text-slate-500">{review.user.email}</p>
                  </td>

                  {/* Institute Info */}
                  <td className="p-4">
                    <p className="font-medium text-slate-800">{review.institute.name}</p>
                  </td>

                  {/* Rating */}
                  <td className="p-4">
                    <div className="flex items-center gap-1 bg-amber-50 text-amber-600 w-max px-2 py-1 rounded-lg">
                      <span className="font-bold text-sm">{review.rating}</span>
                      <Star className="h-3.5 w-3.5 fill-amber-500 text-amber-500" />
                    </div>
                  </td>

                  {/* Comment */}
                  <td className="p-4">
                    <p className="text-sm text-slate-600 line-clamp-3">
                      {review.comment || <span className="italic text-slate-400">No comment provided</span>}
                    </p>
                  </td>

                  {/* Approve / Reject Actions (Using forms for Server Actions) */}
                  <td className="p-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      
                      {/* Approve Button */}
                      <form action={async () => {
                        "use server";
                        await approveReview(review.id, review.institute.id);
                      }}>
                        <button 
                          type="submit"
                          title="Approve"
                          className="flex items-center justify-center p-2 rounded-xl bg-emerald-100 text-emerald-600 hover:bg-emerald-500 hover:text-white transition-all"
                        >
                          <CheckCircle className="h-5 w-5" />
                        </button>
                      </form>

                      {/* Reject Button */}
                      <form action={async () => {
                        "use server";
                        await rejectReview(review.id);
                      }}>
                        <button 
                          type="submit"
                          title="Reject"
                          className="flex items-center justify-center p-2 rounded-xl bg-red-100 text-red-600 hover:bg-red-500 hover:text-white transition-all"
                        >
                          <XCircle className="h-5 w-5" />
                        </button>
                      </form>

                    </div>
                  </td>

                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}