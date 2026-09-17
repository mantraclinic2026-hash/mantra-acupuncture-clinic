'use server';

import { revalidatePath, updateTag } from 'next/cache';
import { requireAdmin } from '@/lib/supabase/admin-auth';
import { createServerSupabaseClient } from '@/lib/supabase/server';
import { InquiryStatus } from '@/lib/types';
import { deleteCloudinaryImage } from '@/lib/cloudinary/client';

function isValidUUID(val?: string | null): val is string {
  if (!val || val === 'default') return false;
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(val);
}

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
    consultation_cta_label: formData.get('consultation_cta_label')?.toString() || 'Book Your Consultation',
    call_cta_label: formData.get('call_cta_label')?.toString() || 'Call Clinic',
    disclaimer_text: formData.get('disclaimer_text')?.toString() || '',
    banner_eyebrow: formData.get('banner_eyebrow')?.toString() || 'YOUR HEALING JOURNEY',
    banner_headline: formData.get('banner_headline')?.toString() || 'Your Journey Toward Better Balance Can Begin With a Conversation.',
    banner_primary_cta_label: formData.get('banner_primary_cta_label')?.toString() || 'Book Your Consultation',
    banner_primary_cta_link: formData.get('banner_primary_cta_link')?.toString() || '/contact',
    banner_phone_label: formData.get('banner_phone_label')?.toString() || 'Call +91 8129627829',
    conditions_eyebrow: formData.get('conditions_eyebrow')?.toString() || 'CONDITIONS WE SUPPORT',
    conditions_headline: formData.get('conditions_headline')?.toString() || 'Supporting Your Body Through Better Balance.',
    conditions_subtitle: formData.get('conditions_subtitle')?.toString() || null,
    conditions_cta_label: formData.get('conditions_cta_label')?.toString() || 'View All Conditions',
    conditions_cta_link: formData.get('conditions_cta_link')?.toString() || '/conditions',
    practitioner_eyebrow: formData.get('practitioner_eyebrow')?.toString() || 'YOUR PRACTITIONER',
    practitioner_booking_headline: formData.get('practitioner_booking_headline')?.toString() || 'Book Your Consultation',
    practitioner_booking_subtitle: formData.get('practitioner_booking_subtitle')?.toString() || null,
  };

  const rawId = formData.get('id')?.toString();
  let targetId = isValidUUID(rawId) ? rawId : null;
  let error;

  if (!targetId) {
    const { data: existing } = await supabase
      .from('site_settings')
      .select('id')
      .limit(1)
      .maybeSingle();
    if (existing?.id) {
      targetId = existing.id;
    }
  }

  if (targetId) {
    ({ error } = await supabase.from('site_settings').update(payload).eq('id', targetId));
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
  revalidatePath('/admin/settings');
}

