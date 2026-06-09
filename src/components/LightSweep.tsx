import React from 'react';
import {Easing, interpolate, useCurrentFrame} from 'remotion';
export const LightSweep: React.FC<{start?: number; end?: number; opacity?: number}> = ({start=0,end=60,opacity=1}) => {
  const frame = useCurrentFrame();
  const x = interpolate(frame, [start, end], [-360, 1180], {extrapolateLeft:'clamp', extrapolateRight:'clamp', easing:Easing.inOut(Easing.cubic)});
  const visible = interpolate(frame, [start, start+8, end-8, end], [0, opacity, opacity, 0], {extrapolateLeft:'clamp', extrapolateRight:'clamp'});
  return <div className="light-sweep" style={{left:x, opacity:visible}} />;
};
