import { createServerSupabaseClient } from '@/lib/supabase/server';
import { unstable_cache } from 'next/cache';
import {
  SiteSettings,
  HeroSection,
  AboutContent,
  ServiceItem,
  ConditionItem,
  Practitioner,
  TreatmentProcessStep,
  TestimonialItem,
  FAQItem,
  GalleryItem,
  SEOMetadata,
} from '@/lib/types';

// DEFAULT FALLBACK CONTENT IN CASE OF UNINITIALIZED DATABASE
export const DEFAULT_SITE_SETTINGS: SiteSettings = {
  id: 'default',
  site_name: 'Mantra Acupuncture Clinic',
  tagline: 'Heal • Balance • Thrive',
  phone: '+91 81296 27829',
  whatsapp_number: '+91 81296 27829',
  default_whatsapp_message: 'Hello, I would like to enquire about an acupuncture consultation at Mantra Acupuncture Clinic.',
  email: null,
  address: "Marette Building 5, Opp St. Anne's Girls Higher Secondary School, Changanacherry, Kerala, 686101",
  working_hours: 'Monday – Saturday: 9:00 AM – 7:00 PM | Sunday: Holiday / Closed',
  google_maps_url: 'https://maps.google.com/?q=Marette+Building+5+Opp+St+Annes+Girls+Higher+Secondary+School+Changanacherry+Kerala+686101',
  instagram_url: 'https://www.instagram.com/mantraacupunctureclinic/',
  floating_whatsapp_enabled: true,
  floating_call_enabled: true,
  primary_cta_label: 'Book a Consultation',
  consultation_cta_label: 'Schedule Your Consultation',
  call_cta_label: 'Call Clinic',
  disclaimer_text: 'The content provided on this website is for educational and general wellness support purposes only. Treatment recommendations are made based on individual clinical evaluation. Visitors should consult qualified healthcare practitioners for acute or emergency medical concerns.',
};

export const DEFAULT_HERO: HeroSection = {
  id: 'default',
  badge_text: 'Personalized Acupuncture Care in Changanacherry',
  headline: 'Personalized Acupuncture Care for Natural Healing & Vitality',
  subheadline: 'Combining traditional acupuncture principles with a modern clinical understanding of health to support your body’s natural healing process, balance, and well-being.',
  primary_cta_text: 'Book a Consultation',
  primary_cta_link: '/contact',
  secondary_cta_text: 'Explore Treatments',
  secondary_cta_link: '/treatments',
  hero_image_url: null,
  hero_image_alt: 'Mantra Acupuncture Clinic treatment environment',
};

export const DEFAULT_ABOUT: AboutContent = {
  id: 'default',
  headline: 'Patient-Centered, Responsible Acupuncture Care',
  story_paragraphs: [
    'Mantra Acupuncture Clinic is dedicated to providing personalized, patient-focused acupuncture care in a calm and welcoming environment.',
    'Our approach combines traditional acupuncture principles with a modern understanding of health and wellness to support the body’s natural healing process, improve balance, and enhance overall well-being.',
    'The clinic focuses on understanding each patient individually rather than treating symptoms alone. Every consultation begins with a detailed assessment, followed by a customized acupuncture plan based on your condition, lifestyle, and health goals.',
  ],
  pillars: [
    {
      title: 'Detailed Assessment',
      description: 'Individual evaluation focusing on your overall functional health, lifestyle, and underlying imbalances.',
    },
    {
      title: 'Customized Care Plans',
      description: 'Responsible treatment protocols tailored specifically to your condition and comfort.',
    },
    {
      title: 'Peaceful Sanctuary',
      description: 'A tranquil, supportive environment designed to promote relaxation and stress reduction during treatment.',
    },
  ],
};

