import Stripe from "stripe";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

import { redirect } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";

import db from "@/utils/db";

export const GET = async (req: NextRequest) => {
	const { searchParams } = new URL(req.url);
	const session_id = searchParams.get("session_id") as string;
	console.log("session_id:", session_id);
	try {
		const session = await stripe.checkout.sessions.retrieve(session_id);
		console.log("session:", session);
		const bookingId = session.metadata?.bookingId;
		if (session.status !== "complete" || !bookingId) {
			throw new Error("Internal server error!");
		}
		// only after the return session.status is complete, will update the db
		await db.order.update({
			where: {
				id: bookingId,
			},
			data: {
				paymentStatus: true,
			},
		});
	} catch (error) {
		console.log(error);
		return NextResponse.json(null, {
			status: 500,
			statusText: "Internal server error, please try again!",
		});
	}
	redirect("/bookings");
};
