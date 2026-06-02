import Link from "next/link";
import { GraduationCap } from "lucide-react";

const categories = [
  "JEE",
  "NEET",
  "UPSC",
  "CAT",
];

const cities = [
  "Kota",
  "Delhi",
  "Jaipur",
  "Hyderabad",
];

const comparisons = [
  "Allen vs Motion",
  "Vision IAS vs Drishti IAS",
  "PW vs Unacademy",
  "Aakash vs Allen",
];

export function Footer() {
  return (
    <footer className="border-t bg-muted/30">
      <div className="container mx-auto px-4 py-16">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-5">
          
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link
              href="/"
              className="flex items-center gap-2"
            >
              <GraduationCap className="h-6 w-6 text-amber-400" />

              <span className="text-xl font-bold">
                AcademyFind
                <p className="text-[0.6rem] text-black font-normal">Academy Search Simplified</p>
              </span>
            </Link>

            <p className="mt-4 max-w-sm text-sm text-muted-foreground">
              Discover coaching institutes, compare options,
              read reviews, and make smarter education decisions.
            </p>
          </div>

          {/* Categories */}
          <div>
            <h3 className="mb-4 font-semibold">
              Categories
            </h3>

            <ul className="space-y-3 text-sm text-muted-foreground">
              {categories.map((item) => (
                <li key={item}>
                  <Link
                    href="/categories"
                    className="hover:text-foreground"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Cities */}
          <div>
            <h3 className="mb-4 font-semibold">
              Popular Cities
            </h3>

            <ul className="space-y-3 text-sm text-muted-foreground">
              {cities.map((item) => (
                <li key={item}>
                  <Link
                    href="/cities"
                    className="hover:text-foreground"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Compare */}
          <div>
            <h3 className="mb-4 font-semibold">
              Compare
            </h3>

            <ul className="space-y-3 text-sm text-muted-foreground">
              {comparisons.map((item) => (
                <li key={item}>
                  <Link
                    href="/compare"
                    className="hover:text-foreground"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div
          className="
            mt-12
            flex
            flex-col
            gap-4
            border-t
            pt-6
            text-sm
            text-muted-foreground
            md:flex-row
            md:items-center
            md:justify-between
          "
        >
          <p>
            © 2026 AcademyFind. All rights reserved.
          </p>

          <div className="flex gap-6">
            <Link
              href="/about"
              className="hover:text-foreground"
            >
              About
            </Link>

            <Link
              href="/contact"
              className="hover:text-foreground"
            >
              Contact
            </Link>

            <Link
              href="/privacy"
              className="hover:text-foreground"
            >
              Privacy
            </Link>

            <Link
              href="/terms"
              className="hover:text-foreground"
            >
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}