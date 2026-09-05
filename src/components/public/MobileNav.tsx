'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
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

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

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

  return (
    <div className="fixed inset-0 z-50 flex justify-end md:hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#12291E]/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer */}
      <div
        className="relative w-full max-w-xs bg-[#FDFBF7] h-full shadow-2xl flex flex-col justify-between overflow-y-auto p-6 transition-transform transform translate-x-0"
        role="dialog"
        aria-modal="true"
        aria-label="Mobile Navigation Menu"
      >
        <div>
          {/* Drawer Header */}
          <div className="flex items-center justify-between pb-6 border-b border-[#E6DFD3]">
            <div>
              <span className="font-serif text-lg font-bold text-[#1B3B2B] block">
                Mantra
              </span>
              <span className="text-xs uppercase tracking-widest text-[#C5A059] block font-medium">
                Acupuncture Clinic
              </span>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-full text-[#2C3531] hover:bg-[#F4EFE6] transition-colors focus:outline-none focus:ring-2 focus:ring-[#C5A059]"
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
                      : 'text-[#2C3531] hover:bg-[#F4EFE6] hover:text-[#1B3B2B]'
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
    </div>
  );
}
