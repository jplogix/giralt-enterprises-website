"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

interface Installation {
	name: string;
	image: string;
}

interface GalleryImage {
	id: string;
	category: string;
	title: string;
	image: string;
}

export function ProductGalleryClient({ category }: { category: string }) {
	const [installations, setInstallations] = useState<Installation[]>([]);
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
				const filteredImages = (data.images || []).filter(
					(img: GalleryImage) => img.category === category,
				);

				const installationData = filteredImages.map((img: GalleryImage) => ({
					name: img.title,
					image: img.image,
				}));

				setInstallations(installationData);
			} catch (error) {
				console.error(`Error fetching ${category} images:`, error);
				setInstallations([]);
			} finally {
				setLoading(false);
			}
		};
		fetchImages();
	}, [category]);

	if (loading) {
		return (
			<div className="text-center py-12">
				<p className="text-muted-foreground">Loading installations...</p>
			</div>
		);
	}

	if (installations.length === 0) {
		return (
			<div className="text-center py-12">
				<p className="text-muted-foreground">
					No installation examples available
				</p>
			</div>
		);
	}

	return (
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
									sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
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
	);
}
