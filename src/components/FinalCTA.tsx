import React from 'react';
import {interpolate, useCurrentFrame} from 'remotion';
import {PhoneMockup} from './PhoneMockup';
import {LaptopMockup} from './LaptopMockup';
import {PortfolioWall} from './PortfolioWall';
export const FinalCTA: React.FC = () => {const frame=useCurrentFrame(); const pulse=interpolate(Math.sin(frame/7),[-1,1],[.96,1.04]);return <><PortfolioWall/><LaptopMockup style={{position:'absolute',left:132,top:570,transform:'scale(.9)'}}/><PhoneMockup variant="form" style={{position:'absolute',left:340,top:470,transform:'scale(.72)'}}/><div className="text-block" style={{top:118,textAlign:'center'}}><div className="headline champagne">Démo gratuite.</div><div className="subline">Venez DM.</div></div><div className="gold-btn" style={{position:'absolute',left:260,right:260,bottom:180,transform:`scale(${pulse})`}}>Envoyez DÉMO</div></>};
