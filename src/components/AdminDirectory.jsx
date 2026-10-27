import React, { useState, useEffect } from 'react';
import { 
  Database, 
  Search, 
  RefreshCw, 
  Download, 
  UserCheck, 
  LogOut, 
  ShieldCheck, 
  Mail, 
  MapPin, 
  Trash2,
  Filter
} from 'lucide-react';
import { fetchRegistrations } from '../lib/supabase';

export const AdminDirectory = ({ adminUser, onLogout }) => {
  const [registrations, setRegistrations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCountryFilter, setSelectedCountryFilter] = useState('All');

  const loadData = async () => {
    setIsLoading(true);
    try {
      const res = await fetchRegistrations();
      if (res && res.data) {
        setRegistrations(res.data);
      }
    } catch (err) {
      console.warn('Failed to fetch admin directory:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const countries = ['All', ...new Set(registrations.map(r => r.country).filter(Boolean))];

  const filtered = registrations.filter(r => {
    const matchesSearch = 
      (r.full_name && r.full_name.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (r.email && r.email.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (r.state && r.state.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesCountry = selectedCountryFilter === 'All' || r.country === selectedCountryFilter;
    return matchesSearch && matchesCountry;
  });

  const handleExportCSV = () => {
    const headers = ['Full Name', 'Email Address', 'Gender', 'Country', 'State', 'Registered At'];
    const rows = filtered.map(r => [
      `"${r.full_name || ''}"`,
      `"${r.email || ''}"`,
      `"${r.gender || ''}"`,
      `"${r.country || ''}"`,
      `"${r.state || ''}"`,
      `"${r.created_at || ''}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `registered_demographics_admin_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      
      {/* Admin Top Header Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-br from-indigo-950/70 via-slate-900 to-slate-950 border border-indigo-500/30 shadow-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/15 border border-indigo-500/30 text-indigo-300 text-xs font-semibold mb-2">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            PROTECTED ADMIN CONSOLE
          </div>
          <h1 className="text-2xl font-bold text-white tracking-tight">
            Registered Demographics Directory
          </h1>
          <p className="text-xs text-slate-300 mt-1">
            Logged in as <span className="font-semibold text-white">{adminUser?.email || 'Admin'}</span> • Total entries: {registrations.length}
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={handleExportCSV}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold border border-slate-700 transition-colors"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export CSV</span>
          </button>

          <button
            onClick={onLogout}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-rose-950/40 hover:bg-rose-900/50 text-rose-300 text-xs font-semibold border border-rose-500/30 transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>
        </div>
      </div>

      {/* Controls & Search */}
      <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-xl space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-2.5 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search by full name, email, or state..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
            />
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400 flex items-center gap-1">
              <Filter className="w-3.5 h-3.5" /> Country:
            </span>
            <select
              value={selectedCountryFilter}
              onChange={(e) => setSelectedCountryFilter(e.target.value)}
              className="px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white focus:outline-none"
            >
              {countries.map(c => (
                <option key={c} value={c} className="bg-slate-900">{c}</option>
              ))}
            </select>

            <button
              onClick={loadData}
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300"
              title="Refresh"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin' : ''}`} />
            </button>
          </div>

        </div>
      </div>

      {/* Directory Table */}
      <div className="rounded-2xl bg-slate-900/80 border border-slate-800 shadow-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-slate-800 bg-slate-950/70 text-slate-400 uppercase tracking-wider text-[10px]">
                <th className="py-3 px-4">Full Name</th>
                <th className="py-3 px-4">Email Address</th>
                <th className="py-3 px-4">Gender</th>
                <th className="py-3 px-4">Country</th>
                <th className="py-3 px-4">State / Province</th>
                <th className="py-3 px-4 text-right">Submitted Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-sans">
              {filtered.map((user) => (
                <tr key={user.id} className="hover:bg-slate-800/40 transition-colors">
                  <td className="py-3 px-4 font-semibold text-white">
                    {user.full_name}
                  </td>
                  <td className="py-3 px-4 font-mono text-slate-300">
                    {user.email}
                  </td>
                  <td className="py-3 px-4 text-slate-400">
                    {user.gender}
                  </td>
                  <td className="py-3 px-4 text-indigo-300 font-medium">
                    {user.country}
                  </td>
                  <td className="py-3 px-4 text-slate-300">
                    {user.state}
                  </td>
                  <td className="py-3 px-4 text-right text-slate-400 font-mono text-[11px]">
                    {user.created_at ? new Date(user.created_at).toLocaleString() : 'Recent'}
                  </td>
                </tr>
              ))}

              {filtered.length === 0 && (
                <tr>
                  <td colSpan="6" className="text-center py-12 text-slate-500">
                    {isLoading ? 'Loading records...' : 'No demographic registrations found.'}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
