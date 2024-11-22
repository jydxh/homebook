"use client";

import FormContainer from "./FormContainer";
import { addFavAction } from "@/utils/actions/PropertyActions";
import { usePathname } from "next/navigation";
import { AddFavButton } from "./Buttons";
import { useAuth, SignIn } from "@clerk/nextjs";

import { IoIosHeartEmpty } from "react-icons/io";
import { useEffect, useState } from "react";
import { AiOutlineCloseCircle } from "react-icons/ai";
import {
	AlertDialog,
	AlertDialogContent,
	AlertDialogFooter,
	AlertDialogTrigger,
	AlertDialogCancel,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import DemoUserBtn from "../home/DemoUserBtn";

import Link from "next/link";

function AddFav({
	isFav,
	propertyId,
	withTxt = false,
	hasUserProfile,
}: {
	isFav: boolean;
	propertyId: string;
	withTxt?: boolean;
	hasUserProfile: boolean;
}) {
	const path = usePathname();
	const [isClient, setIsClient] = useState(false);

	useEffect(() => {
		setIsClient(true);
	}, []);

	const addFav = addFavAction.bind(null, {}, { path, propertyId }); // null for "this", the {} empty object for prevState, {path, propertyId} for the second argue

	/* if user not login, render the login button */
	const { userId, isLoaded } = useAuth();

	if (!isLoaded || !isClient) {
		return (
			<Button type="button" size="icon" variant="outline">
				<IoIosHeartEmpty className="w-5 h-5" />
			</Button>
		);
	}
	if (!userId) return <LoginDialog path={path} />;

	if (userId && !hasUserProfile) {
		return (
			<Link href="/profile/create">
				<Button type="button" size="icon" variant="outline">
					<IoIosHeartEmpty className="w-5 h-5" />
				</Button>
			</Link>
		);
	}

	return (
		<FormContainer action={addFav}>
			<AddFavButton isFav={isFav} withTxt={withTxt} />
		</FormContainer>
	);
}
export default AddFav;

function LoginDialog({ path }: { path: string }) {
	return (
		<AlertDialog>
			<AlertDialogTrigger asChild>
				<Button type="button" size="icon" variant="outline">
					<IoIosHeartEmpty className="w-5 h-5" />
				</Button>
			</AlertDialogTrigger>
			<AlertDialogContent className="flex flex-col items-center justify-center">
				<div className="flex flex-row-reverse w-full">
					<AlertDialogCancel className="p-2">
						<AiOutlineCloseCircle className="w-5 h-5" />
					</AlertDialogCancel>
				</div>
				<SignIn
					routing="hash"
					fallbackRedirectUrl={path || "/"}
					signUpFallbackRedirectUrl={path || "/"}
				/>
				<AlertDialogFooter>
					<DemoUserBtn />
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
}
