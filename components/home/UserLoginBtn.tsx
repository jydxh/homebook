"use client";

import { SignIn } from "@clerk/nextjs";
import {
	AlertDialog,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { AiOutlineCloseCircle } from "react-icons/ai";

import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import DemoUserBtn from "./DemoUserBtn";

function UserLoginBtn() {
	return (
		<>
			<DropdownMenuItem
				onSelect={e => {
					e.preventDefault();
				}}>
				{/* <SignInButton
								//mode="modal"
								fallbackRedirectUrl={
									process.env.NEXT_PUBLIC_CLERK_SIGN_IN_FALLBACK_REDIRECT_URL
								}
								signUpFallbackRedirectUrl={
									process.env.NEXT_PUBLIC_CLERK_SIGN_UP_FALLBACK_REDIRECT_URL
								}>
								<button className="w-full text-start">Sign in</button>
							</SignInButton> */}
				<AlertDialog>
					<AlertDialogTrigger>Login</AlertDialogTrigger>
					<AlertDialogContent className="sm:max-w-[425px] flex-col items-center justify-center">
						<div className="flex flex-row-reverse">
							<AlertDialogCancel className="p-2">
								<AiOutlineCloseCircle className="w-5 h-5" />
							</AlertDialogCancel>
						</div>
						<SignIn
							routing="hash"
							fallbackRedirectUrl={
								process.env.NEXT_PUBLIC_CLERK_SIGN_IN_FALLBACK_REDIRECT_URL
							}
							signUpFallbackRedirectUrl={
								process.env.NEXT_PUBLIC_CLERK_SIGN_UP_FALLBACK_REDIRECT_URL
							}
						/>

						<DemoUserBtn />
					</AlertDialogContent>
				</AlertDialog>
			</DropdownMenuItem>
		</>
	);
}

export default UserLoginBtn;
