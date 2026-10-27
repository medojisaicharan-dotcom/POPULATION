import React, { useState } from 'react';
import { 
  X, 
  Database, 
  CheckCircle2, 
  AlertCircle, 
  Copy, 
  ExternalLink, 
  ShieldCheck, 
  KeyRound, 
  Save, 
  RefreshCw 
} from 'lucide-react';
import { 
  supabaseUrl, 
  supabaseAnonKey, 
  isSupabaseConfigured, 
  testSupabaseConnection 
} from '../lib/supabase';

export const SupabaseConfigModal = ({ isOpen, onClose }) => {
  const [urlInput, setUrlInput] = useState(
    typeof window !== 'undefined' ? localStorage.getItem('GMI_SUPABASE_URL') || supabaseUrl || '' : ''
  );
  const [keyInput, setKeyInput] = useState(
    typeof window !== 'undefined' ? localStorage.getItem('GMI_SUPABASE_ANON_KEY') || supabaseAnonKey || '' : ''
  );
  const [isTesting, setIsTesting] = useState(false);
  const [testResult, setTestResult] = useState(null);
  const [copiedSql, setCopiedSql] = useState(false);

  if (!isOpen) return null;

  const handleSaveAndTest = async () => {
    if (!urlInput.trim() || !keyInput.trim()) {
      setTestResult({
        success: false,
        message: 'Please provide both Supabase Project URL and Anon Key.'
      });
      return;
    }

    setIsTesting(true);
    setTestResult(null);

    const check = await testSupabaseConnection(urlInput.trim(), keyInput.trim());
    setIsTesting(false);

    if (check.connected) {
      localStorage.setItem('GMI_SUPABASE_URL', urlInput.trim());
      localStorage.setItem('GMI_SUPABASE_ANON_KEY', keyInput.trim());
      setTestResult({
        success: true,
        message: 'Successfully connected to Supabase PostgreSQL database!'
      });
      setTimeout(() => {
        window.location.reload();
      }, 1200);
    } else {
      setTestResult({
        success: false,
        message: `Connection failed: ${check.message}. Ensure table "user_registrations" exists or run the SQL script below.`
      });
    }
  };

  const handleCopySql = () => {
    const sql = `-- Supabase PostgreSQL Schema for Global Population Intelligence
CREATE TABLE IF NOT EXISTS public.user_registrations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    full_name TEXT NOT NULL CHECK (char_length(full_name) >= 2),
    email TEXT NOT NULL CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'),
    gender TEXT NOT NULL,
    country TEXT NOT NULL,
    state TEXT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

ALTER TABLE public.user_registrations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public anonymous submissions" 
ON public.user_registrations 
FOR INSERT TO anon, authenticated
WITH CHECK (true);

CREATE POLICY "Allow public reading of registrations" 
ON public.user_registrations 
FOR SELECT TO anon, authenticated
USING (true);`;

    navigator.clipboard.writeText(sql);
    setCopiedSql(true);
    setTimeout(() => setCopiedSql(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-2xl rounded-2xl bg-slate-900 border border-slate-700 shadow-2xl p-6 space-y-6 animate-in fade-in zoom-in-95">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
              <Database className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">Supabase PostgreSQL Connection</h2>
              <p className="text-xs text-slate-400">
                Configure cloud PostgreSQL credentials & security policies
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Current Status Pill */}
        <div className={`p-4 rounded-xl border flex items-center justify-between text-xs ${
          isSupabaseConfigured
            ? 'bg-emerald-950/40 border-emerald-500/30 text-emerald-300'
            : 'bg-amber-950/40 border-amber-500/30 text-amber-300'
        }`}>
          <div className="flex items-center gap-2.5">
            {isSupabaseConfigured ? (
              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
            ) : (
              <AlertCircle className="w-5 h-5 text-amber-400 shrink-0" />
            )}
            <div>
              <span className="font-semibold block text-sm">
                {isSupabaseConfigured ? 'Supabase Database Connected' : 'Configuration Required / Demo Persistence Mode'}
              </span>
              <p className="text-[11px] text-slate-400 mt-0.5">
                {isSupabaseConfigured 
                  ? 'All registrations are being saved permanently to your Supabase PostgreSQL database.' 
                  : 'Enter your credentials below or configure them in your .env file to enable live cloud storage.'}
              </p>
            </div>
          </div>
          <span className={`w-2.5 h-2.5 rounded-full ${isSupabaseConfigured ? 'bg-emerald-400 shadow-[0_0_8px_#34d399]' : 'bg-amber-400'}`} />
        </div>

        {/* Credentials Inputs */}
        <div className="space-y-4 text-xs">
          <div>
            <label className="block text-slate-300 font-semibold mb-1">
              Supabase Project URL (e.g., https://your-project.supabase.co)
            </label>
            <input
              type="text"
              placeholder="https://xyzcompany.supabase.co"
              value={urlInput}
              onChange={(e) => setUrlInput(e.target.value)}
              className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white font-mono text-xs focus:outline-none focus:border-indigo-500"
            />
          </div>

          <div>
            <label className="block text-slate-300 font-semibold mb-1">
              Supabase Anon / Public API Key
            </label>
            <input
              type="password"
              placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
              value={keyInput}
              onChange={(e) => setKeyInput(e.target.value)}
              className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white font-mono text-xs focus:outline-none focus:border-indigo-500"
            />
          </div>

          {testResult && (
            <div className={`p-3 rounded-xl text-xs flex items-center gap-2 ${
              testResult.success 
                ? 'bg-emerald-950/50 border border-emerald-500/30 text-emerald-200' 
                : 'bg-rose-950/50 border border-rose-500/30 text-rose-200'
            }`}>
              {testResult.success ? <CheckCircle2 className="w-4 h-4 text-emerald-400" /> : <AlertCircle className="w-4 h-4 text-rose-400" />}
              <span>{testResult.message}</span>
            </div>
          )}

          <div className="flex items-center justify-between pt-2">
            <button
              onClick={handleSaveAndTest}
              disabled={isTesting}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs shadow-md disabled:opacity-50 transition-all cursor-pointer"
            >
              {isTesting ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Save className="w-3.5 h-3.5" />}
              <span>Test & Save Connection</span>
            </button>

            <a
              href="https://supabase.com/dashboard"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 text-xs text-indigo-400 hover:text-indigo-300"
            >
              <span>Supabase Dashboard</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* Database Table SQL instructions */}
        <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2 text-xs">
          <div className="flex items-center justify-between">
            <span className="font-semibold text-slate-200 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              PostgreSQL Table Script (`supabase_schema.sql`)
            </span>
            <button
              onClick={handleCopySql}
              className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-[11px]"
            >
              <Copy className="w-3 h-3" />
              <span>{copiedSql ? 'Copied!' : 'Copy SQL'}</span>
            </button>
          </div>
          <p className="text-slate-400 text-[11px]">
            Run this in your Supabase SQL Editor. It creates the <code>user_registrations</code> table and configures Row Level Security (RLS) policies allowing public submissions.
          </p>
        </div>

      </div>
    </div>
  );
};
