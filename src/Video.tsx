import React from 'react';
import {AbsoluteFill, Easing, interpolate, useCurrentFrame} from 'remotion';
import {CaptionBar} from './components/CaptionBar';
import {CTAButton} from './components/CTAButton';
import {colors, SceneText} from './components/SceneText';
import {TransitionLayer} from './components/TransitionLayer';

const sceneOpacity = (frame: number, start: number, end: number) => {
  const fadeIn = interpolate(frame, [start - 10, start], [0, 1], {extrapolateLeft:'clamp', extrapolateRight:'clamp'});
  const fadeOut = interpolate(frame, [end - 12, end], [1, 0], {extrapolateLeft:'clamp', extrapolateRight:'clamp'});
  return Math.min(fadeIn, fadeOut);
};

const Shell: React.FC<{children: React.ReactNode; start: number; end: number; zoom?: number}> = ({children, start, end, zoom = .03}) => {
  const frame = useCurrentFrame();
  const o = sceneOpacity(frame, start, end);
  const z = interpolate(frame, [start, end], [1, 1 + zoom], {extrapolateLeft:'clamp', extrapolateRight:'clamp'});
  return <AbsoluteFill style={{opacity:o, transform:`scale(${z})`, filter:`blur(${(1-o)*8}px)`}}>{children}</AbsoluteFill>;
};

const Bg = () => <AbsoluteFill style={{background:`radial-gradient(circle at 72% 18%, rgba(216,173,94,.24), transparent 34%), radial-gradient(circle at 16% 70%, rgba(131,198,255,.15), transparent 38%), linear-gradient(145deg, ${colors.ink}, ${colors.midnight} 54%, ${colors.navy})`}}>
  <div style={{position:'absolute', inset:0, opacity:.14, backgroundImage:'linear-gradient(rgba(216,173,94,.12) 1px, transparent 1px), linear-gradient(90deg, rgba(131,198,255,.10) 1px, transparent 1px)', backgroundSize:'62px 62px', transform:'perspective(900px) rotateX(62deg) translateY(440px)', transformOrigin:'bottom'}} />
  <div style={{position:'absolute', right:-120, top:120, width:360, height:360, borderRadius:999, background:'radial-gradient(circle, rgba(216,173,94,.32), transparent 66%)', filter:'blur(4px)'}} />
  <div style={{position:'absolute', left:-140, bottom:240, width:330, height:330, borderRadius:999, background:'radial-gradient(circle, rgba(131,198,255,.18), transparent 68%)', filter:'blur(5px)'}} />
</AbsoluteFill>;

const Phone = ({x=350,y=520,scale=1}:{x?:number;y?:number;scale?:number}) => <div style={{position:'absolute', left:x, top:y, width:360*scale, height:720*scale, borderRadius:54*scale, padding:22*scale, background:'linear-gradient(145deg,#05060A,#202947)', boxShadow:'0 40px 110px rgba(0,0,0,.55), 0 0 80px rgba(216,173,94,.2)', transform:'rotateY(-12deg) rotateX(5deg)'}}>
  <div style={{position:'absolute', top:18*scale, left:'50%', width:100*scale, height:14*scale, borderRadius:99, transform:'translateX(-50%)', background:'rgba(255,248,237,.22)'}} />
  <div style={{height:'100%', borderRadius:36*scale, overflow:'hidden', background:'linear-gradient(160deg,#101832,#07080D)', border:'1px solid rgba(255,248,237,.10)'}}>
    <div style={{height:'30%', background:'radial-gradient(circle at 74% 18%, rgba(216,173,94,.44), transparent 48%), linear-gradient(135deg,rgba(255,248,237,.13),rgba(131,198,255,.08))', padding:28*scale}}><Line w={72}/><Line w={52}/><div style={{width:'58%', height:46*scale, marginTop:22*scale, borderRadius:24*scale, background:'linear-gradient(135deg,#D8AD5E,#FFE7B0)', boxShadow:'0 0 30px rgba(216,173,94,.42)'}} /></div>
    <div style={{padding:22*scale, display:'grid', gap:16*scale}}><Card h={105*scale}/><Card h={105*scale}/><Card h={140*scale}/></div>
  </div>
</div>;
const Line = ({w=80}:{w?:number}) => <div style={{width:`${w}%`, height:12, borderRadius:99, background:'rgba(255,248,237,.62)', margin:'12px 0'}} />;
const Card = ({h=100}:{h?:number}) => <div style={{height:h, borderRadius:24, background:'rgba(255,248,237,.095)', border:'1px solid rgba(255,248,237,.12)', boxShadow:'inset 0 1px 0 rgba(255,255,255,.08)'}} />;

