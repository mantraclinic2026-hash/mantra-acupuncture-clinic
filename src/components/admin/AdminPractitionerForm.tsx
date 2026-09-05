'use client';

import React, { useState } from 'react';
import { Save } from 'lucide-react';
import { Practitioner } from '@/lib/types';
import { updatePractitionerAction } from '@/lib/actions/admin';
import ImageUploader from './ImageUploader';

interface AdminPractitionerFormProps {
  practitioner: Practitioner;
}

export default function AdminPractitionerForm({ practitioner }: AdminPractitionerFormProps) {
  const [profileUrl, setProfileUrl] = useState<string | null>(practitioner.profile_image_url);
  const [qualificationsText, setQualificationsText] = useState<string>(
    JSON.stringify(practitioner.qualifications || [], null, 2)
  );

  return (
    <form action={updatePractitionerAction} className="bg-[#F4EFE6] rounded-3xl p-6 sm:p-8 border border-[#E6DFD3] space-y-6">
      <input type="hidden" name="id" value={practitioner.id} />
      <input type="hidden" name="profile_image_url" value={profileUrl || ''} />
      <input type="hidden" name="qualifications" value={qualificationsText} />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-[#1B3B2B] mb-1.5">
            Full Name
          </label>
          <input
            type="text"
            name="full_name"
            defaultValue={practitioner.full_name}
            required
            className="w-full px-4 py-3 rounded-xl bg-[#FDFBF7] border border-[#E6DFD3] text-sm text-[#2C3531]"
          />
        </div>

        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-[#1B3B2B] mb-1.5">
            Clinical Title
          </label>
          <input
            type="text"
            name="title"
            defaultValue={practitioner.title}
            required
            className="w-full px-4 py-3 rounded-xl bg-[#FDFBF7] border border-[#E6DFD3] text-sm text-[#2C3531]"
          />
        </div>
      </div>

      <div>
        <label className="block text-xs font-bold uppercase tracking-wider text-[#1B3B2B] mb-1.5">
          Qualifications (JSON Array Format)
        </label>
        <textarea
          rows={4}
          value={qualificationsText}
          onChange={(e) => setQualificationsText(e.target.value)}
          className="w-full px-4 py-3 rounded-xl bg-[#FDFBF7] border border-[#E6DFD3] text-xs font-mono text-[#2C3531]"
        />
        <p className="text-[11px] text-[#586962] mt-1">
          Must be valid JSON array strings. e.g. [&quot;Bachelor of Naturopathy and Yogic Sciences (BNYS)&quot;, &quot;Master Degree in Naturopathy (MD)&quot;, &quot;Master Degree in Acupuncture&quot;]
        </p>
      </div>

      <div>
        <label className="block text-xs font-bold uppercase tracking-wider text-[#1B3B2B] mb-1.5">
          Practitioner Bio / Clinical Experience
        </label>
        <textarea
          rows={5}
          name="bio"
          defaultValue={practitioner.bio}
          required
          className="w-full px-4 py-3 rounded-xl bg-[#FDFBF7] border border-[#E6DFD3] text-sm text-[#2C3531]"
        />
      </div>

      <ImageUploader
        currentUrl={profileUrl}
        onUploadSuccess={(url) => setProfileUrl(url)}
        label="Practitioner Profile Photo (Cloudinary)"
      />

      <div className="pt-4 flex justify-end">
        <button
          type="submit"
          className="px-6 py-3.5 rounded-full bg-[#1B3B2B] hover:bg-[#12291E] text-white text-sm font-medium transition-all shadow-md flex items-center gap-2"
        >
          <Save className="w-4 h-4" />
          <span>Save Practitioner Profile</span>
        </button>
      </div>

    </form>
  );
}
