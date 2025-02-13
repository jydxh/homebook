import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { fetchOrderDetail } from "@/utils/actions/PropertyActions";
import { formatDate } from "@/utils/formatDate";
import { redirect } from "next/navigation";

async function BookingDetailPage({ params }: { params: { id: string } }) {
	const orderDetail = await fetchOrderDetail(params.id);

	if (!orderDetail) {
		redirect("/bookings");
	}
	const {
		checkIn,
		checkOut,
		createdAt,
		orderTotal,
		paymentStatus,
		totalNight,
		id: orderID,
		property: { address, country, id, name, image },
	} = orderDetail;
	return (
		<section className="mt-4 mx-auto px-4">
			<h1 className="font-semibold tracking-wide text-lg">Order Details</h1>
			<Card className="w-[300px] mt-4 mx-auto p-2">
				<p className="text-sm md:text-base mb-2">
					Order ID: {orderID.split("-")[0]}
				</p>
				<p className="text-sm md:text-base mb-2">
					Ordering Date: {formatDate({ date: createdAt })}
				</p>
				<p className="text-sm md:text-base mb-2">
					Payment Status:{" "}
					<span
						className={`${
							paymentStatus
								? "text-green-600 bg-green-200/60 "
								: " text-orange-500 bg-orange-200/60 "
						} font-medium  px-1 py-0.5 rounded `}>
						{paymentStatus ? "success" : "pending"}
					</span>
				</p>
				<Separator className="my-2" />
			</Card>
		</section>
	);
}
export default BookingDetailPage;
