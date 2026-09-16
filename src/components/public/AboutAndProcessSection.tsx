'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { AboutContent, TreatmentProcessStep } from '@/lib/types';

const FALLBACK_STEPS: TreatmentProcessStep[] = [
  {
    id: 'default-1',
    step_number: 1,
    title: 'Consultation',
    description: 'Understand your concerns, lifestyle and health goals.',
    icon_name: 'UserCheck',
    display_order: 1,
  },
  {
    id: 'default-2',
    step_number: 2,
    title: 'Assessment',
    description: 'A detailed assessment of your individual needs.',
    icon_name: 'ClipboardList',
    display_order: 2,
  },
  {
    id: 'default-3',
    step_number: 3,
    title: 'Treatment Plan',
    description: 'A customized acupuncture plan for your condition.',
    icon_name: 'FileText',
    display_order: 3,
  },
  {
    id: 'default-4',
    step_number: 4,
    title: 'Ongoing Support',
    description: 'Continuous care for your progress and well-being.',
    icon_name: 'CheckCircle2',
    display_order: 4,
  },
];

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

  // Sort treatment process steps by step number (fallback to default steps if empty)
  const stepsToRender = steps && steps.length > 0 ? steps : FALLBACK_STEPS;
  const sortedSteps = [...stepsToRender].sort(
    (a, b) => (a.step_number || 0) - (b.step_number || 0)
  );

  const aboutImage = '/images/botanical-flowers1.png';

  return (
    <section id="about" className="relative overflow-hidden bg-[#FAF2EB] border-b border-[#E6DFD3] py-6 sm:py-10 lg:py-12">
      {/* Botanical Flower Background Image */}
      <div
        className="pointer-events-none absolute -left-12 sm:-left-6 lg:left-0 top-1/2 -translate-y-1/2 w-[320px] sm:w-[440px] lg:w-[560px] h-[460px] sm:h-[580px] lg:h-[720px] opacity-[0.08] sm:opacity-[0.10] lg:opacity-[0.12] select-none z-0"
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

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Two-Column Responsive Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10 lg:gap-12 xl:gap-16 items-start">
          {/* Left Column: About Mantra Content */}
          <div className="lg:col-span-7 min-w-0 text-left flex flex-col justify-center py-1 lg:py-4">
            {/* Eyebrow */}
            <span className="text-xs sm:text-sm font-bold uppercase tracking-[0.16em] text-[#C5A059] mb-2.5 sm:mb-3 block">
              {about.eyebrow || 'ABOUT MANTRA'}
            </span>

            {/* Main Heading */}
            <h2 className="font-serif text-2xl sm:text-3xl lg:text-[38px] xl:text-[44px] font-bold text-[#1B3B2B] tracking-tight leading-[1.12] max-w-[650px]">
              {about.headline || 'Treating the Person, Not Just the Symptoms.'}
            </h2>

            {/* Paragraphs */}
            <div className="mt-5 sm:mt-7 space-y-4 sm:space-y-5 max-w-[650px] text-sm sm:text-base text-[#2C3531] leading-relaxed">
              {paragraphs.map((para, idx) => (
                <p key={idx}>{para}</p>
              ))}
            </div>

            {/* Learn More */}
            <div className="mt-6 sm:mt-7">
              <Link
                href={about.learn_more_link || '/about'}
                className="group w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full border border-[#1B3B2B]/70 bg-transparent text-[#1B3B2B] text-sm sm:text-base font-semibold transition-all duration-300 hover:bg-[#1B3B2B] hover:text-white hover:border-[#1B3B2B] active:scale-[0.98]"
              >
                <span>{about.learn_more_text || 'Learn More'}</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </div>
          </div>

          {/* Right Column: Treatment Process Card */}
          <div className="lg:col-span-5 w-full flex justify-center lg:justify-end">
            <div className="w-full max-w-full sm:max-w-[370px] lg:max-w-[350px] xl:max-w-[380px] bg-[#FAF7F2] rounded-2xl border border-[#DED5C8] px-4 py-4 sm:px-5 sm:py-4.5 shadow-[0_2px_10px_rgba(27,59,43,0.04)]">
              {/* Card Heading */}
              <h3 className="text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.14em] text-[#1B3B2B] pb-2.5 border-b border-[#DED5C8]">
                OUR TREATMENT PROCESS
              </h3>

              {/* Treatment Steps */}
              <div className="mt-3 sm:mt-3.5">
                {sortedSteps.map((step, index) => {
                  const isLast = index === sortedSteps.length - 1;

                  return (
                    <div key={step.id || index} className="relative flex items-start gap-3 pb-3 sm:pb-3.5 last:pb-0">
                      {/* Connecting Line */}
                      {!isLast && (
                        <div className="absolute left-[13px] top-7 bottom-0 w-[1.5px] bg-[#C5A059]/40" />
                      )}

                      {/* Number Badge */}
                      <div className="relative z-10 shrink-0 w-7 h-7 rounded-full bg-[#1B3B2B] text-white flex items-center justify-center text-[11px] font-bold shadow-2xs">
                        {step.step_number || index + 1}
                      </div>

                      {/* Step Content: Title & Description */}
                      <div className="flex-1 min-w-0 pt-0.5">
                        <h4 className="font-serif text-[13px] sm:text-sm font-bold text-[#1B3B2B] leading-tight">
                          {step.title}
                        </h4>

                        {step.description && (
                          <p className="mt-0.5 text-[11px] sm:text-xs text-[#2C3531] leading-snug">
                            {step.description}
                          </p>
                        )}
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