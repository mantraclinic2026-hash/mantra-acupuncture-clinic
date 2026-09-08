import React from 'react';
import { createServerSupabaseClient } from '@/lib/supabase/server';
import { ConsultationInquiry } from '@/lib/types';
import InquiryTable from '@/components/admin/InquiryTable';

export default async function AdminInquiriesPage() {
  const supabase = await createServerSupabaseClient();
  const { data, error } = await supabase
    .from('consultation_inquiries')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Failed to load inquiries:', error.message);
  }

  const inquiries = (data || []) as ConsultationInquiry[];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-serif text-3xl font-bold text-[#1B3B2B]">
          Consultation Inquiries
        </h1>
        <p className="text-xs sm:text-sm text-[#586962] mt-1">
          Review, update status, and manage patient consultation requests submitted online.
        </p>
      </div>

      <InquiryTable inquiries={inquiries} />
    </div>
  );
}
