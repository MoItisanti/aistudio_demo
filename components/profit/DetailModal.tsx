import React, { useState } from 'react';
import { X, Table as TableIcon, TrendingUp } from 'lucide-react';
import { ResponsiveContainer, LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';
import { MONTHS } from '../../data';

export const CustomModalTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload || !payload.length) return null;

  const data = payload[0].payload;
  const formatNum = (n: number) => new Intl.NumberFormat('tr-TR').format(n);

  return (
    <div className="bg-theme-card-light dark:bg-theme-card-dark p-3 rounded-xl shadow-xl border border-slate-200 dark:border-slate-700/50 min-w-[150px] z-50">
      <p className="text-[11px] font-bold text-theme-text-muted dark:text-theme-text-dark-muted mb-2 uppercase tracking-wider">{label}</p>

      <div className="flex justify-between items-center mb-1">
        <span className="text-[11px] text-theme-text-muted dark:text-theme-text-dark-muted">Pay (%):</span>
        <span className="text-[11px] font-bold text-theme-accent">{data.share.toFixed(1)}%</span>
      </div>
      <div className="w-full h-[1px] bg-theme-bg-light/80 dark:bg-theme-secondary/30 my-1.5"></div>
      <div className="flex justify-between items-center mb-1">
        <span className="text-[11px] text-theme-text-muted dark:text-theme-text-dark-muted">Gerçekleşen:</span>
        <span className="text-[11px] font-bold text-theme-text-main dark:text-theme-text-dark-main">{formatNum(data.current)}</span>
      </div>
      <div className="flex justify-between items-center mb-1">
        <span className="text-[11px] text-theme-text-muted dark:text-theme-text-dark-muted">Bütçe:</span>
        <span className="text-[11px] font-medium text-theme-text-main dark:text-theme-text-dark-main">{formatNum(data.budget)}</span>
      </div>
      <div className="flex justify-between items-center">
        <span className="text-[11px] text-theme-text-muted dark:text-theme-text-dark-muted">Geçen Yıl:</span>
        <span className="text-[11px] font-medium text-theme-text-main dark:text-theme-text-dark-main">{formatNum(data.lastYear)}</span>
      </div>
    </div>
  );
};

