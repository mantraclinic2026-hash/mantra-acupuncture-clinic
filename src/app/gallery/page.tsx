import React from 'react';
import { Metadata } from 'next';
import Header from '@/components/public/Header';
import Footer from '@/components/public/Footer';
import MobileStickyActions from '@/components/public/MobileStickyActions';
import GalleryShowcase from '@/components/public/GalleryShowcase';
import { getPublishedGallery, getSiteSettings, getSEOMetadata } from '@/lib/queries/site';
import Link from 'next/link';

export async function generateMetadata(): Promise<Metadata> {
  const seo = await getSEOMetadata('/gallery');
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || '';
  return {
    title: seo?.title || 'Clinic Gallery | Mantra Acupuncture Clinic',
    description:
      seo?.description ||
      'Explore photos of Mantra Acupuncture Clinic in Changanacherry, Kerala. View our serene treatment rooms, clinical environment, and care facilities.',
    alternates: {
      canonical: seo?.canonical_url || (baseUrl ? `${baseUrl}/gallery` : '/gallery'),
    },
  };
}

export default async function GalleryPage() {
  const [siteSettings, galleryItems] = await Promise.all([
    getSiteSettings(),
    getPublishedGallery(),
  ]);

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

      <main className="flex-1 bg-[#FAF2EB] py-12 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <GalleryShowcase
            items={galleryItems}
            title="Clinic Photo Gallery"
            subtitle="Take a look inside Mantra Acupuncture Clinic in Changanacherry. We maintain a calm, hygienic, and serene atmosphere tailored for peaceful healing and holistic relaxation."
            badgeText="Clinic Environment"
            showViewToggle={false}
            showGridBelow={false}
            initialMode="grid"
          />

          {/* Bottom Consultation CTA Bar */}
          <div className="bg-[#EEE4D8] border border-[#E6DFD3] rounded-3xl p-8 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
            <div className="space-y-1 max-w-xl">
              <h3 className="font-serif text-2xl font-bold text-[#1B3B2B]">
                Ready to Visit Our Sanctuary?
              </h3>
              <p className="text-xs sm:text-sm text-[#586962] leading-relaxed">
                Experience restorative, individualized acupuncture care in our clean and peaceful clinical setting.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <Link
                href="/contact"
                className="px-6 py-3 rounded-full bg-[#1B3B2B] text-white text-xs sm:text-sm font-semibold hover:bg-[#12291E] shadow-sm transition-colors"
              >
                Book a Consultation
              </Link>
              <a
                href={`tel:${siteSettings.phone}`}
                className="px-6 py-3 rounded-full bg-[#FAF2EB] border border-[#E6DFD3] text-[#1B3B2B] text-xs sm:text-sm font-semibold hover:text-[#C5A059] shadow-sm transition-colors"
              >
                Call {siteSettings.phone}
              </a>
            </div>
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

      <MobileStickyActions
        phone={siteSettings.phone}
        whatsappNumber={siteSettings.whatsapp_number}
        defaultMessage={siteSettings.default_whatsapp_message}
        whatsappEnabled={siteSettings.floating_whatsapp_enabled}
        callEnabled={siteSettings.floating_call_enabled}
      />
    </>
  );
}
