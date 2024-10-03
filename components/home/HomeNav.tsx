"use client";

import { customerNavList } from "@/utils/navList";
import { Button } from "../ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";
function HomeNav() {
	const pathname = usePathname();
	return (
		<nav>
			{customerNavList.map(list => {
				const { href, title } = list;
				const active = pathname === href;
				return (
					<Button
						className={`capitalize ${active ? "underline" : ""}`}
						asChild
						variant="link"
						key={title}>
						<Link href={href}>{title}</Link>
					</Button>
				);
			})}
		</nav>
	);
}
export default HomeNav;
