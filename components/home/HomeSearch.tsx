"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { Input } from "../ui/input";
import { ChangeEvent, useEffect, useState } from "react";
import { useDebouncedCallback } from "use-debounce";

function HomeSearch() {
	const searchParams = useSearchParams();
	const router = useRouter();
	const search = searchParams.get("search");
	const newSearchParams = new URLSearchParams(searchParams);

	const [searchContent, setSearchContent] = useState<string>(search || "");

	const debouncedPush = useDebouncedCallback((query: string) => {
		router.replace(`/?${query}`);
	}, 500);

	const handleInputChange = (evt: ChangeEvent<HTMLInputElement>) => {
		const value = evt.target.value;
		setSearchContent(value);
		newSearchParams.delete("page");
		/* the below logic is important, if the input value is empty, just delete the search in the SearchParams*/
		if (value) {
			newSearchParams.set("search", value);
		} else {
			newSearchParams.delete("search");
		}
		debouncedPush(newSearchParams.toString());
	};
	/* cleaning function */
	useEffect(() => {
		if (!searchParams.get("search")) {
			setSearchContent("");
		}
	}, [searchParams]);

	return (
		<Input
			value={searchContent}
			onChange={handleInputChange}
			className="w-[20rem] md:w-[30rem] lg:w-[40rem] mx-auto my-8"
			placeholder="Search for Rentals"
		/>
	);
}
export default HomeSearch;
