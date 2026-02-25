import React, { useState } from 'react';
import { Maximize2, X } from 'lucide-react';
import { CardHeader } from '../Shared';
import { SALES_DETAIL_TABLE_DATA } from '../../data';

export const SalesDetailTable = () => {
    const [isExpanded, setIsExpanded] = useState(false);

    const renderContent = (isModal = false) => (
        <div className={`overflow-auto custom-scrollbar flex-1 ${isModal ? 'p-4' : ''}`}>
            {/* Fixed Width Container to enable scrolling */}
            <div className={`min-w-[1000px] text-[11px] ${isModal ? 'w-full' : ''}`}>

                {/* Header */}
                <div className="flex bg-[#f1f5f9] text-theme-text-muted dark:bg-theme-primary/90 dark:text-theme-text-muted border-b border-theme-secondary/30 dark:border-theme-secondary/60 font-bold tracking-wider shrink-0 select-none sticky top-0 z-30 shadow-sm h-12 items-center">
                    <div className="w-64 p-3 sticky left-0 z-40 bg-[#f1f5f9] dark:bg-theme-primary/90 border-r border-theme-secondary/30 dark:border-theme-secondary/60 shadow-[2px_0_5px_-2px_rgba(0,0,0,0.1)] flex items-center h-full">Ana Ürün Grubu</div>
                    <div className="flex-1 p-2 text-right h-full flex items-center justify-end px-3 border-r border-theme-secondary/30/60 dark:border-theme-secondary/60/60">Geçen Dönem</div>
                    <div className="flex-1 p-2 text-right h-full flex items-center justify-end px-3 border-r border-theme-secondary/30/60 dark:border-theme-secondary/60/60">Geçen Dönem BK</div>
                    <div className="flex-1 p-2 text-right h-full flex items-center justify-end px-3 border-r border-theme-secondary/30/60 dark:border-theme-secondary/60/60">Bütçe</div>
                    <div className="flex-1 p-2 text-right h-full flex items-center justify-end px-3 border-r border-theme-secondary/30/60 dark:border-theme-secondary/60/60">Gerçekleşen BK</div>
                    <div className="flex-1 p-2 text-right h-full flex items-center justify-end px-3 border-r border-theme-secondary/30/60 dark:border-theme-secondary/60/60">Tahmini Bitiş</div>
                    <div className="flex-1 p-2 text-right h-full flex items-center justify-end px-3 border-r border-theme-secondary/30/60 dark:border-theme-secondary/60/60">Geçen Yıl Fark</div>
                    <div className="flex-1 p-2 text-right h-full flex items-center justify-end px-3 border-r border-theme-secondary/30/60 dark:border-theme-secondary/60/60">Bütçe Fark</div>
                    <div className="flex-1 p-2 text-right h-full flex items-center justify-end px-3 border-r border-theme-secondary/30/60 dark:border-theme-secondary/60/60">Bütçe %</div>
                    <div className="flex-1 p-2 text-right h-full flex items-center justify-end px-3">Geçen Yıl %</div>
                </div>

                {/* Body */}
                <div className="bg-theme-card-light">
                    {SALES_DETAIL_TABLE_DATA.map((item, idx) => {
                        // Style Logic
                        const isGroup = (item as any).isGroup;
                        const isTotal = (item as any).isTotal;
                        const isSpecial = isGroup || isTotal;

                        // Row Background Logic (Alternating Blue/Greyish)
                        let rowBg = idx % 2 === 0 ? 'bg-slate-200/40' : 'bg-slate-200/20'; // Standard rows
                        if (isGroup) rowBg = 'bg-theme-secondary/50 text-theme-text-main'; // Group summary (SUT, PEYNIR)
                        if (isTotal) rowBg = 'bg-theme-primary/80 text-white'; // Grand Total

                        // Text Color Logic
                        const getValColor = (val: number) => {
                            if (isTotal) return 'text-white';
                            if (isGroup) return 'text-theme-text-main';
                            return val < 0 ? 'text-theme-danger font-bold' : 'text-theme-success font-bold';
                        };

                        const formatNum = (num: number) => num.toLocaleString('tr-TR');
                        const formatPct = (num: number) => `${num.toLocaleString('tr-TR', { minimumFractionDigits: 1, maximumFractionDigits: 1 })}%`;

                        return (
                            <div key={idx} className={`flex border-b border-theme-secondary/30 hover:brightness-95 transition-all items-center py-1.5 h-8 ${rowBg} ${isSpecial ? 'font-bold' : ''}`}>
                                {/* First Column: Sticky Name */}
                                <div className={`w-64 p-2 px-3 truncate sticky left-0 z-20 border-r border-gray-400/30 shadow-[2px_0_5px_-2px_rgba(0,0,0,0.1)] flex items-center h-full ${rowBg}`}>
                                    {/* Alignment Logic: Groups Left, Items Right */}
                                    <span className={`w-full ${isSpecial ? 'text-left uppercase tracking-wide' : 'text-right pr-2'}`}>
                                        {item.name}
                                    </span>
                                </div>

                                <div className="flex-1 px-3 text-right border-r border-gray-400/20">{formatNum(item.lastPeriod)}</div>
                                <div className="flex-1 px-3 text-right border-r border-gray-400/20">{formatNum(item.lastPeriodGP)}</div>
                                <div className="flex-1 px-3 text-right border-r border-gray-400/20">{formatNum(item.budget)}</div>
                                <div className="flex-1 px-3 text-right border-r border-gray-400/20 font-semibold">{formatNum(item.realizedGP)}</div>
                                <div className="flex-1 px-3 text-right border-r border-gray-400/20">{formatNum(item.forecast)}</div>

                                <div className={`flex-1 px-3 text-right border-r border-gray-400/20 ${getValColor(item.lyDiff)}`}>
                                    {formatNum(item.lyDiff)}
                                </div>
                                <div className={`flex-1 px-3 text-right border-r border-gray-400/20 ${getValColor(item.budgetDiff)}`}>
                                    {formatNum(item.budgetDiff)}
                                </div>
                                <div className={`flex-1 px-3 text-right border-r border-gray-400/20 ${getValColor(item.budgetPct)}`}>
                                    {formatPct(item.budgetPct)}
                                </div>
                                <div className={`flex-1 px-3 text-right ${getValColor(item.lyPct)}`}>
                                    {formatPct(item.lyPct)}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );

    return (
        <>
            <div className="bg-theme-card-light dark:bg-theme-card-dark rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700/50 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 overflow-hidden flex flex-col relative group h-auto max-h-[520px]">
                <CardHeader title="Satış Detay Tablosu" />
                <button
                    onClick={() => setIsExpanded(true)}
                    className="absolute top-2.5 right-3 p-1 bg-theme-card-light/10 hover:bg-theme-card-light/20 rounded-lg transition-all duration-300 text-white z-20 opacity-0 group-hover:opacity-100"
                    title="Genişlet"
                >
                    <Maximize2 size={14} />
                </button>
                {renderContent()}
            </div>

            {/* Fullscreen Modal */}
            {isExpanded && (
                <div className="fixed inset-0 z-[60] flex items-center justify-center p-0 md:p-4 lg:p-10 bg-black/70 backdrop-blur-md animate-in fade-in zoom-in-95 duration-300">
                    <div className="bg-theme-card-light dark:bg-theme-card-dark w-full h-full md:rounded-2xl shadow-2xl flex flex-col overflow-hidden relative">
                        {/* Header */}
                        <div className="bg-gradient-to-r from-theme-primary from-60% to-theme-secondary px-4 py-2.5 md:px-6 md:py-3 flex justify-between items-center shrink-0">
                            <h2 className="text-sm md:text-lg font-bold text-white uppercase tracking-widest">Satış Detay Tablosu - Detaylı Görünüm</h2>
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
    )
}