import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const publicRoute = createRouteMatcher([
	"/",
	"/properties(.*)",
	"/sign-in(.*)",
	"/api(.*)",
]);

export default clerkMiddleware(async (auth, req) => {
	// Handle CORS preflight requests
	if (req.method === "OPTIONS") {
		const response = NextResponse.next();
		response.headers.set("Access-Control-Allow-Origin", "*");
		response.headers.set(
			"Access-Control-Allow-Methods",
			"GET, POST, PUT, DELETE, OPTIONS"
		);
		response.headers.set(
			"Access-Control-Allow-Headers",
			"Content-Type, Authorization"
		);
		return response;
	}

	const response = NextResponse.next();

	// Set CORS headers for all API responses
	if (req.nextUrl.pathname.startsWith("/api")) {
		response.headers.set("Access-Control-Allow-Origin", "*");
	}

	if (!publicRoute(req)) {
		auth().protect();
	}
	return response;
});

export const config = {
	matcher: [
		// Skip Next.js internals and all static files, unless found in search params
		"/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
		// Always run for API routes
		"/(api|trpc)(.*)",
	],
};
