import { format, parseISO } from "date-fns";
import { getAllPosts, getPostBySlug } from "@/lib/blog";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Calendar, User } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface PostPageProps {
	params: Promise<{
		slug: string;
	}>;
}

export async function generateMetadata({
	params,
}: PostPageProps): Promise<Metadata> {
	const { slug } = await params;
	const post = getPostBySlug(slug, ["title", "excerpt", "coverImage"]);

	if (!post) {
		return {};
	}

	return {
		title: `${post.title} | Giralt Enterprises`,
		description: post.excerpt,
		openGraph: {
			title: post.title,
			description: post.excerpt,
			images: post.coverImage ? [post.coverImage] : [],
		},
	};
}

export async function generateStaticParams() {
	const posts = getAllPosts(["slug"]);

	return posts.map((post) => ({
		slug: post.slug,
	}));
}

export default async function PostPage({ params }: PostPageProps) {
	const { slug } = await params;
	const post = getPostBySlug(slug, [
		"title",
		"date",
		"slug",
		"author",
		"content",
		"coverImage",
	]);

	if (!post?.content) {
		notFound();
	}

	return (
		<main className="flex flex-col">
			{/* Simple Branded Header */}
			<section className="bg-linear-to-r from-[oklch(0.15_0.12_253)] to-[oklch(0.18_0.12_253)] text-primary-foreground py-12">
				<div className="container mx-auto px-4">
					<Link
						href="/blog"
						className="inline-flex items-center text-sm text-primary-foreground/70 hover:text-primary-foreground mb-6 transition-colors"
					>
						<ArrowLeft className="mr-2 h-4 w-4" />
						Back to Blog
					</Link>
					<h1 className="text-3xl md:text-5xl font-bold tracking-tight mb-6 leading-tight max-w-4xl">
						{post.title}
					</h1>
					<div className="flex flex-wrap items-center gap-6 text-sm text-primary-foreground/80">
						{post.author && (
							<div className="flex items-center gap-2">
								<User className="h-4 w-4" />
								<span>{post.author}</span>
							</div>
						)}
						{post.date && (
							<div className="flex items-center gap-2">
								<Calendar className="h-4 w-4" />
								<time dateTime={post.date}>
									{format(parseISO(post.date), "MMMM d, yyyy")}
								</time>
							</div>
						)}
					</div>
				</div>
			</section>

			{/* Article Content */}
			<article className="py-16 bg-background">
				<div className="container mx-auto px-4 max-w-4xl">
					{post.coverImage && (
						<div className="relative aspect-video mb-12 rounded-xl overflow-hidden shadow-2xl border">
							<img
								src={post.coverImage}
								alt={post.title}
								className="object-cover w-full h-full"
							/>
						</div>
					)}

					<div className="prose prose-neutral dark:prose-invert lg:prose-xl max-w-none prose-headings:font-bold prose-a:text-primary hover:prose-a:underline prose-img:rounded-xl">
						<MDXRemote source={post.content} />
					</div>

					<div className="mt-16 pt-8 border-t">
						<div className="flex items-center justify-between">
							<Badge variant="outline">Engineering Case Study</Badge>
							<Link
								href="/contact"
								className="text-primary font-medium hover:underline"
							>
								Inquire about your project →
							</Link>
						</div>
					</div>
				</div>
			</article>
		</main>
	);
}
