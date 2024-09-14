import { NextRequest, NextResponse } from "next/server";

import fetchAllProducts from "@/utils/actions/fetchAllProducts";

export const GET = async (req: NextRequest) => {
	const { searchParams } = new URL(req.url);

	const categoryId = searchParams.get("category") || "";

	try {
		const properties = await fetchAllProducts({ categoryId });
		return NextResponse.json({ properties }, { status: 200 });
	} catch (error) {
		console.log(error);
		return NextResponse.json(
			{ msg: "bad request", result: [] },
			{ status: 500 }
		);
	}
};
