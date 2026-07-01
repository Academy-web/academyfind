"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Flame } from "lucide-react";

interface CategoryTabsProps {
  activeCategorySlug?: string;
  categories: { id: string; name: string; slug: string }[];
}

export default function CategoryTabs({
  activeCategorySlug = "",
  categories,
}: CategoryTabsProps) {
  const searchParams = useSearchParams();

  // Preserves search query parameters (like sorting/q) while resetting page to 1
  const getCategoryHref = (slug: string) => {
    const params = new URLSearchParams(searchParams?.toString() || "");
    params.set("page", "1");
    if (!slug) {
      params.delete("category");
    } else {
      params.set("category", slug);
    }
    return `/blog?${params.toString()}`;
  };

  return (
    <section className="sticky top-16 z-20 border-y border-slate-200 bg-white/90 py-5 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center gap-4 overflow-x-auto px-6 lg:px-8">
        <div className="flex items-center gap-2 whitespace-nowrap font-semibold text-slate-700">
          <Flame className="h-4 w-4 text-amber-500" />
          Browse
        </div>

        <Link
          href={getCategoryHref("")}
          className={`whitespace-nowrap rounded-full px-5 py-2.5 text-sm font-medium transition-all duration-200 ${
            activeCategorySlug === ""
              ? "bg-amber-400 text-slate-900 shadow-md"
              : "border border-slate-200 bg-white text-slate-600 hover:border-amber-300 hover:bg-amber-50 hover:text-amber-700"
          }`}
        >
          All
        </Link>

        {categories.map((category) => (
          <Link
            key={category.slug}
            href={getCategoryHref(category.slug)}
            className={`whitespace-nowrap rounded-full px-5 py-2.5 text-sm font-medium transition-all duration-200 ${
              activeCategorySlug === category.slug
                ? "bg-amber-400 text-slate-900 shadow-md"
                : "border border-slate-200 bg-white text-slate-600 hover:border-amber-300 hover:bg-amber-50 hover:text-amber-700"
            }`}
          >
            {category.name}
          </Link>
        ))}
      </div>
    </section>
  );
}