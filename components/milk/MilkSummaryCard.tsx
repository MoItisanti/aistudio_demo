import React from 'react';
import { MONTHS, CHART_PALETTE, FACTORY_DIST_DATA } from '../../data';
import { SalesCard } from '../sales/shared/SummaryCard';

// --- Mock Data ---
const MILK_TREND_DATA = MONTHS.map((m, i) => ({
  name: m,
  budget: Math.floor(Math.random() * 100) + 300,
  lastYear: Math.floor(Math.random() * 100) + 250,
  actual: i < 9 ? Math.floor(Math.random() * 120) + 280 : null,
}));

const MILK_SUMMARY = [
  { name: 'Geçen Yıl', value: 3500, fill: CHART_PALETTE[3] },
  { name: 'Bütçe', value: 4200, fill: CHART_PALETTE[4] },
  { name: 'Fiili', value: 3900, fill: CHART_PALETTE[1] },
  { name: 'Tahmini Bitiş', value: 4500, fill: CHART_PALETTE[2] },
];

export const MilkSummaryCard = () => {
  return (
    <SalesCard
      title="Süt Alım Özeti-Ton"
      lineData={MILK_TREND_DATA}
      barData={MILK_SUMMARY}
      donutTitle="Fabrika Dağılımı"
      donutData={FACTORY_DIST_DATA}
    />
  );
};
