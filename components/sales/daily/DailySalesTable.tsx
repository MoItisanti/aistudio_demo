import React, { useState } from 'react';
import { Maximize2, X, FoldHorizontal, UnfoldHorizontal } from 'lucide-react';
import { CardHeader, TruncatedTooltip } from '../../Shared';
import { SALES_DETAIL_TABLE_DATA } from '../../../data';

export const SalesDetailTable = () => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [isCompressed, setIsCompressed] = useState(false);
    const [hoveredCol, setHoveredCol] = useState<number | null>(null);
    const [hoveredRow, setHoveredRow] = useState<number | null>(null);

    const getHeaderProps = (colIdx: number) => ({
        onMouseEnter: () => setHoveredCol(colIdx),
        onMouseLeave: () => setHoveredCol(null),
        className: `flex-1 p-2 text-right h-full flex items-center justify-end px-2 lg:px-3 border-r border-slate-200 dark:border-slate-700/50 transition-colors duration-200 cursor-default ${hoveredCol === colIdx ? 'bg-theme-secondary/5 dark:bg-theme-secondary/30 text-theme-secondary dark:text-theme-accent shadow-[inset_0_-2px_0_0_#3B7D86] dark:shadow-[inset_0_-2px_0_0_#2DD4BF]' : ''}`
    });

    const getCellProps = (colIdx: number, valColorClass: string = '', isRowHovered: boolean = false) => ({
        onMouseEnter: () => setHoveredCol(colIdx),
        onMouseLeave: () => setHoveredCol(null),
        className: `flex-1 px-2 lg:px-3 h-full flex items-center justify-end text-right border-r border-slate-200 dark:border-slate-700/50 transition-all duration-75 cursor-crosshair ${hoveredCol === colIdx ? 'bg-theme-secondary/5 dark:bg-white/5' : ''} ${isRowHovered ? '!bg-theme-secondary/10 dark:!bg-white/10 shadow-[inset_0_0_0_1.5px_#3B7D86] dark:shadow-[inset_0_0_0_1.5px_#2DD4BF] z-20' : ''} hover:!bg-theme-secondary/10 dark:hover:!bg-white/10 hover:shadow-[inset_0_0_0_1.5px_#3B7D86] dark:hover:shadow-[inset_0_0_0_1.5px_#2DD4BF] relative hover:z-30 ${valColorClass}`
    });

    const renderContent = (isModal = false) => (
        <div className="overflow-auto custom-scrollbar flex-1 pb-2">
            {/* Fixed Width Container to enable scrolling */}
            <div className={`${isCompressed ? 'min-w-0 w-full' : 'min-w-[1000px]'} text-[10px] md:text-[11px] ${isModal ? 'w-full' : ''}`}>

                {/* Header */}
                <div className="flex bg-theme-card-light dark:bg-theme-card-dark text-theme-text-muted dark:text-theme-text-dark-muted border-b border-slate-200 dark:border-slate-700/50 font-bold tracking-wider shrink-0 select-none sticky top-0 z-30 h-10 items-center">
                    <div
                        onMouseEnter={() => setHoveredCol(0)}
                        onMouseLeave={() => setHoveredCol(null)}
                        className={`${isCompressed ? 'w-24' : 'w-40'} md:w-64 p-0 sticky left-0 z-40 h-full border-r border-slate-200 dark:border-slate-700/50 bg-theme-card-light dark:bg-theme-card-dark transition-colors duration-200 cursor-default ${hoveredCol === 0 ? 'text-theme-secondary dark:text-theme-accent shadow-[inset_0_-2px_0_0_#3B7D86] dark:shadow-[inset_0_-2px_0_0_#2DD4BF]' : ''}`}
                    >
                        <div className="w-full h-full flex items-center px-1 md:px-3 text-[10px] sm:text-[11px]">
                            Ürün Grubu
                        </div>
                    </div>
                    <div {...getHeaderProps(1)}>Geçen Yıl</div>
                    {!isCompressed && <div {...getHeaderProps(2)}>Geçen Yıl BK</div>}
                    {!isCompressed && <div {...getHeaderProps(3)}>Bütçe</div>}
                    <div {...getHeaderProps(4)}>Gerçekleşen BK</div>
                    <div {...getHeaderProps(5)}>Tahmini Bitiş</div>
                    {!isCompressed && <div {...getHeaderProps(6)}>Geçen Yıl Fark</div>}
                    {!isCompressed && <div {...getHeaderProps(7)}>Bütçe Fark</div>}
                    {!isCompressed && <div {...getHeaderProps(8)}>Bütçe %</div>}
                    <div {...getHeaderProps(9)} className={getHeaderProps(9).className.replace('border-r border-slate-200 dark:border-slate-700/50', '')}>Geçen Yıl %</div>
                </div>

                {/* Body */}
                <div className="bg-theme-card-light">
                    {SALES_DETAIL_TABLE_DATA.map((item, idx) => {
                        // Style Logic
                        const isGroup = (item as any).isGroup;
                        const isTotal = (item as any).isTotal;
                        const isSpecial = isGroup || isTotal;

                        // Row Background Logic (No alternating zebra stripes)
                        let rowBg = 'bg-theme-card-light dark:bg-theme-card-dark text-theme-text-main dark:text-theme-text-dark-main'; // Standard rows
                        if (isGroup) rowBg = 'bg-slate-200 dark:bg-theme-secondary/30 text-theme-text-main dark:text-theme-text-dark-main'; // Group summary (SUT, PEYNIR)
                        if (isTotal) rowBg = 'bg-theme-primary dark:bg-theme-primary/90 text-white'; // Grand Total
                        const hoverBg = isTotal ? '' : 'group-hover/row:bg-theme-secondary/10 dark:group-hover/row:bg-theme-secondary/20';

                        // Text Color Logic
                        const getValColor = (val: number) => {
                            if (isTotal) return 'text-white';
                            if (isGroup) return 'text-theme-text-main dark:text-theme-text-dark-main';
                            return val < 0 ? 'text-theme-danger font-bold' : 'text-theme-success font-bold';
                        };

                        const formatNum = (num: number) => num.toLocaleString('tr-TR');
                        const formatPct = (num: number) => `${num.toLocaleString('tr-TR', { minimumFractionDigits: 1, maximumFractionDigits: 1 })}%`;

                        return (
                            <div key={idx} className={`flex border-b border-slate-200 dark:border-slate-700/50 transition-colors items-center h-8 relative group/row hover:z-30 ${rowBg} ${hoverBg} ${isSpecial ? 'font-bold' : ''}`}>
                                {/* First Column: Sticky Name */}
                                <div
                                    onMouseEnter={() => setHoveredRow(idx)}
                                    onMouseLeave={() => setHoveredRow(null)}
                                    className={`${isCompressed ? 'w-24' : 'w-40'} md:w-64 p-0 sticky left-0 z-20 border-r border-slate-200 dark:border-slate-700/50 h-full overflow-visible transition-colors duration-75 cursor-default ${rowBg} ${hoverBg} ${hoveredRow === idx ? '!shadow-[inset_0_0_0_1000px_rgba(59,125,134,0.2),inset_0_0_0_1.5px_#3B7D86] dark:!shadow-[inset_0_0_0_1000px_rgba(255,255,255,0.2),inset_0_0_0_1.5px_#2DD4BF] z-30' : ''} hover:!shadow-[inset_0_0_0_1000px_rgba(59,125,134,0.2),inset_0_0_0_1.5px_#3B7D86] dark:hover:!shadow-[inset_0_0_0_1000px_rgba(255,255,255,0.2),inset_0_0_0_1.5px_#2DD4BF] relative hover:z-30`}
                                >
                                    <div className="w-full h-full flex items-center px-1 md:px-3 text-[10px] sm:text-[11px]">
                                        <TruncatedTooltip text={item.name} className={`w-full ${isSpecial ? 'text-left uppercase tracking-wide' : 'text-right pr-1 md:pr-2'}`} />
                                    </div>
                                </div>

                                <div {...getCellProps(1, '', hoveredRow === idx)}>{formatNum(item.lastPeriod)}</div>
                                {!isCompressed && <div {...getCellProps(2, '', hoveredRow === idx)}>{formatNum(item.lastPeriodGP)}</div>}
                                {!isCompressed && <div {...getCellProps(3, '', hoveredRow === idx)}>{formatNum(item.budget)}</div>}
                                <div {...getCellProps(4, 'font-extrabold', hoveredRow === idx)}>{formatNum(item.realizedGP)}</div>
                                <div {...getCellProps(5, '', hoveredRow === idx)}>{formatNum(item.forecast)}</div>

                                {!isCompressed && <div {...getCellProps(6, getValColor(item.lyDiff), hoveredRow === idx)}>
                                    {formatNum(item.lyDiff)}
                                </div>}
                                {!isCompressed && <div {...getCellProps(7, getValColor(item.budgetDiff), hoveredRow === idx)}>
                                    {formatNum(item.budgetDiff)}
                                </div>}
                                {!isCompressed && <div {...getCellProps(8, getValColor(item.budgetPct), hoveredRow === idx)}>
                                    {formatPct(item.budgetPct)}
                                </div>}
                                <div {...getCellProps(9, getValColor(item.lyPct), hoveredRow === idx)} className={getCellProps(9, getValColor(item.lyPct), hoveredRow === idx).className.replace('border-r border-slate-200 dark:border-slate-700/50', '')}>
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
                <CardHeader title="Günlük Satış Raporu" />
                <div className="absolute top-2.5 right-3 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 z-20">
                    <button
                        onClick={() => setIsCompressed(!isCompressed)}
                        className="p-1 bg-theme-card-light/10 hover:bg-theme-card-light/20 rounded-lg text-white md:hidden"
                        title={isCompressed ? "Genişlet" : "Daralt"}
                    >
                        {isCompressed ? <UnfoldHorizontal size={14} /> : <FoldHorizontal size={14} />}
                    </button>
                    <button
                        onClick={() => setIsExpanded(true)}
                        className="p-1 bg-theme-card-light/10 hover:bg-theme-card-light/20 rounded-lg text-white"
                        title="Tam Ekran"
                    >
                        <Maximize2 size={14} />
                    </button>
                </div>
                {renderContent()}
            </div>

            {/* Fullscreen Modal */}
            {isExpanded && (
                <div className="fixed inset-0 z-[60] flex items-center justify-center p-0 md:p-4 lg:p-10 bg-black/70 backdrop-blur-md animate-in fade-in zoom-in-95 duration-300">
                    <div className="bg-theme-card-light dark:bg-theme-card-dark w-full h-full md:rounded-2xl shadow-2xl flex flex-col overflow-hidden relative">
                        {/* Header */}
                        <div className="bg-gradient-to-r from-theme-primary from-60% to-theme-secondary px-3 py-2 md:px-4 md:py-2 flex justify-between items-center shrink-0">
                            <h2 className="text-sm md:text-base font-bold text-white uppercase tracking-widest">Günlük Satış Raporu</h2>
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={() => setIsCompressed(!isCompressed)}
                                    className="p-1 md:p-1.5 bg-theme-card-light/20 hover:bg-theme-card-light/30 rounded-full text-white transition-colors md:hidden"
                                >
                                    {isCompressed ? <UnfoldHorizontal size={16} /> : <FoldHorizontal size={16} />}
                                </button>
                                <button
                                    onClick={() => setIsExpanded(false)}
                                    className="p-1 md:p-1.5 bg-theme-card-light/20 hover:bg-theme-card-light/30 rounded-full text-white transition-colors"
                                >
                                    <X size={18} className="md:w-[20px] md:h-[20px]" />
                                </button>
                            </div>
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