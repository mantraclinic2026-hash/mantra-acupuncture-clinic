import React from 'react';
import Header from '@/components/public/Header';
import Footer from '@/components/public/Footer';
import HeroSection from '@/components/public/HeroSection';
import ServicesGrid from '@/components/public/ServicesGrid';
import ConditionsGrid from '@/components/public/ConditionsGrid';
import AboutAndProcessSection from '@/components/public/AboutAndProcessSection';
import PractitionerAndBookingSection from '@/components/public/PractitionerAndBookingSection';
import PreFooterCTA from '@/components/public/PreFooterCTA';
import FAQAccordion from '@/components/public/FAQAccordion';
import MobileStickyActions from '@/components/public/MobileStickyActions';
import WhatsAppButton from '@/components/public/WhatsAppButton';
import JsonLd from '@/components/public/JsonLd';
import {
  getSiteSettings,
  getHeroSection,
  getAboutContent,
  getPublishedServices,
  getPublishedConditions,
  getPractitioners,
  getTreatmentProcess,
  getPublishedFAQs,
} from '@/lib/queries/site';
import { generateSiteMetadata, buildClinicJsonLd } from '@/lib/seo/metadata';

export async function generateMetadata() {
  return generateSiteMetadata({
    route: '/',
    fallbackTitle: 'Mantra Acupuncture Clinic | Holistic Healing in Changanacherry',
    fallbackDescription:
      'Experience personalized, responsible acupuncture and naturopathy care for pain management, wellness, and vitality in Changanacherry, Kerala.',
  });
}

export default async function HomePage() {
  const [
    siteSettings,
    hero,
    about,
    services,
    conditions,
    practitioners,
    treatmentSteps,
    faqs,
  ] = await Promise.all([
    getSiteSettings(),
    getHeroSection(),
    getAboutContent(),
    getPublishedServices(),
    getPublishedConditions(),
    getPractitioners(),
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
          heroMobileImageUrl={hero.hero_mobile_image_url}
          heroImageAlt={hero.hero_image_alt}
          heroSideText={hero.hero_side_text}
          trustBadge1={hero.trust_badge_1}
          trustBadge2={hero.trust_badge_2}
          trustBadge3={hero.trust_badge_3}
          whatsappNumber={siteSettings.whatsapp_number}
          defaultWhatsappMessage={siteSettings.default_whatsapp_message}
        />

        {/* ABOUT & TREATMENT PROCESS */}
        <AboutAndProcessSection about={about} steps={treatmentSteps} />

        {/* SERVICES GRID */}
        <ServicesGrid services={services} limit={3} />

        {/* CONDITIONS WE SUPPORT */}
        <ConditionsGrid conditions={conditions} siteSettings={siteSettings} />

        {/* PRACTITIONER PROFILE + CONSULTATION BOOKING */}
        <PractitionerAndBookingSection practitioners={practitioners} siteSettings={siteSettings} />

        {/* FAQ ACCORDION */}
        <FAQAccordion faqs={faqs} />

        {/* PRE-FOOTER CTA BANNER */}
        <PreFooterCTA siteSettings={siteSettings} />
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
