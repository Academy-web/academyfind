interface Props {
  query: string;
}

export default function SearchResultsHeader({
  query,
}: Props) {
  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <div>
        <h2 className="text-3xl font-bold">
          Institutes
        </h2>

        <p className="mt-2 text-muted-foreground">
          Results for "{query}"
        </p>
      </div>

      <select
        className="
          rounded-xl
          border
          bg-background
          px-4
          py-3
        "
      >
        <option>Most Relevant</option>
        <option>Highest Rated</option>
        <option>Most Reviewed</option>
      </select>
    </div>
  );
}