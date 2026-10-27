import React from 'react';
import { ShieldCheck, BookOpen, ExternalLink, CheckCircle, Database, Layers, FileText } from 'lucide-react';
import { GLOBAL_METRICS } from '../data/worldPopulationData';

export const DataSourcesSection = () => {
  const sources = [
    {
      institution: "United Nations Department of Economic and Social Affairs (UN DESA)",
      dataset: "World Population Prospects: The 2024 Revision (WPP 2024)",
      description: "Comprehensive demographic estimates and medium fertility projections for 237 countries and areas from 1950 to 2100.",
      referenceYear: "2024 Revision",
      url: "https://population.un.org/wpp/"
    },
    {
      institution: "World Bank Open Data",
      dataset: "World Development Indicators (WDI) - Indicator SP.POP.TOTL",
      description: "Total population, annual growth rates, and urbanization percentages derived from official national census data.",
      referenceYear: "2023 - 2024",
      url: "https://data.worldbank.org/indicator/SP.POP.TOTL"
    },
    {
      institution: "United States Census Bureau",
      dataset: "National & State Population Estimates (Vintage 2024)",
      description: "Official resident population for the 50 states, District of Columbia, and Puerto Rico based on annual demographic components of change.",
      referenceYear: "2024",
      url: "https://www.census.gov/data/tables/time-series/demo/popest/2020s-state-total.html"
    },
    {
      institution: "Office of the Registrar General & Census Commissioner, India",
      dataset: "Ministry of Health & Family Welfare (MoHFW) National Population Projections",
      description: "State and Union Territory populations based on official National Commission on Population report projections.",
      referenceYear: "2024",
      url: "https://censusindia.gov.in/"
    },
    {
      institution: "National Bureau of Statistics of China (NBS)",
      dataset: "China Statistical Yearbook & Annual Population Communiqué",
      description: "Official provincial population registers and census division figures for mainland China, special administrative regions, and municipalities.",
      referenceYear: "2024",
      url: "http://www.stats.gov.cn/english/"
    },
    {
      institution: "European Union & National Statistical Institutes",
      dataset: "Eurostat, Destatis (Germany), INSEE (France), Istat (Italy), INE (Spain), ONS (UK)",
      description: "Official subnational state (Länder), regional, and autonomous community census estimates.",
      referenceYear: "2023 - 2024",
      url: "https://ec.europa.eu/eurostat"
    }
  ];

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      
      {/* Integrity Pledge Banner */}
      <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl space-y-3">
        <div className="flex items-center gap-2.5 text-emerald-400 font-semibold text-sm">
          <ShieldCheck className="w-5 h-5 text-emerald-400" />
          <span>Demographic Data Integrity Pledge</span>
        </div>
        <h2 className="text-xl font-bold text-white tracking-tight">
          Reliable, Empirical Global Population Datasets
        </h2>
        <p className="text-xs text-slate-300 leading-relaxed">
          In strict compliance with statistical reporting standards, <strong>Global Population Intelligence</strong> does not invent or synthesize arbitrary population counts. All national metrics and subnational state/provincial figures are derived directly from the United Nations World Population Prospects (2024 Revision), the World Bank Open Data initiative, and official national statistical offices.
        </p>
      </div>

      {/* Official Data Source Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {sources.map((src, idx) => (
          <div key={idx} className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-lg flex flex-col justify-between">
            <div>
              <div className="flex items-start justify-between gap-2">
                <span className="text-xs font-semibold text-indigo-400 font-mono uppercase tracking-wider">
                  {src.referenceYear}
                </span>
                <span className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-400">
                  <CheckCircle className="w-3.5 h-3.5" />
                </span>
              </div>
              <h3 className="text-sm font-bold text-white mt-1.5">{src.institution}</h3>
              <p className="text-xs text-slate-300 font-medium mt-1">{src.dataset}</p>
              <p className="text-xs text-slate-400 mt-2 leading-relaxed">{src.description}</p>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-800/80">
              <a
                href={src.url}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 text-xs text-indigo-400 hover:text-indigo-300 transition-colors font-medium"
              >
                <span>Institutional Portal</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* Methodology & Statistical Definitions */}
      <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-xl space-y-4">
        <h3 className="text-base font-bold text-white flex items-center gap-2">
          <BookOpen className="w-4 h-4 text-indigo-400" />
          Statistical Definitions & Calculation Methodology
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-slate-300">
          <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800">
            <span className="font-semibold text-white block mb-1">Population Density</span>
            <p className="text-slate-400 leading-relaxed">
              Calculated as total de facto resident population divided by land area in square kilometers (excluding inland water bodies where national accounts distinguish).
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800">
            <span className="font-semibold text-white block mb-1">Total Fertility Rate (TFR)</span>
            <p className="text-slate-400 leading-relaxed">
              The average number of live children that would be born to a female during her childbearing years according to age-specific fertility schedules.
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800">
            <span className="font-semibold text-white block mb-1">Annual Growth Rate</span>
            <p className="text-slate-400 leading-relaxed">
              Exponential growth rate calculated across intercensal cycles incorporating crude birth rates, crude death rates, and net cross-border migration.
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800">
            <span className="font-semibold text-white block mb-1">Subnational Disaggregation</span>
            <p className="text-slate-400 leading-relaxed">
              First-order administrative divisions (states, provinces, regions, autonomous communities, and federal territories) sourced from respective national census bureaus.
            </p>
          </div>
        </div>
      </div>

    </div>
  );
};
