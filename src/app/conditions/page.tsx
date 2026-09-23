import React from 'react';
import Header from '@/components/public/Header';
import Footer from '@/components/public/Footer';
import ConditionsGrid from '@/components/public/ConditionsGrid';
import ConsultationForm from '@/components/public/ConsultationForm';
import MobileStickyActions from '@/components/public/MobileStickyActions';
import JsonLd from '@/components/public/JsonLd';
import { getSiteSettings, getPublishedConditions } from '@/lib/queries/site';
import { generateSiteMetadata, buildBreadcrumbJsonLd } from '@/lib/seo/metadata';

export async function generateMetadata() {
  return generateSiteMetadata({
    route: '/conditions',
    fallbackTitle: 'Conditions Supported | Mantra Acupuncture Clinic',
    fallbackDescription: 'Explore supportive acupuncture care for back pain, neck pain, knee osteoarthritis, sciatica, migraine, stress, sleep issues, and functional health concerns.',
  });
}

export default async function ConditionsPage() {
  const [siteSettings, conditions] = await Promise.all([
    getSiteSettings(),
    getPublishedConditions(),
  ]);

  const breadcrumbsJsonLd = buildBreadcrumbJsonLd([
    { name: 'Home', url: '/' },
    { name: 'Conditions', url: '/conditions' },
  ]);

  return (
    <>
      <JsonLd data={breadcrumbsJsonLd} />
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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          <ConditionsGrid
            conditions={conditions}
            siteSettings={siteSettings}
          />
          <ConsultationForm />
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
