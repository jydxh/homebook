/* this will be the default page after user login, and check if the db'user exist, if exist just redirect to prev page, if not exist render this page */

import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import CreateProfile from "@/components/profile/CreateProfile";
import ClientSideRedirect from "@/components/profile/ClientSideRedirect";
import { hasProfile } from "@/utils/actions/ProfileActions";

async function CreateProfilePage() {
	const user = await currentUser();
	/* if user has not login yet, but trying to access this page just redirect back to home */
	if (!user) return redirect("/");
	const isHasProfile = await hasProfile(user.id);
	/* if the user has in the db just redirect to prev page */
	console.log("isHasProfile: ", isHasProfile);
	const formDefault = {
		userName: user.username,
		firstName: user.firstName,
		lastName: user.lastName,
	};

	return (
		<>
			<ClientSideRedirect hasProfile={Boolean(isHasProfile)} />
			<CreateProfile formDefault={formDefault} user={user} />
		</>
	);
}
export default CreateProfilePage;
