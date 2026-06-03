const categories = [
  "JEE Coaching",
  "NEET Coaching",
  "NDA Coaching",
  "CAT Coaching",
  "Foundation",
];

export default function RelatedCategories() {
  return (
    <section>
      <h2 className="mb-6 text-2xl font-bold">
        Related Categories
      </h2>

      <div className="grid gap-4 md:grid-cols-3">
        {categories.map((category) => (
          <div
            key={category}
            className="
              rounded-2xl
              border
              bg-background
              p-5
              transition
              hover:border-amber-300
              hover:shadow-md
            "
          >
            {category}
          </div>
        ))}
      </div>
    </section>
  );
}