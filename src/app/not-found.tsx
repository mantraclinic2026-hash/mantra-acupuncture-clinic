import React from 'react';
import Link from 'next/link';
import { Home, Phone } from 'lucide-react';
import Header from '@/components/public/Header';
import Footer from '@/components/public/Footer';
import { getSiteSettings } from '@/lib/queries/site';

export const metadata = {
  title: 'Page Not Found | Mantra Acupuncture Clinic',
  description: 'The requested page could not be found on Mantra Acupuncture Clinic.',
  robots: {
    index: false,
    follow: false,
  },
};

export default async function NotFound() {
  const siteSettings = await getSiteSettings();

  return (
    <>
      <Header
        siteName={siteSettings.site_name}
        tagline={siteSettings.tagline}
        phone={siteSettings.phone}
        whatsappNumber={siteSettings.whatsapp_number}
        defaultMessage={siteSettings.default_whatsapp_message}
        address={siteSettings.address}
        workingHours={siteSettings.working_hours}
        ctaLabel={siteSettings.primary_cta_label}
      />

      <main className="flex-1 bg-[#FAF2EB] py-16 lg:py-24 flex items-center justify-center">
        <div className="max-w-xl mx-auto px-4 sm:px-6 text-center space-y-6">
          <span className="text-xs uppercase tracking-widest text-[#C5A059] font-bold">
            404 — Page Not Found
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#1B3B2B]">
            Looking for Healing Care?
          </h1>
          <p className="text-sm sm:text-base text-[#586962] leading-relaxed">
            The page you are looking for may have been moved, updated, or is temporarily unavailable. Let us guide you back to our clinic resources.
          </p>

          <div className="pt-4 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#1B3B2B] text-white text-xs sm:text-sm font-semibold hover:bg-[#12291E] shadow-sm transition-colors"
            >
              <Home className="w-4 h-4" />
              <span>Return to Homepage</span>
            </Link>
            <Link
              href="/treatments"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#FAF2EB] border border-[#E6DFD3] text-[#1B3B2B] text-xs sm:text-sm font-semibold hover:text-[#C5A059] hover:border-[#C5A059] shadow-sm transition-colors"
            >
              <span>Explore Treatments</span>
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#EEE4D8] text-[#1B3B2B] text-xs sm:text-sm font-semibold hover:bg-[#E6DFD3] transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-[#C5A059]" />
              <span>Contact Clinic</span>
            </Link>
          </div>
        </div>
      </main>

      <Footer
        siteName={siteSettings.site_name}
        tagline={siteSettings.tagline}
        phone={siteSettings.phone}
        whatsappNumber={siteSettings.whatsapp_number}
        defaultMessage={siteSettings.default_whatsapp_message}
        address={siteSettings.address}
        workingHours={siteSettings.working_hours}
        instagramUrl={siteSettings.instagram_url}
        disclaimerText={siteSettings.disclaimer_text}
      />
    </>
  );
}
