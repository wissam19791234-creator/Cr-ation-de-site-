import React from 'react';
import {Composition} from 'remotion';
import {Video} from './Video';
import './styles.css';

export const RemotionRoot: React.FC = () => <Composition id="DemoVideo" component={Video} durationInFrames={450} fps={30} width={1080} height={1920} />;
