import { Button } from "@/components/ui/button";
import { LuShare } from "react-icons/lu";

import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { countryList } from "@/utils/country";
import Image from "next/image";

import ShareButtons from "./ShareButtons";
import PropertyRating from "./PropertyRating";

function ShareBtn({
	image,
	name,
	countryCode,
	bedrooms,
	baths,
	guests,
	propertyId,
}: {
	image: string;
	name: string;
	countryCode: string;
	bedrooms: number;
	baths: number;
	guests: number;
	propertyId: string;
}) {
	const countryName =
		countryList.find(country => country.code === countryCode)?.name ||
		"unknown";

	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button
					variant="ghost"
					asChild
					className="hover:scale-110 transition duration-300 ease-in-out">
					<div className="flex items-center gap-2 cursor-pointer">
						<LuShare className="w-4 h-4" />{" "}
						<p className="text-base underline">Share</p>
					</div>
				</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-md">
				<DialogHeader>
					<DialogTitle>Share this experience</DialogTitle>
				</DialogHeader>
				{/* dialog content here */}
				<div className="flex items-center gap-x-4">
					<Image
						src={image}
						alt={name}
						width={70}
						height={70}
						className="rounded object-cover w-[70px] h-[70px]"
					/>

					<div className="flex flex-wrap items-center">
						<span className="font-medium">{name}</span>
						<span>&nbsp; in {countryName} &middot; &nbsp; </span>
						<span className="flex items-center gap-x-1">
							<PropertyRating propertyId={propertyId} /> &middot; &nbsp;
						</span>
						{bedrooms} bedrooms &middot; {guests} guests &middot; {baths} baths
					</div>
				</div>
				{/* share buttons */}
				<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
					<ShareButtons title={name} />
				</div>
				<DialogFooter className="sm:justify-start">
					<DialogClose asChild>
						<Button type="button" variant="secondary">
							Close
						</Button>
					</DialogClose>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
export default ShareBtn;
