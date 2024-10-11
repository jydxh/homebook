/* this will be the default page after user login, and check if the db'user exist, if exist just redirect to home, if not exist render this page */
import FormContainer from "@/components/form/FormContainer";
import FormInput from "@/components/form/FormInput";
import { Card } from "@/components/ui/card";
import db from "@/utils/db";
import { currentUser } from "@clerk/nextjs/server";
import { createUserProfile } from "@/utils/actions/ProfileActions";

import { redirect } from "next/navigation";
import { SubmitButton } from "@/components/form/Buttons";
import { Button } from "@/components/ui/button";
async function CreateProfilePage() {
	const user = await currentUser();
	/* if user has not login yet, but trying to access this page just redirect back to home */
	if (!user) return redirect("/");
	const existingUserInDb = await db.user.findUnique({
		where: {
			clerkId: user.id,
		},
	});
	/* if the user has in the db just redirect to home page */
	if (existingUserInDb) redirect("/");
	const formDefault = {
		userName: user.username,
		firstName: user.firstName,
		lastName: user.lastName,
	};

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
export default CreateProfilePage;
