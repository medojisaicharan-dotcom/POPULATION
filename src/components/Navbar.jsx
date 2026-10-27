import React, { useState, useRef, useEffect } from 'react';
import { 
  Globe2, 
  BarChart3, 
  MapPin, 
  TrendingUp, 
  UserPlus, 
  Info,
  LogIn,
  LogOut,
  ShieldCheck,
  UserCheck,
  ChevronDown
} from 'lucide-react';

export const Navbar = ({ activeTab, setActiveTab, adminUser, onOpenLogin, onLogout }) => {
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const userMenuRef = useRef(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setUserMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
    { id: 'countries', label: 'Countries & States', icon: MapPin },
    { id: 'analytics', label: 'Analytics & Projections', icon: TrendingUp },
    { id: 'map', label: 'World Map', icon: Globe2 },
    { id: 'register', label: 'Public Registration', icon: UserPlus },
    { id: 'sources', label: 'Data Sources', icon: Info },
  ];

  return (
    <header className="sticky top-0 z-40 bg-slate-950/85 backdrop-blur-md border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          
          {/* Logo & Brand */}
          <div 
            onClick={() => setActiveTab('dashboard')} 
            className="flex items-center gap-3 cursor-pointer group select-none shrink-0"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-blue-500 to-emerald-400 p-0.5 shadow-lg shadow-indigo-500/20 group-hover:scale-105 transition-transform">
              <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                <Globe2 className="w-5 h-5 text-indigo-400 animate-pulse" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-lg tracking-tight bg-gradient-to-r from-white via-slate-100 to-slate-400 bg-clip-text text-transparent">
                  Global Population Intelligence
                </span>
              </div>
              <p className="text-xs text-slate-400 hidden sm:block">
                Demographic Intelligence & Census Data Platform
              </p>
            </div>
          </div>

          {/* Navigation Links - Desktop */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-sm font-medium transition-all ${
                    isActive
                      ? 'bg-indigo-600/15 text-indigo-400 border border-indigo-500/30 shadow-sm'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-indigo-400' : 'text-slate-400'}`} />
                  {item.label}
                  {item.id === 'register' && (
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Header: Authentication / User Profile Menu */}
          <div className="flex items-center gap-2.5 shrink-0">
            {adminUser ? (
              <div className="relative" ref={userMenuRef}>
                {/* Clicking on user mail opens dropdown with sign out option */}
                <button
                  onClick={() => setUserMenuOpen((prev) => !prev)}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-medium border transition-all cursor-pointer select-none ${
                    userMenuOpen
                      ? 'bg-slate-800 border-indigo-500/50 text-white shadow-lg ring-2 ring-indigo-500/20'
                      : 'bg-slate-900 hover:bg-slate-800/90 border-slate-700 hover:border-slate-600 text-slate-200 shadow-sm'
                  }`}
                  title="Click to view account and sign out"
                >
                  <div className="w-5 h-5 rounded-full bg-gradient-to-tr from-indigo-600 to-blue-500 flex items-center justify-center text-[10px] font-bold text-white shadow-inner">
                    {adminUser.email ? adminUser.email[0].toUpperCase() : 'U'}
                  </div>
                  <span className="max-w-[130px] sm:max-w-[180px] truncate text-slate-200 font-semibold">
                    {adminUser.email}
                  </span>
                  <ChevronDown
                    className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-200 ${
                      userMenuOpen ? 'rotate-180 text-indigo-400' : ''
                    }`}
                  />
                </button>

                {/* Dropdown Menu when clicked */}
                {userMenuOpen && (
                  <div className="absolute right-0 mt-2 w-64 rounded-2xl bg-slate-900/95 backdrop-blur-xl border border-slate-800 shadow-2xl shadow-black/80 py-2 z-50 animate-in fade-in zoom-in-95 duration-150">
                    {/* User Info Header */}
                    <div className="px-3.5 py-2.5 border-b border-slate-800/80">
                      <p className="text-[10px] font-medium text-slate-400 uppercase tracking-wider">Account</p>
                      <p className="text-xs font-semibold text-white truncate mt-0.5" title={adminUser.email}>
                        {adminUser.email}
                      </p>
                      <div className="mt-2 inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md text-[10px] font-semibold bg-indigo-500/15 border border-indigo-500/30 text-indigo-300">
                        {adminUser.role === 'admin' ? (
                          <>
                            <ShieldCheck className="w-3 h-3 text-emerald-400" />
                            <span>Administrator</span>
                          </>
                        ) : (
                          <>
                            <UserCheck className="w-3 h-3 text-indigo-400" />
                            <span>Verified Member</span>
                          </>
                        )}
                      </div>
                    </div>

                    {/* Actions List */}
                    <div className="p-1 space-y-0.5">
                      {adminUser.role === 'admin' && (
                        <button
                          onClick={() => {
                            setActiveTab('admin_directory');
                            setUserMenuOpen(false);
                          }}
                          className="w-full flex items-center gap-2 px-3 py-2 text-xs font-medium text-slate-300 hover:text-white hover:bg-slate-800/70 rounded-lg transition-colors cursor-pointer text-left"
                        >
                          <ShieldCheck className="w-4 h-4 text-emerald-400" />
                          <span>Admin Portal</span>
                        </button>
                      )}

                      {/* Sign Out Option */}
                      <button
                        onClick={() => {
                          setUserMenuOpen(false);
                          onLogout();
                        }}
                        className="w-full flex items-center gap-2 px-3 py-2 text-xs font-semibold text-rose-400 hover:text-rose-300 hover:bg-rose-950/40 rounded-lg transition-colors cursor-pointer text-left"
                      >
                        <LogOut className="w-4 h-4 text-rose-400" />
                        <span>Sign Out</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={onOpenLogin}
                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 hover:text-white border border-slate-700 text-xs font-semibold transition-all shadow-sm cursor-pointer"
              >
                <LogIn className="w-3.5 h-3.5 text-indigo-400" />
                <span>Sign In</span>
              </button>
            )}
          </div>

        </div>

        {/* Mobile Navigation Bar */}
        <div className="md:hidden flex items-center overflow-x-auto py-2 gap-1.5 border-t border-slate-800/80 no-scrollbar">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
                  isActive
                    ? 'bg-indigo-600/20 text-indigo-300 border border-indigo-500/30'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                {item.label}
              </button>
            );
          })}
          {adminUser && (
            <>
              {adminUser.role === 'admin' && (
                <button
                  onClick={() => setActiveTab('admin_directory')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                    activeTab === 'admin_directory'
                      ? 'bg-emerald-600 text-white'
                      : 'text-emerald-400 bg-emerald-950/40 border border-emerald-500/30'
                  }`}
                >
                  <ShieldCheck className="w-3.5 h-3.5" />
                  Admin
                </button>
              )}
              <button
                onClick={onLogout}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap text-rose-400 bg-rose-950/40 border border-rose-500/30 hover:bg-rose-900/50 transition-all"
              >
                <LogOut className="w-3.5 h-3.5" />
                Sign Out
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
};
