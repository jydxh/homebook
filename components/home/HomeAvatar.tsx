import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import UserAvatar from "./UserAvatar";
import { currentUser } from "@clerk/nextjs/server";
import Link from "next/link";
import { SignOutButton, SignInButton, SignIn } from "@clerk/nextjs";
import {
	Dialog,
	DialogContent,
	DialogTitle,
	DialogTrigger,
} from "@radix-ui/react-dialog";
import { Button } from "../ui/button";
import UserLoginBtn from "./UserLoginBtn";
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
							<Link href="/user-profile" className="w-full text-start">
								Manage Account
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
					<UserLoginBtn />
					// <>
					// 	<DropdownMenuItem>
					// 		{/* <SignInButton
					// 			//mode="modal"
					// 			fallbackRedirectUrl={
					// 				process.env.NEXT_PUBLIC_CLERK_SIGN_IN_FALLBACK_REDIRECT_URL
					// 			}
					// 			signUpFallbackRedirectUrl={
					// 				process.env.NEXT_PUBLIC_CLERK_SIGN_UP_FALLBACK_REDIRECT_URL
					// 			}>
					// 			<button className="w-full text-start">Sign in</button>
					// 		</SignInButton> */}
					// 		<Dialog>
					// 			<DialogTrigger>Login</DialogTrigger>
					// 			<DialogContent className="sm:max-w-[425px]">
					// 				<DialogTitle>Sign in</DialogTitle>
					// 				<SignIn
					// 					routing="hash"
					// 					fallbackRedirectUrl={
					// 						process.env
					// 							.NEXT_PUBLIC_CLERK_SIGN_IN_FALLBACK_REDIRECT_URL
					// 					}
					// 					signUpFallbackRedirectUrl={
					// 						process.env
					// 							.NEXT_PUBLIC_CLERK_SIGN_UP_FALLBACK_REDIRECT_URL
					// 					}
					// 				/>
					// 			</DialogContent>
					// 		</Dialog>
					// 	</DropdownMenuItem>
					// </>
				)}
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
export default HomeAvatar;
