import { Skeleton } from "@/components/ui/skeleton";

function Loading() {
	return (
		<div className="flex flex-col space-y-4 px-4">
			<div className="flex flex-col gap-y-2">
				<Skeleton className="h-[4rem] w-full rounded-xl" />
				<Skeleton className="h-[4rem] w-full rounded-xl" />
				<Skeleton className="h-[4rem] w-full rounded-xl" />
			</div>
			<Skeleton className="h-[20rem] w-full" />
		</div>
	);
}
export default Loading;
