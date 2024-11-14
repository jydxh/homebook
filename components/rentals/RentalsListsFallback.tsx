import { Skeleton } from "../ui/skeleton";
function RentalsListsFallback() {
	return (
		<div className="mt-8 mx-auto w-full px-8 ">
			<Skeleton className="w-full my-2 h-[1.6rem]" />
			<Skeleton className="w-full my-2 h-[1.6rem]" />
			<Skeleton className="w-full my-2 h-[1.6rem]" />
			<Skeleton className="w-full my-2 h-[1.6rem]" />
			<Skeleton className="w-full my-2 h-[1.6rem]" />
		</div>
	);
}
export default RentalsListsFallback;
