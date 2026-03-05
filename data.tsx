
import React from 'react';
import { Target, ShoppingCart, TrendingUp, PieChart, Settings, Users, CalendarRange, Droplet, Truck, ShoppingBag } from 'lucide-react';
import { NavItem } from './types';

// --- Constants (New Palette) ---
export const HOME_PALETTE = ['#003049', '#780000', '#1b8d98', '#1b512d', '#ffb703', '#6b8196'];
export const MARKET_PALETTE = ['#10B981', '#3b82f6', '#ef4444', '#5a189a', '#ffb703', '#475569']; // Pınar Süt (Green), Rakip 1 (Blue), Rakip 2 (Red)
export const CHART_PALETTE = ['#0D4C54', '#3B7D86', '#2DD4BF', '#F59E0B', '#EF4444'];

export const THEME_COLORS = {
  primary: "#0D4C54",      // Deep Corporate Teal (Daha ciddi ve güvenilir)
  secondary: "#3B7D86",    // Muted Teal (Yardımcı elemanlar için)
  accent: "#2DD4BF",       // Modern Teal/Mint (Neon yerine daha dengeli bir vurgu)
  success: "#17ad7bff",    // Emerald Green (Standart kurumsal başarı rengi)
  warning: "#F59E0B",      // Amber
  danger: "#EF4444",       // Rose Red
  info: "#38BDF8",         // Sky Blue (Bilgi için daha ayrıştırıcı)
  background: {
    light: "#F8FAFC",      // Off-White / Slate 50 (Gözü yormayan temiz beyaz)
    dark: "#0F172A"        // Midnight Blue/Slate (Saf siyah yerine derin lacivert-gri)
  },
  card: {
    light: "#FFFFFF",      // Pure White (Gölge ile derinlik verilmeli)
    dark: "#1E293B"        // Slate 800 (Dashboard için standart gece modu kart rengi)
  },
  text: {
    light: {
      primary: "#1E293B",  // Slate 900 (Neredeyse siyah, en yüksek okunabilirlik)
      secondary: "#64748B" // Slate 500 (Açıklama metinleri için gri)
    },
    dark: {
      primary: "#F8FAFC",  // Off-White (Gece modunda parlama yapmayan beyaz)
      secondary: "#94A3B8" // Muted Slate (Gece modunda yardımcı metin)
    }
  },
  chart: CHART_PALETTE
};

export const NAV_ITEMS: NavItem[] = [
  { id: 'executive', label: 'Yönetici Özet', icon: <Target size={22} /> },
  { id: 'sales', label: 'Satış', icon: <ShoppingCart size={22} /> },
  { id: 'profit', label: 'Finans', icon: <TrendingUp size={22} /> },
  { id: 'market', label: 'Pazarlama', icon: <PieChart size={22} /> },
  { id: 'ops', label: 'Operasyon', icon: <Settings size={22} /> },
  { id: 'planning', label: 'Planlama', icon: <CalendarRange size={22} /> },
  { id: 'milk', label: 'Süt Alım', icon: <Droplet size={22} /> },
  { id: 'logistics', label: 'Lojistik', icon: <Truck size={22} /> },
  { id: 'purchasing', label: 'Satınalma', icon: <ShoppingBag size={22} /> },
  { id: 'hr', label: 'İnsan Kaynakları', icon: <Users size={22} /> },
];

export const MONTHS = ['Oca', 'Şub', 'Mar', 'Nis', 'May', 'Haz', 'Tem', 'Ağu', 'Eyl', 'Eki', 'Kas', 'Ara'];

export const PROFIT_PIE_DATA = [
  { name: 'İzmir', value: 45, color: CHART_PALETTE[4] },
  { name: 'Eskişehir', value: 35, color: CHART_PALETTE[1] },
  { name: 'Urfa', value: 20, color: CHART_PALETTE[2] },
];

export const CHANNEL_DIST_DATA = [
  { name: 'Grup içi', value: 45, color: CHART_PALETTE[4] },
  { name: 'İhracat', value: 30, color: CHART_PALETTE[1] },
  { name: 'Direkt', value: 25, color: CHART_PALETTE[0] }, // Using a different color for distinction
];

