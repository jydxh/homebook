import { NextRequest, NextResponse } from "next/server";
import db from "@/utils/db";

export const GET = async (req: NextRequest) => {
	//console.log(req);
	const { searchParams } = new URL(req.url);
	//console.log(req);
	const category = searchParams.get("category") || "";
	//	console.log("category:", category);
	try {
		const properties = await db.property.findMany({
			where: {
				category: {
					id: category,
				},
			},
			orderBy: {
				createdAt: "desc",
			},
		});
		return NextResponse.json({ properties }, { status: 200 });
	} catch (error) {
		console.log(error);
		return Response.json({ msg: "bad request", result: [] });
	}
};
