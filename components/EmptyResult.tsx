import Link from "next/link";
import { Button } from "./ui/button";

function EmptyResult({
	text = "There is not result, please try to change filter option",
	href = "/",
	buttonText = "Reset Filter",
}: {
	text?: string;
	href?: string;
	buttonText?: string;
}) {
	return (
		<section className="mx-auto">
			<h3 className="font-semibold text-2xl p-8 text-center">{text}</h3>
			<Button
				className="block mx-auto w-[7rem] text-center"
				variant="destructive"
				asChild>
				<Link href={href}>{buttonText}</Link>
			</Button>
		</section>
	);
}
export default EmptyResult;
