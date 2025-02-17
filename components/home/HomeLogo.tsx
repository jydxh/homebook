import { IoHome } from "react-icons/io5";
import Link from "next/link";

function HomeLogo() {
	return (
		<Link href="/">
			<IoHome className="text-logoColor w-[3rem] h-[3rem]" />
		</Link>
	);
}
export default HomeLogo;

export const FooterLogo = () => {
	return (
		<Link href="/">
			<div className="flex items-center  justify-center flex-col gap-y-4">
				<IoHome className="text-logoColor w-[3rem] h-[3rem]" />
				<span className="text-4xl text-center font-serif font-semibold text-logoColor">
					homebook
				</span>
			</div>
		</Link>
	);
};
