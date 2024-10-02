"use client";

import { customerNavList } from "@/utils/navList";
import { Button } from "@mui/material";
import Link from "next/link";
import { usePathname } from "next/navigation";
function HomeNavBar({ className }: { className: string }) {
	const pathname = usePathname();

	return (
		<nav className={className}>
			<ul className="flex lg:gap-x-8 flex-wrap ">
				{customerNavList.map(nav => {
					const active = pathname === nav.href;
					return (
						<li key={nav.title}>
							<Button
								variant="text"
								size="large"
								className={`hover:text-red-500 capitalize   ${
									active ? " text-orange-500 underline" : "text-red-500 "
								} `}>
								<Link href={nav.href}>{nav.title}</Link>
							</Button>
						</li>
					);
				})}
			</ul>
		</nav>
	);
}
export default HomeNavBar;
