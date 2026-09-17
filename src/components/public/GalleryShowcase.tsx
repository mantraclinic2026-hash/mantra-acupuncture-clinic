'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';
import {
  ChevronLeft,
  ChevronRight,
  Maximize2,
  X,
  Play,
  Pause,
  Sparkles,
  LayoutGrid,
  SlidersHorizontal,
  Flower2,
} from 'lucide-react';
import { GalleryItem } from '@/lib/types';
import { getCloudinaryUrl } from '@/lib/cloudinary/url';

interface GalleryShowcaseProps {
  items: GalleryItem[];
  title?: string;
  subtitle?: string;
  badgeText?: string;
  showViewToggle?: boolean;
  showGridBelow?: boolean;
  initialMode?: 'slider' | 'grid';
  className?: string;
}

export default function GalleryShowcase({
  items,
  title = 'Clinic Gallery',
  subtitle = 'Experience the peaceful, hygienic, and restorative environment at Mantra Acupuncture Clinic.',
  badgeText = 'Healing Sanctuary',
  showViewToggle = true,
  showGridBelow = false,
  initialMode = 'slider',
  className = '',
}: GalleryShowcaseProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [viewMode, setViewMode] = useState<'slider' | 'grid'>(initialMode);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const [touchDeltaX, setTouchDeltaX] = useState<number>(0);
  const [isHovered, setIsHovered] = useState<boolean>(false);

  // Extract unique categories
  const categories = React.useMemo(() => {
    const set = new Set<string>();
    items.forEach((item) => {
      if (item.category && item.category.trim()) {
        set.add(item.category.trim());
      }
    });
    return ['All', ...Array.from(set)];
  }, [items]);

  // Filter items by category
  const filteredItems = React.useMemo(() => {
    if (selectedCategory === 'All') return items;
    return items.filter((item) => item.category?.trim().toLowerCase() === selectedCategory.toLowerCase());
  }, [items, selectedCategory]);

  // Ensure currentIndex stays within bounds when filter changes
  useEffect(() => {
    setCurrentIndex(0);
  }, [selectedCategory]);

  const total = filteredItems.length;

  // Next and Prev handlers
  const handleNext = useCallback(() => {
    if (total === 0) return;
    setCurrentIndex((prev) => (prev + 1) % total);
  }, [total]);

  const handlePrev = useCallback(() => {
    if (total === 0) return;
    setCurrentIndex((prev) => (prev - 1 + total) % total);
  }, [total]);

  // Autoplay timer
  useEffect(() => {
    if (!isPlaying || isHovered || total <= 1 || viewMode !== 'slider') return;

    const timer = setInterval(() => {
      handleNext();
    }, 4500);

    return () => clearInterval(timer);
  }, [isPlaying, isHovered, total, viewMode, handleNext]);

  // Keyboard navigation for Lightbox
  useEffect(() => {
    if (lightboxIndex === null) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setLightboxIndex(null);
      } else if (e.key === 'ArrowRight') {
        setLightboxIndex((prev) => (prev !== null ? (prev + 1) % filteredItems.length : 0));
      } else if (e.key === 'ArrowLeft') {
        setLightboxIndex((prev) =>
          prev !== null ? (prev - 1 + filteredItems.length) % filteredItems.length : 0
        );
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxIndex, filteredItems.length]);

  // Touch handlers for swiping
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
    setTouchDeltaX(0);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (touchStartX === null) return;
    setTouchDeltaX(e.touches[0].clientX - touchStartX);
  };

  const handleTouchEnd = () => {
    if (touchStartX === null) return;
    const swipeThreshold = 50;
    if (touchDeltaX > swipeThreshold) {
      handlePrev();
    } else if (touchDeltaX < -swipeThreshold) {
      handleNext();
    }
    setTouchStartX(null);
    setTouchDeltaX(0);
  };

  // Mouse drag handlers for desktop swipe feel
  const [mouseDownX, setMouseDownX] = useState<number | null>(null);
  const handleMouseDown = (e: React.MouseEvent) => {
    setMouseDownX(e.clientX);
  };
  const handleMouseUp = (e: React.MouseEvent) => {
    if (mouseDownX === null) return;
    const diff = e.clientX - mouseDownX;
    if (diff > 50) {
      handlePrev();
    } else if (diff < -50) {
      handleNext();
    }
    setMouseDownX(null);
  };

  if (items.length === 0) {
    return (
      <div className="bg-[#F8F5EE] border border-[#E6DFD3] rounded-3xl p-12 text-center max-w-xl mx-auto space-y-4 shadow-sm">
        <Flower2 className="w-12 h-12 text-[#C5A059] mx-auto opacity-70 animate-pulse" />
        <h3 className="font-serif text-xl font-bold text-[#1B3B2B]">Sanctuary Gallery</h3>
        <p className="text-sm text-[#586962] leading-relaxed">
          Photos of our clinic environment and treatment rooms are currently being updated.
        </p>
      </div>
    );
  }

  const currentItem = filteredItems[currentIndex] || filteredItems[0];

  return (
    <div className={`space-y-8 ${className}`}>
      {/* Header & Controls Bar */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div className="space-y-2 max-w-2xl">
          {badgeText && (
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EEE4D8] border border-[#E6DFD3] text-[#1B3B2B] text-xs font-semibold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-[#C5A059]" />
              <span>{badgeText}</span>
            </div>
          )}
          {title && (
            <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-[#1B3B2B]">
              {title}
            </h2>
          )}
          {subtitle && (
            <p className="text-sm sm:text-base text-[#586962] leading-relaxed">
              {subtitle}
            </p>
          )}
        </div>

        {/* View Mode Toggle & Autoplay */}
        <div className="flex items-center gap-2 self-start md:self-end">
          {showViewToggle && (
            <div className="flex items-center bg-[#EEE4D8] p-1 rounded-full border border-[#E6DFD3]">
              <button
                onClick={() => setViewMode('slider')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
                  viewMode === 'slider'
                    ? 'bg-[#1B3B2B] text-white shadow-sm'
                    : 'text-[#586962] hover:text-[#1B3B2B]'
                }`}
                title="Slider View"
              >
                <SlidersHorizontal className="w-3.5 h-3.5" />
                <span>Slider</span>
              </button>
              <button
                onClick={() => setViewMode('grid')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
                  viewMode === 'grid'
                    ? 'bg-[#1B3B2B] text-white shadow-sm'
                    : 'text-[#586962] hover:text-[#1B3B2B]'
                }`}
                title="Grid View"
              >
                <LayoutGrid className="w-3.5 h-3.5" />
                <span>Grid</span>
              </button>
            </div>
          )}

          {viewMode === 'slider' && (
            <button
              onClick={() => setIsPlaying((prev) => !prev)}
              className="p-2 rounded-full bg-[#EEE4D8] border border-[#E6DFD3] text-[#1B3B2B] hover:text-[#C5A059] hover:bg-[#FAF2EB] transition-colors shadow-sm"
              title={isPlaying ? 'Pause Autoplay' : 'Resume Autoplay'}
              aria-label={isPlaying ? 'Pause Autoplay' : 'Resume Autoplay'}
            >
              {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            </button>
          )}
        </div>
      </div>

      {/* Category Pills */}
      {categories.length > 2 && (
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                selectedCategory.toLowerCase() === cat.toLowerCase()
                  ? 'bg-[#1B3B2B] text-white shadow-sm'
                  : 'bg-[#EEE4D8] text-[#586962] hover:bg-[#E6DFD3] hover:text-[#1B3B2B]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      )}

      {/* SLIDER VIEW MODE */}
      {viewMode === 'slider' && (
        <div className="space-y-4">
          {/* Main Swiping Container */}
          <div
            className="relative rounded-3xl overflow-hidden bg-[#1B3B2B] aspect-[16/10] sm:aspect-[16/9] lg:aspect-[21/10] shadow-xl select-none group cursor-grab active:cursor-grabbing border border-[#E6DFD3]"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => {
              setIsHovered(false);
              setMouseDownX(null);
            }}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
          >
            {/* Slides Track */}
            <div
              className="flex h-full transition-transform duration-500 ease-out"
              style={{
                transform: `translateX(-${currentIndex * 100}%)`,
              }}
            >
              {filteredItems.map((item, idx) => {
                const displayUrl =
                  getCloudinaryUrl(item.image_url, {
                    width: 1400,
                    height: 800,
                    crop: 'fill',
                  }) || item.image_url;

                return (
                  <div
                    key={item.id}
                    className="min-w-full h-full relative overflow-hidden flex-shrink-0"
                  >
                    <Image
                      src={displayUrl}
                      alt={item.image_alt || item.title || 'Mantra Clinic Environment'}
                      fill
                      priority={idx === 0}
                      unoptimized={true}
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 1024px) 100vw, 1200px"
                    />

                    {/* Gradient Overlay Scrim for Text Readability */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent pointer-events-none" />

                    {/* Content Caption Overlay */}
                    <div className="absolute bottom-0 inset-x-0 p-6 sm:p-8 md:p-10 text-white flex flex-col justify-end">
                      <div className="max-w-2xl space-y-2">
                        {item.category && (
                          <span className="inline-block px-3 py-1 rounded-full bg-[#C5A059] text-white text-[10px] sm:text-xs font-bold uppercase tracking-wider shadow-sm">
                            {item.category}
                          </span>
                        )}
                        <h3 className="font-serif text-xl sm:text-2xl md:text-3xl font-bold leading-tight drop-shadow-md">
                          {item.title}
                        </h3>
                        {item.image_alt && (
                          <p className="text-xs sm:text-sm text-[#FAF2EB]/90 line-clamp-2 leading-relaxed drop-shadow">
                            {item.image_alt}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Enlarge / Lightbox Button */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setLightboxIndex(idx);
                      }}
                      className="absolute top-4 right-4 p-2.5 rounded-full bg-black/40 backdrop-blur-md text-white hover:bg-[#C5A059] transition-all duration-300 shadow-md group-hover:scale-105"
                      title="View Fullscreen"
                      aria-label="View Fullscreen"
                    >
                      <Maximize2 className="w-4 h-4 sm:w-5 sm:h-5" />
                    </button>
                  </div>
                );
              })}
            </div>

            {/* Navigation Arrows */}
            {total > 1 && (
              <>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handlePrev();
                  }}
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/80 backdrop-blur-md text-[#1B3B2B] hover:bg-white hover:text-[#C5A059] transition-all duration-300 flex items-center justify-center shadow-lg hover:scale-110 active:scale-95"
                  aria-label="Previous Slide"
                >
                  <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleNext();
                  }}
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/80 backdrop-blur-md text-[#1B3B2B] hover:bg-white hover:text-[#C5A059] transition-all duration-300 flex items-center justify-center shadow-lg hover:scale-110 active:scale-95"
                  aria-label="Next Slide"
                >
                  <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
                </button>
              </>
            )}

            {/* Slide Index Pill */}
            {total > 1 && (
              <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-black/50 backdrop-blur-md text-white text-xs font-mono tracking-wider font-semibold border border-white/10">
                {String(currentIndex + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
              </div>
            )}
          </div>

          {/* Slider Bottom Bar: Dots & Thumbnails */}
          {total > 1 && (
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
              {/* Pagination Dots */}
              <div className="flex items-center gap-1.5">
                {filteredItems.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentIndex(idx)}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      currentIndex === idx
                        ? 'w-8 bg-[#1B3B2B]'
                        : 'w-2 bg-[#D1C7BA] hover:bg-[#A89E90]'
                    }`}
                    aria-label={`Go to slide ${idx + 1}`}
                  />
                ))}
              </div>

              {/* Thumbnails Strip */}
              <div className="flex items-center gap-2 overflow-x-auto max-w-full sm:max-w-md py-1 scrollbar-none">
                {filteredItems.map((item, idx) => {
                  const thumbUrl =
                    getCloudinaryUrl(item.image_url, {
                      width: 120,
                      height: 80,
                      crop: 'fill',
                    }) || item.image_url;

                  return (
                    <button
                      key={item.id}
                      onClick={() => setCurrentIndex(idx)}
                      className={`relative flex-shrink-0 w-16 h-11 sm:w-20 sm:h-14 rounded-xl overflow-hidden border-2 transition-all duration-200 ${
                        currentIndex === idx
                          ? 'border-[#C5A059] ring-2 ring-[#C5A059]/40 scale-105 shadow-md'
                          : 'border-transparent opacity-60 hover:opacity-100'
                      }`}
                      aria-label={`Select photo ${idx + 1}`}
                    >
                      <Image
                        src={thumbUrl}
                        alt={item.title || 'Thumbnail'}
                        fill
                        unoptimized={true}
                        className="object-cover"
                      />
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      )}

      {/* GRID VIEW MODE OR OPTIONAL GRID BELOW */}
      {(viewMode === 'grid' || showGridBelow) && (
        <div className="space-y-4">
          {showGridBelow && (
            <h3 className="font-serif text-xl font-bold text-[#1B3B2B] pt-4">
              All Clinic Photos ({filteredItems.length})
            </h3>
          )}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map((item, idx) => {
              const gridUrl =
                getCloudinaryUrl(item.image_url, {
                  width: 800,
                  height: 600,
                  crop: 'fill',
                }) || item.image_url;

              return (
                <div
                  key={item.id}
                  onClick={() => setLightboxIndex(idx)}
                  className="group relative bg-[#EEE4D8] rounded-2xl overflow-hidden border border-[#E6DFD3] shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer flex flex-col"
                >
                  <div className="relative aspect-[4/3] overflow-hidden bg-[#FAF2EB]">
                    <Image
                      src={gridUrl}
                      alt={item.image_alt || item.title || 'Mantra Clinic Photo'}
                      fill
                      unoptimized={true}
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                      <span className="p-2.5 rounded-full bg-white/90 text-[#1B3B2B] opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300 shadow-md">
                        <Maximize2 className="w-4 h-4" />
                      </span>
                    </div>
                  </div>

                  <div className="p-4 flex-1 flex flex-col justify-between space-y-2">
                    <div>
                      {item.category && (
                        <span className="text-[10px] font-bold tracking-wider uppercase text-[#C5A059] block mb-1">
                          {item.category}
                        </span>
                      )}
                      <h4 className="font-serif text-base font-bold text-[#1B3B2B] leading-tight group-hover:text-[#C5A059] transition-colors">
                        {item.title}
                      </h4>
                    </div>
                    {item.image_alt && (
                      <p className="text-xs text-[#586962] line-clamp-2 leading-relaxed">
                        {item.image_alt}
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* FULLSCREEN LIGHTBOX MODAL */}
      {lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex flex-col items-center justify-between p-4 sm:p-6 animate-in fade-in duration-200"
          onClick={() => setLightboxIndex(null)}
        >
          {/* Top Bar */}
          <div
            className="w-full flex items-center justify-between text-white max-w-7xl z-10"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="space-y-0.5">
              <span className="text-xs font-mono text-[#C5A059] uppercase tracking-wider font-semibold">
                {String(lightboxIndex + 1).padStart(2, '0')} of {String(filteredItems.length).padStart(2, '0')}
              </span>
              <h4 className="font-serif text-base sm:text-lg font-bold text-white">
                {filteredItems[lightboxIndex]?.title}
              </h4>
            </div>

            <button
              onClick={() => setLightboxIndex(null)}
              className="p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
              aria-label="Close Lightbox"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Central Image with Arrows */}
          <div
            className="relative w-full max-w-5xl flex-1 flex items-center justify-center my-4 overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {filteredItems.length > 1 && (
              <button
                onClick={() =>
                  setLightboxIndex(
                    (prev) => (prev !== null ? (prev - 1 + filteredItems.length) % filteredItems.length : 0)
                  )
                }
                className="absolute left-2 sm:left-4 z-10 p-3 rounded-full bg-black/50 hover:bg-[#C5A059] text-white transition-colors backdrop-blur-md shadow-lg"
                aria-label="Previous Image"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
            )}

            <div className="relative w-full h-full max-h-[75vh]">
              {filteredItems[lightboxIndex]?.image_url && (
                <Image
                  src={filteredItems[lightboxIndex].image_url}
                  alt={filteredItems[lightboxIndex]?.image_alt || filteredItems[lightboxIndex]?.title || 'Clinic Photo'}
                  fill
                  unoptimized={true}
                  className="object-contain"
                  sizes="100vw"
                />
              )}
            </div>

            {filteredItems.length > 1 && (
              <button
                onClick={() =>
                  setLightboxIndex(
                    (prev) => (prev !== null ? (prev + 1) % filteredItems.length : 0)
                  )
                }
                className="absolute right-2 sm:right-4 z-10 p-3 rounded-full bg-black/50 hover:bg-[#C5A059] text-white transition-colors backdrop-blur-md shadow-lg"
                aria-label="Next Image"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            )}
          </div>

          {/* Bottom Caption Bar */}
          <div
            className="w-full max-w-2xl text-center text-white/80 text-xs sm:text-sm px-4 py-2 z-10"
            onClick={(e) => e.stopPropagation()}
          >
            {filteredItems[lightboxIndex]?.image_alt && (
              <p className="leading-relaxed">{filteredItems[lightboxIndex]?.image_alt}</p>
            )}
            <p className="text-[11px] text-white/40 mt-1">
              Press left / right arrow keys to navigate, Esc to close
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
