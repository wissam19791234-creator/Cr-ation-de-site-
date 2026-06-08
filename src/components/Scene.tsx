import React from 'react';
import {AbsoluteFill, Easing, interpolate, useCurrentFrame} from 'remotion';
import {Grain} from './Grain';

type Props = {children: React.ReactNode; asset?: React.ReactNode; fadeOutAt?: number; duration?: number};
export const Scene: React.FC<Props> = ({children, asset, duration=60}) => {
  const frame = useCurrentFrame();
  const fadeIn = interpolate(frame, [0, 10], [0, 1], {extrapolateLeft:'clamp', extrapolateRight:'clamp'});
  const fadeOut = interpolate(frame, [duration-10, duration], [1, 0], {extrapolateLeft:'clamp', extrapolateRight:'clamp', easing:Easing.in(Easing.cubic)});
  return <AbsoluteFill className="scene" style={{opacity: Math.min(fadeIn, fadeOut)}}>{asset}{children}<Grain /></AbsoluteFill>;
};
