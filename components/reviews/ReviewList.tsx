import { fetchReviewsByUser } from "@/utils/actions/PropertyActions";
import EmptyResult from "../EmptyResult";
import ReviewCard from "./ReviewCard";

async function ReviewList() {
	const reviews = await fetchReviewsByUser();
	if (reviews.length === 0) {
		return (
			<EmptyResult
				text="You did not add any review yet"
				buttonText="Back to Home"
			/>
		);
	}
	return (
		<ul className="px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
			{reviews.map(review => {
				const {
					id,
					comment,
					createAt,
					rating,
					property: { country, id: propertyId, image, name },
				} = review;

				const imageStringOfArr = image;

				return (
					<li key={id}>
						<ReviewCard
							comment={comment}
							country={country}
							createAt={createAt}
							rating={rating}
							propertyId={propertyId}
							image={imageStringOfArr[0].imageUrl}
							name={name}
						/>
					</li>
				);
			})}
		</ul>
	);
}
export default ReviewList;
