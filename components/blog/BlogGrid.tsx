import BlogCard from "./BlogCard";

const blogs = [
  {
    title: "Allen vs Resonance: Which One Is Better?",
    slug: "allen-vs-resonance",
    category: "Comparison",
    readTime: "6 min read",
  },
  {
    title: "Best NEET Coaching In Delhi",
    slug: "best-neet-coaching-delhi",
    category: "NEET",
    readTime: "5 min read",
  },
  {
    title: "Top JEE Coaching Institutes In Jaipur",
    slug: "top-jee-coaching-jaipur",
    category: "JEE",
    readTime: "8 min read",
  },
  {
    title: "How To Choose The Right Coaching Institute",
    slug: "choose-right-coaching",
    category: "Guide",
    readTime: "7 min read",
  },
  {
    title: "Best NDA Coaching Institutes",
    slug: "best-nda-coaching",
    category: "NDA",
    readTime: "4 min read",
  },
  {
    title: "Study Tips For Competitive Exams",
    slug: "study-tips",
    category: "Preparation",
    readTime: "6 min read",
  },
];

export default function BlogGrid() {
  return (
    <section className="mt-16">
      <div className="flex items-end justify-between">
        <div>
          <h2 className="text-3xl font-bold">
            Latest Articles
          </h2>

          <p className="mt-2 text-muted-foreground">
            Fresh insights and guides.
          </p>
        </div>
      </div>

      <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {blogs.map((blog) => (
          <BlogCard
            key={blog.slug}
            {...blog}
          />
        ))}
      </div>
    </section>
  );
}