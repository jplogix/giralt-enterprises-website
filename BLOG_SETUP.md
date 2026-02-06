# Decap CMS & Blog Setup Guide

This project uses a custom-configured Decap CMS (formerly Netlify CMS) setup that works on Vercel using a GitHub OAuth gateway.

## Admin Access
The CMS is available at: `your-domain.com/blog-admin`

## 1. GitHub OAuth Configuration
To allow logging into the CMS in production, you must set up a GitHub OAuth Application.

1.  Go to **GitHub Settings > Developer Settings > OAuth Apps > New OAuth App**.
2.  **Application Name**: `Giralt Enterprises CMS` (or your choice).
3.  **Homepage URL**: `https://www.giraltenterprises.com`
4.  **Authorization callback URL**: `https://www.giraltenterprises.com/api/auth/callback`
5.  **Save** the app and generate a **Client Secret**.

## 2. Vercel Environment Variables
Add the following variables to your Vercel Project Settings:

| Variable | Value |
| :--- | :--- |
| `GITHUB_CLIENT_ID` | Your GitHub OAuth Client ID |
| `GITHUB_CLIENT_SECRET` | Your GitHub OAuth Client Secret |

## 3. Deployment Configuration
The CMS configuration is located at `public/blog-admin/config.yml`.

- **Branch**: Ensure `branch: main` is set so edits go to your production branch.
- **Repository**: Ensure `repo: jplogix/giralt-enterprises-website` is correct.

## 4. Blog Structure
Blog posts are stored as MDX files in `content/blog`. Each post requires the following frontmatter:

```yaml
---
title: "My Post Title"
slug: "my-post-slug"
date: 2026-02-06
excerpt: "A short summary for the listing page."
coverImage: "/images/blog/image.jpg"
author: "Giralt Team"
published: true
---
```

## Adding New Posts
1.  Visit `/blog-admin`.
2.  Click **Login with GitHub**.
3.  Fill in the fields and the body (Markdown supported).
4.  Click **Publish**.
5.  Vercel will automatically detect the new file in your GitHub repo and trigger a rebuild of the site.
