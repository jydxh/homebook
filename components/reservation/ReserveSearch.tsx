"use client";
import { useSearchParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useDebouncedCallback } from "use-debounce";
import { Input } from "../ui/input";

function ReserveSearch() {
	/* since this is client component we can use the useSearchParams hook to get the searchParams */
	const params = useSearchParams();
	const searchParams = new URLSearchParams(params);
	const query = searchParams.get("searchName") || "";
	const [input, setInput] = useState(query);
	const { replace } = useRouter();
	const debouncedPush = useDebouncedCallback((queryString: string) => {
		replace(`/reservations?${queryString}`);
	}, 400);

	const handleInputChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
		setInput(evt.target.value);
		/* each time search a new item, start from the first page, so delete the page key */
		searchParams.delete("page");
		if (evt.target.value) {
			//console.log(evt.target.value);
			searchParams.set("searchName", evt.target.value);
		} else {
			searchParams.delete("searchName");
		}

		debouncedPush(searchParams.toString());
	};

	useEffect(() => {
		if (!params.get("searchName")) {
			setInput("");
		}
	}, [params]);

	return (
		<div className="w-full mt-8 flex items-center justify-center px-4">
			<Input
				value={input}
				onChange={handleInputChange}
				className="w-full md:w-[75%] lg:w-[50%]"
				placeholder="Search customer order by first name or last name"
			/>
		</div>
	);
}

export default ReserveSearch;
