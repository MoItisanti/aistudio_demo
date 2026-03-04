import React, { useState, useEffect, useMemo } from 'react';
import { PageID } from '../types';
import { NAV_ITEMS } from '../data';
import { ArrowRight } from 'lucide-react';

/* ──────────────────────────────────────────────
   Geometric SVG patterns — one per card
   ────────────────────────────────────────────── */
const patterns: Record<number, React.ReactNode> = {
  0: ( // Executive — concentric targets
    <svg viewBox="0 0 200 200" className="w-full h-full opacity-[0.07]">
      <circle cx="100" cy="100" r="90" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="100" cy="100" r="65" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="100" cy="100" r="40" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="100" cy="100" r="15" fill="currentColor" />
    </svg>
  ),
  1: ( // Satış — ascending bars
    <svg viewBox="0 0 200 200" className="w-full h-full opacity-[0.07]">
      <rect x="15" y="130" width="25" height="60" rx="4" fill="currentColor" />
      <rect x="50" y="100" width="25" height="90" rx="4" fill="currentColor" />
      <rect x="85" y="70" width="25" height="120" rx="4" fill="currentColor" />
      <rect x="120" y="40" width="25" height="150" rx="4" fill="currentColor" />
      <rect x="155" y="15" width="25" height="175" rx="4" fill="currentColor" />
    </svg>
  ),
  2: ( // Finans — flow lines
    <svg viewBox="0 0 200 200" className="w-full h-full opacity-[0.07]">
      <path d="M0 180 Q50 80 100 120 T200 40" fill="none" stroke="currentColor" strokeWidth="3" />
      <path d="M0 160 Q50 60 100 100 T200 20" fill="none" stroke="currentColor" strokeWidth="2" />
      <path d="M0 140 Q50 40 100 80 T200 0" fill="none" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  ),
  3: ( // Pazarlama — pie segments
    <svg viewBox="0 0 200 200" className="w-full h-full opacity-[0.07]">
      <path d="M100 100 L100 10 A90 90 0 0 1 178 55 Z" fill="currentColor" />
      <path d="M100 100 L178 55 A90 90 0 0 1 178 145 Z" fill="currentColor" opacity="0.7" />
      <path d="M100 100 L178 145 A90 90 0 0 1 100 190 Z" fill="currentColor" opacity="0.5" />
      <circle cx="100" cy="100" r="35" fill="none" stroke="currentColor" strokeWidth="2" />
    </svg>
  ),
  4: ( // Operasyon — gears
    <svg viewBox="0 0 200 200" className="w-full h-full opacity-[0.07]">
      <polygon points="100,15 115,45 150,45 122,65 132,98 100,78 68,98 78,65 50,45 85,45" fill="currentColor" />
      <circle cx="100" cy="62" r="18" fill="none" stroke="currentColor" strokeWidth="2" />
      <polygon points="55,120 65,140 88,140 72,152 78,175 55,162 32,175 38,152 22,140 45,140" fill="currentColor" opacity="0.6" />
      <polygon points="148,115 158,135 181,135 165,147 171,170 148,157 125,170 131,147 115,135 138,135" fill="currentColor" opacity="0.6" />
    </svg>
  ),
  5: ( // Planlama — calendar grid
    <svg viewBox="0 0 200 200" className="w-full h-full opacity-[0.07]">
      {[0, 1, 2, 3, 4].map(row =>
        [0, 1, 2, 3, 4].map(col => (
          <rect key={`${row}-${col}`} x={20 + col * 35} y={20 + row * 35} width="28" height="28" rx="6" fill="currentColor" opacity={Math.random() > 0.4 ? 1 : 0.3} />
        ))
      )}
    </svg>
  ),
  6: ( // Süt Alım — droplets
    <svg viewBox="0 0 200 200" className="w-full h-full opacity-[0.07]">
      <path d="M100 20 C100 20 40 95 40 130 C40 163 67 190 100 190 C133 190 160 163 160 130 C160 95 100 20 100 20Z" fill="currentColor" />
      <ellipse cx="80" cy="110" rx="12" ry="18" fill="currentColor" opacity="0.3" transform="rotate(-15 80 110)" />
    </svg>
  ),
  7: ( // Lojistik — route lines
    <svg viewBox="0 0 200 200" className="w-full h-full opacity-[0.07]">
      <circle cx="30" cy="30" r="8" fill="currentColor" />
      <circle cx="170" cy="50" r="8" fill="currentColor" />
      <circle cx="80" cy="170" r="8" fill="currentColor" />
      <circle cx="160" cy="160" r="8" fill="currentColor" />
      <line x1="30" y1="30" x2="170" y2="50" stroke="currentColor" strokeWidth="2" strokeDasharray="6 4" />
      <line x1="170" y1="50" x2="160" y2="160" stroke="currentColor" strokeWidth="2" strokeDasharray="6 4" />
      <line x1="160" y1="160" x2="80" y2="170" stroke="currentColor" strokeWidth="2" strokeDasharray="6 4" />
      <line x1="80" y1="170" x2="30" y2="30" stroke="currentColor" strokeWidth="2" strokeDasharray="6 4" />
    </svg>
  ),
  8: ( // Satınalma — stacked boxes
    <svg viewBox="0 0 200 200" className="w-full h-full opacity-[0.07]">
      <rect x="40" y="110" width="120" height="70" rx="8" fill="currentColor" opacity="0.5" />
      <rect x="50" y="60" width="100" height="70" rx="8" fill="currentColor" opacity="0.7" />
      <rect x="60" y="20" width="80" height="60" rx="8" fill="currentColor" />
    </svg>
  ),
  9: ( // İnsan Kaynakları — people
    <svg viewBox="0 0 200 200" className="w-full h-full opacity-[0.07]">
      <circle cx="100" cy="55" r="25" fill="currentColor" />
      <path d="M50 150 C50 110 70 90 100 90 C130 90 150 110 150 150" fill="currentColor" />
      <circle cx="45" cy="75" r="16" fill="currentColor" opacity="0.5" />
      <path d="M15 145 C15 115 28 100 45 100 C62 100 75 115 75 145" fill="currentColor" opacity="0.5" />
      <circle cx="155" cy="75" r="16" fill="currentColor" opacity="0.5" />
      <path d="M125 145 C125 115 138 100 155 100 C172 100 185 115 185 145" fill="currentColor" opacity="0.5" />
    </svg>
  ),
};

