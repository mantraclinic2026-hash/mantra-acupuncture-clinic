import React from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, CheckCircle2, ShieldCheck } from 'lucide-react';
import Header from '@/components/public/Header';
import Footer from '@/components/public/Footer';
import ConsultationForm from '@/components/public/ConsultationForm';
import ImageFallback from '@/components/public/ImageFallback';
import MobileStickyActions from '@/components/public/MobileStickyActions';
import JsonLd from '@/components/public/JsonLd';
import { getSiteSettings, getServiceBySlug, getPublishedServices } from '@/lib/queries/site';
import { generateSiteMetadata, buildBreadcrumbJsonLd, buildServiceJsonLd } from '@/lib/seo/metadata';

export async function generateStaticParams() {
  const services = await getPublishedServices();
  return services.map((service) => ({
    slug: service.slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = await getServiceBySlug(slug);

  if (!service) {
    return { title: 'Treatment Not Found | Mantra Acupuncture Clinic' };
  }

  return generateSiteMetadata({
    route: `/treatments/${service.slug}`,
    fallbackTitle: `${service.seo_title || service.title} | Mantra Acupuncture Clinic`,
    fallbackDescription: service.seo_description || service.short_description,
  });
}

export default async function TreatmentDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const [siteSettings, service] = await Promise.all([
    getSiteSettings(),
    getServiceBySlug(slug),
  ]);

  if (!service) {
    notFound();
  }

  const breadcrumbsJsonLd = buildBreadcrumbJsonLd([
    { name: 'Home', url: '/' },
    { name: 'Treatments', url: '/treatments' },
    { name: service.title, url: `/treatments/${service.slug}` },
  ]);
  const serviceJsonLd = buildServiceJsonLd(service);

  return (
    <>
      <JsonLd data={breadcrumbsJsonLd} />
      <JsonLd data={serviceJsonLd} />
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
              href="/treatments"
              className="inline-flex items-center text-xs font-bold uppercase tracking-wider text-[#C5A059] hover:text-[#1B3B2B] transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-1.5" />
              <span>Back to All Treatments</span>
            </Link>
          </div>

          {/* Title Header */}
          <div className="space-y-4">
            <span className="text-xs uppercase tracking-widest text-[#C5A059] font-bold">
              Therapeutic Care Modality
            </span>
            <h1 className="font-serif text-4xl sm:text-5xl font-bold text-[#1B3B2B]">
              {service.title}
            </h1>
            <p className="text-base sm:text-lg text-[#586962] leading-relaxed">
              {service.short_description}
            </p>
          </div>

          {/* Optional Media */}
          {(() => {
            const treatmentImage =
              service.image_url ||
              (service.slug === 'acupuncture-treatment' ? '/images/acupuncture.png' : null);

            if (!treatmentImage) return null;

            return (
              <div className="rounded-3xl overflow-hidden border border-[#E6DFD3] shadow-md bg-[#FAF6F0] flex items-center justify-center p-3 sm:p-6">
                <ImageFallback
                  src={treatmentImage}
                  alt={service.image_alt || service.title}
                  width={900}
                  height={500}
                  aspectRatio="auto"
                  objectFit={treatmentImage.includes('.png') ? 'contain' : 'cover'}
                  className="w-full max-h-[460px] bg-[#FAF6F0]"
                  imgClassName="max-h-[440px] p-2"
                />
              </div>
            );
          })()}

          {/* Detailed Description Content */}
          <div className="bg-[#EEE4D8] rounded-3xl p-8 sm:p-12 border border-[#E6DFD3] space-y-6 text-base sm:text-lg text-[#2C3531] leading-relaxed">
            <h2 className="font-serif text-2xl font-bold text-[#1B3B2B] border-b border-[#E6DFD3] pb-3">
              About {service.title}
            </h2>
            <div className="whitespace-pre-line space-y-4">
              {service.full_description}
            </div>

            <div className="pt-4 border-t border-[#E6DFD3] grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm font-medium text-[#1B3B2B]">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#C5A059]" />
                <span>Single-use Sterile Needles</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#C5A059]" />
                <span>Personalized Consultation First</span>
              </div>
            </div>
          </div>

          {/* Booking CTA */}
          <ConsultationForm
            title={`Inquire About ${service.title}`}
            subtitle="Submit your appointment request below. Our clinical receptionist will contact you to confirm available consultation times."
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
