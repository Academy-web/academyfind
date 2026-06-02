import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { SearchBar } from "@/components/search/SearchBar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const trendingSearches = [
  "Allen vs Motion",
  "JEE Coaching in Kota",
  "UPSC Coaching in Delhi",
  "NEET Coaching in Jaipur",
];

export function HeroSection() {
  return (
    <section className="overflow-hidden border-b bg-gradient-to-b from-amber-50/50 via-background to-background">
      <div className="container mx-auto px-4 py-10 sm:py-14 lg:py-24">
        <div className="grid gap-8 lg:grid-cols-[1.3fr_0.7fr] lg:gap-12">

          {/* LEFT */}
          <div className="flex flex-col justify-center">

            {/* Trust Badge */}
            {/* <div className="mb-4 inline-flex w-fit items-center rounded-full border bg-white/80 px-3 py-1 text-xs font-medium shadow-sm backdrop-blur">
              ⭐ Trusted by Students Across India
            </div> */}

            {/* <Badge className="mb-5 w-fit">
              India's Coaching Discovery Platform
            </Badge> */}

            <h1 className="text-3xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
              Find the Right
              <span className="block text-amber-500">
                Coaching Institute
              </span>
            </h1>

            <p className="mt-4 max-w-2xl text-base text-muted-foreground sm:text-lg">
              Compare coaching institutes, explore cities,
              read reviews, and discover the best place
              for your preparation journey.
            </p>

            {/* Search */}
            <div className="mt-6 sm:mt-8">
              <SearchBar />
            </div>

            {/* Trending */}
            <div className="mt-6 sm:mt-8">
              <p className="mb-3 text-sm font-medium text-muted-foreground">
                🔥 Trending Today
              </p>

              <div className="flex flex-wrap gap-2">
                {trendingSearches.map((item) => (
                  <Link
                    key={item}
                    href="#"
                    className="
                      rounded-full
                      border
                      bg-background
                      px-3
                      py-1.5
                      text-xs
                      transition-all
                      hover:border-amber-200
                      hover:bg-amber-50
                      sm:px-4
                      sm:py-2
                      sm:text-sm
                    "
                  >
                    {item}
                  </Link>
                ))}
              </div>
            </div>

            {/* CTA Link */}
            <Link
              href="/categories"
              className="
                mt-6
                inline-flex
                items-center
                gap-2
                font-medium
                text-amber-500
                transition-colors
                hover:text-amber-600
              "
            >
              Browse All Categories
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          {/* RIGHT */}
          <div>
            <Card
              className="
                rounded-2xl
                border
                shadow-lg
                lg:rounded-3xl
                lg:shadow-xl
              "
            >
              <CardContent className="p-5 sm:p-6">
                <h2 className="text-xl font-bold sm:text-2xl">
                  Free Expert Guidance
                </h2>

                <p className="mt-2 text-sm text-muted-foreground">
                  Get personalized coaching recommendations
                  based on your goals and preferred city.
                </p>

                <div className="mt-6 space-y-4">
                  <input
                    type="text"
                    placeholder="Your Name"
                    className="
                      h-12
                      w-full
                      rounded-xl
                      border
                      px-4
                      text-sm
                      outline-none
                      focus:border-amber-400
                    "
                  />

                  <input
                    type="tel"
                    placeholder="Phone Number"
                    className="
                      h-12
                      w-full
                      rounded-xl
                      border
                      px-4
                      text-sm
                      outline-none
                      focus:border-amber-400
                    "
                  />

                  <select
                    className="
                      h-12
                      w-full
                      rounded-xl
                      border
                      px-4
                      text-sm
                      outline-none
                      focus:border-amber-400
                    "
                  >
                    <option>Select Exam</option>
                    <option>JEE</option>
                    <option>NEET</option>
                    <option>UPSC</option>
                    <option>CAT</option>
                    <option>SSC</option>
                    <option>CLAT</option>
                    <option>Others</option>
                  </select>

                  <input
                    type="text"
                    placeholder="Your Query"
                    className="
                      h-12
                      w-full
                      rounded-xl
                      border
                      px-4
                      text-sm
                      outline-none
                      focus:border-amber-400
                    "
                  />
                </div>

                <Button
                  className="
                    mt-5
                    h-12
                    w-full
                    rounded-xl
                    bg-amber-500
                    text-sm
                    font-semibold
                    hover:bg-amber-600
                  "
                >
                  Get Free Guidance
                </Button>

                <p className="mt-3 text-center text-xs text-muted-foreground">
                  No spam. We'll only contact you regarding
                  coaching recommendations.
                </p>
              </CardContent>
            </Card>
          </div>

        </div>
      </div>
    </section>
  );
}