export const SALES_CHANNEL_DATA = [
  { name: 'Grup içi', value: 45, color: CHART_PALETTE[3] },
  { name: 'İhracat', value: 30, color: CHART_PALETTE[1] },
  { name: 'Direkt', value: 25, color: CHART_PALETTE[4] },
];

export const COMPARISON_DATA = MONTHS.map((month, i) => ({
  name: month,
  sales24: Math.floor(Math.random() * 50) + 100,
  sales25: Math.floor(Math.random() * 60) + 120,
  budget24: Math.floor(Math.random() * 40) + 90,
  budget25: Math.floor(Math.random() * 50) + 110,
  forecast24: Math.floor(Math.random() * 45) + 95,
  forecast25: Math.floor(Math.random() * 55) + 115,
}));

export const TREND_DATA = MONTHS.map((month, i) => ({
  name: month,
  y2024: Math.floor(Math.random() * 1000) + 3000,
  y2025: Math.floor(Math.random() * 1200) + 3500,
}));

export const PROFIT_KPI_TRENDS = MONTHS.map(() => ({
  cy: Math.floor(Math.random() * 500) + 500,
  py: Math.floor(Math.random() * 400) + 400,
  budget: Math.floor(Math.random() * 450) + 450,
}));

const generateMarketData = () => MONTHS.map(m => ({
  name: m,
  comp1: Math.floor(Math.random() * 50) + 50,
  comp2: Math.floor(Math.random() * 50) + 40,
  comp3: Math.floor(Math.random() * 50) + 30,
  comp4: Math.floor(Math.random() * 50) + 20,
  comp5: Math.floor(Math.random() * 50) + 10,
}));

export const MARKET_CHARTS = [
  { title: 'Pazar Payı', data: generateMarketData() },
  { title: 'Endeks', data: generateMarketData() },
  { title: 'Sayısal Dağılım', data: generateMarketData() },
  { title: 'Ağırlıklı Dağıtım', data: generateMarketData() },
  { title: 'Tonaj', data: generateMarketData() },
  { title: 'Arındırılmış Ortalama', data: generateMarketData() },
];

export const BUDGET_DATA = [
  { name: 'Gelir', value: 82, target: '8.4 M', realized: '8.2 M' },
  { name: 'Gider', value: 38, target: '4.0 M', realized: '3.8 M' },
  { name: 'OPEX', value: 16, target: '1.7 M', realized: '1.6 M' },
  { name: 'EBITDA', value: 28, target: '2.8 M', realized: '2.8 M' },
];

export const PYRAMID_DATA = [
  { name: 'A', value: 5, color: CHART_PALETTE[4] },
  { name: 'B', value: 15, color: CHART_PALETTE[1] },
  { name: 'C', value: 20, color: CHART_PALETTE[2] },
  { name: 'D', value: 30, color: CHART_PALETTE[3] },
  { name: 'E', value: 30, color: CHART_PALETTE[0] },
];

export const SANKEY_DATA = {
  nodes: [
    { name: 'Süt' }, // 0
    { name: 'Peynir' }, // 1
    { name: 'Tereyağı' }, // 2
    { name: 'Sos' }, // 3
    { name: 'Meyve Suyu' }, // 4
    { name: 'Yoğurt' }, // 5
    { name: 'Brüt Satış' }, // 6
    { name: 'İade & İskonto' }, // 7 (Expense)
    { name: 'Net Satış' }, // 8
    { name: 'SMM' }, // 9 (Cost)
    { name: 'Brüt Kar' }, // 10
    { name: 'F. Giderleri' }, // 11 (Expense)
    { name: 'Faaliyet Karı' }, // 12
    { name: 'Vergi' }, // 13 (Expense)
    { name: 'Net Kar' }, // 14
  ],
  links: [
    { source: 0, target: 6, value: 300 },
    { source: 1, target: 6, value: 200 },
    { source: 2, target: 6, value: 100 },
    { source: 3, target: 6, value: 50 },
    { source: 4, target: 6, value: 80 },
    { source: 5, target: 6, value: 150 },

    { source: 6, target: 7, value: 80 }, // Cost
    { source: 6, target: 8, value: 800 }, // Net

    { source: 8, target: 9, value: 450 }, // Cost
    { source: 8, target: 10, value: 350 }, // Gross Profit

    { source: 10, target: 11, value: 100 }, // Expense
    { source: 10, target: 12, value: 250 }, // Operating Profit

    { source: 12, target: 13, value: 50 }, // Expense
    { source: 12, target: 14, value: 200 }, // Net Profit
  ],
};

