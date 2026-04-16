import React, { useState } from 'react';
import { MONTHS, CHART_PALETTE } from '../data';
import { Settings } from 'lucide-react';
import { SalesCard } from '../components/sales/shared/SummaryCard';
import { SalesDetailTable } from '../components/sales/daily/DailySalesTable';
import { MatrixAnalysisChart } from '../components/sales/regional/MatrixAnalysisChart';
import { MonthlySalesTable } from '../components/sales/monthly/MonthlySalesTable';

// --- Mock Data ---
const SALES_TREND_DATA = MONTHS.map((m, i) => ({
  name: m,
  budget: Math.floor(Math.random() * 200) + 800,
  lastYear: Math.floor(Math.random() * 200) + 700,
  actual: i < 9 ? Math.floor(Math.random() * 250) + 850 : null,
}));

const SALES_SUMMARY = [
  { name: 'Geçen Yıl', value: 10500, fill: CHART_PALETTE[3] },
  { name: 'Bütçe', value: 11800, fill: CHART_PALETTE[4] },
  { name: 'Fiili', value: 11200, fill: CHART_PALETTE[1] },
  { name: 'Tahmini Bitiş', value: 12800, fill: CHART_PALETTE[2] },
];

const SALES_SUMMARY_MONTHLY = SALES_SUMMARY.filter(item => item.name !== 'Tahmini Bitiş');

const SalesContent = () => {
  const [activeTab, setActiveTab] = useState<'daily' | 'monthly' | 'regional'>('daily');

  const renderTabContent = () => {
    if (activeTab === 'daily') {
      return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <SalesCard
            title="Günlük Satış Özeti"
            lineData={SALES_TREND_DATA}
            barData={SALES_SUMMARY}
          />
          <SalesDetailTable />
        </div>
      );
    }

    if (activeTab === 'regional') {
      return (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
          <MatrixAnalysisChart />
        </div>
      );
    }

    if (activeTab === 'monthly') {
      return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <SalesCard
            title="Aylık Satış Özeti"
            lineData={SALES_TREND_DATA}
            barData={SALES_SUMMARY_MONTHLY}
            barChartTitle="Karşılaştırma"
          />
          <MonthlySalesTable />
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
      <div className="flex justify-center mb-6">
        <div className="relative inline-flex bg-theme-bg-light/80 dark:bg-black/20 p-1 rounded-full border border-slate-200/50 dark:border-white/5 shadow-sm">
          {/* Animated Sliding Pill */}
          <div
            className="absolute top-1 bottom-1 w-[100px] sm:w-[120px] bg-theme-accent dark:bg-theme-secondary rounded-full shadow-md transition-transform duration-300 ease-in-out"
            style={{
              transform: `translateX(${activeTab === 'daily' ? '0' : activeTab === 'monthly' ? '100%' : '200%'})`
            }}
          />
          <button
            onClick={() => setActiveTab('daily')}
            className={`relative z-10 w-[100px] sm:w-[120px] py-2 rounded-full text-[11px] font-bold transition-colors duration-300 ${activeTab === 'daily'
              ? 'text-theme-text-dark-main dark:text-theme-text-dark-main'
              : 'text-theme-text-muted/80 hover:text-theme-primary dark:hover:text-theme-text-muted'
              }`}
          >
            Günlük Satış
          </button>
          <button
            onClick={() => setActiveTab('monthly')}
            className={`relative z-10 w-[100px] sm:w-[120px] py-2 rounded-full text-[11px] font-bold transition-colors duration-300 ${activeTab === 'monthly'
              ? 'text-theme-text-dark-main dark:text-theme-text-dark-main'
              : 'text-theme-text-muted/80 hover:text-theme-primary dark:hover:text-theme-text-muted'
              }`}
          >
            Satış Analizi
          </button>
          <button
            onClick={() => setActiveTab('regional')}
            className={`relative z-10 w-[100px] sm:w-[120px] py-2 rounded-full text-[11px] font-bold transition-colors duration-300 ${activeTab === 'regional'
              ? 'text-theme-text-dark-main dark:text-theme-text-dark-main'
              : 'text-theme-text-muted/80 hover:text-theme-primary dark:hover:text-theme-text-muted'
              }`}
          >
            Matriks Analizi
          </button>
        </div>
      </div>

      {renderTabContent()}
    </div>
  );
};

export default SalesContent;