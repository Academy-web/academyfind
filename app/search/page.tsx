import SearchHero from "@/components/searchPage/SearchHero";
import SearchFilters from "@/components/searchPage/SearchFilters";
import SearchResultsHeader from "@/components/searchPage/SearchResultsHeader";
import InstituteResults from "@/components/searchPage/InstituteResults";
import RelatedCategories from "@/components/searchPage/RelatedCategories";
import RelatedCities from "@/components/searchPage/RelatedCities";
import RelatedBlogs from "@/components/searchPage/RelatedBlogs";
import CompareCTA from "@/components/searchPage/CompareCTA";
// import InstitutesMap from "@/components/maps/InstitutesMap";
import { prisma } from "@/lib/prisma"; // 🔥 Prisma import karein

type Props = {
  searchParams: Promise<{
    q?: string;
    city?: string;
    category?: string; // 🔥 Naya parameter
    rating?: string;   // 🔥 Naya parameter
  }>;
};

export async function generateMetadata({ searchParams }: Props) {
  const { q = "" } = await searchParams;
  return {
    title: q ? `${q} Search Results | AcademyFind` : "Search | AcademyFind",
    robots: { index: false, follow: true },
  };
}

export default async function SearchPage({ searchParams }: Props) {
  const { q = "", city = "", category = "", rating = "" } = await searchParams;

  // 🔥 Dropdowns ke liye Categories aur Cities DB se fetch karein
  const categories = await prisma.category.findMany({ select: { name: true, slug: true }, orderBy: { name: "asc" } });
  const cities = await prisma.city.findMany({ select: { name: true, slug: true }, orderBy: { name: "asc" } });

  return (
    <>
      <SearchHero query={q || city} />

      <section className="mx-auto max-w-7xl px-4 py-10">
        <div className="grid gap-8 lg:grid-cols-[280px_1fr]">
          
          {/* 🔥 Filters ko data aur current selection pass karein */}
          <SearchFilters 
            categories={categories} 
            cities={cities} 
            currentCity={city} 
            currentCategory={category}
            currentRating={rating}
          />

          <div className="space-y-14">
            <SearchResultsHeader query={q} />

            {/* 🔥 InstituteResults ko naye filters pass karein */}
            <InstituteResults query={q} city={city} category={category} rating={rating} />

            <RelatedCategories />
            <RelatedCities />
            <RelatedBlogs />
            <CompareCTA />
          </div>
        </div>
      </section>
    </>
  );
}