import React from 'react';
import { getSiteSettings } from '@/lib/queries/site';
import { updateSiteSettingsAction } from '@/lib/actions/admin';
import { Save, Settings } from 'lucide-react';

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

      <form action={updateSiteSettingsAction} className="bg-[#F4EFE6] rounded-3xl p-6 sm:p-8 border border-[#E6DFD3] space-y-6">
        <input type="hidden" name="id" value={settings.id} />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#1B3B2B] mb-1.5">
              Clinic Site Name
            </label>
            <input
              type="text"
              name="site_name"
              defaultValue={settings.site_name}
              required
              className="w-full px-4 py-3 rounded-xl bg-[#FDFBF7] border border-[#E6DFD3] text-sm text-[#2C3531]"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#1B3B2B] mb-1.5">
              Brand Tagline / Phrase
            </label>
            <input
              type="text"
              name="tagline"
              defaultValue={settings.tagline}
              required
              className="w-full px-4 py-3 rounded-xl bg-[#FDFBF7] border border-[#E6DFD3] text-sm text-[#2C3531]"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#1B3B2B] mb-1.5">
              Phone Number
            </label>
            <input
              type="text"
              name="phone"
              defaultValue={settings.phone}
              required
              className="w-full px-4 py-3 rounded-xl bg-[#FDFBF7] border border-[#E6DFD3] text-sm text-[#2C3531]"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#1B3B2B] mb-1.5">
              WhatsApp Number
            </label>
            <input
              type="text"
              name="whatsapp_number"
              defaultValue={settings.whatsapp_number}
              required
              className="w-full px-4 py-3 rounded-xl bg-[#FDFBF7] border border-[#E6DFD3] text-sm text-[#2C3531]"
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
            defaultValue={settings.default_whatsapp_message}
            className="w-full px-4 py-3 rounded-xl bg-[#FDFBF7] border border-[#E6DFD3] text-sm text-[#2C3531]"
          />
        </div>

        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-[#1B3B2B] mb-1.5">
            Full Address
          </label>
          <textarea
            rows={2}
            name="address"
            defaultValue={settings.address}
            required
            className="w-full px-4 py-3 rounded-xl bg-[#FDFBF7] border border-[#E6DFD3] text-sm text-[#2C3531]"
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
              defaultValue={settings.working_hours}
              required
              className="w-full px-4 py-3 rounded-xl bg-[#FDFBF7] border border-[#E6DFD3] text-sm text-[#2C3531]"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#1B3B2B] mb-1.5">
              Instagram Profile URL
            </label>
            <input
              type="url"
              name="instagram_url"
              defaultValue={settings.instagram_url || ''}
              className="w-full px-4 py-3 rounded-xl bg-[#FDFBF7] border border-[#E6DFD3] text-sm text-[#2C3531]"
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
            defaultValue={settings.google_maps_url || ''}
            className="w-full px-4 py-3 rounded-xl bg-[#FDFBF7] border border-[#E6DFD3] text-sm text-[#2C3531]"
          />
        </div>

        <div className="pt-4 border-t border-[#E6DFD3] grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#1B3B2B] mb-1.5">
              Floating WhatsApp Button Enabled
            </label>
            <select
              name="floating_whatsapp_enabled"
              defaultValue={settings.floating_whatsapp_enabled ? 'true' : 'false'}
              className="w-full px-4 py-3 rounded-xl bg-[#FDFBF7] border border-[#E6DFD3] text-sm text-[#2C3531]"
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
              defaultValue={settings.floating_call_enabled ? 'true' : 'false'}
              className="w-full px-4 py-3 rounded-xl bg-[#FDFBF7] border border-[#E6DFD3] text-sm text-[#2C3531]"
            >
              <option value="true">Enabled</option>
              <option value="false">Disabled</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-[#1B3B2B] mb-1.5">
            Medical Disclaimer Text
          </label>
          <textarea
            rows={3}
            name="disclaimer_text"
            defaultValue={settings.disclaimer_text}
            className="w-full px-4 py-3 rounded-xl bg-[#FDFBF7] border border-[#E6DFD3] text-sm text-[#2C3531]"
          />
        </div>

        <div className="pt-4 flex justify-end">
          <button
            type="submit"
            className="px-6 py-3.5 rounded-full bg-[#1B3B2B] hover:bg-[#12291E] text-white text-sm font-medium transition-all shadow-md flex items-center gap-2"
          >
            <Save className="w-4 h-4" />
            <span>Save Settings Changes</span>
          </button>
        </div>

      </form>
    </div>
  );
}
