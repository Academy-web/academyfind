import Link from "next/link";
import {
  ArrowRight,
  GraduationCap,
  Stethoscope,
  Landmark,
  Briefcase,
  Scale,
  Globe,
} from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";

const goals = [
  {
    title: "Engineering",
    description: "JEE, BITSAT, VITEEE",
    institutes: "4,200+ Institutes",
    href: "/engineering",
    icon: GraduationCap,
  },
  {
    title: "Medical",
    description: "NEET, AIIMS",
    institutes: "3,100+ Institutes",
    href: "/medical",
    icon: Stethoscope,
  },
  {
    title: "Government Exams",
    description: "UPSC, SSC, Banking",
    institutes: "5,500+ Institutes",
    href: "/government",
    icon: Landmark,
  },
  {
    title: "Management",
    description: "CAT, XAT, SNAP",
    institutes: "1,400+ Institutes",
    href: "/management",
    icon: Briefcase,
  },
  {
    title: "Law",
    description: "CLAT, AILET",
    institutes: "900+ Institutes",
    href: "/law",
    icon: Scale,
  },
  {
    title: "Study Abroad",
    description: "IELTS, GRE, GMAT",
    institutes: "1,100+ Institutes",
    href: "/study-abroad",
    icon: Globe,
  },
];

export function ExploreByGoal() {
  return (
    <section className="py-24">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-14 flex items-end justify-between">
          <div>
            <span className="text-sm font-medium text-amber-500">
              Categories
            </span>

            <h2 className="mt-2 text-4xl font-bold tracking-tight">
              Explore By Goal
            </h2>

            <p className="mt-3 max-w-2xl text-muted-foreground">
              Browse coaching institutes based on your preparation journey.
            </p>
          </div>

          <Link
            href="/categories"
            className="hidden md:flex items-center gap-2 font-medium transition-colors hover:text-amber-500"
          >
            View All Categories
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {/* Grid */}
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {goals.map((goal) => {
            const Icon = goal.icon;

            return (
              <Link key={goal.title} href={goal.href}>
                <Card
                  className="
                    group
                    relative
                    h-full
                    overflow-hidden
                    border
                    transition-all
                    duration-300
                    hover:-translate-y-2
                    hover:border-amber-200
                    hover:shadow-2xl
                  "
                >
                  {/* Gradient Background */}
                  {/* <div
                    className={`absolute inset-0 bg-gradient-to-br from-amber-50 to amber-100`}
                  /> */}

                  {/* Glow */}
                  <div
                    className="
                      absolute
                      -right-10
                      -top-10
                      h-32
                      w-32
                      rounded-full
                      bg-white/20
                      blur-3xl
                      opacity-0
                        transition-opacity
                        duration-300
                      group-hover:opacity-100
                    "
                  />

                  <CardContent className="relative p-5">
                    {/* Top Row */}
                    <div className="mb-6 flex items-start justify-between">
                      <div
                        className="
                          flex
                          h-7
                          w-7
                          items-center
                          justify-center
                          rounded-2xl
                          bg-background
                          shadow-sm
                          transition-transform
                          duration-300
                          group-hover:scale-110
                        "
                      >
                        <Icon className="h-7 w-7 text-amber-400" />
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

                    {/* Title */}
                    <h3 className="text-xl font-semibold tracking-tight">
                      {goal.title}
                    </h3>

                    {/* Description */}
                    <p className="mt-3 text-sm text-muted-foreground">
                      {goal.description}
                    </p>

                    {/* Footer */}
                    <div className="mt-8 flex items-center justify-between">
                      <span
                        className="
                          rounded-full
                          bg-background/80
                          px-3
                          py-1
                          text-xs
                          font-medium
                          backdrop-blur
                        "
                      >
                        {goal.institutes}
                      </span>

                      <span className="text-sm font-medium text-amber-400">
                        Explore
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>

        {/* Mobile CTA */}
        <div className="mt-8 flex justify-center md:hidden">
          <Link
            href="/categories"
            className="inline-flex items-center gap-2 font-medium text-amber-400"
          >
            View All Categories
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}