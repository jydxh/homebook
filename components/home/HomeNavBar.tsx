"use client";

import { customerNavList } from "@/utils/navList";
import { Button } from "@mui/material";
import Link from "next/link";
import { usePathname } from "next/navigation";
function HomeNavBar() {
	const pathname = usePathname();

	return (
		<nav>
			<ul className="flex gap-x-8">
				{customerNavList.map(nav => {
					const active = pathname === nav.href;
					return (
						<li key={nav.title}>
							<Button
								variant="text"
								size="large"
								className={`hover:text-red-500 ${
									active ? " text-orange-500" : "text-red-500 "
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
