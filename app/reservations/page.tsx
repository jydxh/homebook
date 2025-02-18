import ReverseChartsFallBack from "@/components/fallback/ReverseChartsFallBack";
import ReverseTableFallBack from "@/components/fallback/ReverseTableFallBack";
import ReverseCharts from "@/components/reservation/ReverseCharts";
import ReverseTable from "@/components/reservation/ReverseTable";
import { Suspense } from "react";

function ReservationsPage() {
	return (
		<section>
			<h1 className="text-2xl font-semibold my-4 mx-auto text-center">
				Reservation and Statistics of all your properties
			</h1>
			<Suspense fallback={<ReverseChartsFallBack />}>
				<ReverseCharts />
			</Suspense>
			<Suspense fallback={<ReverseTableFallBack />}>
				<ReverseTable />
			</Suspense>
		</section>
	);
}
export default ReservationsPage;
