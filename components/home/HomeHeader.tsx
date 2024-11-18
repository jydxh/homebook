import { Separator } from "../ui/separator";

import HomeLogo from "./HomeLogo";

import ToggleTheme from "./ToggleTheme";

import HomeAvatar from "./HomeAvatar";
import { fetchUserProfile } from "@/utils/actions/ProfileActions";
import { Suspense } from "react";
import dynamic from "next/dynamic";

const HomeNav = dynamic(() => import("./HomeNav"), { ssr: false });
const HomeNavVertical = dynamic(() => import("./HomeNavVertical"), {
	ssr: false,
});

async function HomeHeader() {
	const userInfo = await fetchUserProfile();
	return (
		<>
			<div className="max-w-[1280px] mx-auto flex items-center justify-between  py-8 px-4">
				<HomeLogo />
				<Suspense fallback="loading...">
					<HomeNav role={userInfo?.role || "USER"} />
				</Suspense>

				<div className="flex items-center gap-x-4">
					<Suspense fallback="loading...">
						<HomeNavVertical role={userInfo?.role || "USER"} />
					</Suspense>

					<ToggleTheme />
					<HomeAvatar />
				</div>
			</div>
			<Separator />
		</>
	);
}
export default HomeHeader;
