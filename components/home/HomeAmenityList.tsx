"use client";
import { amenities } from "@/utils/amenities";
import { Checkbox } from "../ui/checkbox";
import { Label } from "../ui/label";
import { useState } from "react";
import { Button } from "../ui/button";
import Link from "next/link";

import { useRouter, useSearchParams } from "next/navigation";
function HomeAmenityList() {
	const [showList, setShowList] = useState(false);
	const searchParams = useSearchParams();
	const router = useRouter();
	const params = new URLSearchParams(searchParams);
	const ameSearchParams = params.get("amenities");
	const handleAmenitiesChange = (id: string) => {
		console.log(id);
		let selectedAmeArray = ameSearchParams?.split(",") || [];
		const indexOfId = selectedAmeArray.indexOf(id);
		if (indexOfId > -1) {
			// if the id existed in the list, delete this id
			selectedAmeArray.splice(indexOfId, 1);
		} else {
			// if not exist push into the list
			selectedAmeArray = [...selectedAmeArray, id];
		}
		console.log(selectedAmeArray);
		// update the searchParams, if any one selected, update them into url, if none of them selected, just delete the amenities at url
		if (selectedAmeArray.length > 0) {
			params.set("amenities", selectedAmeArray.join(","));
		} else {
			params.delete("amenities");
		}

		// push the new URL
		router.push(`/?${params.toString()}`);
	};
	const handleBackHome = () => {
		params.delete("category");
		router.replace(`/?${params.toString()}`);
	};
	return (
		<div className="w-full mx-auto pb-8">
			<Button
				className="block mx-auto"
				size="sm"
				variant="outline"
				onClick={() => {
					setShowList(prev => !prev);
				}}>
				{showList ? "Less" : "More"} Options
			</Button>
			{showList && (
				<>
					<div className=" max-w-[900px] mx-auto px-8 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-16 gap-y-2 mt-8">
						<input type="hidden" name="amenities" />
						{amenities.map(item => {
							const isChecked =
								ameSearchParams?.split(",").includes(item.id) || false;
							return (
								<div
									key={item.id}
									className="flex justify-start  sm:justify-start gap-x-2  items-center">
									<Checkbox
										id={item.id}
										checked={isChecked}
										onCheckedChange={() => handleAmenitiesChange(item.id)}
									/>
									<Label
										className="flex justify-start gap-x-2 items-center"
										htmlFor={item.id}>
										{item.name}
										<item.icon className="w-4 h-4  text-muted-foreground" />
									</Label>
								</div>
							);
						})}
					</div>

					<div className=" mt-8 flex justify-center gap-x-4">
						<Button onClick={handleBackHome} size="sm" variant="destructive">
							Clear Category Filter
						</Button>
						<Button size="sm" variant="secondary">
							<Link href="/">Reset</Link>
						</Button>
					</div>
				</>
			)}
		</div>
	);
}
export default HomeAmenityList;
