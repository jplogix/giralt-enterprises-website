import { type NextRequest, NextResponse } from "next/server";
import { isAuthenticated } from "@/lib/admin-auth";
import {
	addCategory,
	deleteCategory,
	getCategories,
	updateCategory,
} from "@/lib/gallery-data";

export async function GET() {
	try {
		if (!(await isAuthenticated())) {
			return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
		}

		const categories = getCategories();
		return NextResponse.json(categories);
	} catch (error) {
		console.error("Error fetching categories:", error);
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
		const { id, label } = body;

		if (!id || !label) {
			return NextResponse.json(
				{ error: "ID and label are required" },
				{ status: 400 },
			);
		}

		const newCategory = await addCategory({ id, label });
		return NextResponse.json(newCategory, { status: 201 });
	} catch (error) {
		console.error("Error creating category:", error);
		if (error instanceof Error && error.message === "Category already exists") {
			return NextResponse.json({ error: error.message }, { status: 409 });
		}
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
				{ error: "Category ID is required" },
				{ status: 400 },
			);
		}

		const updatedCategory = await updateCategory(id, updates);
		if (!updatedCategory) {
			return NextResponse.json(
				{ error: "Category not found" },
				{ status: 404 },
			);
		}

		return NextResponse.json(updatedCategory);
	} catch (error) {
		console.error("Error updating category:", error);
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
				{ error: "Category ID is required" },
				{ status: 400 },
			);
		}

		await deleteCategory(id);
		return NextResponse.json({ success: true });
	} catch (error) {
		console.error("Error deleting category:", error);
		if (
			error instanceof Error &&
			error.message.includes("Cannot delete category")
		) {
			return NextResponse.json({ error: error.message }, { status: 409 });
		}
		return NextResponse.json(
			{ error: "Internal server error" },
			{ status: 500 },
		);
	}
}
