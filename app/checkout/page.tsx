"use client";

import { useSearchParams } from "next/navigation";
import React, { useCallback } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Separator } from "@/components/ui/separator";
import {
	EmbeddedCheckoutProvider,
	EmbeddedCheckout,
} from "@stripe/react-stripe-js";
import { useToast } from "@/hooks/use-toast";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const stripePromise = loadStripe(
	process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string
);

function CheckoutPage() {
	const searchParams = useSearchParams();
	const { toast } = useToast();
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
	const handleClick = async (
		evt: React.MouseEvent<HTMLInputElement, MouseEvent>
	) => {
		const value = evt.currentTarget.value;
		try {
			await navigator.clipboard.writeText(value);
			toast({ description: "copied to the clip board" });
		} catch (error) {
			console.log(error);
		}
	};
	return (
		<>
			<Card className="mx-auto w-[300px] md:w-[600px] lg:w-[1080px] text-center mt-4 px-2 py-4 bg-slate-100 dark:bg-stone-900">
				<h3 className="font-medium mb-2">Payment Card Information</h3>
				<div className="mt-2 flex justify-center flex-wrap gap-x-4">
					<div>
						<Label htmlFor="cardNumber">Card Number: </Label>
						<Input
							onClick={evt => handleClick(evt)}
							id="cardNumber"
							type="text"
							defaultValue={"4242 4242 4242 4242"}
							className="ps-2"
						/>
					</div>
					<div>
						<Label htmlFor="MonthYear">Month/Year: </Label>
						<Input
							onClick={evt => handleClick(evt)}
							id="MonthYear"
							type="text"
							defaultValue={"12/32"}
							className="ps-2"
						/>
					</div>
					<div>
						<Label htmlFor="CVC">CVC Number: </Label>
						<Input
							onClick={evt => handleClick(evt)}
							id="CVC"
							type="text"
							defaultValue={"111"}
							className="ps-2"
						/>
					</div>
				</div>
				<p className="mt-4 font-semibold">
					The rest fields can be any dummy data
				</p>
			</Card>
			<Separator className="my-4" />
			<div id="checkout" className="mx-auto mt-10">
				<EmbeddedCheckoutProvider stripe={stripePromise} options={options}>
					<EmbeddedCheckout />
				</EmbeddedCheckoutProvider>
			</div>
		</>
	);
}
export default CheckoutPage;

// the logic for the stripe payment: 1. once user click the booking btn, it will direct to the checkout page, but before rendering the page, it will fetch client secret at the /api/checkout_session, and get the client secret, also it will pass the bookingId to the backend, 2. at the backend api/checkout_session POST method,it will generate the session with all the necessary data for payment, also it will get a return_url where pointing at the api/return route with a session_id;  3. at the api/return route since the return_url is provided, once the front-end finish the payment, it will redirect to this route, and the session can get from the session_id, and then we check the status of the payment, if it is complete, just update the database, and redirect to the /booking
