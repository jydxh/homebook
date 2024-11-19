// "use client";
// import { customerNavList, vendorNavList, adminNavList } from "@/utils/navList";

// import Link from "next/link";
// import { usePathname } from "next/navigation";
// import { useState, useEffect } from "react";
// import { fetchUserRole } from "@/utils/actions/ProfileActions";
// import { Skeleton } from "../ui/skeleton";
// function HomeNav() {
// 	const pathname = usePathname() || "";
// 	const [renderList, setRenderList] = useState<
// 		{
// 			title: string;
// 			href: string;
// 		}[]
// 	>([]);
// 	const [role, setRole] = useState<"USER" | "VENDOR" | "ADMIN" | null>(null);

// 	useEffect(() => {
// 		async function getRole() {
// 			try {
// 				const userRole = await fetchUserRole();
// 				if (userRole?.role) {
// 					setRole(userRole.role as "USER" | "VENDOR" | "ADMIN");
// 				} else {
// 					setRole("USER");
// 				}
// 			} catch (error) {
// 				console.error(error);
// 				setRole("USER");
// 			}
// 		}
// 		getRole();
// 	}, []);

// 	useEffect(() => {
// 		if (role === "VENDOR")
// 			setRenderList([...customerNavList, ...vendorNavList]);
// 		else if (role === "ADMIN") setRenderList([...adminNavList]);
// 		else {
// 			setRenderList(customerNavList);
// 		}
// 	}, [role]);

// 	if (role === null) {
// 		return (
// 			<nav className="md:flex justify-center gap-x-4 hidden">
// 				<Skeleton className="w-[4rem] h-[2rem]" />
// 				<Skeleton className="w-[4rem] h-[2rem]" />
// 				<Skeleton className="w-[4rem] h-[2rem]" />
// 			</nav>
// 		);
// 	}

// 	return (
// 		<nav className="md:flex justify-center gap-x-4 hidden flex-wrap">
// 			{renderList.map(list => {
// 				const { href, title } = list;
// 				const active = pathname === href;
// 				return (
// 					<Link
// 						key={title}
// 						className={`capitalize font-medium  hover:underline hover:text-primary ${
// 							active ? "text-primary underline" : ""
// 						}`}
// 						href={href}>
// 						{title}
// 					</Link>
// 				);
// 			})}
// 		</nav>
// 	);
// }
// export default HomeNav;

"use client";

import { customerNavList, vendorNavList, adminNavList } from "@/utils/navList";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { $Enums } from "@prisma/client";
function HomeNav({ role }: { role: $Enums.Role }) {
	const pathname = usePathname();
	let renderList = customerNavList;
	if (role === "VENDOR") renderList = [...customerNavList, ...vendorNavList];
	if (role === "ADMIN") renderList = adminNavList;
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
