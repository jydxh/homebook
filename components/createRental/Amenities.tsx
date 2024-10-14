"use client";
import React, { useEffect, useState } from "react";
import { amenities } from "@/utils/amenities";
import { Checkbox } from "../ui/checkbox";
import { Label } from "../ui/label";

function Amenities() {
	const [selected, setSelected] = useState<string[]>([]);

	const handleChange = (name: string) => {
		const isExists = selected.findIndex(item => item === name);
		// if the name is not selected
		if (isExists === -1) {
			setSelected(prev => [...prev, name]);
		} else {
			setSelected(prev => prev.filter(item => item !== name));
		}
	};
	useEffect(() => {
		console.log(selected);
	}, [selected]);
	return (
		<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-16 gap-y-2 mt-8">
			<input type="hidden" name="amenities" value={selected} />
			{amenities.map(item => {
				return (
					<div
						key={item.name}
						className="flex justify-start  sm:justify-start gap-x-2  items-center">
						<Checkbox
							id={item.name}
							name={item.name}
							onCheckedChange={() => handleChange(item.name)}
						/>
						<Label className="font-normal" htmlFor={item.name}>
							{item.name}
						</Label>
						<item.icon className="w-4 h-4 font-thin" />
					</div>
				);
			})}
		</div>
	);
}
export default Amenities;
