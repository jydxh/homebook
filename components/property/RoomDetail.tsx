import { Suspense } from "react";
import PropertyRating from "./PropertyRating";

function RoomDetail({
	bedrooms,
	baths,
	guests,
	propertyId,
}: {
	bedrooms: number;
	baths: number;
	guests: number;
	propertyId: string;
}) {
	return (
		<article>
			{bedrooms} {bedrooms > 1 ? "bedrooms" : "bedroom"} &middot; {guests}{" "}
			{guests > 1 ? "guests" : "guest"} &middot; {baths}{" "}
			{baths > 1 ? "baths" : "bath"}
			{/* modify the rating later */}
			<div className="flex items-center gap-2">
				Rating:
				<Suspense fallback="...loading">
					<PropertyRating propertyId={propertyId} />
				</Suspense>
			</div>
		</article>
	);
}
export default RoomDetail;
