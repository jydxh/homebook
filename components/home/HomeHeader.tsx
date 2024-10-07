import { Separator } from "../ui/separator";

import HomeLogo from "./HomeLogo";
import HomeNav from "./HomeNav";
import ToggleTheme from "./ToggleTheme";
import HomeNavVertical from "./HomeNavVertical";

import HomeAvatar from "./HomeAvatar";
import { fetchUserProfile } from "@/utils/actions/ProfileActions";

async function HomeHeader() {
	const userInfo = await fetchUserProfile();
	return (
		<>
			<div className="max-w-[1280px] mx-auto flex items-center justify-between  py-8 px-4">
				<HomeLogo />
				<HomeNav role={userInfo?.role || "USER"} />
				<div className="flex items-center gap-x-4">
					<HomeNavVertical />
					<ToggleTheme />
					<HomeAvatar />
				</div>
			</div>
			<Separator />
		</>
	);
}
export default HomeHeader;
