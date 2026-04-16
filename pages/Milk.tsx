import React from 'react';
import { MilkSummaryCard } from '../components/milk/MilkSummaryCard';
import { MilkBarCharts } from '../components/milk/MilkBarCharts';

const MilkContent = () => {
  return (
    <div className="p-6">
      <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
        <MilkSummaryCard />
        <MilkBarCharts />
      </div>
    </div>
  );
};

export default MilkContent;
