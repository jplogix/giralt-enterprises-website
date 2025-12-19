import { Analytics } from "@vercel/analytics/next";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
	title:
		"Giralt Enterprises - Civil Engineering Construction Products Since 1988",
	description:
		"Manufacturer representation and distribution for quality Civil Engineering construction products including handrails, docks, seawalls, pedestrian bridges, and wave attenuators.",
	keywords:
		"civil engineering, construction products, aluminum handrails, floating docks, pedestrian bridges, seawalls, wave attenuators, DOT approved, marine construction",
	generator: "v0.app",
	icons: {
		icon: [
			{
				url: "/icon-light-32x32.png",
				media: "(prefers-color-scheme: light)",
			},
			{
				url: "/icon-dark-32x32.png",
				media: "(prefers-color-scheme: dark)",
			},
			{
				url: "/icon.svg",
				type: "image/svg+xml",
			},
		],
		apple: "/apple-icon.png",
	},
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" suppressHydrationWarning>
			<body className={`${inter.variable} font-sans antialiased`}>
				{children}
				<Analytics />
				<Toaster />
			</body>
		</html>
	);
}
