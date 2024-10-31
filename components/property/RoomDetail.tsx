import { FaStar } from "react-icons/fa6";

function RoomDetail({
	bedrooms,
	baths,
	guests,
}: {
	bedrooms: number;
	baths: number;
	guests: number;
}) {
	return (
		<article>
			{bedrooms} {bedrooms > 1 ? "bedrooms" : "bedroom"} &middot; {guests}{" "}
			{guests > 1 ? "guests" : "guest"} &middot; {baths}{" "}
			{baths > 1 ? "baths" : "bath"}
			{/* modify the rating later */}
			<p className="flex items-center gap-2">
				Rating: 5.0 / 3 <FaStar className="w-5 h-5" />
			</p>
		</article>
	);
}
export default RoomDetail;
