import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  CalendarDays,
  Clock3,
} from "lucide-react";

const latestPosts = [
  {
    id: "1",
    title: "Best JEE Coaching in Kota (2026 Guide)",
    slug: "best-jee-coaching-kota",
    excerpt:
      "Compare top institutes, fees, faculty, hostel and results before choosing the right coaching.",
    category: "JEE",
    author: "AcademyFind Editorial",
    readTime: "8 min read",
    publishedAt: "24 Jun 2026",
    image:
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1200&q=80",
  },
  {
    id: "2",
    title: "Top NEET Coaching Institutes in Delhi",
    slug: "neet-coaching-delhi",
    excerpt:
      "Everything you should know before taking admission in Delhi's top NEET institutes.",
    category: "NEET",
    author: "Career Experts",
    readTime: "6 min read",
    publishedAt: "22 Jun 2026",
    image:
      "https://images.unsplash.com/photo-1513258496099-48168024aec0?w=1200&q=80",
  },
  {
    id: "3",
    title: "Complete CUET Preparation Strategy",
    slug: "cuet-preparation-strategy",
    excerpt:
      "A realistic preparation roadmap for CUET aspirants with subject-wise planning.",
    category: "CUET",
    author: "Admissions Desk",
    readTime: "7 min read",
    publishedAt: "20 Jun 2026",
    image:
      "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=1200&q=80",
  },
  {
    id: "4",
    title: "Best UPSC Coaching in Delhi",
    slug: "upsc-coaching-delhi",
    excerpt:
      "Compare faculty, answer writing, GS batches and interview guidance.",
    category: "UPSC",
    author: "AcademyFind Editorial",
    readTime: "10 min read",
    publishedAt: "19 Jun 2026",
    image:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1200&q=80",
  },
  {
    id: "5",
    title: "How To Select The Right Coaching Institute",
    slug: "select-right-coaching",
    excerpt:
      "Avoid these common mistakes students make before joining coaching.",
    category: "Guides",
    author: "Career Experts",
    readTime: "5 min read",
    publishedAt: "18 Jun 2026",
    image:
      "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=1200&q=80",
  },
  {
    id: "6",
    title: "Best Books For JEE Main 2026",
    slug: "best-books-jee-main",
    excerpt:
      "Our recommended books for Physics, Chemistry and Mathematics.",
    category: "Books",
    author: "JEE Expert Team",
    readTime: "4 min read",
    publishedAt: "17 Jun 2026",
    image:
      "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?w=1200&q=80",
  },
];

export default function LatestPosts() {
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
            href="/blog"
            className="inline-flex items-center gap-2 self-start rounded-xl border border-slate-200 bg-white px-5 py-3 font-semibold text-slate-700 transition hover:border-amber-300 hover:bg-amber-50 hover:text-amber-700"
          >
            View All Articles

            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {/* Grid */}

        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
          {latestPosts.map((post) => (
            <Link
              key={post.id}
              href={`/blog/${post.slug}`}
              className="group overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-amber-200 hover:shadow-xl"
            >
              {/* Image */}

              <div className="relative aspect-[16/10] overflow-hidden">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover transition duration-700 group-hover:scale-105"
                />

                <div className="absolute left-5 top-5 rounded-full bg-amber-400 px-3 py-1.5 text-xs font-bold text-slate-900">
                  {post.category}
                </div>
              </div>

              {/* Body */}

              <div className="p-6">

                <div className="flex items-center gap-5 text-sm text-slate-500">

                  <div className="flex items-center gap-2">
                    <Clock3 className="h-4 w-4 text-amber-500" />
                    {post.readTime}
                  </div>

                  <div className="flex items-center gap-2">
                    <CalendarDays className="h-4 w-4 text-amber-500" />
                    {post.publishedAt}
                  </div>

                </div>

                <h3 className="mt-5 line-clamp-2 text-2xl font-bold leading-tight text-slate-900 transition group-hover:text-amber-600">
                  {post.title}
                </h3>

                <p className="mt-4 line-clamp-3 leading-7 text-slate-600">
                  {post.excerpt}
                </p>

                <div className="mt-6 flex items-center justify-between border-t border-slate-100 pt-5">
                  <span className="text-sm font-medium text-slate-700">
                    By {post.author}
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
                {/* Load More */}

        <div className="mt-14 flex justify-center">
          <button
            type="button"
            className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-8 py-4 text-sm font-semibold text-slate-700 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-amber-300 hover:bg-amber-50 hover:text-amber-700 hover:shadow-lg"
          >
            Load More Articles

            <ArrowRight className="h-4 w-4" />
          </button>
        </div>

        {/* Bottom Info */}

        <div className="mt-10 text-center">
          <p className="text-sm text-slate-500">
            Showing{" "}
            <span className="font-semibold text-slate-700">
              {latestPosts.length}
            </span>{" "}
            latest articles from the AcademyFind Knowledge Hub.
          </p>
        </div>
      </div>
    </section>
  );
}