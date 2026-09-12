'use client';

import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { X, Clock, MapPin } from 'lucide-react';
import WhatsAppButton from './WhatsAppButton';

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
  whatsappNumber: string;
  defaultMessage: string;
  address: string;
  workingHours: string;
}

export default function MobileNav({
  isOpen,
  onClose,
  whatsappNumber,
  defaultMessage,
  address,
  workingHours,
}: MobileNavProps) {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Lock body scroll when drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Close when pathname changes
  useEffect(() => {
    if (isOpen) {
      onClose();
    }
  }, [pathname]);

  if (!mounted || !isOpen) return null;

  const navLinks = [
    { label: 'Home', href: '/' },
    { label: 'About Clinic', href: '/about' },
    { label: 'Treatments', href: '/treatments' },
    { label: 'Conditions Supported', href: '/conditions' },
    { label: 'Practitioner', href: '/doctor' },
    { label: 'Gallery', href: '/gallery' },
    { label: 'Contact', href: '/contact' },
    { label: 'FAQ', href: '/faq' },
  ];

  return createPortal(
    <div className="fixed inset-0 z-[9999] flex justify-end md:hidden" role="dialog" aria-modal="true" aria-label="Mobile Navigation Menu">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#12291E]/60 backdrop-blur-xs transition-opacity duration-300"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer */}
      <div
        className="relative w-full max-w-xs sm:max-w-sm bg-[#FAF2EB] h-screen h-[100dvh] shadow-2xl flex flex-col justify-between overflow-y-auto p-6 z-10 transition-transform duration-300 animate-in slide-in-from-right"
        role="document"
      >
        <div>
          {/* Drawer Header */}
          <div className="flex items-center justify-between pb-6 border-b border-[#E6DFD3]">
            <Link href="/" onClick={onClose} className="flex items-center gap-2" aria-label="Mantra Acupuncture Clinic">
              <Image
                src="/mantra-logo1.png"
                alt="Mantra icon"
                width={40}
                height={40}
                className="h-9 w-auto object-contain shrink-0"
              />
              <Image
                src="/mantratext-logo1.png"
                alt="Mantra Acupuncture Clinic"
                width={130}
                height={40}
                className="h-7 w-auto object-contain"
              />
            </Link>
            <button
              onClick={onClose}
              className="p-2 rounded-full text-[#2C3531] hover:bg-[#EEE4D8] transition-colors focus:outline-none focus:ring-2 focus:ring-[#C5A059]"
              aria-label="Close Navigation Menu"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Nav Links */}
          <nav className="py-6 space-y-2">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={onClose}
                  className={`block px-4 py-3 rounded-xl text-base font-medium transition-colors ${
                    isActive
                      ? 'bg-[#1B3B2B] text-white'
                      : 'text-[#2C3531] hover:bg-[#EEE4D8] hover:text-[#1B3B2B]'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Footer info & CTAs */}
        <div className="pt-6 border-t border-[#E6DFD3] space-y-4 text-xs text-[#586962]">
          <div className="space-y-2">
            <div className="flex items-start gap-2">
              <MapPin className="w-4 h-4 text-[#C5A059] shrink-0 mt-0.5" />
              <span>{address}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-[#C5A059] shrink-0" />
              <span>{workingHours}</span>
            </div>
          </div>

          <div className="space-y-2 pt-2">
            <WhatsAppButton
              phone={whatsappNumber}
              defaultMessage={defaultMessage}
              label="WhatsApp Consultation"
              className="w-full justify-center"
            />
            <Link
              href="/contact"
              onClick={onClose}
              className="block text-center py-2.5 px-4 bg-[#1B3B2B] text-white rounded-full font-medium hover:bg-[#12291E] transition-colors text-sm"
            >
              Book Consultation
            </Link>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}
