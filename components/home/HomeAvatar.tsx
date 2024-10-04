import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import UserAvatar from "./UserAvatar";
import { currentUser } from "@clerk/nextjs/server";
import Link from "next/link";
import { SignOutButton, SignInButton } from "@clerk/nextjs";

async function HomeAvatar() {
	const user = await currentUser();
	return (
		<DropdownMenu>
			<DropdownMenuTrigger>
				<UserAvatar />
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end">
				{user && (
					<>
						<DropdownMenuItem>
							<Link href="/profile" className="w-full">
								Profile
							</Link>
						</DropdownMenuItem>
						<DropdownMenuItem>
							<SignOutButton>
								<button className="w-full text-start">Sign out</button>
							</SignOutButton>
						</DropdownMenuItem>
					</>
				)}
				{!user && (
					<>
						<DropdownMenuItem>
							<SignInButton
								mode="modal"
								fallbackRedirectUrl={
									process.env.NEXT_PUBLIC_CLERK_SIGN_IN_FALLBACK_REDIRECT_URL
								}
								signUpFallbackRedirectUrl={
									process.env.NEXT_PUBLIC_CLERK_SIGN_UP_FALLBACK_REDIRECT_URL
								}>
								<button className="w-full text-start">Sign in</button>
							</SignInButton>
						</DropdownMenuItem>
					</>
				)}
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
export default HomeAvatar;
