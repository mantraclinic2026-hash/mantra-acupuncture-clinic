'use client';

import React from 'react';
import { Award, GraduationCap, HeartHandshake, User } from 'lucide-react';
import ImageFallback from './ImageFallback';
import { Practitioner } from '@/lib/types';

interface PractitionerSectionProps {
  practitioners?: Practitioner[];
  practitioner?: Practitioner;
}

export default function PractitionerSection({
  practitioners: incomingPractitioners,
  practitioner: singlePractitioner,
}: PractitionerSectionProps) {
  const list = incomingPractitioners && incomingPractitioners.length > 0
    ? incomingPractitioners
    : singlePractitioner
    ? [singlePractitioner]
    : [];

  if (list.length === 0) return null;

  // ─── IF MULTIPLE PRACTITIONERS: ALIGN CARDS NEXT TO EACH OTHER ───────────────
  if (list.length > 1) {
    return (
      <section className="py-6 lg:py-10" id="practitioners">
        <div className="space-y-8">
          {/* Header */}
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs uppercase tracking-widest text-[#C5A059] font-bold">
              Our Clinical Team
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#1B3B2B]">
              Meet Our Healthcare Practitioners
            </h1>
            <p className="text-sm sm:text-base text-[#586962] leading-relaxed">
              Certified clinical specialists combining traditional naturopathy & acupuncture principles with evidence-based assessment.
            </p>
          </div>

          {/* Cards aligned next to each other */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10 items-stretch">
            {list.map((p, idx) => (
              <div
                key={p.id || `doc-${idx}`}
                className="bg-[#1B3B2B] text-white rounded-3xl p-6 sm:p-8 lg:p-10 overflow-hidden relative shadow-2xl border border-[#C5A059]/30 flex flex-col justify-between"
              >
                {/* Subtle gold glow */}
                <div className="absolute top-0 right-0 w-72 h-72 bg-[#C5A059]/10 rounded-full blur-3xl pointer-events-none" />

                <div className="relative z-10 space-y-6">
                  {/* Photo & Identity */}
                  <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5">
                    <div className="relative shrink-0">
                      <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-2xl ring-2 ring-[#C5A059]/50 overflow-hidden bg-[#12291E] shadow-md flex items-center justify-center">
                        {p.profile_image_url ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img
                            src={p.profile_image_url}
                            alt={p.profile_image_alt || p.full_name}
                            className="w-full h-full object-cover object-top"
                          />
                        ) : (
                          <User className="w-12 h-12 text-[#C5A059]" />
                        )}
                      </div>
                    </div>

                    <div className="text-center sm:text-left space-y-1">
                      <span className="text-[10px] uppercase tracking-widest text-[#C5A059] font-bold block">
                        {idx === 0 ? 'Lead Practitioner' : 'Practitioner Specialist'}
                      </span>
                      <h2 className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-white">
                        {p.full_name}
                      </h2>
                      <p className="text-xs sm:text-sm text-[#C5A059] font-medium">
                        {p.title}
                      </p>
                    </div>
                  </div>

                  {/* Qualifications */}
                  <div className="space-y-2 pt-2">
                    <p className="text-xs font-semibold uppercase tracking-wider text-[#EBF2EE]/70 flex items-center gap-1.5">
                      <GraduationCap className="w-3.5 h-3.5 text-[#C5A059]" />
                      <span>Qualifications</span>
                    </p>
                    <div className="space-y-1.5">
                      {(p.qualifications || []).map((qual, qIdx) => (
                        <div
                          key={qIdx}
                          className="flex items-center gap-2 text-xs sm:text-sm text-[#EBF2EE] bg-[#12291E]/90 px-3.5 py-2 rounded-xl border border-[#C5A059]/20"
                        >
                          <Award className="w-3.5 h-3.5 text-[#C5A059] shrink-0" />
                          <span className="font-medium">{qual}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Bio */}
                  <p className="text-xs sm:text-sm text-[#EBF2EE]/90 leading-relaxed pt-1">
                    {p.bio}
                  </p>
                </div>

                {/* Bottom patient pledge */}
                <div className="pt-5 mt-6 border-t border-[#C5A059]/20 flex items-center gap-3 relative z-10">
                  <div className="w-9 h-9 rounded-full bg-[#C5A059]/20 flex items-center justify-center text-[#C5A059] shrink-0">
                    <HeartHandshake className="w-4 h-4" />
                  </div>
                  <div className="text-[11px] sm:text-xs text-[#EBF2EE]/80">
                    <p className="font-semibold text-white">Individual Assessment First</p>
                    <p>Consultations are tailored to your health history and individual comfort.</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  // ─── IF SINGLE PRACTITIONER: FULL-WIDTH HIGHLIGHT CARD ────────────────────────
  const practitioner = list[0];

  return (
    <section className="py-6 lg:py-10" id="practitioner">
      <div className="bg-[#1B3B2B] text-white rounded-3xl p-8 sm:p-12 lg:p-16 overflow-hidden relative shadow-2xl">
        {/* Subtle background blur circle */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#C5A059]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center relative z-10">
          {/* Media Profile Column */}
          <div className="lg:col-span-5">
            <div className="relative mx-auto max-w-sm lg:max-w-none">
              <div className="absolute inset-0 bg-[#C5A059] rounded-3xl transform rotate-3 scale-105 opacity-20 pointer-events-none" />
              <div className="relative bg-[#12291E] p-3 rounded-3xl border border-[#C5A059]/30 min-h-[350px] flex items-center justify-center">
                {practitioner.profile_image_url ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={practitioner.profile_image_url}
                    alt={practitioner.profile_image_alt || practitioner.full_name}
                    className="w-full h-full min-h-[350px] max-h-[500px] object-cover object-top rounded-2xl"
                  />
                ) : (
                  <div className="flex flex-col items-center justify-center p-12 text-[#C5A059]">
                    <User className="w-20 h-20" />
                    <span className="text-xs uppercase tracking-wider font-semibold text-white/70 mt-2">
                      {practitioner.full_name}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Information Column */}
          <div className="lg:col-span-7 space-y-6">
            <div>
              <span className="text-xs uppercase tracking-widest text-[#C5A059] font-bold block mb-2">
                Lead Practitioner
              </span>
              <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white">
                {practitioner.full_name}
              </h1>
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
              <div className="grid grid-cols-1 gap-2">
                {practitioner.qualifications.map((qual, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-2 text-sm text-[#EBF2EE] bg-[#12291E]/80 px-4 py-2.5 rounded-xl border border-[#C5A059]/20"
                  >
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
          </div>
        </div>
      </div>
    </section>
  );
}
