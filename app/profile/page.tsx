import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { SignOutButton } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";
import Image from "next/image";
import { redirect } from "next/navigation";
import UploadAvatar from "@/components/profile/UploadAvatar";

async function ProfilePage() {
	const user = await currentUser();
	if (!user) redirect("/");
	return (
		<section className="p-8">
			<h2 className="font-medium mx-auto w-full text-center text-2xl mb-4">
				User Profile
			</h2>
			<Card className="p-4">
				<Image
					src={user.imageUrl}
					alt="avatar"
					width={98}
					height={98}
					className="mx-auto rounded-full my-4"
				/>

				<UploadAvatar />

				<Button asChild>
					<SignOutButton />
				</Button>
			</Card>
		</section>
	);
}
export default ProfilePage;
