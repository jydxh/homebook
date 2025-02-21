import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import {
	checkInByVendor,
	fetchVendorsReservation,
} from "@/utils/actions/PropertyActions";
import EmptyResult from "../EmptyResult";
import { formatDate } from "@/utils/formatDate";

import FormContainer from "../form/FormContainer";
import { SubmitButton } from "../form/Buttons";
import Link from "next/link";
import { formatCurrency } from "@/utils/formatCurrency";
import BookingStatus from "../booking/BookingStatus";
import HomePagination from "../home/HomePagination";

async function ReverseTable({
	searchName,
	page,
}: {
	searchName: string | undefined;
	page: string | undefined;
}) {
	const { reservations, totalCount } = await fetchVendorsReservation({
		page,
		searchName,
	});
	const today = new Date().setHours(0, 0, 0, 0);

	if (totalCount === 0) {
		return (
			<EmptyResult
				buttonText="Back Home"
				href="/"
				text="No body make any reservation in you property yet, don't worry it will coming soon!"
			/>
		);
	}
	const totalPage = Math.ceil(totalCount / 10);

	return (
		<>
			<Table className="px-2 mx-auto">
				<TableCaption>
					A list of the reservation of your properties
				</TableCaption>
				<TableHeader>
					<TableRow>
						<TableHead className="w-[100px]">Customer Name</TableHead>
						<TableHead className="w-[100px]">Property Name</TableHead>
						<TableHead className="w-[200px]">Address</TableHead>
						<TableHead className="w-[50px]">Nights</TableHead>
						<TableHead className="w-[60px]">Total</TableHead>
						<TableHead className="w-[100px]">Check In Date</TableHead>
						<TableHead className="w-[100px]">Status</TableHead>
						<TableHead className="w-[60px]">Check In</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{reservations.map(reserve => {
						const {
							checkIn,
							id,
							orderStatus,
							orderTotal,
							totalNight,
							property: { address, id: propertyId, name },
							user: { firstName, lastName },
						} = reserve;
						const checkInAction = checkInByVendor.bind(null, id);
						const checkInDate = new Date(checkIn).setHours(0, 0, 0, 0);
						/* only if the checkInDate is same as today will show the checkIn btn */
						const showCheckInBtn =
							checkInDate === today && orderStatus === "PENDING";

						return (
							<TableRow key={id}>
								<TableCell className="text-clip">
									{firstName + " " + lastName}
								</TableCell>
								<TableCell className="underline text-clip">
									<Link href={`/properties/${propertyId}`}>{name}</Link>
								</TableCell>
								<TableCell className="text-clip">{address}</TableCell>
								<TableCell>{totalNight}</TableCell>
								<TableCell>{formatCurrency(orderTotal)}</TableCell>
								<TableCell>{formatDate({ date: checkIn })}</TableCell>
								<TableCell>
									<BookingStatus orderStatus={orderStatus} />
								</TableCell>

								<TableCell>
									<FormContainer action={checkInAction}>
										<SubmitButton text="Check In" disabled={!showCheckInBtn} />
									</FormContainer>
								</TableCell>
							</TableRow>
						);
					})}
				</TableBody>
			</Table>
			<HomePagination
				currentPage={page || "1"}
				totalCount={totalCount}
				href="reservations"
				totalPage={totalPage}
			/>
		</>
	);
}
export default ReverseTable;
