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
			<p className="flex items-center gap-2">
				Rating: <PropertyRating propertyId={propertyId} />
			</p>
		</article>
	);
}
export default RoomDetail;
