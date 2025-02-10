import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);
import db from "@/utils/db";
import { formatDate } from "@/utils/formatDate";

export const POST = async (req: NextRequest) => {
	const origin = new Headers(req.headers).get("origin");
	const { bookingId } = await req.json();
	const booking = await db.order.findUnique({
		where: {
			id: bookingId,
			paymentStatus: false,
		},
		include: {
			property: {
				select: {
					name: true,
					image: true,
				},
			},
		},
	});
	console.log("booking:", booking);
	if (!booking) {
		return Response.json(null, { status: 404, statusText: "not found" });
	}
	const {
		checkIn,
		checkOut,
		totalNight,
		orderTotal,
		property: { image, name },
	} = booking;

	try {
		// Create Checkout Sessions from body params.
		const session = await stripe.checkout.sessions.create({
			ui_mode: "embedded",
			metadata: { bookingId: booking.id },
			line_items: [
				{
					price_data: {
						currency: "cad",
						unit_amount: orderTotal * 100,
						product_data: {
							name,
							images: image.map(i => i.imageUrl),
							description: `Booking the property ${name} for ${totalNight} night(s), from ${formatDate(
								{ date: checkIn }
							)} to ${formatDate({ date: checkOut })}`,
						},
					},
					quantity: 1,
				},
			],
			mode: "payment",
			return_url: `${origin}/api/return?session_id={CHECKOUT_SESSION_ID}`,
		});
		console.log("session:", session.client_secret);
		return Response.json({ clientSecret: session.client_secret });
	} catch (err) {
		console.log(err);
		return Response.json(null, {
			status: 500,
			statusText: "interval server error",
		});
	}
};
