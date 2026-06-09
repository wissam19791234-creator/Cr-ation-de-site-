import React from 'react';
import {Img, staticFile} from 'remotion';
export const GeneratedImage: React.FC<{name: string; opacity?: number}> = ({name, opacity=.32}) => <Img className="asset-img" style={{opacity}} src={staticFile(`generated-assets/${name}`)} />;
export const GeneratedFallback: React.FC = () => <div className="asset-fallback" />;
