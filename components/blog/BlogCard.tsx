import Image from "next/image";
import Link from "next/link";

interface BlogCardProps {
  title: string;
  slug: string;
  category: string;
  readTime: string;
}

export default function BlogCard({
  title,
  slug,
  category,
  readTime,
}: BlogCardProps) {
  return (
    <Link
      href={`/blog/${slug}`}
      className="
        group
        overflow-hidden
        rounded-3xl
        border
        border-amber-100
        bg-white
        shadow-sm
        transition-all
        duration-300
        hover:-translate-y-1
        hover:shadow-lg
      "
    >
      <div className="relative h-52 overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1509062522246-3755977927d7"
          alt={title}
          fill
          className="
            object-cover
            transition-transform
            duration-700
            group-hover:scale-105
          "
        />
      </div>

      <div className="p-5">
        <span
          className="
            rounded-full
            bg-amber-100
            px-3
            py-1
            text-xs
            font-medium
            text-amber-700
          "
        >
          {category}
        </span>

        <h3
          className="
            mt-4
            line-clamp-2
            text-lg
            font-semibold
            transition-colors
            group-hover:text-amber-500
          "
        >
          {title}
        </h3>

        <p className="mt-4 text-sm text-muted-foreground">
          {readTime}
        </p>
      </div>
    </Link>
  );
}