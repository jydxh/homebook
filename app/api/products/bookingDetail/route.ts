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

export const POST = async (request: NextRequest) => {
	const orderIDSchema = z.string().uuid();
	const { userId } = getAuth(request);
	if (!userId)
		return NextResponse.json({ msg: "Unauthorized" }, { status: 401 });
	const body = await request.json();
	console.log("body:", body);
	try {
		const validatedOrderId = validateZodSchema(orderIDSchema, body.orderId);

		const order = await db.order.findFirst({
			where: {
				userId,
				id: validatedOrderId,
			},
			select: {
				checkIn: true,
				orderStatus: true,
			},
		});
		if (!order) {
			console.log("no order founded");
			throw new Error("no order found");
		}
		if (order.orderStatus === "CANCELED") {
			console.log("the order is cancelled");
			throw new Error("the order is cancelled");
		}
		/* check if the date is 48 hour before the checkIN */
		const now = new Date();
		const checkInDate = new Date(order.checkIn);
		now.setHours(0, 0, 0, 0);
		checkInDate.setHours(0, 0, 0, 0);
		const timeDiff = now.getTime() - checkInDate.getTime();
		const dayDiff = Math.abs(timeDiff) / (1000 * 60 * 60 * 24);
		if (dayDiff < 2) {
			console.log("cannot cancel the order in 48 hours of checkIn");
			throw new Error("Cannot cancel the order within 48 hours of check-in");
		}

		await db.order.update({
			where: {
				userId,
				id: validatedOrderId,
			},
			data: {
				orderStatus: "CANCELED",
			},
		});
		return NextResponse.json({ msg: "success" }, { status: 200 });
	} catch (error) {
		console.log(error);
		return NextResponse.json({ msg: "internal server error" }, { status: 500 });
	}
};
