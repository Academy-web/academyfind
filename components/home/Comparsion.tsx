import Link from "next/link";
import { ArrowRight, Search } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const comparisons = [
  {
    instituteA: "Allen",
    instituteB: "Motion",
    category: "JEE • Kota",
    href: "/compare/allen-vs-motion",
  },
  {
    instituteA: "Vision IAS",
    instituteB: "Drishti IAS",
    category: "UPSC • Delhi",
    href: "/compare/vision-ias-vs-drishti-ias",
  },
  {
    instituteA: "PW",
    instituteB: "Unacademy",
    category: "Online Learning",
    href: "/compare/pw-vs-unacademy",
  },
];

export function PopularComparisons() {
  return (
    <section className="py-24">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-12 flex items-end justify-between">
          <div>
            <span className="text-sm font-medium text-amber-400">
              Compare Institutes
            </span>

            <h2 className="mt-2 text-4xl font-bold tracking-tight">
              Popular Comparisons
            </h2>

            <p className="mt-3 max-w-2xl text-muted-foreground">
              Compare coaching institutes side-by-side and make smarter
              decisions before enrolling.
            </p>
          </div>

          <Link
            href="/compare"
            className="hidden md:flex items-center gap-2 font-medium transition-colors hover:text-amber-500"
          >
            Compare More Institutes
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {/* Grid */}
        <div className="grid gap-6 lg:grid-cols-3">
          {comparisons.map((comparison) => (
            <Link
              key={`${comparison.instituteA}-${comparison.instituteB}`}
              href={comparison.href}
            >
              <Card
                className="
                  group
                  h-full
                  overflow-hidden
                  transition-all
                  duration-300
                  hover:-translate-y-1
                  hover:border-amber-200
                  hover:shadow-lg
                "
              >
                <CardContent className="p-5">
                  {/* Institutes */}
                  <div className="flex items-center justify-between">
                    <div className="flex flex-col items-center">
                      <div
                        className="
                          flex
                          h-10
                          w-10
                          items-center
                          justify-center
                          rounded-full
                          bg-amber-50
                          text-xs
                          font-bold
                          text-amber-400
                        "
                      >
                        {comparison.instituteA.charAt(0)}
                      </div>

                      <span className="mt-3 font-semibold">
                        {comparison.instituteA}
                      </span>
                    </div>

                    {/* VS */}
                    <div className="flex flex-col items-center">
                      <div
                        className="
                          rounded-full
                          border
                          border-amber-200
                          bg-amber-50
                          px-2
                          py-1
                          text-xs
                          font-bold
                          text-amber-400
                        "
                      >
                        VS
                      </div>

                      <span className="mt-3 text-xs text-muted-foreground">
                        Compare
                      </span>
                    </div>

                    <div className="flex flex-col items-center">
                      <div
                        className="
                          flex
                          h-10
                          w-10
                          items-center
                          justify-center
                          rounded-full
                          bg-amber-50
                          text-xs
                          font-bold
                          text-amber-400
                        "
                      >
                        {comparison.instituteB.charAt(0)}
                      </div>

                      <span className="mt-3 font-semibold">
                        {comparison.instituteB}
                      </span>
                    </div>
                  </div>

                  {/* Category */}
                  <div className="mt-8 flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">
                        Category
                      </p>

                      <p className="mt-1 font-medium">
                        {comparison.category}
                      </p>
                    </div>

                    <ArrowRight
                      className="
                        h-5
                        w-5
                        text-muted-foreground
                        transition-all
                        duration-300
                        group-hover:translate-x-1
                        group-hover:text-amber-500
                      "
                    />
                  </div>

                  {/* Features */}
                  <div className="mt-6 flex flex-wrap gap-2">
                    <span className="rounded-full bg-muted px-3 py-1 text-xs">
                      Fees
                    </span>

                    <span className="rounded-full bg-muted px-3 py-1 text-xs">
                      Faculty
                    </span>

                    <span className="rounded-full bg-muted px-3 py-1 text-xs">
                      Results
                    </span>

                    <span className="rounded-full bg-muted px-3 py-1 text-xs">
                      Reviews
                    </span>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}

          {/* CTA Card */}
          
        </div>
        <div>
          <Card
            className="
              border-dashed
              transition-all
              duration-300
              hover:border-amber-300
              hover:bg-amber-50/30
            "
          >
            <CardContent className="flex h-full flex-col items-center justify-center p-10 text-center">
              <div
                className="
                  mb-5
                  flex
                  h-16
                  w-16
                  items-center
                  justify-center
                  rounded-full
                  bg-amber-50
                "
              >
                <Search className="h-8 w-8 text-amber-400" />
              </div>

              <h3 className="text-xl font-semibold">
                Compare Any Institute
              </h3>

              <p className="mt-3 max-w-sm text-muted-foreground">
                Search and compare thousands of coaching institutes across
                India.
              </p>

              <Button
                asChild
                className="mt-6 bg-amber-400 hover:bg-amber-600"
              >
                <Link href="/compare">
                  Start Comparing
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>

          <div className="mt-8 flex justify-center md:hidden w-full">
          <Link
            href="/compare"
            className="inline-flex items-center gap-2 font-medium text-amber-400"
          >
            Compare More Institutes
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        </div>
        

        {/* Mobile CTA */}
        
      </div>
    </section>
  );
}