import { NextResponse } from "next/server";
import { getGalleryData } from "@/lib/gallery-data";

export async function GET() {
	try {
		const data = getGalleryData();

		// Add "all" category for filtering
		const categories = [
			{ id: "all", label: "All Projects" },
			...data.categories,
		];

		return NextResponse.json(
			{
				categories,
				images: data.images,
			},
			{
				headers: {
					"Cache-Control":
						"no-store, no-cache, must-revalidate, proxy-revalidate",
					Pragma: "no-cache",
					Expires: "0",
				},
			},
		);
	} catch (error) {
		console.error("Error fetching gallery data:", error);
		return NextResponse.json(
			{ error: "Internal server error" },
			{ status: 500 },
		);
	}
}
