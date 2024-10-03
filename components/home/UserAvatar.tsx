import Link from "next/link";
import { LuUser2 } from "react-icons/lu";

function UserAvatar() {
	return (
		<Link href="/profile">
			<LuUser2 className="w-8 h-8 bg-primary rounded-full text-white" />
		</Link>
	);
}
export default UserAvatar;
