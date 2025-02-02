"use client";

import { DropdownMenuItem } from "@/components/ui/dropdown-menu";

import { ReactNode } from "react";
function UserLoginBtnWrapper({ children }: { children: ReactNode }) {
	return (
		<>
			<DropdownMenuItem
				onSelect={e => {
					e.preventDefault();
				}}>
				{children}
			</DropdownMenuItem>
		</>
	);
}
export default UserLoginBtnWrapper;
