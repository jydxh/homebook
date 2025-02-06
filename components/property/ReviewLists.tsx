import { fetchPropertyReviews } from "@/utils/actions/PropertyActions";
import { Card } from "../ui/card";
import Image from "next/image";

import { IoMdStar } from "react-icons/io"; // full
import { IoMdStarOutline } from "react-icons/io"; // outline star
import { formatDate } from "@/utils/formatDate";
import ReviewComment from "./ReviewComment";
import { countryList } from "@/utils/country";
import { TCountryCode } from "countries-list";
import fetchUserInfo from "@/utils/fetchUserInfo";
import userDefaultImageUrl from "@/utils/userDefaultImageUrl";
async function ReviewLists({ propertyId }: { propertyId: string }) {
	const reviews = await fetchPropertyReviews(propertyId);

	if (reviews.length === 0) {
		return <div> no review yet</div>;
	} else {
		return (
			<div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
				{reviews.map(async review => {
					const {
						comment,
						createAt,
						id,
						rating,
						user: { profileImage, firstName, city, country },
					} = review;
					let profileImageFromClerk: string | undefined;
					if (!profileImage) {
						const reviewerClerkInfo = await fetchUserInfo(review.user.clerkId);
						profileImageFromClerk = reviewerClerkInfo?.image_url;
					}

					const ratingStars: number[] = [];
					for (let i = 0; i < 5; i++) {
						if (i < rating) {
							ratingStars.push(1);
						} else {
							ratingStars.push(0);
						}
					}

					return (
						<Card key={id} className="p-8">
							{/* header */}
							<div className="flex justify-start items-center gap-x-4">
								<Image
									src={
										profileImage || profileImageFromClerk || userDefaultImageUrl
									}
									alt={firstName}
									className="rounded-full w-[60px] h-[60px]"
									width={60}
									height={60}
								/>
								<div className="flex flex-col gap-0">
									<p className="font-medium">{firstName}</p>
									<p className="text-muted-foreground">
										{city || "unknown"},{" "}
										{countryList.find(
											item => item.code === (country as TCountryCode)
										)?.name || "unknown"}
									</p>
								</div>
							</div>
							{/* rating and createAt */}
							<div className="mt-2 flex gap-0 items-center">
								{/* rating */}
								<span className="flex gap-x-0">
									{ratingStars.map((item, index) => {
										if (item === 1)
											return (
												<IoMdStar
													key={index}
													className="w-5 h-5 text-primary"
												/>
											);
										else
											return (
												<IoMdStarOutline
													key={index}
													className="w-5 h-5 text-primary"
												/>
											);
									})}
								</span>
								<span>&middot;</span>
								<span>{formatDate({ date: createAt, withoutDay: true })}</span>
							</div>
							{/* comments */}
							<ReviewComment comments={comment} />
						</Card>
					);
				})}
			</div>
		);
	}
}
export default ReviewLists;
