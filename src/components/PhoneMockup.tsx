import React from 'react';
import {interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {Dashboard} from './Dashboard';
import {QuoteFormMini} from './QuoteForm';
export const PhoneMockup: React.FC<{variant?: 'site'|'form'|'dashboard'; style?: React.CSSProperties}> = ({variant='site', style}) => {
  const frame=useCurrentFrame(); const {fps}=useVideoConfig(); const s=spring({frame,fps,config:{damping:18,stiffness:90}});
  return <div className="phone" style={{...style, transform:`scale(${interpolate(s,[0,1],[.92,1])}) ${style?.transform ?? ''}`}}><div className="phone-screen">
    {variant === 'site' && <><div className="screen-top"><div className="mini-title"/><div className="mini-line" style={{width:'82%'}}/><div className="mini-line" style={{width:'56%'}}/><div className="mini-btn"/></div><div style={{padding:22,display:'grid',gap:16}}><div className="mock-card" style={{height:120}}/><div className="mock-card" style={{height:120}}/><div className="mock-card" style={{height:160}}/></div></>}
    {variant === 'form' && <QuoteFormMini />}
    {variant === 'dashboard' && <div style={{padding:22, transform:'scale(.52)', transformOrigin:'top left', width:700}}><Dashboard compact /></div>}
  </div></div>;
};
