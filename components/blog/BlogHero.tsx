import { SearchBar } from "../search/SearchBar";

export default function BlogHero() {
  return (
    <section
      className="
        relative
        overflow-hidden
        border-b
        border-amber-100
        bg-gradient-to-b
        from-amber-50
        via-background
        to-background
      "
    >
      {/* Background Glow */}
      <div className="absolute left-0 top-0 h-72 w-72 rounded-full bg-amber-200/30 blur-3xl" />

      <div className="absolute right-0 top-0 h-72 w-72 rounded-full bg-orange-200/20 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 py-20 lg:py-28">
        {/* Hero Content */}
        <div className="mx-auto max-w-4xl text-center">
          <div
            className="
              inline-flex
              items-center
              rounded-full
              border
              border-amber-200
              bg-white
              px-4
              py-2
              text-sm
              font-medium
              text-amber-700
              shadow-sm
            "
          >
            AcademyFind Insights
          </div>

          <h1
            className="
              mt-6
              text-4xl
              font-bold
              tracking-tight
              text-slate-900

              md:text-6xl
            "
          >
            Coaching Guides,
            <span className="text-amber-500">
              {" "}
              Comparisons{" "}
            </span>
            & Exam Resources
          </h1>

          <p
            className="
              mx-auto
              mt-6
              max-w-2xl
              text-lg
              leading-relaxed
              text-muted-foreground
            "
          >
            Discover expert guides, institute comparisons,
            admission insights and preparation strategies
            for competitive exams.
          </p>
        </div>

        {/* Search Section */}
        <div className="relative mx-auto mt-12 w-full max-w-4xl">
          {/* Outer Glow */}
          <div
            className="
              pointer-events-none
              absolute
              inset-0
              -z-10
              scale-110
              rounded-[2rem]
              bg-gradient-to-r
              from-amber-300/25
              via-yellow-200/25
              to-amber-300/25
              blur-3xl
            "
          />

          {/* Secondary Glow */}
          <div
            className="
              pointer-events-none
              absolute
              left-1/2
              top-1/2
              -z-10
              h-32
              w-[80%]
              -translate-x-1/2
              -translate-y-1/2
              rounded-full
              bg-amber-400/10
              blur-3xl
            "
          />

          {/* Search Card */}
          <div
            className="
              relative
              rounded-[2rem]
              border
              border-amber-100
              bg-white/95
              p-3
              shadow-[0_30px_80px_rgba(251,191,36,0.18)]
              backdrop-blur-sm

              sm:p-4
            "
          >
            <SearchBar />
          </div>
        </div>
      </div>
    </section>
  );
}