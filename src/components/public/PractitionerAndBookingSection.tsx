"use client";

import React, { useState, useTransition } from "react";
import Link from "next/link";
import { Phone, MapPin, Clock, Lock, CheckCircle, AlertCircle, Loader2, ArrowRight } from "lucide-react";
import ImageFallback from "./ImageFallback";
import { buildWhatsAppUrl } from "@/lib/whatsapp";
import { submitConsultationInquiry, InquiryActionResult } from "@/lib/actions/inquiry";
import { Practitioner, SiteSettings } from "@/lib/types";

interface PractitionerAndBookingSectionProps {
  practitioner: Practitioner;
  siteSettings: SiteSettings;
}

export default function PractitionerAndBookingSection({
  practitioner,
  siteSettings,
}: PractitionerAndBookingSectionProps) {
  const [isPending, startTransition] = useTransition();
  const [result, setResult] = useState<InquiryActionResult | null>(null);

  const cleanPhone = siteSettings.phone.replace(/[^0-9+]/g, "");
  const whatsappUrl = buildWhatsAppUrl(siteSettings.whatsapp_number, siteSettings.default_whatsapp_message);

  const practitionerEyebrow = siteSettings.practitioner_eyebrow || "YOUR PRACTITIONER";
  const bookingHeadline = siteSettings.practitioner_booking_headline || "Book Your Consultation";
  const bookingSubtitle =
    siteSettings.practitioner_booking_subtitle ||
    "Share your details and we will reach out to schedule a session that works for you.";

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    startTransition(async () => {
      const res = await submitConsultationInquiry(formData);
      setResult(res);
      if (res.success) (e.target as HTMLFormElement).reset();
    });
  };

  return (
    <section className="py-8 sm:py-12 lg:py-16 bg-[#FAF2EB]" id="doctor">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 items-stretch">

          {/* ===== LEFT CARD: PRACTITIONER ===== */}
          <div className="bg-[#EEE4D8] rounded-2xl sm:rounded-3xl overflow-hidden border border-[#E8DFD0] shadow-sm flex flex-col h-full">
            {/* Card Header */}
            <div className="bg-[#1B3B2B] px-5 sm:px-8 py-4 sm:py-5 min-h-[58px] flex items-center">
              <span className="text-[10px] uppercase tracking-[0.2em] text-[#C5A059] font-bold">
                {practitionerEyebrow}
              </span>
            </div>

            <div className="p-5 sm:p-7 lg:p-9 flex flex-col flex-1 justify-between gap-6">
              {/* Top Details */}
              <div className="space-y-4">
                {/* Photo + Name row */}
                <div className="flex flex-col sm:flex-row items-center sm:items-center text-center sm:text-left gap-5 sm:gap-6">
                  {/* Circular photo with gold ring - enlarged layout with breathing room to fully show face */}
                  <div className="relative shrink-0">
                    <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-full ring-4 ring-[#C5A059]/60 ring-offset-2 ring-offset-[#EEE4D8] overflow-hidden bg-white shadow-md flex items-center justify-center">
                      {practitioner.profile_image_url ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={practitioner.profile_image_url}
                          alt={practitioner.profile_image_alt || practitioner.full_name}
                          className="w-full h-full object-cover object-[center_top] scale-95 rounded-full transition-transform duration-300 hover:scale-100"
                        />
                      ) : (
                        <ImageFallback
                          src={null}
                          alt={practitioner.profile_image_alt || practitioner.full_name}
                          width={144}
                          height={144}
                          aspectRatio="square"
                          className="w-full h-full object-cover"
                        />
                      )}
                    </div>
                  </div>
                  <div className="space-y-1 sm:space-y-1.5">
                    <h2 className="font-serif text-xl sm:text-2xl lg:text-3xl font-bold text-[#1B3B2B]">
                      {practitioner.full_name}
                    </h2>
                    <div className="space-y-1 pt-0.5">
                      {practitioner.qualifications.map((q, i) => (
                        <p key={i} className="flex items-center gap-2 text-xs sm:text-sm text-[#586962]">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#C5A059] shrink-0" />
                          {q}
                        </p>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Bio */}
                <p className="text-sm text-[#586962] leading-relaxed">
                  {practitioner.bio}
                </p>

                {/* Decorative signature line */}
                <div className="border-t border-[#E8DFD0] pt-3">
                  <svg viewBox="0 0 160 40" className="h-7 text-[#1B3B2B]/30" fill="none" stroke="currentColor" strokeWidth="1.2" aria-hidden="true">
                    <path d="M10 30 Q30 5 50 28 Q65 40 80 20 Q95 5 110 25 Q125 38 150 15" strokeLinecap="round" />
                  </svg>
                </div>
              </div>

              {/* Bottom Section: Info Subcards + Profile Link */}
              <div className="space-y-4 mt-auto">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {/* Hours */}
                  <div className="bg-[#FAF2EB] rounded-2xl p-3.5 border border-[#E8DFD0]">
                    <p className="flex items-center gap-1.5 text-[10px] uppercase tracking-widest text-[#C5A059] font-bold mb-1">
                      <Clock className="w-3 h-3" />
                      Working Hours
                    </p>
                    <p className="text-xs text-[#2C3531] leading-relaxed">
                      {siteSettings.working_hours.split("|").map((s, i) => (
                        <span key={i} className="block">{s.trim()}</span>
                      ))}
                    </p>
                  </div>

                  {/* Address */}
                  <div className="bg-[#FAF2EB] rounded-2xl p-3.5 border border-[#E8DFD0]">
                    <p className="flex items-center gap-1.5 text-[10px] uppercase tracking-widest text-[#C5A059] font-bold mb-1">
                      <MapPin className="w-3 h-3" />
                      Address
                    </p>
                    <p className="text-xs text-[#2C3531] leading-relaxed line-clamp-3">
                      {siteSettings.address}
                    </p>
                  </div>

                  {/* Call Now */}
                  <a
                    href={`tel:${cleanPhone}`}
                    className="bg-[#1B3B2B] hover:bg-[#12291E] transition-colors rounded-2xl p-3.5 border border-[#1B3B2B] flex items-center gap-2.5"
                  >
                    <Phone className="w-4 h-4 text-[#C5A059] shrink-0" />
                    <div className="min-w-0">
                      <p className="text-[10px] uppercase tracking-widest text-[#C5A059] font-bold">Call Now</p>
                      <p className="text-xs text-white font-medium truncate">{siteSettings.phone}</p>
                    </div>
                  </a>

                  {/* Get Directions */}
                  <a
                    href={siteSettings.google_maps_url || "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-[#FAF2EB] hover:bg-[#EEE4D8] transition-colors rounded-2xl p-3.5 border border-[#E8DFD0] flex items-center gap-2.5"
                  >
                    <MapPin className="w-4 h-4 text-[#C5A059] shrink-0" />
                    <div className="min-w-0">
                      <p className="text-[10px] uppercase tracking-widest text-[#C5A059] font-bold">Get Directions</p>
                      <p className="text-xs text-[#2C3531] font-medium truncate">View on Maps →</p>
                    </div>
                  </a>
                </div>

                <div className="pt-1">
                  <Link
                    href="/doctor"
                    className="inline-flex items-center gap-1.5 text-sm text-[#1B3B2B] font-semibold hover:text-[#C5A059] transition-colors"
                  >
                    <span>View Full Profile</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* ===== RIGHT CARD: CONSULTATION FORM ===== */}
          <div className="bg-[#FAF2EB] rounded-2xl sm:rounded-3xl overflow-hidden border border-[#E8DFD0] shadow-sm flex flex-col h-full">
            {/* Card Header */}
            <div className="bg-[#1B3B2B] px-5 sm:px-8 py-4 sm:py-5 min-h-[58px] flex items-center">
              <span className="text-[10px] uppercase tracking-[0.2em] text-[#C5A059] font-bold">
                APPOINTMENT REQUEST
              </span>
            </div>

            <div className="p-5 sm:p-7 lg:p-9 flex flex-col flex-1 justify-between gap-5">
              <div>
                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#1B3B2B]">
                  {bookingHeadline}
                </h2>
                <p className="mt-1 text-sm text-[#586962] leading-relaxed">
                  {bookingSubtitle}
                </p>
              </div>

              {/* Success */}
              {result?.success && (
                <div className="p-4 rounded-2xl bg-[#EBF2EE] border border-[#1B3B2B]/20 text-[#1B3B2B] flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-[#1B3B2B] shrink-0 mt-0.5" />
                  <div className="text-sm">
                    <p className="font-bold">Enquiry Submitted</p>
                    <p className="mt-0.5 text-[#586962]">{result.message}</p>
                  </div>
                </div>
              )}

              {/* Error */}
              {result && !result.success && (
                <div className="p-4 rounded-2xl bg-red-50 border border-red-200 text-red-800 flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                  <div className="text-sm">
                    <p className="font-semibold">Submission Issue</p>
                    <p className="mt-0.5">{result.message}</p>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="flex-1 flex flex-col justify-between space-y-3.5">
                {/* Honeypot */}
                <div className="hidden" aria-hidden="true">
                  <input type="text" name="website_url" tabIndex={-1} autoComplete="off" />
                </div>

                {/* Row 1: Full Name & Phone */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div>
                    <label htmlFor="booking-fullName" className="block text-[11px] font-bold uppercase tracking-wider text-[#1B3B2B] mb-1">
                      Full Name <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="text" id="booking-fullName" name="fullName" required
                      placeholder="e.g. Anish Kumar"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#EEE4D8] border border-[#E8DFD0] text-[#2C3531] placeholder-[#586962]/50 text-sm focus:outline-none focus:ring-2 focus:ring-[#C5A059] focus:border-transparent transition-all"
                    />
                  </div>

                  <div>
                    <label htmlFor="booking-phone" className="block text-[11px] font-bold uppercase tracking-wider text-[#1B3B2B] mb-1">
                      Phone <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="tel" id="booking-phone" name="phone" required
                      placeholder="+91 98765 43210"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#EEE4D8] border border-[#E8DFD0] text-[#2C3531] placeholder-[#586962]/50 text-sm focus:outline-none focus:ring-2 focus:ring-[#C5A059] focus:border-transparent transition-all"
                    />
                  </div>
                </div>

                {/* Row 2: Email & Preferred Date */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div>
                    <label htmlFor="booking-email" className="block text-[11px] font-bold uppercase tracking-wider text-[#1B3B2B] mb-1">
                      Email <span className="text-[10px] text-[#586962] font-normal">(Optional)</span>
                    </label>
                    <input
                      type="email" id="booking-email" name="email"
                      placeholder="anish@example.com"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#EEE4D8] border border-[#E8DFD0] text-[#2C3531] placeholder-[#586962]/50 text-sm focus:outline-none focus:ring-2 focus:ring-[#C5A059] focus:border-transparent transition-all"
                    />
                  </div>

                  <div>
                    <label htmlFor="booking-preferredDate" className="block text-[11px] font-bold uppercase tracking-wider text-[#1B3B2B] mb-1">
                      Preferred Date <span className="text-[10px] text-[#586962] font-normal">(Optional)</span>
                    </label>
                    <input
                      type="date" id="booking-preferredDate" name="preferredDate"
                      min={new Date().toISOString().split("T")[0]}
                      suppressHydrationWarning
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#EEE4D8] border border-[#E8DFD0] text-[#2C3531] text-sm focus:outline-none focus:ring-2 focus:ring-[#C5A059] focus:border-transparent transition-all"
                    />
                  </div>
                </div>

                {/* Row 3: Message */}
                <div>
                  <label htmlFor="booking-message" className="block text-[11px] font-bold uppercase tracking-wider text-[#1B3B2B] mb-1">
                    Message / Concern <span className="text-[10px] text-[#586962] font-normal">(Optional)</span>
                  </label>
                  <textarea
                    id="booking-message" name="message" rows={2}
                    placeholder="Briefly describe your health concern or preferred timing..."
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#EEE4D8] border border-[#E8DFD0] text-[#2C3531] placeholder-[#586962]/50 text-sm focus:outline-none focus:ring-2 focus:ring-[#C5A059] focus:border-transparent transition-all resize-none"
                  />
                </div>

                {/* Submit & Privacy Footer */}
                <div className="mt-auto pt-2 space-y-2">
                  <button
                    type="submit" disabled={isPending}
                    className="w-full py-3.5 px-6 rounded-full bg-[#1B3B2B] hover:bg-[#12291E] text-white font-medium text-sm sm:text-base shadow-md transition-all flex items-center justify-center gap-2 focus:ring-2 focus:ring-[#C5A059] disabled:opacity-60"
                  >
                    {isPending ? (
                      <><Loader2 className="w-5 h-5 animate-spin" /><span>Submitting...</span></>
                    ) : (
                      <><span>Submit Inquiry</span><ArrowRight className="w-4 h-4" /></>
                    )}
                  </button>

                  <div className="flex items-center justify-center gap-1.5 text-[11px] text-[#586962]">
                    <Lock className="w-3 h-3 text-[#C5A059]" />
                    <span>Your details are private and will only be used to schedule your consultation.</span>
                  </div>
                </div>
              </form>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
