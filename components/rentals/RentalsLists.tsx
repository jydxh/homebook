import { fetchPropertyByUser } from "@/utils/actions/PropertyActions";
import Link from "next/link";
import HomePagination from "@/components/home/HomePagination";
import { Button } from "@/components/ui/button";
async function RentalsLists({
	currentPage,
	query,
}: {
	currentPage?: string;
	query?: string;
}) {
	const rentals = await fetchPropertyByUser(currentPage, query);
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
	return (
		<section className="mt-8 px-4">
			later the resuslt be here: <p>{JSON.stringify(rentals)}</p>{" "}
			{/* pagination */}
			{rentals.totalPage > 1 && (
				<HomePagination
					href="rentals"
					currentPage={currentPage || "1"}
					totalPage={rentals.totalPage}
					totalCount={rentals.totalRental || 0}
				/>
			)}
		</section>
	);
}
export default RentalsLists;
