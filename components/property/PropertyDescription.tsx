"use client";

import { useState } from "react";
import { Button } from "../ui/button";

const wordLimit = 400;

/*1. when words are over 100 chars => slice the words, and show the show more button => when user click the button, show all the content, and change the ShowMore to showLess  */
/* 2. IF the words are less than 100, just show the whole paragraph, no need to show any button */
function PropertyDescription({ description }: { description: string }) {
	const [isShowMore, setIsShowMore] = useState(false);

	const isMoreChars = description.length > wordLimit;
	return (
		<div className="mt-4">
			<h3 className="font-semibold text-lg">Description:</h3>
			<article className="mt-4">
				{isMoreChars && !isShowMore
					? description.substring(0, wordLimit) + "..."
					: description}
			</article>
			{isMoreChars && (
				<Button
					className="mx-auto block mt-2"
					variant="link"
					onClick={() => setIsShowMore(prev => !prev)}>
					{isShowMore ? "Show Less" : "Show More"}
				</Button>
			)}
		</div>
	);
}
export default PropertyDescription;
