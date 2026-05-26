# Writing Posts

Create a new Markdown file in this folder:

```text
src/content/blog/my-post-title.md
```

Use frontmatter at the top of the file:

```yaml
---
title: "My Post Title"
description: "One or two sentences used on listing pages and in RSS."
pubDate: 2026-05-26
tags: ["programming", "projects"]
heroImage: "./images/my-hero.jpg"
heroAlt: "Short description of the hero image."
series: "Optional Series Name"
seriesOrder: 1
draft: false
---
```

Only `title`, `description`, and `pubDate` are required. Use `draft: true` to keep a post out of the published site.

Images can live next to the post or under `public/images`. For figures with captions, write regular HTML in Markdown:

```html
<figure>
  <img src="/images/example.jpg" alt="Short useful alt text" />
  <figcaption>A concise caption that explains what the reader should notice.</figcaption>
</figure>
```
