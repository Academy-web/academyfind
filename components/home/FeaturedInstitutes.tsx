import Link from "next/link";
import { ArrowRight } from "lucide-react";

import InstituteCard from "@/components/institutes/InstituteCard";

const institutes = [
  {
    id: "1",
    slug: "allen-career-institute",
    name: "ALLEN Career Institute",
    description:
      "Leading coaching institute for JEE and NEET preparation.",
    city: {
      name: "Kota",
      slug: "kota",
    },
    averageRating: 4.8,
    reviewCount: 12458,
    image: null,
  },
  {
    id: "2",
    slug: "vision-ias",
    name: "Vision IAS",
    description:
      "One of India's most trusted UPSC coaching institutes.",
    city: {
      name: "Delhi",
      slug: "delhi",
    },
    averageRating: 4.7,
    reviewCount: 8231,
    image: null,
  },
  {
    id: "3",
    slug: "motion-education",
    name: "Motion Education",
    description:
      "Popular choice among JEE aspirants with strong results.",
    city: {
      name: "Kota",
      slug: "kota",
    },
    averageRating: 4.6,
    reviewCount: 7120,
    image: null,
  },
  {
    id: "4",
    slug: "aakash-institute",
    name: "Aakash Institute",
    description:
      "Top medical entrance coaching institute across India.",
    city: {
      name: "Jaipur",
      slug: "jaipur",
    },
    averageRating: 4.5,
    reviewCount: 9421,
    image: null,
  },
];

export function FeaturedInstitutes() {
  return (
    <section className="py-12 sm:py-16 lg:py-24">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8 flex flex-col gap-4 sm:mb-12 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <span className="text-sm font-medium text-amber-500">
              Featured Institutes
            </span>

            <h2 className="mt-2 text-2xl font-bold tracking-tight sm:text-3xl lg:text-4xl">
              Top Rated Coaching Institutes
            </h2>

            <p className="mt-3 max-w-2xl text-sm text-muted-foreground sm:text-base">
              Explore some of the highest rated coaching institutes
              across India.
            </p>
          </div>

          <Link
            href="/institutes"
            className="
              hidden
              items-center
              gap-2
              font-medium
              transition-colors
              hover:text-amber-500
              md:flex
            "
          >
            View All Institutes
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {/* Institutes Grid */}
        <div
          className="
            grid
            gap-4
            sm:gap-6
            md:grid-cols-2
            xl:grid-cols-4
          "
        >
          {institutes.map((institute) => (
            <InstituteCard
              key={institute.id}
              {...institute}
            />
          ))}
        </div>

        {/* Mobile CTA */}
        <div className="mt-8 flex justify-center md:hidden">
          <Link
            href="/institutes"
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
            View All Institutes
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}