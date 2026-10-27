import React from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, 
  PieChart, Pie, Cell, AreaChart, Area, CartesianGrid, Legend 
} from 'recharts';
import { 
  Users, 
  Flag, 
  TrendingUp, 
  Compass, 
  Calendar, 
  Building2, 
  Scale, 
  ArrowUpRight,
  ExternalLink,
  ShieldCheck
} from 'lucide-react';
import { 
  GLOBAL_METRICS, 
  CONTINENT_DATA, 
  HISTORICAL_GLOBAL_GROWTH, 
  getTopPopulatedCountries 
} from '../data/worldPopulationData';

export const StatsOverview = ({ onSelectCountry }) => {
  const top10Countries = getTopPopulatedCountries(10).map((c) => ({
    name: `${c.flag} ${c.name}`,
    shortName: c.name,
    populationMillions: Number((c.population / 1000000).toFixed(1)),
    worldShare: c.worldShare,
    growthRate: c.growthRate,
    original: c
  }));

  const historicalData = HISTORICAL_GLOBAL_GROWTH.map((h) => ({
    year: h.year,
    populationBillions: Number((h.population / 1000).toFixed(2)),
    growthRate: h.growthRate
  }));

  const metrics = [
    {
      title: "World Population",
      value: "8.16 Billion",
      subtext: "+73M annual net growth",
      change: "+0.91%",
      isPositive: true,
      icon: Users,
      color: "from-blue-500/20 to-indigo-500/10",
      border: "border-blue-500/30",
      accent: "text-blue-400"
    },
    {
      title: "Total Countries & Territories",
      value: "195 UN States",
      subtext: "237 global administrative entities",
      change: "100% Tracked",
      isPositive: true,
      icon: Flag,
      color: "from-emerald-500/20 to-teal-500/10",
      border: "border-emerald-500/30",
      accent: "text-emerald-400"
    },
    {
      title: "Global Density",
      value: "61 people / km²",
      subtext: "Across 134.8M km² habitable land",
      change: "+0.8 / yr",
      isPositive: true,
      icon: Compass,
      color: "from-amber-500/20 to-yellow-500/10",
      border: "border-amber-500/30",
      accent: "text-amber-400"
    },
    {
      title: "Global Median Age",
      value: "30.5 Years",
      subtext: "Up from 24.0 yrs in 1970",
      change: "+0.3 yrs/cycle",
      isPositive: true,
      icon: Calendar,
      color: "from-purple-500/20 to-fuchsia-500/10",
      border: "border-purple-500/30",
      accent: "text-purple-400"
    },
    {
      title: "Urban Population Share",
      value: "57.5%",
      subtext: "4.7 Billion urban dwellers",
      change: "+1.6% shift",
      isPositive: true,
      icon: Building2,
      color: "from-cyan-500/20 to-sky-500/10",
      border: "border-cyan-500/30",
      accent: "text-cyan-400"
    },
    {
      title: "Global Fertility Rate",
      value: "2.25 Births",
      subtext: "Per woman (replacement level is 2.1)",
      change: "Gradual decline",
      isPositive: false,
      icon: Scale,
      color: "from-rose-500/20 to-orange-500/10",
      border: "border-rose-500/30",
      accent: "text-rose-400"
    }
  ];

  const CustomBarTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-slate-900 border border-slate-700 p-3 rounded-xl shadow-2xl text-xs space-y-1">
          <div className="font-bold text-slate-100 text-sm flex items-center gap-1.5">
            {data.name}
          </div>
          <div className="text-indigo-400 font-mono font-semibold">
            Population: {data.populationMillions.toLocaleString()} Million ({data.worldShare}% of World)
          </div>
          <div className="text-slate-400">
            Annual Growth: <span className={data.growthRate >= 0 ? "text-emerald-400" : "text-rose-400"}>{data.growthRate > 0 ? `+${data.growthRate}%` : `${data.growthRate}%`}</span>
          </div>
          <div className="text-slate-500 text-[11px] pt-1 border-t border-slate-800">
            Click bar or card to view states & provinces
          </div>
        </div>
      );
    }
    return null;
  };

  const CustomAreaTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-slate-900 border border-slate-700 p-3 rounded-xl shadow-2xl text-xs space-y-1">
          <div className="font-bold text-slate-100 text-sm">Year {label}</div>
          <div className="text-indigo-400 font-mono font-semibold">
            World Population: {payload[0].value} Billion
          </div>
          <div className="text-slate-400">
            Source: UN DESA World Population Prospects 2024
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-8">
      
      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {metrics.map((m, idx) => {
          const Icon = m.icon;
          return (
            <div 
              key={idx} 
              className={`p-5 rounded-2xl bg-gradient-to-br ${m.color} bg-slate-900/60 border ${m.border} backdrop-blur-sm transition-all hover:scale-[1.01] hover:border-slate-500`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-slate-400 uppercase tracking-wider">{m.title}</span>
                <div className={`p-2 rounded-xl bg-slate-950/60 border border-slate-800 ${m.accent}`}>
                  <Icon className="w-4 h-4" />
                </div>
              </div>
              <div className="mt-3 flex items-baseline justify-between">
                <span className="text-2xl font-bold font-mono tracking-tight text-white">{m.value}</span>
                <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                  m.isPositive ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                }`}>
                  {m.change}
                </span>
              </div>
              <p className="mt-2 text-xs text-slate-400">{m.subtext}</p>
            </div>
          );
        })}
      </div>

      {/* Visualizations Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Top 10 Most Populated Countries */}
        <div className="lg:col-span-8 p-6 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-800 gap-2">
            <div>
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-indigo-400" />
                Top 10 Most Populated Countries
              </h2>
              <p className="text-xs text-slate-400">
                Official 2024 Population in Millions • Click any row for state breakdowns
              </p>
            </div>
            <span className="text-xs px-2.5 py-1 rounded-md bg-slate-800 text-slate-300 font-mono self-start sm:self-auto">
              56.2% of World Population
            </span>
          </div>

          <div className="mt-6 h-[340px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={top10Countries}
                layout="vertical"
                margin={{ top: 5, right: 30, left: 40, bottom: 5 }}
                onClick={(e) => {
                  if (e && e.activePayload && e.activePayload[0]) {
                    onSelectCountry(e.activePayload[0].payload.original);
                  }
                }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" horizontal={false} />
                <XAxis 
                  type="number" 
                  stroke="#64748b" 
                  tickFormatter={(val) => `${val}M`}
                  fontSize={11}
                />
                <YAxis 
                  dataKey="name" 
                  type="category" 
                  stroke="#94a3b8" 
                  width={110}
                  fontSize={12}
                  tickLine={false}
                />
                <Tooltip content={<CustomBarTooltip />} cursor={{ fill: 'rgba(99, 102, 241, 0.1)' }} />
                <Bar 
                  dataKey="populationMillions" 
                  fill="#6366f1" 
                  radius={[0, 6, 6, 0]} 
                  className="cursor-pointer hover:opacity-90 transition-opacity"
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Global Distribution by Continent */}
        <div className="lg:col-span-4 p-6 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-xl flex flex-col justify-between">
          <div>
            <div className="pb-4 border-b border-slate-800">
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <Compass className="w-5 h-5 text-emerald-400" />
                Continental Breakdown
              </h2>
              <p className="text-xs text-slate-400">
                World demographic share by geographic region
              </p>
            </div>

            <div className="h-[210px] w-full mt-2">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={CONTINENT_DATA}
                    dataKey="population"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    innerRadius={55}
                    outerRadius={80}
                    paddingAngle={3}
                  >
                    {CONTINENT_DATA.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    formatter={(val) => `${(val / 1000000000).toFixed(2)} Billion`}
                    contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px', fontSize: '12px' }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Continent Legend Pills */}
          <div className="grid grid-cols-2 gap-2 text-xs pt-3 border-t border-slate-800/80">
            {CONTINENT_DATA.map((cont, idx) => (
              <div key={idx} className="flex items-center justify-between p-1.5 rounded bg-slate-950/60 border border-slate-800">
                <div className="flex items-center gap-1.5 truncate">
                  <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: cont.color }} />
                  <span className="text-slate-300 font-medium truncate">{cont.name}</span>
                </div>
                <span className="text-slate-400 font-mono text-[11px] shrink-0">{cont.percentage}%</span>
              </div>
            ))}
          </div>

        </div>

      </div>

      {/* Global 100-Year Historical Growth Trajectory (1950 - 2050) */}
      <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-800 gap-2">
          <div>
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-indigo-400" />
              World Population Growth Timeline (1950 – 2050)
            </h2>
            <p className="text-xs text-slate-400">
              UN DESA Medium Fertility Variant historical records and official projections (Billions)
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 text-xs text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">
              <ShieldCheck className="w-3.5 h-3.5" />
              Verified UN WPP 2024
            </span>
          </div>
        </div>

        <div className="mt-6 h-[280px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={historicalData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="colorPop" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#6366f1" stopOpacity={0.4}/>
                  <stop offset="95%" stopColor="#6366f1" stopOpacity={0.0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
              <XAxis dataKey="year" stroke="#64748b" fontSize={11} />
              <YAxis 
                stroke="#64748b" 
                fontSize={11} 
                tickFormatter={(val) => `${val}B`}
                domain={[0, 11]}
              />
              <Tooltip content={<CustomAreaTooltip />} />
              <Area 
                type="monotone" 
                dataKey="populationBillions" 
                stroke="#818cf8" 
                strokeWidth={3}
                fillOpacity={1} 
                fill="url(#colorPop)" 
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Growth Milestones Ribbon */}
        <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-slate-800 text-xs">
          <div className="p-2.5 rounded-lg bg-slate-950/60 border border-slate-800">
            <span className="text-slate-400 block">1974 Milestone</span>
            <span className="text-white font-bold font-mono">4.0 Billion</span>
            <span className="text-[11px] text-slate-500 block">Post-war acceleration</span>
          </div>
          <div className="p-2.5 rounded-lg bg-slate-950/60 border border-slate-800">
            <span className="text-slate-400 block">1999 Milestone</span>
            <span className="text-white font-bold font-mono">6.0 Billion</span>
            <span className="text-[11px] text-slate-500 block">Millennium turning point</span>
          </div>
          <div className="p-2.5 rounded-lg bg-indigo-950/40 border border-indigo-500/30">
            <span className="text-indigo-300 block font-semibold">2022 Milestone</span>
            <span className="text-white font-bold font-mono">8.0 Billion</span>
            <span className="text-[11px] text-indigo-400 block">UN Day of Eight Billion</span>
          </div>
          <div className="p-2.5 rounded-lg bg-slate-950/60 border border-slate-800">
            <span className="text-slate-400 block">2050 Projected</span>
            <span className="text-emerald-400 font-bold font-mono">9.7 Billion</span>
            <span className="text-[11px] text-slate-500 block">Approaching plateau</span>
          </div>
        </div>

      </div>

    </div>
  );
};
