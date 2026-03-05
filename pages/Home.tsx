import React, { useState, useEffect } from 'react';
import { PageID } from '../types';
import { NAV_ITEMS, HOME_PALETTE } from '../data';
import { NetworkBackground } from '../components/NetworkBackground';

const HomeContent = ({ onNavigate }: { onNavigate: (id: PageID) => void }) => {
  const [greeting, setGreeting] = useState('Günaydın!');
  useEffect(() => {
    const h = new Date().getHours();
    setGreeting(h < 12 ? 'Günaydın!' : h < 18 ? 'Tünaydın!' : 'İyi Akşamlar!');
  }, []);

  return (
    <div className="p-6 space-y-10 animate-in fade-in duration-700 w-full px-6 lg:px-8">
      <div className="relative h-64 lg:h-72 w-full bg-theme-primary rounded-[32px] overflow-hidden shadow-2xl group transition-all duration-500">
        <NetworkBackground />

        {/* Dark gradient overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#012A36]/90 via-[#012A36]/40 to-transparent pointer-events-none"></div>

        <div className="absolute inset-0 flex flex-col justify-center px-12 lg:px-20 z-10 pointer-events-none">
          <div className="mb-2">
            <span className="text-theme-accent font-bold tracking-[0.2em] text-sm md:text-base uppercase animate-in slide-in-from-left-4 duration-700 delay-100">{greeting}</span>
          </div>
          <div className="flex flex-col leading-tight">
            <h1 className="text-5xl md:text-7xl font-bold text-white tracking-tight drop-shadow-lg animate-in slide-in-from-left-4 duration-700 delay-200">Pınar Süt</h1>
            <h1 className="text-5xl md:text-7xl font-bold text-white/50 tracking-tight animate-in slide-in-from-left-4 duration-700 delay-300">Yönetim Paneli</h1>
          </div>
        </div>
      </div>

      {/* Updated grid to lg:grid-cols-5 for 5 buttons per row */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 max-w-[1600px] mx-auto">
        {NAV_ITEMS.map((item, idx) => (
          <button
            key={item.id}
            onClick={() => onNavigate(item.id)}
            style={{ backgroundColor: HOME_PALETTE[idx % HOME_PALETTE.length] }}
            className="group flex flex-col items-center justify-center p-6 rounded-2xl transition-all duration-300 transform hover:-translate-y-2 hover:shadow-2xl h-52 w-full text-white border border-transparent hover:border-white/30"
          >
            <div className="mb-4 transition-transform group-hover:scale-110">
              {React.cloneElement(item.icon as React.ReactElement<any>, { size: 48 })}
            </div>
            <span className="font-bold text-[13px] text-center px-2 uppercase tracking-widest leading-tight">{item.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default HomeContent;