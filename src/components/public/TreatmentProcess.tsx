'use client';

import React from 'react';
import { TreatmentProcessStep } from '@/lib/types';
import { CheckCircle2, UserCheck, ClipboardList, FileText, Sparkles, ShieldCheck } from 'lucide-react';

interface TreatmentProcessProps {
  steps: TreatmentProcessStep[];
  title?: string;
  subtitle?: string;
}

const ICON_MAP: Record<string, React.ElementType> = {
  UserCheck,
  ClipboardList,
  FileText,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
};

export default function TreatmentProcess({
  steps,
  title = 'Your Treatment Journey',
  subtitle = 'What to expect during your consultation and acupuncture care experience at Mantra Acupuncture Clinic.',
}: TreatmentProcessProps) {
  if (!steps || steps.length === 0) return null;

  return (
    <section className="py-16 lg:py-24 bg-[#FDFBF7]" id="process">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <span className="text-xs uppercase tracking-widest text-[#C5A059] font-bold">
            Patient Care Approach
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1B3B2B]">
            {title}
          </h2>
          <p className="text-base sm:text-lg text-[#586962] leading-relaxed">
            {subtitle}
          </p>
        </div>

        {/* Process Timeline Steps */}
        <div className="relative">
          {/* Connector Line for Desktop */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-[#E6DFD3] -translate-y-6 z-0" />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 relative z-10">
            {steps.map((step, index) => {
              const IconComp = (step.icon_name && ICON_MAP[step.icon_name]) || CheckCircle2;

              return (
                <div
                  key={step.id || index}
                  className="bg-[#F4EFE6] rounded-2xl p-6 border border-[#E6DFD3] flex flex-col justify-between hover:border-[#C5A059] transition-all shadow-sm group"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="w-10 h-10 rounded-full bg-[#1B3B2B] text-[#C5A059] flex items-center justify-center font-bold text-sm">
                        {step.step_number || index + 1}
                      </div>
                      <IconComp className="w-5 h-5 text-[#586962] group-hover:text-[#1B3B2B] transition-colors" />
                    </div>

                    <h3 className="font-serif text-xl font-bold text-[#1B3B2B]">
                      {step.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-[#586962] leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
