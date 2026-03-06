import React, { useState, useEffect } from 'react';
import { PageID } from '../types';
import { NAV_ITEMS, HOME_PALETTE } from '../data';
import { NetworkBackground } from '../components/NetworkBackground';

const HomeContent = ({ onNavigate }: { onNavigate: (id: PageID) => void }) => {
  const [greeting, setGreeting] = useState('Günaydın!');
  const [currentDate, setCurrentDate] = useState('');

  useEffect(() => {
    const updateTimeContext = () => {
      const now = new Date();
      const h = now.getHours();
      setGreeting(h < 12 ? 'Günaydın!' : h < 18 ? 'Tünaydın!' : 'İyi Akşamlar!');

      const options: Intl.DateTimeFormatOptions = {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      };
      setCurrentDate(now.toLocaleDateString('tr-TR', options).replace(',', ''));
    };

    updateTimeContext();
    const timer = setInterval(updateTimeContext, 60000); // Update every minute
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="p-6 space-y-10 animate-in fade-in duration-700 w-full px-6 lg:px-8">
      <div className="relative h-64 lg:h-72 w-full bg-theme-primary rounded-[32px] overflow-hidden shadow-2xl group transition-all duration-500">
        <NetworkBackground />

        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-[#012A36]/60 pointer-events-none"></div>

        {/* Centered Main Content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center z-10 pointer-events-none -mt-4">
          <span className="text-white/90 font-semibold tracking-[0.3em] text-lg md:text-xl uppercase animate-in fade-in slide-in-from-bottom-2 duration-700 delay-100 mb-5 drop-shadow-sm">
            {greeting}
          </span>

          <div className="flex items-center gap-3 md:gap-4 animate-in fade-in slide-in-from-bottom-3 duration-700 delay-200">
            <div className="flex flex-col md:flex-row md:items-center gap-x-3 gap-y-1">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tight drop-shadow-lg leading-none">Pınar Süt</h1>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-theme-accent tracking-normal drop-shadow-[0_2px_15px_rgba(234,179,8,0.2)] leading-none">Yönetim Paneli</h1>
            </div>
          </div>
        </div>

        {/* Elegant Horizontal Divider */}
        <div className="absolute inset-x-0 bottom-[4.5rem] flex justify-center z-10 pointer-events-none animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300">
          <div className="w-1/2 md:w-1/3 max-w-sm h-0.5 bg-gradient-to-r from-transparent via-white/30 to-transparent shadow-[0_1px_8px_rgba(255,255,255,0.2)] rounded-full"></div>
        </div>

        {/* Banner Footer (Date) */}
        <div className="absolute inset-x-0 bottom-6 flex justify-center z-10 pointer-events-none animate-in fade-in slide-in-from-bottom-5 duration-700 delay-300">
          <div className="flex items-center gap-2 text-white/90 bg-black/15 px-4 py-1.5 rounded-full backdrop-blur-md shadow-[inset_0_1px_rgba(255,255,255,0.1)] border border-white/10">
            <span className="text-[9px] md:text-[10px] font-bold tracking-[0.15em] uppercase">{currentDate}</span>
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