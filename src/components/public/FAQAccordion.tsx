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
    <section className="py-16 lg:py-24 bg-[#FDFBF7]" id="faq">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center space-y-4 mb-12">
          <span className="text-xs uppercase tracking-widest text-[#C5A059] font-bold flex items-center justify-center gap-1.5">
            <HelpCircle className="w-4 h-4" />
            <span>Patient FAQs</span>
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#1B3B2B]">
            {title}
          </h2>
          <p className="text-base text-[#586962] leading-relaxed">
            {subtitle}
          </p>
        </div>

        {/* Accordion list */}
        <div className="space-y-4">
          {faqs.map((faq) => {
            const isOpen = openId === faq.id;
            return (
              <div
                key={faq.id}
                className="bg-[#F4EFE6] rounded-2xl border border-[#E6DFD3] overflow-hidden transition-all"
              >
                <button
                  onClick={() => toggleFAQ(faq.id)}
                  aria-expanded={isOpen}
                  className="w-full text-left p-5 sm:p-6 flex items-center justify-between gap-4 focus:outline-none focus:bg-[#EAE3D5]/50 transition-colors"
                >
                  <span className="font-serif text-lg font-bold text-[#1B3B2B]">
                    {faq.question}
                  </span>
                  <div className={`p-1.5 rounded-full bg-[#1B3B2B]/5 text-[#1B3B2B] shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180 bg-[#1B3B2B] text-white' : ''}`}>
                    <ChevronDown className="w-5 h-5" />
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
