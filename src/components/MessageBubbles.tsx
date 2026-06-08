import React from 'react';
import {interpolate, useCurrentFrame} from 'remotion';
const messages = ['C’est combien ?', 'Quelle date ?', 'Combien d’invités ?', 'Vous êtes où ?', 'Quel besoin ?'];
const pos = [[92,360],[410,505],[115,665],[455,820],[150,990]];
export const MessageBubbles: React.FC<{compact?: boolean}> = ({compact=false}) => {
  const frame = useCurrentFrame();
  return <>{messages.map((m,i)=>{const o=interpolate(frame,[i*5,i*5+12],[0,1],{extrapolateLeft:'clamp',extrapolateRight:'clamp'});return <div key={m} className={`bubble ${i%2?'alt':''}`} style={{left:pos[i][0],top:pos[i][1],opacity:o,transform:`translateY(${(1-o)*35 + Math.sin((frame+i*8)/18)*7}px) scale(${compact ? .86 : 1})`,filter:`blur(${(1-o)*12}px)`}}>{m}</div>})}</>;
};
