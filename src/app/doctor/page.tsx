import React from 'react';
import Header from '@/components/public/Header';
import Footer from '@/components/public/Footer';
import PractitionerSection from '@/components/public/PractitionerSection';
import ConsultationForm from '@/components/public/ConsultationForm';
import MobileStickyActions from '@/components/public/MobileStickyActions';
import { getSiteSettings, getPractitioners } from '@/lib/queries/site';
import { generateSiteMetadata } from '@/lib/seo/metadata';

export async function generateMetadata() {
  return generateSiteMetadata({
    route: '/doctor',
    fallbackTitle: 'Our Practitioners | Mantra Acupuncture Clinic | Changanacherry',
    fallbackDescription: 'Meet our certified Naturopathy & Acupuncture practitioners holding BNYS, MD in Naturopathy, and Master Degree in Acupuncture at Mantra Acupuncture Clinic.',
  });
}

export default async function DoctorPage() {
  const [siteSettings, practitioners] = await Promise.all([
    getSiteSettings(),
    getPractitioners(),
  ]);

  const consultationTitle = practitioners.length > 1
    ? 'Book a Consultation with Our Practitioners'
    : `Book a Consultation with ${practitioners[0]?.full_name || 'Dr. Nikku Thomas'}`;

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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          <PractitionerSection practitioners={practitioners} />
          <ConsultationForm
            title={consultationTitle}
            subtitle="Schedule an individualized clinical assessment to discuss your health concerns and custom acupuncture options."
          />
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
