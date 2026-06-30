// components/blog/author/AuthorStats.tsx

import {
  Eye,
  FileText,
  Heart,
  MessageCircle,
  Users,
  CalendarDays,
} from "lucide-react";

type AuthorStatsProps = {
  totalPosts: number;
  totalViews: number;
  totalLikes: number;
  totalComments: number;
  followerCount: number;
  joinedAt: Date;
};

export default function AuthorStats({
  totalPosts,
  totalViews,
  totalLikes,
  totalComments,
  followerCount,
  joinedAt,
}: AuthorStatsProps) {
  const stats = [
    {
      label: "Articles",
      value: totalPosts.toLocaleString(),
      icon: FileText,
      color: "bg-blue-100 text-blue-600",
    },
    {
      label: "Views",
      value: totalViews.toLocaleString(),
      icon: Eye,
      color: "bg-emerald-100 text-emerald-600",
    },
    {
      label: "Likes",
      value: totalLikes.toLocaleString(),
      icon: Heart,
      color: "bg-rose-100 text-rose-600",
    },
    {
      label: "Comments",
      value: totalComments.toLocaleString(),
      icon: MessageCircle,
      color: "bg-violet-100 text-violet-600",
    },
    {
      label: "Followers",
      value: followerCount.toLocaleString(),
      icon: Users,
      color: "bg-amber-100 text-amber-600",
    },
    {
      label: "Member Since",
      value: joinedAt.toLocaleDateString("en-IN", {
        month: "short",
        year: "numeric",
      }),
      icon: CalendarDays,
      color: "bg-slate-100 text-slate-600",
    },
  ];

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-slate-900">
          Author Statistics
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Overall publishing performance and engagement.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {stats.map((stat: any) => {
          const Icon = stat.icon;

          return (
            <div
              key={stat.label}
              className="rounded-xl border border-slate-200 p-5 transition-all hover:border-amber-300 hover:shadow-md"
            >
              <div
                className={`mb-4 flex h-12 w-12 items-center justify-center rounded-xl ${stat.color}`}
              >
                <Icon className="h-6 w-6" />
              </div>

              <h3 className="text-2xl font-bold text-slate-900">
                {stat.value}
              </h3>

              <p className="mt-1 text-sm text-slate-500">
                {stat.label}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}