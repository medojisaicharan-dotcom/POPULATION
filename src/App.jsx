import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { LiveCounter } from './components/LiveCounter';
import { StatsOverview } from './components/StatsOverview';
import { CountriesAndStates } from './components/CountriesAndStates';
import { PopulationAnalytics } from './components/PopulationAnalytics';
import { InteractiveWorldMap } from './components/InteractiveWorldMap';
import { RegistrationForm } from './components/RegistrationForm';
import { CountryDetailModal } from './components/CountryDetailModal';
import { DataSourcesSection } from './components/DataSourcesSection';
import { LoginPage } from './components/LoginPage';
import { AdminDirectory } from './components/AdminDirectory';
import { COUNTRIES_DATA, GLOBAL_METRICS } from './data/worldPopulationData';
import { 
  Globe2, 
  ShieldCheck, 
  ArrowUpRight, 
  Scale, 
  Layers, 
  MapPin, 
  TrendingUp, 
  UserPlus
} from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [comparisonList, setComparisonList] = useState([]);
  const [adminUser, setAdminUser] = useState(() => {
    try {
      const stored = localStorage.getItem('gpi_admin_auth');
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });

  const handleLoginSuccess = (user) => {
    setAdminUser(user);
    setActiveTab('admin_directory');
  };

  const handleLogout = () => {
    localStorage.removeItem('gpi_admin_auth');
    setAdminUser(null);
    setActiveTab('dashboard');
  };

  // Add country to comparison list
  const handleAddToCompare = (country) => {
    if (!comparisonList.find(c => c.id === country.id)) {
      setComparisonList(prev => [...prev.slice(-3), country]); // keep at most 4
    }
    setActiveTab('analytics');
  };

  const handleRemoveFromCompare = (countryId) => {
    setComparisonList(prev => prev.filter(c => c.id !== countryId));
  };

  return (
    <div className="min-h-screen bg-[#0b0f19] text-slate-100 flex flex-col selection:bg-indigo-500 selection:text-white">
      
      {/* Top Navigation */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        adminUser={adminUser}
        onOpenLogin={() => setActiveTab('login')}
        onLogout={handleLogout}
      />

      {/* Main Content Viewport */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        
        {/* TAB 1: DASHBOARD */}
        {activeTab === 'dashboard' && (
          <div className="space-y-8 animate-in fade-in duration-300">
            {/* Live Global Population Counter Banner */}
            <LiveCounter />

            {/* Main KPI Stats & Recharts Visualizations */}
            <StatsOverview 
              onSelectCountry={(country) => setSelectedCountry(country)} 
            />

            {/* Quick Action Navigation Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
              <div 
                onClick={() => setActiveTab('countries')}
                className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-indigo-500/40 cursor-pointer transition-all hover:scale-[1.01] group"
              >
                <div className="flex items-center justify-between">
                  <div className="p-2.5 rounded-xl bg-indigo-500/10 text-indigo-400 group-hover:scale-110 transition-transform">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-slate-500 group-hover:text-indigo-400 transition-colors" />
                </div>
                <h3 className="font-bold text-white text-base mt-3">Countries & States Directory</h3>
                <p className="text-xs text-slate-400 mt-1">
                  Explore official census populations for all 195+ sovereign nations and their states.
                </p>
              </div>

              <div 
                onClick={() => setActiveTab('analytics')}
                className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-emerald-500/40 cursor-pointer transition-all hover:scale-[1.01] group"
              >
                <div className="flex items-center justify-between">
                  <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400 group-hover:scale-110 transition-transform">
                    <TrendingUp className="w-5 h-5" />
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-slate-500 group-hover:text-emerald-400 transition-colors" />
                </div>
                <h3 className="font-bold text-white text-base mt-3">Analytics & Projections</h3>
                <p className="text-xs text-slate-400 mt-1">
                  Compare countries side-by-side and examine UN forecasts up to the year 2100.
                </p>
              </div>

              <div 
                onClick={() => setActiveTab('register')}
                className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-purple-500/40 cursor-pointer transition-all hover:scale-[1.01] group"
              >
                <div className="flex items-center justify-between">
                  <div className="p-2.5 rounded-xl bg-purple-500/10 text-purple-400 group-hover:scale-110 transition-transform">
                    <UserPlus className="w-5 h-5" />
                  </div>
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                </div>
                <h3 className="font-bold text-white text-base mt-3">Public User Registration</h3>
                <p className="text-xs text-slate-400 mt-1">
                  Submit demographic profile details securely stored in PostgreSQL.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: COUNTRIES & STATES */}
        {activeTab === 'countries' && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <div className="border-b border-slate-800 pb-4">
              <h1 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2">
                <MapPin className="w-6 h-6 text-indigo-400" />
                Global Countries & States Directory
              </h1>
              <p className="text-xs text-slate-400 mt-1">
                Official national population figures, growth indices, densities, and subnational state/province datasets
              </p>
            </div>

            <CountriesAndStates
              onSelectCountry={(country) => setSelectedCountry(country)}
              onCompareCountry={handleAddToCompare}
            />
          </div>
        )}

        {/* TAB 3: POPULATION ANALYTICS */}
        {activeTab === 'analytics' && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <div className="border-b border-slate-800 pb-4">
              <h1 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2">
                <TrendingUp className="w-6 h-6 text-indigo-400" />
                Population Analytics & Forecasts
              </h1>
              <p className="text-xs text-slate-400 mt-1">
                Comparative analysis, density distributions, and United Nations medium fertility projections
              </p>
            </div>

            <PopulationAnalytics
              comparisonList={comparisonList}
              onRemoveCompare={handleRemoveFromCompare}
              onAddCompare={(country) => setComparisonList(prev => [...prev.slice(-3), country])}
            />
          </div>
        )}

        {/* TAB 4: INTERACTIVE WORLD MAP */}
        {activeTab === 'map' && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <InteractiveWorldMap
              onSelectCountry={(country) => setSelectedCountry(country)}
            />
          </div>
        )}

        {/* TAB 5: PUBLIC USER REGISTRATION */}
        {activeTab === 'register' && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <RegistrationForm />
          </div>
        )}

        {/* TAB 6: DATA SOURCES & METHODOLOGY */}
        {activeTab === 'sources' && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <DataSourcesSection />
          </div>
        )}

        {/* TAB 7: AUTHENTICATION LOGIN PAGE */}
        {activeTab === 'login' && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <LoginPage
              onLoginSuccess={handleLoginSuccess}
              onCancel={() => setActiveTab('dashboard')}
            />
          </div>
        )}

        {/* TAB 8: PROTECTED ADMIN DIRECTORY */}
        {activeTab === 'admin_directory' && (
          <div className="space-y-6 animate-in fade-in duration-300">
            {adminUser ? (
              <AdminDirectory
                adminUser={adminUser}
                onLogout={handleLogout}
              />
            ) : (
              <LoginPage
                onLoginSuccess={handleLoginSuccess}
                onCancel={() => setActiveTab('dashboard')}
              />
            )}
          </div>
        )}

      </main>

      {/* Global Interactive Country Detail Drawer / Modal */}
      {selectedCountry && (
        <CountryDetailModal
          country={selectedCountry}
          onClose={() => setSelectedCountry(null)}
          onCompare={handleAddToCompare}
        />
      )}

      {/* Modern Executive Footer */}
      <footer className="border-t border-slate-800/80 bg-slate-950/80 mt-16 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            
            <div className="flex items-center gap-3">
              <div className="w-7 h-7 rounded-lg bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center">
                <Globe2 className="w-4 h-4 text-indigo-400" />
              </div>
              <div>
                <span className="font-semibold text-sm text-white">Global Population Intelligence</span>
                <p className="text-[11px] text-slate-500">
                  Data Sources: United Nations DESA, World Bank Open Data & Official Census Bureaus
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4 text-xs text-slate-400">
              <button 
                onClick={() => setActiveTab('sources')} 
                className="hover:text-slate-200 transition-colors"
              >
                Methodology & Sources
              </button>
              <span>•</span>
              <button 
                onClick={() => setActiveTab(adminUser ? 'admin_directory' : 'login')} 
                className="hover:text-slate-200 transition-colors"
              >
                {adminUser ? 'Admin Portal' : 'Admin Login'}
              </button>
              <span>•</span>
              <span className="text-slate-500">Official Reference Sources</span>
            </div>

          </div>
        </div>
      </footer>

    </div>
  );
}
