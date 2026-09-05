'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Phone, Menu, Clock, MapPin, MessageCircle } from 'lucide-react';
import MobileNav from './MobileNav';
import { buildWhatsAppUrl } from '@/lib/whatsapp';

interface HeaderProps {
  siteName?: string;
  tagline?: string;
  phone?: string;
  whatsappNumber?: string;
  defaultMessage?: string;
  address?: string;
  workingHours?: string;
  ctaLabel?: string;
}

export default function Header({
  siteName = 'Mantra Acupuncture Clinic',
  tagline = 'Heal • Balance • Thrive',
  phone = '+91 81296 27829',
  whatsappNumber = '+91 81296 27829',
  defaultMessage = 'Hello, I would like to enquire about an acupuncture consultation at Mantra Acupuncture Clinic.',
  address = "Marette Building 5, Opp St. Anne's Girls Higher Secondary School, Changanacherry, Kerala, 686101",
  workingHours = 'Mon – Sat: 9:00 AM – 7:00 PM',
  ctaLabel = 'Book a Consultation',
}: HeaderProps) {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const pathname = usePathname();

  const cleanPhone = phone.replace(/[^0-9+]/g, '');
  const whatsappUrl = buildWhatsAppUrl(whatsappNumber, defaultMessage);

  const navItems = [
    { label: 'Home', href: '/' },
    { label: 'About', href: '/about' },
    { label: 'Treatments', href: '/treatments' },
    { label: 'Conditions', href: '/conditions' },
    { label: 'Doctor', href: '/doctor' },
    { label: 'Gallery', href: '/gallery' },
    { label: 'Contact', href: '/contact' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#FDFBF7]/90 backdrop-blur-md border-b border-[#E6DFD3] transition-all">
      {/* Top micro-bar for quick contact */}
      <div className="bg-[#1B3B2B] text-[#EBF2EE] text-xs py-1.5 px-4 hidden md:block">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-[#C5A059]" />
              <span className="truncate max-w-md">Changanacherry, Kerala</span>
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-[#C5A059]" />
              <span>{workingHours}</span>
            </span>
          </div>

          <div className="flex items-center gap-4">
            <a
              href={`tel:${cleanPhone}`}
              className="flex items-center gap-1 hover:text-[#C5A059] transition-colors"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>{phone}</span>
            </a>
            <span className="text-[#C5A059]">•</span>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-[#25D366] hover:underline font-medium"
            >
              <MessageCircle className="w-3.5 h-3.5 fill-current" />
              <span>WhatsApp</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Header Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between">
        {/* Brand Logo */}
        <Link href="/" className="group flex flex-col focus:outline-none">
          <span className="font-serif text-xl sm:text-2xl font-bold tracking-tight text-[#1B3B2B] group-hover:text-[#2D5640] transition-colors">
            {siteName}
          </span>
          <span className="text-[10px] sm:text-xs tracking-widest uppercase font-medium text-[#C5A059]">
            {tagline}
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                  isActive
                    ? 'text-[#1B3B2B] bg-[#F4EFE6] font-semibold'
                    : 'text-[#2C3531] hover:text-[#1B3B2B] hover:bg-[#F8F4EC]'
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Action Button & Mobile Hamburger */}
        <div className="flex items-center gap-3">
          <Link
            href="/contact"
            className="hidden sm:inline-flex items-center justify-center px-5 py-2.5 rounded-full bg-[#1B3B2B] hover:bg-[#12291E] text-white text-sm font-medium shadow-sm transition-all focus:ring-2 focus:ring-[#C5A059]"
          >
            {ctaLabel}
          </Link>

          <button
            onClick={() => setMobileNavOpen(true)}
            className="md:hidden p-2 rounded-xl text-[#1B3B2B] hover:bg-[#F4EFE6] focus:outline-none focus:ring-2 focus:ring-[#C5A059]"
            aria-label="Open Mobile Menu"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <MobileNav
        isOpen={mobileNavOpen}
        onClose={() => setMobileNavOpen(false)}
        whatsappNumber={whatsappNumber}
        defaultMessage={defaultMessage}
        address={address}
        workingHours={workingHours}
      />
    </header>
  );
}
