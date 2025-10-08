import { Skeleton } from "@/components/ui/skeleton";

export function RecomendedCarsSkeleton() {
  return (
    <div>
      <Skeleton className="w-full h-[80px] rounded-lg md:hidden bg-gray-300 mb-3" />
      <Skeleton className="w-full h-[80px] rounded-lg md:hidden bg-gray-300" />
      <div className="hidden md:flex justify-between gap-x-4">
        {Array.from({ length: 5 }).map((_, idx) => (
          <Skeleton
            key={idx}
            className="w-full max-w-[214px] rounded-lg h-[390px] bg-gray-300"
          />
        ))}
      </div>
    </div>
  );
}
