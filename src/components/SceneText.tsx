import React from 'react';
import {Easing, interpolate, useCurrentFrame} from 'remotion';

export const colors = {
  ink: '#07080D', midnight: '#0E172A', navy: '#121A33', ivory: '#FFF8ED', champagne: '#D8AD5E', beige: '#EADCC8', lilac: '#D8CCFF', blue: '#83C6FF'
};

type Props = {title: string; subtitle?: string; start: number; highlight?: string[]; align?: 'left'|'center'; top?: number; compact?: boolean};
export const SceneText: React.FC<Props> = ({title, subtitle, start, highlight = [], align = 'center', top = 120, compact = false}) => {
  const frame = useCurrentFrame();
  const local = frame - start;
  const opacity = interpolate(local, [0, 10], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.out(Easing.cubic)});
  const y = interpolate(local, [0, 12], [34, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.out(Easing.cubic)});
  const blur = interpolate(opacity, [0, 1], [16, 0]);
  const scale = interpolate(local, [0, 12], [.96, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const render = (text: string, size: number, weight: number) => (
    <div style={{fontSize: size, lineHeight: .94, fontWeight: weight, letterSpacing: '-0.065em'}}>
      {text.split(' ').map((w, i) => {
        const clean = w.toLowerCase().replace(/[.:,]/g, '');
        return <span key={i} style={{color: highlight.includes(clean) ? colors.champagne : colors.ivory, textShadow: highlight.includes(clean) ? '0 0 34px rgba(216,173,94,.46)' : '0 18px 54px rgba(0,0,0,.45)'}}>{w}{' '}</span>;
      })}
    </div>
  );
  return <div style={{position:'absolute', zIndex:50, left:62, right:62, top, textAlign: align, opacity, transform:`translateY(${y}px) scale(${scale})`, filter:`blur(${blur}px)`, background:'rgba(0,0,0,.34)', border:'1px solid rgba(255,248,237,.10)', borderRadius:30, padding:'22px 30px', backdropFilter:'blur(12px)'}}>
    {render(title, compact ? 76 : 104, 900)}
    {subtitle ? <div style={{height:14}} /> : null}
    {subtitle ? render(subtitle, compact ? 50 : 58, 850) : null}
  </div>;
};
