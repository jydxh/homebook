"use client";

import { formatCurrency } from "@/utils/formatCurrency";
import { Card } from "../ui/card";
import { useState, useEffect, useRef } from "react";
import { useDebouncedCallback } from "use-debounce";
import DatePicker from "./DatePicker";
import { SignInButton, useUser } from "@clerk/nextjs";
import { Button } from "../ui/button";
import { SiFireship } from "react-icons/si";
import { Skeleton } from "../ui/skeleton";

function PropertyReserve({ price }: { price: number }) {
	const [showFirstCard, setShowFirstCard] = useState(true);
	const [showFixedCard, setShowFixedCard] = useState(false);

	const handleScroll = useDebouncedCallback(() => {
		const viewWidth = window.innerWidth;
		if (divRef.current) {
			const divRefBounding = divRef.current.getBoundingClientRect();
			const scrollPosition = window.scrollY;
			if (viewWidth <= 1024) {
				setShowFirstCard(true);
				setShowFixedCard(false);
			} else if (scrollPosition > 565 && divRefBounding.top >= -700) {
				setShowFirstCard(false);
				setShowFixedCard(true);
			} else {
				setShowFirstCard(true);
				setShowFixedCard(false);
			}
		}
	}, 5);
	const handleResize = useDebouncedCallback(() => {
		const viewWidth = window.innerWidth;
		const scrollPosition = window.scrollY;
		if (divRef.current) {
			const divRefBounding = divRef.current.getBoundingClientRect();
			if (viewWidth <= 1024) {
				setShowFirstCard(true);
				setShowFixedCard(false);
			} else {
				/* if viewPort to the divTop is over 700px */
				/* 	if (divRefBounding.top < -700) {
					setShowFirstCard(true);
					setShowFixedCard(false);
				} else {
					setShowFirstCard(false);
					setShowFixedCard(true);
				} */
				if (scrollPosition > 565 && divRefBounding.top >= -700) {
					setShowFirstCard(false);
					setShowFixedCard(true);
				} else {
					setShowFirstCard(true);
					setShowFixedCard(false);
				}
			}
		}
	}, 5);

	useEffect(() => {
		window.addEventListener("scroll", handleScroll);
		window.addEventListener("resize", handleResize);
		return () => {
			window.removeEventListener("scroll", handleScroll);
			window.removeEventListener("resize", handleResize);
		};
	}, [handleScroll, handleResize]);

	const divRef = useRef<HTMLDivElement>(null);
	return (
		<div ref={divRef} className="overflow-hidden">
			<div className={`${showFirstCard ? "block" : "hidden"} `}>
				<ReserverCard price={price} />
			</div>
			<div
				className={`${
					showFixedCard ? "block" : "hidden"
				} fixed top-[4rem] left-0 right-0 mx-auto max-w-[1280px] w-full px-8 grid grid-cols-1 lg:grid-cols-3 gap-x-8 `}>
				<div className="w-full col-span-3 lg:col-span-2" />
				<ReserverCard price={price} />
			</div>
		</div>
	);
}
export default PropertyReserve;

function ReserverCard({
	price,
}: {
	price: number;
	position?: "fixed" | "relative";
}) {
	const { isSignedIn, isLoaded } = useUser();
	return (
		<Card className="mt-8 p-4">
			<h4 className="font-bold text-3xl text-primary animate-scale flex items-center gap-x-4">
				<SiFireship /> <span>Booking now</span>
			</h4>
			<p className="mt-4 font-semibold text-2xl">
				{formatCurrency(price)} per night
			</p>
			<p className="mt-4">Pick up a date range</p>
			<div className="mt-4">
				<DatePicker className="w-full" />
			</div>
			{!isLoaded ? (
				<Skeleton className="mt-4 w-[8rem] h-[2.4rem]" />
			) : isSignedIn ? (
				<Button className="mt-4">Book the Date</Button>
			) : (
				<SignInButton>
					<Button className="mt-4">SignIn to Book</Button>
				</SignInButton>
			)}
		</Card>
	);
}
