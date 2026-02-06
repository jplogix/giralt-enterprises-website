import { getAllPosts } from '@/lib/blog';
import BlogCard from '@/components/blog-card';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Blog | Giralt Enterprises',
  description: 'Latest news and updates from Giralt Enterprises.',
};

export default function BlogIndexPage() {
  const posts = getAllPosts([
    'title',
    'date',
    'slug',
    'author',
    'coverImage',
    'excerpt',
  ]);

  return (
    <div className="container py-10 mx-auto">
      <div className="flex flex-col items-start gap-4 md:flex-row md:justify-between md:gap-8">
        <div className="flex-1 space-y-4">
          <h1 className="inline-block font-heading text-4xl tracking-tight lg:text-5xl">
            Blog
          </h1>
          <p className="text-xl text-muted-foreground">
            Insights and updates from our engineering team.
          </p>
        </div>
      </div>
      <hr className="my-8" />
      <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <BlogCard key={post.slug} post={post} />
        ))}
      </div>
    </div>
  );
}
