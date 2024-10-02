import type { Metadata } from "next";

import "./globals.css";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";
import { Roboto } from "next/font/google";

import Header from "@/components/home/Header";
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
				<AppRouterCacheProvider>
					<Header />
					{children}
				</AppRouterCacheProvider>
			</body>
		</html>
	);
}
