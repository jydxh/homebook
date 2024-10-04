/* this will be the default page after user login, and check if the db'user exist, if exist just redirect to home, if not exist render this page */
import FormContainer from "@/components/form/FormContainer";
import FormInput from "@/components/form/FormInput";
import { Card } from "@/components/ui/card";
import db from "@/utils/db";
import { currentUser } from "@clerk/nextjs/server";
import { createUserProfile } from "@/utils/actions";

import { redirect } from "next/navigation";
import { SubmitButton } from "@/components/form/Buttons";
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
	/* firstName   String
  LastName    String
  userName    String
  email       String */
	return (
		<section className="mt-8">
			<h2 className="text-2xl font-medium  text-center">Create Profile</h2>
			<FormContainer action={createUserProfile} className="p-8">
				<Card className="mt-8 p-8 grid md:grid-cols-2 gap-8">
					<FormInput label="user name" name="userName" type="text" />
					<FormInput label="first name" name="firstName" type="text" />
					<FormInput label="last name" name="lastName" type="text" />
					<FormInput label="email" name="email" type="text" />
					<div className="w-full">
						<SubmitButton />
					</div>
				</Card>
			</FormContainer>
		</section>
	);
}
export default CreateProfilePage;
