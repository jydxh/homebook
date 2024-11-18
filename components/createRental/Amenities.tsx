"use client";
import React, { useState } from "react";
import { amenities } from "@/utils/amenities";
import { Checkbox } from "../ui/checkbox";
import { Label } from "../ui/label";

function Amenities({ ameIds }: { ameIds: string[] }) {
	const [selected, setSelected] = useState<string[]>(ameIds);

	const handleChange = (id: string) => {
		const isExists = selected.findIndex(item => item === id);
		// if the name is not selected
		if (isExists === -1) {
			setSelected(prev => [...prev, id]);
		} else {
			setSelected(prev => prev.filter(item => item !== id));
		}
	};

	return (
		<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-16 gap-y-2 mt-8">
			<input type="hidden" name="amenities" value={selected} />
			{amenities.map(item => {
				const checked = selected.includes(item.id);
				return (
					<div
						key={item.id}
						className="flex justify-start  sm:justify-start gap-x-2  items-center">
						<Checkbox
							id={item.id}
							checked={checked}
							onCheckedChange={() => handleChange(item.id)}
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
	);
}
export default Amenities;
