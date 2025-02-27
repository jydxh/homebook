"use client";

import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { useState } from "react";
import FormContainer from "../form/FormContainer";
import { SubmitButton } from "../form/Buttons";
import { vendorApplication } from "@/utils/actions/ProfileActions";
import FormInput from "../form/FormInput";
import { Checkbox } from "../ui/checkbox";
import { Label } from "../ui/label";

function ApplyVendor() {
	const [disableSubmit, setDisableSubmit] = useState(true);
	return (
		<div className="p-8">
			<FormContainer action={vendorApplication}>
				<h4 className="py-4 font-medium text-lg"> Vendor Application Form</h4>
				<Card className="p-8">
					<div className="grid md:grid-cols-2 gap-8">
						<FormInput type="text" label="Business Name" name="businessName" />
						<FormInput
							type="text"
							label="Business Address"
							name="businessAddress"
						/>
						<FormInput
							type="file"
							accept="image/*,application/pdf"
							label="Owner's Government Id"
							name="governmentId"
						/>
						<FormInput
							type="file"
							accept="image/*,application/pdf"
							label="Proof of Address"
							name="proofOfAddress"
						/>
					</div>
					<div className="flex justify-center items-center space-x-2 mt-8">
						<Checkbox
							name="acceptTerm"
							id="terms"
							onCheckedChange={() => {
								setDisableSubmit(prev => !prev);
							}}
						/>
						<Label htmlFor="terms">Accept terms and conditions</Label>
					</div>
					<div className="mt-8 flex justify-center gap-x-8">
						<SubmitButton disabled={disableSubmit} text="Apply" />
						<Button type="reset" variant="secondary">
							Reset
						</Button>
					</div>
				</Card>
			</FormContainer>
		</div>
	);
}
export default ApplyVendor;
