import React from 'react';
import { createServerSupabaseClient } from '@/lib/supabase/server';
import { ServiceItem } from '@/lib/types';
import ServicesManager from '@/components/admin/ServicesManager';

export default async function AdminServicesPage() {
  const supabase = await createServerSupabaseClient();
  const { data } = await supabase
    .from('services')
    .select('*')
    .order('display_order', { ascending: true });

  const services = (data || []) as ServiceItem[];

  return (
    <div className="space-y-8 max-w-5xl">
      <div>
        <h1 className="font-serif text-3xl font-bold text-[#1B3B2B]">
          Services CMS
        </h1>
        <p className="text-xs sm:text-sm text-[#586962] mt-1">
          Add, edit, reorder, or publish/unpublish clinic acupuncture service offerings.
        </p>
      </div>

      <ServicesManager initialServices={services} />
    </div>
  );
}
