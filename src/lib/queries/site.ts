import { createPublicSupabaseClient, createPublicServiceClient } from '@/lib/supabase/server';
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
  consultation_cta_label: 'Book Your Consultation',
  call_cta_label: 'Call Clinic',
  disclaimer_text: 'The content provided on this website is for educational and general wellness support purposes only. Treatment recommendations are made based on individual clinical evaluation. Visitors should consult qualified healthcare practitioners for acute or emergency medical concerns.',
  banner_eyebrow: 'YOUR HEALING JOURNEY',
  banner_headline: 'Your Journey Toward Better Balance Can Begin With a Conversation.',
  banner_primary_cta_label: 'Book Your Consultation',
  banner_primary_cta_link: '/contact',
  banner_phone_label: 'Call +91 8129627829',
  conditions_eyebrow: 'CONDITIONS WE SUPPORT',
  conditions_headline: 'Supporting Your Body Through Better Balance.',
  conditions_subtitle: 'Acupuncture is offered as supportive care for a wide range of functional and musculoskeletal concerns, tailored to your individual needs.',
  conditions_cta_label: 'View All Conditions',
  conditions_cta_link: '/conditions',
  practitioner_eyebrow: 'YOUR PRACTITIONER',
  practitioner_booking_headline: 'Book Your Consultation',
  practitioner_booking_subtitle: 'Share your details and we will reach out to schedule a session that works for you.',
};

export const DEFAULT_HERO: HeroSection = {
  id: 'default',
  badge_text: 'PERSONALIZED ACUPUNCTURE CARE',
  headline: 'Care Designed Around You.',
  subheadline: 'At Mantra Acupuncture Clinic, every consultation begins with understanding your individual condition, lifestyle, and health goals.',
  primary_cta_text: 'Book a Consultation',
  primary_cta_link: '/contact',
  secondary_cta_text: 'Call +91 8129627829',
  secondary_cta_link: 'tel:+918129627829',
  hero_image_url: null,
  hero_mobile_image_url: null,
  hero_image_alt: 'Mantra Acupuncture Clinic treatment environment',
  hero_side_text: 'Natural Healing Through Acupuncture',
  trust_badge_1: 'Personalized Assessment',
  trust_badge_2: 'Individual Treatment Plans',
  trust_badge_3: 'Patient Comfort & Safety',
};

export const DEFAULT_ABOUT: AboutContent = {
  id: 'default',
  eyebrow: 'ABOUT MANTRA',
  headline: 'Treating the Person, Not Just the Symptoms.',
  story_paragraphs: [
    'Mantra Acupuncture Clinic is dedicated to providing personalized, patient-focused acupuncture care in a calm and welcoming environment.',
    'Our approach combines traditional acupuncture principles with a modern understanding of health and wellness to support the body’s natural healing process, improve balance, and enhance overall well-being.',
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
      title: 'Patient Comfort & Safety',
      description: 'A tranquil, supportive environment designed to promote relaxation and stress reduction during treatment.',
    },
  ],
  learn_more_text: 'Learn More',
  learn_more_link: '/about',
};

export const DEFAULT_PROCESS_STEPS: TreatmentProcessStep[] = [
  {
    id: 'default-1',
    step_number: 1,
    title: 'Consultation',
    description: 'Understand your concerns, lifestyle and health goals.',
    icon_name: 'UserCheck',
    display_order: 1,
  },
  {
    id: 'default-2',
    step_number: 2,
    title: 'Assessment',
    description: 'A detailed assessment of your individual needs.',
    icon_name: 'ClipboardList',
    display_order: 2,
  },
  {
    id: 'default-3',
    step_number: 3,
    title: 'Treatment Plan',
    description: 'A customized acupuncture plan for your condition.',
    icon_name: 'FileText',
    display_order: 3,
  },
  {
    id: 'default-4',
    step_number: 4,
    title: 'Ongoing Support',
    description: 'Continuous care for your progress and well-being.',
    icon_name: 'CheckCircle2',
    display_order: 4,
  },
];

