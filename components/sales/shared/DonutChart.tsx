import React, { useState } from 'react';
import { ResponsiveContainer, PieChart, Pie, Cell, Sector } from 'recharts';

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

export const SalesDonutChart = ({ data }: { data: any[] }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const onPieEnter = (_: any, index: number) => {
    setActiveIndex(index);
  };

  const activeItem = (data && data.length > 0 && data[activeIndex]) 
    ? data[activeIndex] 
    : { name: '', value: 0, color: '#e5e7eb' };

  if (!data || data.length === 0) return null;

  return (
    <div className="w-full h-full relative flex flex-col justify-center">
      {/* Chart */}
      <div className="h-44 w-full relative z-10">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={50}
              outerRadius={68}
              dataKey="value"
              onMouseEnter={onPieEnter}
              paddingAngle={3}
              cornerRadius={5}
              stroke="none"
              {...{ activeIndex, activeShape: renderActiveShape } as any}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none transition-all duration-300">
           <span className="text-[10px] font-semibold text-theme-text-muted/80 uppercase tracking-wider">{activeItem.name}</span>
           <span className="text-2xl font-bold text-theme-text-main dark:text-theme-text-dark-main">%{activeItem.value}</span>
        </div>
      </div>

      {/* Legend */}
      <div className="mt-2 flex flex-wrap justify-center gap-2">
        {data.map((item, index) => (
          <div 
             key={item.name || index} 
             className={`flex items-center gap-1.5 px-2 py-1 rounded-full text-[9px] cursor-pointer transition-all duration-200 border ${activeIndex === index ? 'bg-theme-bg-light border-theme-secondary/50 dark:bg-theme-card-light/5 dark:border-white/20 scale-105' : 'border-transparent opacity-60 hover:opacity-100'}`}
             onMouseEnter={() => setActiveIndex(index)}
          >
            <div className="w-2 h-2 rounded-full" style={{backgroundColor: item.color}}></div>
            <span className="font-semibold text-theme-text-main dark:text-theme-text-dark-muted">{item.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
