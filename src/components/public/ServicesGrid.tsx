'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { ServiceItem } from '@/lib/types';

import ImageFallback from './ImageFallback';

interface ServicesGridProps {
  services: ServiceItem[];
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  limit?: number;
}

// Elegant gold line-art fallback illustrations
function ServiceLineArt({
  iconName,
  index,
}: {
  iconName?: string | null;
  index: number;
}) {
  if (iconName === 'Zap' || index === 1) {
    return (
      <svg
        viewBox="0 0 100 80"
        fill="none"
        className="w-20 h-16 text-[#C5A059]"
      >
        <path
          d="M42 12L42 55M58 12L58 55"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />

        <circle cx="42" cy="10" r="3" fill="currentColor" />
        <circle cx="58" cy="10" r="3" fill="currentColor" />

        <path
          d="M28 28C34 22 40 24 42 30"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeDasharray="2 2"
        />

        <path
          d="M42 38C46 34 54 34 58 38"
          stroke="currentColor"
          strokeWidth="1.5"
        />

        <path
          d="M42 46C46 42 54 42 58 46"
          stroke="currentColor"
          strokeWidth="1.5"
        />

        <path
          d="M58 30C60 24 66 22 72 28"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeDasharray="2 2"
        />

        <path
          d="M20 62C35 60 65 60 80 62"
          stroke="#E6DFD3"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
    );
  }

  if (iconName === 'Feather' || index === 2) {
    return (
      <svg
        viewBox="0 0 100 80"
        fill="none"
        className="w-20 h-16 text-[#C5A059]"
      >
        <ellipse
          cx="50"
          cy="20"
          rx="6"
          ry="3"
          stroke="currentColor"
          strokeWidth="1.5"
        />

        <path
          d="M44 20C44 28 32 35 32 54C32 60 38 64 50 64C62 64 68 60 68 54C68 35 56 28 56 20"
          stroke="currentColor"
          strokeWidth="2"
        />

        <ellipse
          cx="50"
          cy="54"
          rx="14"
          ry="4"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeDasharray="2 2"
        />

        <path
          d="M18 64C35 63 65 63 82 64"
          stroke="#E6DFD3"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
    );
  }

  // Acupuncture Treatment fallback illustration
  return (
    <svg
      viewBox="0 0 100 80"
      fill="none"
      className="w-20 h-16 text-[#C5A059]"
    >
      <path
        d="M32 66C35 55 42 48 45 42C48 36 48 30 46 22C44 14 50 8 58 10C64 12 66 18 65 24C64 28 66 31 70 34C73 36 71 40 67 42C64 43 65 46 66 48C67 52 64 55 60 55C56 55 52 62 50 66"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />

      <circle
        cx="56"
        cy="18"
        r="2.5"
        fill="currentColor"
      />

      <path
        d="M56 8L56 18"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />

      <circle
        cx="64"
        cy="30"
        r="2.5"
        fill="currentColor"
      />

      <path
        d="M72 26L64 30"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />

      <circle
        cx="61"
        cy="46"
        r="2.5"
        fill="currentColor"
      />

      <path
        d="M70 44L61 46"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

export default function ServicesGrid({
  services,
  eyebrow = 'OUR SERVICES',
  title = 'Thoughtful Treatment. Personalized Care.',
  subtitle = 'We offer a range of acupuncture-related therapies, tailored to your individual needs and health goals.',
  limit,
}: ServicesGridProps) {
  if (!services || services.length === 0) return null;

  const displayServices = limit
    ? services.slice(0, limit)
    : services.slice(0, 3);

  /*
   * =====================================================
   * LOCAL PNG SERVICE IMAGES
   * =====================================================
   *
   * Files:
   *
   * public/images/acupuncture.png
   * public/images/electro-acupuncture.png
   * public/images/cupping.png
   */
  const serviceImages = [
    '/images/acupuncture.png',
    '/images/electro-acupuncture.png',
    '/images/cupping.png',
  ];

  return (
    <section
      id="services"
      className="
        py-8
        sm:py-12
        lg:py-16
        bg-[#FAF2EB]
        border-b
        border-[#E6DFD3]
      "
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* =================================================
            SECTION HEADER
        ================================================= */}
        <div className="max-w-3xl mb-6 sm:mb-8 lg:mb-10 space-y-2.5">
          <span
            className="
              text-xs
              font-bold
              uppercase
              tracking-wider
              text-[#C5A059]
              block
            "
          >
            {eyebrow}
          </span>

          <h2
            className="
              font-serif
              text-2xl
              sm:text-4xl
              lg:text-5xl
              font-bold
              text-[#1B3B2B]
              tracking-tight
              leading-[1.12]
            "
          >
            {title}
          </h2>

          <p
            className="
              text-sm
              sm:text-base
              text-[#2C3531]
              leading-relaxed
              max-w-2xl
              pt-1
            "
          >
            {subtitle}
          </p>
        </div>

        {/* =================================================
            SERVICES GRID — 2 CARDS SIDE-BY-SIDE + 1 BELOW ON MOBILE
        ================================================= */}
        <div
          className="
            grid
            grid-cols-2
            md:grid-cols-3
            gap-3
            sm:gap-4
            lg:gap-5
          "
        >

          {displayServices.map((service, index) => {

            /*
             * Admin image takes priority.
             * If there is no admin image, use local PNG.
             */
            const cardImage =
              service.image_url || serviceImages[index];
            const isThird = index === 2;

            return (
              <div
                key={service.id}
                className={`
                  group
                  relative
                  overflow-hidden
                  bg-[#FAF2EB]
                  rounded-2xl
                  p-3
                  sm:p-5
                  border
                  border-[#E6DFD3]
                  shadow-sm
                  hover:shadow-md
                  hover:border-[#C5A059]
                  transition-all
                  duration-300
                  min-h-[160px]
                  sm:min-h-[175px]
                  flex
                  items-center
                  ${isThird ? 'col-span-2 md:col-span-1 max-w-sm sm:max-w-md md:max-w-none mx-auto w-full' : 'col-span-1'}
                `}
              >

                {/* =================================================
                    SUBTLE BACKGROUND IMAGE
                ================================================= */}
                {cardImage && (
                  <div
                    aria-hidden="true"
                    className="
                      absolute
                      inset-0
                      bg-cover
                      bg-center
                      bg-no-repeat
                      opacity-[0.05]
                      group-hover:opacity-[0.09]
                      group-hover:scale-105
                      transition-all
                      duration-500
                      pointer-events-none
                    "
                    style={{
                      backgroundImage: `url("${cardImage}")`,
                    }}
                  />
                )}

                {/* =================================================
                    CARD COLOR OVERLAY
                ================================================= */}
                <div
                  aria-hidden="true"
                  className="
                    absolute
                    inset-0
                    bg-[#FAF2EB]/80
                    pointer-events-none
                  "
                />

                {/* =================================================
                    IMAGE + CONTENT (STACKED ON MOBILE 2-COL, SIDE-BY-SIDE ON SM+)
                ================================================= */}
                <div
                  className="
                    relative
                    z-10
                    w-full
                    flex
                    flex-col
                    sm:flex-row
                    items-center
                    text-center
                    sm:text-left
                    gap-2.5
                    sm:gap-5
                  "
                >

                  {/* =================================================
                      IMAGE
                  ================================================= */}
                  <div
                    className="
                      shrink-0
                      w-[64px]
                      sm:w-[92px]
                      h-[72px]
                      sm:h-[125px]
                      flex
                      items-center
                      justify-center
                    "
                  >

                    {cardImage ? (
                      <ImageFallback
                        src={cardImage}
                        alt={
                          service.image_alt ||
                          service.title
                        }
                        width={180}
                        height={180}
                        aspectRatio="auto"
                        objectFit="contain"
                        className="
                          w-full
                          h-full
                          bg-transparent
                        "
                        imgClassName="
                          w-full
                          h-full
                          object-contain
                          transition-transform
                          duration-500
                          group-hover:scale-105
                        "
                      />
                    ) : (
                      <ServiceLineArt
                        iconName={service.icon_name}
                        index={index}
                      />
                    )}

                  </div>

                  {/* =================================================
                      RIGHT CONTENT
                  ================================================= */}
                  <div
                    className="
                      min-w-0
                      flex-1
                      flex
                      flex-col
                      justify-center
                    "
                  >

                    {/* TITLE */}
                    <h3
                      className="
                        font-serif
                        text-sm
                        sm:text-[17px]
                        lg:text-[18px]
                        font-bold
                        leading-snug
                        text-[#1B3B2B]
                        mb-1
                        sm:mb-2
                        group-hover:text-[#2D5640]
                        transition-colors
                      "
                    >
                      {service.title}
                    </h3>

                    {/* DESCRIPTION */}
                    <p
                      className="
                        text-[10px]
                        sm:text-xs
                        text-[#2C3531]
                        leading-tight
                        sm:leading-[1.5]
                        line-clamp-2
                        sm:line-clamp-3
                      "
                    >
                      {service.short_description}
                    </p>

                    {/* LEARN MORE */}
                    <Link
                      href={`/treatments/${service.slug}`}
                      className="
                        inline-flex
                        items-center
                        justify-center
                        sm:justify-start
                        gap-1
                        sm:gap-1.5
                        mt-2
                        sm:mt-3
                        w-full
                        sm:w-fit
                        text-[10px]
                        sm:text-xs
                        font-semibold
                        text-[#1B3B2B]
                        group-hover:text-[#C5A059]
                        transition-colors
                      "
                    >
                      <span>Learn More</span>

                      <ArrowRight
                        className="
                          w-3
                          h-3
                          sm:w-3.5
                          sm:h-3.5
                          group-hover:translate-x-1
                          transition-transform
                        "
                      />
                    </Link>

                  </div>

                </div>
              </div>
            );
          })}

        </div>
      </div>
    </section>
  );
}