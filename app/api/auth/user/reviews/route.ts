import { getAuth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import db from "@/utils/db";

export const GET = async (request: NextRequest) => {
	const { userId } = getAuth(request);
	if (!userId)
		return NextResponse.json({ msg: "Unauthorized" }, { status: 401 });

	try {
		const reviews = await db.review.findMany({
			where: {
				userId,
			},
			include: {
				property: {
					select: {
						name: true,
						image: true,
						country: true,
						id: true,
					},
				},
			},
			orderBy: {
				createAt: "desc",
			},
		});

		return NextResponse.json({ reviews }, { status: 200 });
	} catch (error) {
		console.log(error);
		return NextResponse.json({ msg: "internal server error" }, { status: 500 });
	}
};
