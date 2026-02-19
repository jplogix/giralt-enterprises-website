"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import ImageGallery from "react-image-gallery";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import {
	Dialog,
	DialogContent,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import "react-image-gallery/styles/css/image-gallery.css";
import { X } from "lucide-react";
import Image from "next/image";

declare module "react-image-gallery" {
	export interface ReactImageGalleryItem {
		original: string;
		thumbnail?: string;
		originalAlt?: string;
		thumbnailAlt?: string;
		[key: string]: unknown;
	}

	export interface ReactImageGalleryProps {
		showPlayButton?: boolean;
		showFullscreenButton?: boolean;
		showNav?: boolean;
		showThumbnails?: boolean;
		showBullets?: boolean;
		showIndex?: boolean;
		startIndex?: number;
		onSlide?: (currentIndex: number) => void;
		additionalClass?: string;
		useBrowserFullscreen?: boolean;
		preventSwipe?: boolean;
		swipeThreshold?: number;
		slideOnThumbnailOver?: boolean;
		lazyLoad?: boolean;
		slideDuration?: number;
		useTranslate3D?: boolean;
		renderItem?: (item: ReactImageGalleryItem) => React.ReactNode;
	}
}

// Custom styles for the image gallery in dialog
const customStyles = `
  .custom-image-gallery {
    height: 100%;
    width: 100%;
    background: #000;
  }

  .custom-image-gallery .image-gallery-content,
  .custom-image-gallery .image-gallery-slide-wrapper,
  .custom-image-gallery .image-gallery-swipe,
  .custom-image-gallery .image-gallery-slides,
  .custom-image-gallery .image-gallery-slide {
    height: 100%;
    width: 100%;
  }

  .custom-image-gallery .image-gallery-slide {
    display: flex;
    align-items: center;
    justify-content: center;
    background: transparent;
  }

  /* Target the span/div wrapper that react-image-gallery sometimes inserts */
  .custom-image-gallery .image-gallery-slide > div {
    height: 100%;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  /* The actual image */
  .custom-image-gallery .image-gallery-image {
    max-height: 90vh; /* Leave room for thumbnails/nav */
    max-width: 90vw;
    width: auto !important;
    height: auto !important;
    object-fit: contain;
    cursor: pointer;
  }
  
  /* Navigation buttons */
  .custom-image-gallery .image-gallery-left-nav,
  .custom-image-gallery .image-gallery-right-nav {
    padding: 10px;
    font-size: 2em; /* Ensure icons are large enough */
    z-index: 10;
  }
`;

