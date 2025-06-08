import { getAuth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import db from "@/utils/db";
import { reviewZodSchema, validateZodSchema } from "@/utils/zodSchema";
import sanitizeHtml from "sanitize-html";

export const POST = async (request: NextRequest) => {
	try {
		const { userId } = getAuth(request);
		if (!userId)
			return NextResponse.json({ msg: "unauthorized" }, { status: 400 });
		const body = (await request.json()) as {
			rating: number | undefined;
			comment: string | undefined;
			productId: string | undefined;
		};

		if (!body.comment || !body.productId || !body.rating)
			return NextResponse.json(
				{ msg: "please provide valid params" },
				{ status: 400 }
			);
		console.log(body);
		const { comment, productId, rating } = body;
		// const madeReview = await findExistingReview(userId,  productId|| "N/A");
		//   if (madeReview) {
		//     throw Error("this user cannot make review!");
		//   }

		const validatedFields = validateZodSchema(reviewZodSchema, {
			rating,
			comment,
			propertyId: productId,
		});
		const commentSanitized = sanitizeHtml(validatedFields.comment);

		await db.review.create({
			data: {
				...validatedFields,
				comment: commentSanitized,
				userId,
			},
		});
		return NextResponse.json({ msg: "created the review" }, { status: 200 });
	} catch (error) {
		console.log(error);
		return NextResponse.json({ msg: "internal error" }, { status: 500 });
	}
};

export const GET = async (request: NextRequest) => {
	const productId = request.nextUrl.searchParams.get("productId");

	if (!productId)
		return NextResponse.json(
			{ msg: "please provide correct params" },
			{ status: 400 }
		);

	try {
		const reviews = await db.review.findMany({
			where: {
				propertyId: productId,
			},
			select: {
				comment: true,
				id: true,
				createAt: true,
				rating: true,
				propertyId: true,
				user: {
					select: {
						firstName: true,
						profileImage: true,
						city: true,
						country: true,
					},
				},
			},
			orderBy: {
				createAt: "desc",
			},
		});
		return NextResponse.json({ reviews });
	} catch (error) {
		console.log(error);
		return NextResponse.json({ msg: "internal server error" }, { status: 500 });
	}
};
