import React, { useState, useEffect } from 'react';
import { Target, Briefcase, TrendingUp, UserCheck, CircleDot, ArrowUpRight } from 'lucide-react';
import {
  ResponsiveContainer, PieChart as RePieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis,
  CartesianGrid, Tooltip, RadialBarChart, RadialBar, AreaChart, Area, Legend, LabelList, Sector
} from 'recharts';
import { AnimatedProgressBar, AnimatedTurnoverBar, CustomTooltip, CustomBarLabel, CardHeader } from '../components/Shared';
import {
  PROFIT_PIE_DATA, TREND_DATA, CHANNEL_DIST_DATA, BUDGET_DATA, PYRAMID_DATA, COMPARISON_DATA,
  CHART_PALETTE, MARKET_PALETTE, THEME_COLORS
} from '../data';

// --- Local Chart Components ---

const ProfitDonutChart = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const onPieEnter = (_: any, index: number) => {
    setActiveIndex(index);
  };

  const activeItem = PROFIT_PIE_DATA[activeIndex];

  const renderActiveShape = (props: any) => {
    const { cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill } = props;
    return (
      <g>
        <Sector
          cx={cx}
          cy={cy}
          innerRadius={innerRadius}
          outerRadius={outerRadius + 6}
          startAngle={startAngle}
          endAngle={endAngle}
          fill={fill}
          cornerRadius={6}
        />
        <Sector
          cx={cx}
          cy={cy}
          startAngle={startAngle}
          endAngle={endAngle}
          innerRadius={innerRadius - 4}
          outerRadius={outerRadius + 10}
          fill={fill}
          opacity={0.12}
          cornerRadius={8}
        />
      </g>
    );
  };

  return (
    <div className="w-full h-full relative flex flex-col justify-center">
      <div className="h-44 w-full relative z-10">
        <ResponsiveContainer width="100%" height="100%">
          <RePieChart>
            <Pie
              data={PROFIT_PIE_DATA}
              cx="50%"
              cy="50%"
              innerRadius={52}
              outerRadius={72}
              dataKey="value"
              onMouseEnter={onPieEnter}
              paddingAngle={3}
              cornerRadius={5}
              stroke="none"
              {...{ activeIndex, activeShape: renderActiveShape } as any}
            >
              {PROFIT_PIE_DATA.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
          </RePieChart>
        </ResponsiveContainer>
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none transition-all duration-300">
          <span className="text-[10px] font-semibold text-theme-text-muted/80 uppercase tracking-wider">{activeItem.name}</span>
          <span className="text-2xl font-bold text-theme-text-main dark:text-theme-text-dark-main">%{activeItem.value}</span>
        </div>
      </div>
      <div className="mt-3 flex justify-center gap-2.5">
        {PROFIT_PIE_DATA.map((item, index) => (
          <div
            key={item.name}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] cursor-pointer transition-all duration-200 border ${activeIndex === index ? 'bg-theme-bg-light border-theme-secondary/50 dark:bg-theme-card-light/5 dark:border-white/20 scale-105' : 'border-transparent opacity-60 hover:opacity-100'}`}
            onMouseEnter={() => setActiveIndex(index)}
          >
            <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }}></div>
            <span className="font-semibold text-theme-text-main dark:text-theme-text-dark-muted">{item.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

const BudgetGauge = ({ item }: any) => (
  <div className="flex flex-col items-center">
    <div className="relative h-24 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <RePieChart>
          <Pie
            data={[
              { value: item.value, fill: THEME_COLORS.accent },
              { value: 100 - item.value, fill: '#f3f4f6' }
            ]}
            cx="50%" cy="100%"
            startAngle={180} endAngle={0}
            innerRadius={38} outerRadius={58}
            dataKey="value" stroke="none"
          />
        </RePieChart>
      </ResponsiveContainer>
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 text-center">
        <span className="text-lg font-bold text-theme-text-main dark:text-theme-text-dark-main">%{item.value}</span>
      </div>
    </div>
    <div className="mt-2 flex flex-col items-center text-[11px] text-theme-text-muted/80">
      <div className="flex justify-between w-24"><span>Bütçe</span> <span className="font-semibold text-theme-secondary/80 dark:text-theme-text-muted">{item.target}</span></div>
      <div className="flex justify-between w-24"><span>Gerçek.</span> <span className="font-semibold text-theme-accent">{item.realized}</span></div>
    </div>
    <span className="mt-1.5 text-[10px] font-bold text-theme-secondary/80 dark:text-theme-text-muted uppercase tracking-wider">{item.name}</span>
  </div>
);

const PyramidChart = ({ data }: { data: typeof PYRAMID_DATA }) => {
  const width = 200;
  const height = 240;
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsMounted(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center w-full h-full p-2 relative">
      <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-full max-h-[220px]">
        {data.map((item, i) => {
          const stepHeight = height / data.length;
          const yTop = i * stepHeight;
          const yBot = (i + 1) * stepHeight;

          const wTop = (yTop / height) * width;
          const wBot = (yBot / height) * width;

          const x1Top = (width - wTop) / 2;
          const x2Top = (width + wTop) / 2;
          const x1Bot = (width - wBot) / 2;
          const x2Bot = (width + wBot) / 2;

          const points = `${x1Top},${yTop} ${x2Top},${yTop} ${x2Bot},${yBot} ${x1Bot},${yBot}`;

          return (
            <g key={item.name}
              onMouseEnter={() => setHoveredIndex(i)}
              onMouseLeave={() => setHoveredIndex(null)}>
              <polygon
                points={points}
                fill={item.color}
                stroke={item.color}
                strokeWidth="4"
                strokeLinejoin="round"
                className="transition-all duration-700 cursor-pointer"
                style={{
                  opacity: hoveredIndex === null || hoveredIndex === i ? (isMounted ? 1 : 0) : 0.6,
                  transform: isMounted ? 'scaleY(1)' : 'scaleY(0)',
                  transformOrigin: 'bottom',
                  transition: `all 800ms cubic-bezier(0.16, 1, 0.3, 1) ${i * 100}ms`
                }}
              />
              <text
                x={width / 2}
                y={yTop + stepHeight * 0.65}
                className="fill-white text-[11px] font-black"
                textAnchor="middle"
                style={{
                  pointerEvents: 'none',
                  opacity: isMounted ? 1 : 0,
                  transition: `opacity 500ms ease-out ${600 + i * 100}ms`
                }}
              >
                {item.value}%
              </text>
              <title>{`${item.name}: ${item.value}%`}</title>
            </g>
          );
        })}
      </svg>
      {hoveredIndex !== null && (
        <div className="absolute top-2 right-2 bg-theme-card-light dark:bg-theme-card-dark p-2.5 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700/50 text-[11px] font-semibold z-20 transition-all pointer-events-none">
          {data[hoveredIndex].name}: {data[hoveredIndex].value}%
        </div>
      )}
    </div>
  );
};

const ExecutiveContent = () => (
  <div className="p-4 lg:p-5 space-y-5 animate-in fade-in slide-in-from-bottom-4 duration-700 max-w-[1600px] mx-auto">
    <div className="grid grid-cols-12 gap-4">
      <div className="col-span-12 lg:col-span-4 bg-theme-card-light dark:bg-theme-card-dark rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700/50 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 overflow-hidden">
        <CardHeader title="Kârlılık" />
        <div className="p-4 flex flex-col md:flex-row gap-5">
          <div className="w-full md:w-5/12 bg-gradient-to-br from-[#012A36] to-[#1B8D98] p-4 rounded-xl text-white flex flex-col justify-between relative overflow-hidden group shadow-md">
            <div className="absolute -right-6 -top-6 opacity-10 group-hover:opacity-15 transition-opacity duration-500 transform group-hover:scale-110"><Briefcase size={80} /></div>
            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-2">
                <div className="p-1.5 bg-theme-card-light/15 rounded-md"><TrendingUp size={14} className="text-white" /></div>
                <p className="text-[9px] font-semibold uppercase tracking-wider text-white/70">Net Kâr</p>
              </div>
              <div className="flex items-baseline gap-1 mt-1">
                <span className="text-3xl font-black tracking-tight">4.3</span>
                <span className="text-base font-bold opacity-60">M</span>
              </div>
              <div className="mt-2 flex items-center gap-1 text-[10px] text-theme-success font-semibold bg-theme-card-light/90 w-fit px-2 py-0.5 rounded-full shadow-sm">
                <ArrowUpRight size={10} /> +12.5%
              </div>
            </div>

            <div className="mt-4 relative z-10">
              <div className="flex justify-between items-end mb-1.5">
                <p className="text-[8px] font-semibold uppercase tracking-wider opacity-60">Hedef</p>
                <span className="text-xs font-bold text-white">%95</span>
              </div>
              <div className="h-1 bg-black/20 rounded-full overflow-hidden">
                <AnimatedProgressBar value={95} color="bg-theme-card-light/80" height="h-full" />
              </div>
            </div>
          </div>

          <div className="w-full md:w-7/12 flex flex-col justify-center">
            <ProfitDonutChart />
          </div>
        </div>
      </div>

      <div className="col-span-12 lg:col-span-6 bg-theme-card-light dark:bg-theme-card-dark rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700/50 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 overflow-hidden flex flex-col">
        <CardHeader title="Aylık Trend" />
        <div className="flex-1 w-full min-h-[224px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={TREND_DATA} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="color2024" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="10%" stopColor={CHART_PALETTE[4]} stopOpacity={0.4} />
                  <stop offset="95%" stopColor={CHART_PALETTE[4]} stopOpacity={0} />
                </linearGradient>
                <linearGradient id="color2025" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={CHART_PALETTE[2]} stopOpacity={0.25} />
                  <stop offset="95%" stopColor={CHART_PALETTE[2]} stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 9, fontWeight: 500 }} />
              <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 9 }} />
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" strokeOpacity={0.5} />
              <Tooltip content={<CustomTooltip type="area" />} />
              <Legend
                verticalAlign="bottom"
                align="center"
                iconType="circle"
                iconSize={7}
                wrapperStyle={{
                  fontSize: '9px',
                  padding: '8px 0',
                  borderTop: '2px solid #e2e8f0', // Belirgin bant
                  width: '100%',
                  left: 0,
                  bottom: 0,
                  backgroundColor: 'rgba(248, 250, 252, 0.5)'
                }}
              />
              <Area type="monotone" dataKey="y2024" name="2024 Satış" stroke={CHART_PALETTE[4]} fillOpacity={1} fill="url(#color2024)" strokeWidth={2.5} />
              <Area type="monotone" dataKey="y2025" name="2025 Satış" stroke={CHART_PALETTE[2]} fillOpacity={1} fill="url(#color2025)" strokeWidth={2.5} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="col-span-12 lg:col-span-2 bg-theme-card-light dark:bg-theme-card-dark rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700/50 flex flex-col hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 overflow-hidden">
        <CardHeader title="Kanal Dağılımı" />
        <div className="p-3 lg:p-4 flex flex-col flex-1">
          <div className="flex-1 min-h-[140px] relative">
            <ResponsiveContainer width="100%" height="100%">
              <RadialBarChart cx="50%" cy="50%" innerRadius="45%" outerRadius="100%" barSize={10} data={CHANNEL_DIST_DATA} startAngle={180} endAngle={-180}>
                <RadialBar background={{ fill: '#f3f4f6' }} dataKey="value" cornerRadius={30}>
                  {CHANNEL_DIST_DATA.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.color} />)}
                </RadialBar>
                <Tooltip cursor={false} contentStyle={{ borderRadius: '12px', border: 'none', fontSize: '10px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} />
              </RadialBarChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-12 h-12 rounded-full bg-theme-bg-light dark:bg-theme-bg-dark/80/50 flex items-center justify-center shadow-inner">
                <Target size={18} className="text-theme-secondary" />
              </div>
            </div>
          </div>
          <div className="mt-2 space-y-1.5">
            {CHANNEL_DIST_DATA.map((item) => (
              <div key={item.name} className="flex items-center justify-between text-[9px] group cursor-default">
                <div className="flex items-center gap-1.5 text-theme-secondary group-hover:text-theme-text-main dark:group-hover:text-theme-text-muted transition-colors">
                  <div className="w-2 h-2 rounded-full shadow-sm" style={{ backgroundColor: item.color }}></div>
                  {item.name}
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-10 h-1 bg-theme-bg-light/80 dark:bg-theme-secondary/30 rounded-full overflow-hidden">
                    <div className="h-full rounded-full transition-all duration-500" style={{ width: `${item.value}%`, backgroundColor: item.color }}></div>
                  </div>
                  <span className="font-semibold text-theme-text-main dark:text-theme-text-dark-muted w-6 text-right">%{item.value}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>

    <div className="grid grid-cols-12 gap-4">
      <div className="col-span-12 lg:col-span-6 bg-theme-card-light dark:bg-theme-card-dark rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700/50 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 overflow-hidden">
        <CardHeader title="Hedef Gerçekleştirme">
          <div className="flex items-center gap-2">
            <div className="w-20 h-1.5 bg-theme-card-light/20 rounded-full overflow-hidden flex items-center">
              <AnimatedProgressBar value={75} color="bg-theme-card-light" height="h-full" />
            </div>
            <span className="text-[9px] font-bold text-white">%75</span>
          </div>
        </CardHeader>
        <div className="p-4 grid grid-cols-2 md:grid-cols-4 gap-4">
          {BUDGET_DATA.map((item) => <BudgetGauge key={item.name} item={item} />)}
        </div>
      </div>

      <div className="col-span-12 lg:col-span-4 bg-theme-card-light dark:bg-theme-card-dark rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700/50 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 overflow-hidden">
        <CardHeader title="İnsan Kaynakları" />
        <div className="p-4 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[9px] font-semibold text-theme-text-muted/80 uppercase mb-0.5">Toplam Çalışan</p>
              <h4 className="text-2xl font-black text-theme-text-main dark:text-theme-text-dark-main">6,820</h4>
            </div>
            <div className="flex items-center gap-1 text-theme-accent">
              {[...Array(6)].map((_, i) => (
                <UserCheck key={i} size={14} fill={i < 4 ? 'currentColor' : 'none'} className={i < 4 ? 'text-theme-accent' : 'text-gray-200 dark:text-theme-text-main'} />
              ))}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="p-3 bg-theme-bg-light dark:bg-theme-bg-dark/80/50 rounded-xl flex flex-col justify-between border border-slate-200 dark:border-slate-700/50">
              <span className="text-[8px] font-semibold text-theme-text-muted/80 uppercase">Mavi Yaka</span>
              <span className="text-lg font-black text-theme-text-main/80 dark:text-theme-secondary">4,830</span>
            </div>
            <div className="p-3 bg-theme-bg-light dark:bg-theme-bg-dark/80/50 rounded-xl flex flex-col justify-between border border-slate-200 dark:border-slate-700/50">
              <span className="text-[8px] font-semibold text-theme-text-muted/80 uppercase">Beyaz Yaka</span>
              <span className="text-lg font-black text-theme-text-main/80 dark:text-theme-secondary">1,990</span>
            </div>
          </div>
          <div className="pt-1">
            <div className="flex justify-between items-center mb-1">
              <p className="text-[9px] font-semibold text-theme-text-muted/80 uppercase">Turnover Oranı</p>
              <span className="text-[10px] font-bold text-theme-text-muted/80">%56</span>
            </div>
            <AnimatedTurnoverBar value={56} />
          </div>
        </div>
      </div>

      <div className="col-span-12 lg:col-span-2 bg-theme-card-light dark:bg-theme-card-dark rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700/50 flex flex-col hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 overflow-hidden">
        <CardHeader title="AÜG Dağılımı" />
        <div className="p-3 flex-1 min-h-[200px]">
          <PyramidChart data={PYRAMID_DATA} />
        </div>
      </div>
    </div>

    <div className="col-span-12 bg-theme-card-light dark:bg-theme-card-dark rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700/50 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 overflow-hidden">
      <CardHeader title="Karşılaştırma" />
      <div className="h-72 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={COMPARISON_DATA} margin={{ top: 20, right: 10, left: -30, bottom: 0 }} barSize={24}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" strokeOpacity={0.5} />
            <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 9, fontWeight: 500 }} dy={10} />
            <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 9 }} />
            <Tooltip cursor={{ fill: '#f8fafc' }} content={<CustomTooltip type="bar" />} />
            <Legend
              verticalAlign="bottom"
              align="center"
              wrapperStyle={{
                fontSize: '9px',
                padding: '8px 0',
                borderTop: '2px solid #e2e8f0', // Bant ayırıcı
                width: '100%',
                left: 0,
                bottom: 0,
                backgroundColor: 'rgba(248, 250, 252, 0.5)'
              }}
              content={() => (
                <div className="flex justify-center gap-6">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded bg-theme-primary"></div>
                    <span className="text-theme-secondary font-medium text-[10px]">2024</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded bg-theme-secondary"></div>
                    <span className="text-theme-secondary font-medium text-[10px]">2025</span>
                  </div>
                </div>
              )}
            />
            <Bar dataKey="sales24" stackId="sales" name="Satış 2024" fill={THEME_COLORS.secondary} radius={[0, 0, 4, 4]} stroke="#fff" strokeWidth={1} />
            <Bar dataKey="sales25" stackId="sales" name="Satış 2025" fill={THEME_COLORS.primary} radius={[4, 4, 0, 0]} stroke="#fff" strokeWidth={1} />

            <Bar dataKey="budget24" stackId="budget" name="Bütçe 2024" fill={THEME_COLORS.secondary} radius={[0, 0, 4, 4]} stroke="#fff" strokeWidth={1}><LabelList dataKey="budget24" content={<CustomBarLabel year="24" />} /></Bar>
            <Bar dataKey="budget25" stackId="budget" name="Bütçe 2025" fill={THEME_COLORS.primary} radius={[4, 4, 0, 0]} stroke="#fff" strokeWidth={1}><LabelList dataKey="budget25" content={<CustomBarLabel year="25" />} /></Bar>

            <Bar dataKey="forecast24" stackId="forecast" name="Tahmini 2024" fill={THEME_COLORS.secondary} radius={[0, 0, 4, 4]} stroke="#fff" strokeWidth={1}><LabelList dataKey="forecast24" content={<CustomBarLabel year="24" />} /></Bar>
            <Bar dataKey="forecast25" stackId="forecast" name="Tahmini 2025" fill={THEME_COLORS.primary} radius={[4, 4, 0, 0]} stroke="#fff" strokeWidth={1}><LabelList dataKey="forecast25" content={<CustomBarLabel year="25" />} /></Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  </div>
);

export default ExecutiveContent;