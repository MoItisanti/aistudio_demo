import React from 'react';
import { ResponsiveContainer, LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend, BarChart, Bar, LabelList, Cell } from 'recharts';
import { CardHeader, CustomTooltip } from '../Shared';
import { SalesDonutChart } from './DonutChart';
import { SALES_CHANNEL_DATA } from '../../data';

// --- Custom Label for Bar Chart ---
const CustomComparisonLabel = (props: any) => {
  const { x, y, width, value, index, data, payload } = props;

  if (!payload || !data) return null;

  const actualItem = data.find((d: any) => d.name === 'Fiili');
  const actualValue = actualItem ? actualItem.value : 0;

  if (payload.name === 'Fiili' || !actualValue) return null;

  const diff = ((actualValue - value) / value) * 100;
  const isPos = diff > 0;

  return (
    <text
      x={x + width / 2}
      y={y - 10}
      fill={isPos ? '#10b981' : '#ef4444'}
      textAnchor="middle"
      fontSize={10}
      fontWeight="bold"
    >
      {isPos ? '+' : ''}{diff.toFixed(1)}%
    </text>
  );
};

export const SalesCard = ({ title, lineData, barData }: any) => {
  return (
    <div className="bg-theme-card-light dark:bg-theme-card-dark rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700/50 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 overflow-hidden flex flex-col">
      <CardHeader title={title} />
      <div className="p-5 grid grid-cols-12 gap-6">

        {/* 1. Line Chart: Trend (Longer - 50%) */}
        <div className="col-span-12 lg:col-span-6 h-80 flex flex-col">
          <h4 className="text-[10px] font-bold text-theme-text-muted/80 uppercase mb-4 text-center">Aylık Gelişim</h4>
          <div className="flex-1 min-h-0">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={lineData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" strokeOpacity={0.8} />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 10, fontWeight: 500 }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 10 }} />
                <Tooltip content={<CustomTooltip type="line" />} />
                <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: '10px', paddingTop: '10px' }} />
                <Line type="monotone" dataKey="lastYear" name="Geçen Dönem" stroke="#f4a261" strokeWidth={3} dot={false} />
                <Line type="monotone" dataKey="budget" name="Bütçe" stroke="#9ca3af" strokeWidth={3} dot={false} strokeDasharray="5 5" />
                <Line type="monotone" dataKey="actual" name="Fiili" stroke="#1B8D98" strokeWidth={4} activeDot={{ r: 6 }} dot={{ r: 4, fill: '#1B8D98', stroke: '#fff', strokeWidth: 2 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* 2. Column Chart: Comparison + Progress Bars (25%) */}
        <div className="col-span-12 lg:col-span-3 h-80 flex flex-col border-t lg:border-t-0 lg:border-l border-dashed border-slate-200 dark:border-slate-700/50 pt-6 lg:pt-0 lg:pl-6">
          <h4 className="text-[10px] font-bold text-theme-text-muted/80 uppercase mb-4 text-center">Karşılaştırma & Tahmin</h4>
          <div className="flex-1 min-h-0 mb-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={barData} margin={{ top: 20, right: 0, left: -20, bottom: 0 }} barSize={25}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" strokeOpacity={0.5} />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 10, fontWeight: 600 }} dy={5} interval={0} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 8 }} />
                <Tooltip
                  cursor={{ fill: '#f1f5f9', opacity: 0.8 }}
                  content={<CustomTooltip type="bar_single" />}
                />
                <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                  {barData.map((entry: any, index: number) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                  <LabelList dataKey="value" content={(props) => <CustomComparisonLabel {...props} data={barData} />} />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Progress Bars */}
          <div className="space-y-3 px-2">
            <div>
              <div className="flex justify-between text-[9px] mb-1 font-semibold text-theme-secondary dark:text-theme-text-muted/80">
                <span>Geçen Dönem</span>
                <span className="text-theme-text-main dark:text-theme-text-dark-main">%85</span>
              </div>
              <div className="h-1.5 w-full bg-slate-200/30 dark:bg-theme-secondary/30 rounded-full overflow-hidden">
                <div className="h-full bg-[#f4a261] rounded-full" style={{ width: '85%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-[9px] mb-1 font-semibold text-theme-secondary dark:text-theme-text-muted/80">
                <span>Bütçe</span>
                <span className="text-theme-text-main dark:text-theme-text-dark-main">%92</span>
              </div>
              <div className="h-1.5 w-full bg-slate-200/30 dark:bg-theme-secondary/30 rounded-full overflow-hidden">
                <div className="h-full bg-theme-secondary rounded-full" style={{ width: '92%' }}></div>
              </div>
            </div>
          </div>
        </div>

        {/* 3. Donut Chart: Channel Distribution (25%) */}
        <div className="col-span-12 lg:col-span-3 h-80 flex flex-col border-t lg:border-t-0 lg:border-l border-dashed border-slate-200 dark:border-slate-700/50 pt-6 lg:pt-0 lg:pl-6 relative">
          <h4 className="text-[10px] font-bold text-theme-text-muted/80 uppercase mb-4 text-center">Kanal Dağılımı</h4>

          <div className="flex-1 min-h-0">
            {/* Always show Sales Data */}
            <SalesDonutChart data={SALES_CHANNEL_DATA} />
          </div>
        </div>

      </div>
    </div>
  );
};