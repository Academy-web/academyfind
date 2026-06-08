import { prisma } from "@/lib/prisma";
import { meili } from "@/lib/meilisearch";

export async function getInstitutesByCategoryAndCity(
  categorySlug: string,
  citySlug: string,
  sort?: string,
  page: number = 1,
  q?: string,
  lat?: number, // 👈 Naya Parameter
  lng?: number, // 👈 Naya Parameter
  limit: number = 12
) {
  const skip = (page - 1) * limit;
  const radiusInMeters = 5000; // 5 km radius

  // ==========================================
  // 🚀 SCENARIO 1: MEILISEARCH (Jab search me q, lat, ya lng aaye)
  // ==========================================
  if ((q && q.trim() !== "") || (lat && lng)) {
    let exactAreaMatch = true;

    let searchOptions: any = {
      filter: [
        `type = "institute"`,
        `citySlug = "${citySlug}"`,
        `categorySlugs = "${categorySlug}"`
      ],
      limit: limit,
      offset: skip,
    };

    // 1. Agar user ne Location select ki hai (Google Places se coordinates aaye hain)
    if (lat && lng) {
      searchOptions.filter.push(`_geoRadius(${lat}, ${lng}, ${radiusInMeters})`);
      searchOptions.sort = [`_geoPoint(${lat}, ${lng}):asc`]; // Jo sabse paas hai, wo sabse upar!
    }

    // 2. Search Execute karo (Agar 'q' nahi hai toh empty string jayegi, par geo-filter kaam karega)
    const searchQuery = q ? q.trim() : "";
    let searchRes = await meili.index("global_search").search(searchQuery, searchOptions);

    // 3. The Fallback (Agar us 5km radius mein institute nahi mila)
    if (searchRes.hits.length === 0) {
      exactAreaMatch = false; // Frontend pe Amber Banner dikhane ke liye

      // Fallback A: Radius aur Sorting hata kar poore city me dhoondo
      searchOptions.filter = [
        `type = "institute"`,
        `citySlug = "${citySlug}"`,
        `categorySlugs = "${categorySlug}"`
      ];
      delete searchOptions.sort;

      searchRes = await meili.index("global_search").search(searchQuery, searchOptions);

      // Fallback B: Agar abhi bhi 0 hits aaye (matlab user ki query 'q' me koi kachra tha)
      if (searchRes.hits.length === 0 && searchQuery !== "") {
         // Query text hata do, aur city ke top institutes dikha do
         searchRes = await meili.index("global_search").search("", searchOptions);
      }
    }

    const instituteIds = searchRes.hits.map((hit: any) => hit.prismaId);

    if (instituteIds.length === 0) {
      return { institutes: [], totalPages: 0, currentPage: page, totalCount: 0, exactAreaMatch: false };
    }

    const dbInstitutes = await prisma.institute.findMany({
      where: { id: { in: instituteIds } },
      include: { city: true, reviews: true },
    });

    const orderedInstitutes = instituteIds.flatMap((id) => {
      const inst = dbInstitutes.find((i) => i.id === id);
      return inst ? [inst] : [];
    });

    return {
      institutes: orderedInstitutes,
      totalPages: Math.ceil((searchRes.estimatedTotalHits || 0) / limit),
      currentPage: page,
      totalCount: searchRes.estimatedTotalHits || 0,
      exactAreaMatch,
    };
  }

  // ==========================================
  // 🏢 SCENARIO 2: PURE PRISMA (Jab user Dropdown/Links se aaye)
  // ==========================================
  let orderBy = {};
  switch (sort) {
    case "rating":
      orderBy = [{ googleRating: "desc" }, { id: "asc" }];
      break;
    case "reviews":
      orderBy = [{ googleReviewCount: "desc" }, { id: "asc" }];
      break;
    default:
      orderBy = [{ googleRating: "desc" }, { id: "asc" }];
  }

  const [institutes, totalCount] = await Promise.all([
    prisma.institute.findMany({
      where: {
        city: { slug: citySlug },
        categories: { some: { category: { slug: categorySlug } } },
      },
      include: { city: true, reviews: true },
      orderBy,
      skip: skip,
      take: limit,
    }),
    prisma.institute.count({
      where: {
        city: { slug: citySlug },
        categories: { some: { category: { slug: categorySlug } } },
      },
    }),
  ]);

  return {
    institutes,
    totalPages: Math.ceil(totalCount / limit),
    currentPage: page,
    totalCount,
  };
}