export const DEFAULT_SERVICES: ServiceItem[] = [
  {
    id: 'default-srv-1',
    title: 'Acupuncture Treatment',
    slug: 'acupuncture-treatment',
    short_description: 'Personalized acupuncture care designed around your individual condition and wellness goals.',
    full_description: 'Personalized acupuncture care designed around your individual condition and wellness goals.',
    icon_name: 'Activity',
    image_url: '/images/acupuncture.png',
    image_alt: 'Acupuncture Treatment',
    display_order: 1,
    is_published: true,
    seo_title: null,
    seo_description: null,
  },
  {
    id: 'default-srv-2',
    title: 'Electro Acupuncture Treatment',
    slug: 'electro-acupuncture-treatment',
    short_description: 'A treatment approach combining acupuncture with gentle electrical stimulation when appropriate.',
    full_description: 'A treatment approach combining acupuncture with gentle electrical stimulation when appropriate.',
    icon_name: 'Zap',
    image_url: null,
    image_alt: 'Electro Acupuncture Treatment',
    display_order: 2,
    is_published: true,
    seo_title: null,
    seo_description: null,
  },
  {
    id: 'default-srv-3',
    title: 'Cupping / Hijama',
    slug: 'cupping-hijama',
    short_description: 'Supportive therapeutic techniques offered based on individual needs and professional assessment.',
    full_description: 'Supportive therapeutic techniques offered based on individual needs and professional assessment.',
    icon_name: 'Feather',
    image_url: null,
    image_alt: 'Cupping / Hijama',
    display_order: 3,
    is_published: true,
    seo_title: null,
    seo_description: null,
  },
];

export const DEFAULT_CONDITIONS: ConditionItem[] = [
  { id: 'c1', title: 'Low Back Pain', slug: 'low-back-pain', short_description: 'Supportive care for lower back strain and stiffness.', full_description: '', category: 'Pain', image_url: null, display_order: 1, is_published: true, seo_title: null, seo_description: null },
  { id: 'c2', title: 'Neck Pain', slug: 'neck-pain', short_description: 'Relief for neck stiffness and chronic tension.', full_description: '', category: 'Pain', image_url: null, display_order: 2, is_published: true, seo_title: null, seo_description: null },
  { id: 'c3', title: 'Knee Pain / Osteoarthritis', slug: 'knee-pain-osteoarthritis', short_description: 'Functional support for joint mobility and comfort.', full_description: '', category: 'Pain', image_url: null, display_order: 3, is_published: true, seo_title: null, seo_description: null },
  { id: 'c4', title: 'Sciatica', slug: 'sciatica', short_description: 'Targeted care for radiating nerve discomfort.', full_description: '', category: 'Pain', image_url: null, display_order: 4, is_published: true, seo_title: null, seo_description: null },
  { id: 'c5', title: 'Shoulder Pain', slug: 'shoulder-pain', short_description: 'Care for frozen shoulder and rotator cuff strain.', full_description: '', category: 'Pain', image_url: null, display_order: 5, is_published: true, seo_title: null, seo_description: null },
  { id: 'c6', title: 'Tennis Elbow', slug: 'tennis-elbow', short_description: 'Support for lateral epicondyle elbow strain.', full_description: '', category: 'Pain', image_url: null, display_order: 6, is_published: true, seo_title: null, seo_description: null },
  { id: 'c7', title: 'Carpal Tunnel Syndrome', slug: 'carpal-tunnel-syndrome', short_description: 'Gentle acupuncture for wrist and hand discomfort.', full_description: '', category: 'Pain', image_url: null, display_order: 7, is_published: true, seo_title: null, seo_description: null },
  { id: 'c8', title: 'Fibromyalgia', slug: 'fibromyalgia', short_description: 'Support for widespread muscular discomfort and fatigue.', full_description: '', category: 'Pain', image_url: null, display_order: 8, is_published: true, seo_title: null, seo_description: null },
  { id: 'c9', title: 'Migraine & Headache', slug: 'migraine-headache', short_description: 'Calming relief for tension headaches and migraines.', full_description: '', category: 'Pain', image_url: null, display_order: 9, is_published: true, seo_title: null, seo_description: null },
  { id: 'c10', title: 'Stress & Sleep Problems', slug: 'stress-sleep-problems', short_description: 'Acupuncture therapy for nervous system relaxation and sleep support.', full_description: '', category: 'Stress', image_url: null, display_order: 10, is_published: true, seo_title: null, seo_description: null },
  { id: 'c11', title: 'Digestive Issues / IBS Symptoms', slug: 'digestive-issues-ibs', short_description: 'Support for functional digestion and abdominal comfort.', full_description: '', category: 'Digestive', image_url: null, display_order: 11, is_published: true, seo_title: null, seo_description: null },
  { id: 'c12', title: 'Sinusitis & Respiratory Allergies', slug: 'sinusitis-allergies', short_description: 'Supportive acupuncture for sinus relief, rhinitis, and respiratory ease.', full_description: '', category: 'Respiratory', image_url: null, display_order: 12, is_published: true, seo_title: null, seo_description: null },
  { id: 'c13', title: 'Menstrual Pain & Cycle Health', slug: 'menstrual-pain', short_description: 'Supportive care for menstrual cramps and pelvic balance.', full_description: '', category: 'Women and Health', image_url: null, display_order: 13, is_published: true, seo_title: null, seo_description: null },
];

