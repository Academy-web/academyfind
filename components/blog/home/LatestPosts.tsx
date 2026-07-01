import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  CalendarDays,
  Clock3,
} from "lucide-react";

interface LatestPostsProps {
  posts: any[];
}

const DEFAULT_IMAGE = "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1200&q=80";

export default function LatestPosts({ posts }: LatestPostsProps) {
  const formatDate = (dateVal: any) => {
    if (!dateVal) return "Recently";
    return new Intl.DateTimeFormat("en-IN", { dateStyle: "medium" }).format(new Date(dateVal));
  };

  return (
    <section className="bg-slate-50 py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <span className="rounded-full bg-amber-50 px-4 py-2 text-sm font-semibold text-amber-700">
              Latest Articles
            </span>

            <h2 className="mt-5 text-3xl font-black tracking-tight text-slate-900 md:text-4xl">
              Fresh insights for every student
            </h2>

            <p className="mt-4 max-w-2xl text-lg leading-8 text-slate-600">
              Stay updated with coaching reviews, admission news,
              preparation strategies and career guidance from
              AcademyFind experts.
            </p>
          </div>

          <Link
            href="/blog/search"
            className="inline-flex items-center gap-2 self-start rounded-xl border border-slate-200 bg-white px-5 py-3 font-semibold text-slate-700 transition hover:border-amber-300 hover:bg-amber-50 hover:text-amber-700"
          >
            View All Articles
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {/* Dynamic empty state check */}
        {!posts || posts.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-slate-300 bg-white px-5 py-16 text-center shadow-sm">
            <h3 className="text-xl font-bold text-slate-800">No articles found.</h3>
            <p className="mt-2 text-slate-500 max-w-md mx-auto text-sm leading-6">
              There are no published articles under this category yet. Check back soon or browse all articles.
            </p>
            <Link
              href="/blog"
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-amber-400 px-6 py-3 text-sm font-semibold text-slate-900 transition hover:bg-amber-500"
            >
              Reset Filters
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        ) : (
          <>
            {/* Grid */}
            <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
              {posts.map((post) => (
                <Link
                  key={post.id}
                  href={`/blog/${post.slug}`}
                  className="group overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-amber-200 hover:shadow-xl"
                >
                  {/* Image */}
                  <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
                    <Image
                      src={post.coverImage || DEFAULT_IMAGE}
                      alt={post.title}
                      fill
                      className="object-cover transition duration-700 group-hover:scale-105"
                    />

                    <div className="absolute left-5 top-5 rounded-full bg-amber-400 px-3 py-1.5 text-xs font-bold text-slate-900">
                      {post.category?.name || "Education"}
                    </div>
                  </div>

                  {/* Body */}
                  <div className="p-6">
                    <div className="flex items-center gap-5 text-sm text-slate-500">
                      <div className="flex items-center gap-2">
                        <Clock3 className="h-4 w-4 text-amber-500" />
                        {post.readingTime || 5} min read
                      </div>

                      <div className="flex items-center gap-2">
                        <CalendarDays className="h-4 w-4 text-amber-500" />
                        {formatDate(post.publishedAt)}
                      </div>
                    </div>

                    <h3 className="mt-5 line-clamp-2 text-2xl font-bold leading-tight text-slate-900 transition group-hover:text-amber-600">
                      {post.title}
                    </h3>

                    <p className="mt-4 line-clamp-3 leading-7 text-slate-600 text-sm">
                      {post.excerpt}
                    </p>

                    <div className="mt-6 flex items-center justify-between border-t border-slate-100 pt-5">
                      <span className="text-sm font-medium text-slate-700">
                        By {post.authorProfile?.displayName || "AcademyFind Editorial"}
                      </span>

                      <span className="inline-flex items-center gap-2 font-semibold text-amber-600">
                        Read
                        <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {/* Load More redirects to Search Page with current Category filter if active */}
            <div className="mt-14 flex justify-center">
              <Link
                href="/blog/search"
                className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-8 py-4 text-sm font-semibold text-slate-700 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-amber-300 hover:bg-amber-50 hover:text-amber-700 hover:shadow-lg"
              >
                Load More Articles
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            {/* Bottom Info */}
            <div className="mt-10 text-center">
              <p className="text-sm text-slate-500">
                Showing{" "}
                <span className="font-semibold text-slate-700">
                  {posts.length}
                </span>{" "}
                latest articles from the AcademyFind Knowledge Hub.
              </p>
            </div>
          </>
        )}
      </div>
    </section>
  );
}