export const DetailModal = ({ row, onClose }: { row: any, onClose: () => void }) => {
  const [viewMode, setViewMode] = useState<'table' | 'chart'>('table');

  // Dummy monthly data generator
  const monthlyData = MONTHS.map((month, i) => {
    const baseValue = Math.abs(row.current) / 12;
    const randomFactor = 0.8 + Math.random() * 0.4;
    const current = Math.round(baseValue * randomFactor);
    const budget = Math.round(current * (0.9 + Math.random() * 0.2));
    const lastYear = Math.round(current * (0.85 + Math.random() * 0.2));

    // Simulate percentages based on the row logic
    const share = Math.abs(row.share) + (Math.random() * 2 - 1);
    const budgetVar = ((current - budget) / budget) * 100;
    const yearVar = ((current - lastYear) / lastYear) * 100;

    return {
      name: month,
      current,
      budget,
      lastYear,
      share: share > 0 ? share : 0,
      budgetVar,
      yearVar
    };
  });

  const formatNum = (n: number) => new Intl.NumberFormat('tr-TR').format(n);

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in zoom-in-95 duration-200">
      <div className="bg-theme-card-light dark:bg-theme-card-dark w-full max-w-4xl rounded-2xl shadow-2xl flex flex-col overflow-hidden h-[500px] md:h-[600px]">
        {/* Header */}
        <div className="bg-theme-primary px-4 py-3 md:px-6 md:py-4 flex justify-between items-center shrink-0 border-b border-theme-secondary/60 z-10">
          <div>
            <h3 className="text-white font-bold text-sm md:text-base">{row.name}</h3>
            <span className="text-white/60 text-[10px] md:text-xs uppercase tracking-wider">Aylık Detay Analizi</span>
          </div>
          <div className="flex items-center gap-2 md:gap-4">
            <div className="flex bg-theme-card-light/10 rounded-lg p-1">
              <button
                onClick={() => setViewMode('table')}
                className={`p-1.5 md:p-2 rounded-md transition-all ${viewMode === 'table' ? 'bg-theme-card-light text-theme-text-main shadow-sm' : 'text-white hover:bg-theme-card-light/10'}`}
                title="Tablo Görünümü"
              >
                <TableIcon size={16} className="md:w-[18px] md:h-[18px]" />
              </button>
              <button
                onClick={() => setViewMode('chart')}
                className={`p-1.5 md:p-2 rounded-md transition-all ${viewMode === 'chart' ? 'bg-theme-card-light text-theme-text-main shadow-sm' : 'text-white hover:bg-theme-card-light/10'}`}
                title="Grafik Görünümü"
              >
                <TrendingUp size={16} className="md:w-[18px] md:h-[18px]" />
              </button>
            </div>
            <button onClick={onClose} className="p-1.5 md:p-2 bg-theme-card-light/10 hover:bg-theme-card-light/20 rounded-full text-white transition-colors">
              <X size={18} className="md:w-[20px] md:h-[20px]" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className={`flex-1 relative ${viewMode === 'chart' ? 'bg-theme-primary' : 'bg-theme-bg-light dark:bg-theme-bg-dark/90'} overflow-hidden`}>
          {viewMode === 'table' ? (
            <div className="absolute inset-0 overflow-auto">
              <div className="bg-theme-card-light dark:bg-theme-card-dark border-t border-b md:border-x border-slate-200 dark:border-slate-700/50 md:rounded-xl md:shadow-sm md:m-6 overflow-hidden">
                <div className="grid grid-cols-5 bg-theme-bg-light/80 dark:bg-black/20 p-3 font-bold text-[11px] text-theme-secondary dark:text-theme-text-muted/80 uppercase tracking-wider sticky top-0 z-10">
                  <div className="pl-2">Ay</div>
                  <div className="text-right">Gerçekleşen</div>
                  <div className="text-right">%</div>
                  <div className="text-right">Bütçe %</div>
                  <div className="text-right pr-2">Geçen Yıl %</div>
                </div>
                {monthlyData.map((item, i) => (
                  <div key={i} className="grid grid-cols-5 p-3 text-xs border-b border-gray-50 dark:border-theme-primary/40/50 last:border-0 hover:bg-theme-bg-light dark:hover:bg-theme-card-light/5 transition-colors">
                    <div className="font-semibold text-theme-text-main dark:text-gray-200 pl-2">{item.name}</div>
                    <div className="text-right font-medium text-theme-text-main dark:text-theme-text-dark-muted">{formatNum(item.current)}</div>
                    <div className="text-right text-theme-secondary">{item.share.toFixed(1)}%</div>
                    <div className={`text-right font-bold ${item.budgetVar >= 0 ? 'text-green-600' : 'text-red-500'}`}>
                      {item.budgetVar > 0 ? '+' : ''}{item.budgetVar.toFixed(1)}%
                    </div>
                    <div className={`text-right pr-2 font-bold ${item.yearVar >= 0 ? 'text-green-600' : 'text-red-500'}`}>
                      {item.yearVar > 0 ? '+' : ''}{item.yearVar.toFixed(1)}%
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="absolute inset-0 w-full h-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={monthlyData} margin={{ top: 30, right: 30, left: 10, bottom: 20 }}>
                  <CartesianGrid strokeDasharray="0" vertical={true} horizontal={true} stroke="#333" strokeOpacity={0.8} />
                  <XAxis
                    dataKey="name"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: '#9ca3af', fontSize: 11, dy: 10, fontWeight: 500 }}
                    height={50}
                  />
                  <YAxis hide={true} domain={['auto', 'auto']} />
                  <Tooltip content={<CustomModalTooltip />} />
                  <Line
                    type="linear"
                    dataKey="share"
                    name="Pay %"
                    stroke="#d64d66"
                    strokeWidth={3}
                    dot={{ r: 6, fill: '#d64d66', strokeWidth: 2, stroke: '#151515' }}
                    activeDot={{ r: 8, stroke: '#fff', strokeWidth: 2 }}
                    animationDuration={1000}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};