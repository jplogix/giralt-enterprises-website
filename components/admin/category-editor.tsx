"use client";

import { Edit, Loader2, Plus, Trash2 } from "lucide-react";
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
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
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
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";

interface Category {
	id: string;
	label: string;
}

interface CategoryEditorProps {
	categories: Category[];
	onUpdate: () => void;
}

export function CategoryEditor({ categories, onUpdate }: CategoryEditorProps) {
	const [editingCategory, setEditingCategory] = useState<Category | null>(null);
	const [deletingCategory, setDeletingCategory] = useState<Category | null>(
		null,
	);
	const [showAddDialog, setShowAddDialog] = useState(false);
	const [newCategoryId, setNewCategoryId] = useState("");
	const [newCategoryLabel, setNewCategoryLabel] = useState("");
	const [editLabel, setEditLabel] = useState("");
	const [loading, setLoading] = useState(false);

	const handleAdd = async () => {
		if (!newCategoryId || !newCategoryLabel) {
			toast.error("Please fill in all fields");
			return;
		}

		// Validate ID format (lowercase, hyphens only)
		const validId = newCategoryId.toLowerCase().replace(/[^a-z0-9-]/g, "-");
		if (validId !== newCategoryId.toLowerCase()) {
			toast.error("Category ID must be lowercase with hyphens only");
			return;
		}

		setLoading(true);
		try {
			const response = await fetch("/api/admin/categories", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					id: validId,
					label: newCategoryLabel,
				}),
			});

			if (!response.ok) {
				const error = await response.json();
				throw new Error(error.error || "Failed to create category");
			}

			toast.success("Category created successfully");
			setShowAddDialog(false);
			setNewCategoryId("");
			setNewCategoryLabel("");
			onUpdate();
		} catch (error) {
			toast.error(
				error instanceof Error ? error.message : "Failed to create category",
			);
		} finally {
			setLoading(false);
		}
	};

	const handleEdit = (category: Category) => {
		setEditingCategory(category);
		setEditLabel(category.label);
	};

	const handleSave = async () => {
		if (!editingCategory || !editLabel) return;

		setLoading(true);
		try {
			const response = await fetch("/api/admin/categories", {
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					id: editingCategory.id,
					label: editLabel,
				}),
			});

			if (!response.ok) {
				const error = await response.json();
				throw new Error(error.error || "Failed to update category");
			}

			toast.success("Category updated successfully");
			setEditingCategory(null);
			onUpdate();
		} catch (error) {
			toast.error(
				error instanceof Error ? error.message : "Failed to update category",
			);
		} finally {
			setLoading(false);
		}
	};

	const handleDelete = async () => {
		if (!deletingCategory) return;

		setLoading(true);
		try {
			const response = await fetch(
				`/api/admin/categories?id=${deletingCategory.id}`,
				{
					method: "DELETE",
				},
			);

			if (!response.ok) {
				const error = await response.json();
				throw new Error(error.error || "Failed to delete category");
			}

			toast.success("Category deleted successfully");
			setDeletingCategory(null);
			onUpdate();
		} catch (error) {
			toast.error(
				error instanceof Error ? error.message : "Failed to delete category",
			);
		} finally {
			setLoading(false);
		}
	};

	return (
		<>
			<Card>
				<CardHeader>
					<div className="flex items-center justify-between">
						<div>
							<CardTitle>Categories</CardTitle>
							<CardDescription>Manage image categories</CardDescription>
						</div>
						<Button onClick={() => setShowAddDialog(true)}>
							<Plus className="h-4 w-4 mr-2" />
							Add Category
						</Button>
					</div>
				</CardHeader>
				<CardContent>
					{categories.length === 0 ? (
						<div className="text-center py-8 text-muted-foreground">
							No categories yet. Add your first category to get started.
						</div>
					) : (
						<Table>
							<TableHeader>
								<TableRow>
									<TableHead>ID</TableHead>
									<TableHead>Label</TableHead>
									<TableHead className="text-right">Actions</TableHead>
								</TableRow>
							</TableHeader>
							<TableBody>
								{categories.map((category) => (
									<TableRow key={category.id}>
										<TableCell className="font-mono text-sm">
											{category.id}
										</TableCell>
										<TableCell>{category.label}</TableCell>
										<TableCell className="text-right">
											<div className="flex justify-end gap-2">
												<Button
													variant="outline"
													size="sm"
													onClick={() => handleEdit(category)}
												>
													<Edit className="h-4 w-4" />
												</Button>
												<Button
													variant="destructive"
													size="sm"
													onClick={() => setDeletingCategory(category)}
												>
													<Trash2 className="h-4 w-4" />
												</Button>
											</div>
										</TableCell>
									</TableRow>
								))}
							</TableBody>
						</Table>
					)}
				</CardContent>
			</Card>

			<Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>Add Category</DialogTitle>
						<DialogDescription>Create a new image category</DialogDescription>
					</DialogHeader>
					<div className="space-y-4 py-4">
						<div className="space-y-2">
							<Label htmlFor="category-id">Category ID</Label>
							<Input
								id="category-id"
								value={newCategoryId}
								onChange={(e) =>
									setNewCategoryId(
										e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, "-"),
									)
								}
								placeholder="e.g., custom-category"
							/>
							<p className="text-xs text-muted-foreground">
								Lowercase letters, numbers, and hyphens only
							</p>
						</div>
						<div className="space-y-2">
							<Label htmlFor="category-label">Label</Label>
							<Input
								id="category-label"
								value={newCategoryLabel}
								onChange={(e) => setNewCategoryLabel(e.target.value)}
								placeholder="e.g., Custom Category"
							/>
						</div>
					</div>
					<DialogFooter>
						<Button
							variant="outline"
							onClick={() => setShowAddDialog(false)}
							disabled={loading}
						>
							Cancel
						</Button>
						<Button onClick={handleAdd} disabled={loading}>
							{loading ? (
								<>
									<Loader2 className="h-4 w-4 mr-2 animate-spin" />
									Creating...
								</>
							) : (
								"Create"
							)}
						</Button>
					</DialogFooter>
				</DialogContent>
			</Dialog>

			<Dialog
				open={!!editingCategory}
				onOpenChange={(open) => !open && setEditingCategory(null)}
			>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>Edit Category</DialogTitle>
						<DialogDescription>Update the category label</DialogDescription>
					</DialogHeader>
					<div className="space-y-4 py-4">
						<div className="space-y-2">
							<Label htmlFor="edit-label">Label</Label>
							<Input
								id="edit-label"
								value={editLabel}
								onChange={(e) => setEditLabel(e.target.value)}
							/>
						</div>
						<p className="text-xs text-muted-foreground">
							Category ID:{" "}
							<span className="font-mono">{editingCategory?.id}</span>
						</p>
					</div>
					<DialogFooter>
						<Button
							variant="outline"
							onClick={() => setEditingCategory(null)}
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
				open={!!deletingCategory}
				onOpenChange={(open) => !open && setDeletingCategory(null)}
			>
				<AlertDialogContent>
					<AlertDialogHeader>
						<AlertDialogTitle>Delete Category</AlertDialogTitle>
						<AlertDialogDescription>
							Are you sure you want to delete &quot;{deletingCategory?.label}
							&quot;? This action cannot be undone. Categories with existing
							images cannot be deleted.
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
