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
    <section
      className="
        relative
        overflow-hidden
        bg-[#FAF5EE]
        border-b
        border-[#E6DFD3]
      "
    >

      {/* =====================================================
          HERO BANNER & ORGANIC CREAM DIVISION
      ===================================================== */}
      <div className="relative w-full min-h-[460px] sm:min-h-[500px] lg:min-h-[540px] py-10 sm:py-14 lg:py-20 flex items-center">

        {/* Banner Images on Right */}
        <div className="absolute inset-0 z-0">
          {/* Desktop & Tablet Banner */}
          <div className={heroMobileImageUrl ? 'hidden sm:block absolute inset-0' : 'absolute inset-0'}>
            <Image
              src={bgImage}
              alt={heroImageAlt || 'Mantra Acupuncture Clinic'}
              fill
              priority
              sizes="100vw"
              className="object-cover object-right"
              unoptimized={
                bgImage.includes('res.cloudinary.com') ||
                bgImage.includes('unsplash.com')
              }
            />
          </div>

          {/* Mobile Specific Banner */}
          {heroMobileImageUrl && (
            <div className="block sm:hidden absolute inset-0">
              <Image
                src={heroMobileImageUrl}
                alt={heroImageAlt || 'Mantra Acupuncture Clinic Mobile'}
                fill
                priority
                sizes="100vw"
                className="object-cover object-right"
                unoptimized={
                  heroMobileImageUrl.includes('res.cloudinary.com') ||
                  heroMobileImageUrl.includes('unsplash.com')
                }
              />
            </div>
          )}

        </div>

        {/* =====================================================
            HERO CONTENT
        ===================================================== */}
        <div
          className="
            relative
            z-10
            flex
            h-full
            flex-col
            justify-center
            max-w-7xl
            mx-auto
            w-full
            px-4
            sm:px-6
            lg:px-8
          "
        >
          <div className="max-w-xl space-y-4 sm:space-y-6 -translate-x-1 sm:-translate-x-3 lg:-translate-x-8 xl:-translate-x-12">

            {/* Eyebrow Badge Pill */}
            <div className="inline-flex items-center gap-2 px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full border border-[#D6C7B2] bg-[#FAF5EE]/90 backdrop-blur-xs w-fit shadow-2xs">
              <span className="text-[8.5px] sm:text-[9.5px] font-semibold uppercase tracking-[0.15em] text-[#1B3B2B]">
                {badgeText || 'PERSONALIZED ACUPUNCTURE CARE'}
              </span>
              <span className="w-4 sm:w-6 h-[1px] bg-[#C5A059]" />
            </div>

            {/* Main Headline */}
            <h1 className="font-serif text-3xl sm:text-5xl lg:text-[3.85rem] font-medium text-[#1B3B2B] tracking-tight leading-[1.08] max-w-lg">
              {headline || 'Personalized Acupuncture Care'}
            </h1>

            {/* Decorative Slogan Line (Gold line + Lotus Icon + Slogan) */}
            <div className="flex items-center gap-3 pt-1">
              <span className="w-7 sm:w-9 h-[1.5px] bg-[#C5A059] shrink-0" />
              <svg
                className="w-5 h-5 sm:w-6 sm:h-6 text-[#C5A059] shrink-0"
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
              <span className="text-sm sm:text-base md:text-lg text-[#2C4A3E] font-normal tracking-wide">
                Natural healing. A healthier you.
              </span>
            </div>

            {/* CTA Buttons: Exactly 2 buttons (Book a Consultation & Explore Treatments) */}
            <div className="flex flex-wrap items-center gap-3 sm:gap-4 pt-3">
              <Link
                href={primaryCtaLink || '/contact'}
                className="
                  inline-flex
                  items-center
                  justify-center
                  gap-2.5
                  px-6
                  sm:px-7
                  py-3
                  sm:py-3.5
                  rounded-full
                  bg-[#1B3B2B]
                  hover:bg-[#12291E]
                  text-white
                  font-medium
                  text-sm
                  sm:text-base
                  shadow-sm
                  transition-all
                  duration-200
                  hover:scale-[1.02]
                  active:scale-[0.98]
                  group
                "
              >
                <span>{primaryCtaText || 'Book a Consultation'}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>

              <Link
                href={secondaryCtaLink || '/treatments'}
                className="
                  inline-flex
                  items-center
                  justify-center
                  gap-2.5
                  px-6
                  sm:px-7
                  py-3
                  sm:py-3.5
                  rounded-full
                  border
                  border-[#1B3B2B]/35
                  hover:border-[#1B3B2B]
                  bg-[#FAF5EE]
                  hover:bg-white
                  text-[#1B3B2B]
                  font-medium
                  text-sm
                  sm:text-base
                  transition-all
                  duration-200
                  hover:scale-[1.02]
                  active:scale-[0.98]
                "
              >
                <Leaf className="w-4 h-4 text-[#C5A059]" />
                <span>{secondaryCtaText || 'Explore Treatments'}</span>
              </Link>
            </div>

          </div>
        </div>

      </div>

      {/* =====================================================
          TRUST STRIP
      ===================================================== */}
      <div
        className="
          relative
          z-10
          w-full
          border-t
          border-[#E6DFD3]
          bg-[#FAF2EB]
        "
      >
        <div
          className="
            max-w-7xl
            mx-auto
            px-4
            sm:px-6
            lg:px-8
            py-3
            sm:py-3.5
          "
        >
          <div
            className="
              grid
              grid-cols-3
              gap-1.5
              sm:gap-0
              text-center
              sm:text-left
            "
          >

            <div className="flex flex-col sm:flex-row items-center justify-center sm:justify-start gap-1.5 sm:gap-3 px-1 sm:px-4 sm:pl-0 border-r border-[#E6DFD3] sm:border-r-0">
              <div
                className="
                  w-7
                  h-7
                  sm:w-9
                  sm:h-9
                  rounded-full
                  bg-[#EEE4D8]
                  border
                  border-[#E6DFD3]
                  flex
                  items-center
                  justify-center
                  shrink-0
                "
              >
                <Leaf className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#1B3B2B]" />
              </div>

              <span className="text-[10px] sm:text-xs md:text-sm font-semibold text-[#1B3B2B] leading-tight text-center sm:text-left">
                {trustBadge1}
              </span>
            </div>

            <div
              className="
                flex
                flex-col
                sm:flex-row
                items-center
                justify-center
                sm:justify-start
                gap-1.5
                sm:gap-3
                px-1
                sm:px-4
                border-r
                border-[#E6DFD3]
                sm:border-r-0
                sm:border-l
                sm:border-[#E6DFD3]
                sm:pl-6
                lg:pl-8
              "
            >
              <div
                className="
                  w-7
                  h-7
                  sm:w-9
                  sm:h-9
                  rounded-full
                  bg-[#EEE4D8]
                  border
                  border-[#E6DFD3]
                  flex
                  items-center
                  justify-center
                  shrink-0
                "
              >
                <UserCheck className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#1B3B2B]" />
              </div>

              <span className="text-[10px] sm:text-xs md:text-sm font-semibold text-[#1B3B2B] leading-tight text-center sm:text-left">
                {trustBadge2}
              </span>
            </div>

            <div
              className="
                flex
                flex-col
                sm:flex-row
                items-center
                justify-center
                sm:justify-start
                gap-1.5
                sm:gap-3
                px-1
                sm:px-4
                sm:border-l
                sm:border-[#E6DFD3]
                sm:pl-6
                lg:pl-8
              "
            >
              <div
                className="
                  w-7
                  h-7
                  sm:w-9
                  sm:h-9
                  rounded-full
                  bg-[#EEE4D8]
                  border
                  border-[#E6DFD3]
                  flex
                  items-center
                  justify-center
                  shrink-0
                "
              >
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