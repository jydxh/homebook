import { fetchUserProfile } from "@/utils/actions/ProfileActions";
import FormContainer from "../form/FormContainer";
import FormInput from "../form/FormInput";
import { SubmitButton } from "../form/Buttons";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { updateUserProfile } from "@/utils/actions/ProfileActions";

import dynamic from "next/dynamic";

import LoadingSkeleton from "./LoadingSkeleton";

const ProfileCountryCity = dynamic(() => import("./ProfileCountryCity"), {
	ssr: false,
	loading: () => <LoadingSkeleton />,
});

async function UserInfo() {
	const profile = await fetchUserProfile();

	return (
		<FormContainer action={updateUserProfile} className="p-8">
			<h3 className="font-medium text-lg">Update User Information</h3>
			<Card className="mt-4 p-8">
				<div className="grid md:grid-cols-2 gap-8">
					<FormInput
						label="User Name"
						name="userName"
						type="text"
						defaultValue={profile?.userName || ""}
					/>
					<FormInput
						label="First Name"
						name="firstName"
						type="text"
						defaultValue={profile?.firstName || ""}
					/>
					<FormInput
						label="Last Name"
						name="lastName"
						type="text"
						defaultValue={profile?.lastName || ""}
					/>

					<ProfileCountryCity
						country={profile?.country || "USA"}
						city={profile?.city || "Chicago"}
						state={profile?.state || "IL"}
					/>
					{/* 
					<FormInput
						label="City"
						name="city"
						type="text"
						defaultValue={profile?.city || ""}
					/>
					<FormInput
						label="Country"
						name="country"
						type="text"
						defaultValue={profile?.country || ""}
					/> */}
				</div>

				<div className="w-full mt-8 flex gap-x-8  justify-center">
					<SubmitButton text="Update" />
					<Button type="reset" variant="secondary">
						Reset
					</Button>
				</div>
			</Card>
		</FormContainer>
	);
}
export default UserInfo;
