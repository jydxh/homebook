"use client";

import { useState } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { IoMdStar } from "react-icons/io"; // full
import { IoMdStarOutline } from "react-icons/io"; // outline star
const starArray = [1, 2, 3, 4, 5];
function ReviewRating() {
	const [rating, setRating] = useState(5);

	return (
		<div className="w-full flex  items-center gap-x-2 mb-2 ">
			<Label className="block" htmlFor="rating">
				Rating:
			</Label>
			<div className="flex items-center justify-start gap-x-1">
				{starArray.map((item, index) => {
					return (
						<Button
							onClick={() => {
								setRating(item);
							}}
							className="w-5 h-5 hover:text-primary"
							asChild
							size="icon"
							variant="ghost"
							key={item}>
							{index < rating ? (
								<IoMdStar className="text-primary" />
							) : (
								<IoMdStarOutline />
							)}
						</Button>
					);
				})}
			</div>
			<p>( {rating} / 5 )</p>
			<Input type="hidden" name="rating" value={rating} />
		</div>
	);
}
export default ReviewRating;
