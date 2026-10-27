-- ============================================================
-- GLOBAL POPULATION INTELLIGENCE - SUPABASE POSTGRESQL SCHEMA
-- Execute this script in your Supabase SQL Editor:
-- https://supabase.com/dashboard/project/ysclhkhxddmktbjckpin/sql
-- ============================================================

-- ------------------------------------------------------------
-- 1. Table: user_registrations (Public Demographic Form)
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.user_registrations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    full_name TEXT NOT NULL CHECK (char_length(full_name) >= 2),
    email TEXT NOT NULL,
    gender TEXT NOT NULL,
    country TEXT NOT NULL,
    state TEXT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- Grant schema + table access to anon and authenticated roles
GRANT USAGE ON SCHEMA public TO anon, authenticated;
GRANT ALL ON public.user_registrations TO anon, authenticated;
GRANT ALL ON public.user_registrations TO service_role;

-- Enable Row Level Security
ALTER TABLE public.user_registrations ENABLE ROW LEVEL SECURITY;

-- Drop old policies if they exist
DROP POLICY IF EXISTS "Allow public anonymous submissions" ON public.user_registrations;
DROP POLICY IF EXISTS "Allow reading of registrations" ON public.user_registrations;
DROP POLICY IF EXISTS "Allow public inserts" ON public.user_registrations;
DROP POLICY IF EXISTS "Allow public reads" ON public.user_registrations;

-- Allow anyone (anon + authenticated) to INSERT
CREATE POLICY "Allow public inserts"
ON public.user_registrations
FOR INSERT
TO anon, authenticated
WITH CHECK (true);

-- Allow anyone to SELECT
CREATE POLICY "Allow public reads"
ON public.user_registrations
FOR SELECT
TO anon, authenticated
USING (true);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_user_registrations_created_at ON public.user_registrations (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_user_registrations_country ON public.user_registrations (country);

-- ------------------------------------------------------------
-- 2. Table: app_users (Login Tracking)
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.app_users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email TEXT NOT NULL UNIQUE,
    role TEXT NOT NULL DEFAULT 'user',
    last_login TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- Grant schema + table access
GRANT USAGE ON SCHEMA public TO anon, authenticated;
GRANT ALL ON public.app_users TO anon, authenticated;
GRANT ALL ON public.app_users TO service_role;

ALTER TABLE public.app_users ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow upserting app user logins" ON public.app_users;
DROP POLICY IF EXISTS "Allow all for app_users" ON public.app_users;

CREATE POLICY "Allow all for app_users"
ON public.app_users
FOR ALL
TO anon, authenticated
USING (true)
WITH CHECK (true);

CREATE INDEX IF NOT EXISTS idx_app_users_email ON public.app_users (email);

-- ------------------------------------------------------------
-- Verification
-- ------------------------------------------------------------
SELECT COUNT(*) AS total_registrations FROM public.user_registrations;
SELECT COUNT(*) AS total_app_users FROM public.app_users;
