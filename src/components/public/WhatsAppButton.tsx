'use client';

import React from 'react';
import { MessageCircle } from 'lucide-react';
import { buildWhatsAppUrl } from '@/lib/whatsapp';

interface WhatsAppButtonProps {
  phone: string;
  defaultMessage?: string;
  label?: string;
  variant?: 'primary' | 'secondary' | 'floating' | 'outline' | 'text';
  className?: string;
  iconOnly?: boolean;
}

export default function WhatsAppButton({
  phone,
  defaultMessage = 'Hello, I would like to enquire about an acupuncture consultation at Mantra Acupuncture Clinic.',
  label = 'WhatsApp Us',
  variant = 'primary',
  className = '',
  iconOnly = false,
}: WhatsAppButtonProps) {
  const whatsappUrl = buildWhatsAppUrl(phone, defaultMessage);

  if (variant === 'floating') {
    return (
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with Mantra Acupuncture Clinic on WhatsApp"
        className={`fixed bottom-20 right-4 z-40 flex items-center justify-center w-12 h-12 md:w-14 md:h-14 bg-[#25D366] text-white rounded-full shadow-lg hover:bg-[#20bd5a] hover:scale-105 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#25D366] focus:ring-offset-2 ${className}`}
      >
        <MessageCircle className="w-6 h-6 fill-current" />
      </a>
    );
  }

  const baseStyles = 'inline-flex items-center justify-center font-medium rounded-full transition-all duration-200 focus:outline-none';

  let variantStyles = '';
  if (variant === 'primary') {
    variantStyles = 'bg-[#25D366] hover:bg-[#20bd5a] text-white px-5 py-2.5 shadow-sm text-sm md:text-base';
  } else if (variant === 'secondary') {
    variantStyles = 'bg-[#1B3B2B] hover:bg-[#12291E] text-white px-5 py-2.5 text-sm md:text-base';
  } else if (variant === 'outline') {
    variantStyles = 'border border-[#25D366] text-[#25D366] hover:bg-[#25D366] hover:text-white px-4 py-2 text-sm';
  } else if (variant === 'text') {
    variantStyles = 'text-[#25D366] hover:underline p-1 text-sm';
  }

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className={`${baseStyles} ${variantStyles} ${className}`}
    >
      <MessageCircle className="w-5 h-5 mr-2 fill-current shrink-0" />
      {!iconOnly && <span>{label}</span>}
    </a>
  );
}
