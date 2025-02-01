"use client";
import { Button } from "@/components/ui/button";
import { CgSpinner } from "react-icons/cg";
import { useFormStatus } from "react-dom";

import { IoIosHeartEmpty, IoMdHeart } from "react-icons/io";

export const SubmitButton = ({
	text = "Submit",
	disabled,
	spinning,
}: {
	text?: string;
	disabled?: boolean;
	spinning?: boolean;
}) => {
	const { pending } = useFormStatus();
	return (
		<Button className="mb-2 " disabled={disabled || pending}>
			{pending || spinning ? (
				<>
					<CgSpinner className="animate-spin mr-2" />
					{text}
				</>
			) : (
				text
			)}
		</Button>
	);
};

export const AddFavButton = ({
	isFav,
	withTxt = false,
}: {
	isFav: boolean;
	withTxt?: boolean;
}) => {
	const { pending } = useFormStatus(); // the useFormStatus has to be used in the button component, not in the parent form component!!! important!! ref:  https://react.dev/reference/react-dom/hooks/useFormStatus
	//  call useFormStatus from inside a component that is located inside <form>.

	return (
		<Button
			type="submit"
			disabled={pending}
			size={withTxt ? "sm" : "icon"}
			variant={withTxt ? "ghost" : "outline"}
			className="hover:scale-110 transition duration-300 ease-in-out">
			{pending ? (
				<>
					<CgSpinner className="animate-spin w-5 h-5" />
				</>
			) : isFav ? (
				<div className="flex justify-center items-center gap-2">
					<IoMdHeart
						className={`text-red-400 w-5 h-5 ${
							withTxt ? " relative top-[2px] " : " "
						}`}
					/>
					{withTxt && <p className="underline text-base ">Remove </p>}
				</div>
			) : (
				<div className="flex justify-center items-center gap-2">
					{" "}
					<IoIosHeartEmpty
						className={` w-5 h-5 ${withTxt ? " relative top-[2px] " : " "}`}
					/>
					{withTxt && <p className="underline text-base ">Save </p>}
				</div>
			)}
		</Button>
	);
};
/* notes for usage of useFormStatus */
/* 	function Form() {
		// 🚩 `pending` will never be true
		// useFormStatus does not track the form rendered in this component
		const { pending } = useFormStatus();
		return <form action={submit}></form>;
	}
	Instead call useFormStatus from inside a component that is located inside <form>.
	
	function Submit() {
		// ✅ `pending` will be derived from the form that wraps the Submit component
		const { pending } = useFormStatus(); 
		return <button disabled={pending}>...</button>;
	}
	
	function Form() {
		// This is the <form> `useFormStatus` tracks
		return (
			<form action={submit}>
				<Submit />
			</form>
		);
	} */
