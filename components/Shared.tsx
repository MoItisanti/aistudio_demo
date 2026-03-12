import React, { useState, useEffect, useRef } from 'react';
export const CardHeader = ({ title, children }: { title: string, children?: React.ReactNode }) => (
  <div className="bg-gradient-to-r from-theme-primary from-50% to-theme-secondary px-4 py-2.5 flex justify-between items-center w-full relative z-10">
    <h3 className="text-[11px] font-bold text-theme-text-dark-main tracking-wider">{title}</h3>
    <div className="flex items-center gap-2">
      {children}
    </div>
  </div>
);

// --- Logo ---
export const PinarLogo = ({ collapsed }: { collapsed?: boolean }) => (
  <div className="flex justify-center items-center p-2 overflow-hidden">
    <img
      src="/logo2.png"
      alt="Pınar Süt"
      className={`transition-all duration-300 ${collapsed ? 'w-0 opacity-0' : 'w-24 h-12 object-contain'}`}
    />
  </div>
);

// --- Progress Bars ---
export const AnimatedProgressBar = ({ value, color = "bg-theme-secondary", height = "h-2" }: { value: number, color?: string, height?: string }) => {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setWidth(value);
    }, 100);
    return () => clearTimeout(timer);
  }, [value]);

  return (
    <div className={`w-full ${height} bg-theme-bg-light/80 dark:bg-theme-secondary/30 rounded-full overflow-hidden`}>
      <div
        className={`h-full ${color} rounded-full transition-all duration-1000 ease-out`}
        style={{ width: `${width}%` }}
      ></div>
    </div>
  );
};

export const AnimatedTurnoverBar = ({ value }: { value: number }) => {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setWidth(value);
    }, 200);
    return () => clearTimeout(timer);
  }, [value]);

  return (
    <div className="relative h-3 bg-theme-bg-light/80 dark:bg-theme-primary/80 rounded-full flex items-center px-1">
      <div
        className="h-1.5 bg-gradient-to-r from-[#0284C7] to-[#065F46] rounded-full shadow-sm transition-all duration-1000 ease-out"
        style={{ width: `${width}%` }}
      ></div>
      <div
        className="absolute w-3.5 h-3.5 bg-theme-card-light dark:bg-theme-secondary/30 border-2 border-theme-secondary rounded-full shadow-md flex items-center justify-center transition-all duration-1000 ease-out"
        style={{ left: `${width}%`, transform: 'translateX(-50%)' }}
      >
        <div className="w-1 h-1 bg-theme-secondary rounded-full"></div>
      </div>
    </div>
  );
};

