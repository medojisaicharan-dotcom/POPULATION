-- ============================================================
-- GLOBAL POPULATION INTELLIGENCE - SUPABASE POSTGRESQL SCHEMA
-- Execute this script in your Supabase SQL Editor:
-- https://supabase.com/dashboard/project/_/sql
-- ============================================================

-- 1. Create the user_registrations table
CREATE TABLE IF NOT EXISTS public.user_registrations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    full_name TEXT NOT NULL CHECK (char_length(full_name) >= 2),
    email TEXT NOT NULL CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'),
    gender TEXT NOT NULL,
    country TEXT NOT NULL,
    state TEXT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 2. Create indexes for fast lookup and sorting
CREATE INDEX IF NOT EXISTS idx_user_registrations_created_at ON public.user_registrations (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_user_registrations_email ON public.user_registrations (email);
CREATE INDEX IF NOT EXISTS idx_user_registrations_country ON public.user_registrations (country);

-- 3. Enable Row Level Security (RLS)
ALTER TABLE public.user_registrations ENABLE ROW LEVEL SECURITY;

-- 4. Policy: Allow any public/anonymous visitor to submit registration details
DROP POLICY IF EXISTS "Allow public anonymous submissions" ON public.user_registrations;
CREATE POLICY "Allow public anonymous submissions" 
ON public.user_registrations 
FOR INSERT 
TO anon, authenticated
WITH CHECK (true);

-- 5. Policy: Allow public or authenticated users to read records for the dashboard directory
DROP POLICY IF EXISTS "Allow public reading of registrations" ON public.user_registrations;
CREATE POLICY "Allow public reading of registrations" 
ON public.user_registrations 
FOR SELECT 
TO anon, authenticated
USING (true);

-- 6. Insert demo seed records if table is empty
INSERT INTO public.user_registrations (full_name, email, gender, country, state)
VALUES
  ('Dr. Amara Okafor', 'amara.okafor@un-demographics.org', 'Female', 'Nigeria', 'Lagos'),
  ('David K. Chen', 'david.chen@stanford.edu', 'Male', 'United States', 'California'),
  ('Priya Sharma', 'priya.sharma@iitd.ac.in', 'Female', 'India', 'Maharashtra'),
  ('Elena Rostova', 'elena.rostova@worldbank.org', 'Female', 'Germany', 'Bavaria')
ON CONFLICT DO NOTHING;

-- Verification query
SELECT COUNT(*) as total_registered_users FROM public.user_registrations;
