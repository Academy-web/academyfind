import type { Metadata } from "next";
import { notFound } from "next/navigation";

import extractId from "@/lib/extractId";
import { getInstituteById } from "@/lib/institutes_id";

export const revalidate = 86400;

interface PageProps {
  params: Promise<{
    idSlug: string;
  }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {

  const { idSlug } = await params;

  const id = extractId(idSlug);

  const institute = await getInstituteById(id);

  // if (!institute) {
  //   return {
  //     title: "Institute Not Found",
  //   };
  // }

  return {
    title: `${institute?.name} | AcademyFind`,
    description:
      institute?.description ??
      `Learn more about ${institute?.name}.`,

    alternates: {
      canonical: `${process.env.BASE_URL}/inst/${idSlug}`,
    },
  };
}

export default async function InstitutePage({
  params,
}: PageProps) {

  const { idSlug } = await params;

  const id = extractId(idSlug);

  const institute = await getInstituteById(id);

  if (!institute) {
    notFound();
  }

  return (
    <main className="max-w-6xl mx-auto p-6">

      <h1 className="text-4xl font-bold">
        {institute.name}
      </h1>

      <p className="mt-4 text-gray-600">
        {institute.description ??
          "No description available"}
      </p>

      <div className="mt-6">
        <h2 className="font-semibold">
          City
        </h2>

        <p>{institute.city.name}</p>
      </div>

      <div className="mt-6">
        <h2 className="font-semibold">
          Categories
        </h2>

        <ul>
          {institute.categories.map((item) => (
            <li key={item.category.id}>
              {item.category.name}
            </li>
          ))}
        </ul>
      </div>

    </main>
  );
}