export const DEFAULT_PRACTITIONER: Practitioner = {
  id: 'default',
  full_name: 'Dr. Nikku Thomas',
  title: 'Lead Naturopathy & Acupuncture Specialist',
  qualifications: [
    'Bachelor of Naturopathy and Yogic Sciences (BNYS)',
    'Master Degree in Naturopathy (MD)',
    'Master Degree in Acupuncture',
  ],
  bio: 'Dr. Nikku Thomas holds qualifications in Naturopathy, Yogic Sciences, and Acupuncture (BNYS, MD in Naturopathy, Master Degree in Acupuncture). Dedicated to patient-centered care, Dr. Thomas provides personalized assessments and acupuncture consultations in a calm, supportive environment.',
  profile_image_url: null,
  profile_image_alt: 'Dr. Nikku Thomas',
  display_order: 1,
  is_active: true,
};

// CACHED READ QUERIES WITH EXPLICIT SELECT COLUMNS

export const getSiteSettings = unstable_cache(
  async (): Promise<SiteSettings> => {
    try {
      const supabase = await createServerSupabaseClient();
      const { data, error } = await supabase
        .from('site_settings')
        .select('id, site_name, tagline, phone, whatsapp_number, default_whatsapp_message, email, address, working_hours, google_maps_url, instagram_url, floating_whatsapp_enabled, floating_call_enabled, primary_cta_label, consultation_cta_label, call_cta_label, disclaimer_text')
        .limit(1)
        .single();

      if (error || !data) return DEFAULT_SITE_SETTINGS;
      return data as SiteSettings;
    } catch {
      return DEFAULT_SITE_SETTINGS;
    }
  },
  ['site-settings-cache'],
  { tags: ['site-settings', 'global'] }
);

export const getHeroSection = unstable_cache(
  async (): Promise<HeroSection> => {
    try {
      const supabase = await createServerSupabaseClient();
      const { data, error } = await supabase
        .from('hero_sections')
        .select('id, badge_text, headline, subheadline, primary_cta_text, primary_cta_link, secondary_cta_text, secondary_cta_link, hero_image_url, hero_image_alt')
        .limit(1)
        .single();

      if (error || !data) return DEFAULT_HERO;
      return data as HeroSection;
    } catch {
      return DEFAULT_HERO;
    }
  },
  ['hero-section-cache'],
  { tags: ['hero', 'global'] }
);

export const getAboutContent = unstable_cache(
  async (): Promise<AboutContent> => {
    try {
      const supabase = await createServerSupabaseClient();
      const { data, error } = await supabase
        .from('about_content')
        .select('id, headline, story_paragraphs, pillars')
        .limit(1)
        .single();

      if (error || !data) return DEFAULT_ABOUT;
      return data as AboutContent;
    } catch {
      return DEFAULT_ABOUT;
    }
  },
  ['about-content-cache'],
  { tags: ['about', 'global'] }
);

export const getPublishedServices = unstable_cache(
  async (): Promise<ServiceItem[]> => {
    try {
      const supabase = await createServerSupabaseClient();
      const { data, error } = await supabase
        .from('services')
        .select('id, title, slug, short_description, full_description, icon_name, image_url, image_alt, display_order, is_published, seo_title, seo_description')
        .eq('is_published', true)
        .order('display_order', { ascending: true });

      if (error || !data) return [];
      return data as ServiceItem[];
    } catch {
      return [];
    }
  },
  ['published-services-cache'],
  { tags: ['services', 'global'] }
);

export const getServiceBySlug = unstable_cache(
  async (slug: string): Promise<ServiceItem | null> => {
    try {
      const supabase = await createServerSupabaseClient();
      const { data, error } = await supabase
        .from('services')
        .select('id, title, slug, short_description, full_description, icon_name, image_url, image_alt, display_order, is_published, seo_title, seo_description')
        .eq('slug', slug)
        .eq('is_published', true)
        .single();

      if (error || !data) return null;
      return data as ServiceItem;
    } catch {
      return null;
    }
  },
  ['service-by-slug-cache'],
  { tags: ['services', 'global'] }
);

export const getPublishedConditions = unstable_cache(
  async (): Promise<ConditionItem[]> => {
    try {
      const supabase = await createServerSupabaseClient();
      const { data, error } = await supabase
        .from('conditions')
        .select('id, title, slug, short_description, full_description, category, image_url, display_order, is_published, seo_title, seo_description')
        .eq('is_published', true)
        .order('display_order', { ascending: true });

      if (error || !data) return [];
      return data as ConditionItem[];
    } catch {
      return [];
    }
  },
  ['published-conditions-cache'],
  { tags: ['conditions', 'global'] }
);

