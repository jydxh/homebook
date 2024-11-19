import { currentUser } from "@clerk/nextjs/server";
import CreateReview from "./CreateReview";
import ReviewLists from "./ReviewLists";

async function PropertyReviews({ propertyId }: { propertyId: string }) {
	const user = await currentUser();
	const renderLeaveReview = user;
	return (
		<>
			<div className="mt-8 col-span-3">
				<h3 className="font-semibold text-lg ">Reviews:</h3>
				{/* this component will be conditional rendering later, only when the user login and user has book the property and also this property is not belongs to the user */}
				{renderLeaveReview && <CreateReview propertyId={propertyId} />}
			</div>
			<div className="mt-4 col-span-3">
				<ReviewLists propertyId={propertyId} />
			</div>
		</>
	);
}
export default PropertyReviews;
