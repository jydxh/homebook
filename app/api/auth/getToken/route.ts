import { clerkClient } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
	try {
		const user = await clerkClient.users.getUser(
			process.env.DEMO_VISITOR_CLERKID || "1"
		);

		const token = await clerkClient.signInTokens.createSignInToken({
			userId: user.id,
			expiresInSeconds: 60 * 60,
		});
		console.log(token);
		return NextResponse.json({ token: token.token }, { status: 200 });
	} catch (error) {
		console.error("Error creating demo session:", error);
		return NextResponse.json(
			{ error: "Failed to create token" },
			{ status: 500 }
		);
	}
};
