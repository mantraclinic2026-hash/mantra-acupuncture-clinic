import React from 'react';
import Header from '@/components/public/Header';
import Footer from '@/components/public/Footer';
import ServicesGrid from '@/components/public/ServicesGrid';
import ConsultationForm from '@/components/public/ConsultationForm';
import MobileStickyActions from '@/components/public/MobileStickyActions';
import { getSiteSettings, getPublishedServices } from '@/lib/queries/site';
import { generateSiteMetadata } from '@/lib/seo/metadata';

export async function generateMetadata() {
  return generateSiteMetadata({
    route: '/treatments',
    fallbackTitle: 'Therapeutic Acupuncture Services | Mantra Acupuncture Clinic',
    fallbackDescription: 'Explore therapeutic acupuncture modalities including traditional Acupuncture, Electro-Acupuncture, and Cupping/Hijama therapy in Changanacherry.',
  });
}

export default async function TreatmentsPage() {
  const [siteSettings, services] = await Promise.all([
    getSiteSettings(),
    getPublishedServices(),
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

      <main className="flex-1 bg-[#FDFBF7] py-12 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          <ServicesGrid
            services={services}
            title="Acupuncture & Therapeutic Care Modalities"
            subtitle="Customized acupuncture options designed to support your body's natural healing process and functional recovery."
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
