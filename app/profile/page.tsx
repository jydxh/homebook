import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { SignOutButton } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";
import Image from "next/image";
import { redirect } from "next/navigation";
import UploadAvatar from "@/components/profile/UploadAvatar";
import { fetchUserProfile } from "@/utils/actions/ProfileActions";
import { Separator } from "@/components/ui/separator";
import UserInfo from "@/components/profile/UserInfo";
import ApplyVendor from "@/components/profile/ApplyVendor";
import CancelApplication from "@/components/profile/CancelApplication";

async function ProfilePage() {
	const user = await currentUser();
	const userProfile = await fetchUserProfile();
	console.log(userProfile);

	if (!user) redirect("/");
	if (!userProfile) redirect("/profile/create");

	const showApplyVendor =
		(userProfile.role === "USER" && userProfile.vendorProfile.length === 0) ||
		userProfile.vendorProfile[0].applicationStatus === "DENY" ||
		userProfile.vendorProfile[0].applicationStatus === "CANCELLED";
	const shouldShowCancelApplication =
		userProfile.role === "USER" &&
		userProfile.vendorProfile[0].applicationStatus === "PENDING";
	return (
		<section className="p-8">
			<h2 className="font-medium mx-auto w-full text-center text-2xl mb-4">
				User Profile
			</h2>
			<Card className="p-4">
				<Image
					src={userProfile.profileImage || user.imageUrl}
					alt="avatar"
					width={98}
					height={98}
					className="mx-auto rounded-full my-4 object-cover w-[6rem] h-[6rem]"
				/>
				<p className="mx-auto text-center mb-4 font-medium capitalize">
					{userProfile.userName} &middot; {userProfile.role.toLowerCase()}
				</p>
				<UploadAvatar />
				<Separator className="my-4" />
				<UserInfo />
				{/* later add update vendor info UI here */}
				<Separator className="my-4" />
				{/* apply to be a vendor, when role is user and did not apply as vendor  */}

				<div>
					<div className={showApplyVendor ? "visible" : "hidden"}>
						<ApplyVendor />
					</div>
				</div>

				<div className="flex  gap-x-8">
					<Button asChild>
						<SignOutButton />
					</Button>
					<div className={shouldShowCancelApplication ? "visible" : "hidden"}>
						<CancelApplication />
					</div>
				</div>
			</Card>
		</section>
	);
}
export default ProfilePage;
