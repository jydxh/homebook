import EmptyResult from "@/components/EmptyResult";
import { Card } from "@/components/ui/card";
import { fetchBookingList } from "@/utils/actions/PropertyActions";
import { formatDate } from "@/utils/formatDate";
import { OrderStatus } from "@prisma/client";

import Image from "next/image";
import Link from "next/link";

async function BookingsPage() {
	const bookings = await fetchBookingList();
	if (bookings.length === 0) {
		return (
			<EmptyResult
				text="You have not book any property yet, why not go back to homepage and find the place you are interested in?"
				buttonText="Back Home"
			/>
		);
	}
	return (
		<section className="p-8 gap-x-8 gap-y-16 grid  md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
			{bookings.map(booking => {
				const {
					orderStatus,
					id,
					property: { image, name },
					checkIn,
					checkOut,
					totalNight,
				} = booking;
				return (
					<BookingCard
						orderStatus={orderStatus}
						key={id}
						id={id}
						name={name}
						src={image[0].imageUrl}
						checkIn={checkIn}
						checkOut={checkOut}
						totalNight={totalNight}
					/>
				);
			})}
		</section>
	);
}
export default BookingsPage;

export const BookingCard = ({
	orderStatus,
	src,
	checkIn,
	checkOut,
	totalNight,
	name,
	id,
}: {
	orderStatus: OrderStatus;
	id: string;
	src: string;
	checkIn: Date;
	checkOut: Date;
	totalNight: number;
	name: string;
}) => {
	return (
		<Link href={`/bookings/${id}`}>
			<Card className="grid sm:grid-cols-3 md:grid-cols-1 hover:scale-105 duration-200">
				<div className="h-[10rem] w-full lg:w-full lg:h-[10rem] sm:h-[9rem] md:h-[10rem] relative rounded-lg overflow-hidden sm:col-span-1 ">
					<Image
						src={src}
						alt="image of the property"
						fill
						className="object-cover"
					/>
				</div>
				<div className="p-2 sm:col-span-2 flex justify-center flex-col items-center">
					<p className="font-semibold text-xl my-2">{name}</p>
					<p>Check in: {formatDate({ date: checkIn })}</p>
					<p>Check out: {formatDate({ date: checkOut })}</p>
					<p>Total night {totalNight} nights</p>
					<p className="flex justify-center gap-x-4 mt-2 items-center">
						Order Status:
						<span
							className={`${
								orderStatus === "CHECKED"
									? "text-green-500 bg-green-300/50"
									: orderStatus === "CANCELED"
									? "text-red-500 bg-red-300/50"
									: orderStatus === "PENDING"
									? "text-yellow-500 bg-yellow-300/40"
									: ""
							}  capitalize font-medium px-2 py-1 rounded-xl`}>
							{orderStatus}
						</span>
					</p>
				</div>
			</Card>
		</Link>
	);
};
