import React from 'react';
import { PROFIT_KPI_TRENDS, NEGATIVE_EBITDA_SKUS, NEGATIVE_GROSS_MARGIN_SKUS, NEGATIVE_CONTRIBUTION_SKUS, INCOME_STATEMENT_DATA } from '../data';
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
      pyValue,
      marginPct: item.share
    };
  };

  const ciroData = getData('gross_sales');
  const ebitdaData = getData('ebitda');
  const brutKarData = getData('gross_margin');
  const katkiData = getData('contribution');
  const iadeData = getData('sales_returns');

  return (
    <div className="p-6 space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">

      {/* 1. KPI Cards Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-5">
        <FlipKpiCard
          title="Brüt Satış"
          value={ciroData.value}
          chartData={PROFIT_KPI_TRENDS}
          budgetPct={ciroData.budgetPct}
          yoyPct={ciroData.yoyPct}
          budgetValue={ciroData.budgetValue}
          pyValue={ciroData.pyValue}
          marginPct={ciroData.marginPct}
        />
        <FlipKpiCard
          title="Katkı Payı"
          value={katkiData.value}
          chartData={PROFIT_KPI_TRENDS}
          budgetPct={katkiData.budgetPct}
          yoyPct={katkiData.yoyPct}
          budgetValue={katkiData.budgetValue}
          pyValue={katkiData.pyValue}
          marginPct={katkiData.marginPct}
        />

        <FlipKpiCard
          title="Brüt Satış Kârı"
          value={brutKarData.value}
          chartData={PROFIT_KPI_TRENDS}
          budgetPct={brutKarData.budgetPct}
          yoyPct={brutKarData.yoyPct}
          budgetValue={brutKarData.budgetValue}
          pyValue={brutKarData.pyValue}
          marginPct={brutKarData.marginPct}
        />

        <FlipKpiCard
          title="Ebitda"
          value={ebitdaData.value}
          chartData={PROFIT_KPI_TRENDS}
          budgetPct={ebitdaData.budgetPct}
          yoyPct={ebitdaData.yoyPct}
          budgetValue={ebitdaData.budgetValue}
          pyValue={ebitdaData.pyValue}
          marginPct={ebitdaData.marginPct}
        />

        <FlipKpiCard
          title="İade"
          value={iadeData.value}
          chartData={PROFIT_KPI_TRENDS}
          budgetPct={iadeData.budgetPct}
          yoyPct={iadeData.yoyPct}
          budgetValue={iadeData.budgetValue}
          pyValue={iadeData.pyValue}
          marginPct={iadeData.marginPct}
        />
      </div>

      {/* 2. Main Detail Row: Income Statement + Sankey */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="w-full xl:col-span-1">
          <IncomeStatementTable />
        </div>
        <div className="w-full xl:col-span-2">
          <ProfitSankeyChart darkMode={darkMode} />
        </div>
      </div>

      {/* 3. Bottom Row: 3 SKU Tables */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="w-full">
          <SkuTable
            title="Katkı Payı Negatif Sku'lar"
            data={NEGATIVE_CONTRIBUTION_SKUS}
            valueLabel="Katkı Payı Marjı"
          />
        </div>
        <div className="w-full">
          <SkuTable
            title="Brüt Satış Kârı Negatif Sku'lar"
            data={NEGATIVE_GROSS_MARGIN_SKUS}
            valueLabel="Brüt Kâr Marjı"
          />
        </div>
        <div className="w-full">
          <SkuTable
            title="Ebitda Negatif Sku'lar"
            data={NEGATIVE_EBITDA_SKUS}
            valueLabel="Ebitda Marjı"
          />
        </div>
      </div>
    </div>
  );
};

export default ProfitContent;