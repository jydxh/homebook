import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import UserAvatar from "./UserAvatar";
import { currentUser } from "@clerk/nextjs/server";
import Link from "next/link";
import { SignOutButton } from "@clerk/nextjs";

import UserLoginBtnWrapper from "./UserLoginBtnWrapper";
import UserLoginBtn from "./UserLoginBtn";
async function HomeAvatar() {
	const user = await currentUser();

	const showManageAccount =
		user?.id !== process.env.DEMO_VISITOR_CLERKID &&
		user?.id !== process.env.DEMO_VENDOR_CLERKID;

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
						{showManageAccount && (
							<DropdownMenuItem>
								<Link href="/user-profile" className="w-full text-start">
									Manage Account
								</Link>
							</DropdownMenuItem>
						)}
						<DropdownMenuItem>
							<SignOutButton>
								<button className="w-full text-start">Sign out</button>
							</SignOutButton>
						</DropdownMenuItem>
					</>
				)}
				{!user && (
					<UserLoginBtnWrapper>
						<UserLoginBtn />
					</UserLoginBtnWrapper>
				)}
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
export default HomeAvatar;
