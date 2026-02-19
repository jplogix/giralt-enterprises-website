import { getAllTags, getPostsByTag } from "@/lib/blog";
import BlogCard from "@/components/blog-card";
import { Metadata } from "next";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

interface TagPageProps {
	params: Promise<{
		tag: string;
	}>;
}

export async function generateMetadata({
	params,
}: TagPageProps): Promise<Metadata> {
	const { tag } = await params;
	const decodedTag = decodeURIComponent(tag);
    // Capitalize first letter
    const capitalizedTag = decodedTag.charAt(0).toUpperCase() + decodedTag.slice(1);

	return {
		title: `${capitalizedTag} - Blog | Giralt Enterprises`,
		description: `Articles and updates about ${decodedTag} from Giralt Enterprises.`,
        alternates: {
            canonical: `/blog/tag/${tag}`,
        },
	};
}

export async function generateStaticParams() {
	const tags = getAllTags();
	return tags.map((tag) => ({
		tag: tag,
	}));
}

export default async function TagPage({ params }: TagPageProps) {
	const { tag } = await params;
	const decodedTag = decodeURIComponent(tag);
    const capitalizedTag = decodedTag.charAt(0).toUpperCase() + decodedTag.slice(1);
	const posts = getPostsByTag(decodedTag);

	return (
		<div className="flex flex-col min-h-screen">
			{/* Hero Section */}
			<section className="relative bg-linear-to-br from-[oklch(0.15_0.12_253)] via-primary to-[oklch(0.18_0.12_253)] text-primary-foreground overflow-hidden py-16">
				<div className="absolute inset-0 bg-[url('/blueprint-pattern.jpg')] opacity-20 bg-repeat invert" />
				<div className="container mx-auto px-4 relative z-10">
                    <Link
						href="/blog"
						className="inline-flex items-center text-sm text-primary-foreground/70 hover:text-primary-foreground mb-6 transition-colors"
					>
						<ArrowLeft className="mr-2 h-4 w-4" />
						Back to All Posts
					</Link>
					<Badge
						variant="secondary"
						className="mb-4 bg-primary-foreground/10 text-primary-foreground border-primary-foreground/20"
					>
						Topic
					</Badge>
					<h1 className="text-3xl md:text-5xl font-bold mb-4 tracking-tight capitalize">
						{decodedTag}
					</h1>
					<p className="text-lg text-primary-foreground/80 max-w-2xl text-pretty">
						{posts.length} {posts.length === 1 ? 'article' : 'articles'} tagged with &ldquo;{capitalizedTag}&rdquo;
					</p>
				</div>
			</section>

			{/* Main Content */}
			<section className="py-20 bg-background flex-1">
				<div className="container mx-auto px-4">
					{posts.length > 0 ? (
						<div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
							{posts.map((post) => (
								<BlogCard key={post.slug} post={post} />
							))}
						</div>
					) : (
						<div className="text-center py-20">
							<h2 className="text-2xl font-bold mb-4">No posts found</h2>
							<p className="text-muted-foreground mb-8">
								We couldn't find any articles tagged with "{decodedTag}".
							</p>
                            <Link href="/blog" className="text-primary hover:underline">
                                View all posts
                            </Link>
						</div>
					)}
				</div>
			</section>
		</div>
	);
}
