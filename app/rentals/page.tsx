import RentalsLists from "@/components/rentals/RentalsLists";
import RentalsListsFallback from "@/components/rentals/RentalsListsFallback";
import { Suspense } from "react";

function RentalsPage({
	searchParams,
}: {
	searchParams: { page?: string; query?: string };
}) {
	/* const urlPage = searchParams.page || "1";
	const rentals = await fetchPropertyByUser(urlPage);
	if (rentals.results.length === 0) {
		return (
			<div className="mt-8 mx-auto w-full text-center">
				<p className="font-semibold text-3xl">
					You have not create any rental yet
				</p>
				<Link href="/rentals/create">
					<Button className="mt-8">Create your Rentals</Button>
				</Link>
			</div>
		);
	}
	//	console.log(rentals);
	return (
		<div>
			later the resuslt be here: <p>{JSON.stringify(rentals)}</p>{" "}
			
			{rentals.totalPage > 1 && (
				<HomePagination
					href="rentals"
					currentPage={urlPage}
					totalPage={rentals.totalPage}
					totalCount={rentals.totalRental || 0}
				/>
			)}
		</div>
	); */

	return (
		<Suspense fallback={<RentalsListsFallback />}>
			<RentalsLists
				currentPage={searchParams.page}
				query={searchParams.query}
			/>
		</Suspense>
	);
}
export default RentalsPage;
