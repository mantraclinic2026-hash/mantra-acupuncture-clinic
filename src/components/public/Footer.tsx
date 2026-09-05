'use client';

import React from 'react';
import Link from 'next/link';
import { MapPin, Phone, Clock, MessageCircle, Lock } from 'lucide-react';
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

  return (
    <footer className="bg-[#12291E] text-[#EBF2EE] pt-12 pb-24 md:pb-12 border-t border-[#C5A059]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 pb-10 border-b border-[#EBF2EE]/10">
          
          {/* Brand Column */}
          <div className="md:col-span-5 space-y-4">
            <Link href="/" className="inline-block">
              <span className="font-serif text-2xl font-bold tracking-tight text-white block">
                {siteName}
              </span>
              <span className="text-xs uppercase tracking-widest text-[#C5A059] font-medium block">
                {tagline}
              </span>
            </Link>

            <p className="text-xs sm:text-sm text-[#EBF2EE]/80 leading-relaxed max-w-sm">
              Providing personalized, patient-focused acupuncture care in a calm, welcoming sanctuary in Changanacherry, Kerala.
            </p>

            {instagramUrl && (
              <div className="pt-2">
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

          {/* Quick Links */}
          <div className="md:col-span-3 space-y-3">
            <p className="text-xs font-bold uppercase tracking-wider text-[#C5A059]">
              Navigation
            </p>
            <ul className="space-y-2 text-xs sm:text-sm text-[#EBF2EE]/80">
              <li>
                <Link href="/" className="hover:text-[#C5A059] transition-colors">Home</Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-[#C5A059] transition-colors">About Clinic</Link>
              </li>
              <li>
                <Link href="/treatments" className="hover:text-[#C5A059] transition-colors">Therapeutic Treatments</Link>
              </li>
              <li>
                <Link href="/conditions" className="hover:text-[#C5A059] transition-colors">Supported Conditions</Link>
              </li>
              <li>
                <Link href="/doctor" className="hover:text-[#C5A059] transition-colors">Dr. Nikku Thomas</Link>
              </li>
              <li>
                <Link href="/gallery" className="hover:text-[#C5A059] transition-colors">Clinic Gallery</Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-[#C5A059] transition-colors">Contact & Directions</Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-[#C5A059] transition-colors">Frequently Asked Questions</Link>
              </li>
            </ul>
          </div>

          {/* Contact & Hours */}
          <div className="md:col-span-4 space-y-3">
            <p className="text-xs font-bold uppercase tracking-wider text-[#C5A059]">
              Clinic Details
            </p>
            <div className="space-y-3 text-xs sm:text-sm text-[#EBF2EE]/80">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#C5A059] shrink-0 mt-0.5" />
                <span>{address}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#C5A059] shrink-0" />
                <a href={`tel:${cleanPhone}`} className="hover:text-[#C5A059] transition-colors">{phone}</a>
              </div>
              <div className="flex items-center gap-2.5">
                <MessageCircle className="w-4 h-4 text-[#25D366] shrink-0" />
                <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="hover:underline text-[#25D366]">
                  WhatsApp Direct Chat
                </a>
              </div>
              <div className="flex items-start gap-2.5 pt-1">
                <Clock className="w-4 h-4 text-[#C5A059] shrink-0 mt-0.5" />
                <span>{workingHours}</span>
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
          <p>© {new Date().getFullYear()} {siteName}. All rights reserved.</p>
          <Link href="/admin/login" className="flex items-center gap-1 hover:text-[#C5A059] transition-colors">
            <Lock className="w-3 h-3" />
            <span>Admin Portal</span>
          </Link>
        </div>

      </div>
    </footer>
  );
}
