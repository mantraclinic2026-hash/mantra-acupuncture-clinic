'use client';

import React from 'react';
import Image from 'next/image';
import { Flower2 } from 'lucide-react';
import { getOptimizedImageUrl } from '@/lib/cloudinary/url';

interface ImageFallbackProps {
  src?: string | null;
  alt: string;
  className?: string;
  imgClassName?: string;
  width?: number;
  height?: number;
  priority?: boolean;
  aspectRatio?: 'square' | 'video' | 'portrait' | 'auto';
  objectFit?: 'cover' | 'contain';
}

export default function ImageFallback({
  src,
  alt,
  className = '',
  imgClassName = '',
  width = 600,
  height = 400,
  priority = false,
  aspectRatio = 'auto',
  objectFit = 'cover',
}: ImageFallbackProps) {
  const [hasError, setHasError] = React.useState(false);

  React.useEffect(() => {
    setHasError(false);
  }, [src]);

  const optimizedSrc = src ? getOptimizedImageUrl(src, { width, height, crop: 'fill' }) : null;

  const aspectClass =
    aspectRatio === 'square'
      ? 'aspect-square'
      : aspectRatio === 'video'
      ? 'aspect-video'
      : aspectRatio === 'portrait'
      ? 'aspect-[3/4]'
      : '';

  if (!optimizedSrc || hasError) {
    return (
      <div
        className={`relative flex flex-col items-center justify-center bg-gradient-to-br from-[#EEE4D8] to-[#EAE3D5] text-[#1B3B2B]/60 p-6 rounded-2xl border border-[#E6DFD3] overflow-hidden ${aspectClass} ${className}`}
        role="img"
        aria-label={alt}
      >
        <div className="absolute -right-8 -bottom-8 w-32 h-32 bg-[#C5A059]/10 rounded-full blur-xl pointer-events-none" />
        <Flower2 className="w-10 h-10 mb-2 text-[#1B3B2B]/50 animate-pulse" />
        <span className="text-xs font-serif text-center italic tracking-wide text-[#1B3B2B]/80 max-w-[80%]">
          Mantra Acupuncture Sanctuary
        </span>
      </div>
    );
  }

  const isCloudinary = optimizedSrc.includes('res.cloudinary.com');

  return (
    <div className={`relative overflow-hidden rounded-2xl ${aspectClass} ${className}`}>
      <Image
        src={optimizedSrc}
        alt={alt}
        width={width}
        height={height}
        priority={priority}
        unoptimized={isCloudinary || optimizedSrc.startsWith('http') || optimizedSrc.startsWith('data:')}
        onError={() => setHasError(true)}
        className={`w-full h-full ${
          objectFit === 'contain' ? 'object-contain' : 'object-cover'
        } transition-transform duration-500 hover:scale-105 ${imgClassName}`}
      />
    </div>
  );
}
