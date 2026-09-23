import React from 'react';
import Header from '@/components/public/Header';
import Footer from '@/components/public/Footer';
import ConsultationForm from '@/components/public/ConsultationForm';
import MobileStickyActions from '@/components/public/MobileStickyActions';
import JsonLd from '@/components/public/JsonLd';
import { User } from 'lucide-react';
import { getSiteSettings, getAboutContent, getPractitioners } from '@/lib/queries/site';
import { generateSiteMetadata, buildBreadcrumbJsonLd } from '@/lib/seo/metadata';

export async function generateMetadata() {
  return generateSiteMetadata({
    route: '/about',
    fallbackTitle: 'About Mantra Acupuncture Clinic | Patient-Centered Care',
    fallbackDescription: 'Discover our holistic acupuncture philosophy, individualized assessment process, and calm treatment sanctuary in Changanacherry, Kerala.',
  });
}

export default async function AboutPage() {
  const [siteSettings, about, practitioners] = await Promise.all([
    getSiteSettings(),
    getAboutContent(),
    getPractitioners(),
  ]);

  const breadcrumbsJsonLd = buildBreadcrumbJsonLd([
    { name: 'Home', url: '/' },
    { name: 'About', url: '/about' },
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
          
          {/* Header Banner */}
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <span className="text-xs uppercase tracking-widest text-[#C5A059] font-bold">
              Our Clinic & Philosophy
            </span>
            <h1 className="font-serif text-4xl sm:text-5xl font-bold text-[#1B3B2B]">
              {about.headline}
            </h1>
            <p className="text-base sm:text-lg text-[#2C3531] leading-relaxed">
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
                <p className="text-sm text-[#2C3531] leading-relaxed">
                  {pillar.description}
                </p>
              </div>
            ))}
          </div>

          {/* Practitioners Display: Card-wise next to each other */}
          {practitioners.length > 1 ? (
            <div className="space-y-6 max-w-5xl mx-auto">
              <div className="text-center space-y-1">
                <span className="text-xs font-bold uppercase tracking-widest text-[#C5A059]">
                  Our Practitioners
                </span>
                <h2 className="font-serif text-3xl font-bold text-[#1B3B2B]">
                  Dedicated Clinical Specialists
                </h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
                {practitioners.map((p, idx) => (
                  <div
                    key={p.id || idx}
                    className="bg-[#1B3B2B] text-white rounded-3xl p-8 space-y-5 text-center border border-[#C5A059]/30 flex flex-col justify-between shadow-xl"
                  >
                    <div className="space-y-3">
                      <div className="w-24 h-24 rounded-full ring-3 ring-[#C5A059]/60 overflow-hidden mx-auto bg-[#12291E] shadow-md flex items-center justify-center">
                        {p.profile_image_url ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img
                            src={p.profile_image_url}
                            alt={p.full_name}
                            className="w-full h-full object-cover object-top"
                          />
                        ) : (
                          <User className="w-10 h-10 text-[#C5A059]" />
                        )}
                      </div>
                      <span className="text-[10px] font-bold uppercase tracking-widest text-[#C5A059] block">
                        {idx === 0 ? 'Lead Practitioner' : 'Associate Practitioner'}
                      </span>
                      <h3 className="font-serif text-2xl font-bold">{p.full_name}</h3>
                      <p className="text-xs text-[#C5A059] font-medium">{p.title}</p>
                      <p className="text-xs sm:text-sm text-[#EBF2EE]/90 leading-relaxed pt-1">
                        {p.bio}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="bg-[#1B3B2B] text-white rounded-3xl p-8 sm:p-12 max-w-4xl mx-auto space-y-5 text-center">
              <div className="w-28 h-28 rounded-full ring-4 ring-[#C5A059]/60 overflow-hidden mx-auto bg-[#12291E] shadow-md flex items-center justify-center">
                {practitioners[0]?.profile_image_url ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={practitioners[0].profile_image_url}
                    alt={practitioners[0]?.full_name || 'Dr. Nikku Thomas'}
                    className="w-full h-full object-cover object-top"
                  />
                ) : (
                  <User className="w-12 h-12 text-[#C5A059]" />
                )}
              </div>
              <span className="text-xs font-bold uppercase tracking-widest text-[#C5A059] block">
                Lead Practitioner
              </span>
              <h2 className="font-serif text-3xl font-bold">{practitioners[0]?.full_name}</h2>
              <p className="text-sm text-[#C5A059] font-medium">{practitioners[0]?.title}</p>
              <p className="text-sm sm:text-base text-[#EBF2EE]/90 max-w-2xl mx-auto leading-relaxed">
                {practitioners[0]?.bio}
              </p>
            </div>
          )}

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
