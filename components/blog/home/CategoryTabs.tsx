"use client";

import { useState } from "react";
import { Flame } from "lucide-react";

const categories = [
  "All",
  "JEE",
  "NEET",
  "CUET",
  "UPSC",
  "SSC",
  "CAT",
  "CLAT",
  "NDA",
  "Study Tips",
  "Career",
  "Admissions",
  "Scholarships",
];

export default function CategoryTabs() {
  const [active, setActive] = useState("All");

  return (
    <section className="sticky top-16 z-20 border-y border-slate-200 bg-white/90 py-5 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center gap-4 overflow-x-auto px-6 lg:px-8">
        <div className="flex items-center gap-2 whitespace-nowrap font-semibold text-slate-700">
          <Flame className="h-4 w-4 text-amber-500" />
          Browse
        </div>

        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setActive(category)}
            className={`whitespace-nowrap rounded-full px-5 py-2.5 text-sm font-medium transition-all duration-200 ${
              active === category
                ? "bg-amber-400 text-slate-900 shadow-md"
                : "border border-slate-200 bg-white text-slate-600 hover:border-amber-300 hover:bg-amber-50 hover:text-amber-700"
            }`}
          >
            {category}
          </button>
        ))}
      </div>
    </section>
  );
}