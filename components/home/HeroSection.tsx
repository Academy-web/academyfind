import Link from "next/link";
import { SearchBar } from "@/components/search/SearchBar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { TrendingUp, ArrowRight } from "lucide-react";

const trendingSearches = [
  "JEE Coaching in Kota",
  "UPSC Coaching in Delhi",
  "NEET Coaching in Jaipur",
  "CAT Coaching in Bangalore",
];

const cities = [
  "Kota",
  "Delhi",
  "Jaipur",
  "Hyderabad",
  "Pune",
  "Bangalore",
];

export function HeroSection() {
  return (
    <section className="border-b bg-gradient-to-b from-amber-50/50 via-background to-background">
      <div className="container mx-auto px-9 py-12 lg:py-20">
        <div className="grid gap-2 lg:grid-cols-[1.4fr_0.8fr]">
          
          {/* LEFT */}
          <div>
            <Badge className="mb-5">
              India's Coaching Discovery Platform
            </Badge>

            <h1 className="text-4xl font-bold tracking-tight md:text-6xl">
              Search Coaching
              <span className="block text-amber-400">
                Institutes Across India
              </span>
            </h1>

            <p className="mt-5 max-w-2xl text-lg text-muted-foreground">
              Compare institutes, explore cities, read reviews and
              discover the right coaching for your preparation.
            </p>

            <div className="mt-8">
              <SearchBar />
            </div>

            <div className="mt-8">
              <p className="mb-3 text-sm font-medium text-muted-foreground">
                Popular Searches
              </p>

              <div className="flex flex-wrap gap-2">
                {["JEE", "NEET", "UPSC", "SSC", "CAT", "CLAT"].map(
                  (item) => (
                    <Badge
                      key={item}
                      variant="secondary"
                      className="cursor-pointer"
                    >
                      {item}
                    </Badge>
                  )
                )}
              </div>
            </div>

            <Link
              href="/categories"
              className="mt-8 inline-flex items-center gap-2 text-amber-400 font-medium"
            >
              Browse All Categories
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          {/* RIGHT */}
          <div>
            <Card className="rounded-3xl border-0 shadow-xl">
              <CardContent className="p-6">
                <div className="flex items-center gap-2 font-semibold">
                  <TrendingUp className="h-5 w-5 text-amber-400" />
                  Trending Today
                </div>

                <div className="mt-5 space-y-3">
                  {trendingSearches.map((item) => (
                    <Link
                      key={item}
                      href="#"
                      className="block rounded-xl border p-3 hover:bg-muted"
                    >
                      🔥 {item}
                    </Link>
                  ))}
                </div>

                <div className="mt-8">
                  <div className="mb-3 font-semibold">
                    Top Cities
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {cities.map((city) => (
                      <Badge
                        key={city}
                        variant="outline"
                      >
                        {city}
                      </Badge>
                    ))}
                  </div>
                </div>

                <Link
                  href="/cities"
                  className="mt-6 inline-flex items-center gap-2 text-sm font-medium"
                >
                  View All Cities
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </CardContent>
            </Card>
          </div>

        </div>
      </div>
    </section>
  );
}