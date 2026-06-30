// app/blog/my-posts/page.tsx

import type { Metadata } from "next";
import Breadcrumb from "@/components/blog/article/BreadCrumb";
import NewsletterCTA from "@/components/blog/article/NewsLetterCTA";
import SearchPagination from "@/components/blog/search/SearchPagination";

import MyPostsHero from "@/components/blog/my-posts/MyPostsHero";
import MyPostsStats from "@/components/blog/my-posts/MyPostsStats";
import MyPostsFilters from "@/components/blog/my-posts/MyPostsFilters";
import MyPostsGrid from "@/components/blog/my-posts/MyPostsGrid";
import MyPostsEmptyState from "@/components/blog/my-posts/MyPostsEmptyState";

import { getMyPosts } from "@/lib/User/user/blog/getmyposts";

export const metadata: Metadata = {
  title: "My Posts | AcademyFind Blog",
  description:
    "Manage your blog posts, drafts, scheduled articles and published content.",
  robots: {
    index: false,
    follow: false,
  },
};

type Props = {
  searchParams: Promise<{
    page?: string;
    status?: "DRAFT" | "PUBLISHED" | "SCHEDULED" | "ARCHIVED";
  }>;
};

export default async function MyPostsPage({
  searchParams,
}: Props) {
  const params = await searchParams;

  const page = Number(params.page ?? "1");

  const data = await getMyPosts({
    page,
    limit: 8,
    status: params.status,
  });

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <Breadcrumb
        items={[
          {
            label: "Blog",
            href: "/blog",
          },
          {
            label: "My Posts",
          },
        ]}
      />

      <MyPostsHero totalPosts={data.total} />

      <div className="mt-10">
        <MyPostsStats
          draft={data.stats.draft}
          published={data.stats.published}
          scheduled={data.stats.scheduled}
          archived={data.stats.archived}
        />
      </div>

      <div className="mt-10">
        <MyPostsFilters />
      </div>

      <section className="mt-10">
        {data.posts.length > 0 ? (
          <>
            <MyPostsGrid posts={data.posts} />

            <SearchPagination
              currentPage={data.page}
              totalPages={data.totalPages}
            />
          </>
        ) : (
          <MyPostsEmptyState />
        )}
      </section>

      <div className="mt-20">
        <NewsletterCTA />
      </div>
    </div>
  );
}