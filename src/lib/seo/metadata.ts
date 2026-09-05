import { Metadata } from 'next';
import { getSEOMetadata, getSiteSettings } from '@/lib/queries/site';

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

  const title = dbSeo?.title || `${fallbackTitle} | ${siteSettings.site_name}`;
  const description = dbSeo?.description || fallbackDescription;
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://mantraacupuncture.com';
  const canonicalUrl = dbSeo?.canonical_url || `${baseUrl}${route}${slug ? `/${slug}` : ''}`;
  const ogImageUrl = dbSeo?.og_image_url || `${baseUrl}/og-image.jpg`;

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
    },
  };
}

export function buildClinicJsonLd(siteSettings: {
  site_name: string;
  phone: string;
  address: string;
  working_hours: string;
  google_maps_url: string | null;
  instagram_url: string | null;
}) {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://mantraacupuncture.com';

  return {
    '@context': 'https://schema.org',
    '@type': ['MedicalClinic', 'LocalBusiness'],
    '@id': `${baseUrl}/#clinic`,
    name: siteSettings.site_name,
    description: 'Personalized, patient-focused acupuncture care clinic in Changanacherry, Kerala, India.',
    url: baseUrl,
    telephone: siteSettings.phone,
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Marette Building 5, Opp St. Anne\'s Girls Higher Secondary School',
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
    availableService: [
      {
        '@type': 'MedicalProcedure',
        name: 'Acupuncture Treatment',
        description: 'Acupuncture needle therapy focused on relaxation and physical comfort.',
      },
      {
        '@type': 'MedicalProcedure',
        name: 'Electro Acupuncture Treatment',
        description: 'Micro-current acupuncture therapy for muscle relaxation.',
      },
      {
        '@type': 'MedicalProcedure',
        name: 'Cupping / Hijama',
        description: 'Therapeutic vacuum cupping for muscle tension relief and relaxation.',
      },
    ],
    openingHours: 'Mo-Sa 09:00-19:00',
    sameAs: siteSettings.instagram_url ? [siteSettings.instagram_url] : [],
  };
}
