"use client";

import { Badge as Bridge, Ruler, Zap } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Footer } from "@/components/footer";
import { Navigation } from "@/components/navigation";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

interface GalleryImage {
	id: string;
	category: string;
	title: string;
	image: string;
}

export default function BridgesPage() {
	const [installations, setInstallations] = useState<
		Array<{ name: string; image: string }>
	>([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchImages = async () => {
			try {
				const res = await fetch("/api/gallery", {
					cache: "no-store",
					headers: {
						"Cache-Control": "no-cache",
					},
				});
				const data = await res.json();
				const bridgeImages = (data.images || []).filter(
					(img: GalleryImage) => img.category === "bridges",
				);

				const installationData = bridgeImages.map((img: GalleryImage) => ({
					name: img.title,
					image: img.image,
				}));

				setInstallations(installationData);
			} catch (error) {
				console.error("Error fetching images:", error);
				setInstallations([]);
			} finally {
				setLoading(false);
			}
		};
		fetchImages();
	}, []);

	const models = [
		{ name: "Atlantis", description: "Classic design with modern engineering" },
		{ name: "Cascade", description: "Flowing aesthetic for natural settings" },
		{
			name: "Colonial",
			description: "Traditional styling with contemporary strength",
		},
		{
			name: "Contour",
			description: "Sleek, modern profile for urban environments",
		},
		{ name: "Skyway", description: "Elevated design for maximum clearance" },
	];

	return (
		<div className="min-h-screen">
			<Navigation />

			{/* Hero */}
			<section className="relative bg-gradient-to-br from-primary to-accent text-primary-foreground py-20">
				<div className="container mx-auto px-4">
					<div className="max-w-4xl">
						<div className="flex items-center gap-2 mb-4">
							<Bridge size={32} />
							<Badge
								variant="secondary"
								className="bg-primary-foreground/10 text-primary-foreground border-primary-foreground/20"
							>
								Infrastructure
							</Badge>
						</div>
						<h1 className="text-4xl md:text-5xl font-bold mb-6">
							Aluminum Pedestrian Bridges
						</h1>
						<p className="text-xl text-primary-foreground/90 leading-relaxed">
							Aluminum pedestrian bridges can provide a quick, economical, and
							aesthetic solution to your pedestrian bridge requirements.
						</p>
					</div>
				</div>
			</section>

			{/* Key Features */}
			<section className="py-20">
				<div className="container mx-auto px-4">
					<div className="max-w-4xl mx-auto">
						<h2 className="text-3xl font-bold mb-8 text-center">
							Why Choose Aluminum Bridges?
						</h2>
						<div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
							<Card>
								<CardContent className="pt-6 text-center">
									<Zap className="mx-auto mb-4 text-accent" size={40} />
									<h3 className="text-lg font-semibold mb-2">
										Quick Installation
									</h3>
									<p className="text-sm text-muted-foreground">
										Can be delivered fully assembled and installed in a matter
										of hours
									</p>
								</CardContent>
							</Card>
							<Card>
								<CardContent className="pt-6 text-center">
									<Ruler className="mx-auto mb-4 text-accent" size={40} />
									<h3 className="text-lg font-semibold mb-2">Long Spans</h3>
									<p className="text-sm text-muted-foreground">
										Single unsupported spans up to 90-100 feet depending on
										width and load
									</p>
								</CardContent>
							</Card>
							<Card>
								<CardContent className="pt-6 text-center">
									<Bridge className="mx-auto mb-4 text-accent" size={40} />
									<h3 className="text-lg font-semibold mb-2">
										Aesthetic Design
									</h3>
									<p className="text-sm text-muted-foreground">
										Multiple models to complement any environment or
										architecture
									</p>
								</CardContent>
							</Card>
						</div>

						<Card className="bg-secondary/30 border-2">
							<CardContent className="pt-6">
								<h3 className="text-xl font-semibold mb-4">
									Installation Advantages
								</h3>
								<p className="text-muted-foreground leading-relaxed mb-4">
									In many cases, the bridges can be delivered fully assembled,
									and installed in a matter of hours. This minimizes disruption
									to your site and accelerates project completion.
								</p>
								<p className="text-muted-foreground leading-relaxed">
									Depending on width and load requirements, single unsupported
									spans can be as large as <strong>90 to 100 feet</strong>,
									reducing or eliminating the need for intermediate supports.
								</p>
							</CardContent>
						</Card>
					</div>
				</div>
			</section>

			{/* Installation Gallery */}
			<section className="py-20 bg-secondary/30">
				<div className="container mx-auto px-4">
					<h2 className="text-3xl font-bold mb-8 text-center">
						Installation Examples
					</h2>
					{loading ? (
						<div className="text-center py-12">
							<p className="text-muted-foreground">Loading installations...</p>
						</div>
					) : installations.length === 0 ? (
						<div className="text-center py-12">
							<p className="text-muted-foreground">
								No installation examples available
							</p>
						</div>
					) : (
						<div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto mb-12">
							{installations.map((installation) => (
								<Dialog key={installation.name}>
									<DialogTrigger asChild>
										<Card className="overflow-hidden hover:shadow-xl transition-shadow cursor-pointer">
											<div className="relative h-64">
												<Image
													src={installation.image || "/placeholder.svg"}
													alt={installation.name}
													fill
													className="object-cover"
												/>
											</div>
											<CardContent className="pt-4">
												<h3 className="font-semibold text-center">
													{installation.name}
												</h3>
											</CardContent>
										</Card>
									</DialogTrigger>
									<DialogContent
										className="max-w-5xl p-0"
										showCloseButton={true}
									>
										<div
											className="relative w-full"
											style={{ minHeight: "400px", maxHeight: "90vh" }}
										>
											<Image
												src={installation.image || "/placeholder.svg"}
												alt={installation.name}
												fill
												className="object-contain"
												sizes="(max-width: 1280px) 100vw, 1280px"
											/>
										</div>
										<div className="p-4 border-t">
											<h3 className="font-semibold text-center text-lg">
												{installation.name}
											</h3>
										</div>
									</DialogContent>
								</Dialog>
							))}
						</div>
					)}
				</div>
			</section>

			{/* Models */}
			<section className="py-20">
				<div className="container mx-auto px-4">
					<h2 className="text-3xl font-bold mb-8 text-center">
						Available Bridge Models
					</h2>
					<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 max-w-6xl mx-auto">
						{models.map((model) => (
							<Card
								key={model.name}
								className="hover:shadow-xl transition-shadow"
							>
								<CardContent className="pt-6 text-center">
									<h3 className="text-lg font-bold mb-2">{model.name}</h3>
									<p className="text-sm text-muted-foreground">
										{model.description}
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
									For technical specifications and drawings for our bridge
									models, please contact us:
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

			{/* Custom Solutions */}
			<section className="py-20 bg-secondary/30">
				<div className="container mx-auto px-4">
					<div className="max-w-4xl mx-auto text-center">
						<h2 className="text-3xl font-bold mb-6">
							Custom Solutions Available
						</h2>
						<p className="text-xl text-muted-foreground mb-8">
							Every project has unique requirements. We work with you to select
							the right model, span, width, and load capacity for your specific
							needs.
						</p>
						<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
							<Card>
								<CardContent className="pt-6">
									<h3 className="font-semibold mb-2">Custom Widths</h3>
									<p className="text-sm text-muted-foreground">
										Tailored to your traffic requirements
									</p>
								</CardContent>
							</Card>
							<Card>
								<CardContent className="pt-6">
									<h3 className="font-semibold mb-2">Load Ratings</h3>
									<p className="text-sm text-muted-foreground">
										Engineered for your specific load needs
									</p>
								</CardContent>
							</Card>
							<Card>
								<CardContent className="pt-6">
									<h3 className="font-semibold mb-2">Span Lengths</h3>
									<p className="text-sm text-muted-foreground">
										Up to 100 feet for most configurations
									</p>
								</CardContent>
							</Card>
						</div>
					</div>
				</div>
			</section>

			{/* CTA */}
			<section className="py-20 bg-gradient-to-r from-primary to-accent text-primary-foreground">
				<div className="container mx-auto px-4 text-center">
					<h2 className="text-3xl font-bold mb-4">
						Ready to Build Your Bridge?
					</h2>
					<p className="text-xl text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
						Contact us to discuss your pedestrian bridge requirements
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
