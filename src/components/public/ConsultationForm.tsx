'use client';

import React, { useState, useTransition } from 'react';
import { Send, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { submitConsultationInquiry, InquiryActionResult } from '@/lib/actions/inquiry';

interface ConsultationFormProps {
  title?: string;
  subtitle?: string;
  className?: string;
}

export default function ConsultationForm({
  title = 'Schedule Your Consultation',
  subtitle = 'Please fill out the form below to request an appointment. Our team will contact you promptly to confirm details.',
  className = '',
}: ConsultationFormProps) {
  const [isPending, startTransition] = useTransition();
  const [result, setResult] = useState<InquiryActionResult | null>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    startTransition(async () => {
      const res = await submitConsultationInquiry(formData);
      setResult(res);
      if (res.success) {
        (e.target as HTMLFormElement).reset();
      }
    });
  };

  return (
    <div className={`bg-[#F4EFE6] rounded-3xl p-6 sm:p-10 border border-[#E6DFD3] shadow-md ${className}`} id="consultation-form">
      <div className="max-w-xl mx-auto space-y-6">
        
        {/* Form Title & Subtitle */}
        <div className="space-y-2 text-center sm:text-left">
          <span className="text-xs uppercase tracking-widest text-[#C5A059] font-bold">
            Appointment Enquiry
          </span>
          <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#1B3B2B]">
            {title}
          </h3>
          <p className="text-sm text-[#586962] leading-relaxed">
            {subtitle}
          </p>
        </div>

        {/* Success Banner */}
        {result?.success && (
          <div className="p-5 rounded-2xl bg-[#EBF2EE] border border-[#1B3B2B]/20 text-[#1B3B2B] flex items-start gap-3 animate-fade-in">
            <CheckCircle className="w-5 h-5 text-[#1B3B2B] shrink-0 mt-0.5" />
            <div className="text-sm">
              <p className="font-bold">Enquiry Submitted Successfully</p>
              <p className="mt-1 text-[#586962]">{result.message}</p>
            </div>
          </div>
        )}

        {/* General Error Banner */}
        {result && !result.success && (
          <div className="p-4 rounded-2xl bg-red-50 border border-red-200 text-red-800 flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
            <div className="text-sm">
              <p className="font-semibold">Submission Issue</p>
              <p className="mt-0.5">{result.message}</p>
            </div>
          </div>
        )}

        {/* Actual Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          
          {/* HONEYPOT SPAM FILTER FIELD - HIDDEN FROM GENUINE USERS */}
          <div className="hidden" aria-hidden="true">
            <label htmlFor="website_url">Website URL (leave blank)</label>
            <input type="text" id="website_url" name="website_url" tabIndex={-1} autoComplete="off" />
          </div>

          {/* Full Name */}
          <div>
            <label htmlFor="fullName" className="block text-xs font-semibold uppercase tracking-wider text-[#1B3B2B] mb-1.5">
              Full Name <span className="text-red-600">*</span>
            </label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              required
              placeholder="e.g. Anish Kumar"
              className="w-full px-4 py-3 rounded-xl bg-[#FDFBF7] border border-[#E6DFD3] text-[#2C3531] placeholder-[#586962]/50 text-sm focus:outline-none focus:ring-2 focus:ring-[#C5A059] focus:border-transparent transition-all"
            />
            {result?.errors?.fullName && (
              <p className="text-xs text-red-600 mt-1">{result.errors.fullName}</p>
            )}
          </div>

          {/* Phone Number */}
          <div>
            <label htmlFor="phone" className="block text-xs font-semibold uppercase tracking-wider text-[#1B3B2B] mb-1.5">
              Phone Number <span className="text-red-600">*</span>
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              required
              placeholder="+91 98765 43210"
              className="w-full px-4 py-3 rounded-xl bg-[#FDFBF7] border border-[#E6DFD3] text-[#2C3531] placeholder-[#586962]/50 text-sm focus:outline-none focus:ring-2 focus:ring-[#C5A059] focus:border-transparent transition-all"
            />
            {result?.errors?.phone && (
              <p className="text-xs text-red-600 mt-1">{result.errors.phone}</p>
            )}
          </div>

          {/* Email (Optional) */}
          <div>
            <label htmlFor="email" className="block text-xs font-semibold uppercase tracking-wider text-[#1B3B2B] mb-1.5">
              Email Address <span className="text-xs text-[#586962] font-normal">(Optional)</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="anish@example.com"
              className="w-full px-4 py-3 rounded-xl bg-[#FDFBF7] border border-[#E6DFD3] text-[#2C3531] placeholder-[#586962]/50 text-sm focus:outline-none focus:ring-2 focus:ring-[#C5A059] focus:border-transparent transition-all"
            />
            {result?.errors?.email && (
              <p className="text-xs text-red-600 mt-1">{result.errors.email}</p>
            )}
          </div>

          {/* Preferred Date (Optional) */}
          <div>
            <label htmlFor="preferredDate" className="block text-xs font-semibold uppercase tracking-wider text-[#1B3B2B] mb-1.5">
              Preferred Consultation Date <span className="text-xs text-[#586962] font-normal">(Optional)</span>
            </label>
            <input
              type="date"
              id="preferredDate"
              name="preferredDate"
              min={new Date().toISOString().split('T')[0]}
              className="w-full px-4 py-3 rounded-xl bg-[#FDFBF7] border border-[#E6DFD3] text-[#2C3531] text-sm focus:outline-none focus:ring-2 focus:ring-[#C5A059] focus:border-transparent transition-all"
            />
          </div>

          {/* Message / Primary Concern (Optional) */}
          <div>
            <label htmlFor="message" className="block text-xs font-semibold uppercase tracking-wider text-[#1B3B2B] mb-1.5">
              Health Concern / Message <span className="text-xs text-[#586962] font-normal">(Optional)</span>
            </label>
            <textarea
              id="message"
              name="message"
              rows={3}
              placeholder="Briefly describe your main health concern or questions..."
              className="w-full px-4 py-3 rounded-xl bg-[#FDFBF7] border border-[#E6DFD3] text-[#2C3531] placeholder-[#586962]/50 text-sm focus:outline-none focus:ring-2 focus:ring-[#C5A059] focus:border-transparent transition-all"
            />
            {result?.errors?.message && (
              <p className="text-xs text-red-600 mt-1">{result.errors.message}</p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isPending}
            className="w-full py-4 px-6 rounded-full bg-[#1B3B2B] hover:bg-[#12291E] text-white font-medium text-base shadow-md transition-all flex items-center justify-center gap-2 focus:ring-2 focus:ring-[#C5A059] disabled:opacity-60"
          >
            {isPending ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>Submitting Enquiry...</span>
              </>
            ) : (
              <>
                <Send className="w-4 h-4" />
                <span>Submit Enquiry</span>
              </>
            )}
          </button>

          <p className="text-[11px] text-[#586962] text-center pt-2 italic">
            Submitting this enquiry does not instantly guarantee an appointment slot. Our clinic receptionist will contact you to finalize appointment scheduling.
          </p>

        </form>

      </div>
    </div>
  );
}
