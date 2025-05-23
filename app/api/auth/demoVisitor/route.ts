import setCorsHeader from "@/utils/cors/setCorsHeader";
import { clerkClient } from "@clerk/nextjs/server";

import { NextResponse } from "next/server";


/* preflight for cors */
// export async function OPTIONS() {
//   return NextResponse.json({}, {
//     status: 200,
//     headers: {
//       "Access-Control-Allow-Origin": "*", // Allow any origin
//       "Access-Control-Allow-Methods": "POST, OPTIONS,GET,PUT", // Allowed methods
//       "Access-Control-Allow-Headers": "Content-Type, Authorization", // Allowed headers
//     },
//   });
// }

export const POST = async (req:Request) => {
	console.log(req);
//	setCorsHeader(req);
	try {
		// const response = NextResponse.next();
    // response.headers.set("Access-Control-Allow-Origin", "*");
    // response.headers.set("Access-Control-Allow-Methods", "POST, OPTIONS");
    // response.headers.set("Access-Control-Allow-Headers", "Content-Type, Authorization");

		const user = await clerkClient.users.getUser(
			process.env.DEMO_VISITOR_CLERKID || "1"
		);

		const sessions = await clerkClient.signInTokens.createSignInToken({
			userId: user.id,
			expiresInSeconds: 60 * 30,
		});
		console.log(sessions);
		const loginUrl = sessions.url;
		return NextResponse.json({ loginUrl }, { status: 200,
			//  headers: {
      //     "Access-Control-Allow-Origin": "*", 
			// 		"Access-Control-Allow-Methods": "POST, OPTIONS",
      //     "Access-Control-Allow-Headers": "Content-Type, Authorization",
      //   },
			 });
	} catch (error) {
		console.log(error);
		return NextResponse.json(
			{ error: "Failed to create session" },
			{ status: 500 }
		);
	}
};
