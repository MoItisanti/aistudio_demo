import React from 'react';
import { PROFIT_KPI_TRENDS, NEGATIVE_EBITDA_SKUS, NEGATIVE_GROSS_MARGIN_SKUS, INCOME_STATEMENT_DATA } from '../data';
import { FlipKpiCard } from '../components/profit/FlipKpiCard';
import { IncomeStatementTable } from '../components/profit/IncomeTable';
import { SkuTable } from '../components/profit/SkuTable';
import { ProfitSankeyChart } from '../components/profit/SankeyChart';

const ProfitContent = ({ darkMode }: { darkMode: boolean }) => {
  // Helper to get data for Flip Cards
  const getData = (id: string) => {
    const item = INCOME_STATEMENT_DATA.find(x => x.id === id);
    if (!item) return { value: 0, budgetPct: 0, yoyPct: 0, budgetValue: 0, pyValue: 0 };

    // Calculate derived values
    // budgetVar is %, so budgetValue = current / (1 + budgetVar/100)
    // yearVar is %, so pyValue = current / (1 + yearVar/100)
    const budgetValue = item.current / (1 + (item.budgetVar / 100));
    const pyValue = item.current / (1 + (item.yearVar / 100));

    return {
      value: item.current,
      budgetPct: item.budgetVar,
      yoyPct: item.yearVar,
      budgetValue,
      pyValue
    };
  };

  const ciroData = getData('net_sales');
  const ebitdaData = getData('ebitda');
  const katkiData = getData('contribution');
  const iadeData = getData('sales_returns');

  return (
    <div className="p-6 space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">

      {/* 1. KPI Cards Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        <FlipKpiCard
          title="Ciro"
          value={ciroData.value}
          chartData={PROFIT_KPI_TRENDS}
          budgetPct={ciroData.budgetPct}
          yoyPct={ciroData.yoyPct}
          budgetValue={ciroData.budgetValue}
          pyValue={ciroData.pyValue}
        />

        <FlipKpiCard
          title="EBITDA"
          value={ebitdaData.value}
          chartData={PROFIT_KPI_TRENDS}
          budgetPct={ebitdaData.budgetPct}
          yoyPct={ebitdaData.yoyPct}
          budgetValue={ebitdaData.budgetValue}
          pyValue={ebitdaData.pyValue}
        />

        <FlipKpiCard
          title="Katkı Payı"
          value={katkiData.value}
          chartData={PROFIT_KPI_TRENDS}
          budgetPct={katkiData.budgetPct}
          yoyPct={katkiData.yoyPct}
          budgetValue={katkiData.budgetValue}
          pyValue={katkiData.pyValue}
        />

        <FlipKpiCard
          title="İade"
          value={iadeData.value}
          chartData={PROFIT_KPI_TRENDS}
          budgetPct={iadeData.budgetPct}
          yoyPct={iadeData.yoyPct}
          budgetValue={iadeData.budgetValue}
          pyValue={iadeData.pyValue}
        />
      </div>

      {/* 2. Main Detail Row: 3 Columns Side by Side */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Column 1: Income Statement */}
        <div className="w-full">
          <IncomeStatementTable />
        </div>

        {/* Column 2: Negative Gross Margin SKUs */}
        <div className="w-full">
          <SkuTable
            title="Negatif Brüt Kâr SKU'lar"
            data={NEGATIVE_GROSS_MARGIN_SKUS}
            valueLabel="Brüt Kâr Marjı"
          />
        </div>

        {/* Column 3: Negative EBITDA SKUs */}
        <div className="w-full">
          <SkuTable
            title="Negatif EBITDA SKU'lar"
            data={NEGATIVE_EBITDA_SKUS}
            valueLabel="Ebitda Marjı"
          />
        </div>
      </div>

      {/* 3. Bottom Row: Sankey Chart (Full Width) */}
      <div className="w-full">
        <ProfitSankeyChart darkMode={darkMode} />
      </div>
    </div>
  );
};

export default ProfitContent;