import type { Metadata } from 'next';
import { Plus_Jakarta_Sans, Playfair_Display } from 'next/font/google';
import './globals.css';

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-sans',
  display: 'swap',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  style: ['normal', 'italic'],
  variable: '--font-serif',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Mantra Acupuncture Clinic | Heal • Balance • Thrive',
  description: 'Personalized, patient-focused acupuncture care in Changanacherry, Kerala by Dr. Nikku Thomas.',
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://mantraacupuncture.com'),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${plusJakarta.variable} ${playfair.variable}`} suppressHydrationWarning>
      <body
        className="min-h-screen flex flex-col bg-[#FAF2EB] text-[#2C3531] antialiased selection:bg-[#C5A059]/20 selection:text-[#1B3B2B]"
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}
