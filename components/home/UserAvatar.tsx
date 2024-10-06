import { fetchUserProfile } from "@/utils/actions/ProfileActions";
import { currentUser } from "@clerk/nextjs/server";
import Image from "next/image";

import { LuUser2 } from "react-icons/lu";

async function UserAvatar() {
	const user = await currentUser();
	const profile = await fetchUserProfile();

	return (
		<>
			{!user ? (
				<LuUser2 className="w-8 h-8 bg-primary rounded-full text-white" />
			) : (
				<Image
					src={profile?.profileImage || user.imageUrl}
					alt="avatar"
					width={98}
					height={98}
					className="w-[45px] h-[45px] rounded-full object-cover"
				/>
			)}
		</>
	);
}
export default UserAvatar;