export function GalleryClient({ 
    initialCategories, 
    initialGallery 
}: { 
    initialCategories: Array<{ id: string; label: string }>, 
    initialGallery: Array<{ category: string; title: string; image: string }> 
}) {
	const [filter, setFilter] = useState("all");
	const [selectedIndex, setSelectedIndex] = useState(0);
	const [isOpen, setIsOpen] = useState(false);
	const galleryRef = useRef<ImageGallery | null>(null);
	const [categories, setCategories] = useState(initialCategories);
	const [gallery, setGallery] = useState(initialGallery);
	const [loading, setLoading] = useState(false);

	const fetchGalleryData = useCallback(async () => {
		try {
			const response = await fetch("/api/gallery", {
				cache: "no-store",
				headers: {
					"Cache-Control": "no-cache",
				},
			});
			if (!response.ok) {
				throw new Error("Failed to fetch gallery data");
			}
			const data = await response.json();
			setCategories(data.categories || []);
			setGallery(
				(data.images || []).map(
					(img: { category: string; title: string; image: string }) => ({
						category: img.category,
						title: img.title,
						image: img.image,
					}),
				),
			);
		} catch (error) {
			console.error("Error fetching gallery data:", error);
		} finally {
			setLoading(false);
		}
	}, []);

	useEffect(() => {
		// Only fetch if initial data is empty or generic
		if (initialGallery.length === 0) {
			setLoading(true);
			fetchGalleryData();
		}
	}, [fetchGalleryData, initialGallery.length]);

	// Filter gallery based on selected category
	const filteredGallery = gallery.filter(
		(item) => filter === "all" || item.category === filter,
	);

	// Convert gallery items to ImageGallery format
	const galleryImages = filteredGallery.map((item) => ({
		original: item.image,
		thumbnail: item.image,
		originalAlt: item.title,
		thumbnailAlt: item.title,
	}));

	// Set gallery to selected index when dialog opens
	useEffect(() => {
		if (!galleryRef.current || !isOpen) return;

		// Small delay to ensure dialog is fully rendered
		const timer = setTimeout(() => {
			galleryRef.current?.slideToIndex(selectedIndex);
		}, 100);

		return () => clearTimeout(timer);
	}, [isOpen, selectedIndex]);

	// Inject custom styles
	useEffect(() => {
		const styleId = "image-gallery-custom-styles";
		let styleElement = document.getElementById(styleId) as HTMLStyleElement;

		if (!styleElement) {
			styleElement = document.createElement("style");
			styleElement.id = styleId;
			document.head.appendChild(styleElement);
		}

		styleElement.innerHTML = customStyles;

		return () => {
			if (styleElement?.parentNode) {
				styleElement.parentNode.removeChild(styleElement);
			}
		};
	}, []);

	// Handle keyboard navigation for image gallery
	useEffect(() => {
		if (!isOpen) return;

		const handleKeyDown = (e: KeyboardEvent) => {
			if (!galleryRef.current) return;

			if (e.key === "ArrowLeft") {
				e.preventDefault();
				galleryRef.current.slideToIndex(Math.max(0, selectedIndex - 1));
			} else if (e.key === "ArrowRight") {
				e.preventDefault();
				galleryRef.current.slideToIndex(
					Math.min(filteredGallery.length - 1, selectedIndex + 1),
				);
			} else if (e.key === "Escape") {
				e.preventDefault();
				setIsOpen(false);
			}
		};

		window.addEventListener("keydown", handleKeyDown);
		return () => window.removeEventListener("keydown", handleKeyDown);
	}, [isOpen, selectedIndex, filteredGallery.length]);


	const handleImageClick = (index: number) => {
		setSelectedIndex(index);
		setIsOpen(true);
	};

    const handleLightboxImageClick = () => {
        setIsOpen(false);
    };


	// Custom render function for images
	const renderItem = (item: { original: string; originalAlt?: string }) => {
        const rawPath = item.original;
        const safeDecoded = decodeURI(rawPath);
        const encodedUrl = encodeURI(safeDecoded);

		return (
			<div 
                className="flex items-center justify-center w-full h-full cursor-pointer"
                onClick={handleLightboxImageClick}
            >
				<img
					src={encodedUrl}
					alt={item.originalAlt || ""}
					className="image-gallery-image"
                    style={{ objectFit: 'contain', maxHeight: '100%', maxWidth: '100%' }}
					loading="eager"
				/>
			</div>
		);
	};

	return (
        <>
			{/* Filter */}
			<section className="py-8 bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/90 sticky top-20 z-10 border-b shadow-sm">
				<div className="container mx-auto px-4">
					<div className="flex flex-wrap gap-2 justify-center">
						{categories.map((category) => (
							<Badge
								key={category.id}
								variant={filter === category.id ? "default" : "outline"}
								className="cursor-pointer text-sm py-2 px-4 hover:bg-primary hover:text-primary-foreground transition-colors"
								onClick={() => setFilter(category.id)}
							>
								{category.label}
							</Badge>
						))}
					</div>
				</div>
			</section>

			{/* Gallery Grid */}
			<section className="py-20">
				<div className="container mx-auto px-4">
					{loading ? (
						<div className="text-center py-12">
							<p className="text-muted-foreground">Loading gallery...</p>
						</div>
					) : filteredGallery.length === 0 ? (
						<div className="text-center py-12">
							<p className="text-muted-foreground">
								No images found in this category.
							</p>
						</div>
					) : (
						<Dialog open={isOpen} onOpenChange={setIsOpen}>
							<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
								{filteredGallery.map((item, index) => (
									<DialogTrigger key={`${item.category}-${item.title}`} asChild>
										<Card
											className="overflow-hidden group cursor-pointer hover:shadow-xl transition-all duration-300"
											onClick={() => handleImageClick(index)}
										>
											<div className="relative h-64 overflow-hidden">
												<Image
													src={item.image || "/placeholder.svg"}
													alt={item.title}
													fill
													sizes="(min-width: 1280px) 25vw, (min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
													loading="lazy"
													className="object-cover group-hover:scale-110 transition-transform duration-300"
												/>
												<div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
													<div className="absolute bottom-0 left-0 right-0 p-4">
														<h3 className="text-white font-semibold">
															{item.title}
														</h3>
														<p className="text-white/80 text-sm capitalize">
															{item.category.replace("-", " ")}
														</p>
													</div>
												</div>
											</div>
										</Card>
									</DialogTrigger>
								))}
							</div>
							<DialogContent
								className="fixed inset-0 top-0 left-0 translate-x-0 translate-y-0 max-w-none sm:max-w-none w-screen h-screen m-0 p-0 overflow-hidden grid grid-rows-[1fr_auto] gap-0 border-0 rounded-none z-100"
								showCloseButton={false}
							>
								<button
									onClick={() => setIsOpen(false)}
									className="absolute top-4 right-4 z-110 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors cursor-pointer"
									aria-label="Close gallery"
								>
									<X className="w-6 h-6" />
								</button>
								<DialogTitle className="sr-only">
									{filteredGallery[selectedIndex]?.title || "Image Gallery"}
								</DialogTitle>
								<div
									className="flex-1 bg-black overflow-hidden relative"
									style={{ minHeight: 0 }}
								>
									<ImageGallery
										ref={galleryRef}
										items={galleryImages}
										showPlayButton={false}
										showFullscreenButton={true}
										showNav={true}
										showThumbnails={false}
										showBullets={true}
										showIndex={false}
										startIndex={selectedIndex}
										onSlide={(currentIndex: number) =>
											setSelectedIndex(currentIndex)
										}
										additionalClass="custom-image-gallery"
										useBrowserFullscreen={false}
										preventSwipe={false}
										swipeThreshold={30}
										slideOnThumbnailOver={false}
										lazyLoad={true}
										slideDuration={300}
										useTranslate3D={true}
										renderItem={renderItem}
									/>
								</div>
								<div className="p-4 border-t bg-background shrink-0">
									<h3 className="font-semibold text-center text-lg">
										{filteredGallery[selectedIndex]?.title}
									</h3>
									<p className="text-muted-foreground text-center text-sm capitalize mt-1">
										{filteredGallery[selectedIndex]?.category.replace("-", " ")}
									</p>
								</div>
							</DialogContent>
						</Dialog>
					)}
				</div>
			</section>
        </>
	);
}
