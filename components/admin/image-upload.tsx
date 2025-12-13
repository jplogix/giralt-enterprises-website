"use client";

import { Loader2, Upload, X } from "lucide-react";
import Image from "next/image";
import { useRef, useState } from "react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";

interface ImageUploadProps {
	categories: Array<{ id: string; label: string }>;
	onSuccess?: () => void;
}

export function ImageUpload({ categories, onSuccess }: ImageUploadProps) {
	const [file, setFile] = useState<File | null>(null);
	const [preview, setPreview] = useState<string | null>(null);
	const [title, setTitle] = useState("");
	const [category, setCategory] = useState("");
	const [uploading, setUploading] = useState(false);
	const [error, setError] = useState("");
	const [success, setSuccess] = useState(false);
	const fileInputRef = useRef<HTMLInputElement>(null);

	const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
		const selectedFile = e.target.files?.[0];
		if (selectedFile) {
			setFile(selectedFile);
			setError("");
			setSuccess(false);

			// Create preview
			const reader = new FileReader();
			reader.onloadend = () => {
				setPreview(reader.result as string);
			};
			reader.readAsDataURL(selectedFile);

			// Auto-generate title from filename if empty
			if (!title) {
				const nameWithoutExt = selectedFile.name.replace(/\.[^/.]+$/, "");
				setTitle(
					nameWithoutExt
						.replace(/[_-]/g, " ")
						.replace(/\b\w/g, (l) => l.toUpperCase()),
				);
			}
		}
	};

	const handleDragOver = (e: React.DragEvent) => {
		e.preventDefault();
		e.stopPropagation();
	};

	const handleDrop = (e: React.DragEvent) => {
		e.preventDefault();
		e.stopPropagation();

		const droppedFile = e.dataTransfer.files?.[0];
		if (droppedFile?.type.startsWith("image/")) {
			setFile(droppedFile);
			setError("");
			setSuccess(false);

			const reader = new FileReader();
			reader.onloadend = () => {
				setPreview(reader.result as string);
			};
			reader.readAsDataURL(droppedFile);

			if (!title) {
				const nameWithoutExt = droppedFile.name.replace(/\.[^/.]+$/, "");
				setTitle(
					nameWithoutExt
						.replace(/[_-]/g, " ")
						.replace(/\b\w/g, (l) => l.toUpperCase()),
				);
			}
		} else {
			setError("Please drop an image file");
		}
	};

	const handleUpload = async () => {
		if (!file || !title || !category) {
			setError("Please fill in all fields and select an image");
			return;
		}

		setUploading(true);
		setError("");
		setSuccess(false);

		try {
			// First upload the file
			const formData = new FormData();
			formData.append("file", file);
			formData.append("category", category);

			const uploadResponse = await fetch("/api/admin/images/upload", {
				method: "POST",
				body: formData,
			});

			if (!uploadResponse.ok) {
				const errorData = await uploadResponse.json();
				const errorMessage = errorData.error || "Upload failed";
				const errorDetails = errorData.details
					? `\n\nDetails: ${errorData.details}`
					: "";
				const debugInfo = errorData.debug
					? `\n\nDebug: ${JSON.stringify(errorData.debug, null, 2)}`
					: "";
				throw new Error(`${errorMessage}${errorDetails}${debugInfo}`);
			}

			const uploadData = await uploadResponse.json();

			// Check if upload was successful and has a path
			if (!uploadData.path) {
				throw new Error(
					uploadData.error || "Image upload failed - no path returned",
				);
			}

			// If there's a note about git commit needed, show it as a warning but continue
			if (uploadData.note) {
				console.warn("Upload note:", uploadData.note);
			}

			// Then create the image record
			const createResponse = await fetch("/api/admin/images", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					category,
					title,
					image: uploadData.path,
				}),
			});

			if (!createResponse.ok) {
				const errorData = await createResponse.json();
				throw new Error(errorData.error || "Failed to create image record");
			}

			setSuccess(true);
			setFile(null);
			setPreview(null);
			setTitle("");
			setCategory("");
			if (fileInputRef.current) {
				fileInputRef.current.value = "";
			}

			if (onSuccess) {
				onSuccess();
			}
		} catch (err) {
			setError(err instanceof Error ? err.message : "Upload failed");
		} finally {
			setUploading(false);
		}
	};

	const handleRemove = () => {
		setFile(null);
		setPreview(null);
		if (fileInputRef.current) {
			fileInputRef.current.value = "";
		}
	};

	return (
		<Card>
			<CardHeader>
				<CardTitle>Upload Image</CardTitle>
				<CardDescription>Upload a new image to the gallery</CardDescription>
			</CardHeader>
			<CardContent className="space-y-4">
				{error && (
					<Alert variant="destructive">
						<AlertDescription>{error}</AlertDescription>
					</Alert>
				)}

				{success && (
					<Alert>
						<AlertDescription>Image uploaded successfully!</AlertDescription>
					</Alert>
				)}

				<button
					type="button"
					className="border-2 border-dashed rounded-lg p-8 text-center cursor-pointer hover:border-primary transition-colors w-full bg-transparent"
					onDragOver={handleDragOver}
					onDrop={handleDrop}
					onClick={() => fileInputRef.current?.click()}
					aria-label="Upload image by clicking or dragging and dropping"
				>
					{preview ? (
						<div className="relative">
							<div className="relative w-full h-64 mb-4 rounded-lg overflow-hidden">
								<Image
									src={preview}
									alt="Preview"
									fill
									className="object-contain"
								/>
							</div>
							<Button
								variant="outline"
								size="sm"
								onClick={(e) => {
									e.stopPropagation();
									handleRemove();
								}}
							>
								<X className="h-4 w-4 mr-2" />
								Remove
							</Button>
						</div>
					) : (
						<div className="space-y-2">
							<Upload className="h-12 w-12 mx-auto text-muted-foreground" />
							<div>
								<p className="text-sm font-medium">
									Click to upload or drag and drop
								</p>
								<p className="text-xs text-muted-foreground mt-1">
									PNG, JPG, WebP up to 10MB
								</p>
							</div>
						</div>
					)}
					<input
						ref={fileInputRef}
						type="file"
						accept="image/*"
						onChange={handleFileSelect}
						className="hidden"
					/>
				</button>

				<div className="space-y-4">
					<div className="space-y-2">
						<Label htmlFor="title">Title</Label>
						<Input
							id="title"
							value={title}
							onChange={(e) => setTitle(e.target.value)}
							placeholder="Enter image title"
						/>
					</div>

					<div className="space-y-2">
						<Label htmlFor="category">Category</Label>
						<Select value={category} onValueChange={setCategory}>
							<SelectTrigger>
								<SelectValue placeholder="Select a category" />
							</SelectTrigger>
							<SelectContent>
								{categories.map((cat) => (
									<SelectItem key={cat.id} value={cat.id}>
										{cat.label}
									</SelectItem>
								))}
							</SelectContent>
						</Select>
					</div>

					<Button
						onClick={handleUpload}
						disabled={!file || !title || !category || uploading}
						className="w-full"
					>
						{uploading ? (
							<>
								<Loader2 className="h-4 w-4 mr-2 animate-spin" />
								Uploading...
							</>
						) : (
							<>
								<Upload className="h-4 w-4 mr-2" />
								Upload Image
							</>
						)}
					</Button>
				</div>
			</CardContent>
		</Card>
	);
}
