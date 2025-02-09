export type actionFunction = (
	prevState: unknown,
	formData: FormData
) => Promise<{ message: string }>;

export type Booking = {
	checkIn: Date;
	checkOut: Date;
};

export type DateRangeSelect = {
	startDate: Date;
	endDate: Date;
	key: string;
};
