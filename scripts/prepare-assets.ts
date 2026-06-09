const fs = require('fs');
const path = require('path');
const zlib = require('zlib');

const outDir = path.join(process.cwd(), 'public', 'generated-assets');
fs.mkdirSync(outDir, { recursive: true });

const W = 1080;
const H = 1920;
const palette = {
  ink: [7, 8, 13],
  midnight: [14, 23, 42],
  navy: [18, 26, 51],
  ivory: [255, 248, 237],
  champagne: [216, 173, 94],
  beige: [234, 220, 200],
  lilac: [216, 204, 255],
  blue: [131, 198, 255]
};

function crc32(buf) {
  let c = ~0;
  for (let i = 0; i < buf.length; i++) {
    c ^= buf[i];
    for (let k = 0; k < 8; k++) c = (c >>> 1) ^ (0xedb88320 & -(c & 1));
  }
  return ~c >>> 0;
}
function chunk(type, data) {
  const t = Buffer.from(type);
  const len = Buffer.alloc(4); len.writeUInt32BE(data.length, 0);
  const crc = Buffer.alloc(4); crc.writeUInt32BE(crc32(Buffer.concat([t, data])), 0);
  return Buffer.concat([len, t, data, crc]);
}
function png(width, height, rgba) {
  const raw = Buffer.alloc((width * 4 + 1) * height);
  for (let y = 0; y < height; y++) {
    raw[y * (width * 4 + 1)] = 0;
    rgba.copy(raw, y * (width * 4 + 1) + 1, y * width * 4, (y + 1) * width * 4);
  }
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(width, 0); ihdr.writeUInt32BE(height, 4);
  ihdr[8] = 8; ihdr[9] = 6; ihdr[10] = 0; ihdr[11] = 0; ihdr[12] = 0;
  return Buffer.concat([Buffer.from([137,80,78,71,13,10,26,10]), chunk('IHDR', ihdr), chunk('IDAT', zlib.deflateSync(raw, { level: 6 })), chunk('IEND', Buffer.alloc(0))]);
}
function blend(a, b, t) { return a.map((v, i) => Math.round(v + (b[i] - v) * t)); }
function makeCanvas(w = W, h = H, bgA = palette.ink, bgB = palette.midnight) {
  const data = Buffer.alloc(w * h * 4);
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const radial = Math.min(1, Math.hypot((x - w * .68) / w, (y - h * .25) / h) * 1.45);
      const vertical = y / h;
      const c = blend(blend(bgB, bgA, radial), palette.navy, vertical * .22);
      const glow = Math.max(0, 1 - Math.hypot(x - w * .74, y - h * .27) / (w * .62));
      const champagne = glow * 42;
      const i = (y * w + x) * 4;
      data[i] = Math.min(255, c[0] + champagne);
      data[i+1] = Math.min(255, c[1] + champagne * .72);
      data[i+2] = Math.min(255, c[2] + champagne * .28);
      data[i+3] = 255;
    }
  }
  return { w, h, data };
}
function setPx(c, x, y, rgba) {
  if (x < 0 || y < 0 || x >= c.w || y >= c.h) return;
  const i = (Math.floor(y) * c.w + Math.floor(x)) * 4;
  const a = (rgba[3] ?? 255) / 255;
  c.data[i] = Math.round(c.data[i] * (1-a) + rgba[0] * a);
  c.data[i+1] = Math.round(c.data[i+1] * (1-a) + rgba[1] * a);
  c.data[i+2] = Math.round(c.data[i+2] * (1-a) + rgba[2] * a);
  c.data[i+3] = 255;
}
function rect(c, x, y, w, h, rgba) { for (let yy = y; yy < y+h; yy++) for (let xx = x; xx < x+w; xx++) setPx(c, xx, yy, rgba); }
function roundRect(c, x, y, w, h, r, rgba) {
  for (let yy = y; yy < y+h; yy++) for (let xx = x; xx < x+w; xx++) {
    const dx = xx < x+r ? x+r-xx : xx > x+w-r ? xx-(x+w-r) : 0;
    const dy = yy < y+r ? y+r-yy : yy > y+h-r ? yy-(y+h-r) : 0;
    if (dx*dx + dy*dy <= r*r) setPx(c, xx, yy, rgba);
  }
}
function line(c, x1, y1, x2, y2, rgba, thick = 4) {
  const steps = Math.max(Math.abs(x2-x1), Math.abs(y2-y1));
  for (let s = 0; s <= steps; s++) {
    const t = s / steps, x = x1 + (x2-x1)*t, y = y1 + (y2-y1)*t;
    for (let yy = -thick; yy <= thick; yy++) for (let xx = -thick; xx <= thick; xx++) if (xx*xx+yy*yy <= thick*thick) setPx(c, x+xx, y+yy, rgba);
  }
}
function device(c, x, y, w, h) { roundRect(c, x-16, y-16, w+32, h+32, 58, [255,248,237,30]); roundRect(c, x, y, w, h, 48, [5,6,10,245]); roundRect(c, x+24, y+60, w-48, h-96, 32, [18,26,51,255]); roundRect(c, x+w*.39, y+22, w*.22, 16, 8, [255,248,237,80]); }
function card(c, x, y, w, h, accent) { roundRect(c, x, y, w, h, 28, [255,248,237,24]); line(c, x+34, y+50, x+w-34, y+50, accent, 3); roundRect(c, x+34, y+82, w*.42, 18, 8, [255,248,237,90]); roundRect(c, x+34, y+122, w*.72, 12, 6, [255,248,237,45]); roundRect(c, x+34, y+152, w*.55, 12, 6, [255,248,237,35]); }
function addGrain(c) { let seed = 9; for (let i = 0; i < c.data.length; i += 4) { seed = (seed * 1664525 + 1013904223) >>> 0; const n = ((seed >>> 24) - 128) * .05; c.data[i]+=n; c.data[i+1]+=n; c.data[i+2]+=n; } }

