import { NextResponse } from "next/server";
import github from "@/lib/github";

const REPO = process.env.GITHUB_REPO || "";
const BRANCH = process.env.GITHUB_BRANCH || "main";
const ADMIN_TOKEN = process.env.ADMIN_TOKEN || "";

export async function POST(request: Request) {
	const auth = request.headers.get("authorization") || "";
	if (!ADMIN_TOKEN || auth !== `Bearer ${ADMIN_TOKEN}`) {
		return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
	}

	const body = await request.json();
	const { filename, contentBase64, category, title, alt } = body;
	if (!filename || !contentBase64 || !category) {
		return NextResponse.json({ error: "Missing fields" }, { status: 400 });
	}

	const filePath = `public/images/giralt/${category}/${filename}`;
	try {
		await github.uploadFileToRepo(
			REPO,
			BRANCH,
			filePath,
			contentBase64,
			`Add image ${filePath}`,
		);

		// update metadata file
		const jsonPath = "data/images.json";
		await github.updateJsonFile(
			REPO,
			BRANCH,
			jsonPath,
			(current: any) => {
				const now = new Date().toISOString();
				const entry = {
					id: `giralt/${category}/${filename.replace(/\.[^/.]+$/, "")}`,
					title: title || filename,
					category,
					path: `/images/giralt/${category}/${filename}`,
					url: `/images/giralt/${category}/${filename}`,
					source: "repo",
					alt: alt || "",
					dateAdded: now,
				};
				current.images = current.images || [];
				current.images.push(entry);
				return current;
			},
			`Add metadata for ${filename}`,
		);

		return NextResponse.json({
			ok: true,
			path: `/images/giralt/${category}/${filename}`,
		});
	} catch (err: any) {
		return NextResponse.json(
			{ error: err.message || String(err) },
			{ status: 500 },
		);
	}
}
