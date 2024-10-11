import { Separator } from "../ui/separator";
import { FooterLogo } from "./HomeLogo";

function HomeFooter() {
	return (
		<>
			<Separator className="my-4" />
			<div className="max-w-[1280px] mx-auto grid md:grid-cols-3 py-8 px-4">
				<div className="md:col-span-1 w-full">
					<FooterLogo />
				</div>

				<div className="md:col-span-2">
					<p className="text-sm text-gray-600 my-4">
						This web app is an imitation of the original Airbnb website. Visit
						the official site at{" "}
						<a
							href="https://www.airbnb.com"
							target="_blank"
							rel="noopener noreferrer"
							className="text-blue-500 underline">
							www.airbnb.com
						</a>
						.
					</p>
					<p>
						Created and developed by Haocheng @ Github:{" "}
						<a
							href="https://github.com/jydxh"
							target="_blank"
							rel="noopener noreferrer">
							jydxh
						</a>
					</p>
				</div>
			</div>
		</>
	);
}
export default HomeFooter;
