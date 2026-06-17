import { Building2, ShieldCheck, Star } from "lucide-react";
import { SearchBar } from "../search/SearchBar";

export default function CategoryHero({
  category,
  totalCount,
}: {
  category: any;
  totalCount: number;
}) {
  return (
    <section className="relative overflow-y-visible z-[101] rounded-3xl border border-amber-100 bg-linear-to-br from-amber-50 via-white to-orange-50 p-8 md:p-12 mb-12">
      
      {/* Glow */}
      <div className="absolute -top-20 -right-20 h-72 w-72 rounded-full bg-amber-400/20 blur-3xl" />

      <div className="relative">
        {/* <div className="inline-flex items-center rounded-full border border-amber-200 bg-amber-100 px-4 py-1 text-sm font-medium text-amber-400">
          📍 {cityName}
        </div> */}

        <h1 className="mt-6 text-4xl md:text-6xl font-bold tracking-tight text-slate-900">
          Best Instittutes for
          <br />
          {category.name}
        </h1>

        <p className="mt-6 max-w-2xl text-lg text-slate-600">
          Compare fees, ratings, reviews, faculty and courses
          from the highest-rated institutes for {category.name}.
        </p>

        {/* Stats */}
        <div className="mt-8 sm:mt-10 grid grid-cols-3 gap-2 sm:gap-4 max-w-xl">
          
          {/* Stat 1 */}
          <div className="flex flex-col items-center justify-center sm:items-start sm:justify-start rounded-2xl border border-amber-100 bg-white/80 p-3 sm:p-6 backdrop-blur text-center sm:text-left">
            <Building2 className="h-5 w-5 sm:h-6 sm:w-6 text-amber-600 mb-1 sm:mb-0" />
            <p className="mt-1 sm:mt-2 text-lg sm:text-2xl font-bold text-slate-900">
              {totalCount}
            </p>
            <p className="text-[10px] sm:text-sm text-slate-500 leading-tight">
              Institutes
            </p>
          </div>

          {/* Stat 2 */}
          <div className="flex flex-col items-center justify-center sm:items-start sm:justify-start rounded-2xl border border-amber-100 bg-white/80 p-3 sm:p-6 backdrop-blur text-center sm:text-left">
            <ShieldCheck className="h-5 w-5 sm:h-6 sm:w-6 text-amber-600 mb-1 sm:mb-0" />
            <p className="mt-1 sm:mt-2 text-lg sm:text-2xl font-bold text-slate-900">
              100%
            </p>
            <p className="text-[10px] sm:text-sm text-slate-500 leading-tight">
              Verified Data
            </p>
          </div>

          {/* Stat 3 */}
          <div className="flex flex-col items-center justify-center sm:items-start sm:justify-start rounded-2xl border border-amber-100 bg-white/80 p-3 sm:p-6 backdrop-blur text-center sm:text-left">
            <Star className="h-5 w-5 sm:h-6 sm:w-6 text-amber-600 mb-1 sm:mb-0" />
            <p className="mt-1 sm:mt-2 text-lg sm:text-2xl font-bold text-slate-900">
              Top
            </p>
            <p className="text-[10px] sm:text-sm text-slate-500 leading-tight">
              Rated Choices
            </p>
          </div>

        </div>
        <div className="mt-8 rounded-3xl borderborder-amber-100 bg-white/95 p-2 shadow-[0_20px_60px_rgba(251,191,36,0.15)] backdrop-blur-sm sm:p-4">
          <SearchBar />
        </div>
      </div>
    </section>
  );
}