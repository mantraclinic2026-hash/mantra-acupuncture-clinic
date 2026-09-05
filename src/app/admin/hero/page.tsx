import React from 'react';
import { getHeroSection } from '@/lib/queries/site';
import { Sparkles } from 'lucide-react';
import AdminHeroForm from '@/components/admin/AdminHeroForm';

export default async function AdminHeroPage() {
  const hero = await getHeroSection();

  return (
    <div className="space-y-8 max-w-4xl">
      <div>
        <h1 className="font-serif text-3xl font-bold text-[#1B3B2B] flex items-center gap-2">
          <Sparkles className="w-7 h-7 text-[#C5A059]" />
          <span>Hero Section CMS</span>
        </h1>
        <p className="text-xs sm:text-sm text-[#586962] mt-1">
          Edit headline, subheadline, primary & secondary CTAs, and hero photo.
        </p>
      </div>

      <AdminHeroForm hero={hero} />
    </div>
  );
}
