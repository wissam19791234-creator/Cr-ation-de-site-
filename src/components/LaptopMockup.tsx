import React from 'react';
import {Dashboard} from './Dashboard';
export const LaptopMockup: React.FC<{style?: React.CSSProperties}> = ({style}) => <div className="laptop" style={style}><div className="laptop-screen"><Dashboard compact /></div><div className="laptop-base" /></div>;