export const getConditionBySlug = unstable_cache(
  async (slug: string): Promise<ConditionItem | null> => {
    try {
      const supabase = await createServerSupabaseClient();
      const { data, error } = await supabase
        .from('conditions')
        .select('id, title, slug, short_description, full_description, category, image_url, display_order, is_published, seo_title, seo_description')
        .eq('slug', slug)
        .eq('is_published', true)
        .single();

      if (error || !data) return null;
      return data as ConditionItem;
    } catch {
      return null;
    }
  },
  ['condition-by-slug-cache'],
  { tags: ['conditions', 'global'] }
);

export const getPractitioner = unstable_cache(
  async (): Promise<Practitioner> => {
    try {
      const supabase = await createServerSupabaseClient();
      const { data, error } = await supabase
        .from('practitioners')
        .select('id, full_name, title, qualifications, bio, profile_image_url, profile_image_alt, display_order, is_active')
        .eq('is_active', true)
        .order('display_order', { ascending: true })
        .limit(1)
        .single();

      if (error || !data) return DEFAULT_PRACTITIONER;
      return data as Practitioner;
    } catch {
      return DEFAULT_PRACTITIONER;
    }
  },
  ['practitioner-cache'],
  { tags: ['practitioner', 'global'] }
);

export const getTreatmentProcess = unstable_cache(
  async (): Promise<TreatmentProcessStep[]> => {
    try {
      const supabase = await createServerSupabaseClient();
      const { data, error } = await supabase
        .from('treatment_process')
        .select('id, step_number, title, description, icon_name, display_order')
        .order('display_order', { ascending: true });

      if (error || !data) return [];
      return data as TreatmentProcessStep[];
    } catch {
      return [];
    }
  },
  ['treatment-process-cache'],
  { tags: ['treatment-process', 'global'] }
);

export const getPublishedTestimonials = unstable_cache(
  async (): Promise<TestimonialItem[]> => {
    try {
      const supabase = await createServerSupabaseClient();
      const { data, error } = await supabase
        .from('testimonials')
        .select('id, patient_name, location, concern, quote, rating, display_order, is_published')
        .eq('is_published', true)
        .order('display_order', { ascending: true });

      if (error || !data) return [];
      return data as TestimonialItem[];
    } catch {
      return [];
    }
  },
  ['published-testimonials-cache'],
  { tags: ['testimonials', 'global'] }
);

export const getPublishedFAQs = unstable_cache(
  async (): Promise<FAQItem[]> => {
    try {
      const supabase = await createServerSupabaseClient();
      const { data, error } = await supabase
        .from('faqs')
        .select('id, question, answer, category, display_order, is_published')
        .eq('is_published', true)
        .order('display_order', { ascending: true });

      if (error || !data) return [];
      return data as FAQItem[];
    } catch {
      return [];
    }
  },
  ['published-faqs-cache'],
  { tags: ['faqs', 'global'] }
);

export const getPublishedGallery = unstable_cache(
  async (): Promise<GalleryItem[]> => {
    try {
      const supabase = await createServerSupabaseClient();
      const { data, error } = await supabase
        .from('gallery_items')
        .select('id, title, category, image_url, image_public_id, image_alt, display_order, is_published')
        .eq('is_published', true)
        .order('display_order', { ascending: true });

      if (error || !data) return [];
      return data as GalleryItem[];
    } catch {
      return [];
    }
  },
  ['published-gallery-cache'],
  { tags: ['gallery', 'global'] }
);

export const getSEOMetadata = unstable_cache(
  async (route: string): Promise<SEOMetadata | null> => {
    try {
      const supabase = await createServerSupabaseClient();
      const { data, error } = await supabase
        .from('seo_metadata')
        .select('id, route, title, description, canonical_url, og_image_url, keywords')
        .eq('route', route)
        .single();

      if (error || !data) return null;
      return data as SEOMetadata;
    } catch {
      return null;
    }
  },
  ['seo-metadata-cache'],
  { tags: ['seo', 'global'] }
);
