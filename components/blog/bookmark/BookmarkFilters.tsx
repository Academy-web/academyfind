"use client";

import { Search } from "lucide-react";
import {
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";
import { useEffect, useState } from "react";

type BookmarkFiltersProps = {
  categories: {
    id: string;
    name: string;
    slug: string;
  }[];
};

export default function BookmarkFilters({
  categories,
}: BookmarkFiltersProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [query, setQuery] = useState(
    searchParams.get("q") ?? ""
  );

  useEffect(() => {
    const timeout = setTimeout(() => {
      const params = new URLSearchParams(searchParams.toString());

      if (query.trim()) {
        params.set("q", query.trim());
      } else {
        params.delete("q");
      }

      params.delete("page");

      router.replace(`${pathname}?${params.toString()}`);
    }, 400);

    return () => clearTimeout(timeout);
  }, [query]);

  function updateParam(key: string, value: string) {
    const params = new URLSearchParams(searchParams.toString());

    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }

    params.delete("page");

    router.push(`${pathname}?${params.toString()}`);
  }

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="grid gap-4 lg:grid-cols-3">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search bookmarks..."
            className="w-full rounded-xl border border-slate-300 py-3 pl-11 pr-4 outline-none transition focus:border-amber-500"
          />
        </div>

        {/* Category */}
        <select
          value={searchParams.get("category") ?? ""}
          onChange={(e) =>
            updateParam("category", e.target.value)
          }
          className="rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-amber-500"
        >
          <option value="">All Categories</option>

          {categories.map((category: { id: string; name: string; slug: string }) => (
            <option
              key={category.id}
              value={category.slug}
            >
              {category.name}
            </option>
          ))}
        </select>

        {/* Sort */}
        <select
          value={searchParams.get("sort") ?? "saved"}
          onChange={(e) =>
            updateParam("sort", e.target.value)
          }
          className="rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-amber-500"
        >
          <option value="saved">Recently Saved</option>
          <option value="latest">Recently Published</option>
          <option value="popular">Most Viewed</option>
          <option value="liked">Most Liked</option>
          <option value="comments">Most Discussed</option>
        </select>
      </div>
    </div>
  );
}