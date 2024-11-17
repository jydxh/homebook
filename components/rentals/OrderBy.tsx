import { Button } from "../ui/button";
import { FaSortAlphaDown } from "react-icons/fa"; // a-z -> asc
import { FaSortAlphaUp } from "react-icons/fa"; // z-a -> desc
import { FaSortNumericDown } from "react-icons/fa"; // 1-9 asc
import { FaSortNumericUp } from "react-icons/fa"; // 9-1 desc
import { useSearchParams, useRouter } from "next/navigation";

import { TiArrowUnsorted } from "react-icons/ti";

import { type orderStateType } from "./RentalsTableHeader";

function OrderBy({
	order,
	setOrder,
	mode,
}: {
	order: orderStateType;
	setOrder: React.Dispatch<React.SetStateAction<orderStateType>>;
	mode: "name" | "price";
}) {
	const searchParams = new URLSearchParams(useSearchParams());
	const router = useRouter();

	const handleClickName = () => {
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

	const handleClickPrice = () => {
		setOrder(prev => {
			if (prev.price === "asc") {
				searchParams.set("price", "desc");
				searchParams.delete("name");
				router.replace(`/rentals?${searchParams.toString()}`);
				return { name: null, price: "desc" };
			} else if (prev.price === "desc") {
				searchParams.set("price", "asc");
				searchParams.delete("name");
				router.replace(`/rentals?${searchParams.toString()}`);
				return { name: null, price: "asc" };
			} else {
				searchParams.set("price", "desc");
				searchParams.delete("name");
				router.replace(`/rentals?${searchParams.toString()}`);
				return { name: null, price: "desc" };
			}
		});
	};

	return (
		<>
			{mode === "name" && (
				<Button size="icon" variant={"ghost"} onClick={handleClickName}>
					{order.name === "asc" ? (
						<FaSortAlphaDown className="w-4 h-4" />
					) : order.name === "desc" ? (
						<FaSortAlphaUp className="w-4 h-4" />
					) : (
						<TiArrowUnsorted className="w-4 h-4" />
					)}
				</Button>
			)}
			{mode === "price" && (
				<Button size="icon" variant={"ghost"} onClick={handleClickPrice}>
					{order.price === "asc" ? (
						<FaSortNumericDown className="w-4 h-4" />
					) : order.price === "desc" ? (
						<FaSortNumericUp className="w-4 h-4" />
					) : (
						<TiArrowUnsorted className="w-4 h-4" />
					)}
				</Button>
			)}
		</>
	);
}
export default OrderBy;
