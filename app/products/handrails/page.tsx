"use client";

import { Award, CheckCircle2, MapPin } from "lucide-react";
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

export default function HandrailsPage() {
	const dotApprovals = [
		"Florida",
		"Virginia",
		"New York",
		"Alabama",
		"Georgia",
		"South Carolina",
	];
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
				const handrailImages = (data.images || []).filter(
					(img: GalleryImage) => img.category === "handrails",
				);

				// Convert gallery images to installation format
				const installationData = handrailImages.map((img: GalleryImage) => ({
					name: img.title,
					image: img.image,
				}));

				setInstallations(installationData);
			} catch (error) {
				console.error("Error fetching images:", error);
				// Fallback to empty array if fetch fails
				setInstallations([]);
			} finally {
				setLoading(false);
			}
		};
		fetchImages();
	}, []);

	return (
		<div className="min-h-screen">
			<Navigation />

			{/* Hero */}
			<section className="relative bg-linear-to-br from-primary to-accent text-primary-foreground py-20">
				<div className="container mx-auto px-4">
					<div className="max-w-4xl">
						<div className="flex gap-2 mb-4">
							<Badge
								variant="secondary"
								className="bg-primary-foreground/10 text-primary-foreground border-primary-foreground/20"
							>
								<Award size={14} className="mr-1" />
								Award Winning
							</Badge>
						</div>
						<h1 className="text-4xl md:text-5xl font-bold mb-6">
							Weld-Free Aluminum Picket Handrails
						</h1>
						<p className="text-xl text-primary-foreground/90 leading-relaxed">
							In 2002, we invented a revolutionary system of picket handrails
							that requires no welding of the pickets. This innovation earned us
							prestigious awards and DOT approvals from six states.
						</p>
					</div>
				</div>
			</section>

			{/* Awards */}
			<section className="py-12 bg-secondary/30">
				<div className="container mx-auto px-4">
					<div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
						<div className="flex items-center gap-4 bg-background p-6 rounded-lg border-2 border-accent/20">
							<Award className="text-accent shrink-0" size={32} />
							<div>
								<h3 className="font-semibold">
									2006 Governor's New Product Award
								</h3>
								<p className="text-sm text-muted-foreground">
									Florida Engineering Society / FPEI
								</p>
							</div>
						</div>
						<div className="flex items-center gap-4 bg-background p-6 rounded-lg border-2 border-accent/20">
							<Award className="text-accent shrink-0" size={32} />
							<div>
								<h3 className="font-semibold">2007 New Product Award</h3>
								<p className="text-sm text-muted-foreground">NSPE / PEI</p>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* Product Details */}
			<section className="py-20">
				<div className="container mx-auto px-4">
					<div className="max-w-4xl mx-auto">
						<h2 className="text-3xl font-bold mb-8">Product Specifications</h2>
						<Card className="mb-8">
							<CardContent className="pt-6">
								<div className="space-y-6">
									<div>
										<h3 className="text-xl font-semibold mb-3 flex items-center">
											<CheckCircle2 className="text-accent mr-2" size={20} />
											Material Excellence
										</h3>
										<p className="text-muted-foreground leading-relaxed">
											Most of our handrails are manufactured from{" "}
											<strong>aluminum alloy 6061-T6</strong>. This alloy has
											both high corrosion resistance and high strength. AA
											6061-T6 has a yield strength of 35,000 psi, comparable to
											the yield strength of ASTM A-36 steel at 36,000 psi.
										</p>
									</div>
									<div>
										<h3 className="text-xl font-semibold mb-3 flex items-center">
											<CheckCircle2 className="text-accent mr-2" size={20} />
											No Welding Required
										</h3>
										<p className="text-muted-foreground leading-relaxed">
											Our innovative system allows picket handrails to be
											assembled without welding the pickets, reducing
											installation time and ensuring consistent quality across
											all installations.
										</p>
									</div>
								</div>
							</CardContent>
						</Card>

						{/* DOT Approvals */}
						<h2 className="text-3xl font-bold mb-6">
							Department of Transportation Approvals
						</h2>
						<Card className="mb-8">
							<CardContent className="pt-6">
								<p className="text-muted-foreground mb-6">
									We've earned Department of Transportation approvals from six
									states:
								</p>
								<div className="flex flex-wrap gap-3">
									{dotApprovals.map((state) => (
										<Badge
											key={state}
											variant="outline"
											className="text-base py-2 px-4 border-2"
										>
											<MapPin size={16} className="mr-2" />
											{state}
										</Badge>
									))}
								</div>
							</CardContent>
						</Card>

						{/* Technical Resources */}
						<h2 className="text-3xl font-bold mb-6">Technical Resources</h2>
						<Card>
							<CardContent className="pt-6">
								<p className="text-muted-foreground mb-6">
									For technical specifications and DOT drawings for our
									handrails, please contact us:
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
						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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

			{/* Licensing CTA */}
			<section className="py-20">
				<div className="container mx-auto px-4">
					<Card className="bg-linear-to-r from-primary to-accent text-primary-foreground">
						<CardContent className="pt-6 text-center">
							<h2 className="text-3xl font-bold mb-4">
								Manufacturing Opportunities
							</h2>
							<p className="text-xl text-primary-foreground/90 mb-6 max-w-2xl mx-auto">
								We are currently seeking manufacturers who wish to fabricate our
								handrail system under license.
							</p>
							<Button size="lg" variant="secondary" asChild>
								<Link href="/contact">Contact Us About Licensing</Link>
							</Button>
						</CardContent>
					</Card>
				</div>
			</section>

			<Footer />
		</div>
	);
}
