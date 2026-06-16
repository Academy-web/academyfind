import { getInstitutesByCategoryAndCity } from "@/lib/institutes/institutes_cat_city";
import type { Metadata } from "next";
import formatSlug from "@/lib/formatSlug";

import Breadcrumb from "@/components/navigation/BreadCrumbs";
import CityHero from "@/components/City_Category/CityHero";
import CityFilters from "@/components/City_Category/CityFilters";
import InstituteListing from "@/components/City_Category/InstituteListing";
import CityAbout from "@/components/City_Category/CityAbout";
import RelatedCities from "@/components/City_Category/RelatedCities";
import CityFAQ from "@/components/City_Category/CityFAQ";
import CityCTA from "@/components/City_Category/CityCTA";
import Pagination from "@/components/navigation/Pagination";

import MapToggleSection from "@/components/maps/MapToggleSection"; 

export const revalidate = 86400;

interface PageProps {
  params: Promise<{
    category: string;
    city: string;
  }>;
  searchParams: Promise<{
    sort?: string;
    page?: string;
    q?: string;
    lat?: string;
    lng?: string;     
    address?: string; 
    radius?: string;
    rating?: string;
    userLat?: string;       // 🚀 NAYA ADD KIYA
    userLng?: string;       // 🚀 NAYA ADD KIYA
    closestUser?: string;   // 🚀 NAYA ADD KIYA
  }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { category, city } = await params;
  const categoryName = formatSlug(category);
  const cityName = formatSlug(city);

  return {
    title: `Best ${categoryName} in ${cityName} | AcademyFind`,
    description: `Discover the best ${categoryName} in ${cityName}.`,
  };
}

export default async function CategoryCityPage({
  params,
  searchParams,
}: PageProps) {
  const { category, city } = await params;
  
  // 🚀 URL se sab kuch catch kiya
  const { sort, page, q, lat, lng, address, radius, rating, userLat, userLng, closestUser } = await searchParams;

  const categoryName = formatSlug(category);
  const cityName = formatSlug(city);

  const currentPage = page ? parseInt(page, 10) : 1;
  
  // 🚀 LOGIC: Check karo ki user ne konsa "Closest" button dabaya hai
  const isClosestToMeActive = closestUser === "true";
  const finalLat = isClosestToMeActive ? userLat : lat;
  const finalLng = isClosestToMeActive ? userLng : lng;

  const parsedLat = finalLat ? parseFloat(finalLat) : undefined;
  const parsedLng = finalLng ? parseFloat(finalLng) : undefined;

  const parsedRadius = radius ? parseInt(radius, 10) : undefined;
  const minRating = rating ? parseFloat(rating) : undefined;

  // 👇 Ab backend function ko sahi lat/lng jayenge
  const { institutes, totalPages, totalCount, exactAreaMatch } = await getInstitutesByCategoryAndCity(
    category,
    city,
    sort,
    currentPage,
    q,
    parsedLat,
    parsedLng,
    parsedRadius,
    minRating,
  );

  const displayLocationText = address || q || cityName;

  return (
    <main className="max-w-7xl mx-auto px-5 py-10">
      <Breadcrumb
        items={[
          { label: categoryName, href: `/${category}` },
          { label: cityName, href: `/${category}/${city}` },
        ]}
      />

      <CityHero categoryName={categoryName} cityName={cityName} totalCount={totalCount}/>

      <div className="flex flex-col lg:flex-row gap-8 relative mt-8">
        <aside className="lg:w-64 shrink-0 relative lg:sticky lg:top-24 self-start h-fit z-10 mb-6 lg:mb-0">
          <div className="sticky top-24"> 
            <CityFilters category={category} city={city} hasLocation={!!lat} />
          </div>
        </aside>

        <div className="flex-1 min-w-0 w-full">

          <MapToggleSection
            institutes={institutes.map((institute) => ({
              id: institute.id,
              name: institute.name,
              latitude: institute.latitude,
              longitude: institute.longitude,
              slug: `${institute.id}-${institute.slug}`,
            }))}
          />

          {/* 🔴 Fallback Banner */}
          {(q || address || isClosestToMeActive) && exactAreaMatch === false && (
            <div className="mt-6 mb-2 rounded-2xl border border-amber-200 bg-amber-50 p-5 text-amber-900 shadow-sm animate-in fade-in zoom-in duration-300">
              <div className="flex items-start gap-4">
                <span className="text-2xl mt-1">📍</span>
                <div>
                  <h4 className="text-lg font-bold">
                    Couldn't find verified {categoryName} institutes near your exact location
                  </h4>
                  <p className="mt-1 text-sm text-amber-700">
                    Don't worry! We've found the best and highly-rated institutes in other areas of <strong>{cityName}</strong> for you (Sorted by distance).
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* 🟢 Success Banner */}
          {(q || address || isClosestToMeActive) && exactAreaMatch === true && (
            <div className="mt-6 mb-2 text-sm text-slate-500 flex items-center gap-2">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
              </span>
              Showing results near: <span className="font-semibold text-slate-800 capitalize">
                "{isClosestToMeActive ? "Your Current Location" : displayLocationText}"
              </span>
            </div>
          )}

          <InstituteListing institutes={institutes} category={category}/>

          <Pagination totalPages={totalPages} />
        </div>
      </div>

      <CityAbout categoryName={categoryName} cityName={cityName} />
      <RelatedCities category={category} cityName={city} citySlug={city}/>
      <CityFAQ categoryName={categoryName} cityName={cityName} />
      <CityCTA />
    </main>
  );
}