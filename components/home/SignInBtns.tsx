import { SignIn } from "@clerk/nextjs";
const NavSignBtn = () => {
	return (
		<SignIn
			routing="hash"
			signUpForceRedirectUrl={
				process.env.NEXT_PUBLIC_CLERK_SIGN_UP_FALLBACK_REDIRECT_URL
			}
			fallbackRedirectUrl={
				process.env.NEXT_PUBLIC_CLERK_SIGN_IN_FALLBACK_REDIRECT_URL
			}
			signUpFallbackRedirectUrl={
				process.env.NEXT_PUBLIC_CLERK_SIGN_UP_FALLBACK_REDIRECT_URL
			}
		/>
	);
};
export { NavSignBtn };
