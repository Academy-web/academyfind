import BlogCard from "../cards/BlogCard";

type AuthorPostGridProps = {
  posts: {
    id: string;
    title: string;
    slug: string;
    excerpt: string | null;
    coverImage: string | null;
    coverImageAlt: string | null;
    readingTime: number | null;
    publishedAt: Date | null;
    viewCount: number;
    likeCount: number;
    commentCount: number;

    category: {
      id: string;
      name: string;
      slug: string;
    } | null;

    brand: {
      id: string;
      name: string;
      slug: string;
      avatarUrl: string | null;
    } | null;
  }[];
};

export default function AuthorPostGrid({
  posts,
}: AuthorPostGridProps) {
  return (
    <div className="grid gap-8 sm:grid-cols-2 xl:grid-cols-3">
      {posts.map((post: AuthorPostGridProps['posts'][0]) => (
        <BlogCard
          key={post.id}
          post={post}
        />
      ))}
    </div>
  );
}