import React, { useState } from 'react';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  BarChart, Bar, AreaChart, Area
} from 'recharts';
import { 
  Scale, 
  TrendingUp, 
  Compass, 
  Clock, 
  Sparkles, 
  ArrowRight, 
  Check, 
  X,
  Plus,
  AlertCircle
} from 'lucide-react';
import { COUNTRIES_DATA } from '../data/worldPopulationData';
import { PROJECTIONS_BY_YEAR, COUNTRY_PROJECTIONS_2050 } from '../data/projectionsData';

export const PopulationAnalytics = ({ comparisonList = [], onRemoveCompare, onAddCompare }) => {
  const [activeSubTab, setActiveSubTab] = useState('compare'); // 'compare' | 'density' | 'projections'
  const [selectedCountryToAdd, setSelectedCountryToAdd] = useState('');

  // Default comparison if empty
  const defaultSelectedCodes = ['IND', 'CHN', 'USA'];
  const displayComparison = comparisonList.length > 0 
    ? comparisonList 
    : COUNTRIES_DATA.filter(c => defaultSelectedCodes.includes(c.id));

  // Build historical comparison dataset
  const years = [1960, 1980, 2000, 2020, 2024];
  const chartColors = ['#6366f1', '#10b981', '#f59e0b', '#ec4899', '#06b6d4'];

  const historicalChartData = years.map(yr => {
    const entry = { year: yr };
    displayComparison.forEach(c => {
      const match = c.historical?.find(h => h.year === yr);
      if (match) {
        entry[c.name] = Number((match.population / 1000000).toFixed(1));
      }
    });
    return entry;
  });

  // Top 5 densest vs Top 5 sparsest
  const densestCountries = [...COUNTRIES_DATA]
    .sort((a, b) => b.density - a.density)
    .slice(0, 6);

  const sparsestCountries = [...COUNTRIES_DATA]
    .sort((a, b) => a.density - b.density)
    .slice(0, 6);

  const handleAddCountry = () => {
    if (!selectedCountryToAdd) return;
    const found = COUNTRIES_DATA.find(c => c.name === selectedCountryToAdd);
    if (found && !displayComparison.find(c => c.id === found.id)) {
      if (onAddCompare) {
        onAddCompare(found);
      }
      setSelectedCountryToAdd('');
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Sub-navigation Tabs */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-2 rounded-2xl bg-slate-900/80 border border-slate-800">
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => setActiveSubTab('compare')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
              activeSubTab === 'compare'
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/20'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
            }`}
          >
            <Scale className="w-4 h-4" />
            Country Comparison Tool
          </button>

          <button
            onClick={() => setActiveSubTab('density')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
              activeSubTab === 'density'
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/20'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
            }`}
          >
            <Compass className="w-4 h-4" />
            Density Extremes & Distribution
          </button>

          <button
            onClick={() => setActiveSubTab('projections')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
              activeSubTab === 'projections'
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/20'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
            }`}
          >
            <TrendingUp className="w-4 h-4" />
            UN Projections (2025–2100)
          </button>
        </div>

        <span className="text-xs text-slate-400 px-3 hidden sm:inline">
          UN DESA 2024 & World Bank Analytics Engine
        </span>
      </div>

      {/* SUBTAB 1: SIDE-BY-SIDE COUNTRY COMPARISON */}
      {activeSubTab === 'compare' && (
        <div className="space-y-6">
          
          {/* Comparison Selector Card */}
          <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-xl space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h2 className="text-base font-bold text-white flex items-center gap-2">
                  <Scale className="w-4 h-4 text-indigo-400" />
                  Side-by-Side Demographic Comparison
                </h2>
                <p className="text-xs text-slate-400">
                  Select up to 4 countries to analyze demographic divergence and historical patterns
                </p>
              </div>

              {/* Add Country Dropdown */}
              <div className="flex items-center gap-2">
                <select
                  value={selectedCountryToAdd}
                  onChange={(e) => setSelectedCountryToAdd(e.target.value)}
                  className="px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white focus:outline-none focus:border-indigo-500"
                >
                  <option value="">+ Add a country to compare...</option>
                  {COUNTRIES_DATA.filter(c => !displayComparison.find(dc => dc.id === c.id)).map(c => (
                    <option key={c.id} value={c.name} className="bg-slate-900">
                      {c.flag} {c.name}
                    </option>
                  ))}
                </select>
                <button
                  onClick={handleAddCountry}
                  disabled={!selectedCountryToAdd}
                  className="px-3 py-1.5 rounded-xl bg-indigo-600 disabled:opacity-50 text-white text-xs font-semibold hover:bg-indigo-500 transition-colors"
                >
                  Add
                </button>
              </div>
            </div>

            {/* Selected Pills */}
            <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-800">
              <span className="text-xs text-slate-500">Comparing:</span>
              {displayComparison.map((c, i) => (
                <div 
                  key={c.id} 
                  className="flex items-center gap-2 px-3 py-1 rounded-full bg-slate-950 border border-slate-800 text-xs text-white"
                >
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: chartColors[i % chartColors.length] }} />
                  <span>{c.flag} {c.name}</span>
                  {displayComparison.length > 2 && onRemoveCompare && (
                    <button 
                      onClick={() => onRemoveCompare(c.id)}
                      className="text-slate-500 hover:text-rose-400"
                      title="Remove from comparison"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  )}
                </div>
              ))}
            </div>

          </div>

          {/* Historical Growth Trajectory Chart */}
          <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-xl">
            <h3 className="text-base font-bold text-white flex items-center gap-2 mb-1">
              <TrendingUp className="w-4 h-4 text-emerald-400" />
              Comparative Population Growth (1960 – 2024)
            </h3>
            <p className="text-xs text-slate-400 mb-6">
              Historical trajectories in Millions (World Bank WDI & UN DESA data)
            </p>

            <div className="h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={historicalChartData} margin={{ top: 5, right: 30, left: 10, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                  <XAxis dataKey="year" stroke="#64748b" fontSize={11} />
                  <YAxis stroke="#64748b" fontSize={11} tickFormatter={(val) => `${val}M`} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px', fontSize: '12px' }}
                    formatter={(val, name) => [`${val.toLocaleString()} Million`, name]}
                  />
                  <Legend />
                  {displayComparison.map((c, i) => (
                    <Line
                      key={c.id}
                      type="monotone"
                      dataKey={c.name}
                      stroke={chartColors[i % chartColors.length]}
                      strokeWidth={3}
                      activeDot={{ r: 6 }}
                    />
                  ))}
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Detailed Side-by-Side Matrix Table */}
          <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-xl overflow-x-auto">
            <h3 className="text-base font-bold text-white mb-4">Metric Comparison Matrix</h3>
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 uppercase text-[10px]">
                  <th className="py-3 px-4">Demographic Metric</th>
                  {displayComparison.map((c) => (
                    <th key={c.id} className="py-3 px-4 text-right">
                      <span className="text-sm mr-1">{c.flag}</span> {c.name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 font-mono">
                <tr>
                  <td className="py-3 px-4 text-slate-300 font-sans font-medium">Official Population (2024)</td>
                  {displayComparison.map(c => (
                    <td key={c.id} className="py-3 px-4 text-right font-bold text-white">
                      {c.population.toLocaleString()}
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="py-3 px-4 text-slate-300 font-sans font-medium">Share of World Population</td>
                  {displayComparison.map(c => (
                    <td key={c.id} className="py-3 px-4 text-right text-indigo-300">
                      {c.worldShare}%
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="py-3 px-4 text-slate-300 font-sans font-medium">Annual Growth Rate</td>
                  {displayComparison.map(c => (
                    <td key={c.id} className="py-3 px-4 text-right">
                      <span className={c.growthRate >= 0 ? "text-emerald-400 font-bold" : "text-rose-400 font-bold"}>
                        {c.growthRate > 0 ? `+${c.growthRate}%` : `${c.growthRate}%`}
                      </span>
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="py-3 px-4 text-slate-300 font-sans font-medium">Population Density</td>
                  {displayComparison.map(c => (
                    <td key={c.id} className="py-3 px-4 text-right text-amber-300">
                      {c.density.toLocaleString()} / km²
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="py-3 px-4 text-slate-300 font-sans font-medium">Land Area</td>
                  {displayComparison.map(c => (
                    <td key={c.id} className="py-3 px-4 text-right text-slate-300">
                      {c.landAreaKm2.toLocaleString()} km²
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="py-3 px-4 text-slate-300 font-sans font-medium">Median Age</td>
                  {displayComparison.map(c => (
                    <td key={c.id} className="py-3 px-4 text-right text-purple-300">
                      {c.medianAge} years
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="py-3 px-4 text-slate-300 font-sans font-medium">Fertility Rate (Births/Woman)</td>
                  {displayComparison.map(c => (
                    <td key={c.id} className="py-3 px-4 text-right text-slate-200">
                      {c.fertilityRate}
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="py-3 px-4 text-slate-300 font-sans font-medium">Urban Population Share</td>
                  {displayComparison.map(c => (
                    <td key={c.id} className="py-3 px-4 text-right text-cyan-300">
                      {c.urbanization}%
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>

        </div>
      )}

      {/* SUBTAB 2: DENSITY EXTREMES */}
      {activeSubTab === 'density' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            
            {/* Top Densest */}
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-xl">
              <h3 className="text-base font-bold text-white flex items-center gap-2 mb-1">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-400" />
                World's Highest Population Density (people / km²)
              </h3>
              <p className="text-xs text-slate-400 mb-4">
                Compact nations, urban city-states, and high concentration geographies
              </p>

              <div className="space-y-3">
                {densestCountries.map((c, i) => (
                  <div key={c.id} className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/80 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-xs text-slate-500 w-4">#{i + 1}</span>
                      <span className="text-xl">{c.flag}</span>
                      <div>
                        <span className="font-semibold text-white text-xs block">{c.name}</span>
                        <span className="text-[11px] text-slate-400">{c.capital}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-sm font-bold font-mono text-rose-400 block">
                        {c.density.toLocaleString()} / km²
                      </span>
                      <span className="text-[10px] text-slate-500">
                        Pop: {(c.population / 1000000).toFixed(2)}M
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Top Sparsest */}
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-xl">
              <h3 className="text-base font-bold text-white flex items-center gap-2 mb-1">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                World's Lowest Population Density (people / km²)
              </h3>
              <p className="text-xs text-slate-400 mb-4">
                Expansive landmasses with vast wilderness, steppes, or deserts
              </p>

              <div className="space-y-3">
                {sparsestCountries.map((c, i) => (
                  <div key={c.id} className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/80 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-xs text-slate-500 w-4">#{i + 1}</span>
                      <span className="text-xl">{c.flag}</span>
                      <div>
                        <span className="font-semibold text-white text-xs block">{c.name}</span>
                        <span className="text-[11px] text-slate-400">{c.capital}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-sm font-bold font-mono text-emerald-400 block">
                        {c.density.toLocaleString()} / km²
                      </span>
                      <span className="text-[10px] text-slate-500">
                        Area: {(c.landAreaKm2 / 1000).toFixed(0)}k km²
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      )}

      {/* SUBTAB 3: FUTURE POPULATION PROJECTIONS */}
      {activeSubTab === 'projections' && (
        <div className="space-y-6">
          
          {/* Main Projections Area Chart */}
          <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-800 gap-2">
              <div>
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-indigo-400" />
                  United Nations Population Projections (2024 – 2100)
                </h3>
                <p className="text-xs text-slate-400">
                  Medium Fertility Variant projections by continental region (Millions)
                </p>
              </div>
              <span className="text-xs px-2.5 py-1 rounded bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 font-mono">
                Global Peak ~10.3B (around 2085)
              </span>
            </div>

            <div className="h-80 w-full mt-6">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={PROJECTIONS_BY_YEAR} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                  <XAxis dataKey="year" stroke="#64748b" fontSize={11} />
                  <YAxis stroke="#64748b" fontSize={11} tickFormatter={(val) => `${val}M`} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px', fontSize: '12px' }}
                    formatter={(val, name) => [`${val.toLocaleString()} Million`, name]}
                  />
                  <Legend />
                  <Area type="monotone" dataKey="asia" name="Asia" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.2} />
                  <Area type="monotone" dataKey="africa" name="Africa" stroke="#10b981" fill="#10b981" fillOpacity={0.2} />
                  <Area type="monotone" dataKey="europe" name="Europe" stroke="#8b5cf6" fill="#8b5cf6" fillOpacity={0.2} />
                  <Area type="monotone" dataKey="latinAmerica" name="Latin America" stroke="#f59e0b" fill="#f59e0b" fillOpacity={0.2} />
                  <Area type="monotone" dataKey="northAmerica" name="North America" stroke="#06b6d4" fill="#06b6d4" fillOpacity={0.2} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* 2050 Country Outlook Cards */}
          <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-xl">
            <h3 className="text-base font-bold text-white mb-2">Year 2050 Demographic Forecast Highlights</h3>
            <p className="text-xs text-slate-400 mb-5">
              Projected changes for major global populations according to UN DESA revision
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {COUNTRY_PROJECTIONS_2050.map((item, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-sm text-white">{item.name}</span>
                      <span className={`text-xs font-mono font-semibold px-2 py-0.5 rounded ${
                        item.changePercent >= 0 ? 'bg-emerald-500/10 text-emerald-400' : 'bg-rose-500/10 text-rose-400'
                      }`}>
                        {item.changePercent > 0 ? `+${item.changePercent}%` : `${item.changePercent}%`}
                      </span>
                    </div>
                    <div className="mt-3 flex items-baseline justify-between text-xs font-mono">
                      <span className="text-slate-400">2024: <b className="text-white">{item.current2024}M</b></span>
                      <ArrowRight className="w-3.5 h-3.5 text-slate-600" />
                      <span className="text-indigo-300 font-bold">2050: {item.projected2050}M</span>
                    </div>
                  </div>
                  <span className="mt-3 text-[11px] text-slate-400 block border-t border-slate-800/80 pt-2">
                    Trajectory: {item.status}
                  </span>
                </div>
              ))}
            </div>

          </div>

        </div>
      )}

    </div>
  );
};
