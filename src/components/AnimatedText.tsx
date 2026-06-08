import React from 'react';
import {Easing, interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';

type Props = { text: string; className?: string; start?: number; highlight?: string[]; delayStep?: number };
export const AnimatedText: React.FC<Props> = ({text, className='', start=0, highlight=[], delayStep=4}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  return <div className={className}>{text.split(' ').map((word, i) => {
    const local = frame - start - i * delayStep;
    const enter = spring({frame: local, fps, config: {damping: 18, stiffness: 130, mass: .55}});
    const opacity = interpolate(local, [0, 10], [0, 1], {extrapolateLeft:'clamp', extrapolateRight:'clamp', easing:Easing.out(Easing.cubic)});
    const clean = word.replace(/[.:,]/g, '').toLowerCase();
    return <span key={`${word}-${i}`} className={`word ${highlight.includes(clean) ? 'champagne' : ''}`} style={{opacity, transform:`translateY(${interpolate(enter,[0,1],[34,0])}px)`, filter:`blur(${interpolate(opacity,[0,1],[14,0])}px)`}}>{word}</span>;
  })}</div>;
};
