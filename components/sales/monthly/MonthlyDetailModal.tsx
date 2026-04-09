import React, { useState } from 'react';
import { X } from 'lucide-react';
import { MONTHS } from '../../../data';

export const MonthlyDetailModal = ({ row, onClose }: { row: any, onClose: () => void }) => {
  const [activeTab, setActiveTab] = useState<'satis' | 'iade' | 'promosyon' | 'ebitda'>('satis');

  // Dummy monthly data generator
  const getMonthlyData = () => {
    let totalCurrent = 0;
    let totalPct = 0;

    const data = MONTHS.map((month) => {
      // Base generation on the row's realizedGP so sums align somewhat
      const baseValue = Math.abs(row.realizedGP || 100000) / 12;
      const randomFactor = 0.8 + Math.random() * 0.4;
      const current = Math.round(baseValue * randomFactor);

      // Simulate percentage share out of 100
      const pct = (current / (Math.abs(row.realizedGP || 100000))) * 100 * (0.9 + Math.random() * 0.2);

      totalCurrent += current;
      totalPct += pct;

      return {
        name: month,
        current,
        pct: pct > 0 ? pct : 0,
      };
    });

    // Dummy normalization for percentage
    data.forEach(d => {
      d.pct = (d.pct / totalPct) * 100;
    });

    return {
      data,
      totalCurrent,
      totalPct: 100
    };
  };

  const { data: monthlyData, totalCurrent } = getMonthlyData();

  const formatNum = (n: number) => new Intl.NumberFormat('tr-TR').format(n);

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in zoom-in-95 duration-200">
      <div className="bg-theme-card-light dark:bg-theme-card-dark w-[450px] max-w-4xl rounded-2xl shadow-2xl flex flex-col overflow-hidden h-[710px] md:h-[725px]">
        {/* Header */}
        <div className="bg-theme-primary px-3 py-2 md:px-4 md:py-2 flex justify-between items-center shrink-0 z-10 w-full">
          <div>
            <h3 className="text-white font-bold text-sm md:text-base">{row.name}</h3>
            <span className="text-white/60 text-[10px] md:text-xs uppercase tracking-wider">Aylık Detay Analizi</span>
          </div>
          <button onClick={onClose} className="p-1.5 md:p-2 bg-theme-card-light/10 hover:bg-theme-card-light/20 rounded-full text-white transition-colors">
            <X size={18} className="md:w-[20px] md:h-[20px]" />
          </button>
        </div>

        {/* Content with Bookmarks and Table combined */}
        <div className={`flex-1 relative bg-theme-bg-light dark:bg-theme-bg-dark/90 overflow-hidden flex flex-col p-4 md:px-6 md:pb-6 md:pt-4`}>

          {/* Bookmark Tabs */}
          <div className="w-full flex shrink-0 gap-1 md:gap-2 z-10 relative">
            {[
              { id: 'satis', label: 'Satış' },
              { id: 'iade', label: 'İade' },
              { id: 'promosyon', label: 'Promosyon' },
              { id: 'ebitda', label: 'EBITDA' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex-1 relative py-2 md:py-2.5 text-[11px] md:text-sm font-bold tracking-wide transition-colors duration-200 rounded-t-lg border border-b-0
                            ${activeTab === tab.id
                    ? 'bg-theme-primary dark:bg-theme-card-dark text-theme-text-dark-main dark:text-theme-accent border-slate-200 dark:border-slate-700/50 shadow-sm z-20'
                    : 'bg-slate-200/50 dark:bg-slate-800/50 text-slate-500 dark:text-slate-400 border-slate-200/50 dark:border-slate-700/30 hover:bg-theme-accent hover:border-theme-accent hover:text-white dark:hover:bg-theme-accent dark:hover:text-white z-0'
                  }
                        `}
                // A small trick to cover the top border of the table specifically for the active tab
                style={activeTab === tab.id ? { marginBottom: '-1px', paddingBottom: 'calc(0.5rem + 1px)' } : {}}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Table Area */}
          <div className="flex-1 min-h-0 bg-theme-card-light dark:bg-theme-card-dark/30 border border-theme-secondary/40 dark:border-slate-700/50 rounded-b-xl shadow-sm overflow-auto z-10 custom-scrollbar relative">
            <div className="grid grid-cols-3 bg-theme-bg-light dark:bg-black p-3 font-bold text-[12px] text-theme-secondary dark:text-theme-text-muted/80 uppercase tracking-wider sticky top-0 z-10">
              <div className="pl-2">Ay</div>
              <div className="text-right">Gerçekleşen</div>
              <div className="text-right pr-2">%</div>
            </div>
            {monthlyData.map((item, i) => (
              <div key={i} className="grid grid-cols-3 p-3 text-xs border-b border-gray-50 dark:border-theme-primary/40/50 last:border-0 hover:bg-theme-bg-light dark:hover:bg-theme-card-light/5 transition-colors">
                <div className="font-semibold text-theme-text-main dark:text-gray-200 pl-2">{item.name}</div>
                <div className="text-right font-medium text-theme-text-main dark:text-theme-text-dark-muted">{formatNum(item.current)}</div>
                <div className="text-right text-theme-secondary pr-2">{item.pct.toFixed(2)}%</div>
              </div>
            ))}
            {/* Total Row */}
            <div className="grid grid-cols-3 p-3 text-xs border-t-2 border-slate-200 dark:border-slate-600 bg-theme-bg-light dark:bg-slate-800 sticky bottom-0 z-10">
              <div className="font-bold text-theme-primary dark:text-theme-text-dark-main pl-2">TOPLAM</div>
              <div className="text-right font-bold text-theme-primary dark:text-theme-text-dark-main">{formatNum(totalCurrent)}</div>
              <div className="text-right font-bold text-theme-secondary pr-2">100.00%</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