// 2. UPDATE HERO SECTION
export async function updateHeroAction(formData: FormData): Promise<void> {
  await requireAdmin();
  const supabase = await createServerSupabaseClient();

  const hero_image_url = formData.get('hero_image_url')?.toString() || null;
  const hero_mobile_image_url = formData.get('hero_mobile_image_url')?.toString() || null;

  const payload: Record<string, any> = {
    badge_text: formData.get('badge_text')?.toString() || null,
    headline: formData.get('headline')?.toString() || '',
    subheadline: formData.get('subheadline')?.toString() || '',
    primary_cta_text: formData.get('primary_cta_text')?.toString() || 'Book a Consultation',
    primary_cta_link: formData.get('primary_cta_link')?.toString() || '/contact',
    secondary_cta_text: formData.get('secondary_cta_text')?.toString() || 'Call +91 8129627829',
    secondary_cta_link: formData.get('secondary_cta_link')?.toString() || 'tel:+918129627829',
    hero_image_url,
    hero_mobile_image_url,
  };

  const rawId = formData.get('id')?.toString();
  let targetId = isValidUUID(rawId) ? rawId : null;
  let error;

  if (!targetId) {
    const { data: existing } = await supabase
      .from('hero_sections')
      .select('id')
      .limit(1)
      .maybeSingle();
    if (existing?.id) {
      targetId = existing.id;
    }
  }

  if (targetId) {
    const res = await supabase.from('hero_sections').update(payload).eq('id', targetId);
    if (res.error && res.error.message.includes('hero_mobile_image_url')) {
      delete payload.hero_mobile_image_url;
      if (hero_mobile_image_url) {
        payload.hero_image_alt = `Mantra Acupuncture Clinic treatment environment __MOBILE_BANNER__:${hero_mobile_image_url}`;
      }
      ({ error } = await supabase.from('hero_sections').update(payload).eq('id', targetId));
    } else {
      error = res.error;
    }
  } else {
    const res = await supabase.from('hero_sections').insert(payload);
    if (res.error && res.error.message.includes('hero_mobile_image_url')) {
      delete payload.hero_mobile_image_url;
      if (hero_mobile_image_url) {
        payload.hero_image_alt = `Mantra Acupuncture Clinic treatment environment __MOBILE_BANNER__:${hero_mobile_image_url}`;
      }
      ({ error } = await supabase.from('hero_sections').insert(payload));
    } else {
      error = res.error;
    }
  }

  if (error) throw new Error(`Failed to update hero: ${error.message}`);

  revalidatePath('/', 'layout');
  revalidatePath('/admin/hero');
}

// 2A. UPDATE HERO MOBILE BANNER SPECIFICALLY
export async function updateHeroMobileBannerAction(mobileImageUrl: string | null): Promise<void> {
  await requireAdmin();
  const supabase = await createServerSupabaseClient();

  const { data: existing } = await supabase
    .from('hero_sections')
    .select('id, hero_image_alt')
    .limit(1)
    .maybeSingle();

  const payload: Record<string, any> = {
    hero_mobile_image_url: mobileImageUrl,
  };

  const getFallbackPayload = (currentAlt?: string | null) => {
    const baseAlt = currentAlt ? currentAlt.split('__MOBILE_BANNER__:')[0].trim() : 'Mantra Acupuncture Clinic treatment environment';
    return {
      hero_image_alt: mobileImageUrl ? `${baseAlt} __MOBILE_BANNER__:${mobileImageUrl}` : baseAlt,
    };
  };

  let error;
  if (existing?.id) {
    const res = await supabase.from('hero_sections').update(payload).eq('id', existing.id);
    if (res.error && res.error.message.includes('hero_mobile_image_url')) {
      ({ error } = await supabase.from('hero_sections').update(getFallbackPayload(existing.hero_image_alt)).eq('id', existing.id));
    } else {
      error = res.error;
    }
  } else {
    const res = await supabase.from('hero_sections').insert({
      headline: 'Care Designed Around You.',
      subheadline: 'At Mantra Acupuncture Clinic, every consultation begins with understanding your individual condition, lifestyle, and health goals.',
      ...payload,
    });
    if (res.error && res.error.message.includes('hero_mobile_image_url')) {
      ({ error } = await supabase.from('hero_sections').insert({
        headline: 'Care Designed Around You.',
        subheadline: 'At Mantra Acupuncture Clinic, every consultation begins with understanding your individual condition, lifestyle, and health goals.',
        ...getFallbackPayload(),
      }));
    } else {
      error = res.error;
    }
  }

  if (error) throw new Error(`Failed to update mobile banner: ${error.message}`);

  revalidatePath('/', 'layout');
  revalidatePath('/admin/hero');
}

