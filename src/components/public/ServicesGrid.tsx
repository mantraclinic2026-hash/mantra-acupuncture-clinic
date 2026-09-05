'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Activity, Zap, Feather, Sparkles, CheckCircle2 } from 'lucide-react';
import { ServiceItem } from '@/lib/types';

interface ServicesGridProps {
  services: ServiceItem[];
  title?: string;
  subtitle?: string;
}

const ICON_MAP: Record<string, React.ElementType> = {
  Activity,
  Zap,
  Feather,
  Sparkles,
};

export default function ServicesGrid({
  services,
  title = 'Therapeutic Acupuncture Services',
  subtitle = 'Individualized treatment options designed to support your body’s natural recovery and functional balance.',
}: ServicesGridProps) {
  if (!services || services.length === 0) return null;

  return (
    <section className="py-16 lg:py-24 bg-[#FDFBF7]" id="services">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-12 lg:mb-16">
          <span className="text-xs uppercase tracking-widest text-[#C5A059] font-bold">
            CMS Managed Services
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1B3B2B]">
            {title}
          </h2>
          <p className="text-base sm:text-lg text-[#586962] leading-relaxed">
            {subtitle}
          </p>
        </div>

        {/* Services Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service) => {
            const IconComponent = (service.icon_name && ICON_MAP[service.icon_name]) || Sparkles;

            return (
              <div
                key={service.id}
                className="group relative bg-[#F4EFE6] rounded-3xl p-6 sm:p-8 border border-[#E6DFD3] hover:border-[#C5A059] transition-all duration-300 shadow-sm hover:shadow-md flex flex-col justify-between"
              >
                <div className="space-y-4">
                  {/* Icon */}
                  <div className="w-12 h-12 rounded-2xl bg-[#1B3B2B] text-[#C5A059] flex items-center justify-center transition-transform group-hover:scale-110">
                    <IconComponent className="w-6 h-6" />
                  </div>

                  {/* Title & Short Description */}
                  <h3 className="font-serif text-2xl font-bold text-[#1B3B2B] group-hover:text-[#2D5640] transition-colors">
                    {service.title}
                  </h3>

                  <p className="text-sm sm:text-base text-[#586962] leading-relaxed line-clamp-3">
                    {service.short_description}
                  </p>

                  <div className="pt-2 text-xs text-[#2C3531] flex items-center gap-1.5 font-medium">
                    <CheckCircle2 className="w-4 h-4 text-[#C5A059]" />
                    <span>Personalized Assessment</span>
                  </div>
                </div>

                {/* Detail Link */}
                <div className="pt-6 mt-6 border-t border-[#E6DFD3]/80">
                  <Link
                    href={`/treatments/${service.slug}`}
                    className="inline-flex items-center text-sm font-semibold text-[#1B3B2B] group-hover:text-[#C5A059] transition-colors"
                  >
                    <span>Read Treatment Details</span>
                    <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
