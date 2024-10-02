import type { Metadata } from "next";

import "./globals.css";

import { Roboto } from "next/font/google";
import HomeHeader from "@/components/home/HomeHeader";

const roboto = Roboto({
	weight: ["300", "400", "500", "700"],
	subsets: ["latin"],
	display: "swap",
	variable: "--font-roboto",
});

export const metadata: Metadata = {
	title: "Airbnb",
	description: "vacation rentals",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={roboto.variable}>
				<HomeHeader />
				<main className="max-w-[1280px] mx-auto">{children}</main>
			</body>
		</html>
	);
}
