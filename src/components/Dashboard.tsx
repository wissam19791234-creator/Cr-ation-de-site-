import React from 'react';
import {interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';
export const Dashboard: React.FC<{compact?: boolean}> = ({compact=false}) => {
  const frame = useCurrentFrame(); const {fps}=useVideoConfig();
  const path = interpolate(frame, [8, 38], [0, 1], {extrapolateLeft:'clamp', extrapolateRight:'clamp'});
  const kpis = [['6h','/ semaine'], ['+ clair','demandes'], ['+ pro','image']];
  return <div className="mock-card" style={{height: compact ? 380 : 500}}>
    <div className="dashboard-grid">{kpis.map((k,i)=>{const s=spring({frame:frame-i*5,fps,config:{damping:16}});return <div className="kpi" key={k[0]} style={{transform:`scale(${.86+s*.14})`,opacity:Math.min(1,s)}}><strong>{k[0]}</strong><span>{k[1]}</span></div>})}</div>
    <div className="graph"><svg width="100%" height="190" viewBox="0 0 680 190"><path d="M35 145 C130 118 170 70 260 100 S410 132 500 58 610 64 650 34" fill="none" stroke="#D8AD5E" strokeWidth="10" strokeLinecap="round" strokeDasharray="820" strokeDashoffset={820 - 820*path}/><path d="M35 160 H650" stroke="rgba(255,248,237,.12)" strokeWidth="2"/><path d="M35 95 H650" stroke="rgba(255,248,237,.08)" strokeWidth="2"/></svg></div>
  </div>;
};
