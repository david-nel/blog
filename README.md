# davidnel.net

Personal technical blog built with Astro.

## Commands

```bash
npm install
npm run dev
npm run new:post my-post-title
npm run build
npm run preview
```

## Writing

Posts live in `src/content/blog`.

```yaml
---
title: "Post Title"
description: "A short summary used on listing pages and RSS."
pubDate: 2026-05-26
tags: ["programming", "projects"]
series: "Optional Series Name"
seriesOrder: 1
draft: false
---
```

Use `draft: true` to keep a post out of production.

## Deployment

Cloudflare Pages settings:

- Build command: `npm run build`
- Output directory: `dist`
- Production domain: `davidnel.net`

Replace the placeholder newsletter form action in `src/components/NewsletterSignup.astro` with the beehiiv embed action once the publication exists.

Replace the discussion placeholder in `src/pages/blog/[...slug].astro` with the Giscus script once the GitHub repository and Discussions category exist.
