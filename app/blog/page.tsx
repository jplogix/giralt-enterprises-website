import { getAllPosts } from "@/lib/blog";
import BlogCard from "@/components/blog-card";
import { Metadata } from "next";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = {
	title: "Blog | Giralt Enterprises",
	description: "Latest insights and project updates from our engineering team.",
};

export default function BlogIndexPage() {
	const posts = getAllPosts([
		"title",
		"date",
		"slug",
		"author",
		"coverImage",
		"excerpt",
	]);

	return (
		<div className="flex flex-col">
			{/* Hero Section */}
			<section className="relative bg-linear-to-br from-[oklch(0.15_0.12_253)] via-primary to-[oklch(0.18_0.12_253)] text-primary-foreground overflow-hidden">
				<div className="absolute inset-0 bg-[url('/blueprint-pattern.jpg')] opacity-20 bg-repeat invert" />
				<div className="absolute inset-0 bg-linear-to-b from-transparent via-[oklch(0.15_0.12_253)]/50 to-[oklch(0.15_0.12_253)]" />
				<div className="container mx-auto px-4 py-16 md:py-24 relative z-10 text-center">
					<Badge
						variant="secondary"
						className="mb-6 bg-primary-foreground/10 text-primary-foreground border-primary-foreground/20"
					>
						Company Updates
					</Badge>
					<h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">
						Engineering Blog
					</h1>
					<p className="text-xl md:text-2xl text-primary-foreground/90 max-w-2xl mx-auto text-pretty">
						Insights from our 35+ years of experience in civil engineering and
						construction products.
					</p>
				</div>
			</section>

			{/* Main Content */}
			<section className="py-20 bg-background">
				<div className="container mx-auto px-4">
					<div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
						{posts.map((post) => (
							<BlogCard key={post.slug} post={post} />
						))}
					</div>
				</div>
			</section>
		</div>
	);
}
