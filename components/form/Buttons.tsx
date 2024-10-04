"use client";
import { Button } from "@/components/ui/button";
import { CgSpinner } from "react-icons/cg";
import { useFormStatus } from "react-dom";

export const SubmitButton = ({ text = "Submit" }: { text?: string }) => {
	const { pending } = useFormStatus();
	return (
		<Button className="mb-2 " disabled={pending}>
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
