import React, { useMemo } from 'react';
import Plot from 'react-plotly.js';

// Dummy data using Product Hierarchy
const PRODUCT_DATA = [
  { name: 'Süt', ebitda: -5000000, ebitdaVar: -12.5, sales: 250000000, color: '#3b82f6' },
  { name: 'Peynir', ebitda: 12000000, ebitdaVar: 18.2, sales: 180000000, color: '#10b981' },
  { name: 'Yoğurt', ebitda: 4500000, ebitdaVar: 5.4, sales: 95000000, color: '#f59e0b' },
  { name: 'Meyve Suyu', ebitda: -1200000, ebitdaVar: 15.0, sales: 55000000, color: '#ec4899' },
  { name: 'Kefir', ebitda: 3000000, ebitdaVar: 25.4, sales: 40000000, color: '#8b5cf6' },
  { name: 'Krema', ebitda: 800000, ebitdaVar: -8.1, sales: 25000000, color: '#64748b' },
  { name: 'Ayran', ebitda: 6000000, ebitdaVar: -2.0, sales: 110000000, color: '#14b8a6' },
  { name: 'Tereyağı', ebitda: 2500000, ebitdaVar: 10.5, sales: 65000000, color: '#f43f5e' },
];

export const MatrixAnalysisChart = () => {

  const { x, y, text, size, color, hovertext } = useMemo(() => {
    // Determine the max boundaries to make the chart equal quadrant
    const _x = [];
    const _y = [];
    const _text = [];
    const _size = [];
    const _color = [];
    const _hover = [];

    PRODUCT_DATA.forEach(d => {
      _x.push(d.ebitda);
      _y.push(d.ebitdaVar);
      _text.push(`<b>${d.name}</b>`);

      // Scaling down sales for bubble size visually (increased size)
      _size.push(Math.sqrt(d.sales) / 40);
      _color.push(d.color);

      _hover.push(
        `<b>${d.name}</b><br>` +
        `Ebitda: ${(d.ebitda / 1000000).toFixed(1)}M ₺<br>` +
        `Değişim: ${d.ebitdaVar > 0 ? '+' : ''}${d.ebitdaVar}%<br>` +
        `Brüt Satış: ${(d.sales / 1000000).toFixed(1)}M ₺`
      );
    });

    return { x: _x, y: _y, text: _text, size: _size, color: _color, hovertext: _hover };
  }, []);

  const maxX = 15000000;
  const maxY = 35;

  return (
    <div className="w-full bg-theme-card-light dark:bg-theme-card-dark rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700/50 flex flex-col transition-all duration-300 relative group animate-in fade-in slide-in-from-bottom-4 h-[650px] overflow-hidden">
      {/* Header */}
      <div className={`p-4 md:p-5 flex items-start justify-between bg-gradient-to-r from-theme-bg-light to-theme-card-light dark:from-theme-card-dark dark:to-theme-bg-dark border-b border-slate-200 dark:border-slate-700/50 rounded-t-2xl shrink-0`}>
        <div>
          <h3 className={`font-bold text-[14px] xl:text-[18px] text-theme-text-main/80 dark:text-theme-text-dark-main/80 tracking-tight`}>
            Kategori Matriks Analizi
          </h3>
          <p className={`text-[10px] xl:text-[12px] text-theme-text-muted mt-1 dark:text-theme-text-dark-muted font-medium`}>
            Kategorilerin Ebitda ve Büyüme düzlemindeki dağılımı (Balon Boyutu: Brüt Satış)
          </p>
        </div>
      </div>

      <div className="flex-1 w-full h-full p-2 relative">
        <Plot
          data={[
            {
              x: x,
              y: y,
              text: text,
              name: 'Kategoriler',
              mode: 'text+markers',
              type: 'scatter',
              textposition: 'top center',
              textfont: {
                family: 'Google Sans',
                size: 11,
                color: '#475569'
              },
              hoverinfo: 'text',
              hovertext: hovertext,
              marker: {
                size: size,
                color: color,
                sizemode: 'area', // Size reflects the exact area
                opacity: 0.8,
                line: {
                  width: 2,
                  color: 'white'
                }
              }
            }
          ]}
          layout={{
            autosize: true,
            margin: { t: 20, r: 20, b: 40, l: 70 },
            paper_bgcolor: 'transparent',
            plot_bgcolor: 'transparent',
            hoverlabel: {
              bgcolor: '#1e293b',
              font: { color: 'white', family: 'Google Sans', size: 13 },
              bordercolor: '#334155'
            },
            xaxis: {
              title: {
                text: 'Ebitda (₺)',
                font: { size: 12, color: '#64748B', weight: 'bold' }
              },
              zeroline: true,
              zerolinewidth: 2,
              zerolinecolor: '#cbd5e1',
              showgrid: false,
              range: [-maxX, maxX],
              tickfont: { color: '#94A3B8' },
              tickformat: '.2s' // Format gracefully
            },
            yaxis: {
              title: {
                text: 'Ebitda Değişimi (%)',
                font: { size: 12, color: '#64748B', weight: 'bold' }
              },
              zeroline: true,
              zerolinewidth: 2,
              zerolinecolor: '#cbd5e1',
              showgrid: false,
              range: [-maxY, maxY],
              tickfont: { color: '#94A3B8' },
              ticksuffix: '%'
            },
            shapes: [
              // Top Right: High Profit, High Growth
              {
                type: 'rect',
                x0: 0, x1: maxX, y0: 0, y1: maxY,
                fillcolor: 'rgba(16, 185, 129, 0.15)',
                line: { width: 0 },
                layer: 'below'
              },
              // Bottom Right: High Profit, Low Growth
              {
                type: 'rect',
                x0: 0, x1: maxX, y0: -maxY, y1: 0,
                fillcolor: 'rgba(59, 130, 246, 0.15)',
                line: { width: 0 },
                layer: 'below'
              },
              // Top Left: Low Profit (Loss), High Growth
              {
                type: 'rect',
                x0: -maxX, x1: 0, y0: 0, y1: maxY,
                fillcolor: 'rgba(245, 158, 11, 0.15)',
                line: { width: 0 },
                layer: 'below'
              },
              // Bottom Left: Low Profit (Loss), Low Growth
              {
                type: 'rect',
                x0: -maxX, x1: 0, y0: -maxY, y1: 0,
                fillcolor: 'rgba(239, 68, 68, 0.15)',
                line: { width: 0 },
                layer: 'below'
              }
            ],
            annotations: [
              {
                x: maxX / 2, y: maxY - 5,
                text: 'I.Bölge<br>(Kârlı Büyüme)',
                showarrow: false,
                font: { size: 12, color: '#10b981', weight: 'bold' },
                opacity: 0.5
              },
              {
                x: maxX / 2, y: -maxY + 5,
                text: 'IV.Bölge<br>(Kâr Var, Büyüme Yok)',
                showarrow: false,
                font: { size: 12, color: '#3b82f6', weight: 'bold' },
                opacity: 0.5
              },
              {
                x: -maxX / 2, y: maxY - 5,
                text: 'II.Bölge<br>(Zarar Var, Büyüme Var)',
                showarrow: false,
                font: { size: 12, color: '#f59e0b', weight: 'bold' },
                opacity: 0.5
              },
              {
                x: -maxX / 2, y: -maxY + 5,
                text: 'III.Bölge<br>(Zarar Var, Büyüme Yok)',
                showarrow: false,
                font: { size: 12, color: '#ef4444', weight: 'bold' },
                opacity: 0.5
              }
            ]
          }}
          useResizeHandler={true}
          style={{ width: '100%', height: '100%' }}
          config={{ displayModeBar: false, responsive: true }}
        />
      </div>
    </div>
  );
};
