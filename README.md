# Global Population Intelligence 🌐📊

A modern, responsive, high-performance web application providing official population intelligence, subnational state/province demographics for all countries, long-term UN projections, and a public demographic user registry connected to **Supabase PostgreSQL**.

![Dashboard Preview](dashboard_fresh_1793106467875.png)

---

## 🚀 Key Features

### 1. 📊 Real-Time Population Dashboard
- **Live World Population Ticker:** Dynamic simulation matching empirical UN DESA net growth rates (~2.3 additions per second, +73M annually).
- **Daily Demographic Vital Signs:** Real-time estimates of births today, deaths today, and net population additions.
- **Executive KPI Cards:** World Population, Sovereign States tracked, Global Density (61/km²), Median Age (30.5 yrs), Urbanization (57.5%), and Fertility Rate (2.25).
- **Interactive Visualizations:**
  - **Top 10 Most Populated Countries:** Horizontal Recharts bar chart with values in Millions.
  - **Continental Distribution:** Donut chart breakdown with regional demographic shares.
  - **100-Year Growth Trajectory (1950 – 2050):** Gradient area chart with key milestone markers (2.5B in 1950 &rarr; 6.1B in 2000 &rarr; 8.16B in 2024 &rarr; 9.7B in 2050).

### 2. 🌍 Countries and States Disaggregation
- **Complete Country Data:** Official populations, capitals, continents, land areas (km²), population densities (people/km²), median age, fertility rates, and annual growth percentages.
- **Search & Multi-Level Filters:**
  - Real-time instant search by country name, capital city, or ISO-2 code.
  - Continental filter pills (Asia, Africa, Europe, Northern America, Latin America, Oceania).
  - Demographic size tiers (>100M, 50M-100M, 10M-50M, <10M).
  - Growth speed profiles (Rapid, Moderate, Slow, Declining).
- **Subnational State & Province Breakdown Modal:**
  - In-depth subnational census statistics for nations (United States, India, China, Brazil, Germany, United Kingdom, Canada, Australia, Nigeria, Japan, Indonesia, Mexico, Russia, and more).
  - Displays state capitals, resident populations, % share of national population, density, and mini-distribution bar chart.
- **Data Export:** Instant download of filtered demographic records in **CSV format**.

### 3. 📈 Population Analytics & UN Projections
- **Country Comparison Matrix:** Select 2 to 4 countries and compare them side-by-side across 8 demographic dimensions.
- **Historical Comparison Chart (1960 – 2024):** Multi-line trajectories analyzing historical growth divergence.
- **Density Extremes:** Detailed comparison between the world's most densely populated territories (Monaco, Singapore, Bangladesh) and the most expansive sparsest areas (Mongolia, Australia, Canada).
- **UN DESA Projections (2025 – 2100):** Medium Fertility Variant projections detailing regional trajectory shifts and 2050 demographic milestones.

### 4. ✍️ Public User Registration (5 Fields)
Accessible to everyone with exactly the five required fields:
1. **Full Name**
2. **Email Address** (RFC format validated)
3. **Gender** (Female, Male, Non-Binary, Prefer not to say, Other)
4. **Country** (Dynamic selector of world countries)
5. **State / Territory** (**Automatically updates dynamically based on the selected country**)

Includes instant validation, celebratory submission feedback, and a real-time **Registered Demographics Directory** table.

### 5. 🗄️ Supabase PostgreSQL Database Integration
- Direct cloud storage using `@supabase/supabase-js`.
- Permanent and secure database persistence with Row Level Security (RLS) policies.
- In-app **Database Settings Modal** allowing testing and entering Supabase credentials directly or via `.env`.
- Includes full SQL schema file: `supabase_schema.sql`.

### 6. 🛡️ Empirical Data Integrity & Sources
- Data from the **United Nations Department of Economic and Social Affairs (UN DESA - World Population Prospects 2024 Revision)**.
- **World Bank Open Data** (World Development Indicators - Indicator SP.POP.TOTL).
- **Official National Census Bureaus** (US Census Bureau, Census of India / MoHFW, China NBS, IBGE Brazil, Destatis Germany, ONS UK, StatCan, ABS, etc.).
- Explicit reference year (2024) and institutional data source displayed for all records. Zero invented or synthetic figures.

