import { BlogSearchDocument } from "@/types/BlogSearchDocument";
import { meili } from "@/lib/meilisearch";
import { prisma } from "@/lib/prisma";

const index = meili.index("global_search");

export type SearchBlogPostsParams = {
  query?: string;
  page?: number;
  limit?: number;
  category?: string;
  tag?: string;
  sort?: "relevance" | "latest" | "oldest" | "popular";
};

export async function searchBlogPosts({
  query = "",
  page = 1,
  limit = 9,
  category,
  tag,
  sort = "relevance",
}: SearchBlogPostsParams) {
  try {
    const filters = ['type = "blog"'];

    if (category) {
      filters.push(`categorySlug = "${category}"`);
    }

    if (tag) {
      filters.push(`tagSlugs = "${tag}"`);
    }

    let sortOption: string[] | undefined;

    switch (sort) {
      case "latest":
        sortOption = ["publishedAt:desc"];
        break;

      case "oldest":
        sortOption = ["publishedAt:asc"];
        break;

      case "popular":
        sortOption = ["viewCount:desc"];
        break;

      default:
        sortOption = undefined;
    }

    const results = await index.search<BlogSearchDocument>(query, {
    filter: filters,
    sort: sortOption,
    hitsPerPage: limit,
    page,
});

    return {
      posts: results.hits.map((hit: BlogSearchDocument) => ({
    ...hit,

        publishedAt: hit.publishedAt
            ? new Date(hit.publishedAt)
            : null,
    })),

      total: results.estimatedTotalHits ?? 0,

      page,

      limit,

      totalPages: Math.ceil((results.estimatedTotalHits ?? 0) / limit) || 1,

      hasNextPage: page < (Math.ceil((results.estimatedTotalHits ?? 0) / limit) || 1),

      hasPreviousPage: page > 1,
    };
  } catch (error) {
    console.error("Blog search error:", error);

    return {
      posts: [],
      total: 0,
      page,
      limit,
      totalPages: 0,
      hasNextPage: false,
      hasPreviousPage: false,
    };
  }
}

export async function getSearchFilters() {
  try {
    const [categories, tags] = await Promise.all([
      prisma.blogCategory.findMany({
        where: {
          isActive: true,
        },
        orderBy: {
          name: "asc",
        },
        select: {
          id: true,
          name: true,
          slug: true,
        },
      }),

      prisma.blogTag.findMany({
        orderBy: {
          name: "asc",
        },
        select: {
          id: true,
          name: true,
          slug: true,
          postCount: true,
        },
      }),
    ]);

    return {
      categories,
      tags,
    };
  } catch (error) {
    console.error("Error loading search filters:", error);

    return {
      categories: [],
      tags: [],
    };
  }
}