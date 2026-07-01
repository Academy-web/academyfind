import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Clock3,
  Flame,
} from "lucide-react";

interface TrendingPostsProps {
  posts: any[];
}

const DEFAULT_IMAGE = "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=1200&q=80";

export default function TrendingPosts({ posts }: TrendingPostsProps) {
  // Requirement #2: Hide the section completely if there are no trending posts
  if (!posts || posts.length === 0) {
    return null;
  }

  return (
    <section className="bg-slate-50 py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mb-12 flex items-end justify-between">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-red-50 px-4 py-2 text-sm font-semibold text-red-600">
              <Flame className="h-4 w-4" />
              Trending This Week
            </span>

            <h2 className="mt-5 text-4xl font-black tracking-tight text-slate-900">
              Most Read Articles
            </h2>

            <p className="mt-4 max-w-2xl text-lg leading-8 text-slate-600">
              Discover the articles students are reading the most this week.
            </p>
          </div>

          <Link
            href="/blog/search?sort=popular"
            className="hidden items-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3 font-semibold text-slate-700 transition hover:border-amber-300 hover:bg-amber-50 hover:text-amber-700 lg:inline-flex"
          >
            Explore All
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {posts.map((post) => (
            <Link
              key={post.id}
              href={`/blog/${post.slug}`}
              className="group overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-amber-200 hover:shadow-xl"
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
                <Image
                  src={post.coverImage || DEFAULT_IMAGE}
                  alt={post.title}
                  fill
                  className="object-cover transition duration-700 group-hover:scale-105"
                />

                <div className="absolute left-4 top-4 rounded-full bg-amber-400 px-3 py-1 text-xs font-bold text-slate-900">
                  {post.category?.name || "Education"}
                </div>
              </div>

              <div className="p-5">
                <div className="flex items-center gap-2 text-sm text-slate-500">
                  <Clock3 className="h-4 w-4 text-amber-500" />
                  {post.readingTime || 5} min read
                </div>

                <h3 className="mt-4 line-clamp-2 text-xl font-bold leading-snug text-slate-900 transition group-hover:text-amber-600">
                  {post.title}
                </h3>
                
                <div className="mt-6 inline-flex items-center gap-2 font-semibold text-amber-600">
                  Read Article
                  <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}