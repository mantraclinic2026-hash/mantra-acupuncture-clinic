export type InquiryStatus = 'new' | 'contacted' | 'scheduled' | 'completed' | 'cancelled' | 'archived';

export interface SiteSettings {
  id: string;
  site_name: string;
  tagline: string;
  phone: string;
  whatsapp_number: string;
  default_whatsapp_message: string;
  email: string | null;
  address: string;
  working_hours: string;
  google_maps_url: string | null;
  instagram_url: string | null;
  floating_whatsapp_enabled: boolean;
  floating_call_enabled: boolean;
  primary_cta_label: string;
  consultation_cta_label: string;
  call_cta_label: string;
  disclaimer_text: string;
  banner_eyebrow?: string | null;
  banner_headline?: string | null;
  banner_primary_cta_label?: string | null;
  banner_primary_cta_link?: string | null;
  banner_phone_label?: string | null;
  conditions_eyebrow?: string | null;
  conditions_headline?: string | null;
  conditions_subtitle?: string | null;
  conditions_cta_label?: string | null;
  conditions_cta_link?: string | null;
  practitioner_eyebrow?: string | null;
  practitioner_booking_headline?: string | null;
  practitioner_booking_subtitle?: string | null;
  created_at?: string;
  updated_at?: string;
}

export interface HeroSection {
  id: string;
  badge_text: string | null;
  headline: string;
  subheadline: string;
  primary_cta_text: string;
  primary_cta_link: string;
  secondary_cta_text: string;
  secondary_cta_link: string;
  hero_image_url: string | null;
  hero_mobile_image_url?: string | null;
  hero_image_alt: string | null;
  hero_side_text?: string | null;
  trust_badge_1?: string | null;
  trust_badge_2?: string | null;
  trust_badge_3?: string | null;
  created_at?: string;
  updated_at?: string;
}

export interface PillarItem {
  title: string;
  description: string;
}

export interface AboutContent {
  id: string;
  eyebrow?: string | null;
  headline: string;
  story_paragraphs: string[];
  pillars: PillarItem[];
  learn_more_text?: string | null;
  learn_more_link?: string | null;
  created_at?: string;
  updated_at?: string;
}

export interface ServiceItem {
  id: string;
  title: string;
  slug: string;
  short_description: string;
  full_description: string;
  icon_name: string | null;
  image_url: string | null;
  image_alt: string | null;
  display_order: number;
  is_published: boolean;
  seo_title: string | null;
  seo_description: string | null;
  created_at?: string;
  updated_at?: string;
}

export interface ConditionItem {
  id: string;
  title: string;
  slug: string;
  short_description: string;
  full_description: string;
  category: string | null;
  image_url: string | null;
  display_order: number;
  is_published: boolean;
  seo_title: string | null;
  seo_description: string | null;
  created_at?: string;
  updated_at?: string;
}

export interface Practitioner {
  id: string;
  full_name: string;
  title: string;
  qualifications: string[];
  bio: string;
  profile_image_url: string | null;
  profile_image_alt: string | null;
  display_order: number;
  is_active: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface TreatmentProcessStep {
  id: string;
  step_number: number;
  title: string;
  description: string;
  icon_name: string | null;
  display_order: number;
  created_at?: string;
  updated_at?: string;
}

export interface TestimonialItem {
  id: string;
  patient_name: string;
  location: string | null;
  concern: string | null;
  quote: string;
  rating: number;
  display_order: number;
  is_published: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string | null;
  display_order: number;
  is_published: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: string | null;
  image_url: string;
  image_public_id: string | null;
  image_alt: string | null;
  display_order: number;
  is_published: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface ConsultationInquiry {
  id: string;
  full_name: string;
  phone: string;
  email: string | null;
  preferred_date: string | null;
  message: string | null;
  status: InquiryStatus;
  admin_notes: string | null;
  created_at: string;
  updated_at?: string;
}

export interface SEOMetadata {
  id: string;
  route: string;
  title: string;
  description: string;
  canonical_url: string | null;
  og_image_url: string | null;
  keywords: string | null;
  created_at?: string;
  updated_at?: string;
}
