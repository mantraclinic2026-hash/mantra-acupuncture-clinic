'use server';

import { z } from 'zod';
import { createServerSupabaseClient } from '@/lib/supabase/server';

const inquirySchema = z.object({
  fullName: z.string().min(2, 'Full Name must be at least 2 characters').max(100, 'Name is too long'),
  phone: z.string().min(8, 'Please enter a valid phone number with at least 8 digits').max(20, 'Phone number too long'),
  email: z.string().email('Please enter a valid email address').optional().or(z.literal('')),
  preferredDate: z.string().optional().or(z.literal('')),
  message: z.string().max(1000, 'Message cannot exceed 1000 characters').optional().or(z.literal('')),
  website_url: z.string().optional(), // Honeypot field - must be empty
});

export type InquiryActionResult = {
  success: boolean;
  message: string;
  errors?: Record<string, string>;
};

export async function submitConsultationInquiry(formData: FormData): Promise<InquiryActionResult> {
  try {
    const rawData = {
      fullName: formData.get('fullName')?.toString() || '',
      phone: formData.get('phone')?.toString() || '',
      email: formData.get('email')?.toString() || '',
      preferredDate: formData.get('preferredDate')?.toString() || '',
      message: formData.get('message')?.toString() || '',
      website_url: formData.get('website_url')?.toString() || '',
    };

    // Honeypot bot check: If filled, fake success
    if (rawData.website_url && rawData.website_url.trim().length > 0) {
      return {
        success: true,
        message: 'Your enquiry has been received. Our team will get in touch with you to confirm the details.',
      };
    }

    const validated = inquirySchema.safeParse(rawData);
    if (!validated.success) {
      const fieldErrors: Record<string, string> = {};
      validated.error.issues.forEach((issue) => {
        if (issue.path[0]) {
          fieldErrors[issue.path[0].toString()] = issue.message;
        }
      });
      return {
        success: false,
        message: 'Please review the form fields and correct any errors.',
        errors: fieldErrors,
      };
    }

    const data = validated.data;
    const supabase = await createServerSupabaseClient();

    // Minimal write surface: Pass only public user inputs.
    // Database schema defaults control id, status ('new'), created_at, updated_at.
    const { error } = await supabase.from('consultation_inquiries').insert({
      full_name: data.fullName.trim(),
      phone: data.phone.trim(),
      email: data.email ? data.email.trim() : null,
      preferred_date: data.preferredDate ? data.preferredDate : null,
      message: data.message ? data.message.trim() : null,
    });

    if (error) {
      console.error('Inquiry DB Insert Error:', error.message);
      return {
        success: false,
        message: 'Unable to submit your enquiry at this time. Please try calling or messaging us on WhatsApp directly.',
      };
    }

    return {
      success: true,
      message: 'Your enquiry has been received. Our team will get in touch with you to confirm the details.',
    };
  } catch (err: unknown) {
    console.error('Unexpected inquiry error:', err);
    return {
      success: false,
      message: 'An unexpected error occurred. Please contact our clinic directly via phone or WhatsApp.',
    };
  }
}
