"use client";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useDebouncedCallback } from "use-debounce";

function RentalsSearch({ searchParams }: { searchParams: URLSearchParams }) {
	const [input, setInput] = useState("");
	const handleInputChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
		console.log(evt.target.value);
		setInput(evt.target.value);
	};

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
