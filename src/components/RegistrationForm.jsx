import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { 
  UserPlus, 
  CheckCircle2, 
  AlertCircle, 
  ShieldCheck, 
  Mail, 
  User, 
  MapPin, 
  Layers, 
  Sparkles,
  ArrowRight,
  RefreshCw,
  ExternalLink,
  Database
} from 'lucide-react';
import { COUNTRIES_DATA } from '../data/worldPopulationData';
import { getStateNamesForCountry } from '../data/statesData';
import { saveRegistration, isSupabaseConfigured, supabase } from '../lib/supabase';

export const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    gender: '',
    country: '',
    state: ''
  });

  const [availableStates, setAvailableStates] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedback, setFeedback] = useState(null); // { type: 'success' | 'error', message: string }
  const [dbStatus, setDbStatus] = useState('checking'); // 'checking' | 'ready' | 'missing_tables' | 'no_config'

  // Check Supabase tables on mount
  useEffect(() => {
    const checkDb = async () => {
      if (!isSupabaseConfigured || !supabase) {
        setDbStatus('no_config');
        return;
      }
      try {
        const { error } = await supabase
          .from('user_registrations')
          .select('count', { count: 'exact', head: true });
        if (!error) {
          setDbStatus('ready');
        } else if (
          error.message?.includes('schema cache') ||
          error.message?.includes('does not exist') ||
          error.message?.includes('relation')
        ) {
          setDbStatus('missing_tables');
        } else {
          setDbStatus('ready'); // other errors (like RLS) mean table exists
        }
      } catch {
        setDbStatus('no_config');
      }
    };
    checkDb();
  }, []);

  // When Country changes, automatically update the State dropdown options!
  useEffect(() => {
    if (formData.country) {
      const states = getStateNamesForCountry(formData.country);
      setAvailableStates(states);
      // Reset state if current selection is not valid for new country
      setFormData(prev => ({ ...prev, state: '' }));
    } else {
      setAvailableStates([]);
      setFormData(prev => ({ ...prev, state: '' }));
    }
  }, [formData.country]);

  // Form input change handler
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (feedback) setFeedback(null);
  };

  // Form submission handler
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Client-side validations
    if (!formData.fullName.trim() || formData.fullName.trim().length < 2) {
      setFeedback({ type: 'error', message: 'Full Name must be at least 2 characters.' });
      return;
    }

    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    if (!emailRegex.test(formData.email.trim())) {
      setFeedback({ type: 'error', message: 'Please enter a valid email address.' });
      return;
    }

    if (!formData.gender) {
      setFeedback({ type: 'error', message: 'Please select your Gender.' });
      return;
    }

    if (!formData.country) {
      setFeedback({ type: 'error', message: 'Please select your Country.' });
      return;
    }

    if (!formData.state) {
      setFeedback({ type: 'error', message: 'Please select your State or Territory.' });
      return;
    }

    setIsSubmitting(true);
    setFeedback(null);

    try {
      const result = await saveRegistration(formData);

      if (result.syncedToSupabase) {
        // Successfully saved to Supabase — trigger celebratory confetti
        try {
          confetti({ particleCount: 80, spread: 70, origin: { y: 0.6 } });
        } catch {
          // ignore
        }

        setFeedback({
          type: 'success',
          message: '✅ Registration saved to Supabase! Your demographic details are now in the database.'
        });

        // Reset form fields
        setFormData({ fullName: '', email: '', gender: '', country: '', state: '' });
      } else if (result.savedLocally && result.supabaseError) {
        // Saved locally but NOT in Supabase — show specific error
        setFeedback({
          type: 'error',
          message: result.supabaseError
        });
        // If tables are missing, update dbStatus banner
        if (
          result.supabaseError.includes('schema cache') ||
          result.supabaseError.includes('does not exist') ||
          result.supabaseError.includes('SQL schema') ||
          result.supabaseError.includes('not set up')
        ) {
          setDbStatus('missing_tables');
        }
      } else {
        setFeedback({
          type: 'error',
          message: result.supabaseError || 'Failed to submit. Please check your Supabase setup.'
        });
      }
    } catch (err) {
      setFeedback({
        type: 'error',
        message: err.message || 'An unexpected error occurred during submission.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      
      {/* Registration Header Banner */}
      <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-indigo-950/60 via-slate-900 to-slate-950 border border-indigo-500/30 shadow-2xl relative overflow-hidden">
        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/15 border border-indigo-500/30 text-indigo-300 text-xs font-semibold mb-2">
            <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
            OFFICIAL DEMOGRAPHIC REGISTRY
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Public User Registration
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 mt-2 max-w-2xl leading-relaxed">
            Register your profile with the Global Population Intelligence system. All submitted details are encrypted and securely stored.
          </p>

          {/* DB Status Indicators */}
          {dbStatus === 'ready' && (
            <div className="inline-flex items-center gap-2 mt-3 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs">
              <Database className="w-3 h-3" />
              Supabase database connected and ready
            </div>
          )}
        </div>
      </div>

      {/* Missing Tables Warning Banner */}
      {dbStatus === 'missing_tables' && (
        <div className="p-4 rounded-xl bg-amber-950/50 border border-amber-500/40 text-amber-200 text-xs space-y-2">
          <div className="flex items-center gap-2 font-bold text-sm text-amber-300">
            <AlertCircle className="w-4 h-4 shrink-0" />
            Database Tables Not Set Up Yet
          </div>
          <p>The <code className="bg-amber-900/40 px-1 rounded">user_registrations</code> table does not exist in your Supabase project. You need to run the SQL schema first.</p>
          <p className="font-semibold">Steps to fix:</p>
          <ol className="list-decimal list-inside space-y-1 ml-1">
            <li>Open the <a href="https://supabase.com/dashboard/project/ysclhkhxddmktbjckpin/sql/new" target="_blank" rel="noopener noreferrer" className="text-amber-300 underline inline-flex items-center gap-1">Supabase SQL Editor <ExternalLink className="w-3 h-3" /></a></li>
            <li>Copy the entire contents of <code className="bg-amber-900/40 px-1 rounded">supabase_schema.sql</code> from your project folder</li>
            <li>Paste it in the SQL editor and click <strong>Run</strong></li>
            <li>Refresh this page — registrations will then save to Supabase</li>
          </ol>
        </div>
      )}

      {/* Main Registration Form Card */}
      <div className="p-6 sm:p-8 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-2xl">
        
        <form onSubmit={handleSubmit} className="space-y-5">
          
          {/* Feedback Alert */}
          {feedback && (
            <div className={`p-4 rounded-xl flex items-start gap-3 text-xs animate-in fade-in ${
              feedback.type === 'success'
                ? 'bg-emerald-950/50 border border-emerald-500/40 text-emerald-200'
                : 'bg-rose-950/50 border border-rose-500/40 text-rose-200'
            }`}>
              {feedback.type === 'success' ? (
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
              ) : (
                <AlertCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
              )}
              <div className="flex-1">
                <span className="font-semibold block text-sm">
                  {feedback.type === 'success' ? 'Registration Successful' : 'Validation Error'}
                </span>
                <p className="mt-0.5">{feedback.message}</p>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            
            {/* Field 1: Full Name */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-indigo-400" />
                Full Name <span className="text-rose-400">*</span>
              </label>
              <input
                type="text"
                name="fullName"
                placeholder="e.g. Eleanor Vance"
                value={formData.fullName}
                onChange={handleChange}
                required
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950/80 border border-slate-700 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
              />
            </div>

            {/* Field 2: Email Address */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-indigo-400" />
                Email Address <span className="text-rose-400">*</span>
              </label>
              <input
                type="email"
                name="email"
                placeholder="e.g. eleanor.vance@example.com"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950/80 border border-slate-700 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
              />
            </div>

            {/* Field 3: Gender */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-indigo-400" />
                Gender <span className="text-rose-400">*</span>
              </label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                required
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950/80 border border-slate-700 text-sm text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 cursor-pointer"
              >
                <option value="" className="bg-slate-900 text-slate-500">Select Gender...</option>
                <option value="Female" className="bg-slate-900">Female</option>
                <option value="Male" className="bg-slate-900">Male</option>
                <option value="Non-Binary" className="bg-slate-900">Non-Binary</option>
                <option value="Prefer not to say" className="bg-slate-900">Prefer not to say</option>
                <option value="Other" className="bg-slate-900">Other</option>
              </select>
            </div>

            {/* Field 4: Country */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-indigo-400" />
                Country <span className="text-rose-400">*</span>
              </label>
              <select
                name="country"
                value={formData.country}
                onChange={handleChange}
                required
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950/80 border border-slate-700 text-sm text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 cursor-pointer"
              >
                <option value="" className="bg-slate-900 text-slate-500">Select Country...</option>
                {COUNTRIES_DATA.map((c) => (
                  <option key={c.id} value={c.name} className="bg-slate-900">
                    {c.flag} {c.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Field 5: State (Updates automatically based on Country!) */}
            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center justify-between">
                <span className="flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5 text-indigo-400" />
                  State / Province / Territory <span className="text-rose-400">*</span>
                </span>
                {formData.country && (
                  <span className="text-[11px] text-indigo-400 font-normal">
                    {availableStates.length} divisions available for {formData.country}
                  </span>
                )}
              </label>

              <select
                name="state"
                value={formData.state}
                onChange={handleChange}
                disabled={!formData.country}
                required
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950/80 border border-slate-700 text-sm text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
              >
                <option value="" className="bg-slate-900 text-slate-500">
                  {formData.country ? `Select State in ${formData.country}...` : 'First select a country above...'}
                </option>
                {availableStates.map((st, i) => (
                  <option key={i} value={st} className="bg-slate-900">
                    {st}
                  </option>
                ))}
              </select>
              <p className="text-[11px] text-slate-400 mt-1">
                The state options automatically synchronize with official subnational census divisions based on your selected country.
              </p>
            </div>

          </div>

          {/* Submit Button */}
          <div className="pt-3">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full sm:w-auto px-8 py-3 rounded-xl bg-gradient-to-r from-indigo-600 via-blue-600 to-emerald-600 hover:from-indigo-500 hover:to-emerald-500 text-white font-bold text-sm shadow-xl shadow-indigo-600/25 flex items-center justify-center gap-2 transition-all disabled:opacity-50 cursor-pointer"
            >
              {isSubmitting ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Saving Registration...</span>
                </>
              ) : (
                <>
                  <UserPlus className="w-4 h-4" />
                  <span>Submit Registration</span>
                  <ArrowRight className="w-4 h-4 ml-1" />
                </>
              )}
            </button>
          </div>

        </form>

      </div>

    </div>
  );
};
