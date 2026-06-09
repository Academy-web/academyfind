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
         Finding the right place to learn is often difficult. Information is scattered across multiple websites, social media pages, and directories, making it time-consuming to compare options. AcademyFind brings this information together in one place, allowing users to explore learning opportunities through simple search and filtering tools.
          Whether you're preparing for a competitive exam, looking for academic support, learning a new skill, or pursuing a hobby, AcademyFind aims to make the search process easier and more transparent.
          Our mission is to organize the fragmented learning ecosystem and help learners discover the opportunities that best fit their goals.

        </p>

        <p className="mt-4 text-muted-foreground">
          AcademyFind exists to organize and simplify the fragmented learning ecosystem by making educational and extracurricular opportunities easily discoverable, searchable, and accessible. 
        </p>
      </div>

      <div
        className="
          rounded-3xl
          border
          border-amber-100
          bg-linear-to-br
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