export interface IncomeRow {
  id: string;
  name: string;
  current: number;
  share: number;
  budgetVar: number;
  yearVar: number;
  level: 0 | 1 | 2; // Indentation level
  isHeader?: boolean;
}

export const INCOME_STATEMENT_DATA: IncomeRow[] = [
  { id: 'gross_sales', name: 'BRÜT SATIŞ TUTARI', current: 719502256, share: 122.4, budgetVar: 4.2, yearVar: 12.1, level: 0, isHeader: true },
  { id: 'prod_sales', name: 'Üretimden Satışlar', current: 696380388, share: 123.3, budgetVar: 2.5, yearVar: 8.4, level: 1 },
  { id: 'gross_sales_detail', name: 'Brüt Satış', current: 696898389, share: 123.4, budgetVar: 1.8, yearVar: 7.2, level: 2 },
  { id: 'tender_diff', name: 'İhale Fiyat Farkı (-)', current: -518001, share: 0.1, budgetVar: 0.5, yearVar: 1.2, level: 2 },
  { id: 'other_income', name: 'Diğer Gelirler', current: 23121868, share: 100.0, budgetVar: 6.2, yearVar: 15.1, level: 1 },

  { id: 'sales_returns', name: 'Satış İadeleri', current: -4422593, share: 0.6, budgetVar: -1.2, yearVar: 2.5, level: 0, isHeader: true },
  { id: 'sales_ret_prod', name: 'Üretimden Satışlar', current: -4422593, share: 0.6, budgetVar: -1.2, yearVar: 2.5, level: 1 },
  { id: 'sales_ret_detail', name: 'Satış İadeleri', current: -4422593, share: 0.6, budgetVar: -1.2, yearVar: 2.5, level: 2 },

  { id: 'discounts', name: 'Satış ve Peşinat İskontoları', current: -127115447, share: 17.8, budgetVar: -2.1, yearVar: 0.5, level: 0, isHeader: true },
  { id: 'disc_prod', name: 'Üretimden Satışlar', current: -127115447, share: 18.4, budgetVar: -2.1, yearVar: 0.5, level: 1 },
  { id: 'disc_wholesale', name: 'Toptancı İskontosu', current: -122556750, share: 17.7, budgetVar: -1.8, yearVar: 0.2, level: 2 },
  { id: 'disc_promo', name: 'Promosyon', current: -4543531, share: 0.66, budgetVar: -0.2, yearVar: 0.1, level: 2 },
  { id: 'disc_price_off', name: 'Price Off', current: -4849, share: 0.0, budgetVar: -0.1, yearVar: 0.0, level: 2 },
  { id: 'disc_other', name: 'Diğer İskontolar', current: -10318, share: 0.0, budgetVar: 0.0, yearVar: 0.2, level: 2 },

  { id: 'net_sales', name: 'NET SATIŞ TUTARI', current: 587964216, share: 100.0, budgetVar: 5.1, yearVar: 14.5, level: 0, isHeader: true },

  { id: 'cogs', name: 'Satışların Maliyeti (COGS)', current: -516755706, share: 87.9, budgetVar: -4.5, yearVar: -10.2, level: 0, isHeader: true },
  { id: 'cogs_raw', name: 'Hammadde Giderleri', current: -290784663, share: 51.5, budgetVar: -2.1, yearVar: -5.4, level: 1 },
  { id: 'cogs_aux', name: 'Yardımcı Malzeme Giderleri', current: -17020042, share: 3.0, budgetVar: -0.5, yearVar: -1.2, level: 1 },
  { id: 'cogs_pkg', name: 'Ambalaj Giderleri', current: -70314009, share: 12.4, budgetVar: -1.1, yearVar: -2.0, level: 1 },
  { id: 'cogs_var_prod', name: 'Değişken Üretim Gideri', current: -28888445, share: 5.1, budgetVar: -0.4, yearVar: -0.8, level: 1 },
  { id: 'cogs_fixed_prod', name: 'Sabit Üretim Gideri', current: -109748547, share: 19.4, budgetVar: 0.2, yearVar: 0.5, level: 1 },
  { id: 'cogs_dir_labor', name: 'Direkt İşçilik Giderleri', current: -55875321, share: 9.9, budgetVar: -0.5, yearVar: -1.6, level: 1 },
  { id: 'cogs_indir_labor', name: 'Endirekt İşçilik Giderleri', current: -18968205, share: 3.4, budgetVar: 0.1, yearVar: -0.3, level: 1 },
  { id: 'cogs_machine', name: 'Makina Giderleri', current: -11603799, share: 2.1, budgetVar: 0.0, yearVar: -0.2, level: 1 },
  { id: 'cogs_deprec', name: 'Amortisman Giderleri', current: -13917604, share: 2.5, budgetVar: 0.0, yearVar: 0.1, level: 1 },
  { id: 'cogs_other_prod', name: 'Diğer Genel Üretim Giderleri', current: -9383619, share: 1.7, budgetVar: -0.2, yearVar: 0.7, level: 1 },

  { id: 'gross_margin', name: 'BRÜT SATIŞ KARI veya ZARARI', current: 71208509, share: 12.6, budgetVar: 8.2, yearVar: 25.4, level: 0, isHeader: true },

  { id: 'rnd', name: 'Ar-Ge Giderleri', current: -7148500, share: 1.3, budgetVar: -0.5, yearVar: 0.2, level: 0, isHeader: true },

  { id: 'marketing_sales_dist', name: 'Pazarlama, Satış ve Dağıtım Giderleri', current: -36711502, share: 6.5, budgetVar: -1.2, yearVar: -3.4, level: 0, isHeader: true },
  { id: 'msd_storage', name: 'Depolama Gideri', current: -12398062, share: 2.2, budgetVar: -0.4, yearVar: -0.8, level: 1 },
  { id: 'msd_dispatch', name: 'Sevkiyat Gideri', current: -3153473, share: 0.6, budgetVar: -0.1, yearVar: -0.5, level: 1 },
  { id: 'msd_freight', name: 'Nakliye Gideri', current: -2073278, share: 0.4, budgetVar: 0.0, yearVar: -0.2, level: 1 },
  { id: 'msd_export', name: 'İhracat Gideri', current: -6186812, share: 1.1, budgetVar: -0.2, yearVar: -1.1, level: 1 },
  { id: 'msd_other', name: 'Diğer Satış Gideri', current: -10190340, share: 1.8, budgetVar: -0.3, yearVar: -0.6, level: 1 },
  { id: 'msd_marketing', name: 'Pazarlama Harcamaları', current: -2709538, share: 0.5, budgetVar: -0.2, yearVar: -0.2, level: 1 },
  { id: 'msd_mk_direct', name: 'Doğrudan Pazarlama', current: -843216, share: 0.1, budgetVar: -0.1, yearVar: 0.0, level: 2 },
  { id: 'msd_mk_edt', name: 'EDT Pazarlama', current: -286654, share: 0.1, budgetVar: 0.0, yearVar: 0.1, level: 2 },
  { id: 'msd_mk_trade', name: 'Ticari Pazarlama', current: -76372, share: 0.0, budgetVar: 0.0, yearVar: 0.0, level: 2 },
  { id: 'msd_mk_export', name: 'İhracat Pazarlama', current: -1454372, share: 0.3, budgetVar: -0.1, yearVar: -0.3, level: 2 },
  { id: 'msd_mk_corp', name: 'Kurumsal İletişim Pazarlama', current: -48924, share: 0.0, budgetVar: 0.0, yearVar: 0.0, level: 2 },

  { id: 'gen_admin', name: 'Genel Yönetim Giderleri', current: -28776520, share: 5.1, budgetVar: -1.5, yearVar: -2.8, level: 0, isHeader: true },

  { id: 'operating_expenses', name: 'Faaliyet Giderleri', current: -72636522, share: 12.9, budgetVar: -3.2, yearVar: -6.0, level: 0, isHeader: true },

  { id: 'ebit', name: 'EBIT', current: -1428013, share: -0.3, budgetVar: -1.5, yearVar: -2.1, level: 0, isHeader: true },

  { id: 'ebitda', name: 'EBITDA', current: 17588926, share: 3.1, budgetVar: 5.0, yearVar: 19.4, level: 0, isHeader: true },

  { id: 'contribution', name: 'KATKI PAYI', current: 176192916, share: 31.2, budgetVar: 10.4, yearVar: 35.8, level: 0, isHeader: true },
];

