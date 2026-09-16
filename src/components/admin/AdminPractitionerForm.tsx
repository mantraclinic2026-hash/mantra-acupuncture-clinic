'use client';

import React, { useState } from 'react';
import { Save, Edit2, X, Loader2, AlertCircle, User, CheckCircle2 } from 'lucide-react';
import { Practitioner } from '@/lib/types';
import { updatePractitionerAction } from '@/lib/actions/admin';
import ImageUploader from './ImageUploader';

interface AdminPractitionerFormProps {
  practitioner: Practitioner;
}

export default function AdminPractitionerForm({ practitioner }: AdminPractitionerFormProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [currentPractitioner, setCurrentPractitioner] = useState<Practitioner>(practitioner);
  const [profileUrl, setProfileUrl] = useState<string | null>(practitioner.profile_image_url);
  const [qualificationsText, setQualificationsText] = useState<string>(
    Array.isArray(practitioner.qualifications)
      ? practitioner.qualifications.join('\n')
      : ''
  );
  const [isSaving, setIsSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSaving(true);
    setSaveError(null);

    try {
      const formData = new FormData(e.currentTarget);
      
      // Parse qualifications from lines into JSON array
      const qualsArray = qualificationsText
        .split('\n')
        .map((q) => q.trim())
        .filter(Boolean);
      
      formData.set('qualifications', JSON.stringify(qualsArray));
      formData.set('profile_image_url', profileUrl || '');
      formData.set('is_active', 'true');

      await updatePractitionerAction(formData);

      setCurrentPractitioner((prev) => ({
        ...prev,
        full_name: formData.get('full_name')?.toString() || prev.full_name,
        title: formData.get('title')?.toString() || prev.title,
        bio: formData.get('bio')?.toString() || prev.bio,
        profile_image_url: profileUrl,
        qualifications: qualsArray,
      }));

      setIsEditing(false);
    } catch (err: unknown) {
      setSaveError(err instanceof Error ? err.message : 'Failed to save practitioner profile');
    } finally {
      setIsSaving(false);
    }
  };

  // ─── PREVIEW CARD ────────────────────────────────────────────────────────────
  if (!isEditing) {
    return (
      <div className="bg-[#EEE4D8] rounded-3xl border border-[#E6DFD3] overflow-hidden">
        {/* Card Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#E6DFD3]">
          <div>
            <h2 className="font-serif text-lg font-bold text-[#1B3B2B]">
              Practitioner Profile
            </h2>
            <p className="text-xs text-[#586962] mt-0.5">
              Doctor credentials, qualifications & biography
            </p>
          </div>
          <button
            onClick={() => setIsEditing(true)}
            className="p-2 rounded-xl bg-[#FAF2EB] border border-[#E6DFD3] text-[#1B3B2B] hover:text-[#C5A059] transition-colors"
            aria-label="Edit Practitioner Profile"
          >
            <Edit2 className="w-4 h-4" />
          </button>
        </div>

        {/* Preview Body */}
        <div className="p-6 flex flex-col sm:flex-row items-start sm:items-center gap-5">
          {/* Avatar Thumbnail */}
          <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full ring-4 ring-[#C5A059]/50 ring-offset-2 ring-offset-white overflow-hidden bg-white shrink-0 flex items-center justify-center shadow-sm">
            {currentPractitioner.profile_image_url ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={currentPractitioner.profile_image_url}
                alt={currentPractitioner.full_name}
                className="w-full h-full object-cover object-[center_top] scale-95 rounded-full"
              />
            ) : (
              <User className="w-10 h-10 text-[#A0907A]" />
            )}
          </div>

          {/* Details */}
          <div className="flex-1 space-y-2 min-w-0">
            <div>
              <h3 className="font-serif text-lg font-bold text-[#1B3B2B]">
                {currentPractitioner.full_name}
              </h3>
              <p className="text-xs text-[#C5A059] font-medium">
                {currentPractitioner.title}
              </p>
            </div>

            {/* Qualifications preview badges */}
            <div className="flex flex-wrap gap-1.5 pt-0.5">
              {(currentPractitioner.qualifications || []).map((qual, idx) => (
                <span
                  key={idx}
                  className="px-2 py-0.5 rounded-md bg-[#FAF2EB] border border-[#E6DFD3] text-[10px] text-[#2C3531] font-medium"
                >
                  {qual}
                </span>
              ))}
            </div>

            <p className="text-xs text-[#586962] line-clamp-2 leading-relaxed">
              {currentPractitioner.bio}
            </p>

            {currentPractitioner.profile_image_url && (
              <div className="pt-1">
                <span className="px-2 py-0.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-[10px] font-medium inline-flex items-center gap-1">
                  <CheckCircle2 className="w-2.5 h-2.5" /> Photo Configured
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  // ─── EDIT FORM ───────────────────────────────────────────────────────────────
  return (
    <form onSubmit={handleSubmit} className="bg-[#EEE4D8] rounded-3xl p-6 sm:p-8 border border-[#E6DFD3] space-y-6">
      <div className="flex items-center justify-between border-b border-[#E6DFD3] pb-4">
        <div>
          <h2 className="font-serif text-xl font-bold text-[#1B3B2B]">
            Edit Practitioner Profile & Credentials
          </h2>
          <p className="text-xs text-[#586962] mt-0.5">
            Update doctor credentials, professional biography, and profile photograph.
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

      {currentPractitioner.id && currentPractitioner.id !== 'default' && (
        <input type="hidden" name="id" value={currentPractitioner.id} />
      )}
      <input type="hidden" name="is_active" value="true" />
      <input type="hidden" name="profile_image_url" value={profileUrl || ''} />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-[#1B3B2B] mb-1.5">
            Full Name
          </label>
          <input
            type="text"
            name="full_name"
            defaultValue={currentPractitioner.full_name}
            required
            className="w-full px-4 py-3 rounded-xl bg-[#FAF2EB] border border-[#E6DFD3] text-sm text-[#2C3531]"
          />
        </div>

        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-[#1B3B2B] mb-1.5">
            Clinical Title
          </label>
          <input
            type="text"
            name="title"
            defaultValue={currentPractitioner.title}
            required
            className="w-full px-4 py-3 rounded-xl bg-[#FAF2EB] border border-[#E6DFD3] text-sm text-[#2C3531]"
          />
        </div>
      </div>

      <div>
        <label className="block text-xs font-bold uppercase tracking-wider text-[#1B3B2B] mb-1.5">
          Qualifications (One per line)
        </label>
        <textarea
          rows={3}
          value={qualificationsText}
          onChange={(e) => setQualificationsText(e.target.value)}
          placeholder="Bachelor of Naturopathy and Yogic Sciences (BNYS)&#10;Master Degree in Naturopathy (MD)&#10;Master Degree in Acupuncture"
          className="w-full px-4 py-3 rounded-xl bg-[#FAF2EB] border border-[#E6DFD3] text-sm text-[#2C3531] leading-relaxed"
        />
        <p className="text-[11px] text-[#586962] mt-1">
          Enter each medical degree or qualification on a new line.
        </p>
      </div>

      <div>
        <label className="block text-xs font-bold uppercase tracking-wider text-[#1B3B2B] mb-1.5">
          Practitioner Bio / Clinical Experience
        </label>
        <textarea
          rows={5}
          name="bio"
          defaultValue={currentPractitioner.bio}
          required
          className="w-full px-4 py-3 rounded-xl bg-[#FAF2EB] border border-[#E6DFD3] text-sm text-[#2C3531] leading-relaxed"
        />
      </div>

      <ImageUploader
        currentUrl={profileUrl}
        onUploadSuccess={(url) => setProfileUrl(url)}
        label="Practitioner Profile Photo (Cloudinary)"
      />

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
          <span>{isSaving ? 'Saving...' : 'Save Practitioner Profile'}</span>
        </button>
      </div>
    </form>
  );
}
