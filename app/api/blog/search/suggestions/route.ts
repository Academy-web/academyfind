import { NextRequest, NextResponse } from "next/server";
import { meili } from "@/lib/meilisearch";

const index = meili.index("global_search");

export async function GET(request: NextRequest) {
  try {
    const query = request.nextUrl.searchParams.get("q")?.trim();

    if (!query || query.length < 2) {
      return NextResponse.json([]);
    }

    const results = await index.search(query, {
      filter: ['type IN ["blog","category","tag"]'],
      limit: 8,
    });

    const suggestions = results.hits.map((hit: any) => {
      switch (hit.type) {
        case "blog":
          return {
            id: hit.id,
            type: "blog",
            title: hit.title ?? hit.name,
            subtitle: hit.category,
            url: `/blog/${hit.slug}`,
          };

        case "category":
          return {
            id: hit.id,
            type: "category",
            title: hit.name,
            subtitle: "Category",
            url: `/blog/category/${hit.slug}`,
          };

        case "tag":
          return {
            id: hit.id,
            type: "tag",
            title: hit.name,
            subtitle: "Tag",
            url: `/blog/tag/${hit.slug}`,
          };

        default:
          return null;
      }
    });

    return NextResponse.json(
      suggestions.filter(Boolean),
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error("Search suggestions error:", error);

    return NextResponse.json(
      {
        message: "Something went wrong.",
      },
      {
        status: 500,
      }
    );
  }
}