"use client";
import { Button } from "@/components/ui/button";
import { CgSpinner } from "react-icons/cg";
import { useFormStatus } from "react-dom";

export const SubmitButton = ({
	text = "Submit",
	disabled,
}: {
	text?: string;
	disabled?: boolean;
}) => {
	const { pending } = useFormStatus();
	return (
		<Button className="mb-2 " disabled={disabled || pending}>
			{pending ? (
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
