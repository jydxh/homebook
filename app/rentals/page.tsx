import RentalsLists from "@/components/rentals/RentalsLists";
import RentalsListsFallback from "@/components/rentals/RentalsListsFallback";
import RentalsSearch from "@/components/rentals/RentalsSearch";
import { Suspense } from "react";

function RentalsPage({
	searchParams,
}: {
	searchParams: { page?: string; query?: string };
}) {
	const newSearchParams = new URLSearchParams(searchParams);
	return (
		<>
			{/* searchInput */}
			<RentalsSearch />

			<Suspense fallback={<RentalsListsFallback />}>
				<RentalsLists searchParams={newSearchParams} />
			</Suspense>
		</>
	);
}
export default RentalsPage;
