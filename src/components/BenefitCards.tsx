import React from 'react';
import {spring, useCurrentFrame, useVideoConfig} from 'remotion';
const benefits = [['⌁','Gain de temps'], ['✓','Demandes claires'], ['✦','Image premium']];
export const BenefitCards: React.FC = () => {const frame=useCurrentFrame(); const {fps}=useVideoConfig(); return <div className="benefits">{benefits.map((b,i)=>{const s=spring({frame:frame-i*5,fps,config:{damping:18}});return <div className="benefit" key={b[1]} style={{opacity:s,transform:`translateY(${(1-s)*30}px)`}}><div className="benefit-icon">{b[0]}</div><h3>{b[1]}</h3></div>})}</div>};
