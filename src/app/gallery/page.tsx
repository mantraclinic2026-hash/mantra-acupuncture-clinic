import React from 'react';
import { Metadata } from 'next';
import Image from 'next/image';
import Header from '@/components/public/Header';
import Footer from '@/components/public/Footer';
import MobileStickyActions from '@/components/public/MobileStickyActions';
import { getPublishedGallery, getSiteSettings, getSEOMetadata } from '@/lib/queries/site';
import { getCloudinaryUrl } from '@/lib/cloudinary/url';
import { Camera, Image as ImageIcon } from 'lucide-react';
import Link from 'next/link';

export async function generateMetadata(): Promise<Metadata> {
  const seo = await getSEOMetadata('/gallery');
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || '';
  return {
    title: seo?.title || 'Clinic Gallery | Mantra Acupuncture Clinic',
    description:
      seo?.description ||
      'Explore photos of Mantra Acupuncture Clinic in Changanacherry, Kerala. View our serene treatment rooms, clinical environment, and care facilities.',
    alternates: {
      canonical: seo?.canonical_url || (baseUrl ? `${baseUrl}/gallery` : '/gallery'),
    },
  };
}

export default async function GalleryPage() {
  const [siteSettings, galleryItems] = await Promise.all([
    getSiteSettings(),
    getPublishedGallery(),
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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#EEE4D8] border border-[#E6DFD3] text-[#1B3B2B] text-xs font-semibold uppercase tracking-wider">
            <Camera className="w-3.5 h-3.5 text-[#C5A059]" />
            <span>Clinic Environment</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#1B3B2B]">
            Clinic Gallery
          </h1>
          <p className="text-sm sm:text-base text-[#2C3531] leading-relaxed">
            Take a look inside Mantra Acupuncture Clinic. We maintain a calm, hygienic, and serene atmosphere tailored for peaceful healing and holistic relaxation.
          </p>
        </div>

        {/* Gallery Grid */}
        {galleryItems.length === 0 ? (
          <div className="bg-[#F8F5EE] border border-[#E6DFD3] rounded-3xl p-12 text-center max-w-xl mx-auto space-y-4">
            <ImageIcon className="w-12 h-12 text-[#C5A059] mx-auto opacity-70" />
            <h3 className="font-serif text-xl font-bold text-[#1B3B2B]">
              Gallery Coming Soon
            </h3>
            <p className="text-sm text-[#2C3531]">
              We are currently updating our clinic photo gallery. Please check back soon or reach out directly to schedule a visit.
            </p>
            <Link
              href="/contact"
              className="inline-block mt-4 px-6 py-2.5 bg-[#1B3B2B] text-white text-sm font-medium rounded-full hover:bg-[#12291E] transition-colors"
            >
              Contact Clinic
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {galleryItems.map((item) => {
              const displayUrl =
                getCloudinaryUrl(item.image_url, {
                  width: 800,
                  height: 600,
                  crop: 'fill',
                }) || item.image_url;

              return (
                <div
                  key={item.id}
                  className="group bg-white rounded-2xl overflow-hidden border border-[#E6DFD3] shadow-sm hover:shadow-md transition-all flex flex-col"
                >
                  <div className="relative aspect-[4/3] bg-[#EEE4D8] overflow-hidden">
                    <Image
                      src={displayUrl}
                      alt={item.image_alt || item.title || 'Mantra Acupuncture Clinic Photo'}
                      fill
                      unoptimized={displayUrl.includes('res.cloudinary.com')}
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  </div>
                  <div className="p-5 flex-1 flex flex-col justify-between space-y-2">
                    <div>
                      {item.category && (
                        <span className="text-[10px] font-semibold tracking-wider uppercase text-[#C5A059] block mb-1">
                          {item.category}
                        </span>
                      )}
                      <h3 className="font-serif text-lg font-bold text-[#1B3B2B] leading-tight">
                        {item.title}
                      </h3>
                    </div>
                    {item.image_alt && (
                      <p className="text-xs text-[#2C3531] line-clamp-2 leading-relaxed">
                        {item.image_alt}
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
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
