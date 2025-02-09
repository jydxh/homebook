import CreateReview from "./CreateReview";
import ReviewLists from "./ReviewLists";
import { Suspense } from "react";
import RentalsListsFallback from "../rentals/RentalsListsFallback";

async function PropertyReviews({
	propertyId,
	showReview,
}: {
	propertyId: string;
	showReview: boolean;
}) {
	return (
		<>
			<div className="mt-8 col-span-3">
				<h3 className="font-semibold text-lg ">Reviews:</h3>
				{/* this component will be conditional rendering later, only when the user login and user has book the property and also this property is not belongs to the user */}
				{showReview && <CreateReview propertyId={propertyId} />}
			</div>
			<div className="mt-4 col-span-3">
				<Suspense fallback={RentalsListsFallback()}>
					<ReviewLists propertyId={propertyId} />
				</Suspense>
			</div>
		</>
	);
}
export default PropertyReviews;
