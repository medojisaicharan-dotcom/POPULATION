import React, { useState } from 'react';
import { 
  X, 
  MapPin, 
  Users, 
  TrendingUp, 
  Compass, 
  Maximize2, 
  Building2, 
  Calendar, 
  ShieldCheck, 
  Search,
  ExternalLink,
  Layers,
  ArrowRight
} from 'lucide-react';
import { getStatesForCountry } from '../data/statesData';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts';

export const CountryDetailModal = ({ country, onClose, onCompare }) => {
  const [searchTerm, setSearchTerm] = useState('');
  
  if (!country) return null;

  const states = getStatesForCountry(country.name);
  const filteredStates = states.filter(s => 
    s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (s.capital && s.capital.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  // Top 5 states for mini-chart
  const topStatesChartData = [...states]
    .filter(s => s.population > 0)
    .sort((a, b) => b.population - a.population)
    .slice(0, 6)
    .map(s => ({
      name: s.name,
      populationMillions: Number((s.population / 1000000).toFixed(1))
    }));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-4xl max-h-[92vh] flex flex-col rounded-2xl bg-slate-900 border border-slate-700 shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-slate-800 bg-slate-950/70">
          <div className="flex items-center gap-3">
            <span className="text-4xl shadow-sm rounded-lg">{country.flag}</span>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-2xl font-bold text-white tracking-tight">{country.name}</h2>
                <span className="text-xs px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 font-mono">
                  {country.code}
                </span>
                <span className="text-xs px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                  {country.continent}
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                Capital: <span className="text-slate-200 font-medium">{country.capital}</span> • Official Demographic Profile
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {onCompare && (
              <button
                onClick={() => {
                  onCompare(country);
                  onClose();
                }}
                className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-indigo-600/20 text-indigo-300 border border-indigo-500/30 hover:bg-indigo-600/30 transition-all"
              >
                <span>Add to Compare</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}
            <button
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              title="Close Modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          
          {/* Key Indicators Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
            <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800">
              <span className="text-slate-400 block mb-1">National Population</span>
              <span className="text-lg font-bold font-mono text-white">
                {country.population.toLocaleString()}
              </span>
              <span className="text-[11px] text-indigo-400 block mt-0.5">
                {country.worldShare}% of World Total
              </span>
            </div>

            <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800">
              <span className="text-slate-400 block mb-1">Annual Growth Rate</span>
              <span className={`text-lg font-bold font-mono ${
                country.growthRate >= 0 ? 'text-emerald-400' : 'text-rose-400'
              }`}>
                {country.growthRate > 0 ? `+${country.growthRate}%` : `${country.growthRate}%`}
              </span>
              <span className="text-[11px] text-slate-400 block mt-0.5">Annual change</span>
            </div>

            <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800">
              <span className="text-slate-400 block mb-1">Population Density</span>
              <span className="text-lg font-bold font-mono text-amber-300">
                {country.density.toLocaleString()} / km²
              </span>
              <span className="text-[11px] text-slate-400 block mt-0.5">
                Area: {country.landAreaKm2.toLocaleString()} km²
              </span>
            </div>

            <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800">
              <span className="text-slate-400 block mb-1">Median Age & Fertility</span>
              <span className="text-lg font-bold font-mono text-purple-300">
                {country.medianAge} yrs
              </span>
              <span className="text-[11px] text-slate-400 block mt-0.5">
                Fertility: {country.fertilityRate} births/woman
              </span>
            </div>
          </div>

          {/* Subnational States / Provinces Section */}
          <div className="rounded-xl border border-slate-800 bg-slate-950/50 p-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-800">
              <div>
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <Layers className="w-4 h-4 text-indigo-400" />
                  States, Provinces & Administrative Divisions ({states.length})
                </h3>
                <p className="text-xs text-slate-400">
                  Subnational population statistics from official national census datasets
                </p>
              </div>

              {/* Sub-search */}
              <div className="relative w-full sm:w-64">
                <Search className="absolute left-3 top-2.5 w-3.5 h-3.5 text-slate-500" />
                <input
                  type="text"
                  placeholder="Filter states or capitals..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-9 pr-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                />
              </div>
            </div>

            {/* Optional top states visualization */}
            {topStatesChartData.length > 2 && (
              <div className="my-4 p-3 rounded-xl bg-slate-900/60 border border-slate-800/80">
                <span className="text-xs font-semibold text-slate-300 mb-2 block">
                  Largest Subdivisions by Population (Millions)
                </span>
                <div className="h-32 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={topStatesChartData} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
                      <XAxis dataKey="name" stroke="#64748b" fontSize={10} tickLine={false} />
                      <YAxis stroke="#64748b" fontSize={10} tickFormatter={(v) => `${v}M`} />
                      <Tooltip 
                        contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px', fontSize: '12px' }}
                        formatter={(val) => [`${val} Million`, 'Population']}
                      />
                      <Bar dataKey="populationMillions" fill="#818cf8" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            )}

            {/* States Table */}
            <div className="overflow-x-auto max-h-72 mt-3">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400 font-semibold uppercase tracking-wider text-[10px]">
                    <th className="py-2.5 px-3">State / Province</th>
                    <th className="py-2.5 px-3">Capital / Seat</th>
                    <th className="py-2.5 px-3 text-right">Population</th>
                    <th className="py-2.5 px-3 text-right">% of Nation</th>
                    <th className="py-2.5 px-3 text-right">Density (/km²)</th>
                    <th className="py-2.5 px-3 text-right">Source</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {filteredStates.map((st, i) => (
                    <tr key={i} className="hover:bg-slate-800/40 transition-colors">
                      <td className="py-2.5 px-3 font-medium text-white">
                        {st.name}
                      </td>
                      <td className="py-2.5 px-3 text-slate-400">
                        {st.capital || '—'}
                      </td>
                      <td className="py-2.5 px-3 text-right font-mono font-semibold text-slate-200">
                        {st.population ? st.population.toLocaleString() : 'Official Division'}
                      </td>
                      <td className="py-2.5 px-3 text-right font-mono text-indigo-300">
                        {st.share ? `${st.share}%` : '—'}
                      </td>
                      <td className="py-2.5 px-3 text-right font-mono text-slate-400">
                        {st.density ? st.density.toLocaleString() : '—'}
                      </td>
                      <td className="py-2.5 px-3 text-right text-[11px] text-slate-500">
                        {st.source || country.source}
                      </td>
                    </tr>
                  ))}
                  {filteredStates.length === 0 && (
                    <tr>
                      <td colSpan="6" className="text-center py-6 text-slate-500">
                        No states matching "{searchTerm}" found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

          </div>

          {/* Official Source & Reference Year Badge */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between p-3.5 rounded-xl bg-indigo-950/30 border border-indigo-500/20 gap-2 text-xs">
            <div className="flex items-center gap-2 text-indigo-300 font-medium">
              <ShieldCheck className="w-4 h-4 text-indigo-400 shrink-0" />
              <span>Official Reference Source: {country.source}</span>
            </div>
            <div className="text-slate-400 font-mono">
              Reference Year: <span className="text-slate-200 font-semibold">{country.year}</span>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
