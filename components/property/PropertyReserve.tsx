"use client";

import { formatCurrency } from "@/utils/formatCurrency";
import { Card } from "../ui/card";
import { useState, useEffect, useRef } from "react";
import { useDebouncedCallback } from "use-debounce";
import DatePicker, { BookingState } from "./DatePicker";
import { useUser } from "@clerk/nextjs";
import { SiFireship } from "react-icons/si";
import { Skeleton } from "../ui/skeleton";
import BookingBtn from "./BookingBtn";
import UserLoginBtn from "../home/UserLoginBtn";
import { Booking } from "@/utils/types";

function PropertyReserve({
	bookings,
	propertyId,
	hasUserProfile,
	price,
	rating,
	name,
	image,
	totalReview,
}: {
	bookings: Booking[];
	propertyId: string;
	hasUserProfile: boolean;
	price: number;
	rating: string;
	name: string;
	image: string;
	totalReview: number;
}) {
	const [showFirstCard, setShowFirstCard] = useState(true);
	const [showFixedCard, setShowFixedCard] = useState(false);
	const [showLastCard, setShowLastCard] = useState(false);
	const divRef = useRef<HTMLDivElement>(null);

	const divHeight = useRef<number>(0);

	const handleScroll = useDebouncedCallback(() => {
		const viewWidth = window.innerWidth;

		if (divRef.current) {
			const divRefBounding = divRef.current.getBoundingClientRect();
			const scrollPosition = window.scrollY;
			const divRefHeight = divRefBounding.height;
			divHeight.current = divRefHeight;

			if (viewWidth <= 1024) {
				setShowFirstCard(true);
				setShowFixedCard(false);
				setShowLastCard(false);
			} else if (scrollPosition > 565 && divRefBounding.bottom >= 420) {
				setShowFirstCard(false);
				setShowFixedCard(true);
				setShowLastCard(false);
			} else if (divRefBounding.bottom < 420) {
				setShowFirstCard(false);
				setShowFixedCard(false);
				setShowLastCard(true);
			} else {
				setShowFirstCard(true);
				setShowFixedCard(false);
				setShowLastCard(false);
			}
		}
	}, 100);
	const handleResize = useDebouncedCallback(() => {
		const viewWidth = window.innerWidth;
		const scrollPosition = window.scrollY;
		if (divRef.current) {
			const divRefBounding = divRef.current.getBoundingClientRect();
			if (viewWidth <= 1024) {
				setShowFirstCard(true);
				setShowFixedCard(false);
				setShowLastCard(false);
			} else {
				if (scrollPosition > 565 && divRefBounding.bottom >= 420) {
					setShowFirstCard(false);
					setShowFixedCard(true);
					setShowLastCard(false);
				} else if (divRefBounding.bottom < 420) {
					setShowFirstCard(false);
					setShowFixedCard(false);
					setShowLastCard(true);
				} else {
					setShowFirstCard(true);
					setShowFixedCard(false);
					setShowLastCard(false);
				}
			}
		}
	}, 100);

	useEffect(() => {
		window.addEventListener("scroll", handleScroll);
		window.addEventListener("resize", handleResize);
		return () => {
			window.removeEventListener("scroll", handleScroll);
			window.removeEventListener("resize", handleResize);
		};
	}, [handleScroll, handleResize]);

	return (
		<div ref={divRef} className="col-span-3 lg:col-span-1">
			<div className={`${showFirstCard ? "block" : "hidden"} `}>
				<ReserverCard
					bookings={bookings}
					propertyId={propertyId}
					hasUserProfile={hasUserProfile}
					price={price}
					image={image}
					rating={rating}
					name={name}
					totalReview={totalReview}
				/>
			</div>
			<div
				className={`fixed top-[4rem] left-0 right-0 mx-auto max-w-[1280px] w-full px-8 hidden  gap-x-8 ${
					showFixedCard ? " lg:grid lg:grid-cols-3" : " hidden"
				}`}>
				<div className="w-full col-span-3 lg:col-span-2" />
				<ReserverCard
					bookings={bookings}
					propertyId={propertyId}
					hasUserProfile={hasUserProfile}
					price={price}
					image={image}
					rating={rating}
					name={name}
					totalReview={totalReview}
				/>
			</div>
			<div
				className={`${showLastCard ? "block" : "hidden"} relative`}
				style={{ top: `${divHeight.current - 292}px` }}>
				<ReserverCard
					bookings={bookings}
					propertyId={propertyId}
					hasUserProfile={hasUserProfile}
					price={price}
					image={image}
					rating={rating}
					name={name}
					totalReview={totalReview}
				/>
			</div>
		</div>
	);
}
export default PropertyReserve;

function ReserverCard({
	bookings,
	propertyId,
	price,
	rating,
	name,
	image,
	totalReview,
	hasUserProfile,
}: {
	bookings: Booking[];
	propertyId: string;
	price: number;
	rating: string;
	name: string;
	image: string;
	totalReview: number;
	hasUserProfile: boolean;
}) {
	const { isSignedIn, isLoaded } = useUser();
	const initialBookingState = {
		propertyId,
		bookings,
		range: undefined,
	};
	const [bookState, setBookingState] =
		useState<BookingState>(initialBookingState);
	return (
		<Card className="mt-8 py-4 px-8 lg:px-4 ">
			<h4 className="font-bold text-3xl text-primary animate-scale flex items-center gap-x-4">
				<SiFireship />
				<span>Booking now</span>
			</h4>
			<p className="mt-4 font-semibold text-2xl">
				{formatCurrency(price)} per night
			</p>
			<p className="mt-4">Pick up a date range</p>
			<div className="mt-4">
				<DatePicker
					className="w-full"
					bookState={bookState}
					setBookingState={setBookingState}
				/>
			</div>
			{!isLoaded ? (
				<Skeleton className="mt-4 w-[8rem] h-[2.4rem]" />
			) : isSignedIn ? (
				/* the numberOfNights is hard code so far, later it will get from the date picker, and adding more logic at that component */
				<BookingBtn
					bookState={bookState}
					hasUserProfile={hasUserProfile}
					image={image}
					rating={rating}
					name={name}
					price={price}
					totalReview={totalReview}
				/>
			) : (
				/* 	<SignInButton mode="modal">
					<Button className="mt-4">SignIn to Book</Button>
				</SignInButton> */
				<UserLoginBtn location="atBooking" />
			)}
		</Card>
	);
}
