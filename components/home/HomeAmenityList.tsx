"use client";
import { amenities } from "@/utils/amenities";
import { Checkbox } from "../ui/checkbox";
import { Label } from "../ui/label";
import { useState } from "react";
import { Button } from "../ui/button";
function HomeAmenityList() {
	const [showList, setShowList] = useState(false);

	return (
		<div className="w-full mx-auto pb-8">
			<Button
				className="block mx-auto"
				variant="outline"
				onClick={() => {
					setShowList(prev => !prev);
				}}>
				More Options
			</Button>
			{showList && (
				<div className=" max-w-[900px] mx-auto px-8 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-16 gap-y-2 mt-8">
					<input type="hidden" name="amenities" />
					{amenities.map(item => {
						return (
							<div
								key={item.name}
								className="flex justify-start  sm:justify-start gap-x-2  items-center">
								<Checkbox id={item.name} />
								<Label
									className="flex justify-start gap-x-2 items-center"
									htmlFor={item.name}>
									{item.name}
									<item.icon className="w-4 h-4  text-muted-foreground" />
								</Label>
							</div>
						);
					})}
				</div>
			)}
		</div>
	);
}
export default HomeAmenityList;
