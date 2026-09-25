import React from 'react';

export const metadata = {
  title: 'Admin Portal | Mantra Acupuncture Clinic',
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