const DmBubble = ({children,x,y,delay=0}:{children:string;x:number;y:number;delay?:number}) => {
  const frame = useCurrentFrame();
  const o = interpolate(frame, [54+delay, 64+delay], [0,1], {extrapolateLeft:'clamp', extrapolateRight:'clamp'});
  const align = interpolate(frame, [103, 114], [0, 1], {extrapolateLeft:'clamp', extrapolateRight:'clamp', easing:Easing.out(Easing.cubic)});
  const nx = x + (620 - x) * align;
  const ny = y + (350 + delay * 10 - y) * align;
  return <div style={{position:'absolute', left:nx, top:ny, opacity:o, transform:`translateY(${(1-o)*28 + Math.sin((frame+delay)/12)*6}px)`, padding:'22px 28px', borderRadius:32, background:'rgba(255,248,237,.13)', border:'1px solid rgba(255,248,237,.16)', color:colors.ivory, fontSize:36, fontWeight:850, boxShadow:'0 24px 70px rgba(0,0,0,.28)', backdropFilter:'blur(14px)'}}>{children}</div>;
};

const Split = ({clean=false}:{clean?:boolean}) => <div style={{position:'absolute', left:70, right:70, top:485, height:900, borderRadius:54, overflow:'hidden', display:'grid', gridTemplateColumns:'1fr 1fr', border:'1px solid rgba(255,248,237,.13)', boxShadow:'0 42px 130px rgba(0,0,0,.38)'}}>
  <div style={{background:'linear-gradient(145deg,rgba(7,8,13,.94),rgba(18,26,51,.9))', padding:36, filter:'blur(1.2px) saturate(.72)'}}><Label>AVANT</Label>{['C’est combien ?','Quelle date ?','Infos ?','Lieu ?'].map((m,i)=><div key={m} style={{marginTop:28, padding:'18px 20px', borderRadius:24, background:'rgba(255,248,237,.10)', color:'rgba(255,248,237,.72)', fontSize:28, fontWeight:800, transform:`translateX(${i%2?45:0}px)`}}>{m}</div>)}</div>
  <div style={{background:'linear-gradient(145deg,rgba(234,220,200,.18),rgba(131,198,255,.14))', padding:36, boxShadow:'inset 0 0 120px rgba(216,173,94,.18)'}}><Label>APRÈS</Label>{clean ? <Form mini/> : [1,2,3].map((_,i)=><div key={i} style={{height:140, marginTop:32, borderRadius:28, background:'rgba(255,248,237,.12)', border:'1px solid rgba(255,248,237,.14)', padding:24}}><Line w={78}/><Line w={48}/></div>)}</div>
  <div style={{position:'absolute', top:0, bottom:0, left:'50%', width:5, background:colors.champagne, boxShadow:'0 0 32px rgba(216,173,94,.8)'}} />
</div>;
const Label = ({children}:{children:React.ReactNode}) => <div style={{fontSize:26, fontWeight:900, letterSpacing:'.22em', color:colors.champagne}}>{children}</div>;

const Dashboard = () => {
  const frame = useCurrentFrame();
  const p = interpolate(frame, [184, 215], [0,1], {extrapolateLeft:'clamp', extrapolateRight:'clamp'});
  const kpis = ['+ clair','+ pro','moins de chaos'];
  return <div style={{position:'absolute', left:110, right:110, top:545, height:650, borderRadius:46, background:'linear-gradient(145deg,rgba(255,248,237,.10),rgba(131,198,255,.07))', border:'1px solid rgba(255,248,237,.14)', padding:36, boxShadow:'0 40px 120px rgba(0,0,0,.38)'}}>
    <div style={{display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:18}}>{kpis.map((k,i)=><div key={k} style={{height:150, borderRadius:28, padding:24, background:'rgba(255,248,237,.10)', border:'1px solid rgba(255,248,237,.13)', transform:`scale(${interpolate(frame,[176+i*6,190+i*6],[.85,1],{extrapolateLeft:'clamp',extrapolateRight:'clamp'})})`}}><div style={{fontSize:34, fontWeight:900, color:i===0?colors.champagne:colors.ivory}}>{k}</div><Line w={55}/></div>)}</div>
    <div style={{height:300, marginTop:32, borderRadius:34, background:'rgba(7,8,13,.36)', border:'1px solid rgba(255,248,237,.09)', padding:28}}><svg viewBox="0 0 760 270" width="100%" height="100%"><path d="M35 205 C140 170 190 82 295 125 S475 205 565 74 700 88 735 40" fill="none" stroke={colors.champagne} strokeWidth="12" strokeLinecap="round" strokeDasharray="980" strokeDashoffset={980-980*p}/><path d="M35 220 H735" stroke="rgba(255,248,237,.12)" strokeWidth="3"/><path d="M35 130 H735" stroke="rgba(255,248,237,.08)" strokeWidth="3"/></svg></div>
  </div>;
};

