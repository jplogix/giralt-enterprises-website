import type { Metadata } from "next";
import { Footer } from "@/components/footer";
import { Navigation } from "@/components/navigation";
import { Badge } from "@/components/ui/badge";
import { GalleryClient } from "./GalleryClient";

export const metadata: Metadata = {
	title: "Project Gallery",
	description:
		"Explore our portfolio of completed civil engineering and construction projects, including handrails, docks, seawalls, and bridges.",
};

export default async function GalleryPage() {
	// Pre-fetch some data if possible, or just pass empty defaults for client-side fetch
    // To make it fully SSR, we could call the logic behind /api/gallery here
    
    let categories: Array<{ id: string; label: string }> = [{ id: "all", label: "All Projects" }];
    let images: Array<{ category: string; title: string; image: string }> = [];
    
    try {
        // We can't use relative URLs in SSR easily without full base URL
        // So we'll let the client handle the initial fetch for now, 
        // or we could refactor the API logic to a shared lib.
        // For now, passing defaults is fine as the client will hydrate it.
    } catch (error) {
        console.error("Error in GalleryPage SSR:", error);
    }

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

			<GalleryClient initialCategories={categories} initialGallery={images} />

			<Footer />
		</div>
	);
}
