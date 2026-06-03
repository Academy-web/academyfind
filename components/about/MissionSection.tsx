export default function MissionSection() {
  return (
    <section className="grid gap-12 lg:grid-cols-2 lg:items-center">
      <div>
        <span className="text-sm font-semibold uppercase tracking-wide text-amber-500">
          Our Mission
        </span>

        <h2 className="mt-3 text-4xl font-bold">
          Making Institute Discovery Simple
        </h2>

        <p className="mt-6 text-muted-foreground">
          Choosing the right coaching institute is
          one of the most important decisions for
          students. Yet most information online is
          scattered, outdated or biased.
        </p>

        <p className="mt-4 text-muted-foreground">
          AcademyFind exists to help students make
          informed decisions by providing
          transparent institute information,
          comparisons, reviews and insights.
        </p>
      </div>

      <div
        className="
          rounded-3xl
          border
          border-amber-100
          bg-gradient-to-br
          from-amber-50
          to-orange-50
          p-10
        "
      >
        <h3 className="text-2xl font-bold">
          What We Believe
        </h3>

        <ul className="mt-6 space-y-4 text-muted-foreground">
          <li>✓ Students deserve transparent information</li>
          <li>✓ Comparisons should be unbiased</li>
          <li>✓ Discovery should be simple and fast</li>
          <li>✓ Quality education should be easier to find</li>
        </ul>
      </div>
    </section>
  );
}