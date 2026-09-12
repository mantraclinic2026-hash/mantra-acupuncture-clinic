import React from 'react';
import { getSiteSettings } from '@/lib/queries/site';
import { Settings } from 'lucide-react';
import AdminSettingsForm from '@/components/admin/AdminSettingsForm';

export default async function AdminSettingsPage() {
  const settings = await getSiteSettings();

  return (
    <div className="space-y-8 max-w-4xl">
      <div>
        <h1 className="font-serif text-3xl font-bold text-[#1B3B2B] flex items-center gap-2">
          <Settings className="w-7 h-7 text-[#C5A059]" />
          <span>Site & Contact Settings CMS</span>
        </h1>
        <p className="text-xs sm:text-sm text-[#586962] mt-1">
          Manage clinic phone numbers, WhatsApp default messages, location address, working hours, and site-wide CTAs.
        </p>
      </div>

      <AdminSettingsForm settings={settings} />
    </div>
  );
}
