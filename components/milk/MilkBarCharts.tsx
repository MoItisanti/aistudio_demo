import React, { useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, ReferenceLine, Rectangle, LabelList } from 'recharts';
import { CardHeader } from '../Shared';
import { MILK_30_DAYS_DATA, MILK_24_WEEKS_DATA, MILK_12_MONTHS_DATA } from '../../data';

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    const actual = payload.find((p: any) => p.dataKey === 'actual');
    return (
      <div className="bg-white dark:bg-theme-card-dark border border-slate-200 dark:border-slate-700/80 p-3 rounded-xl shadow-lg flex flex-col gap-2 min-w-[150px]">
        <p className="font-semibold text-theme-text-main dark:text-theme-text-dark-main text-sm pb-1 border-b border-slate-100 dark:border-slate-700/50">{label}</p>
        <div className="flex items-center justify-between gap-4 mt-1">
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: '#17ad7bff' }}></div>
            <span className="text-xs font-medium text-slate-500 dark:text-slate-400">Fiili Süt Ton:</span>
          </div>
          <span className="text-xs font-bold text-theme-text-main dark:text-gray-200">
            {actual?.value?.toLocaleString('tr-TR')}
          </span>
        </div>
      </div>
    );
  }
  return null;
};

export const MilkVolumeChart = ({ title, data, isDaily }: any) => {
  const maxActual = useMemo(() => Math.max(...data.map((d: any) => d.actual)), [data]);
  const minActual = useMemo(() => Math.min(...data.map((d: any) => d.actual)), [data]);
  const avgActual = useMemo(() => {
    if (!data || data.length === 0) return 0;
    return data.reduce((acc: number, d: any) => acc + d.actual, 0) / data.length;
  }, [data]);

  const ActualActiveBar = (props: any) => {
    const { x, y, width, height, fill } = props;
    return <Rectangle x={x} y={y} width={width} height={height} fill={fill} stroke="#2DD4BF" strokeWidth={3} radius={[6, 6, 0, 0]} />;
  };

  const CustomBarLabel = (props: any) => {
    const { x, y, width, height, value } = props;
    if (value == null || y == null) return null;

    let borderColor = '#17ad7bff';
    if (value === maxActual) borderColor = '#38BDF8';
    else if (value === minActual) borderColor = '#EF4444';

    const displayValue = value.toLocaleString('tr-TR');
    const textWidth = displayValue.toString().length * 6 + 12;
    const rectHeight = 16;
    const labelY = y - rectHeight - 6;

    return (
      <g>
        <rect
          x={x + width / 2 - textWidth / 2}
          y={labelY}
          width={textWidth}
          height={rectHeight}
          fill="#ffffff"
          stroke={borderColor}
          strokeWidth={1.5}
          rx={4}
          ry={4}
          className="dark:fill-slate-800"
        />
        <text
          x={x + width / 2}
          y={labelY + 11}
          fill={borderColor}
          textAnchor="middle"
          fontSize={10}
          fontWeight="bold"
        >
          {displayValue}
        </text>
      </g>
    );
  };

  return (
    <div className="bg-theme-card-light dark:bg-theme-card-dark rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700/50 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 overflow-hidden flex flex-col">
      <CardHeader title={title}>
        <div className="flex items-center gap-3 sm:gap-4 flex-wrap justify-end">
          <div className="flex items-center gap-1.5 text-[11px] sm:text-[12px] font-semibold text-white/90">
            <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: '#17ad7bff' }}></div> Fiili Süt
          </div>

          <div className="hidden sm:block w-px h-3 bg-white/20 mx-0.5"></div>

          <div className="flex items-center gap-1.5 text-[11px] sm:text-[12px] font-semibold text-white/80">
            <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: '#38BDF8' }}></div> En Yüksek
          </div>
          <div className="flex items-center gap-1.5 text-[11px] sm:text-[12px] font-semibold text-white/80">
            <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: '#EF4444' }}></div> En Düşük
          </div>
        </div>
      </CardHeader>
      <div className="p-6 pb-2">

        <div className="h-64 mt-2 overflow-x-auto overflow-y-hidden subtle-scrollbar pb-2">
          <div className="min-w-[700px] h-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data} margin={{ top: 25, right: 0, left: -15, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" strokeOpacity={0.6} />
                <XAxis
                  dataKey="name"
                  axisLine={false}
                  tickLine={false}
                  tick={isDaily ? { fontSize: 10, fill: '#64748b', fontWeight: 500, angle: -45, textAnchor: 'end' } : { fontSize: 12, fill: '#64748b', fontWeight: 500 }}
                  dy={isDaily ? 5 : 10}
                  height={isDaily ? 40 : 30}
                />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#94a3b8' }} tickFormatter={(value) => value.toLocaleString('tr-TR')} />
                <Tooltip content={<CustomTooltip />} cursor={false} />

                <ReferenceLine y={avgActual} stroke="#94a3b8" strokeDasharray="4 4" opacity={0.6} />

                {/* Foreground Bar: Actual */}
                <Bar dataKey="actual" radius={[6, 6, 0, 0]} maxBarSize={48} activeBar={<ActualActiveBar />}>
                  <LabelList dataKey="actual" content={<CustomBarLabel />} />
                  {data.map((entry: any, index: number) => {
                    let fill = '#17ad7bff'; // theme success
                    if (entry.actual === maxActual) fill = '#38BDF8'; // theme primary (highest)
                    else if (entry.actual === minActual) fill = '#EF4444'; // theme warning (lowest)
                    return <Cell key={`cell-${index}`} fill={fill} className="transition-all duration-300" />;
                  })}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export const MilkBarCharts = () => {
  return (
    <div className="flex flex-col gap-6">
      <MilkVolumeChart title="Son 30 Gün Süt Alım-Ton" data={MILK_30_DAYS_DATA} isDaily={true} />
      <MilkVolumeChart title="Son 24 Hafta Süt Alım-Ton" data={MILK_24_WEEKS_DATA} />
      <MilkVolumeChart title="Son 12 Ay Süt Alım-Ton" data={MILK_12_MONTHS_DATA} />
    </div>
  );
};
