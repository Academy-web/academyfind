import Link from "next/link";
import { ArrowRight } from "lucide-react";

import InstituteCard from "@/components/institutes/InstituteCard";
import { prisma } from "@/lib/prisma";
import ScrollToTopButton from "./ScrollToTopButton";


export async function FeaturedInstitutes() {
  const topInstitutes = await prisma.institute.findMany({
    where:{
      isActive:true,
      googleRating:{gte:4.8}
    },
    include:{
      city: true
    },
    take:20
  })

  const random4 = topInstitutes.sort(() => 0.5 - Math.random()).slice(0,4);
  const institutes = random4.map((inst) => ({
    id: inst.id,
    slug: inst.slug,
    name: inst.name,
    description: inst.description || "Top rated institute for your preparation.",
    city: {
      name: inst.city?.name || "Unknown",
      slug: inst.city?.slug || "unknown",
    },
    averageRating: inst.googleRating || 5,
    reviewCount: inst.googleReviewCount || 0,
    image: inst.imageUrl || null,
  }));
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

          <ScrollToTopButton
            className="hidden items-center gap-2 font-medium transition-colors hover:text-amber-500 md:flex"
            content="View all Institutes"
          />
        </div>

        {/* Institutes Grid */}
        {institutes.length > 0 ? (
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
        ): (
          <p className="text-slate-500 italic">No 5-star rated institutes found yet.</p>
        )}

        {/* Mobile CTA */}
        <div className="mt-8 flex justify-center md:hidden">
          <ScrollToTopButton
            className="inline-flex items-center gap-2 rounded-xl border px-4 py-3 font-medium transition-colors hover:bg-amber-50"
            content="View All Institutes"
          />
            
        </div>
      </div>
    </section>
  );
}