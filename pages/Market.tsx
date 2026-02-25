import React, { useState } from 'react';
import { ResponsiveContainer, LineChart, Line, BarChart, Bar, CartesianGrid, XAxis, YAxis, Tooltip, Legend, LabelList, Cell } from 'recharts';
import { Maximize2, X, RotateCcw, ArrowRightLeft } from 'lucide-react';
import { CustomTooltip } from '../components/Shared';
import { MARKET_CHARTS, MONTHS, MARKET_PALETTE, CHART_PALETTE } from '../data';

interface MarketContentProps {
  selectedBrands: string[];
}

const MarketFlipCard = ({ chart, index, selectedBrands, setExpandedIndex }: any) => {
  const [isFlipped, setIsFlipped] = useState(false);

  // Get last 6 months of data for the bar chart
  const last6MonthsData = chart.data.slice(-6);
  // Sort months chronologically
  const months = last6MonthsData.map((d: any) => d.name).sort((a: string, b: string) => MONTHS.indexOf(a) - MONTHS.indexOf(b));

  const brandDataArray = MARKET_PALETTE.slice(0, 5).map((color, idx) => {
    const brandName = idx === 0 ? "Pınar Süt" : `Rakip ${idx}`;
    const dataKey = `comp${idx + 1}`;

    if (!selectedBrands.includes(brandName)) return null;

    const brandData: any = { brand: brandName, color };
    last6MonthsData.forEach((monthData: any) => {
      brandData[monthData.name] = monthData[dataKey];
    });
    return brandData;
  }).filter(Boolean);

  const totalData: any = { brand: 'Toplam', color: MARKET_PALETTE[5] || '#475569' };
  last6MonthsData.forEach((monthData: any) => {
    let sum = 0;
    for (let i = 1; i <= 5; i++) {
      const brandName = i === 1 ? "Pınar Süt" : `Rakip ${i - 1}`;
      if (selectedBrands.includes(brandName)) {
        sum += monthData[`comp${i}`] || 0;
      }
    }
    totalData[monthData.name] = sum;
  });

  const transformedData = [totalData, ...brandDataArray];

  const CustomBarTooltip = ({ active, payload, label }: any) => {
    if (!active || !payload || !payload.length) return null;
    const brandData = payload[0].payload;

    return (
      <div className="bg-theme-card-light dark:bg-theme-card-dark p-3 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700/50 min-w-[150px] z-50">
        <div className="flex items-center gap-2 mb-2 border-b border-slate-200 dark:border-slate-700/50 pb-2">
          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: brandData.color }}></div>
          <span className="text-[12px] font-bold text-theme-text-main dark:text-gray-200">{label}</span>
        </div>
        <div className="space-y-1.5">
          {months.map((m: string, idx: number) => (
            <div key={m} className="flex justify-between items-center text-[11px]">
              <span className="text-theme-secondary dark:text-theme-text-muted/80 font-medium">{m}</span>
              <span className="font-bold text-theme-text-main dark:text-gray-200">
                {brandData[m]?.toLocaleString('tr-TR')}
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderLineChart = (isModal: boolean = false) => (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart
        data={chart.data}
        margin={isModal
          ? { top: 40, right: 30, left: 20, bottom: 20 }
          : { top: 25, right: 20, left: -25, bottom: 0 }
        }
      >
        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" strokeOpacity={0.8} />
        <XAxis
          dataKey="name"
          axisLine={{ stroke: '#94a3b8', strokeWidth: 1 }}
          tickLine={false}
          tick={{ fill: '#64748b', fontSize: isModal ? 12 : 10, fontWeight: 600 }}
          interval={isModal ? 0 : 1}
        />
        <YAxis
          axisLine={{ stroke: '#94a3b8', strokeWidth: 1 }}
          tickLine={false}
          tick={{ fill: '#64748b', fontSize: isModal ? 12 : 9 }}
        />
        <Tooltip content={<CustomTooltip type="line" />} />
        <Legend
          iconType="circle"
          iconSize={isModal ? 10 : 8}
          verticalAlign="bottom"
          align="center"
          wrapperStyle={{
            fontSize: isModal ? '12px' : '10px',
            width: '100%',
            left: 0,
            bottom: 0,
            padding: isModal ? '16px 0' : '12px 0',
            textAlign: 'center'
          }}
        />

        {MARKET_PALETTE.slice(0, 5).map((color, idx) => {
          const brandName = idx === 0 ? "Pınar Süt" : `Rakip ${idx}`;
          const dataKey = `comp${idx + 1}`;

          if (!selectedBrands.includes(brandName)) return null;

          return (
            <Line
              key={idx}
              type="monotone"
              dataKey={dataKey}
              name={brandName}
              stroke={color}
              strokeWidth={3}
              dot={{ r: 4, fill: color, strokeWidth: 2, stroke: '#fff' }}
              activeDot={{ r: 6 }}
              animationDuration={1000}
            >
              <LabelList
                dataKey={dataKey}
                position="top"
                offset={12}
                style={{
                  fill: color,
                  fontSize: isModal ? '11px' : '9px',
                  fontWeight: 'bold',
                  opacity: 0.9
                }}
              />
            </Line>
          );
        })}
      </LineChart>
    </ResponsiveContainer>
  );

  const renderBarChart = () => (
    <div className="w-full h-full overflow-x-auto custom-scrollbar">
      <div style={{ minWidth: '600px', height: '100%' }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={transformedData}
            margin={{ top: 25, right: 20, left: -25, bottom: 0 }}
            barGap={0}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" strokeOpacity={0.8} />
            <XAxis
              dataKey="brand"
              axisLine={{ stroke: '#94a3b8', strokeWidth: 1 }}
              tickLine={false}
              tick={{ fill: '#64748b', fontSize: 11, fontWeight: 600 }}
            />
            <YAxis
              axisLine={{ stroke: '#94a3b8', strokeWidth: 1 }}
              tickLine={false}
              tick={{ fill: '#64748b', fontSize: 9 }}
            />
            <Tooltip cursor={{ fill: 'transparent' }} content={<CustomBarTooltip />} />

            {months
              .map((month: string, idx: number) => (
                <Bar
                  key={month}
                  dataKey={month}
                  name={month}
                  radius={[4, 4, 0, 0]}
                  animationDuration={1000}
                >
                  {transformedData.map((entry: any, index: number) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={entry.color}
                      stroke="#ffffff"
                      strokeWidth={1}
                    />
                  ))}
                  <LabelList
                    dataKey={month}
                    position="top"
                    content={(props: any) => {
                      const { x, y, width, value, index } = props;
                      const brandColor = transformedData[index]?.color || '#000';
                      return (
                        <text
                          x={x + width / 2}
                          y={y - 4}
                          fill={brandColor}
                          fontSize="9px"
                          fontWeight="bold"
                          textAnchor="middle"
                        >
                          {value}
                        </text>
                      );
                    }}
                  />
                </Bar>
              ))}
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );

  return (
    <div className="group perspective-1000 w-full h-[380px] cursor-default hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 rounded-2xl">
      <div className={`relative w-full h-full transition-transform duration-700 transform-style-3d ${isFlipped ? 'rotate-y-180' : ''}`}>

        {/* --- FRONT FACE --- */}
        <div className={`absolute inset-0 w-full h-full bg-theme-card-light dark:bg-theme-card-dark rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700/50 flex flex-col backface-hidden overflow-hidden ${isFlipped ? 'pointer-events-none' : ''}`}>
          <div className="px-5 py-3.5 border-b border-slate-200 dark:border-slate-700/50 flex justify-between items-center bg-theme-card-light dark:bg-theme-card-dark">
            <h3 className="text-xs font-bold text-theme-text-main dark:text-theme-text-dark-main uppercase tracking-wider">{chart.title}</h3>
          </div>

          <div className={`absolute top-3 right-3 items-center gap-2 transition-opacity duration-300 z-10 ${isFlipped ? 'hidden' : 'flex opacity-0 group-hover:opacity-100'}`}>
            <button
              onClick={() => setIsFlipped(true)}
              className="p-1.5 bg-theme-bg-light dark:bg-theme-bg-dark/80 rounded-lg shadow-sm text-theme-text-muted/80 hover:text-theme-secondary border border-slate-200 dark:border-slate-700/50"
              title="Sütun Grafiği (Son 6 Ay)"
            >
              <ArrowRightLeft size={14} />
            </button>
            <button
              onClick={() => setExpandedIndex({ index, isBar: false })}
              className="p-1.5 bg-theme-bg-light dark:bg-theme-bg-dark/80 rounded-lg shadow-sm text-theme-text-muted/80 hover:text-theme-secondary border border-slate-200 dark:border-slate-700/50"
              title="Genişlet"
            >
              <Maximize2 size={14} />
            </button>
          </div>

          <div className="flex-1 w-full min-h-0 pb-2">
            {renderLineChart()}
          </div>
        </div>

        {/* --- BACK FACE --- */}
        <div className={`absolute inset-0 w-full h-full bg-theme-card-light dark:bg-theme-card-dark rounded-2xl shadow-xl border border-slate-200 dark:border-slate-700/50 rotate-y-180 backface-hidden flex flex-col overflow-hidden ${!isFlipped ? 'pointer-events-none' : ''}`}>
          <div className="px-5 py-3.5 border-b border-slate-200 dark:border-slate-700/50 flex justify-between items-center bg-theme-card-light dark:bg-theme-card-dark">
            <h3 className="text-xs font-bold text-theme-text-main dark:text-theme-text-dark-main uppercase tracking-wider">{chart.title} (Son 6 Ay)</h3>
          </div>

          <div className="absolute top-3 right-3 flex items-center gap-2 z-10">
            <button
              onClick={() => setIsFlipped(false)}
              className="p-1.5 bg-theme-bg-light dark:bg-theme-bg-dark/80 rounded-lg shadow-sm text-theme-text-muted/80 hover:text-theme-secondary border border-slate-200 dark:border-slate-700/50"
              title="Çizgi Grafiği"
            >
              <RotateCcw size={14} />
            </button>
            <button
              onClick={() => setExpandedIndex({ index, isBar: true })}
              className="p-1.5 bg-theme-bg-light dark:bg-theme-bg-dark/80 rounded-lg shadow-sm text-theme-text-muted/80 hover:text-theme-secondary border border-slate-200 dark:border-slate-700/50"
              title="Genişlet"
            >
              <Maximize2 size={14} />
            </button>
          </div>

          <div className="flex-1 w-full min-h-0 pb-2">
            {renderBarChart()}
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

const MarketContent: React.FC<MarketContentProps> = ({ selectedBrands }) => {
  const [expandedState, setExpandedState] = useState<{ index: number, isBar: boolean } | null>(null);

  const renderModalLineChart = (chart: any) => (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart
        data={chart.data}
        margin={{ top: 40, right: 30, left: 20, bottom: 20 }}
      >
        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" strokeOpacity={0.8} />
        <XAxis
          dataKey="name"
          axisLine={{ stroke: '#94a3b8', strokeWidth: 1 }}
          tickLine={false}
          tick={{ fill: '#64748b', fontSize: 12, fontWeight: 600 }}
          interval={0}
        />
        <YAxis
          axisLine={{ stroke: '#94a3b8', strokeWidth: 1 }}
          tickLine={false}
          tick={{ fill: '#64748b', fontSize: 12 }}
        />
        <Tooltip content={<CustomTooltip type="line" />} />
        <Legend
          iconType="circle"
          iconSize={10}
          verticalAlign="bottom"
          align="center"
          wrapperStyle={{
            fontSize: '12px',
            width: '100%',
            left: 0,
            bottom: 0,
            padding: '16px 0',
            textAlign: 'center'
          }}
        />

        {CHART_PALETTE.slice(0, 5).map((color, idx) => {
          const brandName = idx === 0 ? "Pınar Süt" : `Rakip ${idx}`;
          const dataKey = `comp${idx + 1}`;

          if (!selectedBrands.includes(brandName)) return null;

          return (
            <Line
              key={idx}
              type="monotone"
              dataKey={dataKey}
              name={brandName}
              stroke={color}
              strokeWidth={3}
              dot={{ r: 4, fill: color, strokeWidth: 2, stroke: '#fff' }}
              activeDot={{ r: 6 }}
              animationDuration={1000}
            >
              <LabelList
                dataKey={dataKey}
                position="top"
                offset={12}
                style={{
                  fill: color,
                  fontSize: '11px',
                  fontWeight: 'bold',
                  opacity: 0.9
                }}
              />
            </Line>
          );
        })}
      </LineChart>
    </ResponsiveContainer>
  );

  const renderModalBarChart = (chart: any) => {
    const last6MonthsData = chart.data.slice(-6);
    // Sort months chronologically
    const months = last6MonthsData.map((d: any) => d.name).sort((a: string, b: string) => MONTHS.indexOf(a) - MONTHS.indexOf(b));

    const brandDataArray = CHART_PALETTE.slice(0, 5).map((color, idx) => {
      const brandName = idx === 0 ? "Pınar Süt" : `Rakip ${idx}`;
      const dataKey = `comp${idx + 1}`;

      if (!selectedBrands.includes(brandName)) return null;

      const brandData: any = { brand: brandName, color };
      last6MonthsData.forEach((monthData: any) => {
        brandData[monthData.name] = monthData[dataKey];
      });
      return brandData;
    }).filter(Boolean);

    const totalData: any = { brand: 'Toplam', color: CHART_PALETTE[5] || '#475569' };
    last6MonthsData.forEach((monthData: any) => {
      let sum = 0;
      for (let i = 1; i <= 5; i++) {
        const brandName = i === 1 ? "Pınar Süt" : `Rakip ${i - 1}`;
        if (selectedBrands.includes(brandName)) {
          sum += monthData[`comp${i}`] || 0;
        }
      }
      totalData[monthData.name] = sum;
    });

    const transformedData = [totalData, ...brandDataArray];

    const CustomBarTooltip = ({ active, payload, label }: any) => {
      if (!active || !payload || !payload.length) return null;
      const brandData = payload[0].payload;

      return (
        <div className="bg-theme-card-light dark:bg-theme-card-dark p-4 rounded-xl shadow-xl border border-slate-200 dark:border-slate-700/50 min-w-[180px] z-50">
          <div className="flex items-center gap-2 mb-3 border-b border-slate-200 dark:border-slate-700/50 pb-3">
            <div className="w-4 h-4 rounded-full" style={{ backgroundColor: brandData.color }}></div>
            <span className="text-[14px] font-bold text-theme-text-main dark:text-gray-200">{label}</span>
          </div>
          <div className="space-y-2">
            {months.map((m: string, idx: number) => (
              <div key={m} className="flex justify-between items-center text-[12px]">
                <span className="text-theme-secondary dark:text-theme-text-muted/80 font-medium">{m}</span>
                <span className="font-bold text-theme-text-main dark:text-gray-200">
                  {brandData[m]?.toLocaleString('tr-TR')}
                </span>
              </div>
            ))}
          </div>
        </div>
      );
    };

    return (
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={transformedData}
          margin={{ top: 40, right: 30, left: 20, bottom: 20 }}
          barGap={0}
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" strokeOpacity={0.8} />
          <XAxis
            dataKey="brand"
            axisLine={{ stroke: '#94a3b8', strokeWidth: 1 }}
            tickLine={false}
            tick={{ fill: '#64748b', fontSize: 12, fontWeight: 600 }}
          />
          <YAxis
            axisLine={{ stroke: '#94a3b8', strokeWidth: 1 }}
            tickLine={false}
            tick={{ fill: '#64748b', fontSize: 12 }}
          />
          <Tooltip cursor={{ fill: 'transparent' }} content={<CustomBarTooltip />} />

          {months
            .map((month: string, idx: number) => (
              <Bar
                key={month}
                dataKey={month}
                name={month}
                radius={[4, 4, 0, 0]}
                animationDuration={1000}
              >
                {transformedData.map((entry: any, index: number) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={entry.color}
                    stroke="#ffffff"
                    strokeWidth={1}
                  />
                ))}
                <LabelList
                  dataKey={month}
                  position="top"
                  content={(props: any) => {
                    const { x, y, width, value, index } = props;
                    const brandColor = transformedData[index]?.color || '#000';
                    return (
                      <text
                        x={x + width / 2}
                        y={y - 6}
                        fill={brandColor}
                        fontSize="11px"
                        fontWeight="bold"
                        textAnchor="middle"
                      >
                        {value}
                      </text>
                    );
                  }}
                />
              </Bar>
            ))}
        </BarChart>
      </ResponsiveContainer>
    );
  };

  return (
    <div className="p-4 lg:p-5 space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-700 relative">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {MARKET_CHARTS.map((chart, index) => (
          <MarketFlipCard
            key={index}
            chart={chart}
            index={index}
            selectedBrands={selectedBrands}
            setExpandedIndex={setExpandedState}
          />
        ))}
      </div>

      {/* Fullscreen Modal */}
      {expandedState !== null && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 lg:p-10 bg-black/70 backdrop-blur-md animate-in fade-in zoom-in-95 duration-300">
          <div className="bg-theme-card-light dark:bg-theme-card-dark w-full h-full rounded-2xl shadow-2xl flex flex-col overflow-hidden relative">
            {/* Header Resized for Mobile/Tablet */}
            <div className="bg-gradient-to-r from-[#012A36] to-[#22577a] px-4 py-2.5 md:px-6 md:py-4 flex justify-between items-center shrink-0">
              <h2 className="text-xs md:text-base font-bold text-white uppercase tracking-widest">{MARKET_CHARTS[expandedState.index].title} - Detaylı Analiz</h2>
              <button
                onClick={() => setExpandedState(null)}
                className="p-1.5 md:p-2 bg-theme-card-light/20 hover:bg-theme-card-light/30 rounded-full text-white transition-colors"
              >
                <X size={20} className="md:w-6 md:h-6" />
              </button>
            </div>
            <div className="flex-1 p-6">
              {expandedState.isBar
                ? renderModalBarChart(MARKET_CHARTS[expandedState.index])
                : renderModalLineChart(MARKET_CHARTS[expandedState.index])
              }
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MarketContent;