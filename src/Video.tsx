import React from 'react';
import {AbsoluteFill, Easing, interpolate, Sequence, useCurrentFrame} from 'remotion';
import {AnimatedText} from './components/AnimatedText';
import {BeforeAfter} from './components/BeforeAfter';
import {BenefitCards} from './components/BenefitCards';
import {FinalCTA} from './components/FinalCTA';
import {GeneratedImage} from './components/GeneratedImage';
import {LaptopMockup} from './components/LaptopMockup';
import {LightSweep} from './components/LightSweep';
import {MessageBubbles} from './components/MessageBubbles';
import {PhoneMockup} from './components/PhoneMockup';
import {QuoteForm} from './components/QuoteForm';
import {Scene} from './components/Scene';

const sceneDurations = {hook:60, dm:60, transform:60, dash:60, form:66, before:66, cta:78};

const Hook = () => {
  const frame = useCurrentFrame();
  const zoom = interpolate(frame, [0, 60], [.98, 1.06], {easing:Easing.out(Easing.cubic), extrapolateRight:'clamp'});
  return <Scene duration={60} asset={<GeneratedImage name="01-hook-phone.png" opacity={.22} />}><div style={{position:'absolute',left:325,top:430,transform:`scale(${zoom})`}}><PhoneMockup variant="site" /></div><div className="text-block" style={{top:125}}><AnimatedText text="Ton Instagram attire." className="headline" highlight={['instagram']} /><div style={{height:18}}/><AnimatedText text="Ton site doit convertir." className="subline" start={24} highlight={['site','convertir']} /></div><LightSweep start={5} end={54}/></Scene>;
};
const DmProblem = () => <Scene duration={60} asset={<GeneratedImage name="02-dm-chaos.png" opacity={.22} />}><div className="text-block" style={{top:120}}><AnimatedText text="Les DM font perdre du temps." className="headline small" highlight={['dm','temps']} /></div><MessageBubbles/><LightSweep start={8} end={55} opacity={.75}/></Scene>;
const Transform = () => <Scene duration={60} asset={<GeneratedImage name="03-before-after.png" opacity={.18} />}><div className="text-block" style={{top:104,textAlign:'center'}}><AnimatedText text="Une vraie vitrine change tout." className="headline small" highlight={['vitrine']} /></div><div style={{position:'absolute',left:80,top:430}}><BeforeAfter labels={false}/></div><LightSweep start={10} end={45}/></Scene>;
const DashboardScene = () => <Scene duration={60} asset={<GeneratedImage name="05-dashboard.png" opacity={.18} />}><div className="text-block" style={{top:112}}><AnimatedText text="Gain de temps." className="headline small" highlight={['temps']} /><AnimatedText text="Demandes plus claires." className="subline" start={30} highlight={['claires']} /></div><LaptopMockup style={{position:'absolute',left:130,top:660}}/><div style={{position:'absolute',left:84,bottom:245}}><BenefitCards /></div><div style={{position:'absolute',right:70,bottom:92,fontSize:24,color:'rgba(255,248,237,.48)'}}>Simulation visuelle</div><LightSweep start={0} end={55} opacity={.55}/></Scene>;
const FormScene = () => <Scene duration={66} asset={<GeneratedImage name="06-quote-form.png" opacity={.16} />}><div className="text-block" style={{top:116}}><AnimatedText text="Le client remplit." className="headline small" highlight={['client']} /><AnimatedText text="Vous recevez." className="subline" start={30} highlight={['recevez']} /></div><div style={{position:'absolute',left:180,top:495}}><QuoteForm /></div><LightSweep start={20} end={60}/></Scene>;
const BeforeAfterScene = () => <Scene duration={66} asset={<GeneratedImage name="08-benefits.png" opacity={.13} />}><div className="text-block" style={{top:104,textAlign:'center'}}><AnimatedText text="Sans site : confusion." className="subline" highlight={['confusion']} /><AnimatedText text="Avec site : clarté." className="subline" start={25} highlight={['clarté']} /></div><div style={{position:'absolute',left:80,top:450}}><BeforeAfter /></div><LightSweep start={18} end={58}/></Scene>;
const CtaScene = () => <Scene duration={78} asset={<GeneratedImage name="10-final-cta.png" opacity={.16} />}><FinalCTA/><LightSweep start={8} end={66}/></Scene>;

export const Video: React.FC = () => <AbsoluteFill className="video-root"><Sequence durationInFrames={sceneDurations.hook}><Hook /></Sequence><Sequence from={60} durationInFrames={sceneDurations.dm}><DmProblem /></Sequence><Sequence from={120} durationInFrames={sceneDurations.transform}><Transform /></Sequence><Sequence from={180} durationInFrames={sceneDurations.dash}><DashboardScene /></Sequence><Sequence from={240} durationInFrames={sceneDurations.form}><FormScene /></Sequence><Sequence from={306} durationInFrames={sceneDurations.before}><BeforeAfterScene /></Sequence><Sequence from={372} durationInFrames={sceneDurations.cta}><CtaScene /></Sequence></AbsoluteFill>;
