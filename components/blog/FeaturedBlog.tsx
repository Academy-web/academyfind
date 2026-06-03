import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function FeaturedBlog() {
  return (
    <section>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold">
            Featured Article
          </h2>

          <p className="mt-2 text-muted-foreground">
            Editor's pick for this week
          </p>
        </div>
      </div>

      <Link
        href="/blog/best-jee-coaching-in-kota-2026"
        className="
          group
          block
          overflow-hidden
          rounded-3xl
          border
          border-amber-100
          bg-white
          shadow-lg
          transition-all
          duration-300
          hover:-translate-y-1
          hover:shadow-xl
        "
      >
        <div className="grid lg:grid-cols-2">
          <div className="relative h-72 lg:h-full">
            <Image
              src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1"
              alt="Featured Blog"
              fill
              className="
                object-cover
                transition-transform
                duration-700
                group-hover:scale-105
              "
            />
          </div>

          <div className="flex flex-col justify-center p-8 lg:p-12">
            <span
              className="
                w-fit
                rounded-full
                bg-amber-100
                px-3
                py-1
                text-sm
                font-medium
                text-amber-700
              "
            >
              JEE
            </span>

            <h3
              className="
                mt-4
                text-3xl
                font-bold
                tracking-tight
                transition-colors
                group-hover:text-amber-500
              "
            >
              Best JEE Coaching In Kota 2026
            </h3>

            <p className="mt-4 text-muted-foreground">
              Complete comparison of Allen,
              Resonance, Motion and other
              top coaching institutes.
            </p>

            <div className="mt-8 flex items-center gap-3 text-amber-600">
              Read Article
              <ArrowRight className="h-4 w-4" />
            </div>
          </div>
        </div>
      </Link>
    </section>
  );
}