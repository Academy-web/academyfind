import Link from "next/link";
import { ArrowRight, TrendingUp } from "lucide-react";

const destinations = [
  {
    title: "JEE Coaching in Kota",
    subtitle: "1,200+ Institutes",
    href: "/jee-coaching/kota",
  },
  {
    title: "NEET Coaching in Delhi",
    subtitle: "850+ Institutes",
    href: "/neet-coaching/delhi",
  },
  {
    title: "UPSC Coaching in Mukherjee Nagar",
    subtitle: "300+ Institutes",
    href: "/upsc-coaching/delhi",
  },
  {
    title: "CAT Coaching in Bangalore",
    subtitle: "450+ Institutes",
    href: "/cat-coaching/bangalore",
  },
  {
    title: "SSC Coaching in Jaipur",
    subtitle: "600+ Institutes",
    href: "/ssc-coaching/jaipur",
  },
];

const categories = [
  "JEE",
  "NEET",
  "UPSC",
  "SSC",
  "CAT",
  "CLAT",
  "Banking",
  "CUET",
];

export function TrendingDestinations() {
  return (
    <section className="py-24">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-12 flex items-end justify-between">
          <div>
            <span className="text-sm font-medium text-amber-500">
              Trending Searches
            </span>

            <h2 className="mt-2 text-4xl font-bold tracking-tight">
              What Students Are Searching
            </h2>

            <p className="mt-3 max-w-2xl text-muted-foreground">
              Discover the most searched coaching destinations across India.
            </p>
          </div>

          <Link
            href="/search"
            className="hidden md:flex items-center gap-2 font-medium hover:text-amber-500"
          >
            View All
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid gap-6 lg:grid-cols-12">
          {/* Left */}
          <div className="lg:col-span-8">
            <div className="space-y-3">
              {destinations.map((item, index) => (
                <Link
                  key={item.title}
                  href={item.href}
                  className="
                    group
                    flex
                    items-center
                    justify-between
                    rounded-2xl
                    border
                    bg-background
                    p-5
                    transition-all
                    hover:border-amber-200
                    hover:shadow-sm
                  "
                >
                  <div className="flex items-center gap-4">
                    <div
                      className="
                        flex
                        h-10
                        w-10
                        items-center
                        justify-center
                        rounded-full
                        bg-amber-50
                        text-sm
                        font-semibold
                        text-amber-500
                      "
                    >
                      #{index + 1}
                    </div>

                    <div>
                      <h3 className="font-medium">
                        {item.title}
                      </h3>

                      <p className="text-sm text-muted-foreground">
                        {item.subtitle}
                      </p>
                    </div>
                  </div>

                  <ArrowRight
                    className="
                      h-4
                      w-4
                      text-muted-foreground
                      transition-all
                      group-hover:translate-x-1
                      group-hover:text-amber-500
                    "
                  />
                </Link>
              ))}
            </div>
          </div>

          {/* Right */}
          <div className="lg:col-span-4">
            <div className="rounded-2xl border p-6">
              <div className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-amber-500" />

                <h3 className="font-semibold">
                  Trending Categories
                </h3>
              </div>

              <div className="mt-6 flex flex-wrap gap-2">
                {categories.map((category) => (
                  <Link
                    key={category}
                    href="/categories"
                    className="
                      rounded-full
                      bg-amber-50
                      px-3
                      py-2
                      text-sm
                      font-medium
                      text-amber-700
                      transition-colors
                      hover:bg-amber-100
                    "
                  >
                    {category}
                  </Link>
                ))}
              </div>

              <div className="mt-8 border-t pt-6">
                <p className="text-sm text-muted-foreground">
                  Most searched destination this week
                </p>

                <h4 className="mt-2 font-semibold">
                  JEE Coaching in Kota
                </h4>

                <p className="mt-1 text-sm text-muted-foreground">
                  1,200+ institutes available
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}