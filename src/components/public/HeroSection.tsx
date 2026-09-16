'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Leaf, UserCheck, ShieldCheck } from 'lucide-react';
import Image from 'next/image';

interface HeroSectionProps {
  badgeText?: string | null;
  headline?: string;
  subheadline?: string;
  primaryCtaText?: string;
  primaryCtaLink?: string;
  secondaryCtaText?: string;
  secondaryCtaLink?: string;
  heroImageUrl?: string | null;
  heroMobileImageUrl?: string | null;
  heroImageAlt?: string | null;
  heroSideText?: string | null;
  trustBadge1?: string | null;
  trustBadge2?: string | null;
  trustBadge3?: string | null;
  whatsappNumber?: string;
  defaultWhatsappMessage?: string;
}

export default function HeroSection({
  badgeText = 'PERSONALIZED ACUPUNCTURE CARE',
  headline = 'Personalized Acupuncture Care',
  subheadline = 'Natural healing. A healthier you.',
  primaryCtaText = 'Book a Consultation',
  primaryCtaLink = '/contact',
  secondaryCtaText = 'Explore Treatments',
  secondaryCtaLink = '/treatments',
  heroImageUrl,
  heroMobileImageUrl,
  heroImageAlt = 'Mantra Acupuncture Clinic treatment environment',
  trustBadge1 = 'Personalized Assessment',
  trustBadge2 = 'Individual Treatment Plans',
  trustBadge3 = 'Patient Comfort & Safety',
}: HeroSectionProps) {
  const bgImage =
    heroImageUrl ||
    'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=1920';

  return (
    <section className="relative overflow-hidden bg-[#FAF5EE] border-b border-[#E6DFD3]">
      {/* =====================================================
          HERO BANNER & ORGANIC CREAM DIVISION
      ===================================================== */}
      <div className="relative w-full min-h-[460px] sm:min-h-[500px] lg:min-h-[540px] py-10 sm:py-14 lg:py-20 flex items-center">
        {/* Banner Images */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          {/* Desktop & Tablet Banner: zoomed and shifted right on 13.3" screens so white curve covers the text area, unchanged on xl+ */}
          <div className="hidden sm:block absolute inset-0 overflow-hidden">
            <Image
              src={bgImage}
              alt={heroImageAlt || 'Mantra Acupuncture Clinic'}
              fill
              priority
              sizes="100vw"
              className="object-cover sm:scale-105 sm:origin-left sm:translate-x-8 lg:scale-115 lg:origin-left lg:translate-x-24 xl:scale-100 xl:origin-center xl:translate-x-0 xl:object-right transition-all duration-300"
              unoptimized={
                bgImage.includes('res.cloudinary.com') ||
                bgImage.includes('unsplash.com')
              }
            />
          </div>

          {/* Mobile View Banner as Background Image */}
          <div className="block sm:hidden absolute inset-0">
            <Image
              src={heroMobileImageUrl || bgImage}
              alt={heroImageAlt || 'Mantra Acupuncture Clinic Mobile'}
              fill
              priority
              sizes="100vw"
              className="object-cover object-center"
              unoptimized={
                (heroMobileImageUrl || bgImage).includes('res.cloudinary.com') ||
                (heroMobileImageUrl || bgImage).includes('unsplash.com')
              }
            />
            {/* Soft gradient fade on mobile so text is readable over background image */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#FAF5EE]/90 via-[#FAF5EE]/60 to-transparent pointer-events-none" />
          </div>
        </div>

        {/* =====================================================
            HERO CONTENT
        ===================================================== */}
        <div className="relative z-10 flex h-full flex-col justify-center max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8">
          <div className="max-w-md lg:max-w-[340px] xl:max-w-xl space-y-4 sm:space-y-5 xl:space-y-6">
            {/* Main Headline */}
            <h1 className="font-serif text-[34px] xs:text-[40px] sm:text-[44px] lg:text-[2.05rem] xl:text-[3.85rem] font-medium text-[#1B3B2B] tracking-tight leading-[1.15] sm:leading-[1.08] max-w-md lg:max-w-[320px] xl:max-w-lg">
              {headline || 'Personalized Acupuncture Care'}
            </h1>

            {/* Decorative Slogan Line */}
            <div className="flex items-center gap-2 sm:gap-2.5 pt-0.5 sm:pt-1 flex-wrap">
              <svg
                className="w-4 h-4 sm:w-6 sm:h-6 text-[#C5A059] shrink-0"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 4c-1.8 3.5-3 6.8-3 9.5 0 2.5 1.3 4.5 3 4.5s3-2 3-4.5c0-2.7-1.2-6-3-9.5z" />
                <path d="M9 13.5C6.5 12.8 4.5 10.5 4 8c2.5 1 4.5 3.2 5 5.5z" />
                <path d="M15 13.5c2.5-.7 4.5-3 5-5.5-2.5 1-4.5 3.2-5 5.5z" />
                <path d="M7 16c2 1.8 3.5 2 5 2s3-.2 5-2" />
              </svg>
              <span className="text-xs sm:text-sm lg:text-sm xl:text-lg text-[#2C4A3E] font-medium tracking-wide">
                Natural healing. A healthier you.
              </span>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-row items-center gap-2 sm:gap-2.5 xl:gap-4 pt-2 sm:pt-3 flex-wrap">
              <Link
                href={primaryCtaLink || '/contact'}
                className="inline-flex items-center justify-center gap-1.5 sm:gap-2 px-4 xs:px-4.5 sm:px-5 lg:px-5 xl:px-7 py-2.5 sm:py-3 xl:py-3.5 rounded-full bg-[#1B3B2B] hover:bg-[#12291E] text-white font-medium text-xs xs:text-xs sm:text-sm xl:text-base shadow-sm transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] group shrink-0"
              >
                <span>{primaryCtaText || 'Book a Consultation'}</span>
                <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover:translate-x-1 transition-transform" />
              </Link>

              <Link
                href={secondaryCtaLink || '/treatments'}
                className="inline-flex items-center justify-center gap-1.5 sm:gap-2 px-4 xs:px-5 sm:px-7 py-2.5 sm:py-3.5 rounded-full border border-[#1B3B2B]/35 hover:border-[#1B3B2B] bg-[#FAF5EE] hover:bg-white text-[#1B3B2B] font-medium text-xs xs:text-sm sm:text-base transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] shrink-0"
              >
                <Leaf className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#C5A059]" />
                <span>{secondaryCtaText || 'Explore Treatments'}</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* =====================================================
          TRUST STRIP
      ===================================================== */}
      <div className="relative z-10 w-full border-t border-[#E6DFD3] bg-[#FAF2EB]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-3.5">
          <div className="grid grid-cols-3 gap-1.5 sm:gap-0 text-center sm:text-left">
            <div className="flex flex-col sm:flex-row items-center justify-center sm:justify-start gap-1.5 sm:gap-3 px-1 sm:px-4 sm:pl-0 border-r border-[#E6DFD3] sm:border-r-0">
              <div className="w-7 h-7 sm:w-9 sm:h-9 rounded-full bg-[#EEE4D8] border border-[#E6DFD3] flex items-center justify-center shrink-0">
                <Leaf className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#1B3B2B]" />
              </div>
              <span className="text-[10px] sm:text-xs md:text-sm font-semibold text-[#1B3B2B] leading-tight text-center sm:text-left">
                {trustBadge1}
              </span>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center sm:justify-start gap-1.5 sm:gap-3 px-1 sm:px-4 border-r border-[#E6DFD3] sm:border-r-0 sm:border-l sm:border-[#E6DFD3] sm:pl-6 lg:pl-8">
              <div className="w-7 h-7 sm:w-9 sm:h-9 rounded-full bg-[#EEE4D8] border border-[#E6DFD3] flex items-center justify-center shrink-0">
                <UserCheck className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#1B3B2B]" />
              </div>
              <span className="text-[10px] sm:text-xs md:text-sm font-semibold text-[#1B3B2B] leading-tight text-center sm:text-left">
                {trustBadge2}
              </span>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center sm:justify-start gap-1.5 sm:gap-3 px-1 sm:px-4 sm:border-l sm:border-[#E6DFD3] sm:pl-6 lg:pl-8">
              <div className="w-7 h-7 sm:w-9 sm:h-9 rounded-full bg-[#EEE4D8] border border-[#E6DFD3] flex items-center justify-center shrink-0">
                <ShieldCheck className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#1B3B2B]" />
              </div>
              <span className="text-[10px] sm:text-xs md:text-sm font-semibold text-[#1B3B2B] leading-tight text-center sm:text-left">
                {trustBadge3}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}