'use client';

import React, { useState } from 'react';
import { Save, Edit2, X, Loader2, AlertCircle, Settings, Phone, MessageSquare, Clock, MapPin, CheckCircle2 } from 'lucide-react';
import { SiteSettings } from '@/lib/types';
import { updateSiteSettingsAction } from '@/lib/actions/admin';

interface AdminSettingsFormProps {
  settings: SiteSettings;
}

export default function AdminSettingsForm({ settings }: AdminSettingsFormProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [currentSettings, setCurrentSettings] = useState<SiteSettings>(settings);
  const [isSaving, setIsSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSaving(true);
    setSaveError(null);

    try {
      const formData = new FormData(e.currentTarget);
      await updateSiteSettingsAction(formData);

      setCurrentSettings((prev) => ({
        ...prev,
        site_name: formData.get('site_name')?.toString() || prev.site_name,
        tagline: formData.get('tagline')?.toString() || prev.tagline,
        phone: formData.get('phone')?.toString() || prev.phone,
        whatsapp_number: formData.get('whatsapp_number')?.toString() || prev.whatsapp_number,
        default_whatsapp_message: formData.get('default_whatsapp_message')?.toString() || prev.default_whatsapp_message,
        address: formData.get('address')?.toString() || prev.address,
        working_hours: formData.get('working_hours')?.toString() || prev.working_hours,
        instagram_url: formData.get('instagram_url')?.toString() || prev.instagram_url,
        google_maps_url: formData.get('google_maps_url')?.toString() || prev.google_maps_url,
        floating_whatsapp_enabled: formData.get('floating_whatsapp_enabled') === 'true',
        floating_call_enabled: formData.get('floating_call_enabled') === 'true',
        banner_eyebrow: formData.get('banner_eyebrow')?.toString() || prev.banner_eyebrow,
        banner_headline: formData.get('banner_headline')?.toString() || prev.banner_headline,
        banner_primary_cta_label: formData.get('banner_primary_cta_label')?.toString() || prev.banner_primary_cta_label,
        banner_primary_cta_link: formData.get('banner_primary_cta_link')?.toString() || prev.banner_primary_cta_link,
        banner_phone_label: formData.get('banner_phone_label')?.toString() || prev.banner_phone_label,
        conditions_eyebrow: formData.get('conditions_eyebrow')?.toString() || prev.conditions_eyebrow,
        conditions_headline: formData.get('conditions_headline')?.toString() || prev.conditions_headline,
        conditions_subtitle: formData.get('conditions_subtitle')?.toString() || prev.conditions_subtitle,
        conditions_cta_label: formData.get('conditions_cta_label')?.toString() || prev.conditions_cta_label,
        practitioner_eyebrow: formData.get('practitioner_eyebrow')?.toString() || prev.practitioner_eyebrow,
        practitioner_booking_headline: formData.get('practitioner_booking_headline')?.toString() || prev.practitioner_booking_headline,
        practitioner_booking_subtitle: formData.get('practitioner_booking_subtitle')?.toString() || prev.practitioner_booking_subtitle,
        disclaimer_text: formData.get('disclaimer_text')?.toString() || prev.disclaimer_text,
      }));

      setIsEditing(false);
    } catch (err: unknown) {
      setSaveError(err instanceof Error ? err.message : 'Failed to save settings');
    } finally {
      setIsSaving(false);
    }
  };

  // ─── PREVIEW CARD ────────────────────────────────────────────────────────────
  if (!isEditing) {
    return (
      <div className="bg-[#EEE4D8] rounded-3xl border border-[#E6DFD3] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#E6DFD3]">
          <div>
            <h2 className="font-serif text-lg font-bold text-[#1B3B2B] flex items-center gap-2">
              <Settings className="w-5 h-5 text-[#C5A059]" />
              <span>Site & Contact Settings</span>
            </h2>
            <p className="text-xs text-[#586962] mt-0.5">
              Clinic branding, phone, WhatsApp & operating schedule
            </p>
          </div>
          <button
            onClick={() => setIsEditing(true)}
            className="p-2 rounded-xl bg-[#FAF2EB] border border-[#E6DFD3] text-[#1B3B2B] hover:text-[#C5A059] transition-colors"
            aria-label="Edit Site Settings"
          >
            <Edit2 className="w-4 h-4" />
          </button>
        </div>

        {/* Preview Summary Grid */}
        <div className="p-6 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {/* Brand */}
            <div className="p-4 bg-[#FAF2EB] rounded-2xl border border-[#E6DFD3] space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#586962] block">
                Brand & Name
              </span>
              <p className="font-serif font-bold text-sm text-[#1B3B2B] truncate">
                {currentSettings.site_name}
              </p>
              <p className="text-xs text-[#C5A059] truncate">
                {currentSettings.tagline}
              </p>
            </div>

            {/* Direct Contact */}
            <div className="p-4 bg-[#FAF2EB] rounded-2xl border border-[#E6DFD3] space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#586962] block">
                Direct Contact
              </span>
              <p className="text-xs font-semibold text-[#1B3B2B] flex items-center gap-1.5 truncate">
                <Phone className="w-3.5 h-3.5 text-[#1B3B2B] shrink-0" />
                <span>{currentSettings.phone}</span>
              </p>
              <p className="text-xs font-semibold text-[#25D366] flex items-center gap-1.5 truncate">
                <MessageSquare className="w-3.5 h-3.5 text-[#25D366] shrink-0" />
                <span>{currentSettings.whatsapp_number}</span>
              </p>
            </div>

            {/* Hours & Location */}
            <div className="p-4 bg-[#FAF2EB] rounded-2xl border border-[#E6DFD3] space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#586962] block">
                Hours & Location
              </span>
              <p className="text-xs text-[#1B3B2B] font-medium flex items-center gap-1.5 truncate">
                <Clock className="w-3.5 h-3.5 text-[#C5A059] shrink-0" />
                <span>{currentSettings.working_hours}</span>
              </p>
              <p className="text-xs text-[#586962] flex items-center gap-1.5 truncate">
                <MapPin className="w-3.5 h-3.5 text-[#586962] shrink-0" />
                <span>{currentSettings.address}</span>
              </p>
            </div>
          </div>

          {/* Status Badges */}
          <div className="flex flex-wrap items-center gap-2 pt-1">
            <span
              className={`px-2.5 py-1 rounded-full text-[10px] font-medium border flex items-center gap-1 ${
                currentSettings.floating_whatsapp_enabled
                  ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                  : 'bg-stone-100 text-stone-600 border-stone-200'
              }`}
            >
              {currentSettings.floating_whatsapp_enabled && <CheckCircle2 className="w-2.5 h-2.5" />}
              WhatsApp Button: {currentSettings.floating_whatsapp_enabled ? 'Active' : 'Disabled'}
            </span>

            <span
              className={`px-2.5 py-1 rounded-full text-[10px] font-medium border flex items-center gap-1 ${
                currentSettings.floating_call_enabled
                  ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                  : 'bg-stone-100 text-stone-600 border-stone-200'
              }`}
            >
              {currentSettings.floating_call_enabled && <CheckCircle2 className="w-2.5 h-2.5" />}
              Call Button: {currentSettings.floating_call_enabled ? 'Active' : 'Disabled'}
            </span>

            <span className="px-2.5 py-1 rounded-full text-[10px] font-medium bg-[#1B3B2B]/10 text-[#1B3B2B]">
              Pre-Footer CTA: {currentSettings.banner_primary_cta_label || 'Book Your Consultation'}
            </span>

            <span className="px-2.5 py-1 rounded-full text-[10px] font-medium bg-[#FAF2EB] border border-[#E6DFD3] text-[#586962]">
              Conditions CTA: {currentSettings.conditions_cta_label || 'View All Conditions'}
            </span>
          </div>
        </div>
      </div>
    );
  }

  // ─── EDIT FORM ───────────────────────────────────────────────────────────────
  return (
    <form
      onSubmit={handleSubmit}
      className="bg-[#EEE4D8] rounded-3xl p-6 sm:p-8 border border-[#E6DFD3] space-y-6"
    >
      <div className="flex items-center justify-between border-b border-[#E6DFD3] pb-4">
        <div>
          <h2 className="font-serif text-xl font-bold text-[#1B3B2B] flex items-center gap-2">
            <Settings className="w-5 h-5 text-[#C5A059]" />
            <span>Edit Site & Contact Settings</span>
          </h2>
          <p className="text-xs text-[#586962] mt-0.5">
            Configure phone numbers, WhatsApp, address, timings, and section copy.
          </p>
        </div>
        <button
          type="button"
          onClick={() => {
            setIsEditing(false);
            setSaveError(null);
          }}
          className="p-2 rounded-xl bg-[#FAF2EB] border border-[#E6DFD3] text-[#586962] hover:text-red-600 transition-colors"
          aria-label="Cancel editing"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {saveError && (
        <div className="flex items-center gap-3 p-4 bg-red-50 border border-red-200 rounded-2xl text-red-800">
          <AlertCircle className="w-5 h-5 shrink-0 text-red-600" />
          <p className="text-sm font-medium">{saveError}</p>
        </div>
      )}

      {currentSettings.id && currentSettings.id !== 'default' && (
        <input type="hidden" name="id" value={currentSettings.id} />
      )}

      {/* Brand & Phone Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-[#1B3B2B] mb-1.5">
            Clinic Site Name
          </label>
          <input
            type="text"
            name="site_name"
            defaultValue={currentSettings.site_name}
            required
            className="w-full px-4 py-3 rounded-xl bg-[#FAF2EB] border border-[#E6DFD3] text-sm text-[#2C3531]"
          />
        </div>

        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-[#1B3B2B] mb-1.5">
            Brand Tagline / Phrase
          </label>
          <input
            type="text"
            name="tagline"
            defaultValue={currentSettings.tagline}
            required
            className="w-full px-4 py-3 rounded-xl bg-[#FAF2EB] border border-[#E6DFD3] text-sm text-[#2C3531]"
          />
        </div>

        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-[#1B3B2B] mb-1.5">
            Phone Number
          </label>
          <input
            type="text"
            name="phone"
            defaultValue={currentSettings.phone}
            required
            className="w-full px-4 py-3 rounded-xl bg-[#FAF2EB] border border-[#E6DFD3] text-sm text-[#2C3531]"
          />
        </div>

        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-[#1B3B2B] mb-1.5">
            WhatsApp Number
          </label>
          <input
            type="text"
            name="whatsapp_number"
            defaultValue={currentSettings.whatsapp_number}
            required
            className="w-full px-4 py-3 rounded-xl bg-[#FAF2EB] border border-[#E6DFD3] text-sm text-[#2C3531]"
          />
        </div>
      </div>

      <div>
        <label className="block text-xs font-bold uppercase tracking-wider text-[#1B3B2B] mb-1.5">
          Default WhatsApp Prompt Message
        </label>
        <textarea
          rows={2}
          name="default_whatsapp_message"
          defaultValue={currentSettings.default_whatsapp_message}
          className="w-full px-4 py-3 rounded-xl bg-[#FAF2EB] border border-[#E6DFD3] text-sm text-[#2C3531]"
        />
      </div>

      <div>
        <label className="block text-xs font-bold uppercase tracking-wider text-[#1B3B2B] mb-1.5">
          Full Address
        </label>
        <textarea
          rows={2}
          name="address"
          defaultValue={currentSettings.address}
          required
          className="w-full px-4 py-3 rounded-xl bg-[#FAF2EB] border border-[#E6DFD3] text-sm text-[#2C3531]"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-[#1B3B2B] mb-1.5">
            Working Hours
          </label>
          <input
            type="text"
            name="working_hours"
            defaultValue={currentSettings.working_hours}
            required
            className="w-full px-4 py-3 rounded-xl bg-[#FAF2EB] border border-[#E6DFD3] text-sm text-[#2C3531]"
          />
        </div>

        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-[#1B3B2B] mb-1.5">
            Instagram Profile URL
          </label>
          <input
            type="url"
            name="instagram_url"
            defaultValue={currentSettings.instagram_url || ''}
            className="w-full px-4 py-3 rounded-xl bg-[#FAF2EB] border border-[#E6DFD3] text-sm text-[#2C3531]"
          />
        </div>
      </div>

      <div>
        <label className="block text-xs font-bold uppercase tracking-wider text-[#1B3B2B] mb-1.5">
          Google Maps Location URL
        </label>
        <input
          type="url"
          name="google_maps_url"
          defaultValue={currentSettings.google_maps_url || ''}
          className="w-full px-4 py-3 rounded-xl bg-[#FAF2EB] border border-[#E6DFD3] text-sm text-[#2C3531]"
        />
      </div>

      {/* Floating Action Buttons */}
      <div className="pt-4 border-t border-[#E6DFD3] grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-[#1B3B2B] mb-1.5">
            Floating WhatsApp Button Enabled
          </label>
          <select
            name="floating_whatsapp_enabled"
            defaultValue={currentSettings.floating_whatsapp_enabled ? 'true' : 'false'}
            className="w-full px-4 py-3 rounded-xl bg-[#FAF2EB] border border-[#E6DFD3] text-sm text-[#2C3531]"
          >
            <option value="true">Enabled</option>
            <option value="false">Disabled</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-[#1B3B2B] mb-1.5">
            Floating Call Button Enabled
          </label>
          <select
            name="floating_call_enabled"
            defaultValue={currentSettings.floating_call_enabled ? 'true' : 'false'}
            className="w-full px-4 py-3 rounded-xl bg-[#FAF2EB] border border-[#E6DFD3] text-sm text-[#2C3531]"
          >
            <option value="true">Enabled</option>
            <option value="false">Disabled</option>
          </select>
        </div>
      </div>

      {/* Pre-Footer CTA Banner Settings */}
      <div className="pt-6 border-t border-[#E6DFD3] space-y-4">
        <div>
          <h3 className="font-serif text-lg font-bold text-[#1B3B2B]">
            Pre-Footer CTA Ribbon Banner
          </h3>
          <p className="text-xs text-[#586962] mt-0.5">
            The high-conversion green banner located just above the clinic footer.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#1B3B2B] mb-1.5">
              Banner Eyebrow Tag
            </label>
            <input
              type="text"
              name="banner_eyebrow"
              defaultValue={currentSettings.banner_eyebrow || 'YOUR HEALING JOURNEY'}
              className="w-full px-4 py-3 rounded-xl bg-[#FAF2EB] border border-[#E6DFD3] text-sm text-[#2C3531]"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#1B3B2B] mb-1.5">
              Primary CTA Button Text
            </label>
            <input
              type="text"
              name="banner_primary_cta_label"
              defaultValue={currentSettings.banner_primary_cta_label || 'Book Your Consultation'}
              className="w-full px-4 py-3 rounded-xl bg-[#FAF2EB] border border-[#E6DFD3] text-sm text-[#2C3531]"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-[#1B3B2B] mb-1.5">
            Banner Headline
          </label>
          <input
            type="text"
            name="banner_headline"
            defaultValue={currentSettings.banner_headline || 'Your Journey Toward Better Balance Can Begin With a Conversation.'}
            className="w-full px-4 py-3 rounded-xl bg-[#FAF2EB] border border-[#E6DFD3] text-sm text-[#2C3531]"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#1B3B2B] mb-1.5">
              Primary CTA Button Link
            </label>
            <input
              type="text"
              name="banner_primary_cta_link"
              defaultValue={currentSettings.banner_primary_cta_link || '/contact'}
              className="w-full px-4 py-3 rounded-xl bg-[#FAF2EB] border border-[#E6DFD3] text-sm text-[#2C3531]"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#1B3B2B] mb-1.5">
              Secondary Phone Button Label
            </label>
            <input
              type="text"
              name="banner_phone_label"
              defaultValue={currentSettings.banner_phone_label || 'Call +91 8129627829'}
              className="w-full px-4 py-3 rounded-xl bg-[#FAF2EB] border border-[#E6DFD3] text-sm text-[#2C3531]"
            />
          </div>
        </div>
      </div>

      {/* Conditions Section Settings */}
      <div className="pt-6 border-t border-[#E6DFD3] space-y-4">
        <div>
          <h3 className="font-serif text-lg font-bold text-[#1B3B2B]">
            Conditions We Support Section
          </h3>
          <p className="text-xs text-[#586962] mt-0.5">
            Controls the text displayed in the conditions section on the homepage.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#1B3B2B] mb-1.5">
              Eyebrow Tag
            </label>
            <input
              type="text"
              name="conditions_eyebrow"
              defaultValue={currentSettings.conditions_eyebrow || 'CONDITIONS WE SUPPORT'}
              className="w-full px-4 py-3 rounded-xl bg-[#FAF2EB] border border-[#E6DFD3] text-sm text-[#2C3531]"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#1B3B2B] mb-1.5">
              CTA Button Text
            </label>
            <input
              type="text"
              name="conditions_cta_label"
              defaultValue={currentSettings.conditions_cta_label || 'View All Conditions'}
              className="w-full px-4 py-3 rounded-xl bg-[#FAF2EB] border border-[#E6DFD3] text-sm text-[#2C3531]"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-[#1B3B2B] mb-1.5">
            Section Headline
          </label>
          <input
            type="text"
            name="conditions_headline"
            defaultValue={currentSettings.conditions_headline || 'Supporting Your Body Through Better Balance.'}
            className="w-full px-4 py-3 rounded-xl bg-[#FAF2EB] border border-[#E6DFD3] text-sm text-[#2C3531]"
          />
        </div>

        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-[#1B3B2B] mb-1.5">
            Section Subtitle
          </label>
          <textarea
            rows={2}
            name="conditions_subtitle"
            defaultValue={currentSettings.conditions_subtitle || ''}
            className="w-full px-4 py-3 rounded-xl bg-[#FAF2EB] border border-[#E6DFD3] text-sm text-[#2C3531]"
          />
        </div>
      </div>

      {/* Practitioner & Booking Section Settings */}
      <div className="pt-6 border-t border-[#E6DFD3] space-y-4">
        <div>
          <h3 className="font-serif text-lg font-bold text-[#1B3B2B]">
            Practitioner & Booking Section
          </h3>
          <p className="text-xs text-[#586962] mt-0.5">
            Controls labels shown in the 2-card practitioner + booking layout.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#1B3B2B] mb-1.5">
              Practitioner Card Eyebrow
            </label>
            <input
              type="text"
              name="practitioner_eyebrow"
              defaultValue={currentSettings.practitioner_eyebrow || 'YOUR PRACTITIONER'}
              className="w-full px-4 py-3 rounded-xl bg-[#FAF2EB] border border-[#E6DFD3] text-sm text-[#2C3531]"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#1B3B2B] mb-1.5">
              Booking Card Headline
            </label>
            <input
              type="text"
              name="practitioner_booking_headline"
              defaultValue={currentSettings.practitioner_booking_headline || 'Book Your Consultation'}
              className="w-full px-4 py-3 rounded-xl bg-[#FAF2EB] border border-[#E6DFD3] text-sm text-[#2C3531]"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-[#1B3B2B] mb-1.5">
            Booking Card Subtitle
          </label>
          <textarea
            rows={2}
            name="practitioner_booking_subtitle"
            defaultValue={currentSettings.practitioner_booking_subtitle || ''}
            className="w-full px-4 py-3 rounded-xl bg-[#FAF2EB] border border-[#E6DFD3] text-sm text-[#2C3531]"
          />
        </div>
      </div>

      <div>
        <label className="block text-xs font-bold uppercase tracking-wider text-[#1B3B2B] mb-1.5">
          Medical Disclaimer Text
        </label>
        <textarea
          rows={3}
          name="disclaimer_text"
          defaultValue={currentSettings.disclaimer_text}
          className="w-full px-4 py-3 rounded-xl bg-[#FAF2EB] border border-[#E6DFD3] text-sm text-[#2C3531]"
        />
      </div>

      <div className="pt-4 flex items-center justify-end gap-3">
        <button
          type="button"
          onClick={() => {
            setIsEditing(false);
            setSaveError(null);
          }}
          className="px-5 py-3 rounded-full border border-[#E6DFD3] text-sm font-medium text-[#586962] hover:bg-[#DED5C5] transition-colors"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isSaving}
          className="px-6 py-3.5 rounded-full bg-[#1B3B2B] hover:bg-[#12291E] disabled:opacity-60 text-white text-sm font-medium transition-all shadow-md flex items-center gap-2"
        >
          {isSaving ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <Save className="w-4 h-4" />
          )}
          <span>{isSaving ? 'Saving...' : 'Save Settings Changes'}</span>
        </button>
      </div>
    </form>
  );
}
