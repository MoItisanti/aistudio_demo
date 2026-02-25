import React, { useState } from 'react';
import { MONTHS, CHART_PALETTE } from '../data';
import { Settings } from 'lucide-react';
import { SalesCard } from '../components/sales/SummaryCard';
import { SalesDetailTable } from '../components/sales/DetailTable';

// --- Mock Data ---
const SALES_TREND_DATA = MONTHS.map((m, i) => ({
  name: m,
  budget: Math.floor(Math.random() * 200) + 800,
  lastYear: Math.floor(Math.random() * 200) + 700,
  actual: i < 9 ? Math.floor(Math.random() * 250) + 850 : null,
}));

const SALES_SUMMARY = [
  { name: 'Geçen Dönem', value: 10500, fill: CHART_PALETTE[3] },
  { name: 'Bütçe', value: 11800, fill: CHART_PALETTE[4] },
  { name: 'Fiili', value: 11200, fill: CHART_PALETTE[1] },
  { name: 'Tahmini Bitiş', value: 12800, fill: CHART_PALETTE[2] },
];

const SalesContent = () => {
  const [activeTab, setActiveTab] = useState<'daily' | 'monthly' | 'regional'>('daily');

  const renderTabContent = () => {
    if (activeTab === 'daily') {
      return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <SalesCard
            title="Satış Özeti"
            lineData={SALES_TREND_DATA}
            barData={SALES_SUMMARY}
          />
          <SalesDetailTable />
        </div>
      );
    }

    // Placeholders for other tabs
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] bg-theme-card-light dark:bg-theme-card-dark rounded-2xl border border-slate-200 dark:border-slate-700/50">
        <Settings size={48} className="text-theme-text-muted dark:text-theme-secondary/80 mb-4 animate-spin-slow" />
        <h3 className="text-theme-text-muted/80 dark:text-theme-secondary font-semibold uppercase tracking-wider">Analiz Hazırlanıyor</h3>
      </div>
    );
  };

  return (
    <div className="p-6">
      {/* Sub-Navigation Tabs */}
      <div className="flex items-center gap-2 mb-6 overflow-x-auto no-scrollbar pb-2">
        <button
          onClick={() => setActiveTab('daily')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${activeTab === 'daily' ? 'bg-theme-accent text-white shadow-md' : 'bg-theme-card-light dark:bg-theme-card-dark text-theme-text-main/80 dark:text-theme-text-dark-main hover:text-theme-text-main dark:text-theme-text-dark-muted/80 dark:hover:text-gray-200 border border-slate-200 dark:border-slate-700/50'}`}
        >
          Günlük Satış
        </button>
        <button
          onClick={() => setActiveTab('monthly')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${activeTab === 'monthly' ? 'bg-theme-accent text-white shadow-md' : 'bg-theme-card-light dark:bg-theme-card-dark text-theme-text-main/80 dark:text-theme-text-dark-main hover:text-theme-text-main dark:text-theme-text-dark-muted/80 dark:hover:text-gray-200 border border-slate-200 dark:border-slate-700/50'}`}
        >
          Satış Analizi
        </button>
        <button
          onClick={() => setActiveTab('regional')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${activeTab === 'regional' ? 'bg-theme-accent text-white shadow-md' : 'bg-theme-card-light dark:bg-theme-card-dark text-theme-text-main/80 dark:text-theme-text-dark-main hover:text-theme-text-main dark:text-theme-text-dark-muted/80 dark:hover:text-gray-200 border border-slate-200 dark:border-slate-700/50'}`}
        >
          Sayfa 3
        </button>
      </div>

      {renderTabContent()}
    </div>
  );
};

export default SalesContent;