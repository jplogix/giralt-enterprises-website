import type { Metadata } from "next";
import Link from "next/link";
import { Footer } from "@/components/footer";
import { Navigation } from "@/components/navigation";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ProductGalleryClient } from "@/components/ProductGalleryClient";

export const metadata: Metadata = {
	title: "Custom Boardwalk Systems",
	description:
		"Custom aluminum and timber boardwalk systems for parks, shorelines, and public access. ADA compliant and durable designs.",
};

export default function BoardwalkPage() {
	return (
		<div className="min-h-screen">
			<Navigation />

			<section className="relative bg-linear-to-br from-primary to-accent text-primary-foreground py-20">
				<div className="container mx-auto px-4">
					<div className="max-w-4xl">
						<div className="flex items-center gap-2 mb-4">
							<Badge
								variant="secondary"
								className="bg-primary-foreground/10 text-primary-foreground border-primary-foreground/20"
							>
								Marine Construction
							</Badge>
						</div>
						<h1 className="text-4xl md:text-5xl font-bold mb-6">Boardwalks</h1>
						<p className="text-xl text-primary-foreground/90 leading-relaxed">
							Custom aluminum and timber boardwalk systems for parks,
							shorelines, and public access.
						</p>
					</div>
				</div>
			</section>

			<section className="py-20">
				<div className="container mx-auto px-4">
					<h2 className="text-3xl font-bold mb-8 text-center">
						Installation Examples
					</h2>
					<div className="max-w-6xl mx-auto">
						<ProductGalleryClient category="boardwalks" />
					</div>

					<div className="max-w-4xl mx-auto mt-12 bg-secondary/30 p-8 rounded-xl">
						<p className="text-center text-muted-foreground mb-6 text-lg leading-relaxed">
							We design boardwalks to meet site conditions, accessibility
							requirements, and budget constraints. Our systems are engineered
							for durability and minimal environmental impact.
						</p>
						<div className="text-center">
							<Button size="lg" asChild>
								<Link href="/contact">Request a Quote & Consultation</Link>
							</Button>
						</div>
					</div>
				</div>
			</section>

			<Footer />
		</div>
	);
}
