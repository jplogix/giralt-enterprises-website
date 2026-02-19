import type { Metadata } from "next";
import { Anchor, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { Footer } from "@/components/footer";
import { Navigation } from "@/components/navigation";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { DocksClient } from "./DocksClient";

export const metadata: Metadata = {
	title: "Aluminum Dock Systems & Gangways",
	description:
		"Structural aluminum dock systems and gangways using high-strength 6061-T6 alloy. Custom fixed and floating dock solutions for marine environments.",
};

export default function DocksPage() {
	const dockTypes = [
		{
			name: "Elite Fixed Piers",
			description: "Premium fixed pier systems with superior durability",
		},
		{
			name: "Elite Floating Docks",
			description: "High-end floating dock solutions",
		},
		{
			name: "Standard Fixed Docks",
			description: "Reliable fixed dock systems",
		},
		{
			name: "Standard Gangways",
			description: "Access solutions for various applications",
		},
		{
			name: "Standard Floating Docks",
			description: "Cost-effective floating dock options",
		},
	];

	return (
		<div className="min-h-screen">
			<Navigation />

			{/* Hero */}
			<section className="relative bg-linear-to-br from-primary to-accent text-primary-foreground py-20">
				<div className="container mx-auto px-4">
					<div className="max-w-4xl">
						<div className="flex items-center gap-2 mb-4">
							<Anchor size={32} />
							<Badge
								variant="secondary"
								className="bg-primary-foreground/10 text-primary-foreground border-primary-foreground/20"
							>
								Marine Construction
							</Badge>
						</div>
						<h1 className="text-4xl md:text-5xl font-bold mb-6">
							Aluminum Dock Systems & Gangways
						</h1>
						<p className="text-xl text-primary-foreground/90 leading-relaxed">
							All of our docks and gangways have a common element: structural
							members made of aluminum alloy 6061-T6. This alloy has a unique
							combination of high corrosion resistance, even in salt water
							environments, and high strength. Our gangways provide lightweight,
							modular access solutions for safe shore access.
						</p>
					</div>
				</div>
			</section>

			{/* Key Features */}
			<section className="py-20">
				<div className="container mx-auto px-4">
					<div className="max-w-4xl mx-auto">
						<h2 className="text-3xl font-bold mb-8">Why Aluminum 6061-T6?</h2>
						<div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
							<Card>
								<CardContent className="pt-6">
									<CheckCircle2 className="text-accent mb-3" size={32} />
									<h3 className="text-xl font-semibold mb-2">
										High Corrosion Resistance
									</h3>
									<p className="text-muted-foreground">
										Exceptional performance even in harsh salt water
										environments. Built to withstand marine conditions.
									</p>
								</CardContent>
							</Card>
							<Card>
								<CardContent className="pt-6">
									<CheckCircle2 className="text-accent mb-3" size={32} />
									<h3 className="text-xl font-semibold mb-2">
										Superior Strength
									</h3>
									<p className="text-muted-foreground">
										Comparable yield strength to steel while offering better
										corrosion resistance and lighter weight.
									</p>
								</CardContent>
							</Card>
						</div>
					</div>
				</div>
			</section>

			<DocksClient />

			{/* Dock Types */}
			<section className="py-20">
				<div className="container mx-auto px-4">
					<h2 className="text-3xl font-bold mb-8 text-center">
						Available Dock Systems
					</h2>
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
						{dockTypes.map((type) => (
							<Card
								key={type.name}
								className="hover:shadow-lg transition-shadow"
							>
								<CardContent className="pt-6">
									<h3 className="text-lg font-semibold mb-2">{type.name}</h3>
									<p className="text-sm text-muted-foreground">
										{type.description}
									</p>
								</CardContent>
							</Card>
						))}
					</div>
				</div>
			</section>

			{/* Technical Resources */}
			<section className="py-20">
				<div className="container mx-auto px-4">
					<div className="max-w-4xl mx-auto">
						<h2 className="text-3xl font-bold mb-6">Technical Resources</h2>
						<Card>
							<CardContent className="pt-6">
								<p className="text-muted-foreground mb-6">
									For technical specifications and drawings for our dock
									systems, please contact us:
								</p>
								<Button size="lg" className="w-full" asChild>
									<Link href="/contact">
										Contact Us for Technical Resources
									</Link>
								</Button>
							</CardContent>
						</Card>
					</div>
				</div>
			</section>

			{/* CTA */}
			<section className="py-20 bg-linear-to-r from-primary to-accent text-primary-foreground">
				<div className="container mx-auto px-4 text-center">
					<h2 className="text-3xl font-bold mb-4">
						Ready to Design Your Dock?
					</h2>
					<p className="text-xl text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
						Contact us with your requirements and we'll create a custom solution
					</p>
					<Button size="lg" variant="secondary" asChild>
						<Link href="/contact">Request a Quote</Link>
					</Button>
				</div>
			</section>

			<Footer />
		</div>
	);
}
