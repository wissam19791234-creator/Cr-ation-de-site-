import {mkdirSync, rmSync, existsSync} from 'node:fs';
import {join} from 'node:path';
import {spawnSync} from 'node:child_process';
import sharp from 'sharp';

const W = 1080, H = 1920, FPS = 30, FRAMES = 450;
const outDir = join(process.cwd(), 'out');
const frameDir = join(outDir, 'frames');
mkdirSync(outDir, {recursive: true});
rmSync(frameDir, {recursive: true, force: true});
mkdirSync(frameDir, {recursive: true});

const C = {ink:'#07080D', midnight:'#0E172A', navy:'#121A33', ivory:'#FFF8ED', champagne:'#D8AD5E', beige:'#EADCC8', lilac:'#D8CCFF', blue:'#83C6FF'};
const esc = (s) => String(s).replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;');
const clamp = (v,a=0,b=1)=>Math.max(a,Math.min(b,v));
const ease = (t)=>1-Math.pow(1-clamp(t),3);
const opacity = (f,s,e)=>Math.min(ease((f-s)/10), ease((e-f)/12));
const yIn = (f,s)=>30*(1-ease((f-s)/12));

function textBlock(title, subtitle, f, start, opts={}) {
  const o = clamp(ease((f-start)/10));
  const y = (opts.y ?? 112) + yIn(f,start);
  const size = opts.size ?? 88;
  const subSize = opts.subSize ?? 50;
  const align = opts.align ?? 'middle';
  const x = align === 'start' ? 82 : 540;
  const anchor = align;
  const boxX = 62, boxW = 956;
  const words = new Set((opts.hl ?? []).map((w)=>w.toLowerCase()));
  const line = (txt, yy, fs, weight=900) => {
    const fit = txt.length * fs * .54 > 880 ? ' textLength="880" lengthAdjust="spacingAndGlyphs"' : '';
    const important = txt.split(' ').some((w) => words.has(w.toLowerCase().replace(/[.:,]/g,'')));
    return `<text xml:space="preserve" x="${x}" y="${yy}" text-anchor="${anchor}" font-family="Inter, Arial, sans-serif" font-size="${fs}" font-weight="${weight}" letter-spacing="-2" fill="${important ? C.champagne : C.ivory}"${fit}>${esc(txt)}</text>`;
  };
  return `<g opacity="${o}" filter="url(#shadow)">
    <rect x="${boxX}" y="${y-76}" width="${boxW}" height="${subtitle?210:132}" rx="30" fill="rgba(0,0,0,.38)" stroke="rgba(255,248,237,.12)"/>
    ${line(title, y+22, size)}
    ${subtitle ? line(subtitle, y+112, subSize, 850) : ''}
  </g>`;
}
function caption(text){return `<g><rect x="72" y="1780" width="936" height="72" rx="24" fill="rgba(7,8,13,.60)" stroke="rgba(255,248,237,.1)"/><text x="540" y="1826" text-anchor="middle" font-family="Inter,Arial" font-size="26" font-weight="700" fill="rgba(255,248,237,.84)">${esc(text)}</text></g>`}
function line(x,y,w, color='rgba(255,248,237,.60)'){return `<rect x="${x}" y="${y}" width="${w}" height="12" rx="6" fill="${color}"/>`}
function phone(x=360,y=520,s=1){return `<g transform="translate(${x} ${y}) scale(${s}) rotate(-4 180 360)"><rect width="360" height="720" rx="54" fill="url(#phone)" filter="url(#heavy)"/><rect x="22" y="22" width="316" height="676" rx="36" fill="url(#screen)" stroke="rgba(255,248,237,.10)"/><rect x="130" y="18" width="100" height="14" rx="7" fill="rgba(255,248,237,.24)"/><rect x="22" y="22" width="316" height="205" rx="36" fill="url(#hero)"/>${line(52,72,205)}${line(52,106,150)}<rect x="52" y="150" width="175" height="46" rx="23" fill="url(#gold)"/>${[0,1,2].map((i)=>`<rect x="45" y="${260+i*130}" width="270" height="100" rx="24" fill="rgba(255,248,237,.095)" stroke="rgba(255,248,237,.12)"/>`).join('')}</g>`}
function bubble(x,y,t){return `<g><rect x="${x}" y="${y}" width="${Math.max(260,t.length*19)}" height="78" rx="32" fill="rgba(255,248,237,.14)" stroke="rgba(255,248,237,.18)" filter="url(#soft)"/><text x="${x+28}" y="${y+50}" font-family="Inter,Arial" font-size="34" font-weight="850" fill="${C.ivory}">${esc(t)}</text></g>`}
function split(clean=false){return `<g filter="url(#soft)"><rect x="70" y="500" width="940" height="880" rx="54" fill="rgba(255,248,237,.06)" stroke="rgba(255,248,237,.13)"/><clipPath id="splitClip"><rect x="70" y="500" width="940" height="880" rx="54"/></clipPath><g clip-path="url(#splitClip)"><rect x="70" y="500" width="470" height="880" fill="url(#bad)"/><rect x="540" y="500" width="470" height="880" fill="url(#good)"/><rect x="538" y="500" width="5" height="880" fill="${C.champagne}" filter="url(#glow)"/><text x="110" y="565" font-family="Inter,Arial" font-size="28" font-weight="900" letter-spacing="8" fill="${C.champagne}">AVANT</text><text x="580" y="565" font-family="Inter,Arial" font-size="28" font-weight="900" letter-spacing="8" fill="${C.champagne}">APRÈS</text>${['C’est combien ?','Quelle date ?','Infos ?','Lieu ?'].map((m,i)=>bubble(105+(i%2)*38,625+i*116,m)).join('')}${clean?form(590,620,.48):[0,1,2].map(i=>`<rect x="585" y="${630+i*170}" width="360" height="125" rx="26" fill="rgba(255,248,237,.12)" stroke="rgba(255,248,237,.13)"/>${line(620,675+i*170,240)}${line(620,710+i*170,155,C.champagne)}`).join('')}</g></g>`}
function dashboard(){return `<g filter="url(#soft)"><rect x="110" y="560" width="860" height="630" rx="46" fill="url(#panel)" stroke="rgba(255,248,237,.14)"/>${['+ clair','+ pro','moins de chaos'].map((k,i)=>`<g><rect x="${150+i*265}" y="610" width="235" height="150" rx="28" fill="rgba(255,248,237,.11)" stroke="rgba(255,248,237,.13)"/><text x="${178+i*265}" y="675" font-family="Inter,Arial" font-size="34" font-weight="900" fill="${i===0?C.champagne:C.ivory}">${k}</text>${line(178+i*265,710,120)}</g>`).join('')}<rect x="150" y="810" width="780" height="310" rx="34" fill="rgba(7,8,13,.36)" stroke="rgba(255,248,237,.09)"/><path d="M190 1040 C300 990 365 875 485 935 S670 1050 760 890 885 910 915 850" fill="none" stroke="${C.champagne}" stroke-width="13" stroke-linecap="round"/><path d="M190 1065 H915" stroke="rgba(255,248,237,.12)" stroke-width="3"/></g>`}
function form(x=190,y=510,s=1){const fields=['Prénom','Téléphone','Date','Lieu','Besoin'];return `<g transform="translate(${x} ${y}) scale(${s})" filter="url(#soft)"><rect width="700" height="650" rx="44" fill="rgba(255,248,237,.11)" stroke="rgba(255,248,237,.15)"/>${fields.map((ff,i)=>`<g><rect x="42" y="${45+i*95}" width="616" height="76" rx="22" fill="rgba(255,248,237,.09)"/><text x="64" y="${78+i*95}" font-family="Inter,Arial" font-size="22" font-weight="800" fill="rgba(255,248,237,.60)">${ff}</text><rect x="64" y="${95+i*95}" width="${230+i*42}" height="10" rx="5" fill="url(#lineGold)"/><text x="620" y="${92+i*95}" text-anchor="middle" font-family="Inter,Arial" font-size="28" font-weight="900" fill="${C.champagne}">✓</text></g>`).join('')}<rect x="80" y="548" width="540" height="82" rx="30" fill="url(#gold)"/><text x="350" y="600" text-anchor="middle" font-family="Inter,Arial" font-size="28" font-weight="900" fill="#121A33">Demander un devis</text></g>`}
function finalRig(){return `<g opacity=".36" transform="rotate(-7 540 620)">${['Traiteur','Hôtel','Salon','Coach','Restaurant','Photo'].map((n,i)=>`<g><rect x="${-40+(i%3)*390}" y="${310+Math.floor(i/3)*235}" width="330" height="190" rx="28" fill="rgba(255,248,237,.08)" stroke="rgba(255,248,237,.13)"/><rect x="${-15+(i%3)*390}" y="${335+Math.floor(i/3)*235}" width="280" height="70" rx="20" fill="rgba(216,173,94,.28)"/><text x="${0+(i%3)*390}" y="${455+Math.floor(i/3)*235}" font-family="Inter,Arial" font-size="24" font-weight="900" fill="${C.ivory}">${n}</text></g>`).join('')}</g>${dashboard()}${phone(380,650,.72)}`}
function transition(f){const starts=[54,114,174,234,294,364];return starts.map((s,i)=>{const p=clamp((f-s)/14);if(p<=0||p>=1)return '';const x=-430+p*1520;return `<rect x="${x}" y="-240" width="${i===2?1180:220}" height="2400" transform="rotate(18 ${x} 900)" fill="${C.champagne}" opacity="${i===2?.22:.42}" filter="url(#blur)" style="mix-blend-mode:screen"/>`}).join('')}
function scene(f){
  const items=[];
  const add=(s,e,content)=>{const o=opacity(f,s,e); if(o>0) items.push(`<g opacity="${o}">${content}</g>`)};
  add(0,64,`${phone(360,540,1)}${textBlock('Ton Instagram attire.','Ton site doit convertir.',f,0,{hl:['instagram','site','convertir'],y:115})}${caption('Instagram capte l’attention. Le site transforme l’intérêt en demande claire.')}`);
  add(50,124,`${textBlock('Les DM font perdre du temps.','',f,55,{hl:['dm','temps'],y:125,size:58})}${bubble(80,420,'C’est combien ?')}${bubble(500,540,'Quelle date ?')}${bubble(115,690,'Combien d’invités ?')}${bubble(500,840,'Vous êtes où ?')}${caption('Trop de messages incomplets = trop d’allers-retours.')}`);
  add(110,184,`${textBlock('Une vraie vitrine change tout.','',f,114,{hl:['vitrine'],y:115,size:58})}${split(false)}${caption('Le chaos se transforme en parcours clair.')}`);
  add(170,244,`${textBlock('Gain de temps.','Demandes plus claires.',f,176,{hl:['temps','claires'],y:115,size:58,subSize:46})}${dashboard()}${caption('Dashboard premium : clair, pro, sans promesse garantie.')}`);
  add(230,306,`${textBlock('Le client remplit.','Vous recevez.',f,234,{hl:['client','recevez'],y:115,size:58,subSize:46})}${form()}${caption('Les bonnes infos arrivent au bon endroit.')}`);
  add(294,376,`${textBlock('Sans site : confusion.','Avec site : clarté.',f,300,{hl:['confusion','clarté'],y:100,size:54,subSize:44})}${split(true)}${caption('Un formulaire propre remplace les demandes floues.')}`);
  add(364,450,`${finalRig()}${textBlock('Démo gratuite.','Venez DM.',f,390,{hl:['démo','gratuite','dm'],y:100,size:88,subSize:46})}<g opacity="${clamp((f-429)/8)}"><rect x="230" y="1660" width="620" height="100" rx="34" fill="url(#gold)" filter="url(#glow)"/><text x="540" y="1724" text-anchor="middle" font-family="Inter,Arial" font-size="36" font-weight="950" fill="#121A33">Envoyez DÉMO</text></g>${caption('Je te montre une démo de site premium pour ton commerce.')}`);
  return items.join('');
}
function svg(f){return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}"><defs><linearGradient id="bg" x1="0" y1="0" x2="1" y2="1"><stop stop-color="${C.ink}"/><stop offset=".55" stop-color="${C.midnight}"/><stop offset="1" stop-color="${C.navy}"/></linearGradient><linearGradient id="phone" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#05060A"/><stop offset="1" stop-color="#202947"/></linearGradient><linearGradient id="screen" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#101832"/><stop offset="1" stop-color="#07080D"/></linearGradient><linearGradient id="hero" x1="0" y1="0" x2="1" y2="1"><stop stop-color="rgba(255,248,237,.14)"/><stop offset="1" stop-color="rgba(131,198,255,.10)"/></linearGradient><linearGradient id="gold" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#D8AD5E"/><stop offset="1" stop-color="#FFE7B0"/></linearGradient><linearGradient id="lineGold" x1="0" y1="0" x2="1" y2="0"><stop stop-color="rgba(255,248,237,.86)"/><stop offset="1" stop-color="rgba(216,173,94,.58)"/></linearGradient><linearGradient id="panel" x1="0" y1="0" x2="1" y2="1"><stop stop-color="rgba(255,248,237,.11)"/><stop offset="1" stop-color="rgba(131,198,255,.07)"/></linearGradient><linearGradient id="bad" x1="0" y1="0" x2="1" y2="1"><stop stop-color="rgba(7,8,13,.96)"/><stop offset="1" stop-color="rgba(18,26,51,.92)"/></linearGradient><linearGradient id="good" x1="0" y1="0" x2="1" y2="1"><stop stop-color="rgba(234,220,200,.20)"/><stop offset="1" stop-color="rgba(131,198,255,.15)"/></linearGradient><filter id="shadow"><feDropShadow dx="0" dy="18" stdDeviation="20" flood-color="black" flood-opacity=".45"/></filter><filter id="soft"><feDropShadow dx="0" dy="24" stdDeviation="24" flood-color="black" flood-opacity=".35"/></filter><filter id="heavy"><feDropShadow dx="0" dy="38" stdDeviation="38" flood-color="black" flood-opacity=".55"/></filter><filter id="glow"><feDropShadow dx="0" dy="0" stdDeviation="16" flood-color="#D8AD5E" flood-opacity=".65"/></filter><filter id="blur"><feGaussianBlur stdDeviation="3"/></filter></defs><rect width="1080" height="1920" fill="url(#bg)"/><circle cx="850" cy="220" r="300" fill="rgba(216,173,94,.17)"/><circle cx="90" cy="1420" r="340" fill="rgba(131,198,255,.11)"/><g opacity=".11">${Array.from({length:28},(_,i)=>`<path d="M${i*62-260} 1920 L${i*62+290} 960" stroke="rgba(216,173,94,.25)"/>`).join('')}</g>${scene(f)}${transition(f)}<rect width="1080" height="1920" fill="none"/></svg>`}

for (let f=0; f<FRAMES; f++) {
  const file = join(frameDir, `frame-${String(f).padStart(4,'0')}.png`);
  await sharp(Buffer.from(svg(f))).png().toFile(file);
  if (f % 30 === 0) console.log(`frame ${f}/${FRAMES}`);
}

const ffmpeg = existsSync(join(process.cwd(),'node_modules/@remotion/compositor-linux-x64-gnu/ffmpeg')) ? join(process.cwd(),'node_modules/@remotion/compositor-linux-x64-gnu/ffmpeg') : 'ffmpeg';
const output = join(outDir, 'video-demo-gratuite.mp4');
const res = spawnSync(ffmpeg, ['-y','-framerate',String(FPS),'-i',join(frameDir,'frame-%04d.png'),'-c:v','libx264','-pix_fmt','yuv420p','-movflags','+faststart',output], {stdio:'inherit'});
if (res.status !== 0) process.exit(res.status ?? 1);
console.log(`Vidéo corrigée: ${output}`);
