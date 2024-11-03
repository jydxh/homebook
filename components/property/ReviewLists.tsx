import { fetchPropertyReviews } from "@/utils/actions/PropertyActions";
import { Card } from "../ui/card";
import Image from "next/image";
async function ReviewLists({ propertyId }: { propertyId: string }) {
	const reviews = await fetchPropertyReviews(propertyId);
	if (reviews.length === 0) {
		return <div> no review yet</div>;
	}
	return (
		<div className=" grid grid-cols-1 md:grid-cols-2 md:gap-8">
			{reviews.map(review => {
				const {
					comment,
					createAt,
					id,
					rating,
					user: { profileImage, firstName, city, country },
				} = review;
				return (
					<Card key={id} className="p-8">
						{/* header */}
						<div className="flex justify-start items-center gap-x-4">
							<Image
								src={profileImage!}
								alt={firstName}
								className="rounded-full w-[60px] h-[60px]"
								width={60}
								height={60}
							/>
							<div className="flex flex-col gap-0">
								<p className="font-medium">{firstName}</p>
								<p className="text-muted-foreground">
									{city}, {country}
								</p>
							</div>
						</div>
						{/* rating and createAt */}
						<div className=""> </div>
					</Card>
				);
			})}
			<Card></Card>
		</div>
	);
}
export default ReviewLists;
