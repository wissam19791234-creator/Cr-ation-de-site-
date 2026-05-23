#!/usr/bin/env node

/**
 * Generate a simple sitemap.xml for this static site.
 *
 * Usage:
 *   node scripts/generateSitemap.js https://example.com
 *
 * Optional env vars:
 *   SITE_URL (used when CLI arg is omitted)
 *   LASTMOD (YYYY-MM-DD, default: today's UTC date)
 */

const fs = require('fs');
const path = require('path');

const baseUrl = (process.argv[2] || process.env.SITE_URL || '').trim();

if (!baseUrl) {
  console.error('Missing base URL. Example: node scripts/generateSitemap.js https://example.com');
  process.exit(1);
}

let parsed;
try {
  parsed = new URL(baseUrl);
} catch {
  console.error(`Invalid URL: ${baseUrl}`);
  process.exit(1);
}

const normalizedBase = parsed.href.replace(/\/$/, '');
const today = new Date().toISOString().slice(0, 10);
const lastmod = (process.env.LASTMOD || today).trim();

const pages = [
  { loc: '/', changefreq: 'weekly', priority: '1.0' }
];

const xml = [
  '<?xml version="1.0" encoding="UTF-8"?>',
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
  ...pages.map((page) => [
    '  <url>',
    `    <loc>${normalizedBase}${page.loc}</loc>`,
    `    <lastmod>${lastmod}</lastmod>`,
    `    <changefreq>${page.changefreq}</changefreq>`,
    `    <priority>${page.priority}</priority>`,
    '  </url>'
  ].join('\n')),
  '</urlset>',
  ''
].join('\n');

const outPath = path.resolve(process.cwd(), 'sitemap.xml');
fs.writeFileSync(outPath, xml, 'utf8');
console.log(`Sitemap generated: ${outPath}`);
