import Link from "next/link";
import { FaAirbnb } from "react-icons/fa";
function Logo() {
	return (
		<Link href="/">
			<div className="flex gap-x-2">
				<FaAirbnb className="w-8 h-8 text-red-500" />
				<span className="text-red-500 font-bold text-2xl font-serif">
					airbnb
				</span>
			</div>
		</Link>
	);
}
export default Logo;
