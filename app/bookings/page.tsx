export const dynamic = "force-dynamic"; // Ensure the page is not statically generated

import EmptyResult from "@/components/EmptyResult";

import { fetchBookingList } from "@/utils/actions/PropertyActions";
import { BookingCard } from "@/components/booking/BookingCard";

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
