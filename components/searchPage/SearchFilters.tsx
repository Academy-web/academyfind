"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";

type FilterProps = {
  categories: { name: string; slug: string }[];
  cities: { name: string; slug: string }[];
  currentCity: string;
  currentCategory: string;
  currentRating: string;
};

export default function SearchFilters({ categories, cities, currentCity, currentCategory, currentRating }: FilterProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  // 🔥 URL parameters update karne ka function
  const handleFilterChange = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    
    if (value && value !== "ALL") {
      params.set(key, value);
    } else {
      params.delete(key); // Agar user 'All' select kare toh URL se remove kar do
    }
    
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <aside className="sticky top-24 hidden h-fit rounded-3xl border bg-background p-6 shadow-sm lg:block">
      <h3 className="font-semibold mb-6">Filters</h3>

      <div className="space-y-5">
        {/* Categories Dropdown */}
        <select 
          value={currentCategory || "ALL"} 
          onChange={(e) => handleFilterChange("category", e.target.value)}
          className="w-full rounded-xl border-0 bg-slate-50 p-3 text-sm shadow-sm cursor-pointer outline-none focus:ring-2 focus:ring-amber-400"
        >
          <option value="ALL">All Categories</option>
          {categories.map((c) => (
            <option key={c.slug} value={c.slug}>{c.name}</option>
          ))}
        </select>

        {/* Cities Dropdown */}
        <select 
          value={currentCity || "ALL"} 
          onChange={(e) => handleFilterChange("city", e.target.value)}
          className="w-full rounded-xl border-0 bg-slate-50 p-3 text-sm shadow-sm cursor-pointer outline-none focus:ring-2 focus:ring-amber-400"
        >
          <option value="ALL">All Cities</option>
          {cities.map((c) => (
            <option key={c.slug} value={c.slug}>{c.name}</option>
          ))}
        </select>

        {/* Rating Dropdown */}
        <select 
          value={currentRating || "ALL"} 
          onChange={(e) => handleFilterChange("rating", e.target.value)}
          className="w-full rounded-xl border-0 bg-slate-50 p-3 text-sm shadow-sm cursor-pointer outline-none focus:ring-2 focus:ring-amber-400"
        >
          <option value="ALL">Any Rating</option>
          <option value="4">4.0 & Above</option>
          <option value="4.5">4.5 & Above</option>
        </select>
      </div>
    </aside>
  );
}