// Enhanced SKU Data for Profit Table
export const NEGATIVE_EBITDA_SKUS = [
  { id: 1, no: '201045', name: 'Pınar Süt 1L Yarım Yağlı', current: 12500, share: 12.1, budgetVar: -5.2, yearVar: -2.1, value: -4.2 },
  { id: 2, no: '202301', name: 'Pınar Labne 200g', current: 8400, share: 8.5, budgetVar: -3.4, yearVar: 1.5, value: -2.8 },
  { id: 3, no: '204512', name: 'Pınar Beyaz 400g', current: 15600, share: 15.2, budgetVar: -1.2, yearVar: -0.5, value: -1.5 },
  { id: 4, no: '205678', name: 'Pınar Çocuk Devam Sütü 500ml', current: 4200, share: 4.1, budgetVar: -8.5, yearVar: -10.2, value: -5.1 },
  { id: 5, no: '208901', name: 'Pınar Kido Çilekli 180ml', current: 6700, share: 6.8, budgetVar: -4.1, yearVar: -3.8, value: -3.4 },
  { id: 6, no: '209102', name: 'Pınar Kahvaltı Keyfi 500g', current: 5200, share: 5.1, budgetVar: -2.1, yearVar: -1.8, value: -1.2 },
  { id: 7, no: '201055', name: 'Pınar Süt 500ml Light', current: 3100, share: 3.0, budgetVar: -6.5, yearVar: -4.2, value: -6.1 },
  { id: 8, no: '302211', name: 'Pınar Yoğurt Kaymaklı 1500g', current: 9800, share: 9.9, budgetVar: -1.1, yearVar: 0.8, value: -0.5 },
  { id: 9, no: '405521', name: 'Pınar Tost Peyniri 400g', current: 4500, share: 4.5, budgetVar: -3.3, yearVar: -2.5, value: -2.9 },
  { id: 10, no: '501001', name: 'Pınar Krema 200ml', current: 2200, share: 2.2, budgetVar: -0.5, yearVar: -1.0, value: -0.8 },
];

