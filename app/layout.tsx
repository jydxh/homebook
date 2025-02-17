import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";

import "./globals.css";

import { Roboto } from "next/font/google";
import HomeHeader from "@/components/home/HomeHeader";
import HomeFooter from "@/components/home/HomeFooter";
import { ThemeProvider } from "./providers/ThemeProvider";
import { Toaster } from "@/components/ui/toaster";
const roboto = Roboto({
	weight: ["300", "400", "500", "700"],
	subsets: ["latin"],
	display: "swap",
	variable: "--font-roboto",
});

export const metadata: Metadata = {
	title: "Homebook",
	description: "vacation rentals",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={roboto.variable} suppressHydrationWarning>
				<ThemeProvider
					attribute="class"
					defaultTheme="system"
					enableSystem
					disableTransitionOnChange>
					<ClerkProvider>
						<HomeHeader />
						<main className="max-w-[1280px] mx-auto">{children}</main>
						<HomeFooter />
						<Toaster />
					</ClerkProvider>
				</ThemeProvider>
			</body>
		</html>
	);
}
