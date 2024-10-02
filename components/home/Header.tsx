import Logo from "./Logo";
import HomeNavBar from "./HomeNavBar";
import Avatar from "./Avatar";
import HomeNavVertical from "./HomeNavVertical";

function Header() {
	return (
		<header className="border-b w-[100%] p-8">
			<div className="mx-auto max-w-[1280px]  flex justify-between items-center md:items-center gap-8">
				<Logo />
				<HomeNavBar className="hidden sm:block" />
				<HomeNavVertical className="block sm:hidden" />
				<Avatar />
			</div>
		</header>
	);
}
export default Header;
