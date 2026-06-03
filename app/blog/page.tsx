import BlogHero from "@/components/blog/BlogHero";
import FeaturedBlog from "@/components/blog/FeaturedBlog";
import BlogCategories from "@/components/blog/BlogCategories";
import BlogGrid from "@/components/blog/BlogGrid";
import NewsletterCTA from "@/components/blog/NewsLetterCTA";


export default function BlogPage() {
  return (
    <>
      <BlogHero />
      <main className="mx-auto max-w-7xl px-4 py-12">
        <FeaturedBlog />

        <BlogCategories />

        <BlogGrid />

        <NewsletterCTA />
      </main>
    </>
  );
}