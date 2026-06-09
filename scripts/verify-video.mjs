import {existsSync, statSync} from 'node:fs';
import {join} from 'node:path';
import {spawnSync} from 'node:child_process';

const out = join(process.cwd(), 'out', 'video-demo-gratuite.mp4');
const ffmpeg = existsSync(join(process.cwd(), 'node_modules/@remotion/compositor-linux-x64-gnu/ffmpeg'))
  ? join(process.cwd(), 'node_modules/@remotion/compositor-linux-x64-gnu/ffmpeg')
  : 'ffmpeg';
const requiredFrames = [15, 75, 135, 195, 255, 330, 405, 435];

if (!existsSync(out)) {
  console.error('❌ Missing out/video-demo-gratuite.mp4');
  process.exit(1);
}

const size = statSync(out).size;
if (size < 100_000) {
  console.error(`❌ MP4 too small: ${size} bytes`);
  process.exit(1);
}

const probe = spawnSync(ffmpeg, ['-i', out, '-hide_banner'], {encoding: 'utf8'});
const info = `${probe.stdout}\n${probe.stderr}`;
const checks = [
  ['duration 15s', /Duration: 00:00:15\.00/.test(info)],
  ['vertical 1080x1920', /1080x1920/.test(info)],
  ['30 fps', /30 fps/.test(info)],
  ['h264', /Video: h264/.test(info)],
];

for (const [label, ok] of checks) {
  if (!ok) {
    console.error(`❌ Video check failed: ${label}`);
    console.error(info);
    process.exit(1);
  }
  console.log(`✅ ${label}`);
}

for (const frame of requiredFrames) {
  const file = join(process.cwd(), 'out', 'frames', `frame-${String(frame).padStart(4, '0')}.png`);
  if (!existsSync(file)) {
    console.error(`❌ Missing visual-check frame: ${file}`);
    process.exit(1);
  }
  console.log(`✅ visual-check frame ${frame}`);
}

console.log('✅ Video render verified: out/video-demo-gratuite.mp4');
