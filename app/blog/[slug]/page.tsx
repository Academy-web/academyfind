import AuthorCard from "@/components/blog/article/AuthorCard";
import Breadcrumb from "@/components/blog/article/BreadCrumb";
import Comments from "@/components/blog/article/Comments";
import FAQSection from "@/components/blog/article/FAQSection";
import NewsletterCTA from "@/components/blog/article/NewsLetterCTA";
import ArticleActions from "@/components/blog/article/PostActions";
import PostContent from "@/components/blog/article/PostContent";
import PostHero from "@/components/blog/article/PostHero";
import ReadingProgress from "@/components/blog/article/ReadinProgress";
import RelatedInstitute from "@/components/blog/article/RelatedInstitutes";
import RelatedPosts from "@/components/blog/article/RelatedPosts";
import ShareButtons from "@/components/blog/article/ShareButtons";
import StickyCTA from "@/components/blog/article/StickyCTA";
import TableOfContents from "@/components/blog/article/TableOfContents";
import { getCachedSession } from "@/lib/auth/session";
import { getBlogPostBySlug, getisBookmarked, getRelatedInstitute, getUserReaction, getRelatedPosts } from "@/lib/User/user/blog/getpost";


type Props = {
  params: Promise<{
    slug: string;
  }>;
};

type TOCItem ={
  id: string;
  text: string;
  level: number;
}

export default async function BlogDetailPage({
  params,
}: Props) {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);
  if (!post) {
    return (
      <div className="flex h-screen items-center justify-center">
        <h1 className="text-2xl font-bold text-slate-900">Post not found</h1>
      </div>
    );
  }
  const userReaction = await getUserReaction(post?.id || "");
  const hasBookmarked = await getisBookmarked(post?.id || "");
  const relatedInstitute = await getRelatedInstitute(post?.relatedInstituteId);
  const relatedPosts = await getRelatedPosts(post?.id || "", post?.categoryId || "");
  const session = await getCachedSession();
  const userId = session?.user?.id;

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <ReadingProgress />

      <PostHero post={post} />

      <Breadcrumb items={[{ label: "Blog", href: "/blog" }, { label: post.category?.name || "Uncategorized", href: `/blog/category/${post.category?.slug}` }, { label: post.title }]} />

      <div className="grid gap-10 xl:grid-cols-[minmax(0,1fr)_320px]">
          <main>
              <PostContent html={post.contentHtml} className="prose-lg" />

              <FAQSection faqs={post.faqs} />

              <AuthorCard author={post.authorProfile} />

              <RelatedPosts posts={relatedPosts} />

              <RelatedInstitute institute={post.relatedInstitute} />

              <NewsletterCTA />

              <Comments comments={post.comments} canComment={!!userId} />
          </main>

          <aside>
              <TableOfContents items={(post.tableOfContents as TOCItem[]) ?? []} />

              <StickyCTA instituteSlug={relatedInstitute?.slug} />

              <ShareButtons title={post.title} slug={post.slug} url={`${process.env.NEXT_PUBLIC_SITE_URL}/blog/${post.slug}`} />

            <ArticleActions 
              postId={post.id}
              slug={post.slug}
              initialLikes={post.likeCount}
              initialBookmarks={post.bookmarkCount}
              initialComments={post.commentCount}
              hasLikedInitially={userReaction === "LIKE"}
              hasHelpfullyInitially={userReaction === "HELPFUL"}
              hasLovedInitially={userReaction === "LOVE"}
              hasBookmarkedInitially={hasBookmarked}
              isLoggedIn={!!userId} 
            />
          </aside>
      </div>
    </div>
  );
}