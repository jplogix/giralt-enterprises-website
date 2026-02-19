import { format, parseISO } from "date-fns";
import { getAllPosts, getPostBySlug, getRelatedPosts } from "@/lib/blog";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Calendar, User, Tag } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import BlogCard from "@/components/blog-card";

interface PostPageProps {
	params: Promise<{
		slug: string;
	}>;
}

export async function generateMetadata({
	params,
}: PostPageProps): Promise<Metadata> {
	const { slug } = await params;
	const post = getPostBySlug(slug, [
		"title",
		"excerpt",
		"coverImage",
		"seo",
		"date",
		"author",
	]);

	if (!post) {
		return {};
	}

	const baseUrl = "https://giralt-enterprises.vercel.app";
	const ogImage = post.seo?.image || post.coverImage || "/logo.jpg";
	const title = post.seo?.title || post.title;
	const description = post.seo?.description || post.excerpt;
	const publishedTime = post.date ? new Date(post.date).toISOString() : undefined;

	return {
		metadataBase: new URL(baseUrl),
		title: title,
		description: description,
		robots: {
			index: !post.seo?.noindex,
			follow: !post.seo?.noindex,
		},
		openGraph: {
			title: title,
			description: description,
			url: `/blog/${post.slug}`,
			type: "article",
			publishedTime,
			authors: post.author ? [post.author] : ["Giralt Enterprises"],
			images: [
				{
					url: ogImage,
					width: 1200,
					height: 630,
					alt: title,
				},
			],
		},
		twitter: {
			card: "summary_large_image",
			title: title,
			description: description,
			images: [ogImage],
		},
		alternates: {
			canonical: `/blog/${post.slug}`,
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
		"tags",
	]);

	const relatedPosts = getRelatedPosts(slug, post.tags, 3);

	if (!post?.content) {
		notFound();
	}

	const baseUrl = "https://giralt-enterprises.vercel.app";
	const jsonLd = {
		"@context": "https://schema.org",
		"@type": "BlogPosting",
		headline: post.title,
		description: post.excerpt,
		image: post.coverImage
			? [`${baseUrl}${post.coverImage}`]
			: [`${baseUrl}/logo.jpg`],
		datePublished: post.date,
		dateModified: post.date,
		author: [
			{
				"@type": "Person",
				name: post.author || "Giralt Enterprises",
			},
		],
		publisher: {
			"@type": "Organization",
			name: "Giralt Enterprises",
			logo: {
				"@type": "ImageObject",
				url: `${baseUrl}/logo.jpg`,
			},
		},
		mainEntityOfPage: {
			"@type": "WebPage",
			"@id": `${baseUrl}/blog/${post.slug}`,
		},
	};

	return (
		<main className="flex flex-col">
			<script
				type="application/ld+json"
				dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
			/>
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
						{post.tags && post.tags.length > 0 && (
							<div className="flex items-center gap-2">
								<Tag className="h-4 w-4" />
								<div className="flex gap-2">
									{post.tags.map((tag) => (
										<span key={tag} className="capitalize">{tag}</span>
									))}
								</div>
							</div>
						)}
						{post.date && (
							<div className="flex items-center gap-2">
								<Calendar className="h-4 w-4" />
								<time dateTime={post.date}>
									{(() => {
										try {
											return format(
												typeof post.date === "string"
													? parseISO(post.date)
													: (post.date as unknown as Date),
												"MMMM d, yyyy",
											);
										} catch (e) {
											return post.date;
										}
									})()}
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
							<Image
								src={post.coverImage || ""}
								alt={post.title}
								fill
								priority
								className="object-cover"
								sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 800px"
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

			{/* Related Posts */}
			{relatedPosts.length > 0 && (
				<section className="py-12 bg-secondary/30 border-t">
					<div className="container mx-auto px-4 max-w-6xl">
						<h2 className="text-2xl font-bold mb-8">Related Articles</h2>
						<div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
							{relatedPosts.map((post) => (
								<BlogCard key={post.slug} post={post} />
							))}
						</div>
					</div>
				</section>
			)}
		</main>
	);
}
