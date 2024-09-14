"use server";
import db from "@/utils/db";

async function fetchAllProducts({ categoryId }: { categoryId: string }) {
	const products = await db.property.findMany({
		where: {
			categoryId,
		},
		orderBy: {
			createdAt: "desc",
		},
	});
	return products;
}
export default fetchAllProducts;
