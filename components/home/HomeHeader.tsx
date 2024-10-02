import { Separator } from "../ui/separator";
import HomeAvatar from "./HomeAvatar";
import HomeLogo from "./HomeLogo";
import HomeNav from "./HomeNav";

function HomeHeader() {
	return (
		<>
			<div className="max-w-[1280px] mx-auto flex items-center justify-between py-8 px-4">
				<HomeLogo />
				<HomeNav />
				<HomeAvatar />
			</div>
			<Separator />
		</>
	);
}
export default HomeHeader;
