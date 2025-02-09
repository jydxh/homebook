import FormContainer from "@/components/form/FormContainer";
import FormInput from "@/components/form/FormInput";
import { Card } from "@/components/ui/card";
import { createUserProfile } from "@/utils/actions/ProfileActions";
import { SubmitButton } from "@/components/form/Buttons";
import { Button } from "@/components/ui/button";
import dynamic from "next/dynamic";
import LoadingSkeleton from "@/components/profile/LoadingSkeleton";
import type { User } from "@clerk/backend";

const ProfileCountryCity = dynamic(
	() => import("@/components/profile/ProfileCountryCity"),
	{ ssr: false, loading: () => <LoadingSkeleton /> }
);

function CreateProfile({
	formDefault,
	user,
}: {
	formDefault: {
		userName: string | null;
		firstName: string | null;
		lastName: string | null;
	};
	user: User;
}) {
	return (
		<section className="mt-8">
			<h2 className="text-2xl font-medium  text-center">Create Profile</h2>
			<FormContainer action={createUserProfile} className="p-8">
				<Card className="mt-8 p-8 ">
					<div className="grid md:grid-cols-2 gap-8">
						<FormInput
							label="User Name"
							name="userName"
							type="text"
							defaultValue={formDefault.userName || ""}
						/>
						<FormInput
							label="First Name"
							name="firstName"
							type="text"
							defaultValue={formDefault.firstName || ""}
						/>
						<FormInput
							label="Last Name"
							name="lastName"
							type="text"
							defaultValue={formDefault.lastName || ""}
						/>
						<ProfileCountryCity country="" city="" state="" />
						{/* <FormInput label="Country" name="country" type="text" />
          <FormInput label="City" name="city" type="text" /> */}
						{!user.imageUrl && (
							<FormInput
								required={false}
								label="Upload avatar (optional)"
								name="image"
								type="file"
							/>
						)}
					</div>

					<div className="w-full mt-8 flex gap-x-8  justify-center">
						<SubmitButton />
						<Button type="reset" variant="secondary">
							Reset
						</Button>
					</div>
				</Card>
			</FormContainer>
		</section>
	);
}
export default CreateProfile;
