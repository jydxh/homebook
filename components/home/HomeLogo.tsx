import AirbnbLogo from "@/public/airbnb-ar21.svg";
import Link from "next/link";
import AirbnbVertical from "@/public/airbnb-icon.svg";
function HomeLogo() {
	return (
		<Link href="/">
			<AirbnbLogo />
		</Link>
	);
}
export default HomeLogo;

export const FooterLogo = () => {
	return (
		<Link href="/">
			<div className="flex items-center  justify-center flex-col gap-y-4">
				<AirbnbVertical />
				<span className="text-4xl text-center font-serif font-semibold text-logoColor">
					airbnb
				</span>
			</div>
		</Link>
	);
};
