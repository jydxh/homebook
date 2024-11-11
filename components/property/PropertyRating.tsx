import { fetchPropertyRating } from "@/utils/actions/PropertyActions";
import { FaStar } from "react-icons/fa6";

async function PropertyRating({ propertyId }: { propertyId: string }) {
	const { rating, count } = await fetchPropertyRating(propertyId);
	return (
		<div className="flex items-center gap-x-2">
			<FaStar className="w-4 h-4" />
			<span>
				{rating}&nbsp;({count})
			</span>
		</div>
	);
}
export default PropertyRating;
