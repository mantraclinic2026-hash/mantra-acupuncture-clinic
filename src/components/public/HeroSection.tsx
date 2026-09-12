'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Phone, Leaf, UserCheck, ShieldCheck } from 'lucide-react';
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
  headline = 'Care Designed Around You.',
  subheadline = 'At Mantra Acupuncture Clinic, every consultation begins with understanding your individual condition, lifestyle, and health goals.',
  primaryCtaText = 'Book a Consultation',
  primaryCtaLink = '/contact',
  secondaryCtaText = 'Call +91 8129627829',
  secondaryCtaLink = 'tel:+918129627829',
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
        bg-[#FAF2EB]
        border-b
        border-[#E6DFD3]
      "
    >

      {/* =====================================================
          FULL-WIDTH BACKGROUND IMAGE (DESKTOP & MOBILE VIEWS)
      ===================================================== */}
      <div className="relative w-full min-h-[420px] sm:min-h-[460px] lg:min-h-[500px] py-8 sm:py-12 lg:py-16 flex items-center">

        {/* Full Banner Images */}
        <div className="absolute inset-0 z-0">
          {/* Desktop & Tablet Banner */}
          <div className={heroMobileImageUrl ? 'hidden sm:block absolute inset-0' : 'absolute inset-0'}>
            <Image
              src={bgImage}
              alt={heroImageAlt || 'Mantra Acupuncture Clinic'}
              fill
              priority
              sizes="100vw"
              className="object-cover object-center opacity-85 sm:opacity-100"
              unoptimized={
                bgImage.includes('res.cloudinary.com') ||
                bgImage.includes('unsplash.com')
              }
            />
          </div>

          {/* Mobile Specific Banner (if uploaded in admin) */}
          {heroMobileImageUrl && (
            <div className="block sm:hidden absolute inset-0">
              <Image
                src={heroMobileImageUrl}
                alt={heroImageAlt || 'Mantra Acupuncture Clinic Mobile'}
                fill
                priority
                sizes="100vw"
                className="object-cover object-center opacity-95"
                unoptimized={
                  heroMobileImageUrl.includes('res.cloudinary.com') ||
                  heroMobileImageUrl.includes('unsplash.com')
                }
              />
            </div>
          )}

          {/* Subtle luminous mist for high contrast readability without hiding the banner image */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#FAF2EB]/80 via-[#FAF2EB]/55 to-[#FAF2EB]/35 sm:from-[#FAF2EB]/85 sm:via-[#FAF2EB]/40 sm:to-transparent pointer-events-none" />
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
          <div className="ml-0 lg:-ml-6 xl:-ml-10 max-w-2xl xl:max-w-3xl space-y-4 sm:space-y-6 lg:space-y-7">

            {/* Eyebrow Badge */}
            {badgeText && (
              <div className="inline-flex items-center gap-2.5 px-3 py-1 rounded-full bg-[#FAF2EB]/90 border border-[#C5A059]/40 backdrop-blur-xs w-fit shadow-xs">
                <span
                  className="
                    inline-block
                    text-[10px]
                    sm:text-xs
                    font-bold
                    uppercase
                    tracking-[0.18em]
                    sm:tracking-[0.2em]
                    text-[#1B3B2B]
                  "
                >
                  {badgeText}
                </span>

                <span className="w-5 sm:w-8 h-[1.5px] bg-[#C5A059]" />
              </div>
            )}

            {/* Main Headline */}
            <h1
              className="
                font-serif
                text-2xl
                sm:text-4xl
                md:text-5xl
                lg:text-[3.8rem]
                xl:text-[4.2rem]
                font-bold
                text-[#1B3B2B]
                tracking-tight
                leading-[1.14]
                [text-shadow:_0_1px_4px_rgba(250,242,235,0.9),_0_0_24px_rgba(250,242,235,0.7)]
              "
            >
              {headline}
            </h1>

            {/* Subheadline */}
            <p
              className="
                text-sm
                sm:text-base
                md:text-lg
                text-[#1B3B2B]
                font-medium
                leading-relaxed
                max-w-xl
                [text-shadow:_0_1px_3px_rgba(250,242,235,0.95)]
              "
            >
              {subheadline}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 pt-1 sm:pt-2">

              <Link
                href={primaryCtaLink}
                className="
                  w-full
                  sm:w-auto
                  inline-flex
                  items-center
                  justify-center
                  px-7
                  py-3.5
                  rounded-full
                  bg-[#1B3B2B]
                  hover:bg-[#12291E]
                  text-white
                  font-semibold
                  text-sm
                  sm:text-base
                  shadow-lg
                  transition-all
                  duration-300
                  hover:scale-[1.02]
                  active:scale-[0.98]
                  group
                "
              >
                <span>{primaryCtaText}</span>

                <ArrowRight
                  className="
                    w-4
                    h-4
                    ml-2
                    group-hover:translate-x-1
                    transition-transform
                  "
                />
              </Link>

              <a
                href={secondaryCtaLink}
                className="
                  w-full
                  sm:w-auto
                  inline-flex
                  items-center
                  justify-center
                  px-6
                  py-3.5
                  rounded-full
                  border
                  border-[#1B3B2B]/30
                  hover:border-[#1B3B2B]
                  bg-white/90
                  sm:bg-white
                  hover:bg-[#EEE4D8]
                  text-[#1B3B2B]
                  font-medium
                  text-sm
                  sm:text-base
                  transition-all
                  duration-300
                  active:scale-[0.98]
                "
              >
                <Phone className="w-4 h-4 mr-2 text-[#C5A059]" />

                <span>{secondaryCtaText}</span>
              </a>

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