import type { Metadata } from "next";
import Link from "next/link";
import { Footer } from "@/components/footer";
import { Navigation } from "@/components/navigation";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ProductGalleryClient } from "@/components/ProductGalleryClient";

export const metadata: Metadata = {
	title: "2-Line & 3-Line Railings",
	description:
		"Flexible 2-line and 3-line aluminum railing systems for docks and walkways. Economical safety solutions with unobstructed views.",
};

export default function TwoThreeLineRailingsPage() {
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
							2-Line / 3-Line Railings
						</Badge>
						<h1 className="text-4xl md:text-5xl font-bold mb-6">
							2-Line & 3-Line Railings
						</h1>
						<p className="text-xl text-primary-foreground/90 leading-relaxed">
							Flexible 2-line and 3-line railing systems for docks and walkways
							— designed for safety and unobstructed views. Available in
							multiple finishes and post styles.
						</p>
					</div>
				</div>
			</section>

			<section className="py-20">
				<div className="container mx-auto px-4">
					<div className="max-w-6xl mx-auto">
						<div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-20">
							<div className="space-y-6">
								<h2 className="text-3xl font-bold">Simple & Effective</h2>
								<p className="text-lg text-muted-foreground leading-relaxed">
									Our 2-line and 3-line systems provide a clean, nautical look
									while maintaining safety. They are economical and quick to
									install, making them ideal for long stretches of shoreline or
									dockage.
								</p>
								<ul className="space-y-3">
									{[
										"2-line and 3-line configurations",
										"Adjustable tension and spacing",
										"High-strength, corrosion resistant materials",
										"Customizable end fittings and posts",
									].map((item) => (
										<li key={item} className="flex items-center gap-2">
											<div className="w-1.5 h-1.5 rounded-full bg-accent" />
											<span>{item}</span>
										</li>
									))}
								</ul>
								<Button size="lg" asChild>
									<Link href="/contact">Get a Quote</Link>
								</Button>
							</div>
							<div className="bg-secondary/30 rounded-2xl p-4 aspect-video flex items-center justify-center border-2 border-dashed border-muted-foreground/20">
								<p className="text-muted-foreground text-center italic">
									Ideal for marinas, parks, and residential docks
								</p>
							</div>
						</div>

						<h2 className="text-3xl font-bold mb-8 text-center">
							Installation Examples
						</h2>
						<ProductGalleryClient category="two-three-line-railings" />
					</div>
				</div>
			</section>

			<Footer />
		</div>
	);
}
