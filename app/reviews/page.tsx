export const dynamic = "force-dynamic"; // Ensure the page is not statically generated
import ReviewList from "@/components/reviews/ReviewList";
import { Suspense } from "react";
import PropertyListFallBack from "@/components/fallback/PropertyListFallBack";

async function ReviewsPage() {
	return (
		<section>
			<h1 className="w-full my-8 mx-auto text-center text-3xl font-medium">
				Lists of your reviews
			</h1>
			<Suspense fallback={<PropertyListFallBack />}>
				<ReviewList />
			</Suspense>
		</section>
	);
}
export default ReviewsPage;
