import React from 'react';
import {interpolate, useCurrentFrame} from 'remotion';
export const CTAButton: React.FC<{start: number}> = ({start}) => {
  const frame = useCurrentFrame();
  const local = frame - start;
  const opacity = interpolate(local, [0, 8], [0, 1], {extrapolateLeft:'clamp', extrapolateRight:'clamp'});
  const pulse = interpolate(Math.sin(frame / 6), [-1, 1], [.96, 1.045]);
  return <div style={{position:'absolute', zIndex:70, left:230, right:230, bottom:158, height:98, borderRadius:34, display:'flex', alignItems:'center', justifyContent:'center', background:'linear-gradient(135deg,#D8AD5E,#FFE7B0)', color:'#121A33', fontSize:34, fontWeight:950, letterSpacing:'-.03em', opacity, transform:`scale(${pulse})`, boxShadow:'0 0 58px rgba(216,173,94,.52), 0 28px 80px rgba(0,0,0,.36)'}}>Envoyez DÉMO</div>;
};
