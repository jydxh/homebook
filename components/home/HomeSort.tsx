"use client";
import { Button } from "../ui/button";

import { LuArrowUpDown } from "react-icons/lu";
import { useRouter, useSearchParams } from "next/navigation";

function HomeSort() {
	const router = useRouter();
	const searchParams = useSearchParams();
	const params = new URLSearchParams(searchParams);
	const priceSort = params.get("price") || "desc";
	const ratingSort = params.get("rating") || "desc";
	const handlePriceSort = () => {
		if (priceSort === "asc") {
			params.set("price", "desc");
		} else {
			params.set("price", "asc");
		}
		router.push(`/?${params.toString()}`);
	};
	const handleRatingSort = () => {
		if (ratingSort === "asc") {
			params.set("rating", "desc");
		} else {
			params.set("rating", "asc");
		}
		router.push(`/?${params.toString()}`);
	};
	return (
		<>
			<div className="flex items-center justify-center gap-x-4">
				<h4 className="font-semibold cursor-default  text-center">Sort by</h4>
				<SortButton label="Price" onClick={handlePriceSort} />
				<SortButton label="Rating" onClick={handleRatingSort} />
			</div>
		</>
	);
}
export default HomeSort;

const SortButton = ({
	label,
	onClick,
}: {
	label: string;
	onClick: () => void;
}) => {
	return (
		<Button
			onClick={onClick}
			size="sm"
			variant="ghost"
			asChild
			className="cursor-pointer">
			<div className="flex justify-between gap-2">
				<p>{label}</p> <LuArrowUpDown className="w-3 h-3" />
			</div>
		</Button>
	);
};
