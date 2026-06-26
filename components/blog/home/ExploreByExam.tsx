import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  Brain,
  Briefcase,
  Building2,
  GraduationCap,
  Landmark,
  Scale,
  ShieldCheck,
} from "lucide-react";

const exams = [
  {
    title: "Engineering",
    description: "JEE Main, JEE Advanced, BITSAT, VITEEE",
    href: "/engineering-entrance",
    icon: GraduationCap,
    articles: 186,
  },
  {
    title: "Medical",
    description: "NEET UG, AIIMS, Nursing & Medical Guides",
    href: "/medical-entrance",
    icon: Brain,
    articles: 143,
  },
  {
    title: "Civil Services",
    description: "UPSC, State PSC & Interview Preparation",
    href: "/upsc",
    icon: Landmark,
    articles: 92,
  },
  {
    title: "MBA",
    description: "CAT, XAT, SNAP, NMAT & Preparation",
    href: "/mba",
    icon: Briefcase,
    articles: 61,
  },
  {
    title: "Law",
    description: "CLAT, AILET, SLAT & Legal Careers",
    href: "/law",
    icon: Scale,
    articles: 55,
  },
  {
    title: "Government Jobs",
    description: "SSC, Banking, Railway & Defence Exams",
    href: "/government-exams",
    icon: ShieldCheck,
    articles: 128,
  },
  {
    title: "School",
    description: "Olympiads, NTSE & Foundation Courses",
    href: "/school",
    icon: BookOpen,
    articles: 74,
  },
  {
    title: "Study Abroad",
    description: "SAT, IELTS, TOEFL & Admissions",
    href: "/study-abroad",
    icon: Building2,
    articles: 36,
  },
];

export default function ExploreByExam() {
  return (
    <section className="py-24 bg-white">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">

        <div className="mb-14 max-w-3xl">
          <span className="rounded-full bg-amber-50 px-4 py-2 text-sm font-semibold text-amber-700">
            Explore
          </span>

          <h2 className="mt-5 text-4xl font-black tracking-tight text-slate-900">
            Explore by Exam Category
          </h2>

          <p className="mt-5 text-lg leading-8 text-slate-600">
            Discover preparation guides, coaching institutes,
            admission updates and career advice for every major
            competitive exam in India.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

          {exams.map((exam) => {

            const Icon = exam.icon;

            return (

              <Link
                key={exam.title}
                href={exam.href}
                className="group rounded-3xl border border-slate-200 bg-white p-7 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-amber-300 hover:shadow-xl"
              >

                <div className="inline-flex rounded-2xl bg-amber-50 p-4 text-amber-500 transition group-hover:bg-amber-100">
                  <Icon className="h-7 w-7" />
                </div>

                <h3 className="mt-6 text-2xl font-bold text-slate-900 transition group-hover:text-amber-600">
                  {exam.title}
                </h3>

                <p className="mt-4 leading-7 text-slate-600">
                  {exam.description}
                </p>

                <div className="mt-6 flex items-center justify-between">
                  <span className="rounded-full bg-slate-100 px-3 py-1 text-sm font-medium text-slate-600">
                    {exam.articles} Articles
                  </span>

                  <span className="inline-flex items-center gap-2 font-semibold text-amber-600">
                    Explore

                    <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                  </span>
                </div>

              </Link>

            );

          })}
        </div>

        <div className="mt-14 flex justify-center">
          <Link
            href="/categories"
            className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-7 py-4 font-semibold text-slate-700 shadow-sm transition-all hover:border-amber-300 hover:bg-amber-50 hover:text-amber-700 hover:shadow-lg"
          >
            View All Categories

            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

      </div>
    </section>
  );
}