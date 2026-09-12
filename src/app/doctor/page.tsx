import React from 'react';
import Header from '@/components/public/Header';
import Footer from '@/components/public/Footer';
import PractitionerSection from '@/components/public/PractitionerSection';
import ConsultationForm from '@/components/public/ConsultationForm';
import MobileStickyActions from '@/components/public/MobileStickyActions';
import { getSiteSettings, getPractitioner } from '@/lib/queries/site';
import { generateSiteMetadata } from '@/lib/seo/metadata';

export async function generateMetadata() {
  return generateSiteMetadata({
    route: '/doctor',
    fallbackTitle: 'Dr. Nikku Thomas | BNYS, MD, Master in Acupuncture | Changanacherry',
    fallbackDescription: 'Meet Dr. Nikku Thomas, Naturopathy & Acupuncture practitioner holding BNYS, MD in Naturopathy, and Master Degree in Acupuncture at Mantra Acupuncture Clinic.',
  });
}

export default async function DoctorPage() {
  const [siteSettings, practitioner] = await Promise.all([
    getSiteSettings(),
    getPractitioner(),
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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          <PractitionerSection practitioner={practitioner} />
          <ConsultationForm
            title="Book a Consultation with Dr. Nikku Thomas"
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
