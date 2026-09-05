'use server';

import { revalidatePath } from 'next/cache';
import { requireAdmin } from '@/lib/supabase/admin-auth';
import { createServerSupabaseClient } from '@/lib/supabase/server';
import { InquiryStatus } from '@/lib/types';

// 1. UPDATE SITE SETTINGS
export async function updateSiteSettingsAction(formData: FormData): Promise<void> {
  await requireAdmin();
  const supabase = await createServerSupabaseClient();

  const payload = {
    site_name: formData.get('site_name')?.toString() || 'Mantra Acupuncture Clinic',
    tagline: formData.get('tagline')?.toString() || 'Heal • Balance • Thrive',
    phone: formData.get('phone')?.toString() || '+91 81296 27829',
    whatsapp_number: formData.get('whatsapp_number')?.toString() || '+91 81296 27829',
    default_whatsapp_message: formData.get('default_whatsapp_message')?.toString() || '',
    email: formData.get('email')?.toString() || null,
    address: formData.get('address')?.toString() || '',
    working_hours: formData.get('working_hours')?.toString() || '',
    google_maps_url: formData.get('google_maps_url')?.toString() || null,
    instagram_url: formData.get('instagram_url')?.toString() || null,
    floating_whatsapp_enabled: formData.get('floating_whatsapp_enabled') === 'true',
    floating_call_enabled: formData.get('floating_call_enabled') === 'true',
    primary_cta_label: formData.get('primary_cta_label')?.toString() || 'Book a Consultation',
    consultation_cta_label: formData.get('consultation_cta_label')?.toString() || 'Schedule Your Consultation',
    call_cta_label: formData.get('call_cta_label')?.toString() || 'Call Clinic',
    disclaimer_text: formData.get('disclaimer_text')?.toString() || '',
  };

  const id = formData.get('id')?.toString();
  let error;

  if (id) {
    ({ error } = await supabase.from('site_settings').update(payload).eq('id', id));
  } else {
    ({ error } = await supabase.from('site_settings').insert(payload));
  }

  if (error) throw new Error(`Failed to update site settings: ${error.message}`);

  revalidatePath('/');
  revalidatePath('/about');
  revalidatePath('/contact');
  revalidatePath('/treatments');
  revalidatePath('/conditions');
  revalidatePath('/doctor');
  revalidatePath('/faq');
}

// 2. UPDATE HERO SECTION
export async function updateHeroAction(formData: FormData): Promise<void> {
  await requireAdmin();
  const supabase = await createServerSupabaseClient();

  const payload = {
    badge_text: formData.get('badge_text')?.toString() || null,
    headline: formData.get('headline')?.toString() || '',
    subheadline: formData.get('subheadline')?.toString() || '',
    primary_cta_text: formData.get('primary_cta_text')?.toString() || 'Book a Consultation',
    primary_cta_link: formData.get('primary_cta_link')?.toString() || '/contact',
    secondary_cta_text: formData.get('secondary_cta_text')?.toString() || 'Explore Treatments',
    secondary_cta_link: formData.get('secondary_cta_link')?.toString() || '/treatments',
    hero_image_url: formData.get('hero_image_url')?.toString() || null,
    hero_image_alt: formData.get('hero_image_alt')?.toString() || null,
  };

  const id = formData.get('id')?.toString();
  let error;

  if (id) {
    ({ error } = await supabase.from('hero_sections').update(payload).eq('id', id));
  } else {
    ({ error } = await supabase.from('hero_sections').insert(payload));
  }

  if (error) throw new Error(`Failed to update hero: ${error.message}`);

  revalidatePath('/');
}

// 3. UPSERT SERVICE
export async function upsertServiceAction(formData: FormData): Promise<void> {
  await requireAdmin();
  const supabase = await createServerSupabaseClient();

  const id = formData.get('id')?.toString();
  const payload = {
    title: formData.get('title')?.toString() || '',
    slug: formData.get('slug')?.toString() || '',
    short_description: formData.get('short_description')?.toString() || '',
    full_description: formData.get('full_description')?.toString() || '',
    icon_name: formData.get('icon_name')?.toString() || 'Sparkles',
    image_url: formData.get('image_url')?.toString() || null,
    image_alt: formData.get('image_alt')?.toString() || null,
    display_order: parseInt(formData.get('display_order')?.toString() || '0', 10),
    is_published: formData.get('is_published') === 'true',
    seo_title: formData.get('seo_title')?.toString() || null,
    seo_description: formData.get('seo_description')?.toString() || null,
  };

  let error;
  if (id) {
    ({ error } = await supabase.from('services').update(payload).eq('id', id));
  } else {
    ({ error } = await supabase.from('services').insert(payload));
  }

  if (error) throw new Error(`Failed to save service: ${error.message}`);

  revalidatePath('/');
  revalidatePath('/treatments');
  revalidatePath(`/treatments/${payload.slug}`);
}

// DELETE SERVICE
export async function deleteServiceAction(id: string): Promise<void> {
  await requireAdmin();
  const supabase = await createServerSupabaseClient();
  const { error } = await supabase.from('services').delete().eq('id', id);
  if (error) throw new Error(`Failed to delete service: ${error.message}`);

  revalidatePath('/');
  revalidatePath('/treatments');
}

