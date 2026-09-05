'use client';

import React, { useState } from 'react';
import { Save } from 'lucide-react';
import { HeroSection } from '@/lib/types';
import { updateHeroAction } from '@/lib/actions/admin';
import ImageUploader from './ImageUploader';

interface AdminHeroFormProps {
  hero: HeroSection;
}

export default function AdminHeroForm({ hero }: AdminHeroFormProps) {
  const [heroImageUrl, setHeroImageUrl] = useState<string | null>(hero.hero_image_url);

  return (
    <form action={updateHeroAction} className="bg-[#F4EFE6] rounded-3xl p-6 sm:p-8 border border-[#E6DFD3] space-y-6">
      <input type="hidden" name="id" value={hero.id} />
      <input type="hidden" name="hero_image_url" value={heroImageUrl || ''} />

      <div>
        <label className="block text-xs font-bold uppercase tracking-wider text-[#1B3B2B] mb-1.5">
          Badge Tagline
        </label>
        <input
          type="text"
          name="badge_text"
          defaultValue={hero.badge_text || ''}
          className="w-full px-4 py-3 rounded-xl bg-[#FDFBF7] border border-[#E6DFD3] text-sm text-[#2C3531]"
        />
      </div>

      <div>
        <label className="block text-xs font-bold uppercase tracking-wider text-[#1B3B2B] mb-1.5">
          Main Hero Headline
        </label>
        <textarea
          rows={2}
          name="headline"
          defaultValue={hero.headline}
          required
          className="w-full px-4 py-3 rounded-xl bg-[#FDFBF7] border border-[#E6DFD3] text-sm font-serif font-bold text-[#1B3B2B]"
        />
      </div>

      <div>
        <label className="block text-xs font-bold uppercase tracking-wider text-[#1B3B2B] mb-1.5">
          Subheadline / Paragraph
        </label>
        <textarea
          rows={3}
          name="subheadline"
          defaultValue={hero.subheadline}
          required
          className="w-full px-4 py-3 rounded-xl bg-[#FDFBF7] border border-[#E6DFD3] text-sm text-[#2C3531]"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-[#1B3B2B] mb-1.5">
            Primary CTA Button Text
          </label>
          <input
            type="text"
            name="primary_cta_text"
            defaultValue={hero.primary_cta_text}
            required
            className="w-full px-4 py-3 rounded-xl bg-[#FDFBF7] border border-[#E6DFD3] text-sm text-[#2C3531]"
          />
        </div>

        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-[#1B3B2B] mb-1.5">
            Primary CTA Link
          </label>
          <input
            type="text"
            name="primary_cta_link"
            defaultValue={hero.primary_cta_link}
            required
            className="w-full px-4 py-3 rounded-xl bg-[#FDFBF7] border border-[#E6DFD3] text-sm text-[#2C3531]"
          />
        </div>
      </div>

      <ImageUploader
        currentUrl={heroImageUrl}
        onUploadSuccess={(url) => setHeroImageUrl(url)}
        label="Hero Photo (Cloudinary)"
      />

      <div className="pt-4 flex justify-end">
        <button
          type="submit"
          className="px-6 py-3.5 rounded-full bg-[#1B3B2B] hover:bg-[#12291E] text-white text-sm font-medium transition-all shadow-md flex items-center gap-2"
        >
          <Save className="w-4 h-4" />
          <span>Save Hero Changes</span>
        </button>
      </div>

    </form>
  );
}
