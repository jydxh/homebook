"use client";
import { SignIn } from "@clerk/nextjs";
import {
	AlertDialog,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogTrigger,
	AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { Button } from "../ui/button";

import DemoUserBtn from "./DemoUserBtn";
import { usePathname } from "next/navigation";

function UserLoginBtn({ location }: { location?: "atBooking" }) {
	const pathName = usePathname();
	const signUpRedirectUrl =
		process.env.NEXT_PUBLIC_CLERK_SIGN_UP_FALLBACK_REDIRECT_URL;

	return (
		<>
			<AlertDialog>
				{location === "atBooking" ? (
					<AlertDialogTrigger asChild>
						<Button className="mt-4">Signin to Book</Button>
					</AlertDialogTrigger>
				) : (
					<AlertDialogTrigger>Login</AlertDialogTrigger>
				)}
				<AlertDialogTitle className="hidden">
					button to sign in
				</AlertDialogTitle>
				<AlertDialogContent className="flex flex-col items-center justify-center">
					<div className="flex flex-row-reverse w-full">
						<AlertDialogCancel className="p-2">
							<AiOutlineCloseCircle className="w-5 h-5" />
						</AlertDialogCancel>
					</div>
					<SignIn
						routing="hash"
						signUpForceRedirectUrl={signUpRedirectUrl}
						fallbackRedirectUrl={pathName}
						signUpUrl={signUpRedirectUrl}
						signUpFallbackRedirectUrl={signUpRedirectUrl}
						forceRedirectUrl={signUpRedirectUrl} // need to add more logic later
					/>
					<DemoUserBtn />
				</AlertDialogContent>
			</AlertDialog>
		</>
	);
}

export default UserLoginBtn;
