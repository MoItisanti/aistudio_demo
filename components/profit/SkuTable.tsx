import React, { useState, useMemo } from 'react';
import { ArrowUpDown, ArrowUp, ArrowDown, Maximize2, X } from 'lucide-react';
import { CardHeader, TruncatedTooltip } from '../Shared';

type SortDirection = 'asc' | 'desc';
interface SortConfig {
  key: string;
  direction: SortDirection;
}

export const SkuTable = ({ title, data, valueLabel }: { title: string, data: any[], valueLabel: string }) => {
  const [sortConfig, setSortConfig] = useState<SortConfig | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);

  const handleSort = (key: string) => {
    let direction: SortDirection = 'asc';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const sortedData = useMemo(() => {
    if (!sortConfig) return data;
    return [...data].sort((a: any, b: any) => {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === 'asc' ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === 'asc' ? 1 : -1;
      }
      return 0;
    });
  }, [data, sortConfig]);

  const SortIcon = ({ columnKey }: { columnKey: string }) => {
    if (sortConfig?.key !== columnKey) return <ArrowUpDown size={12} className="opacity-30 ml-1" />;
    return sortConfig.direction === 'asc'
      ? <ArrowUp size={12} className="text-theme-secondary ml-1" />
      : <ArrowDown size={12} className="text-theme-secondary ml-1" />;
  };

  const formatNum = (n: number) => new Intl.NumberFormat('tr-TR').format(n);
  const formatPercent = (n: number) => {
    if (!n) return '-';
    return `${n > 0 ? '+' : ''}${n.toFixed(1)}%`;
  }

  const renderContent = (isModal = false) => (
    <div className="overflow-auto custom-scrollbar flex-1">
      <div className={`w-full h-full flex flex-col ${isModal ? 'min-w-[550px]' : ''}`}>
        {/* Header */}
        <div className={`flex bg-theme-bg-light/50 dark:bg-theme-bg-dark border-b border-slate-200 dark:border-slate-700/50 font-bold text-theme-text-muted dark:text-theme-text-dark-muted tracking-wide shrink-0 select-none sticky top-0 z-30 shadow-sm ${isModal ? 'text-[12px]' : 'text-[10px] 2xl:text-[10px]'}`}>
          <button
            className={`${isModal ? 'w-40 md:w-64' : 'w-24 2xl:w-32'} p-1.5 sticky left-0 z-40 bg-theme-card-light dark:bg-theme-card-dark border-r border-slate-200 dark:border-slate-700/50 shadow-[2px_0_5px_-2px_rgba(0,0,0,0.1)] flex items-center hover:text-theme-text-main dark:hover:text-white transition-colors`}
            onClick={() => handleSort('name')}
          >
            Ürün Tanımı <SortIcon columnKey="name" />
          </button>
          <div className="flex-1 p-1 text-right whitespace-normal leading-tight flex items-center justify-end">Cari Dönem</div>
          <div className="flex-1 p-1 text-right whitespace-normal leading-tight flex items-center justify-end">%</div>
          <div className="flex-1 p-1 text-right whitespace-normal leading-tight flex items-center justify-end">Bütçe %</div>
          <div className="flex-1 p-1 text-right whitespace-normal leading-tight flex items-center justify-end">Geçen Yıl %</div>
          <button
            className="flex-[1.2] p-1 flex items-center justify-end hover:text-theme-text-main dark:hover:text-gray-200 transition-colors whitespace-normal leading-tight text-right"
            onClick={() => handleSort('value')}
          >
            {valueLabel} <SortIcon columnKey="value" />
          </button>
        </div>

        <div className="flex-1">
          {sortedData.map((item) => (
            <div key={item.id} className={`flex border-b border-slate-200 dark:border-slate-700/50 hover:bg-theme-bg-light dark:hover:bg-slate-200/10 transition-colors items-center py-1 h-8 relative hover:z-30 ${isModal ? 'text-[12px]' : 'text-[10px] 2xl:text-[10px]'}`}>
              <div className={`${isModal ? 'w-40 md:w-64' : 'w-24 2xl:w-32'} sticky left-0 z-20 bg-theme-card-light dark:bg-theme-card-dark border-r border-slate-200 dark:border-slate-700/50 shadow-[2px_0_5px_-2px_rgba(0,0,0,0.1)] h-full overflow-visible`}>
                <div className="w-full h-full flex items-center px-1.5 font-bold text-theme-text-main dark:text-theme-text-dark-main">
                  <TruncatedTooltip text={item.name.replace('Pınar ', '')} />
                </div>
              </div>

              <div className="flex-1 px-1 text-right font-semibold text-theme-text-main dark:text-theme-text-dark-main whitespace-nowrap overflow-hidden text-clip">{formatNum(item.current)}</div>
              <div className="flex-1 px-1 text-right text-theme-text-muted whitespace-nowrap overflow-hidden text-clip">{item.share}%</div>

              <div className={`flex-1 px-1.5 text-right font-medium ${item.budgetVar >= 0 ? 'text-theme-success dark:text-theme-success' : 'text-theme-danger'}`}>
                {formatPercent(item.budgetVar)}
              </div>
              <div className={`flex-1 px-1.5 text-right font-medium ${item.yearVar >= 0 ? 'text-theme-success dark:text-theme-success' : 'text-theme-danger'}`}>
                {formatPercent(item.yearVar)}
              </div>

              <div className="flex-[1.2] px-1.5 text-right font-black text-theme-danger">{item.value.toFixed(1)}%</div>
            </div>
          ))}
        </div>
      </div>
    </div >
  );

  return (
    <>
      <div className="bg-theme-card-light dark:bg-theme-card-dark rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700/50 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 overflow-hidden flex flex-col h-[480px] relative group">
        <CardHeader title={title} />
        <button
          onClick={() => setIsExpanded(true)}
          className="absolute top-2.5 right-3 p-1 bg-theme-card-light/10 hover:bg-theme-card-light/20 rounded-lg transition-all duration-300 text-white z-20 opacity-0 group-hover:opacity-100"
          title="Genişlet"
        >
          <Maximize2 size={14} />
        </button>
        {renderContent(false)}
      </div>

      {/* Fullscreen Modal - Compact Desktop View */}
      {isExpanded && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-0 md:p-4 bg-black/70 backdrop-blur-md animate-in fade-in zoom-in-95 duration-300">
          <div className="bg-theme-card-light dark:bg-theme-card-dark w-full h-full md:w-full md:max-w-4xl md:h-[85vh] md:rounded-2xl shadow-2xl flex flex-col overflow-hidden relative mx-auto">
            {/* Header */}
            <div className="bg-gradient-to-r from-theme-primary from-60% to-theme-secondary px-4 py-2.5 md:px-6 md:py-3 flex justify-between items-center shrink-0">
              <h2 className="text-sm md:text-lg font-bold text-white uppercase tracking-widest">{title} - Detaylı Görünüm</h2>
              <button
                onClick={() => setIsExpanded(false)}
                className="p-1.5 md:p-2 bg-theme-card-light/20 hover:bg-theme-card-light/30 rounded-full text-white transition-colors"
              >
                <X size={20} className="md:w-[24px] md:h-[24px]" />
              </button>
            </div>
            <div className="flex-1 flex flex-col min-h-0 bg-theme-card-light dark:bg-theme-card-dark">
              {renderContent(true)}
            </div>
          </div>
        </div>
      )}
    </>
  );
};