"use client";
import { Input } from "@/components/ui/input";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useDebouncedCallback } from "use-debounce";

function RentalsSearch() {
	/* since this is client component we can use the useSearchParams hook to get the searchParams */
	const params = useSearchParams();
	const searchParams = new URLSearchParams(params);
	const query = searchParams.get("query") || "";
	const [input, setInput] = useState(query);
	const { replace } = useRouter();
	const debouncedPush = useDebouncedCallback((queryString: string) => {
		replace(`/rentals?${queryString}`);
	}, 400);

	const handleInputChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
		setInput(evt.target.value);
		/* each time search a new item, start from the first page, so delete the page key */
		searchParams.delete("page");
		if (evt.target.value) {
			//console.log(evt.target.value);
			searchParams.set("query", evt.target.value);
		} else {
			searchParams.delete("query");
		}

		debouncedPush(searchParams.toString());
	};

	useEffect(() => {
		if (!params.get("query")) {
			setInput("");
		}
	}, [params]);

	return (
		<div className="w-full mt-8 flex items-center justify-center px-4">
			<Input
				value={input}
				onChange={handleInputChange}
				className="w-full md:w-[75%] lg:w-[50%]"
				placeholder="Search your rental by property name"
			/>
		</div>
	);
}
export default RentalsSearch;
