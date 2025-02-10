"use client";

import { useSearchParams } from "next/navigation";
import React, { useCallback } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
	EmbeddedCheckoutProvider,
	EmbeddedCheckout,
} from "@stripe/react-stripe-js";

const stripePromise = loadStripe(
	process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string
);

function CheckoutPage() {
	const searchParams = useSearchParams();
	const bookingId = searchParams.get("bookingId");
	console.log("booingID:", bookingId);
	const fetchClientSecret = useCallback(async () => {
		const response = await fetch("/api/checkout_sessions", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ bookingId }),
		});
		if (!response.ok) {
			console.log("Failed to fetch client secret");
		}

		const data = await response.json();

		return data.clientSecret;
	}, [bookingId]);

	const options = { fetchClientSecret };

	return (
		<div id="checkout">
			<EmbeddedCheckoutProvider stripe={stripePromise} options={options}>
				<EmbeddedCheckout />
			</EmbeddedCheckoutProvider>
		</div>
	);
}
export default CheckoutPage;

// the logic for the stripe payment: 1. once user click the booking btn, it will direct to the checkout page, but before rendering the page, it will fetch client secret at the /api/checkout_session, and get the client secret, also it will pass the bookingId to the backend, 2. at the backend api/checkout_session POST method,it will generate the session with all the necessary data for payment, also it will get a return_url where pointing at the api/return route with a session_id;  3. at the api/return route since the return_url is provided, once the front-end finish the payment, it will redirect to this route, and the session can get from the session_id, and then we check the status of the payment, if it is complete, just update the database, and redirect to the /booking
