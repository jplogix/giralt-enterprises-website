"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

interface GalleryImage {
	id: string;
	category: string;
	title: string;
	image: string;
}

export function DocksClient() {
	const [images, setImages] = useState<GalleryImage[]>([]);
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
				setImages(data.images || []);
			} catch (error) {
				console.error("Error fetching images for docks:", error);
			} finally {
				setLoading(false);
			}
		};
		fetchImages();
	}, []);

	const deckOptions = [
		"Aluminum",
		"Pressure Treated Lumber",
		"High Density Lumber (Ipe)",
		"Plastic Lumber",
		"Concrete",
	];

	const flotationOptions = [
		"Polystyrene Tubs",
		"Aluminum-Encased Polyurethane",
		"Full Foam Polyurethane",
	];

	const renderGalleryGrid = (filteredImages: GalleryImage[]) => {
		if (loading) {
			return <div className="text-center py-12">Loading examples...</div>;
		}
		if (filteredImages.length === 0) {
			return (
				<div className="text-center py-12 bg-secondary/20 rounded-lg">
					<p className="text-muted-foreground">No examples available for this category</p>
				</div>
			);
		}

		return (
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
				{filteredImages.map((img) => (
					<Dialog key={img.id}>
						<DialogTrigger asChild>
							<Card className="overflow-hidden hover:shadow-xl transition-shadow cursor-pointer">
								<div className="relative h-64">
									<Image
										src={img.image || "/placeholder.svg"}
										alt={img.title}
										fill
										className="object-cover"
                                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
									/>
								</div>
								<CardContent className="pt-4">
									<h3 className="font-semibold text-center">{img.title}</h3>
								</CardContent>
							</Card>
						</DialogTrigger>
						<DialogContent className="max-w-5xl p-0" showCloseButton={true}>
							<div className="relative w-full" style={{ minHeight: "400px", maxHeight: "90vh" }}>
								<Image
									src={img.image || "/placeholder.svg"}
									alt={img.title}
									fill
									className="object-contain"
                                    sizes="(max-width: 1280px) 100vw, 1280px"
								/>
							</div>
							<div className="p-4 border-t">
								<h3 className="font-semibold text-center text-lg">{img.title}</h3>
							</div>
						</DialogContent>
					</Dialog>
				))}
			</div>
		);
	};

	return (
		<>
			{/* Specific Dock Features Section */}
			<section className="py-20">
				<div className="container mx-auto px-4">
					<div className="max-w-4xl mx-auto">
						<Card className="bg-secondary/30 border-2">
							<CardContent className="pt-6">
								<h2 className="text-2xl font-bold mb-4">Complete Customization</h2>
								<p className="text-muted-foreground mb-6">
									Beyond the structural members, pretty much all the other choices are yours. 
									All we need from you is a list of your needs.
								</p>

								<div className="space-y-8">
									<div>
										<h3 className="font-semibold text-lg mb-4">Deck Material Options</h3>
										<div className="flex flex-wrap gap-2">
											{deckOptions.map((option) => (
												<Badge key={option} variant="outline" className="text-sm py-2 px-4 shadow-sm border-2">
													{option}
												</Badge>
											))}
										</div>
									</div>

									<div>
										<h3 className="font-semibold text-lg mb-4">Flotation Options (Floating Docks)</h3>
										<div className="flex flex-wrap gap-2">
											{flotationOptions.map((option) => (
												<Badge key={option} variant="outline" className="text-sm py-2 px-4 shadow-sm border-2">
													{option}
												</Badge>
											))}
										</div>
									</div>
								</div>
							</CardContent>
						</Card>
					</div>
				</div>
			</section>

			{/* Installation Gallery with Tabs */}
			<section className="py-20 bg-secondary/30">
				<div className="container mx-auto px-4">
					<h2 className="text-3xl font-bold mb-8 text-center">Installation Examples</h2>
					<div className="max-w-6xl mx-auto">
						<Tabs defaultValue="fixed" className="w-full">
							<TabsList className="mx-auto mb-12 w-full max-w-md grid grid-cols-3">
								<TabsTrigger value="fixed">Fixed Docks</TabsTrigger>
								<TabsTrigger value="floating">Floating Docks</TabsTrigger>
								<TabsTrigger value="gangways">Gangways</TabsTrigger>
							</TabsList>

							<TabsContent value="fixed">
								{renderGalleryGrid(images.filter((i) => i.category === "fixed-docks" || (i.category === "docks" && !i.title.toLowerCase().includes("floating"))))}
							</TabsContent>

							<TabsContent value="floating">
								{renderGalleryGrid(images.filter((i) => i.category === "floating-docks" || i.title.toLowerCase().includes("floating")))}
							</TabsContent>

							<TabsContent value="gangways">
								{renderGalleryGrid(images.filter((i) => 
									i.category === "gangways" || 
									i.title.toLowerCase().includes("gangway") || 
									i.title.toLowerCase().includes("ramp")
								))}
							</TabsContent>
						</Tabs>
					</div>
				</div>
			</section>
		</>
	);
}
