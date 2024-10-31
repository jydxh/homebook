import { Skeleton } from "../ui/skeleton";

function PropertyListFallBack() {
	return (
		<section className="p-8 gap-x-8 gap-y-16 grid  md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
			<SkeletonCard />
			<SkeletonCard />
			<SkeletonCard />
			<SkeletonCard />
		</section>
	);
}
export default PropertyListFallBack;

export const SkeletonCard = () => {
	return (
		<div>
			<Skeleton className="h-[300px] rounded" />
			<Skeleton className="h-6 mt-4 w-[80%]" />
			<Skeleton className="h-6 mt-4 w-[80%]" />
		</div>
	);
};
