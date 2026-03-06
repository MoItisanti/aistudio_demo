import React, { useState } from 'react';
import { Filter, ChevronDown, Maximize2, X } from 'lucide-react';
import { INCOME_STATEMENT_DATA } from '../../data';
import { CardHeader, TruncatedTooltip } from '../Shared';
import { DetailModal } from './DetailModal';

export const IncomeStatementTable = () => {
  const [periodFilter, setPeriodFilter] = useState('2024 - Q3');
  const [channelFilter, setChannelFilter] = useState('Tüm Kanallar');
  const [factoryFilter, setFactoryFilter] = useState('Tüm Fabrikalar');
  const [hierarchyFilter, setHierarchyFilter] = useState('Seviye 1');
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedRow, setSelectedRow] = useState<any>(null);
  const [expandedRows, setExpandedRows] = useState<Record<string, boolean>>({});

  const toggleRow = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    setExpandedRows(prev => ({ ...prev, [id]: !prev[id] }));
  };

  // Pre-process rows for hierarchy
  let currentParentId: string | null = null;
  const processedRows = INCOME_STATEMENT_DATA.map(row => {
    if (row.level === 1) currentParentId = row.id;
    return { ...row, parentId: row.level === 2 ? currentParentId : null };
  });

  const hasChildren = (id: string) => processedRows.some(r => r.parentId === id);

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('tr-TR', { minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(num);
  };

  const formatPercent = (num: number) => {
    if (num === 0) return '-';
    return `${num > 0 ? '+' : ''}${num.toFixed(1)}%`;
  };

  const renderContent = (isModal = false) => (
    <>
      {/* Fixed Header Section (Filters + Column Titles) */}
      <div className={`bg-theme-bg-light/50 dark:bg-theme-bg-dark border-b border-slate-200 dark:border-slate-700/50 z-10 shrink-0 ${isModal ? 'bg-theme-card-light dark:bg-theme-card-dark' : ''}`}>
        {/* Filters Row */}
        <div className="flex items-center gap-2 p-3 border-b border-slate-200 dark:border-slate-700/50/50 overflow-x-auto no-scrollbar">
          <div className="relative shrink-0">
            <button className="flex items-center gap-2 px-3 py-1.5 bg-theme-card-light dark:bg-theme-card-dark/80 text-theme-text-main dark:text-theme-text-dark-main rounded-lg text-[10px] font-semibold border border-slate-200 dark:border-slate-700/50 hover:border-theme-secondary transition-all shadow-sm">
              <Filter size={12} className="text-theme-secondary" /> Dönem: {periodFilter} <ChevronDown size={12} className="opacity-50" />
            </button>
          </div>
          <div className="relative shrink-0">
            <button className="flex items-center gap-2 px-3 py-1.5 bg-theme-card-light dark:bg-theme-card-dark/80 text-theme-text-main dark:text-theme-text-dark-main rounded-lg text-[10px] font-semibold border border-slate-200 dark:border-slate-700/50 hover:border-theme-secondary transition-all shadow-sm">
              Kanal: {channelFilter} <ChevronDown size={12} className="opacity-50" />
            </button>
          </div>
          <div className="relative shrink-0">
            <button className="flex items-center gap-2 px-3 py-1.5 bg-theme-card-light dark:bg-theme-card-dark/80 text-theme-text-main dark:text-theme-text-dark-main rounded-lg text-[10px] font-semibold border border-slate-200 dark:border-slate-700/50 hover:border-theme-secondary transition-all shadow-sm">
              Fabrika: {factoryFilter} <ChevronDown size={12} className="opacity-50" />
            </button>
          </div>
          <div className="relative shrink-0">
            <button className="flex items-center gap-2 px-3 py-1.5 bg-theme-card-light dark:bg-theme-card-dark/80 text-theme-text-main dark:text-theme-text-dark-main rounded-lg text-[10px] font-semibold border border-slate-200 dark:border-slate-700/50 hover:border-theme-secondary transition-all shadow-sm">
              Ana Ürün: {hierarchyFilter} <ChevronDown size={12} className="opacity-50" />
            </button>
          </div>
        </div>

        {/* Column Headers */}
        <div className={`flex gap-1 px-4 py-2 font-black text-theme-text-muted dark:text-theme-dark-muted tracking-wide items-center ${isModal ? 'text-[12px]' : 'text-[10px]'}`}>
          <div className="flex-[1.5] text-left whitespace-normal leading-tight flex items-center pl-5">Finansal Kalem</div>
          <div className="flex-1 text-right whitespace-normal leading-tight flex items-center justify-end">Cari Dönem</div>
          <div className="w-8 md:w-12 text-right whitespace-normal leading-tight flex items-center justify-end">%</div>
          <div className="w-10 md:w-14 text-right whitespace-normal leading-tight flex items-center justify-end">Bütçe %</div>
          <div className="w-10 md:w-14 text-right whitespace-normal leading-tight flex items-center justify-end">Geçen Yıl %</div>
        </div>
      </div>

      {/* Scrollable Body */}
      <div className="flex-1 overflow-y-auto custom-scrollbar bg-theme-card-light dark:bg-theme-card-dark pb-2">
        {processedRows.map((row) => {
          if (row.level === 2 && row.parentId && !expandedRows[row.parentId]) return null;

          const isParent = hasChildren(row.id);
          const isRowExpanded = expandedRows[row.id];

          return (
            <div
              key={row.id}
              onClick={() => setSelectedRow(row)}
              className={`
                flex gap-1 px-4 py-1.5 h-8 items-center border-b border-slate-200 dark:border-slate-700/50 hover:bg-theme-bg-light dark:hover:bg-slate-200/10 transition-colors cursor-pointer group relative hover:z-30
                ${isModal ? 'text-[12px]' : 'text-[10px]'}
                ${row.isHeader
                  ? 'bg-slate-200/30 dark:bg-theme-secondary/30 font-bold text-theme-text-main dark:text-theme-text-dark-main'
                  : 'text-theme-text-main dark:text-theme-text-dark-main'}
              `}
            >
              <div className="flex-[1.5] flex items-center justify-start min-w-0">
                {row.level > 0 && (
                  <div className="w-[20px] shrink-0 flex items-center justify-center">
                    {isParent && (
                      <button
                        onClick={(e) => toggleRow(e, row.id)}
                        className="p-[2px] hover:bg-slate-300 dark:hover:bg-slate-600 rounded text-theme-text-muted dark:text-theme-text-dark-muted transition-colors"
                      >
                        <ChevronDown size={14} className={`transition-transform duration-200 ${!isRowExpanded ? '-rotate-90' : ''}`} />
                      </button>
                    )}
                  </div>
                )}
                <TruncatedTooltip text={row.name} className="text-left flex-1" />
              </div>

              <div className={`flex-1 text-right font-semibold whitespace-nowrap overflow-hidden text-clip ${row.current < 0 ? 'text-theme-text-muted' : ''}`}>
                {formatNumber(row.current)}
              </div>
              <div className="w-8 md:w-12 text-right text-theme-text-muted dark:text-theme-text-dark-muted whitespace-nowrap overflow-hidden text-clip">
                {row.share !== 0 ? Math.abs(row.share).toFixed(1) : '-'}
              </div>
              <div className={`w-10 md:w-14 text-right font-medium whitespace-nowrap overflow-hidden text-clip ${row.budgetVar > 0 ? 'text-theme-success dark:text-theme-success' : row.budgetVar < 0 ? 'text-theme-danger' : 'text-theme-text-muted'}`}>
                {formatPercent(row.budgetVar)}
              </div>
              <div className={`w-10 md:w-14 text-right font-medium whitespace-nowrap overflow-hidden text-clip ${row.yearVar > 0 ? 'text-theme-success dark:text-theme-success' : row.yearVar < 0 ? 'text-theme-danger' : 'text-theme-text-muted'}`}>
                {formatPercent(row.yearVar)}
              </div>
            </div>
          );
        })}
      </div>
    </>
  );

  return (
    <>
      <div className="bg-theme-card-light dark:bg-theme-card-dark rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700/50 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 overflow-hidden flex flex-col h-[480px] relative group">
        <CardHeader title="Gelir Tablosu (Özet)" />
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
              <h2 className="text-sm md:text-lg font-bold text-white uppercase tracking-widest">Gelir Tablosu - Detaylı Analiz</h2>
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

      {selectedRow && <DetailModal row={selectedRow} onClose={() => setSelectedRow(null)} />}
    </>
  );
};