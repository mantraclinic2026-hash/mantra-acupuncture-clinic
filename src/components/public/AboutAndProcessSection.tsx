'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { AboutContent, TreatmentProcessStep } from '@/lib/types';

interface AboutAndProcessSectionProps {
  about: AboutContent;
  steps: TreatmentProcessStep[];
}

export default function AboutAndProcessSection({
  about,
  steps,
}: AboutAndProcessSectionProps) {
  const paragraphs =
    about.story_paragraphs && about.story_paragraphs.length > 0
      ? about.story_paragraphs
      : [
          'Mantra Acupuncture Clinic is dedicated to providing personalized, patient-focused acupuncture care in a calm and welcoming environment.',
          'Our approach combines traditional acupuncture principles with a modern understanding of health and wellness to support the body’s natural healing process, improve balance, and enhance overall well-being.',
        ];

  // Sort treatment process steps by step number
  const sortedSteps = [...steps].sort(
    (a, b) => (a.step_number || 0) - (b.step_number || 0)
  );

  // ============================================================
  // Botanical Flower Design as Background Image
  // ============================================================
  const aboutImage = '/images/botanical-flowers1.png';

  return (
    <section
      id="about"
      className="
        relative
        overflow-hidden
        bg-[#FAF2EB]
        border-b
        border-[#E6DFD3]
        py-8
        sm:py-12
        lg:py-16
      "
    >
      {/* =====================================================
          BOTANICAL FLOWER BACKGROUND IMAGE
      ===================================================== */}
      <div
        className="
          pointer-events-none
          absolute
          -left-12
          sm:-left-6
          lg:left-0
          top-1/2
          -translate-y-1/2
          w-[320px]
          sm:w-[440px]
          lg:w-[560px]
          h-[460px]
          sm:h-[580px]
          lg:h-[720px]
          opacity-[0.14]
          sm:opacity-[0.18]
          lg:opacity-[0.22]
          select-none
          z-0
        "
        aria-hidden="true"
      >
        <Image
          src={aboutImage}
          alt=""
          fill
          sizes="(max-width: 640px) 320px, (max-width: 1024px) 440px, 560px"
          className="object-contain object-left"
          priority
        />
      </div>

      <div
        className="
          relative
          z-10
          max-w-[1400px]
          mx-auto
          px-4
          sm:px-6
          lg:px-8
          xl:px-10
        "
      >
        {/* =====================================================
            TWO-COLUMN RESPONSIVE LAYOUT
            ABOUT CONTENT (LEFT) | TREATMENT PROCESS (RIGHT)
        ===================================================== */}
        <div
          className="
            grid
            grid-cols-1
            lg:grid-cols-12
            gap-8
            sm:gap-10
            lg:gap-12
            xl:gap-16
            items-start
          "
        >
          {/* =====================================================
              LEFT COLUMN — ABOUT MANTRA CONTENT
          ===================================================== */}
          <div
            className="
              lg:col-span-7
              min-w-0
              text-left
              flex
              flex-col
              justify-center
              py-1
              lg:py-4
            "
          >
            {/* Eyebrow */}
            <span
              className="
                text-xs
                sm:text-sm
                font-bold
                uppercase
                tracking-[0.16em]
                text-[#586962]
                mb-2.5
                sm:mb-3
                block
              "
            >
              {about.eyebrow || 'ABOUT MANTRA'}
            </span>

            {/* Main Heading */}
            <h2
              className="
                font-serif
                text-2xl
                sm:text-3xl
                lg:text-[38px]
                xl:text-[44px]
                font-bold
                text-[#1B3B2B]
                tracking-tight
                leading-[1.12]
                max-w-[650px]
              "
            >
              {about.headline ||
                'Treating the Person, Not Just the Symptoms.'}
            </h2>

            {/* Paragraphs */}
            <div
              className="
                mt-5
                sm:mt-7
                space-y-4
                sm:space-y-5
                max-w-[650px]
                text-sm
                sm:text-base
                text-[#586962]
                leading-relaxed
              "
            >
              {paragraphs.map((para, idx) => (
                <p key={idx}>{para}</p>
              ))}
            </div>

            {/* Learn More */}
            <div className="mt-6 sm:mt-7">
              <Link
                href={about.learn_more_link || '/about'}
                className="
                  group
                  w-full
                  sm:w-auto
                  inline-flex
                  items-center
                  justify-center
                  gap-2
                  px-7
                  py-3.5
                  rounded-full
                  border
                  border-[#1B3B2B]/70
                  bg-transparent
                  text-[#1B3B2B]
                  text-sm
                  sm:text-base
                  font-semibold
                  transition-all
                  duration-300
                  hover:bg-[#1B3B2B]
                  hover:text-white
                  hover:border-[#1B3B2B]
                  active:scale-[0.98]
                "
              >
                <span>
                  {about.learn_more_text || 'Learn More'}
                </span>

                <ArrowRight
                  className="
                    w-4
                    h-4
                    transition-transform
                    duration-300
                    group-hover:translate-x-1
                  "
                />
              </Link>
            </div>
          </div>

          {/* =====================================================
              RIGHT COLUMN — TREATMENT PROCESS CARD
          ===================================================== */}
          <div className="lg:col-span-5 w-full flex justify-center lg:justify-end">
            <div
              className="
                w-full
                max-w-full
                sm:max-w-[420px]
                bg-[#FAF7F2]
                rounded-2xl
                sm:rounded-[22px]
                border
                border-[#DED5C8]
                px-5
                py-5
                sm:px-7
                sm:py-7
                shadow-[0_3px_14px_rgba(27,59,43,0.04)]
              "
            >
              {/* Card Heading */}
              <h3
                className="
                  text-[11px]
                  sm:text-xs
                  font-bold
                  uppercase
                  tracking-[0.15em]
                  text-[#1B3B2B]
                  pb-4
                  border-b
                  border-[#DED5C8]
                "
              >
                OUR TREATMENT PROCESS
              </h3>

              {/* Treatment Steps */}
              <div className="mt-1">
                {sortedSteps.map((step, index) => {
                  const isLast = index === sortedSteps.length - 1;

                  return (
                    <div
                      key={step.id || index}
                      className="
                        relative
                        flex
                        items-start
                        gap-1
                      "
                    >
                      {/* =================================================
                          CONNECTING LINE
                      ================================================= */}
                      {!isLast && (
                        <div
                          className="
                            absolute
                            left-[15px]
                            top-[38px]
                            bottom-[-14px]
                            w-px
                            bg-[#D8CFC2]
                          "
                        />
                      )}

                      {/* Number */}
                      <div
                        className="
                          relative
                          z-10
                          shrink-0
                          w-8
                          h-8
                          rounded-full
                          bg-[#1B3B2B]
                          text-white
                          flex
                          items-center
                          justify-center
                          text-xs
                          font-semibold
                        "
                      >
                        {step.step_number || index + 1}
                      </div>

                      {/* Step Content */}
                      <div
                        className={`
                          flex-1
                          min-w-0
                          ${isLast ? 'pb-0' : 'pb-7'}
                        `}
                      >
                        <h4
                          className="
                            font-serif
                            text-base
                            sm:text-[17px]
                            font-bold
                            text-[#1B3B2B]
                            leading-tight
                          "
                        >
                          {step.title}
                        </h4>

                        <p
                          className="
                            mt-1.5
                            text-xs
                            sm:text-[13px]
                            text-[#586962]
                            leading-[1.5]
                          "
                        >
                          {step.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}