function draw(kind) {
  const c = makeCanvas();
  for (let i = 0; i < 7; i++) line(c, -120 + i*180, 230+i*160, 1240+i*90, -120+i*120, [216,173,94,18], 3);
  if (kind.includes('phone') || kind.includes('free') || kind.includes('cta')) { device(c, 330, 390, 420, 900); card(c, 386, 520, 308, 210, [216,173,94,130]); card(c, 386, 770, 308, 150, [131,198,255,120]); roundRect(c, 410, 990, 260, 76, 28, [216,173,94,210]); }
  if (kind.includes('dm') || kind.includes('before')) { for (let i=0;i<8;i++) roundRect(c, 105+(i%2)*180, 420+i*116, 430-(i%3)*65, 74, 28, i%2 ? [216,204,255,55] : [255,248,237,40]); }
  if (kind.includes('dashboard')) { roundRect(c, 118, 475, 844, 660, 44, [255,248,237,22]); for(let i=0;i<3;i++) card(c, 165+i*250, 545, 210, 160, [216,173,94,145]); line(c, 190, 970, 340, 850, [131,198,255,170], 6); line(c, 340, 850, 520, 910, [131,198,255,170], 6); line(c, 520, 910, 740, 760, [216,173,94,180], 6); }
  if (kind.includes('quote') || kind.includes('form')) { roundRect(c, 155, 355, 770, 950, 52, [255,248,237,28]); for(let i=0;i<6;i++){ roundRect(c, 235, 480+i*105, 610, 66, 22, [255,248,237,42]); line(c, 270, 513+i*105, 570, 513+i*105, [255,248,237,60], 3); roundRect(c, 790, 500+i*105, 24, 24, 12, [216,173,94,170]); } roundRect(c, 270, 1155, 540, 88, 32, [216,173,94,215]); }
  if (kind.includes('portfolio')) { for(let i=0;i<6;i++){ const x=90+(i%2)*455, y=330+Math.floor(i/2)*330; card(c,x,y,395,255,i%2?[131,198,255,120]:[216,173,94,130]); } }
  if (kind.includes('benefits')) { for(let i=0;i<3;i++) { roundRect(c, 155, 475+i*260, 770, 190, 38, [255,248,237,27]); roundRect(c, 205, 525+i*260, 82, 82, 28, [216,173,94,135]); line(c, 325, 550+i*260, 750, 550+i*260, [255,248,237,80], 6); line(c, 325, 600+i*260, 660, 600+i*260, [255,248,237,45], 4); } }
  if (kind.includes('light')) { for (let x=0;x<c.w;x++) for (let y=0;y<c.h;y++) { const d=Math.abs((x-y*.45)-280); if(d<90) setPx(c,x,y,[216,173,94,Math.round((1-d/90)*120)]); } }
  addGrain(c); return c;
}
const files = ['01-hook-phone.png','02-dm-chaos.png','03-before-after.png','04-premium-website.png','05-dashboard.png','06-quote-form.png','07-portfolio-sites.png','08-benefits.png','09-free-demo.png','10-final-cta.png','11-soft-bg.png','12-light-sweep.png'];
for (const f of files) {
  const c = draw(f);
  fs.writeFileSync(path.join(outDir, f), png(c.w, c.h, c.data));
  console.log('generated', f);
}
