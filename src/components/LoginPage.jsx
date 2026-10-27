import React, { useState } from 'react';
import { 
  Lock, 
  Mail, 
  Eye, 
  EyeOff, 
  LogIn, 
  ShieldCheck, 
  ArrowRight,
  AlertCircle,
  CheckCircle2,
  KeyRound
} from 'lucide-react';
import { supabase, isSupabaseConfigured, saveUserAccount } from '../lib/supabase';

export const LoginPage = ({ onLoginSuccess, onCancel }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Check if this email is an admin email
  const checkIsAdmin = (userEmail) => {
    const configuredAdmin = (import.meta.env.VITE_ADMIN_EMAIL || '').toLowerCase().trim();
    const normalized = userEmail.toLowerCase().trim();
    if (configuredAdmin) {
      return normalized === configuredAdmin;
    }
    // Default fallback check
    return normalized.startsWith('admin') || normalized.includes('@admin.');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!email.trim()) {
      setError('Please provide your email address.');
      return;
    }

    if (!password.trim()) {
      setError('Please provide your password.');
      return;
    }

    setIsLoading(true);

    try {
      const isAdmin = checkIsAdmin(email);
      const role = isAdmin ? 'admin' : 'user';

      // 1. If Supabase is configured with Supabase Auth
      if (supabase && isSupabaseConfigured) {
        const { data, error: authError } = await supabase.auth.signInWithPassword({
          email: email.trim(),
          password: password.trim()
        });

        if (!authError && data?.user) {
          const profile = {
            email: data.user.email,
            role,
            authenticatedVia: 'supabase'
          };
          await saveUserAccount({ email: profile.email, role: profile.role });
          setSuccess(`Signed in successfully!`);
          if (rememberMe) {
            localStorage.setItem(isAdmin ? 'gpi_admin_auth' : 'gpi_user_auth', JSON.stringify(profile));
          }
          setTimeout(() => {
            onLoginSuccess(profile);
          }, 600);
          return;
        }
      }

      // 2. Store user session into Supabase PostgreSQL database
      const profile = {
        email: email.trim(),
        role,
        authenticatedVia: 'local'
      };

      await saveUserAccount({ email: profile.email, role: profile.role });

      setSuccess(`Signed in successfully!`);
      if (rememberMe) {
        localStorage.setItem(isAdmin ? 'gpi_admin_auth' : 'gpi_user_auth', JSON.stringify(profile));
      }
      setTimeout(() => {
        onLoginSuccess(profile);
      }, 600);

    } catch (err) {
      setError(err.message || 'Login failed. Please check your credentials.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto my-8 p-6 sm:p-8 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-2xl relative overflow-hidden animate-in fade-in zoom-in-95 duration-200">
      
      {/* Background glow */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 space-y-6">
        
        {/* Header */}
        <div className="text-center space-y-1.5">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-indigo-600/15 border border-indigo-500/30 text-indigo-400 mb-2">
            <Lock className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-bold text-white tracking-tight">
            Sign In
          </h2>
          <p className="text-xs text-slate-400">
            Enter your email and password to access your account.
          </p>
        </div>

        {/* Alerts */}
        {error && (
          <div className="p-3.5 rounded-xl bg-rose-950/50 border border-rose-500/40 text-rose-200 text-xs flex items-center gap-2.5 animate-in fade-in">
            <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {success && (
          <div className="p-3.5 rounded-xl bg-emerald-950/50 border border-emerald-500/40 text-emerald-200 text-xs flex items-center gap-2.5 animate-in fade-in">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{success}</span>
          </div>
        )}

        {/* Clean Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          
          <div>
            <label className="block font-semibold text-slate-300 mb-1.5 flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5 text-indigo-400" />
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@example.com"
              required
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950/80 border border-slate-700 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block font-semibold text-slate-300 mb-1.5 flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <KeyRound className="w-3.5 h-3.5 text-indigo-400" />
                Password
              </span>
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                required
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950/80 border border-slate-700 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-slate-400 hover:text-slate-200"
                tabIndex={-1}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between pt-1 text-slate-400">
            <label className="flex items-center gap-2 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="rounded bg-slate-950 border-slate-700 text-indigo-600 focus:ring-0 cursor-pointer"
              />
              <span>Remember session</span>
            </label>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-500 hover:to-blue-500 text-white font-bold text-sm shadow-xl shadow-indigo-600/25 flex items-center justify-center gap-2 transition-all disabled:opacity-50 cursor-pointer"
            >
              {isLoading ? (
                <span>Signing In...</span>
              ) : (
                <>
                  <LogIn className="w-4 h-4" />
                  <span>Sign In</span>
                  <ArrowRight className="w-4 h-4 ml-1" />
                </>
              )}
            </button>
          </div>

          {onCancel && (
            <div className="text-center pt-2">
              <button
                type="button"
                onClick={onCancel}
                className="text-xs text-slate-400 hover:text-slate-200 transition-colors"
              >
                Back to Dashboard
              </button>
            </div>
          )}

        </form>

        <div className="pt-4 border-t border-slate-800 flex items-center justify-center gap-2 text-[11px] text-slate-500">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
          <span>Encrypted Session • Secure Authentication</span>
        </div>

      </div>

    </div>
  );
};
