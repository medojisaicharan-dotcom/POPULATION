import React, { useState } from 'react';
import { Globe2, Layers, MapPin, Users, Compass, ExternalLink } from 'lucide-react';
import { COUNTRIES_DATA } from '../data/worldPopulationData';

export const InteractiveWorldMap = ({ onSelectCountry }) => {
  const [hoveredCountry, setHoveredCountry] = useState(null);
  const [selectedContinent, setSelectedContinent] = useState('All');

  // Key map coordinate landmarks for world regions
  const mapHotspots = [
    { id: 'IND', name: 'India', flag: '🇮🇳', x: 68, y: 48, pop: '1.44 Billion', share: '17.7%', density: 438 },
    { id: 'CHN', name: 'China', flag: '🇨🇳', x: 78, y: 40, pop: '1.41 Billion', share: '17.3%', density: 150 },
    { id: 'USA', name: 'United States', flag: '🇺🇸', x: 22, y: 38, pop: '341.8 Million', share: '4.2%', density: 37 },
    { id: 'IDN', name: 'Indonesia', flag: '🇮🇩', x: 80, y: 62, pop: '281.6 Million', share: '3.5%', density: 148 },
    { id: 'PAK', name: 'Pakistan', flag: '🇵🇰', x: 64, y: 42, pop: '245.2 Million', share: '3.0%', density: 312 },
    { id: 'NGA', name: 'Nigeria', flag: '🇳🇬', x: 48, y: 54, pop: '229.2 Million', share: '2.8%', density: 248 },
    { id: 'BRA', name: 'Brazil', flag: '🇧🇷', x: 34, y: 68, pop: '217.6 Million', share: '2.7%', density: 26 },
    { id: 'BGD', name: 'Bangladesh', flag: '🇧🇩', x: 72, y: 46, pop: '174.7 Million', share: '2.1%', density: 1215 },
    { id: 'RUS', name: 'Russia', flag: '🇷🇺', x: 74, y: 22, pop: '144.2 Million', share: '1.8%', density: 9 },
    { id: 'ETH', name: 'Ethiopia', flag: '🇪🇹', x: 57, y: 56, pop: '129.7 Million', share: '1.6%', density: 118 },
    { id: 'MEX', name: 'Mexico', flag: '🇲🇽', x: 18, y: 46, pop: '129.4 Million', share: '1.6%', density: 66 },
    { id: 'JPN', name: 'Japan', flag: '🇯🇵', x: 86, y: 39, pop: '123.8 Million', share: '1.5%', density: 338 },
    { id: 'DEU', name: 'Germany', flag: '🇩🇪', x: 51, y: 31, pop: '84.6 Million', share: '1.0%', density: 240 },
    { id: 'GBR', name: 'United Kingdom', flag: '🇬🇧', x: 47, y: 29, pop: '68.7 Million', share: '0.8%', density: 283 },
    { id: 'AUS', name: 'Australia', flag: '🇦🇺', x: 85, y: 76, pop: '26.6 Million', share: '0.3%', density: 3.5 },
    { id: 'EGY', name: 'Egypt', flag: '🇪🇬', x: 55, y: 44, pop: '114.5 Million', share: '1.4%', density: 115 },
    { id: 'ZAF', name: 'South Africa', flag: '🇿🇦', x: 53, y: 75, pop: '60.4 Million', share: '0.7%', density: 50 },
    { id: 'CAN', name: 'Canada', flag: '🇨🇦', x: 23, y: 26, pop: '40.1 Million', share: '0.5%', density: 4 }
  ];

  return (
    <div className="space-y-6">
      
      {/* Map Header Card */}
      <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <Globe2 className="w-5 h-5 text-indigo-400" />
            Global Demographic Distribution Map
          </h2>
          <p className="text-xs text-slate-400">
            Interactive geographic visualization • Hover pins to inspect densities and click to explore state breakdowns
          </p>
        </div>
        <div className="flex items-center gap-2 text-xs">
          <span className="flex items-center gap-1.5 text-slate-300">
            <span className="w-2.5 h-2.5 rounded-full bg-indigo-500 animate-ping" />
            High Concentration Nodes
          </span>
        </div>
      </div>

      {/* Main Interactive Map Canvas */}
      <div className="relative rounded-2xl bg-slate-950 border border-slate-800 p-6 overflow-hidden shadow-2xl min-h-[460px] flex items-center justify-center">
        
        {/* Subtle grid background */}
        <div 
          className="absolute inset-0 opacity-15" 
          style={{ 
            backgroundImage: 'radial-gradient(#6366f1 1px, transparent 1px)', 
            backgroundSize: '24px 24px' 
          }} 
        />

        {/* Global Continental Background Silhouette */}
        <svg 
          viewBox="0 0 1000 500" 
          className="w-full h-auto max-h-[500px] select-none pointer-events-none opacity-40"
        >
          {/* North America */}
          <path 
            d="M 120 70 Q 180 50 250 80 T 290 140 T 240 220 T 170 240 T 110 160 Z" 
            fill="#1e293b" 
            stroke="#334155" 
            strokeWidth="1.5"
          />
          {/* South America */}
          <path 
            d="M 280 240 Q 350 260 380 320 T 330 440 T 270 380 T 270 280 Z" 
            fill="#1e293b" 
            stroke="#334155" 
            strokeWidth="1.5"
          />
          {/* Europe */}
          <path 
            d="M 460 90 Q 550 70 580 140 T 520 200 T 450 180 T 430 120 Z" 
            fill="#1e293b" 
            stroke="#334155" 
            strokeWidth="1.5"
          />
          {/* Africa */}
          <path 
            d="M 460 200 Q 560 190 590 280 T 540 400 T 470 360 T 440 250 Z" 
            fill="#1e293b" 
            stroke="#334155" 
            strokeWidth="1.5"
          />
          {/* Asia */}
          <path 
            d="M 580 100 Q 750 60 880 130 T 890 270 T 730 300 T 600 220 Z" 
            fill="#1e293b" 
            stroke="#334155" 
            strokeWidth="1.5"
          />
          {/* Australia */}
          <path 
            d="M 780 340 Q 880 330 890 400 T 820 440 T 770 380 Z" 
            fill="#1e293b" 
            stroke="#334155" 
            strokeWidth="1.5"
          />
        </svg>

        {/* Interactive Hotspot Pins */}
        <div className="absolute inset-0">
          {mapHotspots.map((spot) => {
            const countryObj = COUNTRIES_DATA.find(c => c.id === spot.id);
            const isHovered = hoveredCountry?.id === spot.id;

            return (
              <div
                key={spot.id}
                style={{ left: `${spot.x}%`, top: `${spot.y}%` }}
                className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer group"
                onMouseEnter={() => setHoveredCountry(spot)}
                onMouseLeave={() => setHoveredCountry(null)}
                onClick={() => {
                  if (countryObj && onSelectCountry) {
                    onSelectCountry(countryObj);
                  }
                }}
              >
                {/* Ping animation effect */}
                <span className="absolute -inset-1 rounded-full bg-indigo-500/40 animate-ping group-hover:bg-emerald-400/40" />

                {/* Hotspot core icon */}
                <div className={`relative px-2 py-1 rounded-lg border text-xs font-bold font-mono flex items-center gap-1.5 shadow-lg backdrop-blur-sm transition-all duration-200 ${
                  isHovered 
                    ? 'bg-indigo-600 border-indigo-400 text-white scale-125 z-30 shadow-indigo-500/40' 
                    : 'bg-slate-900/90 border-slate-700 text-slate-200 hover:border-indigo-400'
                }`}>
                  <span className="text-sm">{spot.flag}</span>
                  <span className="hidden sm:inline">{spot.name}</span>
                </div>

                {/* Floating Tooltip Card */}
                {isHovered && (
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 p-3 rounded-xl bg-slate-900 border border-slate-700 shadow-2xl text-xs z-40 pointer-events-none animate-in fade-in zoom-in-95">
                    <div className="font-bold text-white text-sm flex items-center gap-1.5">
                      <span>{spot.flag}</span>
                      <span>{spot.name}</span>
                    </div>
                    <div className="mt-1 text-indigo-400 font-mono font-semibold">
                      {spot.pop} ({spot.share})
                    </div>
                    <div className="text-slate-400 text-[11px]">
                      Density: {spot.density}/km²
                    </div>
                    <div className="mt-1.5 pt-1 border-t border-slate-800 text-[10px] text-emerald-400 font-medium">
                      Click to view state breakdowns &rarr;
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Legend Box in Bottom Corner */}
        <div className="absolute bottom-4 left-4 p-3 rounded-xl bg-slate-900/90 border border-slate-800/90 backdrop-blur-md text-xs text-slate-400 space-y-1.5">
          <div className="font-semibold text-slate-200 flex items-center gap-1.5">
            <Compass className="w-3.5 h-3.5 text-indigo-400" />
            Demographic Concentrators
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-indigo-500" />
            <span>Top Mega-Populations (&gt; 100M)</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
            <span>High Density Centers</span>
          </div>
        </div>

      </div>

    </div>
  );
};