/* Card accent gradient colours */
const cardAccents = [
  { bg: 'from-[#0f4c5c] to-[#0a3540]' },
  { bg: 'from-[#1e3a5f] to-[#152a45]' },
  { bg: 'from-[#134e4a] to-[#0a3632]' },
  { bg: 'from-[#4c1d95] to-[#3b0d7a]' },
  { bg: 'from-[#1c1917] to-[#0c0a09]' },
  { bg: 'from-[#1e3a5f] to-[#152a45]' },
  { bg: 'from-[#164e63] to-[#0e3a4a]' },
  { bg: 'from-[#713f12] to-[#542d0a]' },
  { bg: 'from-[#7f1d1d] to-[#5c1414]' },
  { bg: 'from-[#3b0764] to-[#2a0550]' },
];

/* Short taglines */
const taglines: Record<string, string> = {
  executive: 'Genel bakış ve KPI takibi',
  sales: 'Satış performansı analizi',
  profit: 'Gelir tablosu ve kârlılık',
  market: 'Pazar payı ve rekabet',
  ops: 'Üretim ve verimlilik',
  planning: 'Stratejik planlama',
  milk: 'Çiğ süt tedarik yönetimi',
  logistics: 'Dağıtım ve rota optimizasyonu',
  purchasing: 'Tedarik zinciri yönetimi',
  hr: 'Organizasyon ve yetenek',
};

const BG_IMAGES = ['/bg1.webp', '/bg2.webp', '/bg3.webp', '/bg4.webp', '/bg5.webp', '/bg6.webp'];

