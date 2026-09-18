import React from 'react';
import { createServerSupabaseClient } from '@/lib/supabase/server';
import { DEFAULT_PRACTITIONER } from '@/lib/queries/site';
import { Practitioner } from '@/lib/types';
import { UserCheck } from 'lucide-react';
import AdminPractitionerForm from '@/components/admin/AdminPractitionerForm';

export const dynamic = 'force-dynamic';

export default async function AdminPractitionerPage() {
  const supabase = await createServerSupabaseClient();
  const { data, error } = await supabase
    .from('practitioners')
    .select('*')
    .order('display_order', { ascending: true })
    .order('created_at', { ascending: true });

  const practitioners: Practitioner[] =
    !error && data && data.length > 0
      ? (data as Practitioner[])
      : [DEFAULT_PRACTITIONER];

  return (
    <div className="space-y-8 max-w-5xl">
      <div>
        <h1 className="font-serif text-3xl font-bold text-[#1B3B2B] flex items-center gap-2">
          <UserCheck className="w-7 h-7 text-[#C5A059]" />
          <span>Practitioners CMS</span>
        </h1>
        <p className="text-xs sm:text-sm text-[#586962] mt-1">
          Manage clinic doctors & healthcare practitioners, qualifications, clinical bios, display order, and photographs.
        </p>
      </div>

      <AdminPractitionerForm practitioners={practitioners} />
    </div>
  );
}
