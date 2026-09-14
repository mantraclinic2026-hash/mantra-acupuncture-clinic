'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, ChevronRight } from 'lucide-react';
import { ConditionItem, SiteSettings } from '@/lib/types';

interface ConditionsGridProps {
  conditions: ConditionItem[];
  siteSettings: SiteSettings;
}

// ─── CUSTOM VECTOR ICONS MATCHING SCREENSHOT ────────────────────────────────
function JointIcon({ className = 'w-5 h-5 text-[#1B3B2B]' }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M13 5v5c0 1.5-1.5 2.5-2.5 3.5M19 5v5c0 1.5 1.5 2.5 2.5 3.5" />
      <path d="M10.5 13.5c1.2 1 3.2 1.5 5.5 1.5s4.3-.5 5.5-1.5" />
      <path d="M10.5 18.5c1.2-1 3.2-1.5 5.5-1.5s4.3.5 5.5 1.5" />
      <path d="M13 27v-5c0-1.5-1.5-2.5-2.5-3.5M19 27v-5c0-1.5 1.5-2.5 2.5-3.5" />
      <circle cx="16" cy="16" r="1.5" fill="currentColor" />
    </svg>
  );
}

function BrainIcon({ className = 'w-5 h-5 text-[#1B3B2B]' }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M16 8c-2.5-2-6-1.5-7.5.5-2 2.5-1.5 6-1 8-1 1-1.5 3-1 5 1 2.5 3.5 3.5 6 3.5.5 0 1-.1 1.5-.3" />
      <path d="M10.5 12.5c1.5 1 3 .5 3.5 2.5" />
      <path d="M9 18.5c2 0 3.5 1 3.5 3" />
      <path d="M16 8c2.5-2 6-1.5 7.5.5 2 2.5 1.5 6 1 8 1 1 1.5 3 1 5-1 2.5-3.5 3.5-6 3.5-.5 0-1-.1-1.5-.3" />
      <path d="M21.5 12.5c-1.5 1-3 .5-3.5 2.5" />
      <path d="M23 18.5c-2 0-3.5 1-3.5 3" />
      <path d="M16 7.5v17" strokeDasharray="1.5 2" />
    </svg>
  );
}

function StomachIcon({ className = 'w-5 h-5 text-[#1B3B2B]' }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M15 6v4c0 2-1 3-2 5" />
      <path d="M13 15c-3 3-4 7-2 10 2 3 7 3 10 0 3-3 3.5-7 1-10-2-2.5-4-3.5-7-4" />
      <path d="M19 20c2 0 3.5 2 3.5 4" />
    </svg>
  );
}

function LungsIcon({ className = 'w-5 h-5 text-[#1B3B2B]' }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M16 6v7M14 8h4M14 11h4" />
      <path d="M16 13c-2 2-3 4-5 4M16 13c2 2 3 4 5 4" />
      <path d="M11 17c-3 0-5 3-5 7 0 3 2 4 5 4 2 0 3-1 4-3 1-2 1-6 1-8" />
      <path d="M21 17c3 0 5 3 5 7 0 3-2 4-5 4-2 0-3-1-4-3-1-2-1-6-1-8" />
    </svg>
  );
}

function WomenHealthIcon({ className = 'w-5 h-5 text-[#1B3B2B]' }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <circle cx="16" cy="11" r="4" />
      <path d="M12 12c0-3 2-5 4-5s4 2 4 5c0 2-1 3-1.5 4M12 12c0 2 1 3 1.5 4" />
      <path d="M14.5 16.5v2M17.5 16.5v2" />
      <path d="M10 26c1-3.5 3-6 6-6s5 2.5 6 6" />
    </svg>
  );
}

// ─── CATEGORY CONFIGURATION MATCHING SCREENSHOT ──────────────────────────────
interface CategoryConfig {
  key: string;
  name: string;
  badgeBg: string;
  renderIcon: () => React.ReactNode;
  defaultItems: string[];
}

