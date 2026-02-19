import type { Metadata } from "next";
import { Footer } from "@/components/footer";
import { Navigation } from "@/components/navigation";
import { Badge } from "@/components/ui/badge";
import { ProductsClient } from "./ProductsClient";

export const metadata: Metadata = {
	title: "Our Products",
	description:
		"Discover our range of high-quality civil engineering products, from weld-free handrails to floating docks and seawalls.",
};

const initialProducts = [
	{
		title: "Handrails",
		description:
			"Weld-free aluminum picket handrail system with DOT approvals from 6 states. High corrosion resistance and strength.",
		image: "/images/giralt/handrails/main_installation.jpg",
		href: "/products/handrails",
		features: [
			"No welding required",
			"AA 6061-T6 aluminum",
			"DOT approved",
			"Award winning",
		],
	},
	{
		title: "Docks & Gangways",
		description:
			"Elite and standard fixed and floating dock systems, plus lightweight aluminum gangways and ramps for safe shore access. Structural members made of aluminum alloy 6061-T6 for high corrosion resistance.",
		image: "/images/giralt/docks/woodland_beach_fishing_pier.jpg",
		href: "/products/docks",
		features: [
			"Fixed & floating options",
			"Gangways & ramps",
			"Multiple deck materials",
			"Salt water resistant",
			"Custom designs",
		],
	},
	{
		title: "Seawalls",
		description:
			"Three types available: Aluminum, Vinyl, and FRP. Engineering analysis provided for proper material selection.",
		image: "/images/giralt/seawalls/vero_beach.jpg",
		href: "/products/seawalls",
		features: [
			"Aluminum, Vinyl, FRP",
			"Engineering support",
			"Site-specific design",
			"Soils analysis",
		],
	},
	{
		title: "Pedestrian Bridges",
		description:
			"Quick-install aluminum bridges with spans up to 90-100 feet. Can be delivered fully assembled.",
		image: "/images/giralt/pedestrian_bridges/long_key_natural_area.jpg",
		href: "/products/bridges",
		features: [
			"5 models available",
			"Up to 100 ft spans",
			"Quick installation",
			"Fully assembled delivery",
		],
	},
	{
		title: "Wave Attenuators",
		description:
			"Multiple configurations to break up wave energy and boat wake. Custom solutions based on site conditions.",
		image: "/images/giralt/wave_attenuators/terra_verde.jpg",
		href: "/products/wave-attenuators",
		features: [
			"4 configurations",
			"Custom engineering",
			"Energy dissipation",
			"Marina protection",
		],
	},
	{
		title: "Boardwalks",
		description:
			"Custom aluminum and timber boardwalk systems for parks, shorelines, and public access. Designed to meet site conditions and accessibility requirements.",
		image: "/images/giralt/boardwalk/boardwalk_01.jpg",
		href: "/products/boardwalk",
		features: [
			"Aluminum & timber options",
			"ADA-compliant designs",
			"Custom engineering",
			"Site-specific solutions",
		],
		category: "boardwalks",
	},
	{
		title: "Bullet Railings",
		description:
			"Decorative bullet-style railings for marinas, piers, and boardwalks. Available in marine-grade aluminum and custom finishes.",
		image: "/images/giralt/bullet_railings/bullet_railing_1.jpg",
		href: "/products/bullet-railings",
		features: [
			"Decorative bullet style",
			"Aluminum construction",
			"Custom finishes",
			"Marine grade",
		],
		category: "bullet-railings",
	},
	{
		title: "2-Line / 3-Line Railings",
		description:
			"2-line and 3-line railing systems for safety and a clean, nautical aesthetic. Easy-install systems for docks and walkways.",
		image: "/images/giralt/two_three_line_railings/2_line_example.jpg",
		href: "/products/two-three-line-railings",
		features: [
			"2-line and 3-line options",
			"Easy install",
			"Adjustable spacing",
			"Saltwater resistant",
		],
		category: "two-three-line-railings",
	},
];

export default function ProductsPage() {
	return (
		<div className="min-h-screen">
			<Navigation />

			{/* Hero */}
			<section className="bg-linear-to-br from-primary to-accent text-primary-foreground py-20">
				<div className="container mx-auto px-4">
					<div className="max-w-3xl">
						<Badge
							variant="secondary"
							className="mb-4 bg-primary-foreground/10 text-primary-foreground border-primary-foreground/20"
						>
							Products
						</Badge>
						<h1 className="text-4xl md:text-5xl font-bold mb-6">
							Quality Construction Products
						</h1>
						<p className="text-xl text-primary-foreground/90 leading-relaxed">
							We offer full engineering support for the design of these
							products, in addition to on-site installation oversight.
						</p>
					</div>
				</div>
			</section>

			<ProductsClient initialProducts={initialProducts} />

			{/* CTA */}
			<section className="py-20 bg-secondary/30">
				<div className="container mx-auto px-4 text-center">
					<h2 className="text-3xl font-bold mb-4">
						Need Technical Specifications?
					</h2>
					<p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
						Contact us for PDF brochures and technical specifications for all
						our products
					</p>
					<div className="flex justify-center">
						<Badge variant="outline" className="text-lg py-2 px-6 border-2">
							View Details
						</Badge>
					</div>
				</div>
			</section>

			<Footer />
		</div>
	);
}
