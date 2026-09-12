import React from 'react';
import Header from '@/components/public/Header';
import Footer from '@/components/public/Footer';
import ConsultationForm from '@/components/public/ConsultationForm';
import MobileStickyActions from '@/components/public/MobileStickyActions';
import { getSiteSettings, getAboutContent, getPractitioner } from '@/lib/queries/site';
import { generateSiteMetadata } from '@/lib/seo/metadata';

export async function generateMetadata() {
  return generateSiteMetadata({
    route: '/about',
    fallbackTitle: 'About Mantra Acupuncture Clinic | Patient-Centered Care',
    fallbackDescription: 'Discover our holistic acupuncture philosophy, individualized assessment process, and calm treatment sanctuary in Changanacherry, Kerala.',
  });
}

export default async function AboutPage() {
  const [siteSettings, about, practitioner] = await Promise.all([
    getSiteSettings(),
    getAboutContent(),
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
          
          {/* Header Banner */}
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <span className="text-xs uppercase tracking-widest text-[#C5A059] font-bold">
              Our Clinic & Philosophy
            </span>
            <h1 className="font-serif text-4xl sm:text-5xl font-bold text-[#1B3B2B]">
              {about.headline}
            </h1>
            <p className="text-base sm:text-lg text-[#586962] leading-relaxed">
              Combining traditional acupuncture principles with a modern clinical understanding of health and natural vitality.
            </p>
          </div>

          {/* Story Paragraphs */}
          <div className="bg-[#EEE4D8] rounded-3xl p-8 sm:p-12 border border-[#E6DFD3] space-y-6 max-w-4xl mx-auto text-base sm:text-lg text-[#2C3531] leading-relaxed">
            {about.story_paragraphs.map((para, idx) => (
              <p key={idx}>{para}</p>
            ))}
          </div>

          {/* Pillars */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {about.pillars.map((pillar, idx) => (
              <div key={idx} className="bg-[#FAF2EB] p-8 rounded-3xl border border-[#E6DFD3] space-y-3 shadow-sm">
                <span className="w-8 h-8 rounded-full bg-[#1B3B2B] text-[#C5A059] flex items-center justify-center font-bold text-sm">
                  0{idx + 1}
                </span>
                <h3 className="font-serif text-2xl font-bold text-[#1B3B2B]">
                  {pillar.title}
                </h3>
                <p className="text-sm text-[#586962] leading-relaxed">
                  {pillar.description}
                </p>
              </div>
            ))}
          </div>

          {/* Lead Practitioner Callout */}
          <div className="bg-[#1B3B2B] text-white rounded-3xl p-8 sm:p-12 max-w-4xl mx-auto space-y-4 text-center">
            <span className="text-xs font-bold uppercase tracking-widest text-[#C5A059]">
              Lead Practitioner
            </span>
            <h2 className="font-serif text-3xl font-bold">{practitioner.full_name}</h2>
            <p className="text-sm text-[#C5A059] font-medium">{practitioner.title}</p>
            <p className="text-sm sm:text-base text-[#EBF2EE]/90 max-w-2xl mx-auto leading-relaxed">
              {practitioner.bio}
            </p>
          </div>

          {/* Booking Form */}
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
