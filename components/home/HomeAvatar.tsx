import { SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";
import { Button } from "../ui/button";
import UserAvatar from "./UserAvatar";

function HomeAvatar() {
	return (
		<>
			<SignedIn>
				<UserAvatar />
			</SignedIn>
			<SignedOut>
				<SignInButton mode="modal">
					<Button>Sign in/up</Button>
				</SignInButton>
			</SignedOut>
		</>
	);
}
export default HomeAvatar;
