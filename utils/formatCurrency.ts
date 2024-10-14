export const formatCurrency = (amount: number) => {
	return new Intl.NumberFormat("en-CA", {
		style: "currency",
		currency: "CAD",
		minimumFractionDigits: 0,
		maximumFractionDigits: 0,
	}).format(amount);
};
