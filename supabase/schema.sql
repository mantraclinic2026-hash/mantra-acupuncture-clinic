-- ====================================================================
-- MANTRA ACUPUNCTURE CLINIC - SUPABASE DATABASE SCHEMA
-- File: supabase/schema.sql
-- Description: Complete production schema including extensions, tables,
--              indexes, RLS policies, triggers, functions, and seed data.
-- ====================================================================

-- 1. EXTENSIONS & SETUP
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Helper trigger function to maintain updated_at timestamps
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public, pg_temp;

-- BEFORE INSERT trigger function for consultation_inquiries
-- Forces database control over id, status, admin_notes, created_at, and updated_at for non-admin insertions
CREATE OR REPLACE FUNCTION sanitize_consultation_inquiry_insert()
RETURNS TRIGGER AS $$
BEGIN
    IF NOT is_admin() THEN
        NEW.id := gen_random_uuid();
        NEW.status := 'new';
        NEW.admin_notes := NULL;
        NEW.created_at := NOW();
        NEW.updated_at := NOW();
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public, pg_temp;

-- Admin authorization function checking JWT app_metadata claim (Hardened SECURITY DEFINER with search_path)
CREATE OR REPLACE FUNCTION is_admin()
RETURNS BOOLEAN AS $$
BEGIN
    RETURN (
        auth.role() = 'authenticated' AND
        COALESCE(auth.jwt() -> 'app_metadata' ->> 'role', '') = 'admin'
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public, pg_temp;

-- 2. TABLES DEFINITION

-- 2.1 Site Settings (Single-row configuration)
CREATE TABLE IF NOT EXISTS site_settings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    site_name TEXT NOT NULL DEFAULT 'Mantra Acupuncture Clinic',
    tagline TEXT NOT NULL DEFAULT 'Heal • Balance • Thrive',
    phone TEXT NOT NULL DEFAULT '+91 81296 27829',
    whatsapp_number TEXT NOT NULL DEFAULT '+91 81296 27829',
    default_whatsapp_message TEXT NOT NULL DEFAULT 'Hello, I would like to enquire about an acupuncture consultation at Mantra Acupuncture Clinic.',
    email TEXT,
    address TEXT NOT NULL DEFAULT 'Marette Building 5, Opp St. Anne''s Girls Higher Secondary School, Changanacherry, Kerala, 686101',
    working_hours TEXT NOT NULL DEFAULT 'Monday – Saturday: 9:00 AM – 7:00 PM | Sunday: Holiday / Closed',
    google_maps_url TEXT DEFAULT 'https://maps.google.com/?q=Marette+Building+5+Opp+St+Annes+Girls+Higher+Secondary+School+Changanacherry+Kerala+686101',
    instagram_url TEXT DEFAULT 'https://www.instagram.com/mantraacupunctureclinic/',
    floating_whatsapp_enabled BOOLEAN NOT NULL DEFAULT true,
    floating_call_enabled BOOLEAN NOT NULL DEFAULT true,
    primary_cta_label TEXT NOT NULL DEFAULT 'Book a Consultation',
    consultation_cta_label TEXT NOT NULL DEFAULT 'Schedule Your Consultation',
    call_cta_label TEXT NOT NULL DEFAULT 'Call Clinic',
    disclaimer_text TEXT NOT NULL DEFAULT 'The content provided on this website is for informational and educational purposes only and does not constitute medical advice or diagnosis. Individual treatment recommendations are made following personal clinical assessment.',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2.2 Hero Sections
CREATE TABLE IF NOT EXISTS hero_sections (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    badge_text TEXT DEFAULT 'Personalized Acupuncture Care in Changanacherry',
    headline TEXT NOT NULL DEFAULT 'Personalized Acupuncture Care for Natural Healing & Vitality',
    subheadline TEXT NOT NULL DEFAULT 'Combining traditional acupuncture principles with modern clinical understanding to support your body''s natural healing process, balance, and well-being.',
    primary_cta_text TEXT NOT NULL DEFAULT 'Book a Consultation',
    primary_cta_link TEXT NOT NULL DEFAULT '/contact',
    secondary_cta_text TEXT NOT NULL DEFAULT 'Explore Treatments',
    secondary_cta_link TEXT NOT NULL DEFAULT '/treatments',
    hero_image_url TEXT,
    hero_image_alt TEXT DEFAULT 'Mantra Acupuncture Clinic treatment environment',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2.3 About Content
CREATE TABLE IF NOT EXISTS about_content (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    headline TEXT NOT NULL DEFAULT 'Patient-Centered, Responsible Acupuncture Care',
    story_paragraphs JSONB NOT NULL DEFAULT '["Mantra Acupuncture Clinic is dedicated to providing personalized, patient-focused acupuncture care in a calm and welcoming environment.", "Our approach combines traditional acupuncture principles with a modern understanding of health and wellness to support the body''s natural healing process, improve balance, and enhance overall well-being.", "The clinic focuses on understanding each patient individually rather than treating symptoms alone. Every consultation begins with a detailed assessment, followed by a customized acupuncture plan based on your condition, lifestyle, and health goals."]'::jsonb,
    pillars JSONB NOT NULL DEFAULT '[{"title": "Detailed Assessment", "description": "Individual evaluation focusing on your overall functional health, lifestyle, and underlying imbalances."}, {"title": "Customized Care Plans", "description": "Responsible treatment protocols tailored specifically to your condition and comfort."}, {"title": "Peaceful Sanctuary", "description": "A tranquil, supportive environment designed to promote relaxation and stress reduction during treatment."}]'::jsonb,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2.4 Services
CREATE TABLE IF NOT EXISTS services (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    short_description TEXT NOT NULL,
    full_description TEXT NOT NULL,
    icon_name TEXT DEFAULT 'Sparkles',
    image_url TEXT,
    image_alt TEXT,
    display_order INT NOT NULL DEFAULT 0,
    is_published BOOLEAN NOT NULL DEFAULT true,
    seo_title TEXT,
    seo_description TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2.5 Conditions Supported
CREATE TABLE IF NOT EXISTS conditions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    short_description TEXT NOT NULL,
    full_description TEXT NOT NULL,
    category TEXT DEFAULT 'Musculoskeletal & Functional Health',
    image_url TEXT,
    display_order INT NOT NULL DEFAULT 0,
    is_published BOOLEAN NOT NULL DEFAULT true,
    seo_title TEXT,
    seo_description TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2.6 Practitioner Profile
CREATE TABLE IF NOT EXISTS practitioners (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    full_name TEXT NOT NULL DEFAULT 'Dr. Nikku Thomas',
    title TEXT NOT NULL DEFAULT 'Lead Naturopathy & Acupuncture Specialist',
    qualifications JSONB NOT NULL DEFAULT '["Bachelor of Naturopathy and Yogic Sciences (BNYS)", "Master Degree in Naturopathy (MD)", "Master Degree in Acupuncture"]'::jsonb,
    bio TEXT NOT NULL DEFAULT 'Dr. Nikku Thomas provides personalized assessments and acupuncture care tailored to each patient''s individual health needs.',
    profile_image_url TEXT,
    profile_image_alt TEXT DEFAULT 'Dr. Nikku Thomas',
    display_order INT DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2.7 Treatment Process Steps
CREATE TABLE IF NOT EXISTS treatment_process (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    step_number INT NOT NULL,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    icon_name TEXT DEFAULT 'CheckCircle',
    display_order INT DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2.8 Testimonials (Starts empty by default as required)
CREATE TABLE IF NOT EXISTS testimonials (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    patient_name TEXT NOT NULL,
    location TEXT,
    concern TEXT,
    quote TEXT NOT NULL,
    rating INT DEFAULT 5 CHECK (rating >= 1 AND rating <= 5),
    display_order INT DEFAULT 0,
    is_published BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2.9 Frequently Asked Questions (FAQs)
CREATE TABLE IF NOT EXISTS faqs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    question TEXT NOT NULL,
    answer TEXT NOT NULL,
    category TEXT DEFAULT 'General',
    display_order INT DEFAULT 0,
    is_published BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2.10 Gallery Items
CREATE TABLE IF NOT EXISTS gallery_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    category TEXT DEFAULT 'Clinic Environment',
    image_url TEXT NOT NULL,
    image_public_id TEXT,
    image_alt TEXT,
    display_order INT DEFAULT 0,
    is_published BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2.11 Consultation Inquiries (Sensitive business records)
CREATE TABLE IF NOT EXISTS consultation_inquiries (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    full_name TEXT NOT NULL,
    phone TEXT NOT NULL,
    email TEXT,
    preferred_date DATE,
    message TEXT,
    status TEXT NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'scheduled', 'completed', 'cancelled', 'archived')),
    admin_notes TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2.12 SEO Metadata Overrides
CREATE TABLE IF NOT EXISTS seo_metadata (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    route TEXT UNIQUE NOT NULL,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    canonical_url TEXT,
    og_image_url TEXT,
    keywords TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. INDEXES FOR HIGH-PERFORMANCE QUERIES
CREATE INDEX IF NOT EXISTS idx_services_slug ON services(slug);
CREATE INDEX IF NOT EXISTS idx_services_published_order ON services(is_published, display_order);

CREATE INDEX IF NOT EXISTS idx_conditions_slug ON conditions(slug);
CREATE INDEX IF NOT EXISTS idx_conditions_published_order ON conditions(is_published, display_order);

CREATE INDEX IF NOT EXISTS idx_faqs_published_order ON faqs(is_published, display_order);
CREATE INDEX IF NOT EXISTS idx_gallery_published_order ON gallery_items(is_published, display_order);
CREATE INDEX IF NOT EXISTS idx_testimonials_published_order ON testimonials(is_published, display_order);
CREATE INDEX IF NOT EXISTS idx_inquiries_status_created ON consultation_inquiries(status, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_seo_route ON seo_metadata(route);

-- 4. TIMESTAMPTZ & INQUIRY SANITIZATION TRIGGERS
DROP TRIGGER IF EXISTS sanitize_inquiries_before_insert ON consultation_inquiries;
CREATE TRIGGER sanitize_inquiries_before_insert BEFORE INSERT ON consultation_inquiries FOR EACH ROW EXECUTE FUNCTION sanitize_consultation_inquiry_insert();

DROP TRIGGER IF EXISTS update_site_settings_updated_at ON site_settings;
CREATE TRIGGER update_site_settings_updated_at BEFORE UPDATE ON site_settings FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_hero_sections_updated_at ON hero_sections;
CREATE TRIGGER update_hero_sections_updated_at BEFORE UPDATE ON hero_sections FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_about_content_updated_at ON about_content;
CREATE TRIGGER update_about_content_updated_at BEFORE UPDATE ON about_content FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_services_updated_at ON services;
CREATE TRIGGER update_services_updated_at BEFORE UPDATE ON services FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_conditions_updated_at ON conditions;
CREATE TRIGGER update_conditions_updated_at BEFORE UPDATE ON conditions FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_practitioners_updated_at ON practitioners;
CREATE TRIGGER update_practitioners_updated_at BEFORE UPDATE ON practitioners FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_treatment_process_updated_at ON treatment_process;
CREATE TRIGGER update_treatment_process_updated_at BEFORE UPDATE ON treatment_process FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_testimonials_updated_at ON testimonials;
CREATE TRIGGER update_testimonials_updated_at BEFORE UPDATE ON testimonials FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_faqs_updated_at ON faqs;
CREATE TRIGGER update_faqs_updated_at BEFORE UPDATE ON faqs FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_gallery_items_updated_at ON gallery_items;
CREATE TRIGGER update_gallery_items_updated_at BEFORE UPDATE ON gallery_items FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_inquiries_updated_at ON consultation_inquiries;
CREATE TRIGGER update_inquiries_updated_at BEFORE UPDATE ON consultation_inquiries FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_seo_metadata_updated_at ON seo_metadata;
CREATE TRIGGER update_seo_metadata_updated_at BEFORE UPDATE ON seo_metadata FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- 5. ROW LEVEL SECURITY (RLS) POLICIES

-- Enable RLS on all tables
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE hero_sections ENABLE ROW LEVEL SECURITY;
ALTER TABLE about_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE conditions ENABLE ROW LEVEL SECURITY;
ALTER TABLE practitioners ENABLE ROW LEVEL SECURITY;
ALTER TABLE treatment_process ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE faqs ENABLE ROW LEVEL SECURITY;
ALTER TABLE gallery_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE consultation_inquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE seo_metadata ENABLE ROW LEVEL SECURITY;

-- 5.1 Public Read Policies for Active/Published CMS Data
DROP POLICY IF EXISTS "Public Read Site Settings" ON site_settings;
CREATE POLICY "Public Read Site Settings" ON site_settings FOR SELECT USING (true);

DROP POLICY IF EXISTS "Public Read Hero Sections" ON hero_sections;
CREATE POLICY "Public Read Hero Sections" ON hero_sections FOR SELECT USING (true);

DROP POLICY IF EXISTS "Public Read About Content" ON about_content;
CREATE POLICY "Public Read About Content" ON about_content FOR SELECT USING (true);

DROP POLICY IF EXISTS "Public Read Services" ON services;
CREATE POLICY "Public Read Services" ON services FOR SELECT USING (is_published = true);

DROP POLICY IF EXISTS "Public Read Conditions" ON conditions;
CREATE POLICY "Public Read Conditions" ON conditions FOR SELECT USING (is_published = true);

DROP POLICY IF EXISTS "Public Read Practitioners" ON practitioners;
CREATE POLICY "Public Read Practitioners" ON practitioners FOR SELECT USING (is_active = true);

DROP POLICY IF EXISTS "Public Read Treatment Process" ON treatment_process;
CREATE POLICY "Public Read Treatment Process" ON treatment_process FOR SELECT USING (true);

DROP POLICY IF EXISTS "Public Read Testimonials" ON testimonials;
CREATE POLICY "Public Read Testimonials" ON testimonials FOR SELECT USING (is_published = true);

DROP POLICY IF EXISTS "Public Read FAQs" ON faqs;
CREATE POLICY "Public Read FAQs" ON faqs FOR SELECT USING (is_published = true);

DROP POLICY IF EXISTS "Public Read Gallery" ON gallery_items;
CREATE POLICY "Public Read Gallery" ON gallery_items FOR SELECT USING (is_published = true);

DROP POLICY IF EXISTS "Public Read SEO Metadata" ON seo_metadata;
CREATE POLICY "Public Read SEO Metadata" ON seo_metadata FOR SELECT USING (true);

-- 5.2 Public Insert Policy for Inquiries (Strict minimal write surface: auth.role() = 'anon', status = 'new', admin_notes IS NULL)
DROP POLICY IF EXISTS "Public Insert Consultation Inquiries" ON consultation_inquiries;
CREATE POLICY "Public Insert Consultation Inquiries" ON consultation_inquiries
    FOR INSERT WITH CHECK (
        (is_admin()) OR (
            auth.role() = 'anon' AND
            full_name IS NOT NULL AND
            length(trim(full_name)) > 1 AND
            phone IS NOT NULL AND
            length(trim(phone)) >= 8 AND
            status = 'new' AND
            admin_notes IS NULL
        )
    );

-- 5.3 Admin Full Control Policies (ALL operations allowed for is_admin())
DROP POLICY IF EXISTS "Admin Full Site Settings" ON site_settings;
CREATE POLICY "Admin Full Site Settings" ON site_settings FOR ALL USING (is_admin()) WITH CHECK (is_admin());

DROP POLICY IF EXISTS "Admin Full Hero Sections" ON hero_sections;
CREATE POLICY "Admin Full Hero Sections" ON hero_sections FOR ALL USING (is_admin()) WITH CHECK (is_admin());

DROP POLICY IF EXISTS "Admin Full About Content" ON about_content;
CREATE POLICY "Admin Full About Content" ON about_content FOR ALL USING (is_admin()) WITH CHECK (is_admin());

DROP POLICY IF EXISTS "Admin Full Services" ON services;
CREATE POLICY "Admin Full Services" ON services FOR ALL USING (is_admin()) WITH CHECK (is_admin());

DROP POLICY IF EXISTS "Admin Full Conditions" ON conditions;
CREATE POLICY "Admin Full Conditions" ON conditions FOR ALL USING (is_admin()) WITH CHECK (is_admin());

DROP POLICY IF EXISTS "Admin Full Practitioners" ON practitioners;
CREATE POLICY "Admin Full Practitioners" ON practitioners FOR ALL USING (is_admin()) WITH CHECK (is_admin());

DROP POLICY IF EXISTS "Admin Full Treatment Process" ON treatment_process;
CREATE POLICY "Admin Full Treatment Process" ON treatment_process FOR ALL USING (is_admin()) WITH CHECK (is_admin());

DROP POLICY IF EXISTS "Admin Full Testimonials" ON testimonials;
CREATE POLICY "Admin Full Testimonials" ON testimonials FOR ALL USING (is_admin()) WITH CHECK (is_admin());

DROP POLICY IF EXISTS "Admin Full FAQs" ON faqs;
CREATE POLICY "Admin Full FAQs" ON faqs FOR ALL USING (is_admin()) WITH CHECK (is_admin());

DROP POLICY IF EXISTS "Admin Full Gallery" ON gallery_items;
CREATE POLICY "Admin Full Gallery" ON gallery_items FOR ALL USING (is_admin()) WITH CHECK (is_admin());

DROP POLICY IF EXISTS "Admin Full Consultation Inquiries" ON consultation_inquiries;
CREATE POLICY "Admin Full Consultation Inquiries" ON consultation_inquiries FOR ALL USING (is_admin()) WITH CHECK (is_admin());

DROP POLICY IF EXISTS "Admin Full SEO Metadata" ON seo_metadata;
CREATE POLICY "Admin Full SEO Metadata" ON seo_metadata FOR ALL USING (is_admin()) WITH CHECK (is_admin());


-- 6. VERIFIED INITIAL SEED DATA FOR MANTRA ACUPUNCTURE CLINIC

-- Seed Site Settings
INSERT INTO site_settings (
    id, site_name, tagline, phone, whatsapp_number, default_whatsapp_message,
    email, address, working_hours, google_maps_url, instagram_url,
    floating_whatsapp_enabled, floating_call_enabled, primary_cta_label,
    consultation_cta_label, call_cta_label, disclaimer_text
) VALUES (
    '11111111-1111-1111-1111-111111111111',
    'Mantra Acupuncture Clinic',
    'Heal • Balance • Thrive',
    '+91 81296 27829',
    '+91 81296 27829',
    'Hello, I would like to enquire about an acupuncture consultation at Mantra Acupuncture Clinic.',
    NULL,
    'Marette Building 5, Opp St. Anne''s Girls Higher Secondary School, Changanacherry, Kerala, 686101',
    'Monday – Saturday: 9:00 AM – 7:00 PM | Sunday: Holiday / Closed',
    'https://maps.google.com/?q=Marette+Building+5+Opp+St+Annes+Girls+Higher+Secondary+School+Changanacherry+Kerala+686101',
    'https://www.instagram.com/mantraacupunctureclinic/',
    true, true,
    'Book a Consultation',
    'Schedule Your Consultation',
    'Call Clinic',
    'The information provided on this website is for educational and general wellness support purposes only. Treatment recommendations are made based on individual clinical evaluation. Visitors should consult qualified healthcare practitioners for acute or emergency medical concerns.'
) ON CONFLICT (id) DO NOTHING;

-- Seed Hero Section
INSERT INTO hero_sections (
    id, badge_text, headline, subheadline, primary_cta_text, primary_cta_link, secondary_cta_text, secondary_cta_link
) VALUES (
    '22222222-2222-2222-2222-222222222222',
    'Personalized Acupuncture Care in Changanacherry',
    'Personalized Acupuncture Care for Natural Healing & Vitality',
    'Combining traditional acupuncture principles with a modern clinical understanding of health to support your body''s natural healing process, balance, and well-being.',
    'Book a Consultation',
    '/contact',
    'Explore Treatments',
    '/treatments'
) ON CONFLICT (id) DO NOTHING;

-- Seed About Content
INSERT INTO about_content (
    id, headline, story_paragraphs, pillars
) VALUES (
    '33333333-3333-3333-3333-333333333333',
    'Patient-Centered, Responsible Acupuncture Care',
    '["Mantra Acupuncture Clinic is dedicated to providing personalized, patient-focused acupuncture care in a calm and welcoming environment.", "Our approach combines traditional acupuncture principles with a modern understanding of health and wellness to support the body''s natural healing process, improve balance, and enhance overall well-being.", "The clinic focuses on understanding each patient individually rather than treating symptoms alone. Every consultation begins with a detailed assessment, followed by a customized acupuncture plan based on your condition, lifestyle, and health goals."]'::jsonb,
    '[{"title": "Detailed Assessment", "description": "Individual consultation evaluating your lifestyle, functional concerns, and health history."}, {"title": "Customized Care", "description": "Targeted acupuncture protocols adjusted to your body''s unique response and recovery progression."}, {"title": "Peaceful Sanctuary", "description": "A quiet, reassuring setting designed to make your healing journey relaxing and comfortable."}]'::jsonb
) ON CONFLICT (id) DO NOTHING;

-- Seed Practitioner Profile
INSERT INTO practitioners (
    id, full_name, title, qualifications, bio, display_order, is_active
) VALUES (
    '44444444-4444-4444-4444-444444444444',
    'Dr. Nikku Thomas',
    'Lead Naturopathy & Acupuncture Specialist',
    '["Bachelor of Naturopathy and Yogic Sciences (BNYS)", "Master Degree in Naturopathy (MD)", "Master Degree in Acupuncture"]'::jsonb,
    'Dr. Nikku Thomas holds qualifications in Naturopathy, Yogic Sciences, and Acupuncture (BNYS, MD in Naturopathy, Master Degree in Acupuncture). Dedicated to patient-centered care, Dr. Thomas provides personalized assessments and acupuncture consultations in a calm, supportive environment.',
    1, true
) ON CONFLICT (id) DO NOTHING;

-- Seed Initial Services
INSERT INTO services (id, title, slug, short_description, full_description, icon_name, display_order, is_published) VALUES
(
    '55555555-5555-5555-5555-555555555501',
    'Acupuncture Treatment',
    'acupuncture-treatment',
    'Traditional acupuncture techniques focused on supporting body balance, relaxing muscle tension, and promoting general wellness.',
    'Acupuncture Treatment at Mantra Acupuncture Clinic involves the gentle insertion of sterile, single-use needles at specific acupuncture points. Treatments are tailored to your consultation assessment to support overall relaxation and physical comfort.',
    'Activity',
    1, true
),
(
    '55555555-5555-5555-5555-555555555502',
    'Electro Acupuncture Treatment',
    'electro-acupuncture-treatment',
    'Therapeutic acupuncture applying mild micro-current stimulation to selected points for deep muscular relaxation.',
    'Electro Acupuncture combines traditional point selection with mild electric micro-current stimulation. This modality is used for targeted muscle relaxation and joint comfort during your session.',
    'Zap',
    2, true
),
(
    '55555555-5555-5555-5555-555555555503',
    'Cupping / Hijama',
    'cupping-hijama',
    'Therapeutic vacuum cupping designed to enhance localized comfort, relieve muscular tightness, and support relaxation.',
    'Cupping and Hijama therapies utilize specialized cups placed on key areas of the back and body. By drawing gentle suction, cupping helps soothe tight muscle fascia, relieve muscular tension, and foster deep relaxation.',
    'Feather',
    3, true
) ON CONFLICT (id) DO NOTHING;

-- Seed Initial Conditions Supported
INSERT INTO conditions (id, title, slug, short_description, full_description, category, display_order, is_published) VALUES
('66666666-6666-6666-6666-666666666601', 'Low Back Pain', 'low-back-pain', 'Supportive acupuncture care designed to relieve lumbar muscle strain and spinal tension.', 'Low back discomfort often stems from postural strain, muscle tension, or daily physical stress. Acupuncture care focuses on relaxing surrounding musculature and supporting lumbar comfort and functional movement.', 'Musculoskeletal', 1, true),
('66666666-6666-6666-6666-666666666602', 'Neck Pain', 'neck-pain', 'Targeted point stimulation to ease cervical stiffness, shoulder tightness, and tension posture.', 'Cervical stiffness from screen work or stress responds well to gentle acupuncture protocols that support localized comfort and ease upper trapezial tension.', 'Musculoskeletal', 2, true),
('66666666-6666-6666-6666-666666666603', 'Knee Pain / Osteoarthritis', 'knee-pain-osteoarthritis', 'Supportive treatment focused on joint mobility, stiffness relief, and localized comfort.', 'Targeted point selection around the knee area helps ease stiffness, support joint comfort, and assist weight-bearing mobility as part of an individualized care plan.', 'Joints & Mobility', 3, true),
('66666666-6666-6666-6666-666666666604', 'Sciatica', 'sciatica', 'Gentle acupuncture care for managing radiating leg discomfort and gluteal tightness.', 'Sciatic discomfort can impair daily movement and rest. Electro and manual acupuncture help relax piriformis muscle tightness and support leg comfort.', 'Nerve & Spine', 4, true),
('66666666-6666-6666-6666-666666666605', 'Migraine & Headache', 'migraine-headache', 'Relaxing head and neck acupuncture care aiming to assist with tension headache discomfort.', 'Head and neck acupuncture points focus on promoting relaxation, easing muscular tightness, and supporting head comfort during periods of stress.', 'Neurological', 5, true),
('66666666-6666-6666-6666-666666666606', 'Shoulder Pain', 'shoulder-pain', 'Care for rotator cuff tightness, frozen shoulder stiffness, and discomfort.', 'Aims to support shoulder mobility and alleviate deep shoulder and upper back muscular tightness through focused point protocols.', 'Musculoskeletal', 6, true),
('66666666-6666-6666-6666-666666666607', 'Tennis Elbow', 'tennis-elbow', 'Localized acupuncture care for elbow area discomfort and forearm grip soreness.', 'Focuses on easing forearm muscle tension and supporting elbow joint comfort during daily activities.', 'Musculoskeletal', 7, true),
('66666666-6666-6666-6666-666666666608', 'Carpal Tunnel Syndrome', 'carpal-tunnel-syndrome', 'Wrist and forearm point care to assist with wrist strain and finger discomfort.', 'Aims to support wrist flexor muscle relaxation and assist with localized comfort in the hand and wrist.', 'Nerve & Spine', 8, true),
('66666666-6666-6666-6666-666666666609', 'Fibromyalgia', 'fibromyalgia', 'Whole-body soothing acupuncture targeting generalized tender points, fatigue, and sleep quality.', 'Provides gentle, low-intensity acupuncture stimulation tailored to ease body soreness and encourage restorative rest.', 'Functional Health', 9, true),
('66666666-6666-6666-6666-666666666610', 'Stress & Sleep Problems', 'stress-sleep-problems', 'Calming acupuncture care to relieve mental fatigue, stress, and sleep disruption.', 'Gentle acupuncture protocols aim to foster deep relaxation, relieve daily stress tension, and support healthy sleep habits.', 'Nervous System', 10, true),
('66666666-6666-6666-6666-666666666611', 'Digestive Issues / IBS Symptoms', 'digestive-issues-ibs', 'Abdominal and distal point care supporting digestive comfort, bloating relief, and abdominal relaxation.', 'Focuses on soothing abdominal muscle tightness and supporting digestive comfort as part of a holistic wellness plan.', 'Digestive Health', 11, true),
('66666666-6666-6666-6666-666666666612', 'Menstrual Pain', 'menstrual-pain', 'Pelvic area and distal acupuncture care assisting with menstrual cramping and lower back soreness.', 'Promotes abdominal and pelvic muscle relaxation to assist with dysmenorrhea discomfort and associated lower back strain.', 'Women''s Health', 12, true)
ON CONFLICT (id) DO NOTHING;

-- Seed Treatment Process Steps
INSERT INTO treatment_process (id, step_number, title, description, icon_name, display_order) VALUES
('77777777-7777-7777-7777-777777777701', 1, 'Initial Consultation', 'A thorough evaluation of your current health concerns, medical history, lifestyle factors, and main treatment goals.', 'UserCheck', 1),
('77777777-7777-7777-7777-777777777702', 2, 'Detailed Assessment', 'A careful clinical examination assessing functional posture, range of motion, and pulse/tongue indicators where appropriate.', 'ClipboardList', 2),
('77777777-7777-7777-7777-777777777703', 3, 'Customized Care Plan', 'A clear explanation of recommended acupuncture modalities and individualized care recommendations based on your assessment.', 'FileText', 3),
('77777777-7777-7777-7777-777777777704', 4, 'Therapeutic Session', 'Relax in a calm environment while gentle, sterile acupuncture treatment is administered with maximal patient comfort.', 'Sparkles', 4),
('77777777-7777-7777-7777-777777777705', 5, 'Ongoing Guidance', 'Receive helpful post-treatment lifestyle, hydration, and posture advice to support your body''s ongoing recovery.', 'ShieldCheck', 5)
ON CONFLICT (id) DO NOTHING;

-- Seed Initial FAQs
INSERT INTO faqs (id, question, answer, category, display_order, is_published) VALUES
(
    '88888888-8888-8888-8888-888888888801',
    'What should I expect during my first consultation at Mantra Acupuncture Clinic?',
    'Your first visit includes a detailed consultation with Dr. Nikku Thomas. We will discuss your symptoms, lifestyle, and medical history. After an assessment, we will explain the recommended treatment plan and answer any questions before beginning your first session.',
    'Consultation & Process', 1, true
),
(
    '88888888-8888-8888-8888-888888888802',
    'Does acupuncture hurt?',
    'Acupuncture needles are extremely fine and flexible—much thinner than standard injection needles. Most patients experience minimal to no discomfort, often describing a mild tingling, warmth, or heavy sensation as relaxation sets in.',
    'Treatment Details', 2, true
),
(
    '88888888-8888-8888-8888-888888888803',
    'Are the acupuncture needles sterile and safe?',
    'Yes, patient safety is paramount. We strictly use single-use, pre-sterilized, disposable needles that are safely discarded after every session.',
    'Safety & Hygiene', 3, true
),
(
    '88888888-8888-8888-8888-888888888804',
    'How many acupuncture sessions will I need?',
    'Treatment duration varies depending on your condition, severity, and how long you have experienced symptoms. Recommended session plans are determined following your initial consultation and individual assessment.',
    'Treatment Details', 4, true
),
(
    '88888888-8888-8888-8888-888888888805',
    'How do I book an appointment?',
    'You can easily submit an enquiry through our online consultation form, call us directly at +91 81296 27829, or message us on WhatsApp. Our team will contact you promptly to confirm details.',
    'Appointments & Booking', 5, true
) ON CONFLICT (id) DO NOTHING;

-- Seed Default SEO Metadata Overrides
INSERT INTO seo_metadata (id, route, title, description, canonical_url, keywords) VALUES
(
    '99999999-9999-9999-9999-999999999901',
    '/',
    'Mantra Acupuncture Clinic | Changanacherry, Kerala | Heal • Balance • Thrive',
    'Personalized, patient-focused acupuncture care in Changanacherry by Dr. Nikku Thomas. Supportive treatment for back pain, neck pain, sciatica, migraine, and stress.',
    NULL,
    'acupuncture changanacherry, doctor nikku thomas, acupuncture clinic kerala, back pain treatment changanacherry, sciatica acupuncture'
),
(
    '99999999-9999-9999-9999-999999999902',
    '/about',
    'About Mantra Acupuncture Clinic | Patient-Centered Care in Changanacherry',
    'Learn about Mantra Acupuncture Clinic, our holistic philosophy, patient-focused assessment process, and peaceful treatment sanctuary in Changanacherry, Kerala.',
    NULL,
    'mantra acupuncture story, holistic clinic changanacherry, natural healing kerala'
),
(
    '99999999-9999-9999-9999-999999999903',
    '/treatments',
    'Acupuncture & Electro-Acupuncture Treatments | Mantra Acupuncture Clinic',
    'Explore personalized treatment options including traditional Acupuncture, Electro-Acupuncture, and Cupping/Hijama therapy at Mantra Acupuncture Clinic.',
    NULL,
    'acupuncture treatment, electro acupuncture, cupping hijama therapy changanacherry'
),
(
    '99999999-9999-9999-9999-999999999904',
    '/conditions',
    'Conditions Supported | Mantra Acupuncture Clinic Changanacherry',
    'Supportive acupuncture care for low back pain, neck strain, knee osteoarthritis, sciatica, migraine, stress, and functional health concerns.',
    NULL,
    'back pain acupuncture, neck pain relief, sciatica care changanacherry, migraine acupuncture'
),
(
    '99999999-9999-9999-9999-999999999905',
    '/doctor',
    'Dr. Nikku Thomas | BNYS, MD, Master in Acupuncture | Changanacherry',
    'Meet Dr. Nikku Thomas, Naturopathy & Acupuncture practitioner holding BNYS, MD Naturopathy, and Master Degree in Acupuncture.',
    NULL,
    'dr nikku thomas, acupuncture doctor changanacherry, bnys md acupuncture kerala'
),
(
    '99999999-9999-9999-9999-999999999906',
    '/contact',
    'Contact Mantra Acupuncture Clinic | Schedule Consultation | Changanacherry',
    'Contact Mantra Acupuncture Clinic in Changanacherry, Kerala. View working hours, phone number, WhatsApp link, location address, and consultation enquiry form.',
    NULL,
    'contact mantra acupuncture, acupuncture clinic address changanacherry, book acupuncture consultation'
) ON CONFLICT (id) DO NOTHING;
