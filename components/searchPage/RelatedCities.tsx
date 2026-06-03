const cities = [
  "Kota",
  "Delhi",
  "Jaipur",
  "Patna",
  "Hyderabad",
  "Pune",
];

export default function RelatedCities() {
  return (
    <section>
      <h2 className="mb-6 text-2xl font-bold">
        Popular Cities
      </h2>

      <div className="grid gap-4 md:grid-cols-3">
        {cities.map((city) => (
          <div
            key={city}
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
            <h3 className="font-semibold">
              {city}
            </h3>

            <p className="mt-1 text-sm text-muted-foreground">
              Explore institutes
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}