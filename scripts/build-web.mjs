import {cpSync, existsSync, mkdirSync, readdirSync, statSync, copyFileSync} from 'node:fs';
import {join} from 'node:path';

const root = process.cwd();
const dist = join(root, 'dist');
mkdirSync(dist, {recursive: true});

const copyIfExists = (from, to) => {
  if (!existsSync(from)) return;
  const stat = statSync(from);
  if (stat.isDirectory()) {
    mkdirSync(to, {recursive: true});
    cpSync(from, to, {recursive: true});
    return;
  }
  mkdirSync(join(to, '..'), {recursive: true});
  copyFileSync(from, to);
};

copyIfExists(join(root, 'index.html'), join(dist, 'index.html'));
copyIfExists(join(root, 'sitemap.xml'), join(dist, 'sitemap.xml'));

// Copy public files that are meant for web hosting, but not generated video assets.
const publicDir = join(root, 'public');
if (existsSync(publicDir)) {
  for (const entry of readdirSync(publicDir)) {
    if (entry === 'generated-assets') continue;
    copyIfExists(join(publicDir, entry), join(dist, entry));
  }
}

console.log('Vercel static build ready in dist/.');
console.log('Pour rendre la vidéo localement, utilisez: npm run render');
