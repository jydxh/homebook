import Image from "next/image";
import Link from "next/link";
import { formatDate } from "@/utils/formatDate";
import { OrderStatus } from "@prisma/client";
import { Card } from "@/components/ui/card";
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
							{orderStatus.toLowerCase()}
						</span>
					</p>
				</div>
			</Card>
		</Link>
	);
};
