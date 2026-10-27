-- ============================================================
-- GLOBAL POPULATION INTELLIGENCE - SUPABASE POSTGRESQL SCHEMA
-- Execute this script in your Supabase SQL Editor:
-- https://supabase.com/dashboard/project/_/sql
-- ============================================================

-- ------------------------------------------------------------
-- 1. Table: user_registrations (Public Demographic Form)
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.user_registrations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    full_name TEXT NOT NULL CHECK (char_length(full_name) >= 2),
    email TEXT NOT NULL CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'),
    gender TEXT NOT NULL,
    country TEXT NOT NULL,
    state TEXT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

CREATE INDEX IF NOT EXISTS idx_user_registrations_created_at ON public.user_registrations (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_user_registrations_email ON public.user_registrations (email);
CREATE INDEX IF NOT EXISTS idx_user_registrations_country ON public.user_registrations (country);

ALTER TABLE public.user_registrations ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow public anonymous submissions" ON public.user_registrations;
CREATE POLICY "Allow public anonymous submissions" 
ON public.user_registrations 
FOR INSERT 
TO anon, authenticated
WITH CHECK (true);

DROP POLICY IF EXISTS "Allow reading of registrations" ON public.user_registrations;
CREATE POLICY "Allow reading of registrations" 
ON public.user_registrations 
FOR SELECT 
TO anon, authenticated
USING (true);

-- ------------------------------------------------------------
-- 2. Table: app_users (User & Admin Authentication Accounts)
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.app_users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email TEXT NOT NULL UNIQUE,
    role TEXT NOT NULL DEFAULT 'user',
    last_login TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

CREATE INDEX IF NOT EXISTS idx_app_users_email ON public.app_users (email);

ALTER TABLE public.app_users ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow upserting app user logins" ON public.app_users;
CREATE POLICY "Allow upserting app user logins" 
ON public.app_users 
FOR ALL 
TO anon, authenticated
USING (true)
WITH CHECK (true);

-- ------------------------------------------------------------
-- Verification Queries
-- ------------------------------------------------------------
SELECT COUNT(*) as total_registrations FROM public.user_registrations;
SELECT COUNT(*) as total_app_users FROM public.app_users;