export const DEFAULT_PRACTITIONER: Practitioner = {
  id: 'default',
  full_name: 'Dr. Nikku Thomas',
  title: 'Lead Naturopathy & Acupuncture Specialist',
  qualifications: [
    'Bachelor of Naturopathy and Yogic Sciences (BNYS)',
    'Master Degree in Naturopathy (MD)',
    'Master Degree in Acupuncture',
  ],
  bio: 'A patient-focused approach centered on understanding the individual, creating personalized treatment recommendations, and supporting overall well-being in a calm and comfortable environment.',
  profile_image_url: '/images/dr-nikku-thomas.jpg',
  profile_image_alt: 'Dr. Nikku Thomas',
  display_order: 1,
  is_active: true,
};

export const DEFAULT_GALLERY: GalleryItem[] = [
  {
    id: 'default-gal-1',
    title: 'Serene Treatment Sanctuary',
    category: 'Treatment Rooms',
    image_url: '/images/botanical-flowers.png',
    image_public_id: null,
    image_alt: 'Clean, peaceful acupuncture therapy room with soft ambient light',
    display_order: 1,
    is_published: true,
  },
  {
    id: 'default-gal-2',
    title: 'Sterile Therapeutic Care',
    category: 'Clinical Care',
    image_url: '/images/acupuncture.png',
    image_public_id: null,
    image_alt: 'Single-use sterile acupuncture needles and clinical supplies',
    display_order: 2,
    is_published: true,
  },
  {
    id: 'default-gal-3',
    title: 'Private Consultation Space',
    category: 'Clinic Environment',
    image_url: '/images/botanical-flowers1.png',
    image_public_id: null,
    image_alt: 'Quiet consultation corner for private patient evaluations',
    display_order: 3,
    is_published: true,
  },
  {
    id: 'default-gal-4',
    title: 'Holistic Healing Atmosphere',
    category: 'Therapeutic Setup',
    image_url: '/images/botanical-flower.png',
    image_public_id: null,
    image_alt: 'Relaxing clinic ambiance designed for stress reduction and recovery',
    display_order: 4,
    is_published: true,
  },
];

// CACHED READ QUERIES WITH EXPLICIT SELECT COLUMNS

export const getSiteSettings = unstable_cache(
  async (): Promise<SiteSettings> => {
    try {
      const supabase = createPublicSupabaseClient();
      const { data, error } = await supabase
        .from('site_settings')
        .select('*')
        .limit(1)
        .maybeSingle();

      if (error || !data) return DEFAULT_SITE_SETTINGS;
      return { ...DEFAULT_SITE_SETTINGS, ...data } as SiteSettings;
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
      const supabase = createPublicSupabaseClient();
      const { data, error } = await supabase
        .from('hero_sections')
        .select('*')
        .limit(1)
        .maybeSingle();

      if (error || !data) return DEFAULT_HERO;

      // Extract mobile banner from column or fallback storage
      let mobileImageUrl = (data as Record<string, any>).hero_mobile_image_url || null;
      let cleanAlt = data.hero_image_alt || 'Mantra Acupuncture Clinic treatment environment';
      if (!mobileImageUrl && data.hero_image_alt && data.hero_image_alt.includes('__MOBILE_BANNER__:')) {
        const parts = data.hero_image_alt.split('__MOBILE_BANNER__:');
        cleanAlt = parts[0]?.trim() || cleanAlt;
        mobileImageUrl = parts[1]?.trim() || null;
      }
      if (!mobileImageUrl && data.hero_side_text && data.hero_side_text.startsWith('mobile_banner:')) {
        mobileImageUrl = data.hero_side_text.replace('mobile_banner:', '').trim() || null;
      }

      return {
        ...DEFAULT_HERO,
        ...data,
        hero_image_alt: cleanAlt,
        hero_mobile_image_url: mobileImageUrl,
      } as HeroSection;
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
      const supabase = createPublicSupabaseClient();
      const { data, error } = await supabase
        .from('about_content')
        .select('*')
        .limit(1)
        .maybeSingle();

      if (error || !data) return DEFAULT_ABOUT;
      return { ...DEFAULT_ABOUT, ...data } as AboutContent;
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
      const supabase = createPublicSupabaseClient();
      const { data, error } = await supabase
        .from('services')
        .select('*')
        .eq('is_published', true)
        .order('display_order', { ascending: true });

      if (error || !data || data.length === 0) return DEFAULT_SERVICES;
      return data as ServiceItem[];
    } catch {
      return DEFAULT_SERVICES;
    }
  },
  ['published-services-cache'],
  { tags: ['services', 'global'] }
);

export const getServiceBySlug = unstable_cache(
  async (slug: string): Promise<ServiceItem | null> => {
    try {
      const supabase = createPublicSupabaseClient();
      const { data, error } = await supabase
        .from('services')
        .select('*')
        .eq('slug', slug)
        .eq('is_published', true)
        .maybeSingle();

      if (error || !data) {
        return DEFAULT_SERVICES.find((s) => s.slug === slug) || null;
      }
      return data as ServiceItem;
    } catch {
      return DEFAULT_SERVICES.find((s) => s.slug === slug) || null;
    }
  },
  ['service-by-slug-cache'],
  { tags: ['services', 'global'] }
);

