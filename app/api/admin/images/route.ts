import { type NextRequest, NextResponse } from "next/server";
import { isAuthenticated } from "@/lib/admin-auth";
import {
	addImage,
	deleteImage,
	getImageById,
	getImages,
	updateImage,
} from "@/lib/gallery-data";

export async function GET(request: NextRequest) {
	try {
		if (!(await isAuthenticated())) {
			return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
		}

		const searchParams = request.nextUrl.searchParams;
		const category = searchParams.get("category");
		const id = searchParams.get("id");

		if (id) {
			const image = getImageById(id);
			if (!image) {
				return NextResponse.json({ error: "Image not found" }, { status: 404 });
			}
			return NextResponse.json(image, {
				headers: {
					'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
					'Pragma': 'no-cache',
					'Expires': '0',
				},
			});
		}

		let images = getImages();
		if (category) {
			images = images.filter((img) => img.category === category);
		}

		return NextResponse.json(images, {
			headers: {
				'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
				'Pragma': 'no-cache',
				'Expires': '0',
			},
		});
	} catch (error) {
		console.error("Error fetching images:", error);
		return NextResponse.json(
			{ error: "Internal server error" },
			{ status: 500 },
		);
	}
}

export async function POST(request: NextRequest) {
	try {
		if (!(await isAuthenticated())) {
			return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
		}

		const body = await request.json();
		const { category, title, image } = body;

		if (!category || !title || !image) {
			return NextResponse.json(
				{ error: "Category, title, and image are required" },
				{ status: 400 },
			);
		}

		const result = await addImage({ category, title, image });
		return NextResponse.json({
			...result.image,
			commitSuccess: result.commitSuccess,
		}, { status: 201 });
	} catch (error) {
		console.error("Error creating image:", error);
		return NextResponse.json(
			{ error: "Internal server error" },
			{ status: 500 },
		);
	}
}

export async function PUT(request: NextRequest) {
	try {
		if (!(await isAuthenticated())) {
			return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
		}

		const body = await request.json();
		const { id, ...updates } = body;

		if (!id) {
			return NextResponse.json(
				{ error: "Image ID is required" },
				{ status: 400 },
			);
		}

		const result = await updateImage(id, updates);
		if (!result.image) {
			return NextResponse.json({ error: "Image not found" }, { status: 404 });
		}

		return NextResponse.json({
			...result.image,
			commitSuccess: result.commitSuccess,
		});
	} catch (error) {
		console.error("Error updating image:", error);
		return NextResponse.json(
			{ error: "Internal server error" },
			{ status: 500 },
		);
	}
}

export async function DELETE(request: NextRequest) {
	try {
		if (!(await isAuthenticated())) {
			return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
		}

		const searchParams = request.nextUrl.searchParams;
		const id = searchParams.get("id");

		if (!id) {
			return NextResponse.json(
				{ error: "Image ID is required" },
				{ status: 400 },
			);
		}

		const result = await deleteImage(id);
		if (!result.success) {
			return NextResponse.json({ error: "Image not found" }, { status: 404 });
		}

		return NextResponse.json({ 
			success: true,
			commitSuccess: result.commitSuccess,
		});
	} catch (error) {
		console.error("Error deleting image:", error);
		return NextResponse.json(
			{ error: "Internal server error" },
			{ status: 500 },
		);
	}
}
