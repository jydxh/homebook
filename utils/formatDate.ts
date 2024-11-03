export const formatDate = ({
	date,
	withoutDay = false,
}: {
	date: Date;
	withoutDay?: boolean;
}) => {
	const options: Intl.DateTimeFormatOptions = {
		year: "numeric",
		month: "long",
		...(withoutDay ? {} : { day: "numeric" }),
	};
	return new Date(date).toLocaleDateString("en-CA", options);
};