---

## 🛠️ Technology Stack

- **Frontend:** React 19, Vite 8, Tailwind CSS v4
- **Charts & Data Visualization:** Recharts
- **Icons & UI:** Lucide React, Canvas Confetti
- **Database:** Supabase (Cloud PostgreSQL)
- **Deployment & Tooling:** ES Modules, Rolldown / Vite bundler

---

## 📦 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Supabase PostgreSQL (Optional for local test, Recommended for permanent storage)

#### Option A: Using `.env`
Create or edit `.env` in the root folder:
```env
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

#### Option B: In-App UI Configuration
Click the **Connect Supabase** button in the top navigation bar of the application to enter and test your Supabase URL and Anon Key directly in the browser.

### 3. Setup the Database Table & Policies in Supabase
1. Log in to your [Supabase Dashboard](https://supabase.com/dashboard).
2. Go to **SQL Editor** -> **New query**.
3. Copy and run the contents of [`supabase_schema.sql`](./supabase_schema.sql):

```sql
-- Create table
CREATE TABLE IF NOT EXISTS public.user_registrations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    full_name TEXT NOT NULL CHECK (char_length(full_name) >= 2),
    email TEXT NOT NULL CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'),
    gender TEXT NOT NULL,
    country TEXT NOT NULL,
    state TEXT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- Enable RLS
ALTER TABLE public.user_registrations ENABLE ROW LEVEL SECURITY;

-- Allow public submissions
CREATE POLICY "Allow public anonymous submissions" 
ON public.user_registrations 
FOR INSERT TO anon, authenticated
WITH CHECK (true);

-- Allow reading registrations for the directory
CREATE POLICY "Allow public reading of registrations" 
ON public.user_registrations 
FOR SELECT TO anon, authenticated
USING (true);
```

### 4. Run Development Server
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### 5. Build for Production
```bash
npm run build
```

---

## 📂 Project Architecture

```
├── .env.example                # Supabase environment variables template
├── supabase_schema.sql         # Complete PostgreSQL table creation & RLS script
├── index.html                  # HTML entry point with Google Fonts & Meta tags
├── vite.config.js              # Vite configuration with Tailwind CSS v4
├── src/
│   ├── main.jsx                # Application entry point
│   ├── App.jsx                 # Main layout, routing tabs, and global state
│   ├── index.css               # Design system & dark glassmorphic styling
│   ├── components/
│   │   ├── Navbar.jsx               # Navigation bar & DB status pill
│   │   ├── LiveCounter.jsx          # Live ticking world population counter
│   │   ├── StatsOverview.jsx        # Top 10 bar chart, donut chart, KPI cards
│   │   ├── CountriesAndStates.jsx   # Search, filters, country cards & table
│   │   ├── CountryDetailModal.jsx   # Subnational states & provinces breakdown
│   │   ├── PopulationAnalytics.jsx  # Side-by-side comparison, density, UN projections
│   │   ├── InteractiveWorldMap.jsx  # Interactive SVG world map with hotspot pins
│   │   ├── RegistrationForm.jsx     # 5-field registration form with dynamic states
│   │   ├── SupabaseConfigModal.jsx  # Credentials modal & connection testing
│   │   └── DataSourcesSection.jsx   # Institutional citations & methodology
│   ├── data/
│   │   ├── worldPopulationData.js   # 195+ sovereign countries, flags, & metrics
│   │   ├── statesData.js            # Subnational states/provinces populations
│   │   └── projectionsData.js       # UN DESA 2024-2100 medium variant projections
│   └── lib/
│       └── supabase.js              # Supabase PostgreSQL client & local fallback
└── README.md
```

---

## 📑 Data Attribution
- **United Nations DESA:** World Population Prospects: The 2024 Revision
- **The World Bank:** World Development Indicators (WDI)
- **National Statistical Offices:** US Census Bureau, Census of India (MoHFW), China NBS, Destatis, IBGE, ONS, StatCan, ABS.
