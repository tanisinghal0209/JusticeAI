import { Skeleton } from "@/components/ui/skeleton";

export default function DashboardLoading() {
  return (
    <div className="space-y-8 max-w-6xl mx-auto pb-12 w-full">
      <div className="space-y-2">
        <Skeleton className="h-10 w-1/3 max-w-[300px]" />
        <Skeleton className="h-4 w-1/2 max-w-[500px]" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map((i) => (
          <Skeleton key={i} className="h-32 w-full rounded-xl" />
        ))}
      </div>

      <div className="space-y-4">
        <Skeleton className="h-6 w-1/4 max-w-[200px]" />
        <Skeleton className="h-64 w-full rounded-xl" />
      </div>
    </div>
  );
}
