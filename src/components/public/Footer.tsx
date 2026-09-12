'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { MapPin, Phone, Clock, MessageCircle, Lock, ChevronDown } from 'lucide-react';
import { buildWhatsAppUrl } from '@/lib/whatsapp';

interface FooterProps {
  siteName?: string;
  tagline?: string;
  phone?: string;
  whatsappNumber?: string;
  defaultMessage?: string;
  address?: string;
  workingHours?: string;
  instagramUrl?: string | null;
  disclaimerText?: string;
}

export default function Footer({
  siteName = 'Mantra Acupuncture Clinic',
  tagline = 'Heal • Balance • Thrive',
  phone = '+91 81296 27829',
  whatsappNumber = '+91 81296 27829',
  defaultMessage = 'Hello, I would like to enquire about an acupuncture consultation at Mantra Acupuncture Clinic.',
  address = "Marette Building 5, Opp St. Anne's Girls Higher Secondary School, Changanacherry, Kerala, 686101",
  workingHours = 'Monday – Saturday: 9:00 AM – 7:00 PM | Sunday: Holiday / Closed',
  instagramUrl = 'https://www.instagram.com/mantraacupunctureclinic/',
  disclaimerText = 'The content provided on this website is for educational and general wellness support purposes only and does not constitute medical advice or diagnosis. Individual treatment recommendations are made following personal clinical evaluation.',
}: FooterProps) {
  const cleanPhone = phone.replace(/[^0-9+]/g, '');
  const whatsappUrl = buildWhatsAppUrl(whatsappNumber, defaultMessage);

  // Mobile accordion state for small footer
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    navigation: false,
    details: false,
  });

  const toggleSection = (section: string) => {
    setOpenSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  return (
    <footer className="bg-[#12291E] text-[#EBF2EE] pt-8 md:pt-12 pb-24 md:pb-12 border-t border-[#C5A059]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 lg:gap-12 pb-8 md:pb-10 border-b border-[#EBF2EE]/10">
          
          {/* Brand Column */}
          <div className="md:col-span-5 space-y-3.5 pb-2 md:pb-0 border-b border-[#EBF2EE]/10 md:border-b-0">
            <Link href="/" className="inline-flex items-center gap-1" aria-label={siteName}>
              <Image
                src="/mantra-logo1.png"
                alt="Mantra icon"
                width={40}
                height={40}
                style={{ width: 'auto' }}
                className="h-8 sm:h-9 w-auto object-contain brightness-0 invert opacity-85 shrink-0"
              />
              <Image
                src="/mantratext-logo1.png"
                alt={siteName}
                width={160}
                height={40}
                style={{ width: 'auto' }}
                className="h-8 sm:h-9 w-auto object-contain brightness-0 invert opacity-85"
              />
            </Link>

            <p className="text-xs sm:text-sm text-[#EBF2EE]/80 leading-relaxed max-w-sm">
              Providing personalized, patient-focused acupuncture care in a calm, welcoming sanctuary in Changanacherry, Kerala.
            </p>

            {instagramUrl && (
              <div className="pt-1 pb-1">
                <a
                  href={instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Follow Mantra Acupuncture Clinic on Instagram"
                  className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1B3B2B] text-[#C5A059] hover:text-white hover:bg-[#C5A059]/20 transition-all text-xs font-medium border border-[#C5A059]/30"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                  <span>@mantraacupunctureclinic</span>
                </a>
              </div>
            )}
          </div>

          {/* Quick Links / Navigation (Dropdown on mobile) */}
          <div className="md:col-span-3 pb-3 md:pb-0 border-b border-[#EBF2EE]/10 md:border-b-0">
            <button
              type="button"
              onClick={() => toggleSection('navigation')}
              className="w-full flex items-center justify-between py-1.5 md:py-0 text-left md:pointer-events-none group"
              aria-expanded={openSections.navigation}
            >
              <span className="text-xs font-bold uppercase tracking-wider text-[#C5A059] group-hover:text-[#e0b86c] transition-colors">
                Navigation
              </span>
              <ChevronDown
                className={`w-4 h-4 text-[#C5A059] transition-transform duration-300 md:hidden ${
                  openSections.navigation ? 'rotate-180' : 'rotate-0'
                }`}
              />
            </button>

            <div
              className={`space-y-2 pt-3 md:pt-3 text-xs sm:text-sm text-[#EBF2EE]/80 ${
                openSections.navigation ? 'block animate-in fade-in-50 duration-200' : 'hidden'
              } md:block`}
            >
              <ul className="space-y-2.5">
                <li>
                  <Link href="/" className="hover:text-[#C5A059] transition-colors inline-block py-0.5">Home</Link>
                </li>
                <li>
                  <Link href="/about" className="hover:text-[#C5A059] transition-colors inline-block py-0.5">About Clinic</Link>
                </li>
                <li>
                  <Link href="/treatments" className="hover:text-[#C5A059] transition-colors inline-block py-0.5">Therapeutic Treatments</Link>
                </li>
                <li>
                  <Link href="/conditions" className="hover:text-[#C5A059] transition-colors inline-block py-0.5">Supported Conditions</Link>
                </li>
                <li>
                  <Link href="/doctor" className="hover:text-[#C5A059] transition-colors inline-block py-0.5">Dr. Nikku Thomas</Link>
                </li>
                <li>
                  <Link href="/gallery" className="hover:text-[#C5A059] transition-colors inline-block py-0.5">Clinic Gallery</Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-[#C5A059] transition-colors inline-block py-0.5">Contact & Directions</Link>
                </li>
                <li>
                  <Link href="/faq" className="hover:text-[#C5A059] transition-colors inline-block py-0.5">Frequently Asked Questions</Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Contact & Hours / Clinic Details (Dropdown on mobile) */}
          <div className="md:col-span-4 pb-1 md:pb-0">
            <button
              type="button"
              onClick={() => toggleSection('details')}
              className="w-full flex items-center justify-between py-1.5 md:py-0 text-left md:pointer-events-none group"
              aria-expanded={openSections.details}
            >
              <span className="text-xs font-bold uppercase tracking-wider text-[#C5A059] group-hover:text-[#e0b86c] transition-colors">
                Clinic Details
              </span>
              <ChevronDown
                className={`w-4 h-4 text-[#C5A059] transition-transform duration-300 md:hidden ${
                  openSections.details ? 'rotate-180' : 'rotate-0'
                }`}
              />
            </button>

            <div
              className={`space-y-3 pt-3 md:pt-3 text-xs sm:text-sm text-[#EBF2EE]/80 ${
                openSections.details ? 'block animate-in fade-in-50 duration-200' : 'hidden'
              } md:block`}
            >
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#C5A059] shrink-0 mt-0.5" />
                <span className="leading-snug">{address}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#C5A059] shrink-0" />
                <a href={`tel:${cleanPhone}`} className="hover:text-[#C5A059] transition-colors">{phone}</a>
              </div>
              <div className="flex items-center gap-2.5">
                <MessageCircle className="w-4 h-4 text-[#25D366] shrink-0" />
                <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="hover:underline text-[#25D366] font-medium">
                  WhatsApp Direct Chat
                </a>
              </div>
              <div className="flex items-start gap-2.5 pt-1">
                <Clock className="w-4 h-4 text-[#C5A059] shrink-0 mt-0.5" />
                <span className="leading-snug">{workingHours}</span>
              </div>
            </div>
          </div>

        </div>

        {/* Disclaimer Line */}
        <div className="pt-6 text-[11px] text-[#EBF2EE]/60 leading-relaxed italic text-center max-w-4xl mx-auto">
          {disclaimerText}
        </div>

        {/* Copyright & Admin Link */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#EBF2EE]/50">
          <p suppressHydrationWarning>© {new Date().getFullYear()} {siteName}. All rights reserved.</p>
          <Link href="/admin/login" className="flex items-center gap-1 hover:text-[#C5A059] transition-colors">
            <Lock className="w-3 h-3" />
            <span>Admin Portal</span>
          </Link>
        </div>

      </div>
    </footer>
  );
}
