"use client";
import { useState } from "react";
import { Button } from "../ui/button";
import FormContainer from "../form/FormContainer";
import { createPropertyReview } from "@/utils/actions/PropertyActions";
import { Textarea } from "../ui/textarea";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import ReviewRating from "./ReviewRating";
import { Card } from "../ui/card";
import { SubmitButton } from "../form/Buttons";

function CreateReview({ propertyId }: { propertyId: string }) {
	const [isShowing, setIsShowing] = useState(false);

	return (
		<>
			<div className="mt-4">
				<Button
					onClick={() => {
						setIsShowing(prev => !prev);
					}}
					variant="outline">
					{isShowing ? "Hide the Form" : "Leave a Review"}
				</Button>
				{isShowing && (
					<Card className="p-8 mt-4 ">
						<FormContainer action={createPropertyReview}>
							<Input type="hidden" name="propertyId" value={propertyId} />
							{/* rating */}
							<ReviewRating />

							{/* comment */}
							<div className="w-full">
								<Label className="mb-2  block" htmlFor="comment">
									Comments:
								</Label>
								<Textarea
									required
									name="comment"
									id="comment"
									rows={5}
									cols={33}
									maxLength={400}
									minLength={10}
								/>
								<div className="mt-4 flex items-center gap-x-4 justify-center ">
									<SubmitButton />
									<Button type="reset" variant="secondary">
										Reset
									</Button>
								</div>
							</div>
						</FormContainer>
					</Card>
				)}
			</div>
		</>
	);
}
export default CreateReview;
