import { Metadata } from 'next';
import { getSEOMetadata, getSiteSettings } from '@/lib/queries/site';

export const DEFAULT_SITE_URL = 'https://mantraacupunctureclinic.com';

/**
 * Returns the sanitized base URL for the site.
 * Configurable via NEXT_PUBLIC_SITE_URL, with fallback to https://mantraacupunctureclinic.com.
 * Explicitly guards against using the incorrect domain mantraacupuncture.com.
 */
export function getBaseUrl(): string {
  const envUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (!envUrl) {
    return DEFAULT_SITE_URL;
  }
  // Disallow the erroneous non-clinic domain anywhere in production or local
  if (/^https?:\/\/(www\.)?mantraacupuncture\.com(\/.*)?$/i.test(envUrl)) {
    return DEFAULT_SITE_URL;
  }
  return envUrl.replace(/\/+$/, '');
}

/**
 * Builds a clean canonical URL without duplicate slugs or trailing slashes.
 */
export function buildCanonicalUrl(route: string, slug?: string, dbCanonical?: string | null): string {
  const baseUrl = getBaseUrl();

  if (dbCanonical) {
    // If DB has an old canonical URL pointing to the wrong domain, correct it
    const corrected = dbCanonical
      .replace(/^https?:\/\/(www\.)?mantraacupuncture\.com/i, baseUrl)
      .replace(/\/+$/, '');
    return corrected;
  }

  let cleanRoute = route.startsWith('/') ? route : `/${route}`;
  cleanRoute = cleanRoute.replace(/\/+$/, '');

  // Avoid duplicate slug when route already contains the slug
  if (slug) {
    const slugSegment = `/${slug.replace(/^\/+/, '').replace(/\/+$/, '')}`;
    if (!cleanRoute.endsWith(slugSegment)) {
      cleanRoute = `${cleanRoute}${slugSegment}`;
    }
  }

  // If root route
  if (!cleanRoute || cleanRoute === '/') {
    return baseUrl;
  }

  return `${baseUrl}${cleanRoute}`;
}

export async function generateSiteMetadata({
  route,
  fallbackTitle,
  fallbackDescription,
  slug,
}: {
  route: string;
  fallbackTitle: string;
  fallbackDescription: string;
  slug?: string;
}): Promise<Metadata> {
  const siteSettings = await getSiteSettings();
  const dbSeo = await getSEOMetadata(route);
  const baseUrl = getBaseUrl();

  const siteName = siteSettings.site_name;
  let title = dbSeo?.title || fallbackTitle;
  if (!title.toLowerCase().includes(siteName.toLowerCase())) {
    title = `${title} | ${siteName}`;
  }
  const description = dbSeo?.description || fallbackDescription;
  const canonicalUrl = buildCanonicalUrl(route, slug, dbSeo?.canonical_url);

  let ogImageUrl = dbSeo?.og_image_url;
  if (!ogImageUrl) {
    ogImageUrl = `${baseUrl}/og-image.jpg`;
  } else if (ogImageUrl.startsWith('/')) {
    ogImageUrl = `${baseUrl}${ogImageUrl}`;
  } else {
    ogImageUrl = ogImageUrl.replace(/^https?:\/\/(www\.)?mantraacupuncture\.com/i, baseUrl);
  }

  return {
    title,
    description,
    keywords: dbSeo?.keywords ? dbSeo.keywords.split(',').map((k) => k.trim()) : undefined,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      siteName: siteSettings.site_name,
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      locale: 'en_IN',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImageUrl],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  };
}

/**
 * Builds MedicalClinic and LocalBusiness structured data combined with WebSite entity.
 * Uses ONLY real business data from the clinic.
 */
export function buildClinicJsonLd(siteSettings: {
  site_name: string;
  phone: string;
  address: string;
  working_hours: string;
  google_maps_url: string | null;
  instagram_url: string | null;
}) {
  const baseUrl = getBaseUrl();

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': ['MedicalClinic', 'LocalBusiness'],
        '@id': `${baseUrl}/#clinic`,
        name: siteSettings.site_name,
        description: 'Personalized, patient-focused acupuncture care clinic in Changanacherry, Kerala, India.',
        url: baseUrl,
        telephone: siteSettings.phone,
        logo: `${baseUrl}/mantra-logo1.png`,
        image: `${baseUrl}/og-image.jpg`,
        hasMap: siteSettings.google_maps_url || undefined,
        address: {
          '@type': 'PostalAddress',
          streetAddress: "Marette Building 5, Opp St. Anne's Girls Higher Secondary School",
          addressLocality: 'Changanacherry',
          addressRegion: 'Kerala',
          postalCode: '686101',
          addressCountry: 'IN',
        },
        geo: {
          '@type': 'GeoCoordinates',
          latitude: 9.4447,
          longitude: 76.5367,
        },
        medicalSpecialty: 'Acupuncture',
        priceRange: '$$',
        openingHoursSpecification: [
          {
            '@type': 'OpeningHoursSpecification',
            dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
            opens: '09:00',
            closes: '19:00',
          },
        ],
        sameAs: [
          siteSettings.instagram_url,
          siteSettings.google_maps_url,
        ].filter(Boolean),
        availableService: [
          {
            '@type': 'MedicalProcedure',
            name: 'Acupuncture Treatment',
            url: `${baseUrl}/treatments/acupuncture-treatment`,
          },
          {
            '@type': 'MedicalProcedure',
            name: 'Electro Acupuncture Treatment',
            url: `${baseUrl}/treatments/electro-acupuncture-treatment`,
          },
          {
            '@type': 'MedicalProcedure',
            name: 'Cupping / Hijama',
            url: `${baseUrl}/treatments/cupping-hijama`,
          },
        ],
      },
      {
        '@type': 'WebSite',
        '@id': `${baseUrl}/#website`,
        url: baseUrl,
        name: siteSettings.site_name,
        description: 'Personalized, patient-focused acupuncture care in Changanacherry, Kerala by Dr. Nikku Thomas.',
        publisher: {
          '@id': `${baseUrl}/#clinic`,
        },
        inLanguage: 'en-IN',
      },
    ],
  };
}

