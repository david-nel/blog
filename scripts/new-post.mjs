#!/usr/bin/env node
import { existsSync } from 'node:fs';
import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const contentDir = path.join(root, 'src', 'content', 'blog');

const options = parseArgs(process.argv.slice(2));

if (options.help) {
  printHelp();
  process.exit(0);
}

if (!options.fileName) {
  fail('Missing required file name, for example: npm run new:post my-post-title');
}

const today = new Date().toISOString().slice(0, 10);
const slug = slugify(stripMarkdownExtension(options.fileName));
const outputPath = postPath(slug);
const title = options.title || titleize(slug);

const frontmatter = [
  '---',
  yamlString('title', title),
  yamlString('description', ''),
  `pubDate: ${today}`,
  'updatedDate:',
  'tags: []',
  'draft: true',
  'series: ""',
  'seriesDescription: ""',
  'seriesOrder:',
  '---',
];

const body = ['', '## Working Draft', '', 'Start writing here.', ''];

await mkdir(contentDir, { recursive: true });
await writeFile(outputPath, `${frontmatter.join('\n')}\n${body.join('\n')}`, 'utf8');

console.log(`Created ${path.relative(root, outputPath)}`);

function parseArgs(args) {
  const parsed = { fileName: undefined };

  for (let index = 0; index < args.length; index += 1) {
    const arg = args[index];

    if (!arg.startsWith('--')) {
      if (parsed.fileName) {
        fail(`Unexpected extra argument: ${arg}`);
      }

      parsed.fileName = arg;
      continue;
    }

    const [rawKey, inlineValue] = arg.slice(2).split('=', 2);
    const key = toCamelCase(rawKey);

    if (key === 'help' || key === 'force') {
      parsed[key] = true;
      continue;
    }

    const value = inlineValue ?? args[index + 1];
    if (!value || value.startsWith('--')) {
      fail(`Missing value for --${rawKey}.`);
    }

    parsed[key] = value;
    if (inlineValue === undefined) {
      index += 1;
    }
  }

  return parsed;
}

function slugify(value) {
  return String(value)
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

function stripMarkdownExtension(value) {
  return String(value).replace(/\.mdx?$/i, '');
}

function titleize(value) {
  return String(value)
    .replace(/[-_]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
}

function yamlString(key, value) {
  return `${key}: ${JSON.stringify(String(value))}`;
}

function toCamelCase(value) {
  return value.replace(/-([a-z])/g, (_, letter) => letter.toUpperCase());
}

function postPath(slug) {
  const outputPath = path.join(contentDir, `${slug}.md`);

  if (existsSync(outputPath) && !options.force) {
    fail(`Post already exists: ${path.relative(root, outputPath)}. Use --force to overwrite it.`);
  }

  return outputPath;
}

function fail(message) {
  console.error(message);
  console.error('Run `npm run new:post -- -- --help` for usage.');
  process.exit(1);
}

function printHelp() {
  console.log(`Create a blank draft blog post.

Usage:
  npm run new:post my-post-title

Options:
  file name  Required post filename, without .md.
  --title    Optional title override. Defaults to title-cased file name.
  --force    Overwrite the file when it already exists.
  --help     Show this help. Use npm run new:post -- -- --help.
`);
}
