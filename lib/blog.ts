import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const postsDirectory = path.join(process.cwd(), 'content/blog');

export type Post = {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  coverImage?: string;
  author?: string;
  content: string;
  published: boolean;
};

export function getPostSlugs() {
  if (!fs.existsSync(postsDirectory)) {
    return [];
  }
  return fs.readdirSync(postsDirectory).filter(file => file.endsWith('.mdx') || file.endsWith('.md'));
}

export function getPostBySlug(slug: string, fields: string[] = []) {
  // Decode slug in case it contains %20 etc.
  const decodedSlug = decodeURIComponent(slug);
  const realSlug = decodedSlug.replace(/\.(mdx|md)$/, '');
  let fullPath = path.join(postsDirectory, `${realSlug}.mdx`);
  
  if (!fs.existsSync(fullPath)) {
    fullPath = path.join(postsDirectory, `${realSlug}.md`);
  }
  
  if (!fs.existsSync(fullPath)) {
    // If not found by direct filename, try to find by searching all files for a matching 'slug' in frontmatter
    const allSlugs = getPostSlugs();
    for (const s of allSlugs) {
       const content = fs.readFileSync(path.join(postsDirectory, s), 'utf8');
       const { data } = matter(content);
       if (data.slug === decodedSlug) {
          fullPath = path.join(postsDirectory, s);
          break;
       }
    }
  }

  if (!fs.existsSync(fullPath)) {
    throw new Error(`Post not found: ${slug}`);
  }

  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);

  type Items = {
    [key: string]: string | boolean | undefined;
  };

  const items: Items = {};

  // Standardize: slug is ALWAYS based on the filename unless specifically requested otherwise
  // but we prefer it to match the requested slug
  items['slug'] = realSlug;

  fields.forEach((field) => {
    if (field === 'content') {
      items[field] = content;
    }

    if (typeof data[field] !== 'undefined') {
      // If the field is slug, only overwrite if we haven't set it yet or if it's special
      items[field] = data[field];
    }
  });

  return items as Partial<Post>;
}

export function getAllPosts(fields: string[] = []) {
  const slugs = getPostSlugs();
  const posts = slugs
    .map((slug) => getPostBySlug(slug, fields))
    // sort posts by date in descending order
    .sort((post1, post2) => (post1.date! > post2.date! ? -1 : 1));
  return posts;
}
