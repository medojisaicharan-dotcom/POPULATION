import React, { useState, useMemo } from 'react';
import { 
  Search, 
  Filter, 
  ArrowUpDown, 
  LayoutGrid, 
  Table as TableIcon, 
  MapPin, 
  TrendingUp, 
  Download, 
  ChevronRight,
  ShieldCheck,
  Scale
} from 'lucide-react';
import { COUNTRIES_DATA } from '../data/worldPopulationData';
import { STATES_BY_COUNTRY } from '../data/statesData';

export const CountriesAndStates = ({ onSelectCountry, onCompareCountry }) => {
  const [search, setSearch] = useState('');
  const [selectedContinent, setSelectedContinent] = useState('All');
  const [selectedPopFilter, setSelectedPopFilter] = useState('All');
  const [selectedGrowthFilter, setSelectedGrowthFilter] = useState('All');
  const [sortBy, setSortBy] = useState('pop_desc');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' | 'table'

  const continents = ['All', 'Asia', 'Africa', 'Europe', 'Northern America', 'Latin America & Caribbean', 'Oceania'];

  // Filter & Sort
  const filteredCountries = useMemo(() => {
    return COUNTRIES_DATA.filter((country) => {
      // Search
      const matchesSearch = 
        country.name.toLowerCase().includes(search.toLowerCase()) ||
        country.capital.toLowerCase().includes(search.toLowerCase()) ||
        country.code.toLowerCase().includes(search.toLowerCase());

      if (!matchesSearch) return false;

      // Continent
      if (selectedContinent !== 'All' && country.continent !== selectedContinent) {
        return false;
      }

      // Population Tier
      if (selectedPopFilter === '>100M' && country.population < 100000000) return false;
      if (selectedPopFilter === '50M-100M' && (country.population < 50000000 || country.population >= 100000000)) return false;
      if (selectedPopFilter === '10M-50M' && (country.population < 10000000 || country.population >= 50000000)) return false;
      if (selectedPopFilter === '<10M' && country.population >= 10000000) return false;

      // Growth Rate Tier
      if (selectedGrowthFilter === 'rapid' && country.growthRate < 1.5) return false;
      if (selectedGrowthFilter === 'moderate' && (country.growthRate < 0.5 || country.growthRate >= 1.5)) return false;
      if (selectedGrowthFilter === 'slow' && (country.growthRate < 0 || country.growthRate >= 0.5)) return false;
      if (selectedGrowthFilter === 'declining' && country.growthRate >= 0) return false;

      return true;
    }).sort((a, b) => {
      if (sortBy === 'pop_desc') return b.population - a.population;
      if (sortBy === 'pop_asc') return a.population - b.population;
      if (sortBy === 'density_desc') return b.density - a.density;
      if (sortBy === 'growth_desc') return b.growthRate - a.growthRate;
      if (sortBy === 'name_asc') return a.name.localeCompare(b.name);
      return 0;
    });
  }, [search, selectedContinent, selectedPopFilter, selectedGrowthFilter, sortBy]);

  // Export to CSV helper
  const handleExportCSV = () => {
    const headers = ['Country', 'Code', 'Capital', 'Continent', 'Population', 'World Share %', 'Annual Growth %', 'Density /km2', 'Land Area km2', 'Median Age', 'Fertility Rate', 'Data Source', 'Year'];
    const rows = filteredCountries.map(c => [
      `"${c.name}"`,
      `"${c.code}"`,
      `"${c.capital}"`,
      `"${c.continent}"`,
      c.population,
      c.worldShare,
      c.growthRate,
      c.density,
      c.landAreaKm2,
      c.medianAge,
      c.fertilityRate,
      `"${c.source}"`,
      c.year
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `global_population_data_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6">
      
      {/* Search, Filter & View Controls */}
      <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-xl space-y-4">
        
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          
          {/* Main Search Input */}
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search by country name, capital city, or ISO code (e.g., India, Berlin, US)..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-950/80 border border-slate-700 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
            />
            {search && (
              <button 
                onClick={() => setSearch('')}
                className="absolute right-3 top-2.5 text-xs text-slate-500 hover:text-slate-300"
              >
                Clear
              </button>
            )}
          </div>

          {/* Sort & View Mode */}
          <div className="flex items-center gap-2.5 shrink-0">
            <div className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-950/80 border border-slate-700 text-xs text-slate-300">
              <ArrowUpDown className="w-3.5 h-3.5 text-slate-400" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-transparent text-white focus:outline-none cursor-pointer"
              >
                <option value="pop_desc" className="bg-slate-900">Population (Highest)</option>
                <option value="pop_asc" className="bg-slate-900">Population (Lowest)</option>
                <option value="density_desc" className="bg-slate-900">Density (Highest)</option>
                <option value="growth_desc" className="bg-slate-900">Growth Rate (Highest)</option>
                <option value="name_asc" className="bg-slate-900">Alphabetical (A-Z)</option>
              </select>
            </div>

            {/* View Mode Toggle */}
            <div className="flex items-center bg-slate-950/80 border border-slate-700 rounded-xl p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-1.5 rounded-lg transition-colors ${viewMode === 'grid' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'}`}
                title="Grid Cards View"
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('table')}
                className={`p-1.5 rounded-lg transition-colors ${viewMode === 'table' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'}`}
                title="Detailed Table View"
              >
                <TableIcon className="w-4 h-4" />
              </button>
            </div>

            {/* Export CSV */}
            <button
              onClick={handleExportCSV}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium transition-all"
              title="Export filtered records as CSV"
            >
              <Download className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Export CSV</span>
            </button>
          </div>

        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-800/80 text-xs">
          <span className="text-slate-500 font-medium mr-1 flex items-center gap-1">
            <Filter className="w-3.5 h-3.5" /> Continent:
          </span>
          {continents.map((c) => (
            <button
              key={c}
              onClick={() => setSelectedContinent(c)}
              className={`px-3 py-1 rounded-full transition-all ${
                selectedContinent === c
                  ? 'bg-indigo-600 text-white font-medium shadow-sm shadow-indigo-500/20'
                  : 'bg-slate-950/60 text-slate-400 hover:text-slate-200 border border-slate-800'
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        {/* Secondary Filters (Population Size & Growth Rate) */}
        <div className="flex flex-wrap items-center gap-3 text-xs pt-1">
          <div className="flex items-center gap-2">
            <span className="text-slate-500 font-medium">Population Size:</span>
            <select
              value={selectedPopFilter}
              onChange={(e) => setSelectedPopFilter(e.target.value)}
              className="px-2.5 py-1 rounded-lg bg-slate-950/60 border border-slate-800 text-slate-300 focus:outline-none"
            >
              <option value="All" className="bg-slate-900">All Sizes</option>
              <option value=">100M" className="bg-slate-900">&gt; 100 Million</option>
              <option value="50M-100M" className="bg-slate-900">50M – 100M</option>
              <option value="10M-50M" className="bg-slate-900">10M – 50M</option>
              <option value="<10M" className="bg-slate-900">&lt; 10 Million</option>
            </select>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-slate-500 font-medium">Growth Profile:</span>
            <select
              value={selectedGrowthFilter}
              onChange={(e) => setSelectedGrowthFilter(e.target.value)}
              className="px-2.5 py-1 rounded-lg bg-slate-950/60 border border-slate-800 text-slate-300 focus:outline-none"
            >
              <option value="All" className="bg-slate-900">All Rates</option>
              <option value="rapid" className="bg-slate-900">Rapid (&gt; 1.5%)</option>
              <option value="moderate" className="bg-slate-900">Moderate (0.5% – 1.5%)</option>
              <option value="slow" className="bg-slate-900">Slow (0% – 0.5%)</option>
              <option value="declining" className="bg-slate-900">Declining (&lt; 0%)</option>
            </select>
          </div>

          <div className="ml-auto text-xs text-slate-400">
            Showing <span className="font-bold text-white">{filteredCountries.length}</span> countries
          </div>
        </div>

      </div>

      {/* Grid Cards View */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredCountries.map((c) => {
            const hasStates = STATES_BY_COUNTRY[c.name]?.length || 0;
            return (
              <div
                key={c.id}
                className="group relative rounded-2xl bg-slate-900/80 border border-slate-800 p-5 hover:border-indigo-500/50 hover:bg-slate-900 transition-all duration-200 shadow-lg flex flex-col justify-between"
              >
                <div>
                  {/* Card Header */}
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <span className="text-3xl select-none group-hover:scale-110 transition-transform">
                        {c.flag}
                      </span>
                      <div>
                        <h3 className="font-bold text-base text-white group-hover:text-indigo-300 transition-colors">
                          {c.name}
                        </h3>
                        <p className="text-xs text-slate-400">
                          {c.capital} • <span className="text-slate-500">{c.continent}</span>
                        </p>
                      </div>
                    </div>

                    <span className={`text-[11px] font-semibold font-mono px-2 py-0.5 rounded-full ${
                      c.growthRate >= 0 
                        ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' 
                        : 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                    }`}>
                      {c.growthRate > 0 ? `+${c.growthRate}%` : `${c.growthRate}%`}
                    </span>
                  </div>

                  {/* Main Population Figure */}
                  <div className="mt-4 p-3 rounded-xl bg-slate-950/60 border border-slate-800/80">
                    <div className="flex items-baseline justify-between">
                      <span className="text-xl font-bold font-mono text-white">
                        {c.population.toLocaleString()}
                      </span>
                      <span className="text-xs font-mono text-indigo-400">
                        {c.worldShare}% world
                      </span>
                    </div>
                    <div className="mt-1 flex items-center justify-between text-[11px] text-slate-400">
                      <span>Density: {c.density.toLocaleString()}/km²</span>
                      <span>Area: {(c.landAreaKm2 / 1000).toFixed(0)}k km²</span>
                    </div>
                  </div>

                  {/* Secondary Metrics */}
                  <div className="mt-3 grid grid-cols-2 gap-2 text-xs text-slate-400">
                    <div className="flex items-center justify-between p-2 rounded-lg bg-slate-950/40 border border-slate-800/50">
                      <span>Median Age</span>
                      <span className="font-mono text-slate-200">{c.medianAge}y</span>
                    </div>
                    <div className="flex items-center justify-between p-2 rounded-lg bg-slate-950/40 border border-slate-800/50">
                      <span>Fertility</span>
                      <span className="font-mono text-slate-200">{c.fertilityRate}</span>
                    </div>
                  </div>

                  {/* Source Reference Tag */}
                  <div className="mt-2.5 flex items-center gap-1.5 text-[11px] text-slate-500">
                    <ShieldCheck className="w-3.5 h-3.5 text-indigo-400/80 shrink-0" />
                    <span className="truncate">{c.source} ({c.year})</span>
                  </div>
                </div>

                {/* Card Actions */}
                <div className="mt-5 pt-3 border-t border-slate-800/80 flex items-center gap-2">
                  <button
                    onClick={() => onSelectCountry(c)}
                    className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-indigo-600/15 hover:bg-indigo-600 text-indigo-300 hover:text-white border border-indigo-500/30 text-xs font-semibold transition-all"
                  >
                    <span>View States ({hasStates || 'Divisions'})</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>

                  {onCompareCountry && (
                    <button
                      onClick={() => onCompareCountry(c)}
                      className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
                      title="Compare this country"
                    >
                      <Scale className="w-4 h-4" />
                    </button>
                  )}
                </div>

              </div>
            );
          })}
        </div>
      ) : (
        /* Detailed Table View */
        <div className="rounded-2xl bg-slate-900/80 border border-slate-800 shadow-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-slate-800 bg-slate-950/70 text-slate-400 uppercase tracking-wider text-[11px]">
                  <th className="py-3 px-4">Country & Flag</th>
                  <th className="py-3 px-4">Capital</th>
                  <th className="py-3 px-4">Continent</th>
                  <th className="py-3 px-4 text-right">Population</th>
                  <th className="py-3 px-4 text-right">% of World</th>
                  <th className="py-3 px-4 text-right">Growth %</th>
                  <th className="py-3 px-4 text-right">Density (/km²)</th>
                  <th className="py-3 px-4 text-right">Median Age</th>
                  <th className="py-3 px-4 text-right">States / Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {filteredCountries.map((c) => (
                  <tr key={c.id} className="hover:bg-slate-800/40 transition-colors">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2.5">
                        <span className="text-xl">{c.flag}</span>
                        <div>
                          <span className="font-semibold text-white block">{c.name}</span>
                          <span className="text-[10px] text-slate-500 font-mono">{c.code}</span>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-slate-300">{c.capital}</td>
                    <td className="py-3 px-4 text-slate-400">{c.continent}</td>
                    <td className="py-3 px-4 text-right font-mono font-bold text-white">
                      {c.population.toLocaleString()}
                    </td>
                    <td className="py-3 px-4 text-right font-mono text-indigo-300">
                      {c.worldShare}%
                    </td>
                    <td className="py-3 px-4 text-right">
                      <span className={`font-mono font-semibold px-2 py-0.5 rounded ${
                        c.growthRate >= 0 ? 'bg-emerald-500/10 text-emerald-400' : 'bg-rose-500/10 text-rose-400'
                      }`}>
                        {c.growthRate > 0 ? `+${c.growthRate}%` : `${c.growthRate}%`}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right font-mono text-slate-300">
                      {c.density.toLocaleString()}
                    </td>
                    <td className="py-3 px-4 text-right font-mono text-slate-400">
                      {c.medianAge} y
                    </td>
                    <td className="py-3 px-4 text-right">
                      <button
                        onClick={() => onSelectCountry(c)}
                        className="px-3 py-1 rounded-lg bg-indigo-600/20 hover:bg-indigo-600 text-indigo-300 hover:text-white border border-indigo-500/30 transition-all font-medium"
                      >
                        Breakdown &rarr;
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {filteredCountries.length === 0 && (
        <div className="text-center py-16 bg-slate-900/50 rounded-2xl border border-slate-800">
          <p className="text-slate-400 text-base">No countries found matching your search and filter criteria.</p>
          <button
            onClick={() => {
              setSearch('');
              setSelectedContinent('All');
              setSelectedPopFilter('All');
              setSelectedGrowthFilter('All');
            }}
            className="mt-3 px-4 py-2 rounded-xl bg-indigo-600 text-white text-xs font-semibold hover:bg-indigo-500"
          >
            Reset All Filters
          </button>
        </div>
      )}

    </div>
  );
};
