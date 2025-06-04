import { getAuth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import * as z from "zod";
import db from "@/utils/db";
import { validateZodSchema } from "@/utils/zodSchema";

export const GET = async (request: NextRequest) => {
	const { userId } = getAuth(request);
	const bookingIdSchema = z.string().uuid();
	if (!userId)
		return NextResponse.json({ msg: "Unauthorized" }, { status: 401 });
	const orderId = request.nextUrl.searchParams.get("orderId");

	if (!orderId)
		return NextResponse.json({ msg: "Bad request" }, { status: 400 });

	try {
		const validatedBookingId = validateZodSchema(bookingIdSchema, orderId);

		const orderDetail = await db.order.findFirst({
			where: {
				id: validatedBookingId,
				userId,
			},
			select: {
				id: true,
				checkIn: true,
				checkOut: true,
				createdAt: true,
				orderTotal: true,
				paymentStatus: true,
				totalNight: true,
				orderStatus: true,
				property: {
					select: {
						address: true,
						country: true,
						name: true,
						id: true,
						image: { select: { imageUrl: true } },
						price: true,
					},
				},
			},
		});
		return NextResponse.json({ orderDetail }, { status: 200 });
	} catch (error) {
		console.log(error);
		return NextResponse.json({ msg: "internal error" }, { status: 500 });
	}
};
