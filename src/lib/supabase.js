import { createClient } from '@supabase/supabase-js';

// Retrieve credentials from environment variables
const envUrl = import.meta.env.VITE_SUPABASE_URL;
const envKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Check localStorage for user-provided runtime configuration (fallback)
const localUrl = typeof window !== 'undefined' ? localStorage.getItem('GMI_SUPABASE_URL') : null;
const localKey = typeof window !== 'undefined' ? localStorage.getItem('GMI_SUPABASE_ANON_KEY') : null;

export const supabaseUrl = localUrl || envUrl || '';
export const supabaseAnonKey = localKey || envKey || '';

export const isSupabaseConfigured = Boolean(
  supabaseUrl &&
  supabaseAnonKey &&
  supabaseUrl.startsWith('https://') &&
  !supabaseUrl.includes('placeholder')
);

// Instantiate Supabase client safely
export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
      },
    })
  : null;

// Local storage keys for fallback / caching
const LOCAL_STORAGE_REGISTRATIONS_KEY = 'gpi_user_registrations';
const LOCAL_STORAGE_USERS_KEY = 'gpi_app_users';

/**
 * Get cached local registrations
 */
export const getLocalRegistrations = () => {
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_REGISTRATIONS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
};

/**
 * Save user public registration to Supabase PostgreSQL (5 fields)
 * Returns { success, data, syncedToSupabase, supabaseError }
 */
export const saveRegistration = async ({ fullName, email, gender, country, state }) => {
  const newRecord = {
    id: typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID() : `rec_${Date.now()}`,
    full_name: fullName.trim(),
    email: email.trim().toLowerCase(),
    gender,
    country,
    state,
    created_at: new Date().toISOString()
  };

  let supabaseSuccess = false;
  let supabaseError = null;

  if (supabase && isSupabaseConfigured) {
    try {
      const { data, error } = await supabase
        .from('user_registrations')
        .insert([
          {
            full_name: newRecord.full_name,
            email: newRecord.email,
            gender: newRecord.gender,
            country: newRecord.country,
            state: newRecord.state
          }
        ])
        .select();

      if (error) {
        console.error('Supabase registration insert error:', error);
        supabaseError = error.message;
        // Detect table-not-found specifically
        if (
          error.message?.includes('relation') ||
          error.message?.includes('does not exist') ||
          error.message?.includes('schema cache')
        ) {
          supabaseError =
            'Database tables not set up yet. Please run the SQL schema in your Supabase SQL Editor at: https://supabase.com/dashboard/project/ysclhkhxddmktbjckpin/sql';
        }
      } else {
        supabaseSuccess = true;
        if (data && data[0]) {
          newRecord.id = data[0].id;
          newRecord.created_at = data[0].created_at || newRecord.created_at;
        }
      }
    } catch (err) {
      console.error('Network error saving registration to Supabase:', err);
      supabaseError = err.message || 'Network error contacting Supabase';
    }
  } else {
    supabaseError = 'Supabase is not configured. Check your VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in .env';
  }

  // Always cache locally as backup regardless of Supabase outcome
  try {
    const current = getLocalRegistrations();
    const updated = [newRecord, ...current.filter(r => r.email !== newRecord.email)].slice(0, 100);
    localStorage.setItem(LOCAL_STORAGE_REGISTRATIONS_KEY, JSON.stringify(updated));
  } catch (e) {
    console.error('Failed to cache registration in localStorage:', e);
  }

  return {
    success: supabaseSuccess, // true ONLY if Supabase saved it
    savedLocally: true,       // always saved locally
    data: newRecord,
    syncedToSupabase: supabaseSuccess,
    supabaseError
  };
};

/**
 * Fetch registrations from Supabase, fallback to local storage
 */
export const fetchRegistrations = async () => {
  if (supabase && isSupabaseConfigured) {
    try {
      const { data, error } = await supabase
        .from('user_registrations')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(500);

      if (!error && Array.isArray(data)) {
        return { data, source: 'supabase' };
      }
      if (error) {
        console.warn('fetchRegistrations Supabase error:', error.message);
      }
    } catch (err) {
      console.warn('Could not fetch from Supabase, loading local cache:', err);
    }
  }

  return { data: getLocalRegistrations(), source: 'local' };
};

/**
 * Save / Update user login account details in Supabase PostgreSQL
 */
export const saveUserAccount = async ({ email, role = 'user' }) => {
  const userRecord = {
    email: email.trim().toLowerCase(),
    role,
    last_login: new Date().toISOString()
  };

  let syncedToSupabase = false;

  if (supabase && isSupabaseConfigured) {
    try {
      const { error } = await supabase
        .from('app_users')
        .upsert(
          [
            {
              email: userRecord.email,
              role: userRecord.role,
              last_login: userRecord.last_login
            }
          ],
          { onConflict: 'email' }
        );

      if (!error) {
        syncedToSupabase = true;
      } else {
        console.warn('Supabase app_users upsert warning:', error.message);
      }
    } catch (err) {
      console.warn('Failed to sync user account to Supabase:', err);
    }
  }

  // Local storage cache
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_USERS_KEY);
    const existing = raw ? JSON.parse(raw) : [];
    const updated = [userRecord, ...existing.filter(u => u.email !== userRecord.email)];
    localStorage.setItem(LOCAL_STORAGE_USERS_KEY, JSON.stringify(updated));
  } catch (e) {
    console.error('Failed to cache user account:', e);
  }

  return { success: true, syncedToSupabase };
};

/**
 * Test Supabase connection and check if tables exist
 */
export const testSupabaseConnection = async (testUrl, testKey) => {
  try {
    const client = createClient(testUrl, testKey);
    const { error } = await client
      .from('user_registrations')
      .select('count', { count: 'exact', head: true });

    if (!error) {
      return { connected: true, tablesExist: true, message: 'Connected! Tables are ready.' };
    }
    if (error.message?.includes('schema cache') || error.message?.includes('does not exist')) {
      return {
        connected: true,
        tablesExist: false,
        message: 'Connected to Supabase, but tables are missing. Please run supabase_schema.sql in the SQL Editor.'
      };
    }
    return { connected: false, tablesExist: false, message: error.message };
  } catch (err) {
    return { connected: false, tablesExist: false, message: err.message || 'Connection failed' };
  }
};
