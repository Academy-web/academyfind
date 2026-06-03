const categories = [
  "JEE",
  "NEET",
  "NDA",
  "CAT",
  "CUET",
  "Boards",
  "Study Tips",
  "Comparisons",
];

export default function BlogCategories() {
  return (
    <section className="mt-16">
      <h2 className="text-3xl font-bold">
        Explore Topics
      </h2>

      <div className="mt-6 flex flex-wrap gap-3">
        {categories.map((category) => (
          <button
            key={category}
            className="
              rounded-full
              border
              border-amber-200
              bg-white
              px-5
              py-2
              text-sm
              font-medium
              transition-all
              hover:border-amber-400
              hover:bg-amber-50
            "
          >
            {category}
          </button>
        ))}
      </div>
    </section>
  );
}