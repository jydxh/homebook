import { fetchPropertyByUser } from "@/utils/actions/PropertyActions";
import Link from "next/link";
import HomePagination from "@/components/home/HomePagination";
import { Button } from "@/components/ui/button";

import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableFooter,
	TableHeader,
	TableRow,
} from "@/components/ui/table";

import { formatCurrency } from "@/utils/formatCurrency";
import UpdateBtn from "./UpdateBtn";
import DeleteBtn from "./DeleteBtn";

import RentalsTableHeader from "./RentalsTableHeader";

async function RentalsLists({
	searchParams,
}: {
	searchParams: URLSearchParams;
}) {
	const rentals = await fetchPropertyByUser(searchParams);
	const query = searchParams.get("query");
	if (rentals.results.length === 0) {
		if (query) {
			return (
				<div className="mt-8 mx-auto w-full text-center">
					<p className="font-semibold text-3xl">
						Cannot find the property with name{" "}
						<span className="underline text-muted-foreground">{query}</span>
					</p>
					<Link href="/rentals">
						<Button className="mt-8">Go back</Button>
					</Link>
				</div>
			);
		}

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
			<h2 className="w-full mx-auto my-8 text-center text-3xl font-semibold">
				My Rental Lists
			</h2>

			{/* table */}
			<Table>
				<TableCaption>A list of your rentals.</TableCaption>
				<TableHeader>
					<RentalsTableHeader />
				</TableHeader>
				<TableBody>
					{rentals.results.map(item => (
						<TableRow key={item.id}>
							<TableCell className="font-medium">
								<Link href={`/properties/${item.id}`}>{item.name}</Link>
							</TableCell>
							<TableCell>
								<a
									href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
										item.address
									)}`}
									target="_blank"
									rel="noopener noreferrer">
									{item.address}
								</a>
							</TableCell>
							<TableCell>{formatCurrency(item.price)}</TableCell>
							<TableCell>{item.totalNightSum.toFixed()}</TableCell>
							<TableCell>{formatCurrency(item.orderTotalSum)} </TableCell>
							<TableCell className="flex gap-x-2">
								<UpdateBtn id={item.id} />
								<DeleteBtn id={item.id} searchParams={searchParams} />
							</TableCell>
						</TableRow>
					))}
				</TableBody>
				<TableFooter>
					<TableRow>
						<TableCell>Total rentals:</TableCell>
						<TableCell colSpan={5} className="text-left">
							{rentals.totalRental}
						</TableCell>
					</TableRow>
				</TableFooter>
			</Table>
			{/* pagination */}
			{rentals.totalPage > 1 && (
				<div className="mt-8">
					<HomePagination
						href="rentals"
						currentPage={searchParams.get("page") || "1"}
						totalPage={rentals.totalPage}
						totalCount={rentals.totalRental || 0}
					/>
				</div>
			)}
		</section>
	);
}
export default RentalsLists;