const CATEGORY_DEFS: CategoryConfig[] = [
  {
    key: 'pain',
    name: 'PAIN',
    badgeBg: 'bg-[#E2ECE5]',
    renderIcon: () => <JointIcon className="w-5 h-5 text-[#1B3B2B]" />,
    defaultItems: ['Neck Pain', 'Knee Pain / Osteoarthritis', 'Shoulder Pain', 'Tennis Elbow'],
  },
  {
    key: 'stress',
    name: 'STRESS',
    badgeBg: 'bg-[#F5EBE1]',
    renderIcon: () => <BrainIcon className="w-5 h-5 text-[#1B3B2B]" />,
    defaultItems: ['Emotional Distress', 'Depression', 'Anxiety', 'Insomnia'],
  },
  {
    key: 'digestive',
    name: 'DIGESTIVE',
    badgeBg: 'bg-[#E2ECE5]',
    renderIcon: () => <StomachIcon className="w-5 h-5 text-[#1B3B2B]" />,
    defaultItems: ['Nausea', 'GEDRs', 'Gastrics', 'Constipation'],
  },
  {
    key: 'respiratory',
    name: 'RESPIRATORY',
    badgeBg: 'bg-[#F5EBE1]',
    renderIcon: () => <LungsIcon className="w-5 h-5 text-[#1B3B2B]" />,
    defaultItems: ['Asthma', 'Sore Throat', 'Cold/Flu', 'Headaches'],
  },
  {
    key: 'women and health',
    name: 'WOMEN AND HEALTH',
    badgeBg: 'bg-[#E2ECE5]',
    renderIcon: () => <WomenHealthIcon className="w-5 h-5 text-[#1B3B2B]" />,
    defaultItems: ['Infertility', 'PMS', 'Menstrual Disorders', 'Menopause'],
  },
];

export default function ConditionsGrid({ conditions, siteSettings }: ConditionsGridProps) {
  const [activeMobileTab, setActiveMobileTab] = useState<string>('All');

  const eyebrow = siteSettings.conditions_eyebrow || 'CONDITIONS WE SUPPORT';
  const headline = siteSettings.conditions_headline || 'Supporting Your Body Through Better Balance.';
  const subtitle =
    siteSettings.conditions_subtitle ||
    'Acupuncture is offered as supportive care for a wide range of functional and musculoskeletal concerns, tailored to your individual needs.';
  const ctaLabel = siteSettings.conditions_cta_label || 'View All Conditions';
  const ctaLink = siteSettings.conditions_cta_link || '/conditions';

  // Map database conditions to the standard categories
  const resolvedCategories = CATEGORY_DEFS.map((def) => {
    const dbMatches = conditions.filter((c) => {
      const cat = (c.category || '').toLowerCase().trim();
      if (def.key === 'women and health') {
        return cat.includes('women') || cat.includes('health') || cat.includes('female');
      }
      return cat.includes(def.key);
    });

    // Use DB items if present, or fallback to the screenshot items
    const items =
      dbMatches.length > 0
        ? dbMatches.map((m) => ({ title: m.title, slug: m.slug }))
        : def.defaultItems.map((title) => ({
            title,
            slug: title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
          }));

    return {
      ...def,
      items,
      count: items.length,
    };
  });

  const topRowCategories = resolvedCategories.slice(0, 3); // Pain, Stress, Digestive
  const bottomRowCategories = resolvedCategories.slice(3); // Respiratory, Women and Health

  return (
    <section className="py-8 sm:py-12 lg:py-16 bg-[#FAF2EB]" id="conditions">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">

          {/* =====================================================
              LEFT COLUMN – Headline, Narrative, Leaf & CTA
          ===================================================== */}
          <div className="lg:col-span-4 xl:col-span-4 flex flex-col justify-center space-y-4 sm:space-y-5 -translate-x-1 sm:-translate-x-3 lg:-translate-x-8 xl:-translate-x-12">
            {/* Eyebrow */}
            <div className="flex items-center gap-3">
              <span className="w-8 h-px bg-[#C5A059]" />
              <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.22em] text-[#C5A059] font-bold">
                {eyebrow}
              </span>
            </div>

            {/* Main Headline */}
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-[2.75rem] font-bold text-[#1B3B2B] leading-[1.18] tracking-tight">
              {headline}
            </h2>

            {/* Subtitle */}
            <p className="text-sm sm:text-base text-[#586962] leading-relaxed max-w-md">
              {subtitle}
            </p>

            {/* Botanical Leaf Art Icon matching screenshot */}
            <div className="py-1">
              <svg
                viewBox="0 0 64 52"
                className="w-16 h-13 text-[#1B3B2B]/20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  d="M32 4 C16 4 6 18 6 34 C6 42 17 46 32 46 C47 46 58 42 58 34 C58 18 48 4 32 4 Z"
                  opacity="0.4"
                />
                <path d="M32 4 L32 46" stroke="#1B3B2B" strokeWidth="1.5" fill="none" opacity="0.6" />
                <path d="M32 16 C22 16 14 24 10 32" stroke="#1B3B2B" strokeWidth="1.2" fill="none" opacity="0.5" />
                <path d="M32 26 C22 27 16 34 12 40" stroke="#1B3B2B" strokeWidth="1.2" fill="none" opacity="0.5" />
                <path d="M32 16 C42 16 50 24 54 32" stroke="#1B3B2B" strokeWidth="1.2" fill="none" opacity="0.5" />
                <path d="M32 26 C42 27 48 34 52 40" stroke="#1B3B2B" strokeWidth="1.2" fill="none" opacity="0.5" />
              </svg>
            </div>

            {/* Pill CTA Button */}
            <div className="pt-2">
              <Link
                href={ctaLink}
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full border border-[#1B3B2B] text-[#1B3B2B] text-xs sm:text-sm font-semibold hover:bg-[#1B3B2B] hover:text-white active:scale-[0.98] transition-all duration-200 shadow-xs"
              >
                <span>{ctaLabel}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* =====================================================
              RIGHT COLUMN – THE EXACT IVORY CARD FROM SCREENSHOT
          ===================================================== */}
          <div className="lg:col-span-8 xl:col-span-8 relative">
            <div className="relative bg-[#FAF5EF] rounded-3xl p-6 sm:p-8 lg:p-10 border border-[#EAE1D3] shadow-[0_10px_35px_-5px_rgba(0,0,0,0.06)] overflow-hidden">

              {/* Botanical Leaf Watermark - Top Right Corner */}
              <div
                className="pointer-events-none absolute -top-10 -right-10 w-64 h-64 opacity-25 mix-blend-multiply overflow-hidden z-0"
                aria-hidden="true"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/botanical-flowers1.png"
                  alt=""
                  className="w-full h-full object-contain rotate-45 scale-125"
                />
              </div>

              {/* Botanical Leaf Watermark - Bottom Left Corner */}
              <div
                className="pointer-events-none absolute -bottom-12 -left-12 w-64 h-64 opacity-20 mix-blend-multiply overflow-hidden z-0"
                aria-hidden="true"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/botanical-flowers1.png"
                  alt=""
                  className="w-full h-full object-contain -rotate-135 scale-125"
                />
              </div>

              {/* MOBILE ONLY QUICK-FILTER BAR (visible under sm) */}
              <div className="flex sm:hidden items-center gap-1.5 overflow-x-auto pb-3 mb-5 border-b border-[#E8DFD0] scrollbar-none relative z-10">
                <button
                  type="button"
                  onClick={() => setActiveMobileTab('All')}
                  className={`px-3 py-1 rounded-full text-[11px] font-bold whitespace-nowrap transition-colors ${
                    activeMobileTab === 'All'
                      ? 'bg-[#1B3B2B] text-white shadow-xs'
                      : 'bg-[#EFE7DC] text-[#586962]'
                  }`}
                >
                  All ({resolvedCategories.length})
                </button>
                {resolvedCategories.map((c) => (
                  <button
                    key={c.key}
                    type="button"
                    onClick={() => setActiveMobileTab(c.name)}
                    className={`px-3 py-1 rounded-full text-[11px] font-bold whitespace-nowrap transition-colors ${
                      activeMobileTab === c.name
                        ? 'bg-[#1B3B2B] text-white shadow-xs'
                        : 'bg-[#EFE7DC] text-[#586962]'
                    }`}
                  >
                    {c.name} ({c.count})
                  </button>
                ))}
              </div>

              {/* MOBILE VIEW (Single Column / Interactive on mobile) */}
              <div className="block sm:hidden relative z-10">
                {activeMobileTab === 'All' ? (
                  <div className="space-y-2">
                    {resolvedCategories.map((cat) => (
                      <button
                        key={cat.key}
                        type="button"
                        onClick={() => setActiveMobileTab(cat.name)}
                        className="w-full px-3.5 py-3 bg-[#FAF7F2] active:bg-[#EEE4D8] border border-[#E8DFD0] rounded-xl flex items-center justify-between transition-all group"
                      >
                        <div className="flex items-center gap-3">
                          <div className={`w-8 h-8 rounded-full ${cat.badgeBg} flex items-center justify-center shrink-0`}>
                            {cat.renderIcon()}
                          </div>
                          <span className="text-xs uppercase tracking-wider font-bold text-[#1B3B2B]">
                            {cat.name}
                          </span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <span className="text-[10px] font-semibold text-[#8C7E6C] bg-[#EFE7DC] px-2 py-0.5 rounded-full font-mono">
                            {cat.count}
                          </span>
                          <ChevronRight className="w-4 h-4 text-[#C5A059]" />
                        </div>
                      </button>
                    ))}
                  </div>
                ) : (
                  <div className="space-y-3">
                    {(() => {
                      const selected = resolvedCategories.find((c) => c.name === activeMobileTab);
                      if (!selected) return null;
                      return (
                        <>
                          <div className="pb-2 border-b border-[#E8DFD0] flex items-center justify-between">
                            <div className="flex items-center gap-2.5">
                              <div className={`w-8 h-8 rounded-full ${selected.badgeBg} flex items-center justify-center shrink-0`}>
                                {selected.renderIcon()}
                              </div>
                              <span className="text-xs uppercase tracking-widest font-bold text-[#1B3B2B]">
                                {selected.name} ({selected.count})
                              </span>
                            </div>
                            <button
                              type="button"
                              onClick={() => setActiveMobileTab('All')}
                              className="text-[11px] font-semibold text-[#C5A059] hover:text-[#1B3B2B]"
                            >
                              View All
                            </button>
                          </div>
                          <ul className="space-y-2 pt-1">
                            {selected.items.map((item, idx) => (
                              <li key={idx} className="flex items-center gap-2.5 text-xs text-[#2C3531]">
                                <span className="w-1.5 h-1.5 rounded-full bg-[#C5A059] shrink-0" />
                                <Link
                                  href={`/conditions/${item.slug}`}
                                  className="hover:underline underline-offset-2"
                                >
                                  {item.title}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </>
                      );
                    })()}
                  </div>
                )}
              </div>

              {/* =====================================================
                  DESKTOP & TABLET VIEW – EXACT LAYOUT FROM SCREENSHOT
                  Top row: 3 columns (PAIN, STRESS, DIGESTIVE)
                  Bottom row: 2 columns (RESPIRATORY, WOMEN AND HEALTH)
              ===================================================== */}
              <div className="hidden sm:block relative z-10 space-y-7 sm:space-y-8">

                {/* ROW 1: PAIN | STRESS | DIGESTIVE */}
                <div className="grid grid-cols-3">
                  {topRowCategories.map((cat, idx) => {
                    const isFirst = idx === 0;
                    const isMiddle = idx === 1;
                    const isLast = idx === 2;

                    return (
                      <div
                        key={cat.key}
                        className={`space-y-3 ${
                          isFirst ? 'pr-5 lg:pr-7 border-r border-[#E8DFD0]' : ''
                        } ${
                          isMiddle ? 'px-5 lg:px-7 border-r border-[#E8DFD0]' : ''
                        } ${
                          isLast ? 'pl-5 lg:pl-7' : ''
                        }`}
                      >
                        {/* Header: Circle Icon + Name + Count */}
                        <div className="flex items-center gap-2.5 pb-2 border-b border-[#E8DFD0]/90">
                          <div
                            className={`w-9 h-9 lg:w-10 lg:h-10 rounded-full ${cat.badgeBg} flex items-center justify-center shrink-0 border border-black/5`}
                          >
                            {cat.renderIcon()}
                          </div>
                          <div className="flex-1 flex items-center justify-between min-w-0">
                            <h3 className="text-xs lg:text-[13px] font-bold tracking-wider text-[#1B3B2B] uppercase truncate">
                              {cat.name}
                            </h3>
                            <span className="text-[11px] lg:text-xs text-[#8C7E6C] font-medium shrink-0 ml-1">
                              ({cat.count})
                            </span>
                          </div>
                        </div>

                        {/* Bulleted points */}
                        <ul className="space-y-2 pt-0.5">
                          {cat.items.map((item, i) => (
                            <li key={i} className="flex items-start gap-2.5 text-xs lg:text-[13px] text-[#2C3531]">
                              <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#C5A059] shrink-0" />
                              <Link
                                href={`/conditions/${item.slug}`}
                                className="leading-snug hover:text-[#C5A059] transition-colors"
                              >
                                {item.title}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    );
                  })}
                </div>

                {/* ROW 2: RESPIRATORY | WOMEN AND HEALTH */}
                <div className="grid grid-cols-3">
                  {bottomRowCategories.map((cat, idx) => {
                    const isFirst = idx === 0; // Respiratory
                    const isSecond = idx === 1; // Women and Health

                    return (
                      <div
                        key={cat.key}
                        className={`space-y-3 ${
                          isFirst ? 'pr-5 lg:pr-7 border-r border-[#E8DFD0]' : ''
                        } ${
                          isSecond ? 'px-5 lg:px-7' : ''
                        }`}
                      >
                        {/* Header: Circle Icon + Name + Count */}
                        <div className="flex items-center gap-2.5 pb-2 border-b border-[#E8DFD0]/90">
                          <div
                            className={`w-9 h-9 lg:w-10 lg:h-10 rounded-full ${cat.badgeBg} flex items-center justify-center shrink-0 border border-black/5`}
                          >
                            {cat.renderIcon()}
                          </div>
                          <div className="flex-1 flex items-center justify-between min-w-0">
                            <h3 className="text-xs lg:text-[13px] font-bold tracking-wider text-[#1B3B2B] uppercase truncate">
                              {cat.name}
                            </h3>
                            <span className="text-[11px] lg:text-xs text-[#8C7E6C] font-medium shrink-0 ml-1">
                              ({cat.count})
                            </span>
                          </div>
                        </div>

                        {/* Bulleted points */}
                        <ul className="space-y-2 pt-0.5">
                          {cat.items.map((item, i) => (
                            <li key={i} className="flex items-start gap-2.5 text-xs lg:text-[13px] text-[#2C3531]">
                              <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#C5A059] shrink-0" />
                              <Link
                                href={`/conditions/${item.slug}`}
                                className="leading-snug hover:text-[#C5A059] transition-colors"
                              >
                                {item.title}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    );
                  })}

                  {/* Empty 3rd column allowing the delicate leaf watermark to shine through */}
                  <div className="hidden lg:block" aria-hidden="true" />
                </div>

              </div>

              {/* CARD FOOTER – Centered subtle medical disclaimer */}
              <div className="relative z-10 mt-6 sm:mt-8 pt-4 border-t border-[#E8DFD0]/80 text-center">
                <p className="text-[10px] sm:text-[11px] text-[#586962] italic">
                  Acupuncture is provided as supportive care following individual assessment. It does not replace emergency medical care.
                </p>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