export const getPublishedConditions = unstable_cache(
  async (): Promise<ConditionItem[]> => {
    try {
      const supabase = createPublicSupabaseClient();
      const { data, error } = await supabase
        .from('conditions')
        .select('*')
        .eq('is_published', true)
        .order('display_order', { ascending: true });

      if (error || !data || data.length === 0) return DEFAULT_CONDITIONS;
      return data as ConditionItem[];
    } catch {
      return DEFAULT_CONDITIONS;
    }
  },
  ['published-conditions-cache'],
  { tags: ['conditions', 'global'] }
);

export const getConditionBySlug = unstable_cache(
  async (slug: string): Promise<ConditionItem | null> => {
    try {
      const supabase = createPublicSupabaseClient();
      const { data, error } = await supabase
        .from('conditions')
        .select('*')
        .eq('slug', slug)
        .eq('is_published', true)
        .maybeSingle();

      if (error || !data) {
        return DEFAULT_CONDITIONS.find((c) => c.slug === slug) || null;
      }
      return data as ConditionItem;
    } catch {
      return DEFAULT_CONDITIONS.find((c) => c.slug === slug) || null;
    }
  },
  ['condition-by-slug-cache'],
  { tags: ['conditions', 'global'] }
);

export const getPractitioners = unstable_cache(
  async (): Promise<Practitioner[]> => {
    try {
      const supabase = createPublicSupabaseClient();
      const { data, error } = await supabase
        .from('practitioners')
        .select('*')
        .eq('is_active', true)
        .order('display_order', { ascending: true })
        .order('created_at', { ascending: true });

      if (error || !data || data.length === 0) {
        return [DEFAULT_PRACTITIONER];
      }
      return data.map((item) => ({
        ...DEFAULT_PRACTITIONER,
        ...item,
        profile_image_url: item.profile_image_url || (item.full_name?.toLowerCase().includes('nikku') ? DEFAULT_PRACTITIONER.profile_image_url : null),
        is_active: item.is_active !== false,
      })) as Practitioner[];
    } catch {
      return [DEFAULT_PRACTITIONER];
    }
  },
  ['practitioners-all-cache'],
  { tags: ['practitioners', 'practitioner', 'global'] }
);

export const getPractitioner = unstable_cache(
  async (): Promise<Practitioner> => {
    try {
      const practitioners = await getPractitioners();
      return practitioners[0] || DEFAULT_PRACTITIONER;
    } catch {
      return DEFAULT_PRACTITIONER;
    }
  },
  ['practitioner-cache'],
  { tags: ['practitioner', 'practitioners', 'global'] }
);

export const getTreatmentProcess = unstable_cache(
  async (): Promise<TreatmentProcessStep[]> => {
    try {
      const supabase = createPublicSupabaseClient();
      const { data, error } = await supabase
        .from('treatment_process')
        .select('*')
        .order('display_order', { ascending: true });

      if (error || !data || data.length === 0) return DEFAULT_PROCESS_STEPS;
      return data as TreatmentProcessStep[];
    } catch {
      return DEFAULT_PROCESS_STEPS;
    }
  },
  ['treatment-process-cache'],
  { tags: ['treatment-process', 'global'] }
);

export const getPublishedTestimonials = unstable_cache(
  async (): Promise<TestimonialItem[]> => {
    try {
      const supabase = createPublicSupabaseClient();
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
      const supabase = createPublicSupabaseClient();
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
      const supabase = createPublicServiceClient();
      const { data, error } = await supabase
        .from('gallery_items')
        .select('id, title, category, image_url, image_public_id, image_alt, display_order, is_published')
        .or('is_published.eq.true,is_published.is.null')
        .order('display_order', { ascending: true });

      if (error || !data || data.length === 0) {
        return DEFAULT_GALLERY;
      }
      return data as GalleryItem[];
    } catch {
      return DEFAULT_GALLERY;
    }
  },
  ['published-gallery-cache'],
  { tags: ['gallery', 'global'] }
);

export const getSEOMetadata = unstable_cache(
  async (route: string): Promise<SEOMetadata | null> => {
    try {
      const supabase = createPublicSupabaseClient();
      const { data, error } = await supabase
        .from('seo_metadata')
        .select('id, route, title, description, canonical_url, og_image_url, keywords')
        .eq('route', route)
        .maybeSingle();

      if (error || !data) return null;
      return data as SEOMetadata;
    } catch {
      return null;
    }
  },
  ['seo-metadata-cache'],
  { tags: ['seo', 'global'] }
);
