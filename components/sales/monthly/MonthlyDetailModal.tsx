import React, { useState } from 'react';
import { X, Table as TableIcon, TrendingUp } from 'lucide-react';
import { ResponsiveContainer, ComposedChart, Area, Bar, CartesianGrid, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import { MONTHS } from '../../../data';

const CustomSalesTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload || !payload.length) return null;
  const data = payload[0].payload;
  const formatNum = (n: number) => new Intl.NumberFormat('tr-TR').format(n);

  return (
    <div className="bg-theme-card-light dark:bg-theme-card-dark p-3 rounded-xl shadow-xl border border-slate-200 dark:border-slate-700/50 min-w-[200px] z-50">
      <p className="text-[11px] font-bold text-theme-text-muted dark:text-theme-text-dark-muted mb-2 uppercase tracking-wider">{label}</p>

      <div className="flex justify-between items-center mb-1">
        <span className="text-[11px] text-theme-text-muted dark:text-theme-text-dark-muted">G.Yıl (%):</span>
        <span className="text-[11px] font-bold text-[#F59E0B]">{data.lastYearPct.toFixed(2)}%</span>
      </div>
      <div className="flex justify-between items-center mb-1">
        <span className="text-[11px] text-theme-text-muted dark:text-theme-text-dark-muted">G.Yıl (Tutar):</span>
        <span className="text-[11px] font-medium text-theme-text-main dark:text-theme-text-dark-main">{formatNum(data.lastYear)}</span>
      </div>

      <div className="w-full h-[1px] bg-theme-bg-light/80 dark:bg-theme-secondary/30 my-1.5"></div>

      <div className="flex justify-between items-center mb-1">
        <span className="text-[11px] text-theme-text-muted dark:text-theme-text-dark-muted">Gerçekleşen (%):</span>
        <span className="text-[11px] font-bold text-[#3B7D86]">{data.pct.toFixed(2)}%</span>
      </div>
      <div className="flex justify-between items-center">
        <span className="text-[11px] text-theme-text-muted dark:text-theme-text-dark-muted">Gerçekleşen (Tutar):</span>
        <span className="text-[11px] font-bold text-theme-text-main dark:text-theme-text-dark-main">{formatNum(data.current)}</span>
      </div>
    </div>
  );
};

