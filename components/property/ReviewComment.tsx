"use client";

import { useState } from "react";
import { Button } from "../ui/button";

const wordLimit = 200;
function ReviewComment({ comments }: { comments: string }) {
	const [isShowMore, setIsShowMore] = useState(false);

	const isMoreChars = comments.length > wordLimit;
	return (
		<div>
			<article className="mt-4 text-muted-foreground tracking-wide break-words">
				{isMoreChars && !isShowMore
					? comments.substring(0, wordLimit) + "..."
					: comments}
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
export default ReviewComment;
