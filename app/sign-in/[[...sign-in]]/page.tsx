import { SignIn } from "@clerk/nextjs";
import DemoUserBtn from "@/components/home/DemoUserBtn";

export default function Page({
	searchParams,
}: {
	searchParams: { fallbackPath: string };
}) {
	console.log(searchParams);
	return (
		<section className="p-8">
			<div className="flex justify-center">
				<SignIn
					fallbackRedirectUrl={searchParams.fallbackPath || "/"}
					signUpFallbackRedirectUrl={searchParams.fallbackPath || "/"}
				/>
			</div>

			{/* the demo user btn will also pass the fallbackPath later */}
			<DemoUserBtn />
		</section>
	);
}
