import { format, parseISO } from 'date-fns';
import { getAllPosts, getPostBySlug } from '@/lib/blog';
import { notFound } from 'next/navigation';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { Metadata } from 'next';
import Link from 'next/link';

interface PostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({ params }: PostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug, ['title', 'excerpt', 'coverImage']);

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
  const posts = getAllPosts(['slug']);

  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug, [
    'title',
    'date',
    'slug',
    'author',
    'content',
    'coverImage',
  ]);

  if (!post?.content) {
    notFound();
  }

  return (
    <article className="container py-10 mx-auto max-w-3xl">
      <Link
        href="/blog"
        className="mb-8 inline-flex items-center text-sm text-muted-foreground hover:text-foreground"
      >
        ← Back to Blog
      </Link>
      <div>
        {post.date && (
          <time
            dateTime={post.date}
            className="block text-sm text-muted-foreground mb-2"
          >
            {format(parseISO(post.date), 'MMMM d, yyyy')}
          </time>
        )}
        <h1 className="inline-block font-heading text-4xl tracking-tight lg:text-5xl mb-4">
          {post.title}
        </h1>
        {post.author && (
          <div className="flex items-center space-x-2 text-sm text-muted-foreground mb-8">
            <span>By {post.author}</span>
          </div>
        )}
        {post.coverImage && (
          <img
            src={post.coverImage}
            alt={post.title}
            className="my-8 rounded-md border bg-muted transition-colors aspect-video object-cover w-full"
          />
        )}
      </div>
      <div className="prose prose-neutral dark:prose-invert max-w-none">
        <MDXRemote source={post.content} />
      </div>
    </article>
  );
}
