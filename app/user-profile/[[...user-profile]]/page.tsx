import { redirect } from "next/navigation";
import { currentUser } from "@clerk/nextjs/server";
import UserProfileComponent from "@/components/profile/UserProfileComponent";

export default async function UserProfilePage() {
	const user = await currentUser();

	if (user) {
		// if user login and user.id is the vendor or visitor id redirect to home, since they are not allow to touch the user-profile
		if (
			user.id === process.env.DEMO_VISITOR_CLERKID ||
			user.id === process.env.DEMO_VENDOR_CLERKID
		) {
			return redirect("/");
		}
		return <UserProfileComponent />;
	} else {
		redirect("/");
	}
}
