"use client";

import FormContainer from "./FormContainer";
import { addFavAction } from "@/utils/actions/PropertyActions";
import { usePathname } from "next/navigation";
import { AddFavButton } from "./Buttons";
import { useAuth } from "@clerk/nextjs";
import { Button } from "../ui/button";
import { IoIosHeartEmpty } from "react-icons/io";
import { useEffect, useState } from "react";

import Link from "next/link";
function AddFav({
	isFav,
	propertyId,
	withTxt = false,
}: {
	isFav: boolean;
	propertyId: string;
	withTxt?: boolean;
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
	if (!userId)
		return (
			<Link href={`/sign-in?fallbackPath=${path}`}>
				<Button type="button" size="icon" variant="outline">
					<IoIosHeartEmpty className="w-5 h-5" />
				</Button>
			</Link>
		);
	{
		/* <SignInButton fallbackRedirectUrl={path}>
				<Button type="button" size="icon" variant="outline">
					<IoIosHeartEmpty className="w-5 h-5" />
				</Button>
			</SignInButton> */
	}

	return (
		<FormContainer action={addFav}>
			<AddFavButton isFav={isFav} withTxt={withTxt} />
		</FormContainer>
	);
}
export default AddFav;
