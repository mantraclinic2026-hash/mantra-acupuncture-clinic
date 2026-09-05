'use client';

import React from 'react';
import Link from 'next/link';
import { Award, GraduationCap, HeartHandshake, ArrowRight } from 'lucide-react';
import ImageFallback from './ImageFallback';
import { Practitioner } from '@/lib/types';

interface PractitionerSectionProps {
  practitioner: Practitioner;
}

export default function PractitionerSection({ practitioner }: PractitionerSectionProps) {
  if (!practitioner || !practitioner.is_active) return null;

  return (
    <section className="py-16 lg:py-24 bg-[#FDFBF7]" id="practitioner">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="bg-[#1B3B2B] text-white rounded-3xl p-8 sm:p-12 lg:p-16 overflow-hidden relative shadow-2xl">
          {/* Subtle background blur circle */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#C5A059]/10 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center relative z-10">
            
            {/* Media Profile Column */}
            <div className="lg:col-span-5">
              <div className="relative mx-auto max-w-sm lg:max-w-none">
                <div className="absolute inset-0 bg-[#C5A059] rounded-3xl transform rotate-3 scale-105 opacity-20 pointer-events-none" />
                <div className="relative bg-[#12291E] p-3 rounded-3xl border border-[#C5A059]/30">
                  <ImageFallback
                    src={practitioner.profile_image_url}
                    alt={practitioner.profile_image_alt || practitioner.full_name}
                    width={500}
                    height={600}
                    aspectRatio="portrait"
                    className="rounded-2xl min-h-[350px]"
                  />
                </div>
              </div>
            </div>

            {/* Information Column */}
            <div className="lg:col-span-7 space-y-6">
              <div>
                <span className="text-xs uppercase tracking-widest text-[#C5A059] font-bold block mb-2">
                  Lead Practitioner
                </span>
                <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white">
                  {practitioner.full_name}
                </h2>
                <p className="text-sm sm:text-base text-[#C5A059] font-medium mt-1">
                  {practitioner.title}
                </p>
              </div>

              {/* Qualifications list */}
              <div className="space-y-3 pt-2">
                <p className="text-xs font-semibold uppercase tracking-wider text-[#EBF2EE]/70 flex items-center gap-1.5">
                  <GraduationCap className="w-4 h-4 text-[#C5A059]" />
                  <span>Clinical Qualifications</span>
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-1 gap-2">
                  {practitioner.qualifications.map((qual, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-sm text-[#EBF2EE] bg-[#12291E]/80 px-4 py-2.5 rounded-xl border border-[#C5A059]/20">
                      <Award className="w-4 h-4 text-[#C5A059] shrink-0" />
                      <span className="font-medium">{qual}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bio */}
              <p className="text-sm sm:text-base text-[#EBF2EE]/90 leading-relaxed pt-2">
                {practitioner.bio}
              </p>

              {/* Patient Care Commitment */}
              <div className="pt-4 border-t border-[#C5A059]/20 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#C5A059]/20 flex items-center justify-center text-[#C5A059] shrink-0">
                  <HeartHandshake className="w-5 h-5" />
                </div>
                <div className="text-xs sm:text-sm text-[#EBF2EE]/80">
                  <p className="font-semibold text-white">Individual Assessment First</p>
                  <p>Every consultation is tailored to understand your health history and comfort.</p>
                </div>
              </div>

              <div className="pt-2">
                <Link
                  href="/doctor"
                  className="inline-flex items-center text-sm font-semibold text-[#C5A059] hover:text-white transition-colors"
                >
                  <span>Learn More About Dr. Nikku Thomas</span>
                  <ArrowRight className="w-4 h-4 ml-1" />
                </Link>
              </div>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
