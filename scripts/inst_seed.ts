import "dotenv/config";
import { prisma } from "@/lib/prisma";
import slugify from "slugify";

const GOOGLE_API_KEY =
  process.env.GOOGLE_MAPS_API_KEY!;

function sleep(ms: number) {
  return new Promise((resolve) =>
    setTimeout(resolve, ms)
  );
}

async function searchAllPlaces(
  query: string
) {
  const allPlaces: any[] = [];

  let pageToken:
    | string
    | undefined;

  do {
    const response =
      await fetch(
        "https://places.googleapis.com/v1/places:searchText",
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",

            "X-Goog-Api-Key":
              GOOGLE_API_KEY,

            "X-Goog-FieldMask":
              "places.id,places.displayName,nextPageToken",
          },

          body: JSON.stringify({
            textQuery: query,
            pageToken,
          }),
        }
      );

    const data =
      await response.json();

    allPlaces.push(
      ...(data.places || [])
    );

    pageToken =
      data.nextPageToken;

    if (pageToken) {
      await sleep(2000);
    }
  } while (pageToken);

  return allPlaces;
}

async function getPlaceDetails(
  placeId: string
) {
  const response =
    await fetch(
      `https://places.googleapis.com/v1/places/${placeId}`,
      {
        headers: {
          "X-Goog-Api-Key":
            GOOGLE_API_KEY,

          "X-Goog-FieldMask":
            [
              "id",
              "displayName",
              "formattedAddress",
              "location",
              "websiteUri",
              "nationalPhoneNumber",
              "rating",
              "userRatingCount",
              "googleMapsUri",
              "photos",
              "types",
            ].join(","),
        },
      }
    );

  return response.json();
}

function getQueries(
  categoryName: string,
  cityName: string,
  categorySlug: string
) {
  if (
    categorySlug ===
    "jee-coaching"
  ) {
    return [
      `JEE Coaching in ${cityName}`,
      `IIT JEE Coaching in ${cityName}`,
      `JEE Classes in ${cityName}`,
      `Engineering Entrance Coaching in ${cityName}`,
    ];
  }

  if (
    categorySlug ===
    "neet-coaching"
  ) {
    return [
      `NEET Coaching in ${cityName}`,
      `Medical Entrance Coaching in ${cityName}`,
      `NEET Classes in ${cityName}`,
    ];
  }

  return [
    `${categoryName} in ${cityName}`,
  ];
}

async function importCategoryCity(
  category: any,
  city: any
) {
  console.log(
    `\n🚀 ${category.name} -> ${city.name}`
  );

  const queries =
    getQueries(
      category.name,
      city.name,
      category.slug
    );

  const uniquePlaces =
    new Map<string, any>();

  for (const query of queries) {
    console.log(
      `Searching: ${query}`
    );

    const places =
      await searchAllPlaces(
        query
      );

    console.log(
      `Returned: ${places.length}`
    );

    for (const place of places) {
      uniquePlaces.set(
        place.id,
        place
      );
    }
  }

  const places =
    Array.from(
      uniquePlaces.values()
    );

  console.log(
    `Unique: ${places.length}`
  );

  for (const place of places) {
    try {
      const details =
        await getPlaceDetails(
          place.id
        );

      const slug =
        slugify(
          details.displayName
            ?.text || "",
          {
            lower: true,
            strict: true,
          }
        );

      let imageUrl =
        null;

      if (
        details.photos?.[0]
          ?.name
      ) {
        imageUrl =
          `https://places.googleapis.com/v1/${details.photos[0].name}/media?maxHeightPx=1200&key=${GOOGLE_API_KEY}`;
      }

      const institute =
        await prisma.institute.upsert({
          where: {
            googlePlaceId:
              details.id,
          },

          update: {
            googleRating:
              details.rating,

            googleReviewCount:
              details.userRatingCount,

            website:
              details.websiteUri,

            phone:
              details.nationalPhoneNumber,

            imageUrl,
          },

          create: {
            name:
              details.displayName
                .text,

            slug,

            address:
              details.formattedAddress,

            latitude:
              details.location
                ?.latitude,

            longitude:
              details.location
                ?.longitude,

            website:
              details.websiteUri,

            phone:
              details.nationalPhoneNumber,

            googlePlaceId:
              details.id,

            googleRating:
              details.rating,

            googleReviewCount:
              details.userRatingCount,

            googleMapsUrl:
              details.googleMapsUri,

            imageUrl,

            cityId:
              city.id,
          },
        });

      await prisma.instituteCategory.upsert({
        where: {
          instituteId_categoryId:
            {
              instituteId:
                institute.id,

              categoryId:
                category.id,
            },
        },

        update: {},

        create: {
          instituteId:
            institute.id,

          categoryId:
            category.id,
        },
      });

      console.log(
        `✅ ${institute.name}`
      );

      await sleep(250);
    } catch (err) {
      console.error(err);
    }
  }
}

async function main() {
  const categories =
    await prisma.category.findMany(
      {
        where: {
          level: 2,
          isActive: true,
        },
      }
    );

  const cities =
    await prisma.city.findMany();

  console.log(
    `Categories: ${categories.length}`
  );

  console.log(
    `Cities: ${cities.length}`
  );

  // TEST MODE
  const testCategories =
    categories.filter((c) =>
      [
        // "jee-coaching",
        "neet-coaching",
      ].includes(c.slug)
    );

  const testCities =
    cities.filter((c) =>
      [
        "noida",
        // "delhi",
        // "kota",
      ].includes(c.slug)
    );

  for (const category of testCategories) {
    for (const city of testCities) {
      await importCategoryCity(
        category,
        city
      );
    }
  }
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
  });