"use client";

import { customerNavList } from "@/utils/navList";
import Link from "next/link";
import { usePathname } from "next/navigation";
function HomeNav() {
	const pathname = usePathname();
	return (
		<nav className="flex justify-center gap-x-4">
			{customerNavList.map(list => {
				const { href, title } = list;
				const active = pathname === href;
				return (
					<Link
						key={title}
						className={`capitalize font-medium  hover:underline hover:text-primary ${
							active ? "text-primary underline" : ""
						}`}
						href={href}>
						{title}
					</Link>
				);
			})}
		</nav>
	);
}
export default HomeNav;