// 2B. UPDATE ABOUT SECTION
export async function updateAboutAction(formData: FormData): Promise<void> {
  await requireAdmin();
  const supabase = await createServerSupabaseClient();

  const paragraphsRaw = formData.get('story_paragraphs')?.toString() || '';
  const story_paragraphs = paragraphsRaw
    .split('\n\n')
    .map((p) => p.trim())
    .filter(Boolean);

  const payload = {
    eyebrow: formData.get('eyebrow')?.toString() || 'ABOUT MANTRA',
    headline: formData.get('headline')?.toString() || 'Treating the Person, Not Just the Symptoms.',
    story_paragraphs: story_paragraphs.length > 0 ? story_paragraphs : [
      'Mantra Acupuncture Clinic is dedicated to providing personalized, patient-focused acupuncture care in a calm and welcoming environment.',
      'Our approach combines traditional acupuncture principles with a modern understanding of health and wellness to support the body’s natural healing process, improve balance, and enhance overall well-being.',
    ],
    learn_more_text: formData.get('learn_more_text')?.toString() || 'Learn More',
    learn_more_link: formData.get('learn_more_link')?.toString() || '/about',
  };

  const rawId = formData.get('id')?.toString();
  let targetId = isValidUUID(rawId) ? rawId : null;
  let error;

  if (!targetId) {
    const { data: existing } = await supabase
      .from('about_content')
      .select('id')
      .limit(1)
      .maybeSingle();
    if (existing?.id) {
      targetId = existing.id;
    }
  }

  if (targetId) {
    ({ error } = await supabase.from('about_content').update(payload).eq('id', targetId));
  } else {
    ({ error } = await supabase.from('about_content').insert(payload));
  }

  if (error) throw new Error(`Failed to update about content: ${error.message}`);


  revalidatePath('/');
  revalidatePath('/about');
  revalidatePath('/admin/about');
}

// 2C. UPSERT PROCESS STEP
export async function upsertProcessStepAction(formData: FormData): Promise<void> {
  await requireAdmin();
  const supabase = await createServerSupabaseClient();

  const rawId = formData.get('id')?.toString();
  const id = isValidUUID(rawId) ? rawId : null;

  const payload = {
    step_number: parseInt(formData.get('step_number')?.toString() || '1', 10),
    title: formData.get('title')?.toString() || '',
    description: formData.get('description')?.toString() || '',
    icon_name: formData.get('icon_name')?.toString() || 'CheckCircle2',
    display_order: parseInt(formData.get('display_order')?.toString() || '0', 10),
  };

  let error;
  if (id) {
    ({ error } = await supabase.from('treatment_process').update(payload).eq('id', id));
  } else {
    ({ error } = await supabase.from('treatment_process').insert(payload));
  }

  if (error) throw new Error(`Failed to save process step: ${error.message}`);

  revalidatePath('/');
  revalidatePath('/admin/about');
}

// 2D. DELETE PROCESS STEP
export async function deleteProcessStepAction(id: string): Promise<void> {
  await requireAdmin();
  const supabase = await createServerSupabaseClient();
  const { error } = await supabase.from('treatment_process').delete().eq('id', id);
  if (error) throw new Error(`Failed to delete process step: ${error.message}`);

  revalidatePath('/');
  revalidatePath('/admin/about');
}