export const MonthlyDetailModal = ({ row, onClose }: { row: any, onClose: () => void }) => {
  const [activeTab, setActiveTab] = useState<'satis' | 'iade' | 'promosyon' | 'ebitda'>('satis');
  const [viewMode, setViewMode] = useState<'table' | 'chart'>('table');

  // Dummy monthly data generator
  const getMonthlyData = () => {
    let totalCurrent = 0;
    let totalPct = 0;
    let totalLastYear = 0;
    let totalLastYearPct = 0;

    const data = MONTHS.map((month) => {
      // Base generation on the row's realizedGP so sums align somewhat
      const baseValue = Math.abs(row.realizedGP || 100000) / 12;
      const randomFactor = 0.8 + Math.random() * 0.4;
      const current = Math.round(baseValue * randomFactor);
      const pct = (current / (Math.abs(row.realizedGP || 100000))) * 100 * (0.9 + Math.random() * 0.2);

      const lastYear = Math.round(current * (0.85 + Math.random() * 0.3));
      const lastYearPct = pct * (0.85 + Math.random() * 0.3);

      totalCurrent += current;
      totalPct += pct;
      totalLastYear += lastYear;
      totalLastYearPct += lastYearPct;

      return {
        name: month,
        current,
        pct: pct > 0 ? pct : 0,
        lastYear,
        lastYearPct: lastYearPct > 0 ? lastYearPct : 0
      };
    });

    // Instead of dummy normalization to 100%, we normalize based on the net sales
    const netSales = Math.abs(row.realizedGP || 100000);
    const lastYearNetSales = Math.abs(row.lastPeriodGP || row.lastPeriod || 80000);

    data.forEach(d => {
      d.pct = (d.current / netSales) * 100;
      d.lastYearPct = (d.lastYear / lastYearNetSales) * 100;
    });

    let sumPct = 0;
    let sumLastYearPct = 0;
    data.forEach(d => {
      sumPct += d.pct;
      sumLastYearPct += d.lastYearPct;
    });

    return {
      data,
      totalCurrent,
      totalLastYear,
      avgPct: sumPct / (data.length || 1),
      avgLastYearPct: sumLastYearPct / (data.length || 1)
    };
  };

  const { data: monthlyData, totalCurrent, totalLastYear, avgPct, avgLastYearPct } = getMonthlyData();

  const formatNum = (n: number) => new Intl.NumberFormat('tr-TR').format(n);

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in zoom-in-95 duration-200">
      <div className="bg-theme-card-light dark:bg-theme-card-dark w-[650px] max-w-5xl rounded-2xl shadow-2xl flex flex-col overflow-hidden h-[710px] md:h-[725px]">
        {/* Header */}
        <div className="bg-theme-primary px-3 py-2 md:px-4 md:py-2 flex justify-between items-center shrink-0 z-10 w-full">
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

          {/* Content Area */}
          {viewMode === 'table' ? (
            <div className="flex-1 min-h-0 bg-theme-card-light dark:bg-theme-card-dark/30 border border-theme-secondary/40 dark:border-slate-700/50 rounded-b-xl shadow-sm overflow-auto z-10 custom-scrollbar relative">
              <div className="grid grid-cols-5 bg-theme-bg-light dark:bg-black p-3 font-bold text-[12px] text-theme-secondary dark:text-theme-text-muted/80 tracking-wider sticky top-0 z-10">
                <div className="pl-2">Ay</div>
                <div className="text-right">Geçen Yıl</div>
                <div className="text-right">G. Yıl %</div>
                <div className="text-right">Gerçekleşen</div>
                <div className="text-right pr-2">%</div>
              </div>
              {monthlyData.map((item, i) => (
                <div key={i} className="grid grid-cols-5 p-3 text-xs border-b border-gray-50 dark:border-theme-primary/40/50 hover:bg-theme-bg-light dark:hover:bg-theme-card-light/5 transition-colors">
                  <div className="font-semibold text-theme-text-main dark:text-gray-200 pl-2">{item.name}</div>
                  <div className="text-right font-medium text-theme-text-main dark:text-theme-text-dark-muted">{formatNum(item.lastYear)}</div>
                  <div className="text-right font-bold text-theme-warning">{item.lastYearPct.toFixed(2)}%</div>
                  <div className="text-right font-medium text-theme-text-main dark:text-theme-text-dark-main">{formatNum(item.current)}</div>
                  <div className="text-right font-bold text-theme-secondary pr-2">{item.pct.toFixed(2)}%</div>
                </div>
              ))}
              {/* Total Row */}
              <div className="grid grid-cols-5 p-3 text-xs border-t-2 border-slate-200 dark:border-slate-600 bg-theme-bg-light dark:bg-slate-800 sticky bottom-0 z-10">
                <div className="font-bold text-theme-primary dark:text-theme-text-dark-main pl-2">TOPLAM</div>
                <div className="text-right font-bold text-theme-primary dark:text-theme-text-dark-main">{formatNum(totalLastYear)}</div>
                <div className="text-right font-bold text-theme-warning">{avgLastYearPct.toFixed(2)}%</div>
                <div className="text-right font-bold text-theme-primary dark:text-theme-text-dark-main">{formatNum(totalCurrent)}</div>
                <div className="text-right font-bold text-theme-secondary pr-2">{avgPct.toFixed(2)}%</div>
              </div>
            </div>
          ) : (
            <div className="flex-1 min-h-0 bg-theme-card-light dark:bg-theme-card-dark/30 border border-theme-secondary/40 dark:border-slate-700/50 rounded-b-xl shadow-sm overflow-hidden z-10 relative">
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart data={monthlyData} margin={{ top: 20, right: 30, left: 10, bottom: 5 }}>
                  <defs>
                    <linearGradient id="colorPct" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3B7D86" stopOpacity={0.3} />
                      <stop offset="80%" stopColor="#3B7D86" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="colorLastYearPct" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#F59E0B" stopOpacity={0.3} />
                      <stop offset="80%" stopColor="#F59E0B" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="4 4" vertical={false} stroke="#666" strokeOpacity={0.2} yAxisId="line" />
                  <XAxis
                    dataKey="name"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: '#9ca3af', fontSize: 11, dy: 10, fontWeight: 500 }}
                    height={30}
                  />
                  <YAxis yAxisId="bar" hide={true} domain={[0, (dataMax: number) => dataMax * 5]} />
                  <YAxis yAxisId="line" hide={true} domain={[4, 12]} />
                  <Tooltip content={<CustomSalesTooltip />} />
                  <Legend iconType="circle" wrapperStyle={{ fontSize: '10px', paddingTop: '10px' }} />

                  <Bar
                    yAxisId="bar"
                    dataKey="lastYear"
                    name="G. Yıl"
                    legendType="none"
                    fill="#F59E0B"
                    fillOpacity={0.25}
                    radius={[6, 6, 0, 0]}
                    maxBarSize={24}
                  />
                  <Bar
                    yAxisId="bar"
                    dataKey="current"
                    name="Gerçekleşen"
                    legendType="none"
                    fill="#3B7D86"
                    fillOpacity={0.25}
                    radius={[6, 6, 0, 0]}
                    maxBarSize={24}
                  />

                  <Area
                    yAxisId="line"
                    type="monotone"
                    dataKey="lastYearPct"
                    name="G. Yıl"
                    stroke="#F59E0B"
                    fillOpacity={1}
                    fill="url(#colorLastYearPct)"
                    strokeWidth={3}
                    activeDot={{ r: 6, stroke: '#fff', strokeWidth: 2 }}
                    animationDuration={1000}
                  />
                  <Area
                    yAxisId="line"
                    type="monotone"
                    dataKey="pct"
                    name="Gerçekleşen"
                    stroke="#3B7D86"
                    fillOpacity={1}
                    fill="url(#colorPct)"
                    strokeWidth={3}
                    activeDot={{ r: 6, stroke: '#fff', strokeWidth: 2 }}
                    animationDuration={1000}
                  />
                </ComposedChart>
              </ResponsiveContainer>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
