"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import ImageGallery from "react-image-gallery";
import { Footer } from "@/components/footer";
import { Navigation } from "@/components/navigation";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import {
	Dialog,
	DialogContent,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import "react-image-gallery/styles/css/image-gallery.css";
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
    position: relative;
  }

  .custom-image-gallery .image-gallery-content,
  .custom-image-gallery .image-gallery-slide-wrapper,
  .custom-image-gallery .image-gallery-swipe,
  .custom-image-gallery .image-gallery-slides {
    height: 100%;
    width: 100%;
    position: relative;
  }

  .custom-image-gallery .image-gallery-slide {
    height: 100%;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background: transparent;
    position: relative;
  }

  .custom-image-gallery .image-gallery-slide .image-gallery-image {
    max-height: 100%;
    max-width: 100%;
    min-height: min(60vh, 60vw);
    min-width: min(60vw, 60vh);
    width: auto;
    height: auto;
    object-fit: contain;
    display: block;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    image-rendering: -webkit-optimize-contrast;
    image-rendering: crisp-edges;
    image-rendering: high-quality;
    image-rendering: auto;
  }
  
  /* Custom rendered images */
  .custom-image-gallery .image-gallery-slide > div {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
  }
  
  .custom-image-gallery .image-gallery-slide > div > img {
    max-height: 100%;
    max-width: 100%;
    min-height: min(60vh, 60vw);
    min-width: min(60vw, 60vh);
    object-fit: contain;
    image-rendering: high-quality;
  }
  
  /* Ensure images are always centered vertically and horizontally */
  .custom-image-gallery .image-gallery-slide-wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .custom-image-gallery .image-gallery-nav {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    z-index: 4;
  }

  .custom-image-gallery .image-gallery-left-nav,
  .custom-image-gallery .image-gallery-right-nav {
    padding: 0;
    background: rgba(0, 0, 0, 0.5);
    border: none;
    border-radius: 50%;
    width: 48px;
    height: 48px;
    margin: 0 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.2s ease;
  }

  .custom-image-gallery .image-gallery-left-nav:hover,
  .custom-image-gallery .image-gallery-right-nav:hover {
    background: rgba(0, 0, 0, 0.8);
    transform: scale(1.1);
  }

  .custom-image-gallery .image-gallery-left-nav {
    left: 0;
  }

  .custom-image-gallery .image-gallery-right-nav {
    right: 0;
  }

  .custom-image-gallery .image-gallery-left-nav::before,
  .custom-image-gallery .image-gallery-right-nav::before {
    content: '';
    border: solid white;
    border-width: 0 3px 3px 0;
    display: inline-block;
    padding: 7px;
  }

  .custom-image-gallery .image-gallery-left-nav::before {
    transform: rotate(135deg);
    -webkit-transform: rotate(135deg);
    margin-left: 4px;
  }

  .custom-image-gallery .image-gallery-right-nav::before {
    transform: rotate(-45deg);
    -webkit-transform: rotate(-45deg);
    margin-right: 4px;
  }

  .custom-image-gallery .image-gallery-bullets {
    bottom: 20px;
    position: absolute;
    left: 0;
    right: 0;
    transform: none;
    z-index: 5;
    display: flex;
    justify-content: center;
    pointer-events: none;
  }

  .custom-image-gallery .image-gallery-bullets .image-gallery-bullets-container {
    display: flex;
    align-items: center;
    gap: 8px;
    pointer-events: auto;
  }

  .custom-image-gallery .image-gallery-bullet {
    border: 2px solid #fff;
    background: rgba(255, 255, 255, 0.3);
    width: 12px;
    height: 12px;
    transition: all 0.2s ease;
  }

  .custom-image-gallery .image-gallery-bullet:hover {
    background: rgba(255, 255, 255, 0.6);
  }

  .custom-image-gallery .image-gallery-bullet.active {
    background: #fff;
    transform: scale(1.2);
  }

  .custom-image-gallery .image-gallery-fullscreen-button {
    background: rgba(0, 0, 0, 0.5);
    border: none;
    border-radius: 50%;
    width: 44px;
    height: 44px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0;
    position: absolute;
    top: 10px;
    right: 10px;
    z-index: 5;
    transition: all 0.2s ease;
  }

  .custom-image-gallery .image-gallery-fullscreen-button:hover {
    background: rgba(0, 0, 0, 0.8);
    transform: scale(1.1);
  }

  .custom-image-gallery .image-gallery-fullscreen-button::before {
    content: '';
    display: block;
    width: 18px;
    height: 18px;
    border: 2px solid white;
    border-radius: 2px;
  }
