import { Analytics } from "@vercel/analytics/next";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
	metadataBase: new URL("https://giralt-enterprises.vercel.app"), // TODO: Update with actual production domain
	title: {
		default: "Giralt Enterprises - Civil Engineering Construction Products",
		template: "%s | Giralt Enterprises",
	},
	description:
		"Manufacturer representation and distribution for quality Civil Engineering construction products including handrails, docks, seawalls, pedestrian bridges, and wave attenuators.",
	alternates: {
		canonical: "./",
	},
	keywords: [
		"civil engineering",
		"construction products",
		"aluminum handrails",
		"floating docks",
		"pedestrian bridges",
		"seawalls",
		"wave attenuators",
		"DOT approved",
		"marine construction",
	],
	authors: [{ name: "Giralt Enterprises" }],
	creator: "Giralt Enterprises",
	publisher: "Giralt Enterprises",
	formatDetection: {
		email: false,
		address: false,
		telephone: false,
	},
	openGraph: {
		title: "Giralt Enterprises - Civil Engineering Construction Products",
		description:
			"Quality Civil Engineering construction products including handrails, docks, seawalls, and pedestrian bridges.",
		url: "https://giralt-enterprises.vercel.app",
		siteName: "Giralt Enterprises",
		locale: "en_US",
		type: "website",
		images: [
			{
				url: "/logo.jpg", // Using existing logo as default OG image
				width: 1200,
				height: 630,
				alt: "Giralt Enterprises",
			},
		],
	},
	twitter: {
		card: "summary_large_image",
		title: "Giralt Enterprises",
		description:
			"Quality Civil Engineering construction products including handrails, docks, seawalls, and pedestrian bridges.",
		images: ["/logo.jpg"],
	},
	robots: {
		index: true,
		follow: true,
		googleBot: {
			index: true,
			follow: true,
			"max-video-preview": -1,
			"max-image-preview": "large",
			"max-snippet": -1,
		},
	},
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
