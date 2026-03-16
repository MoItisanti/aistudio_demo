import React, { useEffect, useRef } from 'react';
import Plotly from 'plotly.js-dist-min';
import { SANKEY_DATA } from '../../data';
import { CardHeader } from '../Shared';

const EXPENSE_INDICES = [7, 9, 11, 13];
const PROFIT_INDICES = [10, 12, 14];
const REVENUE_INDICES = [6, 8];

export const ProfitSankeyChart = ({ darkMode }: { darkMode: boolean }) => {
  const plotlyContainerRef = useRef<HTMLDivElement>(null);

  const THEME = {
    GREEN_NODE: '#17ad7bff',
    GREEN_LINK: 'rgba(27, 212, 136, 0.35)',
    RED_NODE: '#EF4444',
    RED_LINK: 'rgba(239, 68, 68, 0.35)',
    GREY_NODE: '#64748B',
    GREY_LIGHT_NODE: '#64748B',
    GREY_LINK: 'rgba(107, 114, 128, 0.35)',
  };

  useEffect(() => {
    if (!plotlyContainerRef.current) return;

    // Use a timeout to ensure the container dimensions are calculated correctly after animation/render
    const timer = setTimeout(() => {
      if (!plotlyContainerRef.current) return;

      const nodePositions = [
        { x: 0.01, y: 0.05 }, { x: 0.01, y: 0.22 }, { x: 0.01, y: 0.40 },
        { x: 0.01, y: 0.58 }, { x: 0.01, y: 0.76 }, { x: 0.01, y: 0.95 },
        { x: 0.25, y: 0.5 }, { x: 0.35, y: 0.85 }, { x: 0.35, y: 0.3 },
        { x: 0.55, y: 0.75 }, { x: 0.55, y: 0.25 }, { x: 0.75, y: 0.65 },
        { x: 0.75, y: 0.15 }, { x: 0.9, y: 0.55 }, { x: 0.99, y: 0.1 },
      ];

      const yoyData: Record<number, string> = {
        0: "17% Y/Y", 1: "-9% Y/Y", 2: "25% Y/Y", 3: "5% Y/Y", 4: "12% Y/Y", 5: "8% Y/Y",
        6: "11% Y/Y", 7: "4% Y/Y", 8: "12% Y/Y", 9: "5% Y/Y", 10: "15% Y/Y",
        11: "7% Y/Y", 12: "25% Y/Y", 13: "2% Y/Y", 14: "25% Y/Y"
      };

      const nodeColors: string[] = [];
      const nodeLabels: string[] = [];

      SANKEY_DATA.nodes.forEach((node, i) => {
        let color = THEME.GREY_LIGHT_NODE;
        if (i === 6) color = THEME.GREY_NODE;
        else if (PROFIT_INDICES.includes(i)) color = THEME.GREEN_NODE;
        else if (EXPENSE_INDICES.includes(i)) color = THEME.RED_NODE;
        else if (REVENUE_INDICES.includes(i) && i !== 6) color = '#6b7280';
        nodeColors.push(color);
        const value = SANKEY_DATA.links.filter(l => l.source === i || l.target === i).reduce((acc, l) => (l.source === i ? acc : acc + l.value), 0);
        nodeLabels.push(`<b>${node.name}</b><br><span style="font-size:11px">${value}M TL</span><br><span style="font-size:9px; opacity:0.8">${yoyData[i] || ''}</span>`);
      });

      const linkColors = SANKEY_DATA.links.map(link => {
        if (EXPENSE_INDICES.includes(link.target)) return THEME.RED_LINK;
        if (PROFIT_INDICES.includes(link.target)) return THEME.GREEN_LINK;
        if (link.target === 8) return 'rgba(107, 114, 128, 0.4)';
        return THEME.GREY_LINK;
      });

      const data: any = [{
        type: "sankey",
        orientation: "h",
        arrangement: "fixed",
        node: {
          pad: 35, // Ürün linklerinin ayrık gözükmesi için artırıldı
          thickness: 25,
          line: { color: "white", width: 1 },
          label: nodeLabels,
          color: nodeColors,
          x: nodePositions.map(p => p.x),
          y: nodePositions.map(p => p.y),
          hoverinfo: 'all',
        },
        link: {
          source: SANKEY_DATA.links.map(l => l.source),
          target: SANKEY_DATA.links.map(l => l.target),
          value: SANKEY_DATA.links.map(l => l.value),
          color: linkColors,
        }
      }];

      const layout: any = {
        font: { family: "Google Sans, sans-serif", size: 11, color: darkMode ? "#fbfcfc" : "#1E293B" },
        autosize: true,
        margin: { t: 20, l: 20, r: 20, b: 20 },
        paper_bgcolor: "transparent",
        plot_bgcolor: "transparent",
        hovermode: 'closest'
      };

      Plotly.newPlot(plotlyContainerRef.current, data, layout, { responsive: true, displayModeBar: false });
    }, 150);

    const handleResize = () => {
      if (plotlyContainerRef.current) {
        Plotly.Plots.resize(plotlyContainerRef.current);
      }
    };
    window.addEventListener('resize', handleResize);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', handleResize);
      if (plotlyContainerRef.current) Plotly.purge(plotlyContainerRef.current);
    };
  }, [darkMode]);

  return (
    <div className="bg-theme-card-light dark:bg-theme-card-dark rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700/50 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 overflow-hidden h-[520px]">
      <CardHeader title="Gelir Tablosu Akışı">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-lg bg-theme-success"></div>
            <span className="text-[9px] font-bold text-white">Kâr Akışı</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-lg bg-theme-danger"></div>
            <span className="text-[9px] font-bold text-white">Gider Akışı</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-lg bg-theme-text-muted"></div>
            <span className="text-[9px] font-bold text-white">Gelir Akışı</span>
          </div>
        </div>
      </CardHeader>
      <div className="p-0 sm:p-5 h-[calc(100%-60px)] w-full overflow-x-auto custom-scrollbar flex items-center">
        <div className="min-w-[800px] md:min-w-full h-full p-5 sm:p-0">
          <div ref={plotlyContainerRef} className="h-full w-full" />
        </div>
      </div>
    </div>
  );
};