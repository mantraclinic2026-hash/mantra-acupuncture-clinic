import React from 'react';
import { MapPin, Phone, MessageCircle, Clock, Navigation } from 'lucide-react';
import Header from '@/components/public/Header';
import Footer from '@/components/public/Footer';
import ConsultationForm from '@/components/public/ConsultationForm';
import { buildWhatsAppUrl } from '@/lib/whatsapp';
import MobileStickyActions from '@/components/public/MobileStickyActions';
import { getSiteSettings } from '@/lib/queries/site';
import { generateSiteMetadata } from '@/lib/seo/metadata';

export async function generateMetadata() {
  return generateSiteMetadata({
    route: '/contact',
    fallbackTitle: 'Contact Mantra Acupuncture Clinic | Changanacherry',
    fallbackDescription: 'Contact Mantra Acupuncture Clinic in Changanacherry, Kerala. Find clinic address, phone number, WhatsApp link, working hours, and consultation booking form.',
  });
}

export default async function ContactPage() {
  const siteSettings = await getSiteSettings();
  const cleanPhone = siteSettings.phone.replace(/[^0-9+]/g, '');
  const whatsappUrl = buildWhatsAppUrl(siteSettings.whatsapp_number, siteSettings.default_whatsapp_message);

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
          
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <span className="text-xs uppercase tracking-widest text-[#C5A059] font-bold">
              Reach Our Clinic
            </span>
            <h1 className="font-serif text-4xl sm:text-5xl font-bold text-[#1B3B2B]">
              Contact & Location Details
            </h1>
            <p className="text-base sm:text-lg text-[#586962] leading-relaxed">
              We welcome your inquiries. Please contact us via phone, WhatsApp, or by submitting an online appointment request below.
            </p>
          </div>

          {/* Contact Details Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Direct Info Card */}
            <div className="lg:col-span-5 bg-[#F4EFE6] rounded-3xl p-8 border border-[#E6DFD3] space-y-6">
              <h2 className="font-serif text-2xl font-bold text-[#1B3B2B]">
                Clinic Information
              </h2>

              <div className="space-y-5 text-sm sm:text-base text-[#2C3531]">
                
                {/* Address */}
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#1B3B2B] text-[#C5A059] flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-bold text-[#1B3B2B]">Clinic Address</p>
                    <p className="text-[#586962] text-xs sm:text-sm mt-0.5">{siteSettings.address}</p>
                    {siteSettings.google_maps_url && (
                      <a
                        href={siteSettings.google_maps_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center text-xs font-semibold text-[#1B3B2B] hover:text-[#C5A059] mt-2 underline"
                      >
                        <Navigation className="w-3.5 h-3.5 mr-1 text-[#C5A059]" />
                        <span>Get Directions on Google Maps</span>
                      </a>
                    )}
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#1B3B2B] text-[#C5A059] flex items-center justify-center shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-bold text-[#1B3B2B]">Phone</p>
                    <a href={`tel:${cleanPhone}`} className="text-[#586962] hover:text-[#1B3B2B] font-medium text-sm">
                      {siteSettings.phone}
                    </a>
                  </div>
                </div>

                {/* WhatsApp */}
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#25D366] text-white flex items-center justify-center shrink-0">
                    <MessageCircle className="w-5 h-5 fill-current" />
                  </div>
                  <div>
                    <p className="font-bold text-[#1B3B2B]">WhatsApp Chat</p>
                    <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="text-[#25D366] font-medium text-sm hover:underline">
                      Message Us on WhatsApp ({siteSettings.whatsapp_number})
                    </a>
                  </div>
                </div>

                {/* Working Hours */}
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#1B3B2B] text-[#C5A059] flex items-center justify-center shrink-0">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-bold text-[#1B3B2B]">Working Hours</p>
                    <p className="text-[#586962] text-xs sm:text-sm mt-0.5">{siteSettings.working_hours}</p>
                  </div>
                </div>

                {/* Instagram */}
                {siteSettings.instagram_url && (
                  <div className="flex items-center gap-3 pt-2 border-t border-[#E6DFD3]">
                    <svg className="w-5 h-5 text-[#C5A059] fill-current" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                    </svg>
                    <a
                      href={siteSettings.instagram_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs sm:text-sm text-[#1B3B2B] font-medium hover:underline"
                    >
                      Follow @mantraacupunctureclinic on Instagram
                    </a>
                  </div>
                )}

              </div>
            </div>

            {/* Form Column */}
            <div className="lg:col-span-7">
              <ConsultationForm />
            </div>

          </div>

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
