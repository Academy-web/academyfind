import InstituteCard from "@/components/institutes/InstituteCard";

const institutes = Array.from({ length: 6 });

export default function InstituteResults() {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      {institutes.map((_, i) => (
        <InstituteCard
          key={i}
          id="1"
          slug="allen-career-institute"
          name="Allen Career Institute"
          city={{
            name: "Kota",
            slug: "kota",
          }}
          averageRating={4.8}
          reviewCount={125}
          description="One of India's leading coaching institutes for JEE and NEET preparation."
        />
      ))}
    </div>
  );
}