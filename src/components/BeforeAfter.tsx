import React from 'react';
import {interpolate, useCurrentFrame} from 'remotion';
import {QuoteForm} from './QuoteForm';
import {Dashboard} from './Dashboard';
export const BeforeAfter: React.FC<{labels?: boolean}> = ({labels=true}) => {
  const frame=useCurrentFrame(); const reveal=interpolate(frame,[0,32],[0,1],{extrapolateLeft:'clamp',extrapolateRight:'clamp'});
  return <div className="split"><div className="split-side split-left" style={{filter:`blur(${interpolate(reveal,[0,1],[0,2])}px) saturate(.72)`}}>{labels&&<div className="kicker">Sans site</div>} {['Date ?','Lieu ?','Budget ?','Infos ?'].map((t,i)=><div key={t} className="bubble" style={{position:'relative',left:i%2?70:0,top:40+i*60,fontSize:25,display:'inline-block',margin:12,opacity:.82}}>{t}</div>)}</div><div className="split-side split-right" style={{boxShadow:`inset 0 0 ${80*reveal}px rgba(216,173,94,.18)`}}>{labels&&<div className="kicker">Avec site</div>}<div style={{transform:'scale(.43)',transformOrigin:'top left',marginTop:42}}><QuoteForm /></div><div style={{transform:'scale(.48)',transformOrigin:'top left',marginTop:-250}}><Dashboard compact /></div></div><div className="split-line" style={{transform:`scaleY(${reveal})`}} /></div>;
};
