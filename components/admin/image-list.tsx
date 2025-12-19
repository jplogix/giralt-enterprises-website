"use client";

import { CheckCircle2, Edit, Loader2, Trash2 } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { toast } from "sonner";
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";

interface GalleryImage {
	id: string;
	category: string;
	title: string;
	image: string;
	createdAt: string;
	updatedAt: string;
}

interface ImageListProps {
	images: GalleryImage[];
	categories: Array<{ id: string; label: string }>;
	onUpdate: () => void;
}

export function ImageList({ images, categories, onUpdate }: ImageListProps) {
	const [editingImage, setEditingImage] = useState<GalleryImage | null>(null);
	const [deletingImage, setDeletingImage] = useState<GalleryImage | null>(null);
	const [editTitle, setEditTitle] = useState("");
	const [editCategory, setEditCategory] = useState("");
	const [loading, setLoading] = useState(false);

	const handleEdit = (image: GalleryImage) => {
		setEditingImage(image);
		setEditTitle(image.title);
		setEditCategory(image.category);
	};

	const handleSave = async () => {
		if (!editingImage) return;

		setLoading(true);
		const loadingToast = toast.loading("Saving changes...", {
			description: "Please wait while we save and commit your changes.",
		});

		try {
			const response = await fetch("/api/admin/images", {
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					id: editingImage.id,
					title: editTitle,
					category: editCategory,
				}),
			});

			if (!response.ok) {
				const error = await response.json();
				throw new Error(error.error || "Failed to update image");
			}

			const result = await response.json();

			// Dismiss loading toast
			toast.dismiss(loadingToast);

			if (result.commitSuccess) {
				toast.success("Changes saved and live!", {
					description: `"${editTitle}" is now visible on the frontend. Changes are reflected immediately across all pages.`,
					icon: <CheckCircle2 className="h-5 w-5" />,
					duration: 5000,
				});
			} else {
				toast.warning("Changes saved locally", {
					description: `"${editTitle}" has been saved but may take a few minutes to appear on the frontend.`,
					duration: 5000,
				});
			}

			setEditingImage(null);
			onUpdate();
		} catch (error) {
			toast.dismiss(loadingToast);
			toast.error(
				error instanceof Error ? error.message : "Failed to update image",
			);
		} finally {
			setLoading(false);
		}
	};

	const handleDelete = async () => {
		if (!deletingImage) return;

		setLoading(true);
		const loadingToast = toast.loading("Deleting image...", {
			description: "Please wait while we delete and commit your changes.",
		});

		try {
			const response = await fetch(`/api/admin/images?id=${deletingImage.id}`, {
				method: "DELETE",
			});

			if (!response.ok) {
				const error = await response.json();
				throw new Error(error.error || "Failed to delete image");
			}

			const result = await response.json();

			// Dismiss loading toast
			toast.dismiss(loadingToast);

			if (result.commitSuccess) {
				toast.success("Image deleted and changes are live!", {
					description: `"${deletingImage.title}" has been removed. Changes are reflected immediately across all pages.`,
					icon: <CheckCircle2 className="h-5 w-5" />,
					duration: 5000,
				});
			} else {
				toast.warning("Image deleted locally", {
					description: `"${deletingImage.title}" has been deleted but may take a few minutes to disappear from the frontend.`,
					duration: 5000,
				});
			}

			setDeletingImage(null);
			onUpdate();
		} catch (error) {
			toast.dismiss(loadingToast);
			toast.error(
				error instanceof Error ? error.message : "Failed to delete image",
			);
		} finally {
			setLoading(false);
		}
	};

	const getCategoryLabel = (categoryId: string) => {
		return categories.find((cat) => cat.id === categoryId)?.label || categoryId;
	};

	return (
		<>
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
				{images.map((image) => (
					<Card key={image.id} className="overflow-hidden">
						<div className="relative h-48">
							<Image
								src={image.image}
								alt={image.title}
								fill
								className="object-cover"
							/>
						</div>
						<div className="p-4">
							<h3 className="font-semibold mb-1 truncate">{image.title}</h3>
							<p className="text-sm text-muted-foreground mb-3">
								{getCategoryLabel(image.category)}
							</p>
							<div className="flex gap-2">
								<Button
									variant="outline"
									size="sm"
									onClick={() => handleEdit(image)}
									className="flex-1"
								>
									<Edit className="h-4 w-4 mr-2" />
									Edit
								</Button>
								<Button
									variant="destructive"
									size="sm"
									onClick={() => setDeletingImage(image)}
									className="flex-1"
								>
									<Trash2 className="h-4 w-4 mr-2" />
									Delete
								</Button>
							</div>
						</div>
					</Card>
				))}
			</div>

			<Dialog
				open={!!editingImage}
				onOpenChange={(open) => !open && setEditingImage(null)}
			>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>Edit Image</DialogTitle>
						<DialogDescription>
							Update the image title and category
						</DialogDescription>
					</DialogHeader>
					<div className="space-y-4 py-4">
						<div className="space-y-2">
							<Label htmlFor="edit-title">Title</Label>
							<Input
								id="edit-title"
								value={editTitle}
								onChange={(e) => setEditTitle(e.target.value)}
							/>
						</div>
						<div className="space-y-2">
							<Label htmlFor="edit-category">Category</Label>
							<Select value={editCategory} onValueChange={setEditCategory}>
								<SelectTrigger>
									<SelectValue />
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
					</div>
					<DialogFooter>
						<Button
							variant="outline"
							onClick={() => setEditingImage(null)}
							disabled={loading}
						>
							Cancel
						</Button>
						<Button onClick={handleSave} disabled={loading}>
							{loading ? (
								<>
									<Loader2 className="h-4 w-4 mr-2 animate-spin" />
									Saving...
								</>
							) : (
								"Save"
							)}
						</Button>
					</DialogFooter>
				</DialogContent>
			</Dialog>

			<AlertDialog
				open={!!deletingImage}
				onOpenChange={(open) => !open && setDeletingImage(null)}
			>
				<AlertDialogContent>
					<AlertDialogHeader>
						<AlertDialogTitle>Delete Image</AlertDialogTitle>
						<AlertDialogDescription>
							Are you sure you want to delete &quot;{deletingImage?.title}
							&quot;? This action cannot be undone.
						</AlertDialogDescription>
					</AlertDialogHeader>
					<AlertDialogFooter>
						<AlertDialogCancel disabled={loading}>Cancel</AlertDialogCancel>
						<AlertDialogAction
							onClick={handleDelete}
							disabled={loading}
							className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
						>
							{loading ? (
								<>
									<Loader2 className="h-4 w-4 mr-2 animate-spin" />
									Deleting...
								</>
							) : (
								"Delete"
							)}
						</AlertDialogAction>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialog>
		</>
	);
}
