import { clerkClient } from "@clerk/nextjs/server";

import { NextResponse } from "next/server";

export const POST = async () => {
	try {
		const user = await clerkClient.users.getUser(
			process.env.DEMO_VISITOR_CLERKID || "1"
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
