import type { Metadata } from "next";
import Link from "next/link";
import { Footer } from "@/components/footer";
import { Navigation } from "@/components/navigation";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ProductGalleryClient } from "@/components/ProductGalleryClient";

export const metadata: Metadata = {
	title: "Decorative Bullet Railings",
	description:
		"Decorative bullet-style railings in marine-grade aluminum for piers, boardwalks, and marinas. Durable and attractive safety solutions.",
};

export default function BulletRailingsPage() {
	return (
		<div className="min-h-screen">
			<Navigation />

			<section className="bg-linear-to-br from-primary to-accent text-primary-foreground py-20">
				<div className="container mx-auto px-4">
					<div className="max-w-3xl">
						<Badge
							variant="secondary"
							className="mb-4 bg-primary-foreground/10 text-primary-foreground border-primary-foreground/20"
						>
							Bullet Railings
						</Badge>
						<h1 className="text-4xl md:text-5xl font-bold mb-6">
							Bullet Railings
						</h1>
						<p className="text-xl text-primary-foreground/90 leading-relaxed">
							Decorative bullet-style railings for piers, boardwalks, and
							marinas. Available in marine-grade aluminum with a variety of
							finishes and mounting options.
						</p>
					</div>
				</div>
			</section>

			<section className="py-20">
				<div className="container mx-auto px-4">
					<div className="max-w-6xl mx-auto">
						<div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-20">
							<div className="space-y-6">
								<h2 className="text-3xl font-bold">Durable & Attractive</h2>
								<p className="text-lg text-muted-foreground leading-relaxed">
									Our bullet railings combine a traditional look with modern
									corrosion-resistant materials. Custom spacing and finishes are
									available to match your project's aesthetic.
								</p>
								<ul className="space-y-3">
									{[
										"Marine-grade aluminum construction",
										"Custom finishes (Powder coat, Anodized)",
										"Easy field installation",
										"Meets safety and aesthetic requirements",
									].map((item) => (
										<li key={item} className="flex items-center gap-2">
											<div className="w-1.5 h-1.5 rounded-full bg-accent" />
											<span>{item}</span>
										</li>
									))}
								</ul>
								<Button size="lg" asChild>
									<Link href="/contact">Request Detailed Specifications</Link>
								</Button>
							</div>
							<div className="bg-secondary/30 rounded-2xl p-4 aspect-square flex items-center justify-center border-2 border-dashed border-muted-foreground/20">
								<p className="text-muted-foreground text-center italic">
									Custom configurations available for every site
								</p>
							</div>
						</div>

						<h2 className="text-3xl font-bold mb-8 text-center">
							Installation Examples
						</h2>
						<ProductGalleryClient category="bullet-railings" />
					</div>
				</div>
			</section>

			<Footer />
		</div>
	);
}
