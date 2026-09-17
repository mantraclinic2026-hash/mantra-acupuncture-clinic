import type { Metadata } from 'next';
import { Plus_Jakarta_Sans, Cormorant_Garamond } from 'next/font/google';
import './globals.css';

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-sans',
  display: 'swap',
});

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-serif',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Mantra Acupuncture Clinic | Heal • Balance • Thrive',
  description: 'Personalized, patient-focused acupuncture care in Changanacherry, Kerala by Dr. Nikku Thomas.',
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://mantraacupuncture.com'),
  icons: {
    icon: [
      { url: '/favicon.png?v=5' },
      { url: '/favicon.png?v=5', sizes: '32x32', type: 'image/png' },
      { url: '/favicon.png?v=5', sizes: '64x64', type: 'image/png' },
      { url: '/mantra-favicon1.png?v=5', sizes: '512x512', type: 'image/png' },
    ],
    shortcut: '/favicon.png?v=5',
    apple: [
      { url: '/favicon.png?v=5', sizes: '180x180', type: 'image/png' },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${plusJakarta.variable} ${cormorant.variable}`} suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.png?v=5" type="image/png" sizes="any" />
        <link rel="shortcut icon" href="/favicon.png?v=5" type="image/png" />
        <link rel="apple-touch-icon" href="/favicon.png?v=5" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400;1,600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        className="min-h-screen flex flex-col bg-[#FAF2EB] text-[#2C3531] antialiased selection:bg-[#C5A059]/20 selection:text-[#1B3B2B]"
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}
