
import { Metadata } from "next";
import {Hero} from "@/components/blog/home/hero/index";
import FeaturedPosts from "@/components/blog/home/FeaturedPosts";
import CategoryTabs from "@/components/blog/home/CategoryTabs";
import LatestPosts from "@/components/blog/home/LatestPosts";
import TrendingPosts from "@/components/blog/home/TrendingPosts";
import ExploreByExam from "@/components/blog/home/ExploreByExam";
import ExploreByCity from "@/components/blog/home/ExploreByCity";
import Newsletter from "@/components/blog/home/Newsletter";
import CTASection from "@/components/blog/home/CTASection";

export const metadata: Metadata = {
  title: "Blog & Educational Resources | AcademyFind",
  description: "Read the latest insights, expert interviews, exam tips, and study hacks on the AcademyFind blog. Our editorial space is launching soon!",
  alternates: {
    canonical: "https://www.academyfind.com/blog",
  },
  openGraph: {
    title: "AcademyFind Blog - Coming Soon",
    description: "Expert educational insights and study hacks are brewing. Stay tuned!",
    url: "https://www.academyfind.com/blog",
    type: "website",
  },
};

export default function BlogPage() {
  return (
    <>
      <Hero />
      <FeaturedPosts />
      <LatestPosts />
      <TrendingPosts />
      <ExploreByExam />
      <ExploreByCity />
      <CategoryTabs />
      <Newsletter />
      <CTASection />
      </>
  );
}