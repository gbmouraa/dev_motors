import { ChevronRight } from "lucide-react";
import Link from "next/link";

interface BreadCrumbsProps {
  route: string;
  query?: string;
  category?: string;
}

export function BreadCrumbs({ route, query, category }: BreadCrumbsProps) {
  return (
    <div className="text-gray-500 font-extralight text-sm py-6">
      <div className="flex items-center">
        <Link
          href="/"
          className="flex items-center hover:text-gray-900 transition-colors"
        >
          Home <ChevronRight size={14} />{" "}
        </Link>
        <span className="flex items-center">
          {route} <ChevronRight size={14} />{" "}
        </span>
        <span className="text-gray-900 font-medium">
          {query ? query : category}
        </span>
      </div>
    </div>
  );
}
