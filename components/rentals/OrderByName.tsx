import { Button } from "../ui/button";
import { FaSortAlphaDown } from "react-icons/fa"; // a-z -> asc
import { FaSortAlphaUp } from "react-icons/fa"; // z-a -> desc
import { useSearchParams, useRouter } from "next/navigation";

import { TiArrowUnsorted } from "react-icons/ti";

import { type orderStateType } from "./RentalsTableHeader";

function OrderByName({
	order,
	setOrder,
}: {
	order: orderStateType;
	setOrder: React.Dispatch<React.SetStateAction<orderStateType>>;
}) {
	const searchParams = new URLSearchParams(useSearchParams());
	const router = useRouter();

	const handleClick = () => {
		setOrder(prev => {
			// if prevState.name is asc, then toggle to desc
			if (prev.name === "asc") {
				searchParams.set("name", "desc");
				/* delete the price, since only one order sorting at one time */
				searchParams.delete("price");
				router.replace(`/rentals?${searchParams.toString()}`);
				/* update the state, to make sure UI is matching the URL */
				return { name: "desc", price: null };
			} else if (prev.name === "desc") {
				searchParams.set("name", "asc");
				searchParams.delete("price");
				router.replace(`/rentals?${searchParams.toString()}`);
				return { name: "asc", price: null };
			} else {
				searchParams.set("name", "asc");
				searchParams.delete("price");
				router.replace(`/rentals?${searchParams.toString()}`);
				return { name: "asc", price: null };
			}
		});
	};

	return (
		<Button size="icon" variant={"ghost"} onClick={handleClick}>
			{order.name === "asc" ? (
				<FaSortAlphaDown className="w-4 h-4" />
			) : order.name === "desc" ? (
				<FaSortAlphaUp className="w-4 h-4" />
			) : (
				<TiArrowUnsorted className="w-4 h-4" />
			)}
		</Button>
	);
}
export default OrderByName;
