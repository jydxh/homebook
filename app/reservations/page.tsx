import ReverseChartsFallBack from "@/components/fallback/ReverseChartsFallBack";
import ReverseTableFallBack from "@/components/fallback/ReverseTableFallBack";
import ReserveSearch from "@/components/reservation/ReserveSearch";
import ReverseCharts from "@/components/reservation/ReverseCharts";
import ReverseTable from "@/components/reservation/ReverseTable";
import { Suspense } from "react";

function ReservationsPage({
	searchParams,
}: {
	searchParams: { searchName: string | undefined; page: string | undefined };
}) {
	const searchName = searchParams.searchName;
	const page = searchParams.page;
	return (
		<section>
			<h1 className="text-2xl font-semibold my-4 mx-auto text-center">
				Reservation and Statistics of all your properties
			</h1>
			<ReserveSearch />
			<Suspense fallback={<ReverseChartsFallBack />}>
				<ReverseCharts />
			</Suspense>
			<Suspense fallback={<ReverseTableFallBack />}>
				<ReverseTable searchName={searchName} page={page} />
			</Suspense>
		</section>
	);
}
export default ReservationsPage;
