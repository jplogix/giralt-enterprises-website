import Link from "next/link";
import Image from "next/image";
import { format, parseISO } from "date-fns";
import { Post } from "@/lib/blog";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";

export default function BlogCard({ post }: { post: Partial<Post> }) {
	return (
		<Link href={`/blog/${post.slug}`}>
			<Card className="h-full hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden group">
				<div className="relative h-48 overflow-hidden">
					<Image
						src={post.coverImage || "/images/giralt/handrails/main_installation.jpg"}
						alt={post.title || "Blog Post"}
						fill
						className="object-cover group-hover:scale-110 transition-transform duration-300"
					/>
				</div>
				<CardContent className="pt-6">
					<div className="flex items-center space-x-2 text-sm text-muted-foreground mb-2">
						{post.date && (
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
						)}
					</div>
					<h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
						{post.title}
					</h3>
					<p className="line-clamp-3 text-muted-foreground mb-4">{post.excerpt}</p>
					<div className="flex items-center text-primary font-medium mt-auto">
						Read More <ArrowRight className="ml-2" size={16} />
					</div>
				</CardContent>
			</Card>
		</Link>
	);
}
