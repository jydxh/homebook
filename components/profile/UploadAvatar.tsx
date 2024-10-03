"use client";
import { useState } from "react";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import FormInput from "../form/FormInput";
import FormContainer from "../form/FormContainer";
import { SubmitButton } from "../form/Buttons";
import { updateAvatar } from "@/utils/actions";

function UploadAvatar() {
	const [showForm, setShowForm] = useState(false);

	return (
		<div className="w-full md:w-1/2 mx-auto">
			<Button
				onClick={() => setShowForm(prev => !prev)}
				variant="outline"
				className="mx-auto block mb-4">
				Update Avatar
			</Button>
			{showForm && (
				<Card className="p-4">
					<FormContainer action={updateAvatar}>
						<FormInput
							type="file"
							label="Select image to update"
							name="image"
						/>
						<SubmitButton />
					</FormContainer>
				</Card>
			)}
		</div>
	);
}
export default UploadAvatar;
