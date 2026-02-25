import React from 'react';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { ResponsiveContainer, Area, Line, ComposedChart, Tooltip } from 'recharts';
import { CardHeader } from '../Shared';

const CustomKpiTooltip = ({ active, payload }: any) => {
  if (!active || !payload || !payload.length) return null;
  return (
    <div className="bg-theme-card-light dark:bg-theme-card-dark p-2.5 rounded-xl shadow-xl border border-slate-200 dark:border-slate-700/50 text-[10px] min-w-[110px] z-50">
      {payload.map((entry: any, i: number) => {
         let label = 'Değer';
         if (entry.dataKey === 'cy') label = 'Cari Yıl';
         else if (entry.dataKey === 'py') label = 'Geçen Yıl';
         else if (entry.dataKey === 'budget') label = 'Bütçe';
         const color = entry.color || entry.stroke || entry.fill; 
         return (
          <div key={i} className="flex justify-between items-center gap-3 mb-1.5 last:mb-0">
             <div className="flex items-center gap-1.5">
               <span className="w-2 h-2 rounded-full shadow-sm" style={{backgroundColor: color}}></span>
               <span className="font-semibold text-theme-text-muted/80 dark:text-theme-text-muted/80">{label}</span>
             </div>
             <span className="font-bold text-theme-text-main dark:text-gray-200">{entry.value}</span>
          </div>
         )
      })}
    </div>
  );
};

export const ProfitKpiCard = ({ title, cy, py, chartData }: any) => {
  const diff = ((cy - py) / py) * 100;
  const isPos = diff > 0;
  const trendColor = isPos ? "#10b981" : "#ef4444";
  
  return (
    <div className="bg-theme-card-light dark:bg-theme-card-dark rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700/50/50 hover:shadow-lg transition-all duration-300 flex flex-col h-56 relative overflow-hidden group">
      <CardHeader title={title}>
        <span className={`flex items-center text-[10px] font-bold px-1.5 py-0.5 rounded-lg bg-theme-card-light/20 text-white`}>
          {isPos ? <ArrowUpRight size={10} className="mr-0.5" /> : <ArrowDownRight size={10} className="mr-0.5" />}
          {Math.abs(diff).toFixed(1)}%
        </span>
      </CardHeader>
      <div className="p-4 flex-1 flex flex-col">
         <div className="flex items-baseline gap-2 mb-1">
            <span className="text-[10px] font-semibold text-theme-text-muted/80 uppercase">CY</span>
            <span className="text-2xl font-black text-theme-text-main dark:text-theme-text-dark-main tracking-tight">{cy.toLocaleString('tr-TR')}K</span>
         </div>
          <div className="flex items-baseline gap-2 mb-3">
             <span className="text-[10px] font-semibold text-theme-text-muted/80 uppercase">PY</span>
             <span className="text-sm font-bold text-theme-secondary dark:text-theme-text-muted/80">{py.toLocaleString('tr-TR')}K</span>
         </div>
         <div className="flex-1 w-full min-h-0 -mx-1 -mb-1">
            <ResponsiveContainer width="100%" height="100%">
               <ComposedChart data={chartData}>
                  <defs>
                    <linearGradient id={`gradient-${title}`} x1="0" y1="0" x2="0" y2="1">
                       <stop offset="5%" stopColor={trendColor} stopOpacity={0.3}/>
                       <stop offset="95%" stopColor={trendColor} stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <Tooltip content={<CustomKpiTooltip />} cursor={{ stroke: 'rgba(0,0,0,0.05)', strokeWidth: 1 }} />
                  <Area type="monotone" dataKey="cy" stroke={trendColor} strokeWidth={2} fill={`url(#gradient-${title})`} activeDot={{r: 4, strokeWidth: 0, fill: trendColor}} />
                  <Line type="monotone" dataKey="py" stroke="#9ca3af" strokeWidth={1} strokeDasharray="3 3" dot={false} activeDot={{r: 3, fill: '#9ca3af'}} />
                  <Line type="monotone" dataKey="budget" stroke="#d1d5db" strokeWidth={1} strokeDasharray="1 1" dot={false} activeDot={{r: 3, fill: '#d1d5db'}} />
               </ComposedChart>
            </ResponsiveContainer>
         </div>
      </div>
    </div>
  );
};