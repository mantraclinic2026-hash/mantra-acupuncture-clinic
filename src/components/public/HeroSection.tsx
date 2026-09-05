'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Sparkles, ShieldCheck, HeartPulse } from 'lucide-react';
import ImageFallback from './ImageFallback';
import WhatsAppButton from './WhatsAppButton';

interface HeroSectionProps {
  badgeText?: string | null;
  headline?: string;
  subheadline?: string;
  primaryCtaText?: string;
  primaryCtaLink?: string;
  secondaryCtaText?: string;
  secondaryCtaLink?: string;
  heroImageUrl?: string | null;
  heroImageAlt?: string | null;
  whatsappNumber?: string;
  defaultWhatsappMessage?: string;
}

export default function HeroSection({
  badgeText = 'Personalized Acupuncture Care in Changanacherry',
  headline = 'Personalized Acupuncture Care for Natural Healing & Vitality',
  subheadline = 'Combining traditional acupuncture principles with a modern clinical understanding of health to support your body’s natural healing process, balance, and well-being.',
  primaryCtaText = 'Book a Consultation',
  primaryCtaLink = '/contact',
  secondaryCtaText = 'Explore Treatments',
  secondaryCtaLink = '/treatments',
  heroImageUrl,
  heroImageAlt = 'Mantra Acupuncture Clinic environment',
  whatsappNumber = '+91 81296 27829',
  defaultWhatsappMessage = 'Hello, I would like to enquire about an acupuncture consultation at Mantra Acupuncture Clinic.',
}: HeroSectionProps) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#FDFBF7] via-[#F4EFE6]/50 to-[#FDFBF7] py-8 sm:py-16 lg:py-20 border-b border-[#E6DFD3]">
      {/* Subtle organic background decoration */}
      <div className="absolute top-0 right-0 -translate-y-12 translate-x-12 w-96 h-96 bg-[#C5A059]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 translate-y-12 -translate-x-12 w-96 h-96 bg-[#1B3B2B]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Main Copy & CTAs Column */}
          <div className="lg:col-span-7 space-y-6 text-left">
            {badgeText && (
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EBF2EE] border border-[#1B3B2B]/10 text-[#1B3B2B] text-xs sm:text-sm font-medium">
                <Sparkles className="w-4 h-4 text-[#C5A059]" />
                <span>{badgeText}</span>
              </div>
            )}

            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-[#1B3B2B] tracking-tight leading-[1.15]">
              {headline}
            </h1>

            <p className="text-base sm:text-lg text-[#586962] leading-relaxed max-w-2xl">
              {subheadline}
            </p>

            {/* CTAs Group */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
              <Link
                href={primaryCtaLink}
                className="inline-flex items-center justify-center px-6 py-3.5 rounded-full bg-[#1B3B2B] hover:bg-[#12291E] text-white font-medium text-base shadow-md transition-all focus:ring-2 focus:ring-[#C5A059] group"
              >
                <span>{primaryCtaText}</span>
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>

              <WhatsAppButton
                phone={whatsappNumber}
                defaultMessage={defaultWhatsappMessage}
                label="WhatsApp Inquiry"
                variant="primary"
                className="py-3.5 px-6"
              />

              <Link
                href={secondaryCtaLink}
                className="inline-flex items-center justify-center px-5 py-3.5 rounded-full border border-[#1B3B2B]/20 text-[#1B3B2B] hover:bg-[#F4EFE6] font-medium text-base transition-colors"
              >
                {secondaryCtaText}
              </Link>
            </div>

            {/* Trust Pill Strip */}
            <div className="pt-4 border-t border-[#E6DFD3] grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs sm:text-sm text-[#2C3531]">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#C5A059] shrink-0" />
                <span>Sterile Single-Use Needles</span>
              </div>
              <div className="flex items-center gap-2">
                <HeartPulse className="w-4 h-4 text-[#C5A059] shrink-0" />
                <span>Individual Assessment</span>
              </div>
              <div className="flex items-center gap-2 col-span-2 sm:col-span-1">
                <Sparkles className="w-4 h-4 text-[#C5A059] shrink-0" />
                <span>Serene Clinic Space</span>
              </div>
            </div>
          </div>

          {/* Hero Visual Card / Media Column */}
          <div className="lg:col-span-5 relative mt-4 lg:mt-0">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Outer Decorative Card Frame */}
              <div className="absolute inset-0 bg-[#C5A059]/20 rounded-3xl transform rotate-2 scale-[1.02] pointer-events-none" />
              
              <div className="relative bg-white p-3 sm:p-4 rounded-3xl shadow-xl border border-[#E6DFD3]">
                <ImageFallback
                  src={heroImageUrl}
                  alt={heroImageAlt || 'Mantra Acupuncture Clinic treatment environment'}
                  width={600}
                  height={500}
                  priority
                  aspectRatio="portrait"
                  className="rounded-2xl shadow-inner min-h-[300px] sm:min-h-[380px]"
                />

                {/* Floating Info Overlay Badge */}
                <div className="absolute -bottom-4 left-6 right-6 bg-[#FDFBF7] p-3.5 rounded-xl border border-[#E6DFD3] shadow-lg flex items-center justify-between">
                  <div>
                    <p className="text-xs uppercase tracking-wider text-[#C5A059] font-bold">Practitioner</p>
                    <p className="font-serif text-sm sm:text-base font-bold text-[#1B3B2B]">Dr. Nikku Thomas</p>
                  </div>
                  <div className="text-right text-[11px] text-[#586962]">
                    <p className="font-medium text-[#1B3B2B]">BNYS • MD • Acupuncture</p>
                    <p>Changanacherry, Kerala</p>
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
