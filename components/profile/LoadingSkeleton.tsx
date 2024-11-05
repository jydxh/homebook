import { Skeleton } from "../ui/skeleton";

function LoadingSkeleton() {
	return (
		<>
			<SingleSkeleton />
			<SingleSkeleton />
			<SingleSkeleton />
		</>
	);
}
export default LoadingSkeleton;

function SingleSkeleton() {
	return (
		<div className="mb-2 py-1">
			<Skeleton className="w-1/3 h-[20px] mb-3" />
			<Skeleton className="w-full h-[30px]" />
		</div>
	);
}
