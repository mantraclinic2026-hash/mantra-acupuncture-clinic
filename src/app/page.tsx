import React from 'react';
import Header from '@/components/public/Header';
import Footer from '@/components/public/Footer';
import HeroSection from '@/components/public/HeroSection';
import ServicesGrid from '@/components/public/ServicesGrid';
import ConditionsGrid from '@/components/public/ConditionsGrid';
import PractitionerSection from '@/components/public/PractitionerSection';
import TreatmentProcess from '@/components/public/TreatmentProcess';
import FAQAccordion from '@/components/public/FAQAccordion';
import ConsultationForm from '@/components/public/ConsultationForm';
import MobileStickyActions from '@/components/public/MobileStickyActions';
import WhatsAppButton from '@/components/public/WhatsAppButton';
import JsonLd from '@/components/public/JsonLd';
import {
  getSiteSettings,
  getHeroSection,
  getAboutContent,
  getPublishedServices,
  getPublishedConditions,
  getPractitioner,
  getTreatmentProcess,
  getPublishedFAQs,
} from '@/lib/queries/site';
import { generateSiteMetadata, buildClinicJsonLd } from '@/lib/seo/metadata';

export async function generateMetadata() {
  return generateSiteMetadata({
    route: '/',
    fallbackTitle: 'Mantra Acupuncture Clinic | Heal • Balance • Thrive | Changanacherry',
    fallbackDescription: 'Personalized, patient-focused acupuncture care in Changanacherry by Dr. Nikku Thomas. Supportive care for back pain, neck strain, sciatica, migraine, and stress.',
  });
}

export default async function HomePage() {
  const [
    siteSettings,
    hero,
    about,
    services,
    conditions,
    practitioner,
    treatmentSteps,
    faqs,
  ] = await Promise.all([
    getSiteSettings(),
    getHeroSection(),
    getAboutContent(),
    getPublishedServices(),
    getPublishedConditions(),
    getPractitioner(),
    getTreatmentProcess(),
    getPublishedFAQs(),
  ]);

  const clinicJsonLd = buildClinicJsonLd(siteSettings);

  return (
    <>
      <JsonLd data={clinicJsonLd} />

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

      <main className="flex-1">
        {/* HERO SECTION */}
        <HeroSection
          badgeText={hero.badge_text}
          headline={hero.headline}
          subheadline={hero.subheadline}
          primaryCtaText={hero.primary_cta_text}
          primaryCtaLink={hero.primary_cta_link}
          secondaryCtaText={hero.secondary_cta_text}
          secondaryCtaLink={hero.secondary_cta_link}
          heroImageUrl={hero.hero_image_url}
          heroImageAlt={hero.hero_image_alt}
          whatsappNumber={siteSettings.whatsapp_number}
          defaultWhatsappMessage={siteSettings.default_whatsapp_message}
        />

        {/* CLINIC PHILOSOPHY & ABOUT SUMMARY */}
        <section className="py-16 lg:py-24 bg-[#FDFBF7]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              
              <div className="lg:col-span-6 space-y-6">
                <span className="text-xs uppercase tracking-widest text-[#C5A059] font-bold">
                  Clinic Positioning
                </span>
                <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1B3B2B]">
                  {about.headline}
                </h2>
                <div className="space-y-4 text-base text-[#586962] leading-relaxed">
                  {about.story_paragraphs.map((p, idx) => (
                    <p key={idx}>{p}</p>
                  ))}
                </div>
              </div>

              <div className="lg:col-span-6">
                <div className="grid grid-cols-1 sm:grid-cols-1 gap-4">
                  {about.pillars.map((pillar, idx) => (
                    <div
                      key={idx}
                      className="p-6 rounded-2xl bg-[#F4EFE6] border border-[#E6DFD3] space-y-2 hover:border-[#C5A059] transition-colors"
                    >
                      <h3 className="font-serif text-xl font-bold text-[#1B3B2B]">
                        {pillar.title}
                      </h3>
                      <p className="text-sm text-[#586962] leading-relaxed">
                        {pillar.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* TREATMENT PROCESS TIMELINE */}
        <TreatmentProcess steps={treatmentSteps} />

        {/* SERVICES GRID */}
        <ServicesGrid services={services} />

        {/* CONDITIONS SUPPORTED GRID */}
        <ConditionsGrid conditions={conditions} />

        {/* PRACTITIONER PROFILE */}
        <PractitionerSection practitioner={practitioner} />

        {/* FAQ ACCORDION */}
        <FAQAccordion faqs={faqs} />

        {/* CONSULTATION ENQUIRY FORM */}
        <section className="py-16 lg:py-24 bg-[#FDFBF7]" id="booking">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <ConsultationForm
              title={siteSettings.consultation_cta_label}
              subtitle="Submit your details below for an appointment enquiry. We look forward to supporting your wellness journey."
            />
          </div>
        </section>
      </main>

      {/* FOOTER */}
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

      {/* MOBILE STICKY BOTTOM ACTIONS */}
      <MobileStickyActions
        phone={siteSettings.phone}
        whatsappNumber={siteSettings.whatsapp_number}
        defaultMessage={siteSettings.default_whatsapp_message}
        whatsappEnabled={siteSettings.floating_whatsapp_enabled}
        callEnabled={siteSettings.floating_call_enabled}
      />

      {/* DESKTOP FLOATING WHATSAPP CTA */}
      {siteSettings.floating_whatsapp_enabled && (
        <div className="hidden md:block">
          <WhatsAppButton
            phone={siteSettings.whatsapp_number}
            defaultMessage={siteSettings.default_whatsapp_message}
            variant="floating"
          />
        </div>
      )}
    </>
  );
}
