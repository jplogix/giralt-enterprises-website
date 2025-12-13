import { existsSync } from "node:fs";
import { mkdir, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { type NextRequest, NextResponse } from "next/server";
import { isAuthenticated } from "@/lib/admin-auth";

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
const ALLOWED_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

export async function POST(request: NextRequest) {
	try {
		if (!(await isAuthenticated())) {
			return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
		}

		const formData = await request.formData();
		const file = formData.get("file") as File;
		const category = formData.get("category") as string;

		if (!file) {
			return NextResponse.json({ error: "No file provided" }, { status: 400 });
		}

		if (!category) {
			return NextResponse.json(
				{ error: "Category is required" },
				{ status: 400 },
			);
		}

		// Validate file type
		if (!ALLOWED_TYPES.includes(file.type)) {
			return NextResponse.json(
				{ error: "Invalid file type. Only JPEG, PNG, and WebP are allowed." },
				{ status: 400 },
			);
		}

		// Validate file size
		if (file.size > MAX_FILE_SIZE) {
			return NextResponse.json(
				{ error: "File size exceeds 10MB limit" },
				{ status: 400 },
			);
		}

		// Generate safe filename
		const timestamp = Date.now();
		const originalName = file.name.replace(/[^a-zA-Z0-9.-]/g, "_");
		const filename = `${timestamp}_${originalName}`;

		// Determine upload path based on category
		const categoryPath = category.replace(/-/g, "_");
		const isProduction =
			process.env.VERCEL === "1" || process.env.NODE_ENV === "production";

		if (isProduction) {
			// In production (Vercel), commit image file to git automatically
			const githubToken = process.env.GITHUB_TOKEN;
			const githubRepo = process.env.GITHUB_REPO;

			if (!githubToken || !githubRepo) {
				return NextResponse.json(
					{
						error:
							"GitHub integration not configured. Please set GITHUB_TOKEN and GITHUB_REPO environment variables to upload images.",
						configured: false,
					},
					{ status: 400 },
				);
			}

			// Validate repository format
			if (!githubRepo.includes("/")) {
				return NextResponse.json(
					{
						error:
							"Invalid GITHUB_REPO format. Expected format: owner/repo (e.g., username/repository-name)",
						configured: false,
					},
					{ status: 400 },
				);
			}

			// Read file as base64
			const bytes = await file.arrayBuffer();
			const buffer = Buffer.from(bytes);
			const fileContentBase64 = buffer.toString("base64");

			const [owner, repo] = githubRepo.split("/");

			if (!owner || !repo) {
				return NextResponse.json(
					{
						error:
							"Invalid GITHUB_REPO format. Could not parse owner and repository name.",
						configured: false,
					},
					{ status: 400 },
				);
			}

			const filePath = `public/images/giralt/${categoryPath}/${filename}`;
			const branch = process.env.GITHUB_BRANCH || "main";

			// First, verify the repository and branch exist
			const authHeader =
				githubToken.startsWith("ghp_") || githubToken.startsWith("github_pat_")
					? `Bearer ${githubToken}`
					: `token ${githubToken}`;

			const repoCheckResponse = await fetch(
				`https://api.github.com/repos/${owner}/${repo}`,
				{
					headers: {
						Authorization: authHeader,
						Accept: "application/vnd.github.v3+json",
					},
				},
			);

			if (!repoCheckResponse.ok) {
				const repoError = await repoCheckResponse
					.json()
					.catch(() => ({ message: "Unknown error" }));
				console.error("Repository check failed:", repoError);

				if (repoCheckResponse.status === 404) {
					return NextResponse.json(
						{
							error: `Repository not found: ${githubRepo}. Please verify GITHUB_REPO is correct.`,
							details: repoError.message,
						},
						{ status: 404 },
					);
				} else if (
					repoCheckResponse.status === 401 ||
					repoCheckResponse.status === 403
				) {
					return NextResponse.json(
						{
							error:
								"GitHub authentication failed. Please verify GITHUB_TOKEN has access to this repository.",
							details: repoError.message,
						},
						{ status: repoCheckResponse.status },
					);
				}
			}

			// Check if file already exists (404 is expected for new files)
			const getFileResponse = await fetch(
				`https://api.github.com/repos/${owner}/${repo}/contents/${filePath}?ref=${encodeURIComponent(branch)}`,
				{
					headers: {
						Authorization: authHeader,
						Accept: "application/vnd.github.v3+json",
					},
				},
			);

			let sha: string | undefined;
			if (getFileResponse.ok) {
				const fileData = await getFileResponse.json();
				sha = fileData.sha;
			} else if (getFileResponse.status === 404) {
				// File doesn't exist yet - that's fine, we'll create it
				sha = undefined;
			} else {
				// Real error
				const errorData = await getFileResponse
					.json()
					.catch(() => ({ message: "Unknown error" }));
				console.error("Error checking file:", {
					status: getFileResponse.status,
					statusText: getFileResponse.statusText,
					error: errorData,
				});

				return NextResponse.json(
					{
						error: errorData.message || "Failed to check file in repository",
						details: `Status: ${getFileResponse.status}. Path: ${filePath}`,
						debug: {
							owner,
							repo,
							branch,
							filePath,
						},
					},
					{ status: getFileResponse.status },
				);
			}

			// Commit the image file to git
			const commitBody: {
				message: string;
				content: string;
				branch: string;
				sha?: string;
			} = {
				message: `Add image: ${filename}`,
				content: fileContentBase64,
				branch: process.env.GITHUB_BRANCH || "main",
			};

			if (sha) {
				commitBody.sha = sha;
			}

			const commitResponse = await fetch(
				`https://api.github.com/repos/${owner}/${repo}/contents/${filePath}`,
				{
					method: "PUT",
					headers: {
						Authorization: authHeader,
						Accept: "application/vnd.github.v3+json",
						"Content-Type": "application/json",
					},
					body: JSON.stringify(commitBody),
				},
			);

			if (!commitResponse.ok) {
				const error = await commitResponse
					.json()
					.catch(() => ({ message: "Unknown error" }));
				console.error("GitHub API commit error:", {
					status: commitResponse.status,
					statusText: commitResponse.statusText,
					error,
					filePath,
					branch,
				});

				let errorMessage = error.message || "Failed to commit image to GitHub";
				if (commitResponse.status === 404) {
					errorMessage = `Repository, branch, or path not found. Verify GITHUB_REPO (${githubRepo}) and GITHUB_BRANCH (${branch}) are correct. Path: ${filePath}`;
				} else if (commitResponse.status === 403) {
					errorMessage =
						'GitHub token does not have permission to write to this repository. Check token has "repo" scope and write access.';
				} else if (commitResponse.status === 422) {
					errorMessage =
						error.message ||
						`Invalid request. The file path (${filePath}) or content may be invalid.`;
				}

				return NextResponse.json(
					{
						error: errorMessage,
						details:
							error.message ||
							error.details ||
							"No additional details available",
						status: commitResponse.status,
						debug: {
							owner,
							repo,
							branch,
							filePath,
							hasSha: !!sha,
						},
					},
					{ status: commitResponse.status },
				);
			}

			// Return the public URL path
			const publicPath = `/images/giralt/${categoryPath}/${filename}`;

			return NextResponse.json({
				success: true,
				path: publicPath,
				filename,
			});
		} else {
			// In development, write to local filesystem
			const uploadDir = join(
				process.cwd(),
				"public",
				"images",
				"giralt",
				categoryPath,
			);

			// Create directory if it doesn't exist
			if (!existsSync(uploadDir)) {
				await mkdir(uploadDir, { recursive: true });
			}

			const filePath = join(uploadDir, filename);
			const bytes = await file.arrayBuffer();
			const buffer = Buffer.from(bytes);

			await writeFile(filePath, buffer);

			// Return the public URL path
			const publicPath = `/images/giralt/${categoryPath}/${filename}`;

			return NextResponse.json({
				success: true,
				path: publicPath,
				filename,
			});
		}
	} catch (error) {
		console.error("Upload error:", error);
		return NextResponse.json(
			{ error: "Failed to upload file" },
			{ status: 500 },
		);
	}
}