`;

export default function GalleryPage() {
	const [filter, setFilter] = useState("all");
	const [selectedIndex, setSelectedIndex] = useState(0);
	const [isOpen, setIsOpen] = useState(false);
	const galleryRef = useRef<ImageGallery | null>(null);
	const [categories, setCategories] = useState<
		Array<{ id: string; label: string }>
	>([{ id: "all", label: "All Projects" }]);
	const [gallery, setGallery] = useState<
		Array<{ category: string; title: string; image: string }>
	>([]);
	const [loading, setLoading] = useState(true);
	const [imageScales, setImageScales] = useState<Record<string, number>>({});

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
		fetchGalleryData();
	}, [fetchGalleryData]);

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

	// Recalculate scales on window resize
	useEffect(() => {
		if (!isOpen) return;

		const handleResize = () => {
			// Clear scales to force recalculation on next image load
			setImageScales({});
		};

		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, [isOpen]);

	const handleImageClick = (index: number) => {
		setSelectedIndex(index);
		setIsOpen(true);
	};

	// Handle image load to detect and scale small images
	const handleImageLoad = (
		e: React.SyntheticEvent<HTMLImageElement>,
		imageUrl: string,
	) => {
		const img = e.currentTarget;
		const viewportHeight = window.innerHeight;
		const viewportWidth = window.innerWidth;
		const minViewportSize = Math.min(viewportHeight, viewportWidth);
		const minDisplaySize = minViewportSize * 0.6; // 60% of smaller viewport dimension

		const naturalHeight = img.naturalHeight;
		const naturalWidth = img.naturalWidth;
		const naturalSize = Math.min(naturalHeight, naturalWidth);

		// If image is smaller than minimum display size, calculate scale factor
		if (naturalSize > 0 && naturalSize < minDisplaySize) {
			const scale = minDisplaySize / naturalSize;
			// Cap scale at 3x to avoid excessive upscaling
			const cappedScale = Math.min(scale, 3);
			setImageScales((prev) => ({ ...prev, [imageUrl]: cappedScale }));
		} else {
			setImageScales((prev) => ({ ...prev, [imageUrl]: 1 }));
		}
	};

	// Custom render function for images
	const renderItem = (item: { original: string; originalAlt?: string }) => {
		const scale = imageScales[item.original] || 1;
		const needsScaling = scale > 1;

		return (
			<div
				className="relative w-full h-full flex items-center justify-center"
				style={{ minHeight: "100%" }}
			>
				<img
					src={item.original}
					alt={item.originalAlt || ""}
					className="object-contain"
					style={{
						maxHeight: "100%",
						maxWidth: "100%",
						minHeight: needsScaling ? "60vh" : "auto",
						minWidth: needsScaling ? "60vw" : "auto",
						width: needsScaling ? "auto" : "auto",
						height: needsScaling ? "auto" : "auto",
						transform: needsScaling ? `scale(${scale})` : "none",
						imageRendering: needsScaling ? "high-quality" : "auto",
						position: "relative",
					}}
					onLoad={(e) => handleImageLoad(e, item.original)}
				/>
			</div>
		);
	};

	return (
		<div className="min-h-screen">
			<Navigation />

			{/* Hero */}
			<section className="bg-linear-to-br from-primary to-accent text-primary-foreground py-20">
				<div className="container mx-auto px-4">
					<div className="max-w-3xl">
						<Badge
							variant="secondary"
							className="mb-4 bg-primary-foreground/10 text-primary-foreground border-primary-foreground/20"
						>
							Gallery
						</Badge>
						<h1 className="text-4xl md:text-5xl font-bold mb-6">
							Project Gallery
						</h1>
						<p className="text-xl text-primary-foreground/90 leading-relaxed">
							Explore our portfolio of completed installations across various
							product categories
						</p>
					</div>
				</div>
			</section>

			{/* Filter */}
			<section className="py-8 bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/90 sticky top-20 z-45 border-b shadow-sm">
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
								className="fixed inset-0 top-0 left-0 translate-x-0 translate-y-0 max-w-none sm:max-w-none w-screen h-screen m-0 p-0 overflow-hidden grid grid-rows-[1fr_auto] gap-0 border-0 rounded-none"
								showCloseButton={true}
							>
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

			<Footer />
		</div>
	);
}
