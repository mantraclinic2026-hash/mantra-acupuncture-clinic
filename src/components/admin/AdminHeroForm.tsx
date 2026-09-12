'use client';

import React, { useState, useEffect } from 'react';
import {
  Edit2, Save, Loader2, CheckCircle2, AlertCircle, X,
  Image as ImageIcon, Smartphone,
} from 'lucide-react';
import { HeroSection } from '@/lib/types';
import { updateHeroAction } from '@/lib/actions/admin';
import ImageUploader from './ImageUploader';

interface AdminHeroFormProps {
  hero: HeroSection;
}

export default function AdminHeroForm({ hero }: AdminHeroFormProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [heroImageUrl, setHeroImageUrl] = useState<string | null>(hero.hero_image_url);
  const [heroMobileImageUrl, setHeroMobileImageUrl] = useState<string | null>(hero.hero_mobile_image_url || null);
  const [currentHero, setCurrentHero] = useState(hero);
  const [isSaving, setIsSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);

  // Auto-dismiss success toast
  useEffect(() => {
    if (!showSuccess) return;
    const t = setTimeout(() => setShowSuccess(false), 3500);
    return () => clearTimeout(t);
  }, [showSuccess]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSaving(true);
    setSaveError(null);
    try {
      const formData = new FormData(e.currentTarget);
      formData.set('hero_image_url', heroImageUrl || '');
      formData.set('hero_mobile_image_url', heroMobileImageUrl || '');

      await updateHeroAction(formData);

      setCurrentHero((prev) => ({
        ...prev,
        badge_text: formData.get('badge_text')?.toString() || prev.badge_text,
        headline: formData.get('headline')?.toString() || prev.headline,
        subheadline: formData.get('subheadline')?.toString() || prev.subheadline,
        primary_cta_text: formData.get('primary_cta_text')?.toString() || prev.primary_cta_text,
        secondary_cta_text: formData.get('secondary_cta_text')?.toString() || prev.secondary_cta_text,
        hero_image_url: heroImageUrl,
        hero_mobile_image_url: heroMobileImageUrl,
      }));

      setIsEditing(false);
      setShowSuccess(true);
    } catch (err: unknown) {
      setSaveError(err instanceof Error ? err.message : 'Failed to save hero section');
    } finally {
      setIsSaving(false);
    }
  };

  // ─── SUCCESS TOAST ────────────────────────────────────────────────────────────
  const SuccessToast = showSuccess ? (
    <div
      className="fixed bottom-6 right-6 z-50 flex items-center gap-3 px-5 py-3.5 bg-[#1B3B2B] text-white rounded-2xl shadow-2xl border border-[#2E5C3E] animate-in slide-in-from-bottom-4 duration-300"
      role="status"
    >
      <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
      <div>
        <p className="text-sm font-semibold">Hero section saved!</p>
        <p className="text-xs text-white/70">Changes are now live on your website.</p>
      </div>
      <button
        type="button"
        onClick={() => setShowSuccess(false)}
        className="ml-2 text-white/60 hover:text-white transition-colors"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  ) : null;

  // ─── PREVIEW CARD ────────────────────────────────────────────────────────────
  if (!isEditing) {
    return (
      <>
        {SuccessToast}
        <div className="bg-[#EEE4D8] rounded-3xl border border-[#E6DFD3] overflow-hidden shadow-xs">
          {/* Card Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-[#E6DFD3] bg-[#FAF2EB]/40">
            <div>
              <h2 className="font-serif text-lg font-bold text-[#1B3B2B]">Hero Section Content</h2>
              <p className="text-xs text-[#586962] mt-0.5">Homepage headline, CTAs, and full-width desktop & mobile view banners</p>
            </div>
            <button
              onClick={() => setIsEditing(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#FAF2EB] border border-[#E6DFD3] text-[#1B3B2B] hover:text-[#C5A059] hover:border-[#C5A059] text-xs font-semibold transition-all"
              aria-label="Edit Hero"
            >
              <Edit2 className="w-3.5 h-3.5" />
              <span>Edit Details</span>
            </button>
          </div>

          {/* Preview Body */}
          <div className="p-6">
            <div className="flex flex-col sm:flex-row items-start gap-5">
              {/* Thumbnails */}
              <div className="flex items-center gap-3 shrink-0">
                {/* Desktop */}
                <div className="space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#586962] block">Desktop</span>
                  <div className="w-28 h-18 rounded-xl overflow-hidden bg-[#DED5C5] border border-[#E6DFD3] flex items-center justify-center">
                    {currentHero.hero_image_url ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={currentHero.hero_image_url} alt="Hero Desktop" className="w-full h-full object-cover" />
                    ) : (
                      <ImageIcon className="w-5 h-5 text-[#A0907A]" />
                    )}
                  </div>
                </div>
                {/* Mobile */}
                <div className="space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#586962] block">Mobile</span>
                  <div className="w-16 h-18 rounded-xl overflow-hidden bg-[#DED5C5] border border-[#E6DFD3] flex items-center justify-center">
                    {heroMobileImageUrl ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={heroMobileImageUrl} alt="Hero Mobile" className="w-full h-full object-cover" />
                    ) : (
                      <Smartphone className="w-5 h-5 text-[#A0907A]" />
                    )}
                  </div>
                </div>
              </div>

              {/* Text */}
              <div className="flex-1 min-w-0 space-y-1.5">
                {currentHero.badge_text && (
                  <p className="text-[10px] font-bold uppercase tracking-wider text-[#C5A059]">{currentHero.badge_text}</p>
                )}
                <p className="font-serif font-bold text-[#1B3B2B] text-base leading-snug line-clamp-2">
                  {currentHero.headline || '—'}
                </p>
                <p className="text-xs text-[#586962] line-clamp-2">{currentHero.subheadline || '—'}</p>
                <div className="flex flex-wrap items-center gap-2 pt-1">
                  <span className="px-2.5 py-0.5 rounded-full bg-[#1B3B2B]/10 text-[#1B3B2B] text-[10px] font-medium">
                    CTA: {currentHero.primary_cta_text || 'Book a Consultation'}
                  </span>
                  {currentHero.hero_image_url && (
                    <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-[10px] font-medium flex items-center gap-1">
                      <CheckCircle2 className="w-2.5 h-2.5" /> Desktop Active
                    </span>
                  )}
                  {heroMobileImageUrl ? (
                    <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-[10px] font-medium flex items-center gap-1">
                      <CheckCircle2 className="w-2.5 h-2.5" /> Mobile Banner Active
                    </span>
                  ) : (
                    <span className="px-2.5 py-0.5 rounded-full bg-[#FAF2EB] border border-[#E6DFD3] text-[#586962] text-[10px] font-medium">
                      Uses Desktop on Mobile
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  // ─── EDIT FORM ───────────────────────────────────────────────────────────────
  return (
    <>
      {SuccessToast}
      <form onSubmit={handleSubmit} className="bg-[#EEE4D8] rounded-3xl p-6 sm:p-8 border border-[#E6DFD3] space-y-6">
        {/* Form Header */}
        <div className="flex items-center justify-between border-b border-[#E6DFD3] pb-4">
          <div>
            <h2 className="font-serif text-xl font-bold text-[#1B3B2B]">Edit Hero Section</h2>
            <p className="text-xs text-[#586962]">
              Homepage banner headline, CTAs, and separate desktop/mobile view photos.
            </p>
          </div>
          <button
            type="button"
            onClick={() => { setIsEditing(false); setSaveError(null); }}
            className="p-2 rounded-xl bg-[#FAF2EB] border border-[#E6DFD3] text-[#586962] hover:text-red-600 transition-colors"
            aria-label="Cancel"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Error Banner */}
        {saveError && (
          <div className="flex items-center gap-3 p-4 bg-red-50 border border-red-200 rounded-2xl text-red-800">
            <AlertCircle className="w-5 h-5 shrink-0 text-red-600" />
            <p className="text-sm font-medium">{saveError}</p>
          </div>
        )}

        {/* Hidden Fields */}
        {currentHero.id && currentHero.id !== 'default' && (
          <input type="hidden" name="id" value={currentHero.id} />
        )}
        <input type="hidden" name="hero_image_url" value={heroImageUrl || ''} />
        <input type="hidden" name="hero_mobile_image_url" value={heroMobileImageUrl || ''} />

        {/* Badge */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-[#1B3B2B] mb-1.5">
            Badge Tagline
          </label>
          <input
            type="text"
            name="badge_text"
            defaultValue={currentHero.badge_text || ''}
            className="w-full px-4 py-3 rounded-xl bg-[#FAF2EB] border border-[#E6DFD3] text-sm text-[#2C3531]"
          />
        </div>

        {/* Headline */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-[#1B3B2B] mb-1.5">
            Main Hero Headline
          </label>
          <textarea
            rows={2}
            name="headline"
            defaultValue={currentHero.headline}
            required
            className="w-full px-4 py-3 rounded-xl bg-[#FAF2EB] border border-[#E6DFD3] text-sm font-serif font-bold text-[#1B3B2B]"
          />
        </div>

        {/* Subheadline */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-[#1B3B2B] mb-1.5">
            Subheadline / Paragraph
          </label>
          <textarea
            rows={3}
            name="subheadline"
            defaultValue={currentHero.subheadline}
            required
            className="w-full px-4 py-3 rounded-xl bg-[#FAF2EB] border border-[#E6DFD3] text-sm text-[#2C3531]"
          />
        </div>

        {/* CTA Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#1B3B2B] mb-1.5">
              Primary CTA Text
            </label>
            <input
              type="text"
              name="primary_cta_text"
              defaultValue={currentHero.primary_cta_text}
              required
              className="w-full px-4 py-3 rounded-xl bg-[#FAF2EB] border border-[#E6DFD3] text-sm text-[#2C3531]"
            />
          </div>
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#1B3B2B] mb-1.5">
              Primary CTA Link
            </label>
            <input
              type="text"
              name="primary_cta_link"
              defaultValue={currentHero.primary_cta_link}
              required
              className="w-full px-4 py-3 rounded-xl bg-[#FAF2EB] border border-[#E6DFD3] text-sm text-[#2C3531]"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#1B3B2B] mb-1.5">
              Secondary CTA Text
            </label>
            <input
              type="text"
              name="secondary_cta_text"
              defaultValue={currentHero.secondary_cta_text || 'Call +91 8129627829'}
              required
              className="w-full px-4 py-3 rounded-xl bg-[#FAF2EB] border border-[#E6DFD3] text-sm text-[#2C3531]"
            />
          </div>
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#1B3B2B] mb-1.5">
              Secondary CTA Link
            </label>
            <input
              type="text"
              name="secondary_cta_link"
              defaultValue={currentHero.secondary_cta_link || 'tel:+918129627829'}
              required
              className="w-full px-4 py-3 rounded-xl bg-[#FAF2EB] border border-[#E6DFD3] text-sm text-[#2C3531]"
            />
          </div>
        </div>

        {/* Banner Uploaders */}
        <div className="pt-2 border-t border-[#E6DFD3] space-y-6">
          <h3 className="font-serif text-lg font-bold text-[#1B3B2B]">Hero Background Banners</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Desktop Banner */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <ImageIcon className="w-4 h-4 text-[#C5A059]" />
                <span className="text-xs font-bold uppercase tracking-wider text-[#1B3B2B]">
                  Desktop &amp; Tablet Banner
                </span>
              </div>
              <ImageUploader
                currentUrl={heroImageUrl}
                onUploadSuccess={(url) => setHeroImageUrl(url)}
                label="Upload Desktop Banner"
                helperText="Landscape orientation recommended."
              />
            </div>

            {/* Mobile View Banner — same ImageUploader style */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Smartphone className="w-4 h-4 text-[#C5A059]" />
                <span className="text-xs font-bold uppercase tracking-wider text-[#1B3B2B]">
                  Mobile View Banner (Optional)
                </span>
              </div>
              <ImageUploader
                currentUrl={heroMobileImageUrl}
                onUploadSuccess={(url) => setHeroMobileImageUrl(url || null)}
                label="Upload Mobile Banner"
                helperText="Portrait 9:16 recommended. Leave empty to use desktop banner on mobile."
              />
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="pt-4 flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={() => { setIsEditing(false); setSaveError(null); }}
            className="px-5 py-3 rounded-full border border-[#E6DFD3] text-sm font-medium text-[#586962] hover:bg-[#DED5C5] transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSaving}
            className="px-6 py-3 rounded-full bg-[#1B3B2B] hover:bg-[#12291E] disabled:opacity-60 disabled:cursor-not-allowed text-white text-sm font-medium transition-all shadow-md flex items-center gap-2"
          >
            {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            <span>{isSaving ? 'Saving...' : 'Save Hero'}</span>
          </button>
        </div>
      </form>
    </>
  );
}
