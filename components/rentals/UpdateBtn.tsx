import { FaRegEdit } from "react-icons/fa";

import { Button } from "../ui/button";
import Link from "next/link";

function UpdateBtn({ id }: { id: string }) {
	return (
		<Button variant="outline" size={"icon"}>
			<Link href={`/rentals/${id}/update`}>
				<FaRegEdit className="w-4 h-4  hover:text-primary" />
			</Link>
		</Button>
	);
}
export default UpdateBtn;
