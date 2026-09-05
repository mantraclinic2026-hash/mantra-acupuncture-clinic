'use client';

import React from 'react';
import { Phone, MessageCircle, Calendar } from 'lucide-react';
import { buildWhatsAppUrl } from '@/lib/whatsapp';

interface MobileStickyActionsProps {
  phone: string;
  whatsappNumber: string;
  defaultMessage: string;
  whatsappEnabled?: boolean;
  callEnabled?: boolean;
}

export default function MobileStickyActions({
  phone,
  whatsappNumber,
  defaultMessage,
  whatsappEnabled = true,
  callEnabled = true,
}: MobileStickyActionsProps) {
  const whatsappUrl = buildWhatsAppUrl(whatsappNumber, defaultMessage);
  const cleanPhone = phone.replace(/[^0-9+]/g, '');

  if (!whatsappEnabled && !callEnabled) return null;

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#FDFBF7]/95 backdrop-blur-md border-t border-[#E6DFD3] p-3 shadow-lg">
      <div className="grid grid-cols-3 gap-2 max-w-md mx-auto">
        {callEnabled && (
          <a
            href={`tel:${cleanPhone}`}
            className="flex flex-col items-center justify-center py-2 px-1 bg-[#1B3B2B] text-white rounded-xl text-xs font-medium transition-active active:scale-95"
            aria-label="Call Mantra Acupuncture Clinic"
          >
            <Phone className="w-4 h-4 mb-1" />
            <span>Call Clinic</span>
          </a>
        )}

        {whatsappEnabled && (
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center justify-center py-2 px-1 bg-[#25D366] text-white rounded-xl text-xs font-medium transition-active active:scale-95"
            aria-label="WhatsApp Mantra Acupuncture Clinic"
          >
            <MessageCircle className="w-4 h-4 mb-1 fill-current" />
            <span>WhatsApp</span>
          </a>
        )}

        <a
          href="/contact"
          className="flex flex-col items-center justify-center py-2 px-1 bg-[#C5A059] text-white rounded-xl text-xs font-medium transition-active active:scale-95"
          aria-label="Book Consultation"
        >
          <Calendar className="w-4 h-4 mb-1" />
          <span>Book Visit</span>
        </a>
      </div>
    </div>
  );
}