const Form = ({mini=false}:{mini?:boolean}) => {
  const frame = useCurrentFrame();
  const fields = ['Prénom','Téléphone','Date','Lieu','Besoin'];
  return <div style={{width: mini ? '100%' : 700, margin: mini ? '26px 0 0' : undefined, position: mini ? 'relative' : 'absolute', left: mini ? undefined : 190, top: mini ? undefined : 500, borderRadius: mini ? 30 : 44, background:'rgba(255,248,237,.11)', border:'1px solid rgba(255,248,237,.15)', padding: mini ? 22 : 42, boxShadow:'0 38px 100px rgba(0,0,0,.32)'}}>{fields.map((f,i)=>{const fill=interpolate(frame,[236+i*5,249+i*5],[0,1],{extrapolateLeft:'clamp',extrapolateRight:'clamp'});return <div key={f} style={{height: mini?58:78, borderRadius:22, background:'rgba(255,248,237,.09)', marginBottom:mini?12:18, padding:'12px 20px', position:'relative'}}><div style={{fontSize:mini?16:22, color:'rgba(255,248,237,.58)', fontWeight:800}}>{f}</div><div style={{height:mini?7:10, width:`${20+fill*58}%`, marginTop:8, borderRadius:99, background:'linear-gradient(90deg,rgba(255,248,237,.86),rgba(216,173,94,.58))'}}/><div style={{position:'absolute', right:18, top:mini?18:26, color:colors.champagne, fontSize:mini?20:26, opacity:fill}}>✓</div></div>})}<div style={{height:mini?58:82, borderRadius:28, display:'flex', alignItems:'center', justifyContent:'center', background:'linear-gradient(135deg,#D8AD5E,#FFE7B0)', color:'#121A33', fontSize:mini?18:28, fontWeight:900, boxShadow:'0 0 44px rgba(216,173,94,.42)'}}>Demander un devis</div></div>;
};

const FinalRig = () => <><div style={{position:'absolute', inset:'300px -90px auto -90px', height:650, display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:22, transform:'rotate(-7deg)', opacity:.38}}>{['Traiteur','Hôtel','Salon','Coach','Restaurant','Photo'].map((n)=><div key={n} style={{height:210, borderRadius:28, background:'rgba(255,248,237,.08)', border:'1px solid rgba(255,248,237,.13)', padding:22}}><div style={{height:78, borderRadius:20, background:'linear-gradient(135deg,rgba(216,173,94,.42),rgba(131,198,255,.20))'}}/><div style={{fontSize:24, fontWeight:900, marginTop:18}}>{n}</div><Line w={60}/></div>)}</div><Dashboard/><Phone x={370} y={590} scale={.74}/></>;

export const Video: React.FC = () => {
  const frame = useCurrentFrame();
  return <AbsoluteFill style={{fontFamily:'Inter, ui-sans-serif, system-ui', background:colors.ink, overflow:'hidden'}}>
    <Bg />
    <Shell start={0} end={64} zoom={.06}><Phone x={350} y={520}/><SceneText start={0} title="Ton Instagram attire." subtitle="Ton site doit convertir." highlight={['instagram','site','convertir']} top={115}/><CaptionBar text="Instagram capte l’attention. Le site transforme l’intérêt en demande claire." /></Shell>
    <Shell start={50} end={124}><SceneText start={55} title="Les DM font perdre du temps." highlight={['dm','temps']} top={120} compact/><DmBubble x={80} y={390} delay={0}>C’est combien ?</DmBubble><DmBubble x={505} y={505} delay={5}>Quelle date ?</DmBubble><DmBubble x={115} y={650} delay={10}>Combien d’invités ?</DmBubble><DmBubble x={500} y={795} delay={15}>Vous êtes où ?</DmBubble><CaptionBar text="Trop de messages incomplets = trop d’allers-retours." /></Shell>
    <Shell start={110} end={184}><SceneText start={114} title="Une vraie vitrine change tout." highlight={['vitrine']} top={105} compact/><Split/><CaptionBar text="Le chaos se transforme en parcours clair." /></Shell>
    <Shell start={170} end={244}><SceneText start={176} title="Gain de temps." subtitle="Demandes plus claires." highlight={['temps','claires']} top={112} compact/><Dashboard/><CaptionBar text="Simulation visuelle — pas de promesse de résultat garanti." /></Shell>
    <Shell start={230} end={306}><SceneText start={234} title="Le client remplit." subtitle="Vous recevez." highlight={['client','recevez']} top={110} compact/><Form/><CaptionBar text="Les bonnes infos arrivent au bon endroit." /></Shell>
    <Shell start={294} end={376}><SceneText start={300} title="Sans site : confusion." subtitle="Avec site : clarté." highlight={['confusion','clarté']} top={96} compact/><Split clean/><CaptionBar text="Un formulaire propre remplace les demandes floues." /></Shell>
    <Shell start={364} end={450} zoom={-.02}><FinalRig/><SceneText start={390} title="Démo gratuite." subtitle="Venez DM." highlight={['démo','gratuite','dm']} top={94}/><CTAButton start={429}/><CaptionBar text="Je te montre une démo de site premium pour ton commerce." /></Shell>
    <TransitionLayer />
    <div style={{position:'absolute', inset:0, pointerEvents:'none', opacity:.10, mixBlendMode:'overlay', backgroundImage:'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 180 180\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'.9\' numOctaves=\'2\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'180\' height=\'180\' filter=\'url(%23n)\' opacity=\'.45\'/%3E%3C/svg%3E")'}} />
  </AbsoluteFill>;
};