const HomeContent = ({ onNavigate }: { onNavigate: (id: PageID) => void }) => {
  const [greeting, setGreeting] = useState('Günaydın!');
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const [visible, setVisible] = useState(false);
  const [currentTime, setCurrentTime] = useState('');

  // Cycle through backgrounds using sessionStorage counter
  const bgImage = useMemo(() => {
    const key = 'pinar_home_bg_index';
    const stored = sessionStorage.getItem(key);
    const idx = stored ? (parseInt(stored, 10) + 1) % BG_IMAGES.length : 0;
    sessionStorage.setItem(key, String(idx));
    return BG_IMAGES[idx];
  }, []);

  useEffect(() => {
    const h = new Date().getHours();
    setGreeting(h < 12 ? 'Günaydın!' : h < 18 ? 'Tünaydın!' : 'İyi Akşamlar!');
    requestAnimationFrame(() => setVisible(true));

    const updateTime = () => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleDateString('tr-TR', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })
        + '  ·  '
        + now.toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-[calc(100vh-4rem)] w-full relative overflow-hidden animate-in fade-in duration-700">

      {/* ── Full-page Background Image (extends behind header) ── */}
      <div className="absolute inset-x-0 -top-20 bottom-0 z-0">
        <img
          src={bgImage}
          alt=""
          className="w-full h-full object-cover object-center"
        />
        {/* Tinted overlay for readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/60 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-transparent pointer-events-none" />
      </div>

      {/* ── Content Layer ── */}
      <div className="relative z-10 px-6 lg:px-10 pt-6 pb-6 flex flex-col gap-3 lg:gap-4 h-full">

        {/* ── Glassmorphism Welcome Panel (compact, top-left) ── */}
        <div className={`max-w-md transition-all duration-1000 ease-out ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
          <div className="bg-theme-bg-light/5 dark:bg-theme-bg-dark/5 backdrop-blur-[1px] dark:backdrop-blur-[1px] border border-white/10 dark:border-white/10 rounded-3xl px-8 py-7 shadow-2xl shadow-black/5">
            <span className="text-theme-accent font-bold tracking-[0.25em] text-sm md:text-base uppercase block mb-2">
              {greeting}
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.1] drop-shadow-lg">
              Pınar Süt
            </h1>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-light text-white/60 tracking-tight leading-tight mt-1">
              Yönetim Paneli
            </h2>
            {currentTime && (
              <p className="text-[11px] font-medium tracking-wide text-white/50 mt-4">
                {currentTime}
              </p>
            )}
          </div>
        </div>

        {/* ── Navigation Bento Grid (glassmorphism cards) ── */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 lg:gap-4 max-w-[1600px] mt-8 lg:mt-12">
          {NAV_ITEMS.map((item, idx) => {
            const accent = cardAccents[idx % cardAccents.length];
            const isHovered = hoveredIdx === idx;
            const delay = idx * 60;

            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                onMouseEnter={() => setHoveredIdx(idx)}
                onMouseLeave={() => setHoveredIdx(null)}
                className={`
                  group relative overflow-hidden rounded-2xl text-left
                  bg-theme-bg-light/45 dark:bg-theme-bg-dark/45 backdrop-blur-[2px] dark:backdrop-blur-[2px]
                  border border-white/10 dark:border-white/10
                  shadow-sm hover:shadow-xl
                  transition-all duration-500 ease-out
                  hover:scale-[1.02] active:scale-[0.98]
                  h-44 lg:h-48 flex flex-col
                  ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
                `}
                style={{
                  transitionDelay: visible ? `${delay}ms` : '0ms',
                }}
              >
                {/* Background Gradient on Hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${accent.bg} transition-opacity duration-500 ${isHovered ? 'opacity-100' : 'opacity-0'}`} />

                {/* Background pattern */}
                <div className={`absolute inset-0 text-white transition-all duration-700 ease-out ${isHovered ? 'scale-110 opacity-20' : 'scale-100 opacity-[0.05]'}`}>
                  {patterns[idx] || patterns[0]}
                </div>

                {/* Content */}
                <div className="relative z-10 flex flex-col flex-1 p-5">
                  {/* Icon */}
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center mb-auto transition-all duration-500 ${isHovered ? 'bg-white/20 text-white scale-110' : 'bg-white/15 dark:bg-white/10 text-white'}`}
                  >
                    {React.cloneElement(item.icon as React.ReactElement<any>, { size: 20, strokeWidth: 2 })}
                  </div>

                  {/* Label & Tagline */}
                  <div className="mt-auto">
                    <h3 className={`text-[13px] font-bold tracking-wide leading-tight mb-1 transition-colors duration-300 text-white`}>
                      {item.label}
                    </h3>
                    <p className={`text-[10px] font-medium leading-snug transition-all duration-500 ${isHovered ? 'text-white/60 opacity-100 translate-y-0' : 'text-white/40 opacity-0 translate-y-2'}`}>
                      {taglines[item.id] || ''}
                    </p>
                  </div>

                  {/* Arrow indicator */}
                  <div className={`absolute top-4 right-4 transition-all duration-500 ${isHovered ? 'opacity-100 translate-x-0 text-white' : 'opacity-0 -translate-x-2 text-white/40'}`}>
                    <ArrowRight size={16} />
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* ── Footer: Son Güncelleme ── */}
        <div className="flex justify-center mt-auto">
          <div className="bg-theme-bg-light/5 dark:bg-theme-bg-dark/5 backdrop-blur-[2px] dark:backdrop-blur-[2px] border border-white/10 dark:border-white/10 rounded-full px-6 py-2 shadow-lg">
            <span className="text-[11px] font-medium tracking-wide text-white/60">
              Son Güncelleme Tarihi: 27.02.2026
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeContent;