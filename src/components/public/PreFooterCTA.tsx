import React from "react";
import Link from "next/link";
import { Phone, ArrowRight } from "lucide-react";
import { SiteSettings } from "@/lib/types";

interface PreFooterCTAProps {
  siteSettings: SiteSettings;
}

export default function PreFooterCTA({ siteSettings }: PreFooterCTAProps) {
  const eyebrow = siteSettings.banner_eyebrow || "YOUR HEALING JOURNEY";
  const headline =
    siteSettings.banner_headline ||
    "Your Journey Toward Better Balance Can Begin With a Conversation.";
  const ctaLabel = siteSettings.banner_primary_cta_label || "Book Your Consultation";
  const ctaLink = siteSettings.banner_primary_cta_link || "/contact";
  const phoneLabel = siteSettings.banner_phone_label || `Call ${siteSettings.phone}`;
  const cleanPhone = siteSettings.phone.replace(/[^0-9+]/g, "");

  return (
    <section className="py-0 bg-[#FAF2EB]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8 sm:pb-14">
        <div className="relative bg-[#1B3B2B] rounded-2xl sm:rounded-3xl overflow-hidden px-5 py-8 sm:px-12 sm:py-12 flex flex-col items-center text-center gap-4 sm:gap-5">

          {/* Subtle top-right radial glow */}
          <div
            className="pointer-events-none absolute top-0 right-0 w-72 h-72 rounded-full opacity-10"
            style={{ background: "radial-gradient(circle, #C5A059 0%, transparent 70%)" }}
            aria-hidden="true"
          />

          {/* Eyebrow */}
          <div className="flex items-center gap-2.5 sm:gap-3">
            <span className="w-5 sm:w-6 h-px bg-[#C5A059]" />
            <span className="text-[10px] uppercase tracking-[0.22em] sm:tracking-[0.25em] text-[#C5A059] font-bold">
              {eyebrow}
            </span>
            <span className="w-5 sm:w-6 h-px bg-[#C5A059]" />
          </div>

          {/* Headline */}
          <h2 className="font-serif text-xl sm:text-3xl lg:text-4xl font-bold text-white max-w-2xl leading-tight sm:leading-tight">
            {headline}
          </h2>

          {/* CTAs */}
          <div className="w-full sm:w-auto flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 mt-1 sm:mt-2">
            <Link
              href={ctaLink}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-[#C5A059] hover:bg-[#D4B070] text-[#1B3B2B] text-sm font-semibold shadow-lg active:scale-[0.98] transition-all duration-200"
            >
              <span>{ctaLabel}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <a
              href={`tel:${cleanPhone}`}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full border border-white/30 text-white text-sm font-medium hover:bg-white/10 active:scale-[0.98] transition-all duration-200"
            >
              <Phone className="w-4 h-4 text-[#C5A059]" />
              <span>{phoneLabel}</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
