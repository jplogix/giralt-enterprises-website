import type { Metadata } from "next";
import { AlertCircle, Shield } from "lucide-react";
import Link from "next/link";
import { Footer } from "@/components/footer";
import { Navigation } from "@/components/navigation";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ProductGalleryClient } from "@/components/ProductGalleryClient";

export const metadata: Metadata = {
	title: "Seawalls & Sheet Piling",
	description:
		"Quality seawall materials in Aluminum, Vinyl, and FRP. Expert engineering support for marine protection and shoreline stabilization.",
};

export default function SeawallsPage() {
	const materials = [
		{
			name: "Aluminum",
			description:
				"Superior corrosion resistance and strength for harsh environments",
			features: [
				"High durability",
				"Low maintenance",
				"Lightweight installation",
			],
		},
		{
			name: "Vinyl",
			description: "Cost-effective solution with excellent chemical resistance",
			features: ["Budget friendly", "Chemical resistant", "Easy installation"],
		},
		{
			name: "FRP (Fiber Reinforced Plastic)",
			description:
				"High strength-to-weight ratio with superior corrosion resistance",
			features: ["Extremely durable", "Corrosion proof", "Long lifespan"],
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
							<Shield size={32} />
							<Badge
								variant="secondary"
								className="bg-primary-foreground/10 text-primary-foreground border-primary-foreground/20"
							>
								Marine Protection
							</Badge>
						</div>
						<h1 className="text-4xl md:text-5xl font-bold mb-6">
							Seawall Materials & Systems
						</h1>
						<p className="text-xl text-primary-foreground/90 leading-relaxed">
							We have 3 types of seawall materials available: Aluminum, Vinyl
							and FRP (Fiber Reinforced Plastic). Normally the site conditions
							will determine the best material to use.
						</p>
					</div>
				</div>
			</section>

			{/* Important Notice */}
			<section className="py-12 bg-destructive/10">
				<div className="container mx-auto px-4">
					<Card className="border-2 border-destructive/30 max-w-4xl mx-auto">
						<CardContent className="pt-6">
							<div className="flex items-start gap-4">
								<AlertCircle
									className="text-destructive shrink-0 mt-1"
									size={24}
								/>
								<div>
									<h3 className="font-semibold text-lg mb-2">
										Important: Soils Information Required
									</h3>
									<p className="text-muted-foreground leading-relaxed">
										Good soils information is essential to a good seawall
										design. Without it, we are only guessing. We strongly urge
										you to obtain reliable soils information before attempting
										to design and/or install any seawall or sheet piling
										retaining wall.
									</p>
								</div>
							</div>
						</CardContent>
					</Card>
				</div>
			</section>

			{/* Materials */}
			<section className="py-20">
				<div className="container mx-auto px-4">
					<h2 className="text-3xl font-bold mb-8 text-center">
						Material Options
					</h2>
					<p className="text-xl text-muted-foreground text-center mb-12 max-w-3xl mx-auto">
						We can make recommendations based on engineering analysis and years
						of experience
					</p>
					<div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
						{materials.map((material) => (
							<Card
								key={material.name}
								className="border-2 hover:shadow-xl transition-shadow"
							>
								<CardContent className="pt-6">
									<h3 className="text-2xl font-bold mb-3">{material.name}</h3>
									<p className="text-muted-foreground mb-6">
										{material.description}
									</p>
									<div className="space-y-2">
										{material.features.map((feature) => (
											<div key={feature} className="flex items-center text-sm">
												<div className="w-1.5 h-1.5 rounded-full bg-primary mr-2" />
												{feature}
											</div>
										))}
									</div>
								</CardContent>
							</Card>
						))}
					</div>
				</div>
			</section>

			{/* Installation Gallery */}
			<section className="py-20 bg-secondary/30">
				<div className="container mx-auto px-4">
					<h2 className="text-3xl font-bold mb-8 text-center">
						Installation Examples
					</h2>
					<div className="max-w-6xl mx-auto">
						<ProductGalleryClient category="seawalls" />
					</div>
				</div>
			</section>

			{/* Product Systems */}
			<section className="py-20 bg-secondary/30">
				<div className="container mx-auto px-4">
					<div className="max-w-4xl mx-auto">
						<h2 className="text-3xl font-bold mb-8">Available Systems</h2>
						<div className="space-y-6">
							<Card>
								<CardContent className="pt-6">
									<h3 className="text-xl font-semibold mb-3">
										Elite Wall Facing System
									</h3>
									<p className="text-muted-foreground mb-4">
										Premium seawall system with advanced engineering and
										superior performance
									</p>
								</CardContent>
							</Card>
							<Card>
								<CardContent className="pt-6">
									<h3 className="text-xl font-semibold mb-3">
										Shoreguard Sheet Piling
									</h3>
									<p className="text-muted-foreground mb-4">
										Reliable sheet piling solutions for various site conditions
									</p>
								</CardContent>
							</Card>
						</div>
						<div className="mt-8">
							<Card>
								<CardContent className="pt-6">
									<p className="text-muted-foreground mb-6">
										For technical specifications, assembly details, and drawings
										for our seawall systems, please contact us:
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
				</div>
			</section>

			{/* Engineering Support */}
			<section className="py-20">
				<div className="container mx-auto px-4">
					<div className="max-w-4xl mx-auto text-center">
						<h2 className="text-3xl font-bold mb-6">
							Complete Engineering Support
						</h2>
						<p className="text-xl text-muted-foreground mb-8">
							Site conditions determine the best material to use. Our
							engineering analysis and decades of experience ensure optimal
							seawall performance for your specific location.
						</p>
						<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
							<Card>
								<CardContent className="pt-6">
									<h3 className="font-semibold mb-2">Site Analysis</h3>
									<p className="text-sm text-muted-foreground">
										Comprehensive evaluation of site conditions
									</p>
								</CardContent>
							</Card>
							<Card>
								<CardContent className="pt-6">
									<h3 className="font-semibold mb-2">Material Selection</h3>
									<p className="text-sm text-muted-foreground">
										Expert recommendations based on requirements
									</p>
								</CardContent>
							</Card>
							<Card>
								<CardContent className="pt-6">
									<h3 className="font-semibold mb-2">Design Support</h3>
									<p className="text-sm text-muted-foreground">
										Full engineering design and specifications
									</p>
								</CardContent>
							</Card>
						</div>
					</div>
				</div>
			</section>

			{/* CTA */}
			<section className="py-20 bg-linear-to-r from-primary to-accent text-primary-foreground">
				<div className="container mx-auto px-4 text-center">
					<h2 className="text-3xl font-bold mb-4">Need a Seawall Solution?</h2>
					<p className="text-xl text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
						Contact us for engineering analysis and material recommendations
					</p>
					<Button size="lg" variant="secondary" asChild>
						<Link href="/contact">Request Consultation</Link>
					</Button>
				</div>
			</section>

			<Footer />
		</div>
	);
}
