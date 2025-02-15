export const dynamic = "force-dynamic"; // Ensure the page is not statically generated
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

import { fetchOrderDetail } from "@/utils/actions/PropertyActions";
import { getCountryName } from "@/utils/country";
import { formatDate } from "@/utils/formatDate";
import Image from "next/image";
import { formatCurrency } from "@/utils/formatCurrency";

import { redirect } from "next/navigation";
import Link from "next/link";
import CancelBookingBtn from "@/components/booking/CancelBookingBtn";
import { Button } from "@/components/ui/button";

async function BookingDetailPage({ params }: { params: { id: string } }) {
	const orderDetail = await fetchOrderDetail(params.id);

	if (!orderDetail) {
		redirect("/bookings");
	}
	const {
		orderStatus,
		checkIn,
		checkOut,
		createdAt,
		paymentStatus,
		totalNight,
		id: orderID,
		property: { address, country, id, name, image, price },
	} = orderDetail;

	const serviceFee = 200;
	const cleaningFee = 100;
	const now = new Date();
	now.setHours(0, 0, 0, 0);
	const checkInDate = new Date(checkIn);
	checkInDate.setHours(0, 0, 0, 0);
	const timeDiff = now.getTime() - checkInDate.getTime();
	const dayDiff = Math.abs(timeDiff) / (1000 * 60 * 60 * 24);
	const isMoreThanTwoDays = dayDiff >= 2;

	return (
		<section className="mt-4 mx-auto px-4">
			<h1 className="font-semibold tracking-wide text-xl">Order Details</h1>
			<Card className="w-[300px] sm:w-[400px] md:w-[600px] mt-4 mx-auto p-2">
				{/* order ID part */}
				<div>
					<div className="flex gap-x-4 justify-start items-center ">
						<Label>Order ID:</Label>
						<p>{orderID.split("-")[0]}</p>
					</div>
					<div className="flex gap-x-4 justify-start items-center  ">
						<Label>Ordering Date:</Label>
						<p>{formatDate({ date: createdAt })}</p>
					</div>
					<div className="flex gap-x-4 justify-start items-center  mt-2">
						<Label>Payment Status:</Label>
						<p
							className={`${
								paymentStatus
									? "text-green-600 bg-green-200/60 "
									: " text-orange-500 bg-orange-200/60 "
							} font-medium  px-2 py-1 rounded capitalize`}>
							{paymentStatus ? "success" : "pending"}
						</p>
					</div>
					<div className="flex gap-x-4 justify-start items-center  mt-2">
						<Label>Order Status:</Label>
						<p
							className={`${
								orderStatus === "CHECKED"
									? "text-green-600 bg-green-200/60"
									: orderStatus === "CANCELED"
									? "text-red-600 bg-red-200/60"
									: orderStatus === "PENDING"
									? "text-yellow-600 bg-yellow-300/40"
									: ""
							}  font-medium capitalize px-2 py-1 rounded`}>
							{orderStatus.toLowerCase()}
						</p>
					</div>
				</div>

				<Separator className="my-2" />
				{/* order details */}

				<div className="grid md:grid-cols-3 gap-x-4">
					<div className="relative w-full h-[10rem] md:h-full mb-2 md:col-span-1">
						<Image
							src={image[0].imageUrl}
							alt={name}
							fill
							className="object-cover"
						/>
					</div>
					<div className="md:col-span-2">
						<Link
							href={`/properties/${id}`}
							className="flex gap-x-4 justify-start items-center ">
							<Label>Rental name:</Label>
							<p className="">{name}</p>
						</Link>

						<div className="flex gap-x-4 justify-start items-center  ">
							<Label>Rental Address:</Label>
							<p className="">{address}</p>
						</div>
						<div className="flex gap-x-4 justify-start items-center  ">
							<Label>Rental Country:</Label>
							<p className="">{getCountryName(country)}</p>
						</div>
						<div className="flex gap-x-4 justify-start items-center  ">
							<Label>Check In date:</Label>
							<p className="">{formatDate({ date: checkIn })}</p>
						</div>
						<div className="flex gap-x-4 justify-start items-center  ">
							<Label>Check Out date:</Label>
							<p className="">{formatDate({ date: checkOut })}</p>
						</div>
						<div className="flex gap-x-4 justify-start items-center  ">
							<Label>Total night(s):</Label>
							<p className="">{totalNight}</p>
						</div>
					</div>
				</div>
				<Separator className="my-2" />
				{/* order price summary */}
				<div>
					<div>
						<h3 className="font-medium text-2xl">Price details</h3>
						<div className="flex justify-between items-center my-2">
							<p>
								{formatCurrency(price)} CAD x {totalNight}{" "}
								{totalNight > 1 ? "nights" : "night"}
							</p>
							<p>{formatCurrency(price * totalNight)} CAD</p>
						</div>
						<div className="flex justify-between items-center my-2">
							<p className="underline">Cleaning fee</p>
							<p>{formatCurrency(cleaningFee)} CAD</p>
						</div>
						<div className="flex justify-between items-center my-2">
							<p className="underline">Service fee</p>
							<p>{formatCurrency(serviceFee)} CAD</p>
						</div>
						<div className="flex justify-between items-center my-2">
							<p className="underline">Tax</p>
							<p>{formatCurrency(price * totalNight * 0.13)} CAD</p>
						</div>
					</div>
					{/* total summary */}
					<Separator className="my-4" />

					<div className="flex items-center justify-between">
						<p className="text-xl font-medium tracking-wider">
							Total<span className="">(CAD)</span>
						</p>
						<p className="font-medium text-xl">
							{formatCurrency(
								price * totalNight * 1.13 + cleaningFee + serviceFee
							)}{" "}
							CAD
						</p>
					</div>
				</div>
				<Separator className="my-2" />
				{/* cancel booking btn */}
				{/* only when the 48 hours before the checkIn date can cancel the order */}

				<div className="flex w-full justify-end gap-x-4">
					<Link href="/bookings">
						<Button variant={"outline"}>Back to Order Lists</Button>
					</Link>
					{isMoreThanTwoDays && orderStatus === "PENDING" && (
						<CancelBookingBtn orderId={orderID} />
					)}
				</div>
			</Card>
		</section>
	);
}
export default BookingDetailPage;