export const NEGATIVE_GROSS_MARGIN_SKUS = [
  { id: 1, no: '201045', name: 'Pınar Süt 1L Yarım Yağlı', current: 12500, share: 12.1, budgetVar: -12.5, yearVar: -8.4, value: -8.5 },
  { id: 2, no: '202301', name: 'Pınar Labne 200g', current: 8400, share: 8.5, budgetVar: -6.2, yearVar: -2.1, value: -5.2 },
  { id: 3, no: '301244', name: 'Pınar Organik Yoğurt 750g', current: 3100, share: 3.2, budgetVar: -2.4, yearVar: 0.5, value: -2.1 },
  { id: 4, no: '305622', name: 'Pınar Denge Laktozsuz 1L', current: 2800, share: 2.9, budgetVar: -5.5, yearVar: -1.2, value: -4.8 },
  { id: 5, no: '401123', name: 'Pınar Gurme Cheddar 200g', current: 1900, share: 1.8, budgetVar: -1.8, yearVar: -0.9, value: -1.9 },
  { id: 6, no: '308901', name: 'Pınar Ayran 1.5L', current: 5400, share: 5.2, budgetVar: -1.5, yearVar: -0.3, value: -0.9 },
  { id: 7, no: '207812', name: 'Pınar Labne 400g', current: 3600, share: 3.5, budgetVar: -4.1, yearVar: -2.2, value: -3.8 },
  { id: 8, no: '209933', name: 'Pınar Beyaz 200g', current: 2100, share: 2.0, budgetVar: -2.9, yearVar: -1.5, value: -1.8 },
  { id: 9, no: '505511', name: 'Pınar Sos Barbecue 350g', current: 1100, share: 1.1, budgetVar: -8.5, yearVar: -6.0, value: -7.5 },
  { id: 10, no: '404412', name: 'Pınar Dilimli Burger Peyniri', current: 1500, share: 1.4, budgetVar: -5.5, yearVar: -3.4, value: -4.2 },
];

