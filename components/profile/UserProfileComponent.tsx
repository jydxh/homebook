"use client";
import { UserProfile } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { useTheme } from "next-themes";

import { useEffect, useState } from "react";

const UserProfileComponent = () => {
	const { theme, systemTheme } = useTheme();
	const [currentTheme, setCurrentTheme] = useState(theme);

	useEffect(() => {
		if (theme === "system") {
			setCurrentTheme(systemTheme);
		} else {
			setCurrentTheme(theme);
		}
	}, [systemTheme, theme]);
	return (
		<section className="grid place-content-center pt-16">
			<UserProfile
				path="/user-profile"
				appearance={{
					baseTheme: currentTheme === "dark" ? dark : undefined,
				}}
			/>
		</section>
	);
};

export default UserProfileComponent;