// 4. UPSERT CONDITION
export async function upsertConditionAction(formData: FormData): Promise<void> {
  await requireAdmin();
  const supabase = await createServerSupabaseClient();

  const id = formData.get('id')?.toString();
  const payload = {
    title: formData.get('title')?.toString() || '',
    slug: formData.get('slug')?.toString() || '',
    short_description: formData.get('short_description')?.toString() || '',
    full_description: formData.get('full_description')?.toString() || '',
    category: formData.get('category')?.toString() || 'General Wellness',
    image_url: formData.get('image_url')?.toString() || null,
    display_order: parseInt(formData.get('display_order')?.toString() || '0', 10),
    is_published: formData.get('is_published') === 'true',
    seo_title: formData.get('seo_title')?.toString() || null,
    seo_description: formData.get('seo_description')?.toString() || null,
  };

  let error;
  if (id) {
    ({ error } = await supabase.from('conditions').update(payload).eq('id', id));
  } else {
    ({ error } = await supabase.from('conditions').insert(payload));
  }

  if (error) throw new Error(`Failed to save condition: ${error.message}`);

  revalidatePath('/');
  revalidatePath('/conditions');
  revalidatePath(`/conditions/${payload.slug}`);
}

// DELETE CONDITION
export async function deleteConditionAction(id: string): Promise<void> {
  await requireAdmin();
  const supabase = await createServerSupabaseClient();
  const { error } = await supabase.from('conditions').delete().eq('id', id);
  if (error) throw new Error(`Failed to delete condition: ${error.message}`);

  revalidatePath('/');
  revalidatePath('/conditions');
}

// 5. UPDATE INQUIRY STATUS & NOTES
export async function updateInquiryStatusAction(id: string, status: InquiryStatus, admin_notes?: string): Promise<void> {
  await requireAdmin();
  const supabase = await createServerSupabaseClient();
  const { error } = await supabase
    .from('consultation_inquiries')
    .update({ status, admin_notes })
    .eq('id', id);

  if (error) throw new Error(`Failed to update inquiry status: ${error.message}`);
  revalidatePath('/admin/inquiries');
}

// 6. UPSERT FAQ
export async function upsertFAQAction(formData: FormData): Promise<void> {
  await requireAdmin();
  const supabase = await createServerSupabaseClient();

  const id = formData.get('id')?.toString();
  const payload = {
    question: formData.get('question')?.toString() || '',
    answer: formData.get('answer')?.toString() || '',
    category: formData.get('category')?.toString() || 'General',
    display_order: parseInt(formData.get('display_order')?.toString() || '0', 10),
    is_published: formData.get('is_published') === 'true',
  };

  let error;
  if (id) {
    ({ error } = await supabase.from('faqs').update(payload).eq('id', id));
  } else {
    ({ error } = await supabase.from('faqs').insert(payload));
  }

  if (error) throw new Error(`Failed to save FAQ: ${error.message}`);

  revalidatePath('/');
  revalidatePath('/faq');
}

// DELETE FAQ
export async function deleteFAQAction(id: string): Promise<void> {
  await requireAdmin();
  const supabase = await createServerSupabaseClient();
  const { error } = await supabase.from('faqs').delete().eq('id', id);
  if (error) throw new Error(`Failed to delete FAQ: ${error.message}`);

  revalidatePath('/');
  revalidatePath('/faq');
}

// 7. UPSERT PRACTITIONER
export async function updatePractitionerAction(formData: FormData): Promise<void> {
  await requireAdmin();
  const supabase = await createServerSupabaseClient();

  const id = formData.get('id')?.toString();
  const qualifications = formData.get('qualifications')?.toString()
    ? JSON.parse(formData.get('qualifications')!.toString())
    : [];

  const payload = {
    full_name: formData.get('full_name')?.toString() || 'Dr. Nikku Thomas',
    title: formData.get('title')?.toString() || 'Lead Naturopathy & Acupuncture Specialist',
    qualifications,
    bio: formData.get('bio')?.toString() || '',
    profile_image_url: formData.get('profile_image_url')?.toString() || null,
    profile_image_alt: formData.get('profile_image_alt')?.toString() || null,
    is_active: formData.get('is_active') === 'true',
  };

  let error;
  if (id) {
    ({ error } = await supabase.from('practitioners').update(payload).eq('id', id));
  } else {
    ({ error } = await supabase.from('practitioners').insert(payload));
  }

  if (error) throw new Error(`Failed to update practitioner: ${error.message}`);

  revalidatePath('/');
  revalidatePath('/doctor');
  revalidatePath('/about');
}

// 8. UPSERT GALLERY ITEM
export async function upsertGalleryItemAction(formData: FormData): Promise<void> {
  await requireAdmin();
  const supabase = await createServerSupabaseClient();

  const id = formData.get('id')?.toString();
  const payload = {
    title: formData.get('title')?.toString() || '',
    category: formData.get('category')?.toString() || 'Clinic Environment',
    image_url: formData.get('image_url')?.toString() || '',
    image_public_id: formData.get('image_public_id')?.toString() || null,
    image_alt: formData.get('image_alt')?.toString() || null,
    display_order: parseInt(formData.get('display_order')?.toString() || '0', 10),
    is_published: formData.get('is_published') === 'true',
  };

  if (!payload.image_url) {
    throw new Error('Image URL is required for gallery items');
  }

  let error;
  if (id) {
    ({ error } = await supabase.from('gallery_items').update(payload).eq('id', id));
  } else {
    ({ error } = await supabase.from('gallery_items').insert(payload));
  }

  if (error) throw new Error(`Failed to save gallery item: ${error.message}`);

  revalidatePath('/');
  revalidatePath('/about');
}

// DELETE GALLERY ITEM
export async function deleteGalleryItemAction(id: string): Promise<void> {
  await requireAdmin();
  const supabase = await createServerSupabaseClient();
  const { error } = await supabase.from('gallery_items').delete().eq('id', id);
  if (error) throw new Error(`Failed to delete gallery item: ${error.message}`);

  revalidatePath('/');
  revalidatePath('/about');
}
