"use client";
import { Button } from "@/components/ui/button";
import { CgSpinner } from "react-icons/cg";
import { useFormStatus } from "react-dom";

export const SubmitButton = ({ text = "submit" }: { text?: string }) => {
	const { pending } = useFormStatus();
	return (
		<Button disabled={pending} className="mt-2">
			{pending ? (
				<>
					<CgSpinner className="animate-spin" />
					{text}
				</>
			) : (
				text
			)}
		</Button>
	);
};
