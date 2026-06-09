import React from 'react';
import {Easing, interpolate, useCurrentFrame} from 'remotion';
import {colors} from './SceneText';

const windows = [54, 114, 174, 234, 294, 364];
export const TransitionLayer: React.FC = () => {
  const frame = useCurrentFrame();
  return <>
    {windows.map((start, i) => {
      const p = interpolate(frame, [start, start + 14], [0, 1], {extrapolateLeft:'clamp', extrapolateRight:'clamp', easing:Easing.inOut(Easing.cubic)});
      const opacity = p > 0 && p < 1 ? 1 : 0;
      return <div key={start} style={{position:'absolute', zIndex:90, top:-260, bottom:-260, left: interpolate(p, [0,1], [-420, 1220]), width: i === 2 ? 1180 : 210, opacity, transform: i === 2 ? 'none' : 'rotate(18deg)', background: i === 2 ? `linear-gradient(90deg, transparent, ${colors.champagne}55, transparent)` : `linear-gradient(90deg, transparent, ${colors.champagne}88, rgba(255,248,237,.32), transparent)`, filter:'blur(2px)', mixBlendMode:'screen'}} />;
    })}
  </>;
};
