import Link from "next/link";
import { ArrowRight, MapPin } from "lucide-react";

const cities = [
  {
    name: "Kota",
    institutes: "1,200+ Institutes",
    href: "/city/kota",
  },
  {
    name: "Delhi",
    institutes: "950+ Institutes",
    href: "/city/delhi",
  },
  {
    name: "Jaipur",
    institutes: "700+ Institutes",
    href: "/city/jaipur",
  },
  {
    name: "Bangalore",
    institutes: "650+ Institutes",
    href: "/city/bangalore",
  },
  {
    name: "Hyderabad",
    institutes: "620+ Institutes",
    href: "/city/hyderabad",
  },
  {
    name: "Pune",
    institutes: "550+ Institutes",
    href: "/city/pune",
  },
];

export function PopularCities() {
  return (
    <section className="py-24">
      <div className="container mx-auto px-4">
        <div className="mb-12 flex items-end justify-between">
          <div>
            <span className="text-sm font-medium text-amber-500">
              Explore Cities
            </span>

            <h2 className="mt-2 text-4xl font-bold tracking-tight">
              Popular Coaching Cities
            </h2>

            <p className="mt-3 max-w-2xl text-muted-foreground">
              Discover coaching institutes across India's most popular
              education hubs.
            </p>
          </div>

          <Link
            href="/cities"
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
            View All Cities
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {cities.map((city) => (
            <Link
              key={city.name}
              href={city.href}
              className="
                group
                rounded-2xl
                border
                bg-background
                p-6
                transition-all
                duration-300
                hover:-translate-y-1
                hover:border-amber-200
                hover:shadow-md
              "
            >
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-amber-500" />

                    <h3 className="font-semibold">
                      {city.name}
                    </h3>
                  </div>

                  <p className="mt-2 text-sm text-muted-foreground">
                    {city.institutes}
                  </p>
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
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-8 flex justify-center md:hidden">
          <Link
            href="/cities"
            className="inline-flex items-center gap-2 font-medium text-amber-500"
          >
            View All Cities
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}