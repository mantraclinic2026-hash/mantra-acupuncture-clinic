'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowUpRight, Sparkles } from 'lucide-react';
import { ConditionItem } from '@/lib/types';

interface ConditionsGridProps {
  conditions: ConditionItem[];
  title?: string;
  subtitle?: string;
}

export default function ConditionsGrid({
  conditions,
  title = 'Health Concerns & Supportive Care',
  subtitle = 'Acupuncture therapy may be considered as supportive care for a variety of functional and musculoskeletal health concerns.',
}: ConditionsGridProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  if (!conditions || conditions.length === 0) return null;

  // Extract unique categories
  const categories = ['All', ...Array.from(new Set(conditions.map((c) => c.category || 'General').filter(Boolean)))];

  const filteredConditions =
    selectedCategory === 'All'
      ? conditions
      : conditions.filter((c) => c.category === selectedCategory);

  return (
    <section className="py-16 lg:py-24 bg-[#F4EFE6] border-y border-[#E6DFD3]" id="conditions">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-10">
          <span className="text-xs uppercase tracking-widest text-[#C5A059] font-bold">
            Supported Health Concerns
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1B3B2B]">
            {title}
          </h2>
          <p className="text-base sm:text-lg text-[#586962] leading-relaxed">
            {subtitle}
          </p>
        </div>

        {/* Category Pills */}
        <div className="flex items-center justify-center gap-2 flex-wrap mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition-all focus:outline-none ${
                selectedCategory === cat
                  ? 'bg-[#1B3B2B] text-white shadow-sm'
                  : 'bg-[#FDFBF7] text-[#2C3531] hover:bg-[#EAE3D5] border border-[#E6DFD3]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredConditions.map((item) => (
            <Link
              key={item.id}
              href={`/conditions/${item.slug}`}
              className="group bg-[#FDFBF7] rounded-2xl p-6 border border-[#E6DFD3] hover:border-[#C5A059] transition-all shadow-sm hover:shadow-md flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#C5A059] bg-[#F4EFE6] px-2.5 py-1 rounded-md">
                    {item.category || 'Supportive Care'}
                  </span>
                  <ArrowUpRight className="w-5 h-5 text-[#586962] group-hover:text-[#1B3B2B] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </div>

                <h3 className="font-serif text-xl font-bold text-[#1B3B2B] group-hover:text-[#C5A059] transition-colors">
                  {item.title}
                </h3>

                <p className="text-sm text-[#586962] leading-relaxed line-clamp-2">
                  {item.short_description}
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-[#E6DFD3]/60 flex items-center gap-1.5 text-xs text-[#1B3B2B]/70 font-medium">
                <Sparkles className="w-3.5 h-3.5 text-[#C5A059]" />
                <span>Customized Protocol</span>
              </div>
            </Link>
          ))}
        </div>

        {/* Medical disclaimer note */}
        <div className="mt-12 text-center text-xs text-[#586962] max-w-2xl mx-auto italic bg-[#FDFBF7]/60 p-4 rounded-xl border border-[#E6DFD3]">
          Note: Acupuncture treatment is provided as supportive care following individual assessment. It does not replace emergency medical care or prescribed pharmaceutical treatments.
        </div>

      </div>
    </section>
  );
}
