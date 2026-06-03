export default function RelatedBlogs() {
  return (
    <section>
      <h2 className="mb-6 text-2xl font-bold">
        Guides & Resources
      </h2>

      <div className="grid gap-6 md:grid-cols-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <article
            key={i}
            className="
              overflow-hidden
              rounded-3xl
              border
              bg-background
            "
          >
            <div className="h-48 bg-muted" />

            <div className="p-5">
              <h3 className="font-semibold">
                Best JEE Coaching in Kota
              </h3>

              <p className="mt-2 text-sm text-muted-foreground">
                5 min read
              </p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}