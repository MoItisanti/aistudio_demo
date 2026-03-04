import React, { useState } from 'react';
import { ArrowUpRight, RotateCcw, TrendingUp, TrendingDown, MoreHorizontal } from 'lucide-react';
import { ResponsiveContainer, AreaChart, Area, Tooltip, XAxis, YAxis } from 'recharts';

interface FlipKpiCardProps {
  title: string;
  value: number; // Raw value (e.g., 119600000)
  chartData: any[];
  budgetPct: number;
  yoyPct: number;
  budgetValue?: number;
  pyValue?: number;
}

const CustomSparklineTooltip = ({ active, payload }: any) => {
  if (!active || !payload || !payload.length) return null;
  return (
    <div className="bg-theme-primary text-white text-[10px] px-2 py-1 rounded-md shadow-xl border border-white/10">
      <span className="font-bold">{payload[0].value}</span>
    </div>
  );
};

export const FlipKpiCard = ({ title, value, chartData, budgetPct, yoyPct, budgetValue, pyValue }: FlipKpiCardProps) => {
  const [isFlipped, setIsFlipped] = useState(false);

  // Format Value: "X.X Milyon ₺" supports negative
  const formatCurrency = (val: number | undefined) => {
    if (val === undefined) return '-';
    if (Math.abs(val) >= 1000000) {
      return `${(val / 1000000).toFixed(1).replace('.', ',')} Milyon ₺`;
    }
    return `${val.toLocaleString('tr-TR')} ₺`;
  };

  const formattedValue = formatCurrency(value);
  const formattedBudget = formatCurrency(budgetValue);
  const formattedPy = formatCurrency(pyValue);

  return (
    <div className="group perspective-1000 w-full h-44 cursor-default hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 rounded-2xl">
      <div
        className={`relative w-full h-full transition-transform duration-700 transform-style-3d ${isFlipped ? 'rotate-y-180' : ''}`}
      >

        {/* --- FRONT FACE --- */}
        <div
          className="absolute inset-0 w-full h-full bg-theme-card-light dark:bg-theme-card-dark rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700/50 flex flex-col backface-hidden overflow-hidden"
        >
          {/* Left Gradient Bar */}
          <div className="absolute top-0 bottom-0 left-0 w-1.5 bg-theme-secondary/50"></div>

          <div className="p-6 pl-6 flex flex-col h-full justify-between">
            {/* Header */}
            <div className="flex justify-between items-start">
              <h3 className="text-sm font-semibold tracking-wider text-theme-text-main/80 dark:text-theme-text-dark-main">{title}</h3>
              <button
                onClick={(e) => { e.stopPropagation(); setIsFlipped(true); }}
                className="flex items-center justify-center w-8 h-8 rounded-lg bg-theme-bg-light dark:bg-theme-secondary/30 text-theme-secondary dark:text-theme-text-dark-main hover:bg-theme-bg-light/80 dark:hover:bg-gray-600 transition-colors duration-200 group/btn"
              >
                <ArrowUpRight size={18} className="transition-transform group-hover/btn:scale-110" />
              </button>
            </div>

            {/* Main Value */}
            <div>
              <span className="text-[36px] lg:text-[40px] xl:text-[44px] font-bold text-theme-text-main dark:text-theme-text-dark-main tracking-tight whitespace-nowrap">
                {formattedValue}
              </span>
            </div>

            {/* Footer */}
            <div className="flex items-center gap-3">
              <div className={`inline-flex items-center px-2 py-0.5 rounded-md font-semibold text-xs ${yoyPct >= 0 ? 'bg-emerald-50 dark:bg-emerald-900/30 text-theme-success dark:text-theme-success' : 'bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400'}`}>
                {yoyPct >= 0 ? <TrendingUp size={14} className="mr-1" /> : <TrendingDown size={14} className="mr-1" />}
                {yoyPct > 0 ? '+' : ''}{yoyPct}%
              </div>
              <span className="text-xs text-theme-text-muted/80 dark:text-theme-text-dark-muted font-medium">vs. geçen yıl</span>
            </div>
          </div>
        </div>

        {/* --- BACK FACE --- */}
        <div
          className="absolute inset-0 w-full h-full bg-theme-card-light dark:bg-theme-card-dark rounded-2xl shadow-xl border border-slate-200 dark:border-slate-700/50 rotate-y-180 backface-hidden flex flex-col overflow-hidden"
        >
          {/* Back Header */}
          <div className="px-4 py-2 flex justify-between items-center border-b border-slate-200 dark:border-slate-700/50 shrink-0">
            <div className="flex items-center gap-2">
              <TrendingUp size={14} className="text-theme-secondary" />
              <span className="text-xs font-bold uppercase text-theme-text-muted dark:text-theme-text-dark-main">12 Aylık Trend</span>
            </div>
            <button
              onClick={(e) => { e.stopPropagation(); setIsFlipped(false); }}
              className="p-1.5 rounded-full hover:bg-theme-bg-light dark:hover:bg-theme-secondary/20 text-theme-text-muted dark:text-theme-text-dark-main transition-colors"
            >
              <RotateCcw size={14} />
            </button>
          </div>

          {/* Chart Area */}
          <div className="flex-1 w-full min-h-0 relative">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData} margin={{ top: 5, right: 0, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorEbitda" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#45828b" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#45828b" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <Tooltip content={<CustomSparklineTooltip />} cursor={{ stroke: '#45828b', strokeWidth: 1, strokeDasharray: '3 3' }} />
                <Area
                  type="monotone"
                  dataKey="cy"
                  stroke="#45828b"
                  strokeWidth={2}
                  fill="url(#colorEbitda)"
                  activeDot={{ r: 4, fill: '#45828b', stroke: '#fff' }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Stats Footer */}
          <div className="px-4 py-2 bg-theme-bg-light/50 dark:bg-theme-secondary/10 border-t border-slate-200 dark:border-slate-700/50 grid grid-cols-2 gap-0 shrink-0">
            <div className="flex flex-col items-center justify-center border-r border-slate-200 dark:border-slate-700/50">
              <span className="text-[9px] text-theme-text-muted dark:text-theme-text-dark-muted font-bold uppercase mb-0.5">Bütçe</span>
              <div className="text-xs font-bold text-theme-text-main dark:text-theme-text-dark-main mb-0.5">{formattedBudget}</div>
              <div className={`flex items-center gap-0.5 font-bold text-[10px] ${budgetPct >= 0 ? 'text-theme-success dark:text-theme-success' : 'text-red-500 dark:text-red-400'}`}>
                {budgetPct >= 0 ? <TrendingUp size={10} className="text-theme-success" /> : <TrendingDown size={10} />}
                {budgetPct > 0 ? '+' : ''}{budgetPct}%
              </div>
            </div>
            <div className="flex flex-col items-center justify-center">
              <span className="text-[9px] text-theme-text-muted dark:text-theme-text-dark-muted font-bold uppercase mb-0.5">Geçen Dönem</span>
              <div className="text-xs font-bold text-theme-text-main dark:text-theme-text-dark-main mb-0.5">{formattedPy}</div>
              <div className={`flex items-center gap-0.5 font-bold text-[10px] ${yoyPct >= 0 ? 'text-theme-success dark:text-theme-success' : 'text-red-500 dark:text-red-400'}`}>
                {yoyPct >= 0 ? <TrendingUp size={10} /> : <TrendingDown size={10} />}
                {yoyPct > 0 ? '+' : ''}{yoyPct}%
              </div>
            </div>
          </div>
        </div>

      </div>

      <style>{`
        .perspective-1000 { perspective: 1000px; }
        .transform-style-3d { transform-style: preserve-3d; }
        .rotate-y-180 { transform: rotateY(180deg); }
        .backface-hidden { backface-visibility: hidden; }
      `}</style>
    </div>
  );
};