// 3. UPSERT SERVICE
export async function upsertServiceAction(formData: FormData): Promise<void> {
  await requireAdmin();
  const supabase = await createServerSupabaseClient();

  const rawId = formData.get('id')?.toString();
  let targetId = isValidUUID(rawId) ? rawId : null;
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

  if (!targetId && payload.slug) {
    const { data: existing } = await supabase
      .from('services')
      .select('id')
      .eq('slug', payload.slug)
      .limit(1)
      .maybeSingle();
    if (existing?.id) {
      targetId = existing.id;
    }
  }

  let error;
  if (targetId) {
    ({ error } = await supabase.from('services').update(payload).eq('id', targetId));
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

  const rawId = formData.get('id')?.toString();
  let targetId = isValidUUID(rawId) ? rawId : null;
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

  if (!targetId && payload.slug) {
    const { data: existing } = await supabase
      .from('conditions')
      .select('id')
      .eq('slug', payload.slug)
      .limit(1)
      .maybeSingle();
    if (existing?.id) {
      targetId = existing.id;
    }
  }

  let error;
  if (targetId) {
    ({ error } = await supabase.from('conditions').update(payload).eq('id', targetId));
  } else {
    ({ error } = await supabase.from('conditions').insert(payload));
  }

  if (error) throw new Error(`Failed to save condition: ${error.message}`);

  revalidatePath('/');
  revalidatePath('/conditions');
  revalidatePath('/admin/conditions');
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
  revalidatePath('/admin/conditions');
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
  revalidatePath('/admin');
}

// DELETE INQUIRY
export async function deleteInquiryAction(id: string): Promise<void> {
  await requireAdmin();
  const supabase = await createServerSupabaseClient();
  const { error } = await supabase
    .from('consultation_inquiries')
    .delete()
    .eq('id', id);

  if (error) throw new Error(`Failed to delete inquiry: ${error.message}`);
  revalidatePath('/admin/inquiries');
  revalidatePath('/admin');
}

// 6. UPSERT FAQ
export async function upsertFAQAction(formData: FormData): Promise<void> {
  await requireAdmin();
  const supabase = await createServerSupabaseClient();

  const rawId = formData.get('id')?.toString();
  const id = isValidUUID(rawId) ? rawId : null;
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

  const rawId = formData.get('id')?.toString();
  let targetId = isValidUUID(rawId) ? rawId : null;
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
    is_active: formData.get('is_active') === 'false' ? false : true,
  };

  let error;

  if (!targetId) {
    const { data: existing } = await supabase
      .from('practitioners')
      .select('id')
      .limit(1)
      .maybeSingle();
    if (existing?.id) {
      targetId = existing.id;
    }
  }

  if (targetId) {
    ({ error } = await supabase.from('practitioners').update(payload).eq('id', targetId));
  } else {
    ({ error } = await supabase.from('practitioners').insert(payload));
  }

  if (error) throw new Error(`Failed to update practitioner: ${error.message}`);


  revalidatePath('/');
  revalidatePath('/doctor');
  revalidatePath('/about');
  revalidatePath('/admin/practitioner');
}

// 8. UPSERT GALLERY ITEM
export async function upsertGalleryItemAction(formData: FormData): Promise<void> {
  await requireAdmin();
  const supabase = await createServerSupabaseClient();

  const rawId = formData.get('id')?.toString();
  const id = isValidUUID(rawId) ? rawId : null;
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

  // Enforce 12 gallery images limit to conserve storage (Cloudinary & Supabase)
  if (!id) {
    const { count, error: countError } = await supabase
      .from('gallery_items')
      .select('*', { count: 'exact', head: true });

    if (countError) {
      throw new Error(`Failed to check gallery item limit: ${countError.message}`);
    }

    if ((count ?? 0) >= 12) {
      throw new Error(
        'Maximum limit of 12 gallery images reached. To add a new image, please delete an older image first.'
      );
    }
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
  revalidatePath('/gallery');
  revalidatePath('/admin/gallery');
  updateTag('gallery');
}

// DELETE GALLERY ITEM
export async function deleteGalleryItemAction(id: string): Promise<void> {
  await requireAdmin();
  const supabase = await createServerSupabaseClient();

  // Fetch the item to delete its image from Cloudinary to free storage
  const { data: item } = await supabase
    .from('gallery_items')
    .select('image_public_id')
    .eq('id', id)
    .maybeSingle();

  if (item?.image_public_id) {
    await deleteCloudinaryImage(item.image_public_id);
  }

  const { error } = await supabase
    .from('gallery_items')
    .delete()
    .eq('id', id);

  if (error) throw new Error(`Failed to delete gallery item: ${error.message}`);
  revalidatePath('/');
  revalidatePath('/about');
  revalidatePath('/gallery');
  revalidatePath('/admin/gallery');
  updateTag('gallery');
}


