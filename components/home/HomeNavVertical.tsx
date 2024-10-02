"use client";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useState } from "react";
import { LuMenu } from "react-icons/lu";
import { customerNavList } from "@/utils/navList";
import Link from "next/link";
import { usePathname } from "next/navigation";

function HomeNavVertical({ className }: { className: string }) {
	const pathname = usePathname();
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const open = Boolean(anchorEl);
	const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};
	return (
		<nav className={className}>
			<Button
				className="text-red-500 text-sm"
				id="basic-button"
				aria-controls={open ? "basic-menu" : undefined}
				aria-haspopup="true"
				aria-expanded={open ? "true" : undefined}
				onClick={handleClick}
				startIcon={<LuMenu className="w-6 h-6" />}>
				Menu
			</Button>
			<Menu
				id="basic-menu"
				anchorEl={anchorEl}
				open={open}
				onClose={handleClose}
				MenuListProps={{
					"aria-labelledby": "basic-button",
				}}>
				{customerNavList.map(nav => {
					const active = pathname === nav.href;
					return (
						<li key={nav.title}>
							<Button
								onClick={handleClose}
								variant="text"
								size="large"
								className={`hover:text-red-500 capitalize  w-full ${
									active ? " text-orange-500 underline" : "text-red-500 "
								} `}>
								<Link href={nav.href}>{nav.title}</Link>
							</Button>
						</li>
					);
				})}
			</Menu>
		</nav>
	);
}
export default HomeNavVertical;
