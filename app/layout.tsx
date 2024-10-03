import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";

import "./globals.css";

import { Roboto } from "next/font/google";
import HomeHeader from "@/components/home/HomeHeader";
import { ThemeProvider } from "./providers/ThemeProvider";
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
				<ClerkProvider>
					<ThemeProvider
						attribute="class"
						defaultTheme="system"
						enableSystem
						disableTransitionOnChange>
						<HomeHeader />
						<main className="max-w-[1280px] mx-auto">{children}</main>
					</ThemeProvider>
				</ClerkProvider>
			</body>
		</html>
	);
}
