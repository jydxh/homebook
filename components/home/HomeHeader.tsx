import { Separator } from "../ui/separator";
import HomeLogo from "./HomeLogo";
import ToggleTheme from "./ToggleTheme";
import HomeAvatar from "./HomeAvatar";
import HomeNav from "./HomeNav";
import HomeNavVertical from "./HomeNavVertical";
import { fetchUserRole } from "@/utils/actions/ProfileActions";

async function HomeHeader() {
	const userInfo = await fetchUserRole();
	return (
		<>
			<div className="max-w-[1280px] mx-auto flex items-center justify-between  py-8 px-4">
				<HomeLogo />
				{/* 	<Suspense fallback="loading...">
					<HomeNav role={userInfo?.role || "USER"} />
				</Suspense>
 */}
				{/* <HomeNav /> */}
				<HomeNav role={userInfo?.role || "USER"} />
				<div className="flex items-center gap-x-4">
					{/* <Suspense fallback="loading...">
						<HomeNavVertical role={userInfo?.role || "USER"} />
					</Suspense>
 */}
					<HomeNavVertical role={userInfo?.role || "USER"} />
					<ToggleTheme />
					<HomeAvatar />
				</div>
			</div>
			<Separator />
		</>
	);
}
export default HomeHeader;
