"use client";

import { ArrowRight, Award } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

type Product = {
	title: string;
	description: string;
	image: string;
	href: string;
	features: string[];
	badge?: string;
	category?: string;
};

interface GalleryImage {
	id: string;
	category: string;
	title: string;
	image: string;
}

export function ProductsClient({ initialProducts }: { initialProducts: Product[] }) {
	const [products, setProducts] = useState<Product[]>(initialProducts);

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
				const images: GalleryImage[] = data.images || [];

				setProducts((prevProducts) =>
					prevProducts.map((product) => {
						if (product.category) {
							const categoryImage = images.find(
								(img) => img.category === product.category,
							);
							if (categoryImage) {
								return { ...product, image: categoryImage.image };
							}
						}
						return product;
					}),
				);
			} catch (error) {
				console.error("Error fetching gallery images:", error);
			}
		};

		fetchImages();
	}, []);

	return (
		<section className="py-20">
			<div className="container mx-auto px-4">
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
					{products.map((product) => (
						<Link key={product.title} href={product.href} className="group">
							<Card className="overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer h-full">
								<div className="relative h-64 overflow-hidden">
									<Image
										src={product.image || "/placeholder.svg"}
										alt={product.title}
										fill
										sizes="(min-width: 1024px) 50vw, 100vw"
										className="object-cover group-hover:scale-105 transition-transform duration-300"
									/>
									{product.badge && (
										<Badge className="absolute top-4 right-4 bg-accent text-accent-foreground">
											<Award size={14} className="mr-1" />
											{product.badge}
										</Badge>
									)}
									<div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
								</div>
								<CardContent className="pt-6">
									<h2 className="text-2xl font-bold mb-3 group-hover:text-primary transition-colors duration-300">
										{product.title}
									</h2>
									<p className="text-muted-foreground mb-4 leading-relaxed">
										{product.description}
									</p>
									<ul className="space-y-2 mb-6">
										{product.features.map((feature) => (
											<li key={feature} className="flex items-center text-sm">
												<div className="w-1.5 h-1.5 rounded-full bg-primary mr-2" />
												{feature}
											</li>
										))}
									</ul>
									<Button
										asChild
										className="w-full group-hover:bg-primary/90 transition-colors duration-300"
									>
										<span>
											View Details
											<ArrowRight className="ml-2 inline-block" size={16} />
										</span>
									</Button>
								</CardContent>
							</Card>
						</Link>
					))}
				</div>
			</div>
		</section>
	);
}
