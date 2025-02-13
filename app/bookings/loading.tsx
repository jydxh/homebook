import { SkeletonCard } from "@/components/fallback/PropertyListFallBack";
function loading() {
	return (
		<div className="p-8 gap-x-8 gap-y-16 grid  md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
			<SkeletonCard />
			<SkeletonCard />
			<SkeletonCard />
			<SkeletonCard />
		</div>
	);
}
export default loading;
