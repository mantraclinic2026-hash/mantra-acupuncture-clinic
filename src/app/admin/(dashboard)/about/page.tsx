import React from 'react';
import { getAboutContent, getTreatmentProcess } from '@/lib/queries/site';
import { BookOpen } from 'lucide-react';
import AdminAboutForm from '@/components/admin/AdminAboutForm';

export default async function AdminAboutPage() {
  const [about, steps] = await Promise.all([
    getAboutContent(),
    getTreatmentProcess(),
  ]);

  return (
    <div className="space-y-8 max-w-4xl">
      <div>
        <h1 className="font-serif text-3xl font-bold text-[#1B3B2B] flex items-center gap-2">
          <BookOpen className="w-7 h-7 text-[#C5A059]" />
          <span>About & Process CMS</span>
        </h1>
        <p className="text-xs sm:text-sm text-[#586962] mt-1">
          Manage the About Mantra headline, philosophy narrative, and 4 sequential care process steps.
        </p>
      </div>

      <AdminAboutForm about={about} steps={steps} />
    </div>
  );
}
