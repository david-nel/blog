---
title: "Markdown Elements Cheat Sheet"
description: "A draft reference showing the markdown and HTML elements available inside blog posts."
pubDate: 2026-05-26
tags: ["meta", "writing"]
draft: true
---

This draft is a quick reference for the elements that can be used inside posts on this site. Keep it unpublished, copy the snippets you need, and adjust the text for the post you are writing.

## Paragraphs and Links

Write normal paragraphs with a blank line between them. Use [inline links](https://example.com) when pointing to a source, project, or related note.

Use `inline code` for commands, filenames, variables, and short technical terms.

## Headings

Use `##` for main sections and `###` for smaller sections inside them.

### A Smaller Heading

Keep headings short enough that they are easy to scan on narrow screens.

## Lists

Use bullets when order does not matter:

- Define the problem.
- Add the context that changes the decision.
- Show the final command, config, or code.

Use numbered lists when order matters:

1. Reproduce the issue.
2. Change one thing.
3. Verify the result.

## Quotes

> Use blockquotes for short notes, cautions, or quoted material. Keep quoted text brief and link to the source nearby.

## Code Blocks

Use fenced code blocks with a language name where possible:

```ts
export function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}
```

Shell examples work the same way:

```bash
npm run new:post my-post-title
```

## Figures and Captions

For an image inside the body of a post, use regular HTML so you can include a caption:

```html
<figure>
  <img src="/images/example.jpg" alt="Short useful alt text" />
  <figcaption>A concise caption that explains what the reader should notice.</figcaption>
</figure>
```

`alt` text is for screen readers and for fallback text if the image cannot load. It is not a visible caption, and browsers do not reliably show it on hover. Use `figcaption` when the text should be visible on the page. Use a `title` attribute only when you specifically want optional hover text:

```html
<img src="/images/example.jpg" alt="Short useful alt text" title="Optional hover text" />
```

The rendered result looks like this:

<figure>
  <img src="/images/example.jpg" alt="Short useful alt text" />
  <figcaption>A concise caption that explains what the reader should notice.</figcaption>
</figure>

## Frontmatter Patterns

A regular draft post only needs the basics:

```yaml
---
title: "Post Title"
description: "A short summary used on listing pages and RSS."
pubDate: 2026-05-26
tags: ["programming", "projects"]
draft: true
---
```

Add series metadata when the post belongs to a sequence:

```yaml
series: "Building in Public"
seriesOrder: 1
```

Remove `draft: true` or change it to `draft: false` only when the post is ready to publish.