/**
 * Builds BreadcrumbList structured data for inner pages.
 */
export interface BreadcrumbItem {
  name: string;
  url: string;
}

export function buildBreadcrumbJsonLd(items: BreadcrumbItem[]) {
  const baseUrl = getBaseUrl();
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => {
      const fullUrl = item.url.startsWith('http')
        ? item.url
        : `${baseUrl}${item.url.startsWith('/') ? item.url : `/${item.url}`}`;
      return {
        '@type': 'ListItem',
        position: index + 1,
        name: item.name,
        item: fullUrl,
      };
    }),
  };
}

/**
 * Builds MedicalProcedure structured data for treatment pages where content supports it.
 */
export function buildServiceJsonLd(service: {
  title: string;
  slug: string;
  short_description?: string | null;
  full_description?: string | null;
  image_url?: string | null;
}) {
  const baseUrl = getBaseUrl();
  const serviceUrl = `${baseUrl}/treatments/${service.slug}`;
  const description = service.full_description || service.short_description || service.title;

  let imageUrl: string | undefined;
  if (service.image_url) {
    imageUrl = service.image_url.startsWith('http') ? service.image_url : `${baseUrl}${service.image_url}`;
  }

  return {
    '@context': 'https://schema.org',
    '@type': 'MedicalProcedure',
    name: service.title,
    description,
    url: serviceUrl,
    image: imageUrl,
    procedureType: 'https://health-lifesci.schema.org/TherapeuticProcedure',
    provider: {
      '@type': 'MedicalClinic',
      '@id': `${baseUrl}/#clinic`,
      name: 'Mantra Acupuncture Clinic',
      url: baseUrl,
    },
  };
}

/**
 * Builds MedicalCondition structured data for condition detail pages where content supports it.
 */
export function buildMedicalConditionJsonLd(condition: {
  title: string;
  slug: string;
  short_description?: string | null;
  full_description?: string | null;
  category?: string | null;
}) {
  const baseUrl = getBaseUrl();
  const conditionUrl = `${baseUrl}/conditions/${condition.slug}`;
  const description =
    condition.full_description ||
    condition.short_description ||
    `Acupuncture supportive care for ${condition.title} at Mantra Acupuncture Clinic.`;

  return {
    '@context': 'https://schema.org',
    '@type': 'MedicalCondition',
    name: condition.title,
    description,
    url: conditionUrl,
    possibleTreatment: [
      {
        '@type': 'MedicalProcedure',
        name: 'Acupuncture Treatment',
        url: `${baseUrl}/treatments/acupuncture-treatment`,
      },
    ],
  };
}

/**
 * Builds Person/Physician structured data for Dr. Nikku Thomas using ONLY verified clinic data.
 */
export function buildPhysicianJsonLd(practitioner: {
  full_name: string;
  title: string;
  qualifications?: string[] | null;
  bio?: string | null;
  profile_image_url?: string | null;
}) {
  const baseUrl = getBaseUrl();
  let imageUrl: string | undefined;
  if (practitioner.profile_image_url) {
    imageUrl = practitioner.profile_image_url.startsWith('http')
      ? practitioner.profile_image_url
      : `${baseUrl}${practitioner.profile_image_url}`;
  }

  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: practitioner.full_name,
    jobTitle: practitioner.title,
    description: practitioner.bio,
    image: imageUrl,
    worksFor: {
      '@type': 'MedicalClinic',
      '@id': `${baseUrl}/#clinic`,
      name: 'Mantra Acupuncture Clinic',
      url: baseUrl,
    },
    hasCredential: (practitioner.qualifications || []).map((q) => ({
      '@type': 'EducationalOccupationalCredential',
      credentialCategory: 'degree',
      name: q,
    })),
  };
}
