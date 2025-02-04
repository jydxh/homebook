import { Card } from "@/components/ui/card";
import Image from "next/image";
import CountryAndFlag from "@/components/home/CountryAndFlag";
import { TCountryCode } from "countries-list";
import { IoMdStar } from "react-icons/io"; // full
import { IoMdStarOutline } from "react-icons/io"; // outline star
import PropertyRating from "@/components/property/PropertyRating";
import { formatDate } from "@/utils/formatDate";
import { Separator } from "@/components/ui/separator";
import { Label } from "@/components/ui/label";

import ReviewComment from "@/components/property/ReviewComment";
import Link from "next/link";

const starArray = [1, 2, 3, 4, 5];

function ReviewCard({
	propertyId,
	image,
	name,
	country,
	rating,
	comment,
	createAt,
}: {
	propertyId: string;
	image: string;
	name: string;
	country: string;
	rating: number;
	comment: string;
	createAt: Date;
}) {
	return (
		<Card>
			{/* image and title and create at */}
			<Link href={`/properties/${propertyId}`}>
				<div className="flex items-center gap-x-4">
					<div className="relative w-[140px] h-[140px] rounded">
						<Image
							fill
							src={image}
							alt={name}
							className="object-cover rounded"
						/>
					</div>
					<div>
						<p className="font-medium text-lg truncate">{name}</p>
						<div className="flex items-center gap-x-4 flex-wrap">
							<CountryAndFlag country={country as TCountryCode} />
							<PropertyRating propertyId={propertyId} />
						</div>
						<div className="text-muted-foreground">
							{formatDate({ date: createAt })}
						</div>
					</div>
				</div>
			</Link>

			<Separator className="mb-4" />
			{/*rating*/}
			<div className="px-2 flex items-center gap-x-2 mb-2">
				<Label className="text-lg">Rating:</Label>
				<div className="flex items-center justify-start gap-x-1">
					{starArray.map(item => {
						return (
							<>
								{item <= rating ? (
									<IoMdStar className="text-primary w-6 h-6" />
								) : (
									<IoMdStarOutline className="w-6 h-6" />
								)}
							</>
						);
					})}
				</div>
				<p>( {rating} / 5 )</p>
			</div>
			{/* comment */}
			<div className="px-2 pb-2">
				<Label className="text-lg font-medium">Comment: </Label>
				<ReviewComment comments={comment} />
			</div>
		</Card>
	);
}

export default ReviewCard;
