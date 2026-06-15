import InstituteCard from "@/components/institutes/InstituteCard";
import { meili } from "@/lib/meilisearch";
import MapToggleSection from "../maps/MapToggleSection"; 

type Props = {
  query: string;
  city?: string;
  category?: string; // 🔥
  rating?: string;   // 🔥
};

export default async function InstituteResults({ query, city, category, rating }: Props) {
  
  // 🔥 Dynamic Filters banayein
  const searchFilters = ['type = "institute"'];
  
  if (city) searchFilters.push(`citySlug = "${city}"`);
  
  // Note: Aapke Meilisearch document me category aur rating ki jo exact field name hai, usse replace karein
  // Maan lijiye aap index me 'categorySlugs' array aur 'averageRating' bhejte hain
  if (category) searchFilters.push(`categories = "${category}"`); 
  if (rating) searchFilters.push(`averageRating >= ${rating}`);

  // 1. STRICT SEARCH
  let result = await meili.index("global_search").search(query, {
    limit: 100,
    filter: searchFilters, // 🔥 Array yahan pass kar diya
  });

  let institutes = result.hits as any[];
  let showedFallbackMessage = false;

  // 2. THE FALLBACK LOGIC
  if (institutes.length === 0 && query.trim().length > 0) {
    showedFallbackMessage = true;

    result = await meili.index("global_search").search("", {
      limit: 100,
      filter: searchFilters, // 🔥 Yahan bhi pass karein
    });

    institutes = result.hits as any[];
  }

  // 3. Agar poore sehar/filter me hi kuch nahi hai
  if (institutes.length === 0) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white p-10 text-center shadow-sm">
        <h3 className="text-lg font-semibold">No institutes found</h3>
        <p className="mt-2 text-slate-500">
          Try clearing some filters or searching with different keywords.
        </p>
      </div>
    );
  }

  return (
    <>
      {/* Fallback Banner */}
      {showedFallbackMessage && (
        <div className="mb-6 rounded-xl border border-amber-200 bg-amber-50 p-4 text-amber-900 shadow-sm animate-in fade-in zoom-in duration-300">
          <div className="flex items-start gap-3">
            <span className="text-xl">📍</span>
            <div>
              <h4 className="font-semibold">Couldn't find exact matches for your specific area.</h4>
              <p className="text-sm mt-1 text-amber-700">
                Showing top-rated institutes instead based on your filters.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Map Toggle & Cards */}
      <MapToggleSection
        institutes={institutes.map((institute) => ({
          id: institute.id,
          name: institute.name,
          latitude: institute.latitude,
          longitude: institute.longitude,
          slug: `${institute.prismaId}-${institute.slug}`,
        }))}
      />

      <div className="grid gap-6 md:grid-cols-2 mt-6">
        {institutes.map((institute) => (
          <InstituteCard
            key={institute.id}
            id={institute.prismaId}
            slug={institute.slug}
            name={institute.name}
            image={institute.imageUrl}
            averageRating={institute.googleRating || institute.averageRating}
            reviewCount={institute.googleReviewCount || institute.reviewCount}
            description={institute.description}
            city={{
              name: institute.city,
              slug: institute.citySlug,
            }}
          />
        ))}
      </div>
    </>
  );
}