"use client";

import { FiMenu } from "react-icons/fi";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { customerNavList } from "@/utils/navList";
import Link from "next/link";
import { usePathname } from "next/navigation";

function HomeNavVertical() {
	const pathname = usePathname();
	return (
		<DropdownMenu>
			<DropdownMenuTrigger className="block md:hidden">
				<FiMenu className="w-8 h-8" />
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end">
				{customerNavList.map(list => {
					const { href, title } = list;
					const active = pathname === href;
					return (
						<DropdownMenuItem asChild key={title}>
							<Link
								href={href}
								className={`capitalize hover:underline hover:text-primary w-full mx-auto ${
									active ? "text-primary underline" : ""
								}`}>
								{title}
							</Link>
						</DropdownMenuItem>
					);
				})}
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
export default HomeNavVertical;
