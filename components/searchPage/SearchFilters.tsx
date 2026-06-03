export default function SearchFilters() {
  return (
    <aside
      className="
        sticky
        top-24
        hidden
        h-fit
        rounded-3xl
        border
        bg-background
        p-6
        shadow-sm
        lg:block
      "
    >
      <h3 className="font-semibold">
        Filters
      </h3>

      <div className="mt-6 space-y-5">
        <select className="w-full rounded-xl border-0 bg-slate-50 p-2 shadow-lg ">
          <option>All Categories</option>
        </select>

        <select className="w-full rounded-xl border-0 bg-slate-50 p-2 shadow-lg ">
          <option>All Cities</option>
        </select>

        <select className="w-full rounded-xl border-0 bg-slate-50 p-2 shadow-lg ">
          <option>Rating 4+</option>
        </select>
      </div>
    </aside>
  );
}