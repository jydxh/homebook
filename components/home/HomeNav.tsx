"use client";

import { customerNavList, vendorNavList, adminNavList } from "@/utils/navList";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { $Enums } from "@prisma/client";
function HomeNav({ role }: { role: $Enums.Role }) {
	const pathname = usePathname();
	let renderList = [...customerNavList];
	if (role === "VENDOR") renderList = [...customerNavList, ...vendorNavList];
	if (role === "ADMIN") renderList = [...adminNavList];
	return (
		<nav className="md:flex justify-center gap-x-4 hidden flex-wrap">
			{renderList.map(list => {
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
