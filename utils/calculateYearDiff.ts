function calculateYearDiff(prevDate: Date) {
	const now = new Date();
	const prev = new Date(prevDate);
	const diff = now.getTime() - prev.getTime();
	const oneYearInSeconds = 365 * 24 * 60 * 60 * 1000;
	const oneMonthInSeconds = 30 * 24 * 60 * 60 * 1000;
	const yearDiff = now.getFullYear() - prev.getFullYear();
	const monthDiff = now.getMonth() - prev.getMonth();
	if (diff > oneYearInSeconds) {
		return yearDiff + (yearDiff > 1 ? " years" : " year");
	} else if (diff < oneMonthInSeconds) {
		return "in 1 month";
	} else {
		return monthDiff + (monthDiff > 1 ? " months" : " month");
	}
}
export default calculateYearDiff;
