import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { fetchVendorsReservation } from "@/utils/actions/PropertyActions";
import EmptyResult from "../EmptyResult";
import { formatDate } from "@/utils/formatDate";
import { Button } from "../ui/button";

async function ReverseTable() {
	const reservation = await fetchVendorsReservation();
	if (reservation.length === 0) {
		return (
			<EmptyResult
				buttonText="Back Home"
				href="/"
				text="No body make any reservation in you property yet, don't worry it will coming soon!"
			/>
		);
	}

	return (
		<Table>
			<TableCaption>A list of the reservation of your properties</TableCaption>
			<TableHeader>
				<TableRow>
					<TableHead className="w-[100px]">Property Name</TableHead>
					<TableHead className="w-[100px]">Address</TableHead>
					<TableHead className="w-[100px]">Nights</TableHead>
					<TableHead className="w-[100px]">Total</TableHead>
					<TableHead className="w-[100px]">Check In Date</TableHead>
					<TableHead className="w-[100px]">Status</TableHead>
					<TableHead className="w-[100px]">Check In</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				{reservation.map(reserve => {
					const {
						checkIn,
						id,
						orderStatus,
						orderTotal,
						totalNight,
						property: { address, id: propertyId, name },
					} = reserve;
					return (
						<TableRow key={id}>
							<TableCell>{name}</TableCell>
							<TableCell>{address}</TableCell>
							<TableCell>{totalNight}</TableCell>
							<TableCell>{orderTotal}</TableCell>
							<TableCell>{formatDate({ date: checkIn })}</TableCell>
							<TableCell>{orderStatus}</TableCell>
							<TableCell>
								<Button>Click to Check In</Button>
							</TableCell>
						</TableRow>
					);
				})}
			</TableBody>
		</Table>
	);
}
export default ReverseTable;