// --- Tooltips ---
export const TruncatedTooltip = ({ text, className, tooltipClassName }: { text: string, className?: string, tooltipClassName?: string }) => {
  const [isTooltipVisible, setIsTooltipVisible] = useState(false);
  const textRef = useRef<HTMLSpanElement>(null);

  const handleMouseEnter = () => {
    if (textRef.current && textRef.current.scrollWidth > textRef.current.clientWidth) {
      setIsTooltipVisible(true);
    }
  };

  return (
    <div
      className={`relative group/name flex items-center w-full h-full ${className || ''}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={() => setIsTooltipVisible(false)}
    >
      <span ref={textRef} className="truncate w-full block">{text}</span>
      {isTooltipVisible && (
        <div className={`absolute left-0 top-full mt-1 z-[100] bg-theme-card-light dark:bg-theme-card-dark text-theme-text-main dark:text-theme-text-dark-main text-[10px] px-2.5 py-1.5 rounded-lg shadow-xl border border-slate-200 dark:border-slate-700/50 whitespace-nowrap pointer-events-none ${tooltipClassName || ''}`}>
          {text}
        </div>
      )}
    </div>
  );
};

// --- Charts Helpers ---
export const CustomBarLabel = (props: any) => {
  const { x, y, width, height, value, year, payload } = props;
  if (!payload || value === undefined || value === 0) return null;

  const salesKey = `sales${year}`;
  const salesValue = payload[salesKey];
  if (salesValue === undefined) return null;

  const diff = ((salesValue - value) / value) * 100;
  const label = `${diff > 0 ? '+' : ''}${Math.round(diff)}%`;
  const textColor = year === '24' ? '#ffffff' : '#0F172A';
  if (height < 40) return null;

  return (
    <text
      x={x + width / 2}
      y={y + height / 2}
      fill={textColor}
      textAnchor="middle"
      dominantBaseline="central"
      fontSize={9}
      fontWeight="900"
      style={{ pointerEvents: 'none' }}
    >
      {label}
    </text>
  );
};

export const CustomTooltip = ({ active, payload, label, type }: any) => {
  if (!active || !payload || !payload.length) return null;
  const formatVal = (val: number) => val.toLocaleString('tr-TR');

  // Custom Sankey Tooltip
  if (payload[0]?.payload?.source) {
    const data = payload[0].payload;
    return (
      <div className="bg-theme-card-light dark:bg-theme-card-dark p-3 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700/50">
        <p className="text-[11px] font-semibold text-theme-text-muted dark:text-theme-text-dark-muted mb-1">{data.source.name} → {data.target.name}</p>
        <p className="text-sm font-bold text-theme-text-main dark:text-theme-text-dark-main">{formatVal(data.value)} TL</p>
      </div>
    );
  }
  if (payload[0]?.payload?.name && !payload[0]?.dataKey) { // Sankey Node
    const data = payload[0].payload;
    return (
      <div className="bg-theme-card-light dark:bg-theme-card-dark p-3 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700/50">
        <p className="text-[11px] font-semibold text-theme-text-muted dark:text-theme-text-dark-muted mb-1">{data.name}</p>
        <p className="text-sm font-bold text-theme-text-main dark:text-theme-text-dark-main">{formatVal(data.value)} TL</p>
      </div>
    );
  }

  const renderGrowth = (current: number, prev: number) => {
    if (!prev) return null;
    const diff = ((current - prev) / prev) * 100;
    const isPos = diff > 0;
    const isZero = diff === 0;
    return (
      <span className={`text-[10px] font-bold ml-2 ${isZero ? 'text-theme-text-muted dark:text-theme-text-dark-muted' :
        isPos ? 'text-theme-success' : 'text-theme-danger'}`}>
        {isPos ? '+' : ''}{diff.toFixed(1)}%
      </span>
    );
  };

  if (type === 'bar_single') {
    const item = payload[0];
    const color = item.payload.fill || item.color;
    return (
      <div className="bg-theme-card-light dark:bg-theme-card-dark p-3 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700/50 min-w-[120px]">
        <div className="flex items-center gap-2 mb-1">
          <div className="w-2.5 h-2.5 rounded-full shadow-sm" style={{ backgroundColor: color }}></div>
          <span className="text-[11px] font-bold text-theme-text-muted dark:text-theme-text-dark-muted uppercase tracking-wider">{item.payload.name}</span>
        </div>
        <div className="flex items-baseline gap-1">
          <span className="text-lg font-black text-theme-text-main dark:text-theme-text-dark-main">{formatVal(item.value)}</span>
        </div>
      </div>
    );
  }

  if (type === 'area') {
    const y24 = payload.find((p: any) => p.dataKey === 'y2024');
    const y25 = payload.find((p: any) => p.dataKey === 'y2025');
    return (
      <div className="bg-theme-card-light dark:bg-theme-card-dark p-3.5 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700/50 min-w-[180px]">
        <p className="text-[11px] font-bold text-theme-text-muted dark:text-theme-text-dark-muted mb-2.5 uppercase tracking-wider">{label}</p>
        <div className="space-y-2">
          {y25 && (
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-theme-accent"></span>
                <span className="text-[11px] font-medium text-theme-text-muted dark:text-theme-text-dark-muted">2025 Satış</span>
              </div>
              <span className="text-[11px] font-bold text-theme-text-main dark:text-theme-text-dark-main">{formatVal(y25.value)}</span>
            </div>
          )}
          {y24 && (
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-theme-danger"></span>
                <span className="text-[11px] font-medium text-theme-text-muted dark:text-theme-text-dark-muted">2024 Satış</span>
              </div>
              <span className="text-[11px] font-bold text-theme-text-main dark:text-theme-text-dark-main">{formatVal(y24.value)}</span>
            </div>
          )}
          {y24 && y25 && (
            <div className="mt-2.5 pt-2.5 border-t border-slate-200 dark:border-slate-700/50 flex justify-between items-center">
              <span className="text-[10px] font-semibold text-theme-text-muted">Yıllık Değişim</span>
              {renderGrowth(y25.value, y24.value)}
            </div>
          )}
        </div>
      </div>
    );
  }

  if (type === 'bar') {
    const groups = ['sales', 'budget', 'forecast'];
    const names: Record<string, string> = { sales: 'Satış', budget: 'Bütçe', forecast: 'Tahmin' };
    return (
      <div className="bg-theme-card-light dark:bg-theme-card-dark p-3.5 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700/50 min-w-[200px]">
        <p className="text-[11px] font-bold text-theme-text-muted dark:text-theme-text-dark-muted mb-3 uppercase tracking-wider">{label}</p>
        <div className="space-y-3">
          {groups.map(g => {
            const v24 = payload.find((p: any) => p.dataKey === `${g}24`);
            const v25 = payload.find((p: any) => p.dataKey === `${g}25`);
            if (!v24 && !v25) return null;
            return (
              <div key={g} className="flex flex-col gap-1">
                <div className="flex justify-between items-end">
                  <div className="flex items-center gap-1.5">
                    <div className={`w-2 h-2 rounded-full ${g === 'sales' ? 'bg-theme-primary' : 'bg-gray-300 dark:bg-gray-600'}`}></div>
                    <span className="text-[10px] font-semibold text-theme-text-muted dark:text-theme-text-dark-muted uppercase">{names[g]}</span>
                  </div>
                  {v24 && v25 && renderGrowth(v25.value, v24.value)}
                </div>
                <div className="flex justify-between items-center text-[11px] pl-3.5">
                  <span className="text-theme-text-muted/80">24: <strong className="text-theme-text-main dark:text-theme-text-dark-main">{v24 ? formatVal(v24.value) : '-'}</strong></span>
                  <span className="text-theme-text-muted/80">25: <strong className="text-theme-text-main dark:text-theme-text-dark-main">{v25 ? formatVal(v25.value) : '-'}</strong></span>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    )
  }

  if (type === 'line') {
    const sorted = [...payload].sort((a, b) => b.value - a.value);
    return (
      <div className="bg-theme-card-light dark:bg-theme-card-dark p-3.5 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700/50 min-w-[180px]">
        <p className="text-[11px] font-bold text-theme-text-muted dark:text-theme-text-dark-muted mb-2.5 uppercase tracking-wider">{label}</p>
        <div className="space-y-2">
          {sorted.map((entry: any, i: number) => (
            <div key={i} className="flex justify-between items-center text-[11px]">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: entry.color }}></span>
                <span className="font-medium text-theme-text-muted dark:text-theme-text-dark-muted">
                  {entry.name}
                </span>
              </div>
              <span className="font-bold text-theme-text-main dark:text-gray-200">{formatVal(entry.value)}</span>
            </div>
          ))}
        </div>
      </div>
    );
  }
  return null;
};