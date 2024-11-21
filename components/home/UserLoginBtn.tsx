"use client";

import { SignIn } from "@clerk/nextjs";
import {
	Dialog,
	DialogContent,
	DialogTitle,
	DialogTrigger,
} from "@radix-ui/react-dialog";

import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import DemoUserBtn from "./DemoUserBtn";
import { useState } from "react";

function UserLoginBtn() {
	const [showLogin, setShowLogin] = useState(true);
	return (
		<>
			<DropdownMenuItem
				onSelect={e => {
					e.preventDefault();
					setShowLogin(false);
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
				<Dialog>
					<DialogTrigger>{showLogin && "Login"}</DialogTrigger>
					<DialogContent className="sm:max-w-[425px]">
						<DialogTitle hidden>Sign in</DialogTitle>

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
					</DialogContent>
				</Dialog>
			</DropdownMenuItem>
		</>
	);
}

export default UserLoginBtn;
