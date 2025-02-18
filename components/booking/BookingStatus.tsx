import { OrderStatus } from "@prisma/client";

function BookingStatus({ orderStatus }: { orderStatus: OrderStatus }) {
	return (
		<span
			className={`${
				orderStatus === "CHECKED"
					? "text-green-500 bg-green-300/50"
					: orderStatus === "CANCELED"
					? "text-red-500 bg-red-300/50"
					: orderStatus === "PENDING"
					? "text-yellow-500 bg-yellow-300/40"
					: ""
			}  capitalize font-medium p-2 rounded-xl`}>
			{orderStatus.toLowerCase()}
		</span>
	);
}
export default BookingStatus;