// Hierarchy Data for Header Filter
export const HIERARCHY_DATA = [
  {
    id: 'yogurt',
    label: 'Yoğurt',
    children: [
      {
        id: 'yogurt_spec',
        label: 'Yoğurt Özellikli',
        children: [
          {
            id: 'lactose_free',
            label: 'Yoğurt Laktozsuz',
            children: [
              { id: 'lf_4x125', label: 'Yoğurt Laktozsuz 4x125gr' },
              { id: 'lf_750', label: 'Yoğurt Laktozsuz 750gr' }
            ]
          },
          { id: 'organic', label: 'Yoğurt Organik' },
          { id: 'probiotic', label: 'Yoğurt Probiyotik' }
        ]
      },
      {
        id: 'yogurt_plain',
        label: 'Yoğurt Sade',
        children: [
          { id: 'homogenized', label: 'Homojenize' },
          { id: 'cream', label: 'Kaymaklı' }
        ]
      }
    ]
  },
  {
    id: 'milk',
    label: 'Süt',
    children: [
      { id: 'uht', label: 'UHT Süt' },
      { id: 'pasteurized', label: 'Pastörize Süt' }
    ]
  }
];

// Updated Sales Detail Table Data from Image
export const SALES_DETAIL_TABLE_DATA = [
  { name: 'SUT LIGHT', lastPeriod: 71, lastPeriodGP: 71, budget: 72, realizedGP: 19, forecast: 19, lyDiff: -53, budgetDiff: -54, budgetPct: -74.1, lyPct: -73.9 },
  { name: 'SUT ORGANIK', lastPeriod: 217, lastPeriodGP: 217, budget: 204, realizedGP: 250, forecast: 250, lyDiff: 33, budgetDiff: 46, budgetPct: 22.4, lyPct: 15.3 },
  { name: 'SUT AROMALI', lastPeriod: 2620, lastPeriodGP: 2620, budget: 2845, realizedGP: 2038, forecast: 2038, lyDiff: -582, budgetDiff: -807, budgetPct: -28.4, lyPct: -22.2 },
  { name: 'SUT COCUK', lastPeriod: 598, lastPeriodGP: 598, budget: 525, realizedGP: 430, forecast: 430, lyDiff: -167, budgetDiff: -95, budgetPct: -18.0, lyPct: -28.0 },
  { name: 'SUT DENGE', lastPeriod: 1437, lastPeriodGP: 1437, budget: 1295, realizedGP: 1199, forecast: 1199, lyDiff: -238, budgetDiff: -96, budgetPct: -7.4, lyPct: -16.6 },
  { name: 'SUT PROTEIN', lastPeriod: 587, lastPeriodGP: 587, budget: 615, realizedGP: 790, forecast: 790, lyDiff: 203, budgetDiff: 175, budgetPct: 28.4, lyPct: 34.5 },
  { name: 'SUT', lastPeriod: 19164, lastPeriodGP: 19164, budget: 18025, realizedGP: 14589, forecast: 14589, lyDiff: -4575, budgetDiff: -3436, budgetPct: -19.1, lyPct: -23.9, isGroup: true },
  { name: 'AYRAN', lastPeriod: 459, lastPeriodGP: 459, budget: 748, realizedGP: 731, forecast: 731, lyDiff: 272, budgetDiff: -16, budgetPct: -2.2, lyPct: 59.2 },
  { name: 'KEFIR', lastPeriod: 37, lastPeriodGP: 37, budget: 35, realizedGP: 166, forecast: 166, lyDiff: 128, budgetDiff: 131, budgetPct: 374.0, lyPct: 344.7 },
  { name: 'YOGURT', lastPeriod: 870, lastPeriodGP: 870, budget: 896, realizedGP: 745, forecast: 745, lyDiff: -125, budgetDiff: -151, budgetPct: -16.8, lyPct: -14.4 },
  { name: 'TEREYAGI', lastPeriod: 295, lastPeriodGP: 295, budget: 240, realizedGP: 149, forecast: 149, lyDiff: -146, budgetDiff: -91, budgetPct: -38.0, lyPct: -49.5 },
  { name: 'PEYNIR BEYAZ', lastPeriod: 131, lastPeriodGP: 131, budget: 140, realizedGP: 101, forecast: 101, lyDiff: -31, budgetDiff: -40, budgetPct: -28.4, lyPct: -23.4 },
  { name: 'PEYNIR KASAR', lastPeriod: 69, lastPeriodGP: 69, budget: 112, realizedGP: 61, forecast: 61, lyDiff: -8, budgetDiff: -50, budgetPct: -44.9, lyPct: -10.9 },
  { name: 'PEYNIR SUZME', lastPeriod: 1166, lastPeriodGP: 1166, budget: 1273, realizedGP: 838, forecast: 838, lyDiff: -329, budgetDiff: -435, budgetPct: -34.2, lyPct: -28.2 },
  { name: 'PEYNIR GELENEKSEL', lastPeriod: 1366, lastPeriodGP: 1366, budget: 1525, realizedGP: 1000, forecast: 1000, lyDiff: -367, budgetDiff: -525, budgetPct: -34.5, lyPct: -26.8 },
  { name: 'PEYNIR PINAR BEYAZ', lastPeriod: 197, lastPeriodGP: 197, budget: 266, realizedGP: 223, forecast: 223, lyDiff: 25, budgetDiff: 43, budgetPct: -16.3, lyPct: 12.8 },
  { name: 'PEYNIR LABNE', lastPeriod: 516, lastPeriodGP: 516, budget: 817, realizedGP: 706, forecast: 706, lyDiff: 190, budgetDiff: -110, budgetPct: -13.5, lyPct: 36.8 },
  { name: 'PEYNIR KREM', lastPeriod: 61, lastPeriodGP: 61, budget: 69, realizedGP: 51, forecast: 51, lyDiff: -10, budgetDiff: -18, budgetPct: -25.6, lyPct: -16.9 },
  { name: 'PEYNIR UCGEN', lastPeriod: 37, lastPeriodGP: 37, budget: 38, realizedGP: 27, forecast: 27, lyDiff: -10, budgetDiff: -11, budgetPct: -29.4, lyPct: -26.5 },
  { name: 'PEYNIR SURULEBILIR', lastPeriod: 812, lastPeriodGP: 812, budget: 1190, realizedGP: 1007, forecast: 1007, lyDiff: 195, budgetDiff: -183, budgetPct: -15.4, lyPct: 24.1 },
  { name: 'PEYNIR DILIMLI', lastPeriod: 140, lastPeriodGP: 140, budget: 110, realizedGP: 80, forecast: 80, lyDiff: -61, budgetDiff: -31, budgetPct: -28.0, lyPct: -43.3 },
  { name: 'PEYNIR KEYIF', lastPeriod: 11, lastPeriodGP: 11, budget: 15, realizedGP: 13, forecast: 13, lyDiff: 2, budgetDiff: -3, budgetPct: -16.1, lyPct: 18.4 },
  { name: 'PEYNIR', lastPeriod: 2329, lastPeriodGP: 2329, budget: 2841, realizedGP: 2099, forecast: 2099, lyDiff: -230, budgetDiff: -742, budgetPct: -26.1, lyPct: -9.9, isGroup: true },
  { name: 'MEYVE SULARI', lastPeriod: 1087, lastPeriodGP: 1087, budget: 1316, realizedGP: 1132, forecast: 1132, lyDiff: 44, budgetDiff: -184, budgetPct: -14.0, lyPct: 4.1 },
  { name: 'SOSLAR', lastPeriod: 430, lastPeriodGP: 430, budget: 563, realizedGP: 507, forecast: 507, lyDiff: 77, budgetDiff: -56, budgetPct: -9.9, lyPct: 17.9 },
  { name: 'KREMA', lastPeriod: 153, lastPeriodGP: 153, budget: 198, realizedGP: 165, forecast: 165, lyDiff: 12, budgetDiff: -32, budgetPct: -16.4, lyPct: 8.1 },
  { name: 'DIGER SUT FBR.URUNLERI', lastPeriod: 46, lastPeriodGP: 46, budget: 181, realizedGP: 199, forecast: 199, lyDiff: 153, budgetDiff: 18, budgetPct: 10.2, lyPct: 330.7 },
  { name: 'TOPLAM', lastPeriod: 24871, lastPeriodGP: 24871, budget: 25041, realizedGP: 20481, forecast: 20481, lyDiff: -4390, budgetDiff: -4560, budgetPct: -18.2, lyPct: -17.6, isTotal: true },
];
