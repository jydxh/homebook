import Logo from "./Logo";
import HomeNavBar from "./HomeNavBar";

function Header() {
	return (
		<header className="border-b w-[100%] p-8">
			<div className="mx-auto max-w-[1440px] flex items-center gap-8">
				<Logo />
				<HomeNavBar />
			</div>
		</header>
	);
}
export default Header;
