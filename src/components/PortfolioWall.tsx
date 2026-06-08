import React from 'react';
const names = ['Traiteur','Hôtel','Salon','Coach','Restaurant','Photographe'];
export const PortfolioWall: React.FC = () => <div className="portfolio">{names.map((n,i)=><div className="site-tile" key={n}><div className="site-hero"/><div className="site-name">{n}</div><div className="mini-line" style={{width:'76%'}}/><div className="mini-line" style={{width:'52%'}}/><div className="mini-btn" style={{width:112,height:30}}/></div>)}</div>;
