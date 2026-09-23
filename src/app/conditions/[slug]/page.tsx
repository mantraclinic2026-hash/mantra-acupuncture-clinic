import React from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, ShieldAlert } from 'lucide-react';
import Header from '@/components/public/Header';
import Footer from '@/components/public/Footer';
import ConsultationForm from '@/components/public/ConsultationForm';
import ImageFallback from '@/components/public/ImageFallback';
import MobileStickyActions from '@/components/public/MobileStickyActions';
import JsonLd from '@/components/public/JsonLd';
import { getSiteSettings, getConditionBySlug, getPublishedConditions } from '@/lib/queries/site';
import { generateSiteMetadata, buildBreadcrumbJsonLd, buildMedicalConditionJsonLd } from '@/lib/seo/metadata';

export async function generateStaticParams() {
  const conditions = await getPublishedConditions();
  return conditions.map((condition) => ({
    slug: condition.slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const condition = await getConditionBySlug(slug);

  if (!condition) {
    return { title: 'Condition Not Found | Mantra Acupuncture Clinic' };
  }

  return generateSiteMetadata({
    route: `/conditions/${condition.slug}`,
    fallbackTitle: `${condition.seo_title || condition.title} | Mantra Acupuncture Clinic`,
    fallbackDescription: condition.seo_description || condition.short_description,
  });
}

export default async function ConditionDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const [siteSettings, condition] = await Promise.all([
    getSiteSettings(),
    getConditionBySlug(slug),
  ]);

  if (!condition) {
    notFound();
  }

  const breadcrumbsJsonLd = buildBreadcrumbJsonLd([
    { name: 'Home', url: '/' },
    { name: 'Conditions', url: '/conditions' },
    { name: condition.title, url: `/conditions/${condition.slug}` },
  ]);
  const conditionJsonLd = buildMedicalConditionJsonLd(condition);

  return (
    <>
      <JsonLd data={breadcrumbsJsonLd} />
      <JsonLd data={conditionJsonLd} />
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
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          {/* Breadcrumb Back Link */}
          <div>
            <Link
              href="/conditions"
              className="inline-flex items-center text-xs font-bold uppercase tracking-wider text-[#C5A059] hover:text-[#1B3B2B] transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-1.5" />
              <span>Back to All Conditions</span>
            </Link>
          </div>

          {/* Title Header */}
          <div className="space-y-4">
            <span className="text-xs uppercase tracking-widest text-[#C5A059] font-bold bg-[#EEE4D8] px-3 py-1 rounded-full border border-[#E6DFD3]">
              {condition.category || 'Supported Concern'}
            </span>
            <h1 className="font-serif text-4xl sm:text-5xl font-bold text-[#1B3B2B]">
              Acupuncture Care for {condition.title}
            </h1>
            <p className="text-base sm:text-lg text-[#586962] leading-relaxed">
              {condition.short_description}
            </p>
          </div>

          {/* Optional Media */}
          {condition.image_url && (
            <div className="rounded-3xl overflow-hidden border border-[#E6DFD3] shadow-md">
              <ImageFallback
                src={condition.image_url}
                alt={condition.title}
                width={800}
                height={450}
                aspectRatio="video"
              />
            </div>
          )}

          {/* Detailed Content */}
          <div className="bg-[#EEE4D8] rounded-3xl p-8 sm:p-12 border border-[#E6DFD3] space-y-6 text-base sm:text-lg text-[#2C3531] leading-relaxed">
            <h2 className="font-serif text-2xl font-bold text-[#1B3B2B] border-b border-[#E6DFD3] pb-3">
              Supportive Approach for {condition.title}
            </h2>
            <div className="whitespace-pre-line space-y-4">
              {condition.full_description}
            </div>

            {/* Medical Disclaimer Banner */}
            <div className="p-4 rounded-2xl bg-[#FAF2EB] border border-[#E6DFD3] text-xs text-[#586962] flex items-start gap-2.5 italic">
              <ShieldAlert className="w-4 h-4 text-[#C5A059] shrink-0 mt-0.5" />
              <span>
                Disclaimer: Treatment outcomes vary depending on individual health status, duration of symptoms, and compliance with care recommendations. Acupuncture is intended to support natural self-healing and should be discussed during an initial clinical assessment.
              </span>
            </div>
          </div>

          {/* Booking CTA */}
          <ConsultationForm
            title={`Schedule Consultation for ${condition.title}`}
            subtitle="Request an appointment with Dr. Nikku Thomas to discuss a personalized acupuncture plan."
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
