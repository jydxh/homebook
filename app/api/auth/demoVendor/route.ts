import { clerkClient } from "@clerk/nextjs/server";

import { NextResponse } from "next/server";
/* first get the user by Id where the id is saved as environmental variable, and then create the SignInToken for the user, this will return a url, so front-end click this url can login */
export const POST = async () => {
	try {
		const user = await clerkClient.users.getUser(
			process.env.DEMO_VENDOR_CLERKID || "1"
		);

		const sessions = await clerkClient.signInTokens.createSignInToken({
			userId: user.id,
			expiresInSeconds: 60 * 30,
		});
		console.log(sessions);
		const loginUrl = sessions.url;

		return NextResponse.json({ loginUrl }, { status: 200 });
	} catch (error) {
		console.log(error);
		return NextResponse.json(
			{ error: "Failed to create session" },
			{ status: 500 }
		);
	}
};
