import React from 'react';
import { createServerSupabaseClient } from '@/lib/supabase/server';
import { ConditionItem } from '@/lib/types';
import ConditionsManager from '@/components/admin/ConditionsManager';

export default async function AdminConditionsPage() {
  const supabase = await createServerSupabaseClient();
  const { data } = await supabase
    .from('conditions')
    .select('*')
    .order('display_order', { ascending: true });

  const conditions = (data || []) as ConditionItem[];

  return (
    <div className="space-y-8 max-w-5xl">
      <div>
        <h1 className="font-serif text-3xl font-bold text-[#1B3B2B]">
          Conditions Supported CMS
        </h1>
        <p className="text-xs sm:text-sm text-[#586962] mt-1">
          Manage supported health concerns, categories, and responsible medical information.
        </p>
      </div>

      <ConditionsManager initialConditions={conditions} />
    </div>
  );
}
