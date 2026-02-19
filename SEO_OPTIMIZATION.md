# SEO Optimization Guide (Next.js 14-15)

This document outlines the SEO strategy and implementations for the Giralt Enterprises website, aligned with Next.js 15 best practices.

## 1. Metadata API Configuration

### Global Metadata (`app/layout.tsx`)
We use the Next.js Metadata API to provide sensible defaults across the site.
- **Title Template**: Uses `%s | Giralt Enterprises` so subpages automatically append the brand name.
- **Metadata Base**: Configured with the production URL to ensure relative social share images/canonical tags resolve correctly.
- **Open Graph & Twitter**: Configured with default brand images and descriptions.

### Dynamic Blog Metadata (`app/blog/[slug]/page.tsx`)
Blog posts use `generateMetadata` to pull values from Markdown frontmatter.
- **Priority**: CMS-defined SEO fields (Title/Description) override the post content fields.
- **Auto-Fallbacks**: If no custom SEO image is set, it falls back to the `coverImage`, then to the brand logo.

## 2. Structured Data (JSON-LD)

We implement `application/ld+json` on blog post pages to enhance "Rich Results" in Google Search.
- **Type**: `BlogPosting`
- **Fields**: Headline, description, author, datePublished, and publisher info.
- **Implementation**: Injected via a `<script>` tag in the Server Component.

## 3. Indexing & Discovery

### Sitemap (`app/sitemap.ts`)
A dynamic sitemap is generated at `/sitemap.xml`.
- **Static Routes**: Included automatically (Home, About, Products, etc.).
- **Dynamic Posts**: Fetched from the filesystem via `lib/blog.ts`.
- **Prioritization**: Home page is prioritized (1.0), others are at 0.8.

### Robots.txt (`app/robots.ts`)
Generated dynamically to:
- Reference the sitemap.
- Disallow crawling of admin interfaces (`/admin/`) and internal APIs.

## 4. Decap CMS Integration

The CMS is configured in `public/blog-admin/config.yml` with a dedicated **SEO** group for every post:
- **Meta Title**: Optional override for search results.
- **Meta Description**: Optimized for 150-160 characters.
- **OG Image**: Custom image for social sharing.
- **No Index**: Boolean toggle to hide specific posts from Google.

## 5. Performance & Web Vitals

Optimizations directly impacting SEO:
- **LCP (Largest Contentful Paint)**: Blog cover images use `next/image` with `priority` to start loading immediately.
- **CLS (Cumulative Layout Shift)**: Aspect-ratio containers are used for images to prevent layout jumps.
- **Fonts**: Optimized via `next/font/google` to minimize layout shift during loading.

## 6. Content Architecture & Internal Linking

- **Topic Pages**: Dynamic routing at `/blog/tag/[tag]` clusters related content, improving authority on specific subjects.
- **Related Articles**: The "Related Articles" section on post pages uses tag-based relevance scoring to keep users on the site longer.
- **Semantic Headers**: Single `<h1>` per page with a logical hierarchy (`<h2>` to `<h4>`) for post content.

## Maintenance Checklist
1. **Change Domain**: When moving from the Vercel preview to a custom domain, update `metadataBase` in `layout.tsx` and `baseUrl` in `sitemap.ts`.
2. **Submit Sitemap**: Once live, visit [Google Search Console](https://search.google.com/search-console) and submit `https://your-domain.com/sitemap.xml`.
3. **Drafts**: Use the "Published" toggle in Decap CMS to keep draft content from appearing in the sitemap.
