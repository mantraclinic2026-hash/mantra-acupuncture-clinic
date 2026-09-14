'use client';

import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { FAQItem } from '@/lib/types';

interface FAQAccordionProps {
  faqs: FAQItem[];
  title?: string;
  subtitle?: string;
}

export default function FAQAccordion({
  faqs,
  title = 'Frequently Asked Questions',
  subtitle = 'Find clear answers regarding acupuncture consultations, safety protocols, and clinic procedures.',
}: FAQAccordionProps) {
  const [openId, setOpenId] = useState<string | null>(faqs[0]?.id || null);

  if (!faqs || faqs.length === 0) return null;

  const toggleFAQ = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section className="py-8 sm:py-12 lg:py-16 bg-[#FAF2EB]" id="faq">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center space-y-3 sm:space-y-4 mb-8 sm:mb-10 max-w-2xl mx-auto">
          <span className="text-xs uppercase tracking-widest text-[#C5A059] font-bold inline-flex items-center justify-center gap-1.5">
            <HelpCircle className="w-4 h-4" />
            <span>Patient FAQs</span>
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-[#1B3B2B] leading-tight">
            {title}
          </h2>
          <p className="text-sm sm:text-base text-[#586962] leading-relaxed max-w-xl mx-auto">
            {subtitle}
          </p>
        </div>

        {/* Accordion list */}
        <div className="space-y-3 sm:space-y-4">
          {faqs.map((faq) => {
            const isOpen = openId === faq.id;
            return (
              <div
                key={faq.id}
                className="bg-[#EEE4D8] rounded-xl sm:rounded-2xl border border-[#E6DFD3] overflow-hidden transition-all"
              >
                <button
                  onClick={() => toggleFAQ(faq.id)}
                  aria-expanded={isOpen}
                  className="w-full text-left p-4 sm:p-6 flex items-center justify-between gap-3 sm:gap-4 focus:outline-none focus:bg-[#EAE3D5]/50 transition-colors"
                >
                  <span className="font-serif text-base sm:text-lg font-bold text-[#1B3B2B] leading-snug">
                    {faq.question}
                  </span>
                  <div className={`p-1.5 rounded-full bg-[#1B3B2B]/5 text-[#1B3B2B] shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180 bg-[#1B3B2B] text-white' : ''}`}>
                    <ChevronDown className="w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 sm:px-6 pb-6 pt-1 text-sm sm:text-base text-[#586962] leading-relaxed border-t border-[#E6DFD3]/60">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
