# Mantra Acupuncture Clinic - Official Website & CMS

A premium, modern, highly trustworthy, mobile-first acupuncture clinic website and CMS built for **Mantra Acupuncture Clinic** located in Changanacherry, Kerala, India.

---

## 1. Technology Stack

- **Framework**: Next.js App Router (TypeScript)
- **Styling**: Tailwind CSS (Custom Natural Wellness Palette: Forest Green `#1B3B2B`, Warm Cream `#FDFBF7`, Earth Gold `#C5A059`, Soft Sage `#EBF2EE`)
- **Database & Auth**: Supabase PostgreSQL + `@supabase/ssr`
- **Media Architecture**: Cloudinary (Server-side signed uploads with `f_auto`, `q_auto`, responsive image delivery)
- **Deployment Target**: Vercel Free / Supabase Free / Cloudinary Free

---

## 2. Verified Business & Client Information

- **Clinic Name**: Mantra Acupuncture Clinic
- **Tagline**: Heal • Balance • Thrive
- **Location**: Changanacherry, Kerala, India
- **Address**: Marette Building 5, Opp St. Anne's Girls Higher Secondary School, Changanacherry, Kerala, 686101
- **Phone**: `+91 81296 27829`
- **WhatsApp**: `+91 81296 27829` (wa.me link: `https://wa.me/918129627829`)
- **Working Hours**: Monday – Saturday: 9:00 AM – 7:00 PM | Sunday: Holiday / Closed
- **Instagram**: `@mantraacupunctureclinic` (`https://www.instagram.com/mantraacupunctureclinic/`)
- **Lead Practitioner**: Dr. Nikku Thomas
  - *Bachelor of Naturopathy and Yogic Sciences (BNYS)*
  - *Master Degree in Naturopathy (MD)*
  - *Master Degree in Acupuncture*

---

## 3. Database & Supabase Setup Instructions

### Step 1: Run `supabase/schema.sql`
1. Open your **Supabase Dashboard** -> **SQL Editor**.
2. Copy the entire contents of `supabase/schema.sql`.
3. Paste into the SQL Editor and click **Run**.
4. This script will automatically create:
   - Tables (`site_settings`, `hero_sections`, `about_content`, `services`, `conditions`, `practitioners`, `treatment_process`, `testimonials`, `faqs`, `gallery_items`, `consultation_inquiries`, `seo_metadata`).
   - Performance Indexes (`idx_services_slug`, `idx_conditions_slug`, `idx_inquiries_status_created`, etc.).
   - Row Level Security (RLS) policies.
   - Verified initial seed content for Mantra Acupuncture Clinic.

---

## 4. Supabase Admin Setup & Authorization

To set up the authorized administrator account:

1. In Supabase Dashboard -> **Authentication** -> **Users**.
2. Click **Add User** -> **Create User**.
3. Enter administrator email (e.g., `admin@mantraacupuncture.com`) and a secure password.
4. Open the SQL Editor and assign the `admin` role claim to the user's `app_metadata`:

```sql
UPDATE auth.users
SET raw_app_meta_data = raw_app_meta_data || '{"role": "admin"}'::jsonb
WHERE email = 'admin@mantraacupuncture.com';
```

5. Go to `http://localhost:3000/admin/login` and log in with your admin credentials.

---

## 5. Cloudinary Setup Instructions

1. Create a free account at [Cloudinary](https://cloudinary.com).
2. Copy your **Cloud Name**, **API Key**, and **API Secret** from the dashboard.
3. Add these credentials to your environment variables (`.env.local` or Vercel environment settings):

```bash
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME="your-cloud-name"
CLOUDINARY_API_KEY="your-api-key"
CLOUDINARY_API_SECRET="your-api-secret"
```

> **Security Note**: `CLOUDINARY_API_SECRET` is used exclusively server-side in `/api/cloudinary/sign` to issue signed upload tokens. It is NEVER exposed to client-side JavaScript.

---

## 6. Local Development Instructions

1. Install dependencies:
   ```bash
   npm install
   ```
2. Copy `.env.example` to `.env.local` and add your live API keys:
   ```bash
   cp .env.example .env.local
   ```
3. Run dev server:
   ```bash
   npm run dev
   ```
4. Access public website at `http://localhost:3000`
5. Access Admin Portal at `http://localhost:3000/admin`

---

## 7. Build Verification & Deployment

To verify production build locally:

```bash
npm run build
```

Deploying to Vercel:
1. Push project to your GitHub repository.
2. Import project into Vercel.
3. Configure environment variables (`NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`, `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET`, `NEXT_PUBLIC_SITE_URL`).
4. Click **Deploy**.
