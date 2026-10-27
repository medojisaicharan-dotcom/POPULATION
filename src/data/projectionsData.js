/**
 * UN DESA World Population Prospects 2024 - Medium Fertility Projections
 * Projection trajectory from 2025 to 2100 by Region and Global Total
 */

export const PROJECTIONS_BY_YEAR = [
  { year: 2024, world: 8162, asia: 4785, africa: 1490, europe: 742, latinAmerica: 665, northAmerica: 382, oceania: 46 },
  { year: 2030, world: 8546, asia: 4947, africa: 1688, europe: 738, latinAmerica: 689, northAmerica: 391, oceania: 48 },
  { year: 2040, world: 9177, asia: 5122, africa: 2062, europe: 724, latinAmerica: 718, northAmerica: 403, oceania: 52 },
  { year: 2050, world: 9709, asia: 5178, africa: 2489, europe: 703, latinAmerica: 731, northAmerica: 412, oceania: 56 },
  { year: 2075, world: 10250, asia: 4920, africa: 3410, europe: 645, latinAmerica: 710, northAmerica: 430, oceania: 63 },
  { year: 2100, world: 10290, asia: 4420, africa: 3920, europe: 590, latinAmerica: 650, northAmerica: 440, oceania: 70 }
];

export const COUNTRY_PROJECTIONS_2050 = [
  { name: "India", current2024: 1442, projected2050: 1670, changePercent: +15.8, status: "Peak around 2064" },
  { name: "China", current2024: 1410, projected2050: 1260, changePercent: -10.6, status: "Declining & Aging" },
  { name: "Nigeria", current2024: 229, projected2050: 377, changePercent: +64.6, status: "Rapid Expansion" },
  { name: "Pakistan", current2024: 245, projected2050: 367, changePercent: +49.8, status: "Rapid Expansion" },
  { name: "United States", current2024: 342, projected2050: 375, changePercent: +9.6, status: "Modest Growth (Migration)" },
  { name: "DR Congo", current2024: 106, projected2050: 218, changePercent: +105.7, status: "More than Doubling" },
  { name: "Indonesia", current2024: 282, projected2050: 317, changePercent: +12.4, status: "Approaching Plateau" },
  { name: "Ethiopia", current2024: 130, projected2050: 213, changePercent: +63.8, status: "High Growth" },
  { name: "Brazil", current2024: 218, projected2050: 231, changePercent: +6.0, status: "Plateau by 2045" },
  { name: "Japan", current2024: 124, projected2050: 104, changePercent: -16.1, status: "Super-aged Society" }
];
