import {readFileSync, existsSync} from 'node:fs';

const files = ['.gitignore', 'README.md', 'package.json', 'scripts/build-web.mjs'];
const markers = ['<<<<<<<', '=======', '>>>>>>>'];
let failed = false;

for (const file of files) {
  if (!existsSync(file)) {
    console.error(`❌ Missing file: ${file}`);
    failed = true;
    continue;
  }

  const content = readFileSync(file, 'utf8');
  const found = markers.filter((marker) => content.includes(marker));
  if (found.length > 0) {
    console.error(`❌ Conflict markers in ${file}: ${found.join(', ')}`);
    failed = true;
  } else {
    console.log(`✅ ${file} has no conflict markers`);
  }
}

if (failed) {
  process.exit(1);
}

console.log('✅ Conflict resolution files are clean. Keep the HTML/CSS 3D version.');
