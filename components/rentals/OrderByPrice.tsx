import { Button } from "../ui/button";
import { useRouter, useSearchParams } from "next/navigation";

import { FaSortNumericDown } from "react-icons/fa"; // 1-9 asc
import { FaSortNumericUp } from "react-icons/fa"; // 9-1 desc
import { TiArrowUnsorted } from "react-icons/ti";

import { type orderStateType } from "./RentalsTableHeader";

function OrderByPrice({
	order,
	setOrder,
}: {
	order: orderStateType;
	setOrder: React.Dispatch<React.SetStateAction<orderStateType>>;
}) {
	const router = useRouter();
	const searchParams = new URLSearchParams(useSearchParams());
	const handleClick = () => {
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
		<Button size="icon" variant={"ghost"} onClick={handleClick}>
			{order.price === "asc" ? (
				<FaSortNumericDown className="w-4 h-4" />
			) : order.price === "desc" ? (
				<FaSortNumericUp className="w-4 h-4" />
			) : (
				<TiArrowUnsorted className="w-4 h-4" />
			)}
		</Button>
	);
}
export default OrderByPrice;
