import { getCollection, type CollectionEntry } from 'astro:content';

export type BlogPost = CollectionEntry<'blog'>;

export async function getPublishedPosts() {
  const posts = await getCollection('blog', ({ data }) => !data.draft);
  return posts.sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());
}

export function formatDate(date: Date) {
  return new Intl.DateTimeFormat('en-ZA', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  }).format(date);
}

export function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

export function getAllTags(posts: BlogPost[]) {
  return [...new Set(posts.flatMap((post) => post.data.tags))].sort((a, b) => a.localeCompare(b));
}

export function getAllSeries(posts: BlogPost[]) {
  return [...new Set(posts.map((post) => post.data.series).filter(Boolean))] as string[];
}

export function sortSeriesPosts(posts: BlogPost[]) {
  return [...posts].sort((a, b) => {
    const aOrder = a.data.seriesOrder ?? Number.MAX_SAFE_INTEGER;
    const bOrder = b.data.seriesOrder ?? Number.MAX_SAFE_INTEGER;
    return aOrder - bOrder || a.data.pubDate.valueOf() - b.data.pubDate.valueOf();
  });
}
