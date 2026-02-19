import { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/blog";

export default function sitemap(): MetadataRoute.Sitemap {
	const baseUrl = "https://giralt-enterprises.vercel.app";

	// Get all posts
	const posts = getAllPosts(["slug", "date"]);
	const blogPosts = posts.map((post) => ({
		url: `${baseUrl}/blog/${post.slug}`,
		lastModified: post.date ? new Date(post.date) : new Date(),
		changeFrequency: "weekly" as const,
		priority: 0.7,
	}));

	// Static routes
	const routes = [
		"",
		"/about",
		"/blog",
		"/contact",
		"/gallery",
		"/products",
		"/awards",
	].map((route) => ({
		url: `${baseUrl}${route}`,
		lastModified: new Date(),
		changeFrequency: "monthly" as const,
		priority: route === "" ? 1 : 0.8,
	}));

	return [...routes, ...blogPosts];
}
