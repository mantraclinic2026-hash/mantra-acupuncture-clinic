import React from 'react';
import Header from '@/components/public/Header';
import Footer from '@/components/public/Footer';
import FAQAccordion from '@/components/public/FAQAccordion';
import ConsultationForm from '@/components/public/ConsultationForm';
import MobileStickyActions from '@/components/public/MobileStickyActions';
import JsonLd from '@/components/public/JsonLd';
import { getSiteSettings, getPublishedFAQs } from '@/lib/queries/site';
import { generateSiteMetadata, buildBreadcrumbJsonLd } from '@/lib/seo/metadata';

export async function generateMetadata() {
  return generateSiteMetadata({
    route: '/faq',
    fallbackTitle: 'Frequently Asked Questions | Mantra Acupuncture Clinic',
    fallbackDescription: 'Find clear answers to common questions regarding acupuncture safety, needle sterilization, treatment expectations, and appointment booking in Changanacherry.',
  });
}

export default async function FAQPage() {
  const [siteSettings, faqs] = await Promise.all([
    getSiteSettings(),
    getPublishedFAQs(),
  ]);

  const breadcrumbsJsonLd = buildBreadcrumbJsonLd([
    { name: 'Home', url: '/' },
    { name: 'FAQ', url: '/faq' },
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
          <FAQAccordion faqs={faqs} />
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
