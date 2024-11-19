import { fetchUserProfile } from "@/utils/actions/ProfileActions";
import { currentUser } from "@clerk/nextjs/server";
import Image from "next/image";

import { LuUser2 } from "react-icons/lu";

async function UserAvatar() {
	const user = await currentUser();
	if (!user)
		return (
			<LuUser2 className="w-[45px] h-[45px] bg-primary rounded-full text-white border-2 hover:border-none border-slate-400/75" />
		);
	const profile = await fetchUserProfile();
	return (
		<Image
			src={profile?.profileImage || user.imageUrl}
			alt="avatar"
			width={98}
			height={98}
			className="w-[45px] h-[45px] rounded-full object-cover border-2 hover:border-none border-slate-400/75"
		/>
	);
}
export default UserAvatar;
