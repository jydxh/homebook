"use client";
import { FiMenu } from "react-icons/fi";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { customerNavList, vendorNavList, adminNavList } from "@/utils/navList";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { fetchUserRole } from "@/utils/actions/ProfileActions";
import { Skeleton } from "../ui/skeleton";
function HomeNavVertical() {
	const pathname = usePathname();
	const [renderList, setRenderList] = useState(customerNavList);

	const [role, setRole] = useState<"USER" | "VENDOR" | "ADMIN" | null>(null);

	useEffect(() => {
		async function getRole() {
			try {
				const userRole = await fetchUserRole();
				if (userRole?.role) {
					setRole(userRole.role as "USER" | "VENDOR" | "ADMIN");
				} else {
					setRole("USER");
				}
			} catch (error) {
				console.error(error);
				setRole("USER");
			}
		}
		getRole();
	}, []);

	useEffect(() => {
		if (role === "VENDOR")
			setRenderList([...customerNavList, ...vendorNavList]);
		else if (role === "ADMIN") setRenderList(adminNavList);
		else {
			setRenderList(customerNavList);
		}
	}, [role]);

	if (role === null)
		return (
			<DropdownMenu>
				<DropdownMenuTrigger className="block md:hidden">
					<FiMenu className="w-8 h-8" />
				</DropdownMenuTrigger>
				<DropdownMenuContent align="end">
					<Skeleton className="w-[4rem] h-[2rem]" />
					<Skeleton className="w-[4rem] h-[2rem]" />
					<Skeleton className="w-[4rem] h-[2rem]" />
				</DropdownMenuContent>
			</DropdownMenu>
		);

	return (
		<DropdownMenu>
			<DropdownMenuTrigger className="block md:hidden">
				<FiMenu className="w-8 h-8" />
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end">
				{renderList.map(list => {
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
