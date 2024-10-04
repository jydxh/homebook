import { currentUser } from "@clerk/nextjs/server";
import Image from "next/image";

import { LuUser2 } from "react-icons/lu";

async function UserAvatar() {
	const user = await currentUser();

	return (
		<>
			{!user ? (
				<LuUser2 className="w-8 h-8 bg-primary rounded-full text-white" />
			) : (
				<Image
					src={user.imageUrl}
					alt="avatar"
					width={40}
					height={40}
					className="w-[45px] h-[45px] rounded-full"
				/>
			)}
		</>
	);
}
export default UserAvatar;
