import { Button } from "@/components/ui/button";
import { FaStar } from "react-icons/fa6";
import {
	Dialog,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
	DialogClose,
} from "@/components/ui/dialog";
import Image from "next/image";
import { Separator } from "../ui/separator";
import { formatCurrency } from "@/utils/formatCurrency";
import FormContainer from "../form/FormContainer";
import { makeReservation } from "@/utils/actions/PropertyActions";
import Link from "next/link";
import type { BookingState } from "./DatePicker";
import { calculateDaysBetween } from "@/utils/calendar";
import { SubmitButton } from "../form/Buttons";

const serviceFee = 200;
const cleaningFee = 100;

function BookingBtn({
	bookState,
	price,
	rating,
	name,
	image,
	totalReview,
	hasUserProfile,
}: {
	bookState: BookingState;
	price: number;
	rating: string;
	name: string;
	image: string;
	totalReview: number;
	hasUserProfile: boolean;
}) {
	const checkIn = bookState.range?.from || (new Date() as Date);
	const checkOut = bookState.range?.to || (new Date() as Date);
	const makeReservationAction = makeReservation.bind(
		null,
		{},
		{ propertyId: bookState.propertyId, checkIn, checkOut }
	);
	const numberOfNights = calculateDaysBetween({ checkIn, checkOut });

	if (!hasUserProfile)
		return (
			<Link href="/profile/create">
				<Button className="mt-4">Book the Date</Button>
			</Link>
		);
	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button
					className="mt-4"
					disabled={
						!bookState.range || !bookState.range.from || !bookState.range.to
					}>
					Book the Date
				</Button>
			</DialogTrigger>
			<DialogContent
				className="sm:max-w-[425px]"
				aria-description="book the date">
				<DialogHeader>
					<DialogTitle>Book the Date</DialogTitle>
				</DialogHeader>
				<div>
					<div className="flex items-center gap-x-4">
						<div className="relative w-[120px] h-[100px] rounded">
							<Image
								src={image}
								fill
								alt={name}
								className="object-cover rounded"
							/>
						</div>
						{/* name and rating */}
						<div className="flex flex-col items-center">
							<p className="font-medium">{name}</p>
							<p className="flex items-center gap-x-2">
								<FaStar className="w-4 h-4" />
								<span>
									{rating}&nbsp;({totalReview})
								</span>
							</p>
						</div>
					</div>

					{/* price detail */}
					<Separator className="my-4" />
					<div>
						<h3 className="font-medium text-2xl">Price details</h3>
						<div className="flex justify-between items-center my-2">
							<p>
								{formatCurrency(price)} CAD x {numberOfNights}{" "}
								{numberOfNights > 1 ? "nights" : "night"}
							</p>
							<p>{formatCurrency(price * numberOfNights)} CAD</p>
						</div>
						<div className="flex justify-between items-center my-2">
							<p className="underline">Cleaning fee</p>
							<p>{formatCurrency(cleaningFee)} CAD</p>
						</div>
						<div className="flex justify-between items-center my-2">
							<p className="underline">Service fee</p>
							<p>{formatCurrency(serviceFee)} CAD</p>
						</div>
						<div className="flex justify-between items-center my-2">
							<p className="underline">Tax</p>
							<p>{formatCurrency(price * numberOfNights * 0.13)} CAD</p>
						</div>
					</div>
					{/* total summary */}
					<Separator className="my-4" />

					<div className="flex items-center justify-between">
						<p className="text-xl font-medium tracking-wider">
							Total<span className="">(CAD)</span>
						</p>
						<p className="font-medium text-xl">
							{formatCurrency(
								price * numberOfNights * 1.13 + cleaningFee + serviceFee
							)}{" "}
							CAD
						</p>
					</div>
				</div>
				<DialogFooter>
					<DialogClose asChild>
						<Button variant={"ghost"}>Cancel</Button>
					</DialogClose>
					{/* later there will be more logic about the backend and payment api */}
					<FormContainer action={makeReservationAction}>
						<SubmitButton text="Confirm the Reservation" />
					</FormContainer>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
export default BookingBtn;
