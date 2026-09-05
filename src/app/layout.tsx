import type { Metadata } from 'next';
import { Inter, Cormorant_Garamond } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
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
    <html lang="en" className={`${inter.variable} ${cormorant.variable}`}>
      <body className="min-h-screen flex flex-col bg-[#FDFBF7] text-[#2C3531] antialiased selection:bg-[#C5A059]/20 selection:text-[#1B3B2B]">
        {children}
      </body>
    </html>
  );
}
