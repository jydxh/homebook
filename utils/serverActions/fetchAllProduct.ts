"use server";

import fetchAllProductsActions from "../actions/fetchAllProducts";

export const fetchAllProducts = async ({
	categoryId,
}: {
	categoryId: string;
}) => {
	try {
		const products = await fetchAllProductsActions({ categoryId });
		return products;
	} catch (error) {
		console.log(error);
	}
};
