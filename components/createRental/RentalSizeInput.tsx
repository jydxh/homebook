"use client";

import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { useEffect, useState } from "react";

type InputProps = {
	name: string;
	label: string;
	max?: number;
	defaultValue?: number;
	placeholder?: string;
};

function RentalSizeInput({
	name,
	label,
	max = 10,
	defaultValue,
	placeholder = `between 0 to ${max}`,
}: InputProps) {
	const [count, setCount] = useState(defaultValue);
	const [errMsg, setErrMsg] = useState<null | string>(null);
	useEffect(() => {
		setErrMsg(null);
		if (count && count > max) {
			setErrMsg(
				`Max number is ${max}, if you can provide more accommodation, please contact admin `
			);
		}
		if (count && count < 0) {
			setErrMsg("Invalid number!");
		}
	}, [count, max]);

	return (
		<div>
			<Label className="block mb-2" htmlFor={name}>
				{label}
			</Label>
			<Input
				placeholder={placeholder}
				onChange={evt => setCount(Number(evt.currentTarget.value))}
				type="number"
				min={0}
				max={max}
				name={name}
				id={name}
				value={count}
			/>
			<span
				className={`${
					errMsg ? "block " : "hidden "
				} text-sm text-red-500 font-medium `}>
				{errMsg}
			</span>
		</div>
	);
}
export default RentalSizeInput;
