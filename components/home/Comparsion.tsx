import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";

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
    <section className="py-12 sm:py-16 lg:py-24">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8 flex flex-col gap-4 sm:mb-12 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <span className="text-sm font-medium text-amber-500">
              Compare Institutes
            </span>

            <h2 className="mt-2 text-2xl font-bold tracking-tight sm:text-3xl lg:text-4xl">
              Popular Comparisons
            </h2>

            <p className="mt-3 max-w-2xl text-sm text-muted-foreground sm:text-base">
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
        <div className="grid gap-4 sm:gap-6 lg:grid-cols-3">
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
                  rounded-2xl
                  border
                  transition-all
                  duration-300
                  md:hover:-translate-y-1
                  md:hover:border-amber-200
                  md:hover:shadow-lg
                "
              >
                <CardContent className="p-4 sm:p-5">
                  <div className="flex items-center justify-between">
                    {/* Institute A */}
                    <div className="flex flex-col items-center text-center">
                      <div
                        className="
                          flex
                          h-12
                          w-12
                          items-center
                          justify-center
                          rounded-full
                          bg-amber-50
                          text-sm
                          font-bold
                          text-amber-500
                        "
                      >
                        {comparison.instituteA.charAt(0)}
                      </div>

                      <span className="mt-3 text-sm font-semibold sm:text-base">
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
                          px-3
                          py-1
                          text-xs
                          font-bold
                          text-amber-500
                        "
                      >
                        VS
                      </div>

                      <span className="mt-2 text-xs text-muted-foreground">
                        Compare
                      </span>
                    </div>

                    {/* Institute B */}
                    <div className="flex flex-col items-center text-center">
                      <div
                        className="
                          flex
                          h-12
                          w-12
                          items-center
                          justify-center
                          rounded-full
                          bg-amber-50
                          text-sm
                          font-bold
                          text-amber-500
                        "
                      >
                        {comparison.instituteB.charAt(0)}
                      </div>

                      <span className="mt-3 text-sm font-semibold sm:text-base">
                        {comparison.instituteB}
                      </span>
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="mt-6 flex items-center justify-between border-t pt-4">
                    <span
                      className="
                        rounded-full
                        bg-muted
                        px-3
                        py-1
                        text-xs
                        font-medium
                      "
                    >
                      {comparison.category}
                    </span>

                    <span
                      className="
                        flex
                        items-center
                        gap-1
                        text-sm
                        font-medium
                        text-amber-500
                      "
                    >
                      Compare
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </span>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        {/* Mobile CTA */}
        <div className="mt-8 flex justify-center md:hidden">
          <Link
            href="/compare"
            className="
              inline-flex
              items-center
              gap-2
              rounded-xl
              border
              px-4
              py-3
              font-medium
              transition-colors
              hover:bg-amber-50
            "
          >
            Compare More Institutes
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}