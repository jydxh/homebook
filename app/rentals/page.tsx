import { Button } from "@/components/ui/button";
import { fetchPropertyByUser } from "@/utils/actions/PropertyActions";
import Link from "next/link";
import HomePagination from "@/components/home/HomePagination";

async function RentalsPage() {
	const rentals = await fetchPropertyByUser();
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
			{/* pagination */}
			{rentals.totalPage > 1 && (
				<HomePagination
					currentPage={rentals.page}
					totalPage={rentals.totalPage}
					totalCount={rentals.totalRental || 0}
				/>
			)}
		</div>
	);
}
export default RentalsPage;
