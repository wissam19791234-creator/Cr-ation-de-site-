import React from 'react';
import {interpolate, useCurrentFrame} from 'remotion';
const fields = ['Prénom','Téléphone','Date','Lieu','Invités','Besoin'];
export const QuoteForm: React.FC<{scale?: number}> = ({scale=1}) => {
  const frame = useCurrentFrame();
  return <div className="form" style={{transform:`scale(${scale})`}}>{fields.map((f,i)=>{
    const fill = interpolate(frame, [i*5, i*5+14], [0, 1], {extrapolateLeft:'clamp', extrapolateRight:'clamp'});
    return <div className="field" key={f}><label>{f}</label><div className="fill" style={{width:`${Math.round((38+i*7)*fill+20)}%`, opacity:.3+fill*.7}}/><span className="check" style={{opacity:fill}}>✓</span></div>})}<div className="gold-btn">Demander un devis</div></div>;
};
export const QuoteFormMini: React.FC = () => <div style={{padding:24}}><QuoteForm scale={.51}/></div>;
