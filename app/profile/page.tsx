import { Button } from "@/components/ui/button";
import { SignOutButton } from "@clerk/nextjs";

function ProfilePage() {
	return (
		<div>
			<Button asChild>
				<SignOutButton />
			</Button>
		</div>
	);
}
export default ProfilePage;
