# Writing Posts

## Generate a draft

Run the helper from the project root:

```bash
npm run new:post my-post-title
```

It creates `src/content/blog/my-post-title.md` with the title generated from the filename and the rest of the metadata fields ready to fill in:

```yaml
---
title: "My Post Title"
description: ""
pubDate: 2026-05-28
updatedDate:
tags: []
draft: true
series: ""
seriesDescription: ""
seriesOrder:
---
```

If you want to override the generated title, run `npm run new:post -- my-post-title -- --title "A Different Title"`.

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
series: "Optional Series Name"
seriesOrder: 1
draft: false
---
```

Only `title`, `description`, and `pubDate` are required for a published post. Use `draft: true` to keep a post out of the published site.

## Series posts

Posts with the same `series` value are linked together automatically. Add `seriesOrder` to control their order:

```yaml
series: "Building in Public"
seriesDescription: "A short description of what this series covers."
seriesOrder: 1
```

Each published post in a series shows a vertical timeline with the previous posts, current post, and upcoming posts in that series. For a master or overview post, give it the first `seriesOrder` value, add `seriesDescription`, and use the body of the post to explain what the series is about.

Images can live next to the post or under `public/images`. For figures with captions, write regular HTML in Markdown:

```html
<figure>
  <img src="/images/example.jpg" alt="Short useful alt text" />
  <figcaption>A concise caption that explains what the reader should notice.</figcaption>
</figure>
```
