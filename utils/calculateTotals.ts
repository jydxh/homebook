import { calculateDaysBetween } from "./calendar";
type BookingDetails = {
	checkIn: Date;
	checkOut: Date;
	price: number;
};

export const calculateTotals = ({
	checkIn,
	checkOut,
	price,
}: BookingDetails) => {
	const totalNights = calculateDaysBetween({ checkIn, checkOut });
	const subTotal = totalNights * price;
	const cleaning = 100;
	const service = 200;
	const tax = subTotal * 0.13;
	const orderTotal = subTotal + cleaning + service + tax;
	return {
		totalNights,
		subTotal,
		cleaning,
		service,
		tax,
		orderTotal,
	};
};
