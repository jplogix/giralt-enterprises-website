import Link from 'next/link';
import { format, parseISO } from 'date-fns';
import { Post } from '@/lib/blog';

export default function BlogCard({ post }: { post: Partial<Post> }) {
  return (
    <div className="group flex flex-col space-y-3">
      {post.coverImage && (
        <Link href={`/blog/${post.slug}`} className="overflow-hidden rounded-md">
          <img
            src={post.coverImage}
            alt={post.title}
            className="aspect-video w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </Link>
      )}
      <div className="space-y-2">
        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
          {post.date && (
            <time dateTime={post.date}>
              {format(parseISO(post.date), 'MMMM d, yyyy')}
            </time>
          )}
        </div>
        <Link href={`/blog/${post.slug}`} className="block">
          <h2 className="text-xl font-semibold tracking-tight group-hover:underline">
            {post.title}
          </h2>
        </Link>
        <p className="line-clamp-2 text-muted-foreground">{post.excerpt}</p>
      </div>
    </div>
  );
}
