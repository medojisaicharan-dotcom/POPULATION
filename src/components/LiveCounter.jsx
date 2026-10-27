import React, { useState, useEffect } from 'react';
import { Users, Baby, HeartCrack, TrendingUp, Sparkles, Clock } from 'lucide-react';
import { GLOBAL_METRICS } from '../data/worldPopulationData';

export const LiveCounter = () => {
  // Global annual net growth is ~73M per year
  // 73,000,000 / (365.25 * 24 * 3600) = ~2.313 net people per second
  // Births: ~134M/year = ~4.246 births/sec
  // Deaths: ~61M/year = ~1.933 deaths/sec
  
  const [population, setPopulation] = useState(GLOBAL_METRICS.worldPopulation);
  const [birthsToday, setBirthsToday] = useState(0);
  const [deathsToday, setDeathsToday] = useState(0);

  useEffect(() => {
    // Calculate progress for today
    const now = new Date();
    const secondsSinceMidnight = now.getHours() * 3600 + now.getMinutes() * 60 + now.getSeconds();
    
    setBirthsToday(Math.floor(secondsSinceMidnight * 4.246));
    setDeathsToday(Math.floor(secondsSinceMidnight * 1.933));

    // Update interval every 450ms for realistic live ticker
    const timer = setInterval(() => {
      setPopulation((prev) => prev + 1);
      setBirthsToday((prev) => prev + (Math.random() > 0.4 ? 1 : 0));
      setDeathsToday((prev) => prev + (Math.random() > 0.6 ? 1 : 0));
    }, 432);

    return () => clearInterval(timer);
  }, []);

  const netGrowthToday = birthsToday - deathsToday;

  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900 via-indigo-950/40 to-slate-900 border border-slate-800 p-6 shadow-2xl">
      {/* Background ambient lighting */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-10 left-10 w-72 h-72 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-6">
        
        {/* Left: Main Population Ticker */}
        <div className="text-center lg:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/15 border border-indigo-500/30 text-indigo-300 text-xs font-semibold mb-3">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
            LIVE ESTIMATED WORLD POPULATION
          </div>
          
          <div className="flex items-baseline gap-3 justify-center lg:justify-start">
            <span className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white font-mono">
              {population.toLocaleString()}
            </span>
          </div>

          <p className="text-sm text-slate-400 mt-2 flex items-center gap-2 justify-center lg:justify-start">
            <Clock className="w-4 h-4 text-slate-500" />
            Real-time projection based on UN DESA 2024 & World Bank benchmark statistics (~2.3 net additions / sec)
          </p>
        </div>

        {/* Right: Demographic Pulse (Today's Vital Statistics) */}
        <div className="grid grid-cols-3 gap-3 w-full lg:w-auto">
          
          {/* Births Today */}
          <div className="bg-slate-950/70 border border-slate-800/90 rounded-xl p-3.5 text-center min-w-[120px]">
            <div className="flex items-center justify-center gap-1.5 text-emerald-400 text-xs font-medium mb-1">
              <Baby className="w-4 h-4" />
              <span>Births Today</span>
            </div>
            <div className="text-lg sm:text-xl font-bold font-mono text-slate-100">
              +{birthsToday.toLocaleString()}
            </div>
            <span className="text-[10px] text-emerald-500/80 font-medium">~365k / day</span>
          </div>

          {/* Deaths Today */}
          <div className="bg-slate-950/70 border border-slate-800/90 rounded-xl p-3.5 text-center min-w-[120px]">
            <div className="flex items-center justify-center gap-1.5 text-rose-400 text-xs font-medium mb-1">
              <HeartCrack className="w-4 h-4" />
              <span>Deaths Today</span>
            </div>
            <div className="text-lg sm:text-xl font-bold font-mono text-slate-100">
              -{deathsToday.toLocaleString()}
            </div>
            <span className="text-[10px] text-rose-400/80 font-medium">~167k / day</span>
          </div>

          {/* Net Growth Today */}
          <div className="bg-slate-950/70 border border-indigo-500/30 rounded-xl p-3.5 text-center min-w-[120px]">
            <div className="flex items-center justify-center gap-1.5 text-indigo-400 text-xs font-medium mb-1">
              <TrendingUp className="w-4 h-4" />
              <span>Net Growth Today</span>
            </div>
            <div className="text-lg sm:text-xl font-bold font-mono text-indigo-300">
              +{netGrowthToday.toLocaleString()}
            </div>
            <span className="text-[10px] text-indigo-400/80 font-medium">+0.91% rate</span>
          </div>

        </div>

      </div>
    </div>
  );
};
