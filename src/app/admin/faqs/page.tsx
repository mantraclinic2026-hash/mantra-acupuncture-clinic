import React from 'react';
import { createServerSupabaseClient } from '@/lib/supabase/server';
import { FAQItem } from '@/lib/types';
import FAQsManager from '@/components/admin/FAQsManager';

export default async function AdminFAQsPage() {
  const supabase = await createServerSupabaseClient();
  const { data } = await supabase
    .from('faqs')
    .select('*')
    .order('display_order', { ascending: true });

  const faqs = (data || []) as FAQItem[];

  return (
    <div className="space-y-8 max-w-5xl">
      <div>
        <h1 className="font-serif text-3xl font-bold text-[#1B3B2B]">
          FAQs CMS
        </h1>
        <p className="text-xs sm:text-sm text-[#586962] mt-1">
          Add, edit, reorder, and publish frequently asked questions and patient guidance.
        </p>
      </div>

      <FAQsManager initialFAQs={faqs} />
    </div>
  );
}
