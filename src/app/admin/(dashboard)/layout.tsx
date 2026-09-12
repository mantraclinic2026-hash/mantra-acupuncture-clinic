import React from 'react';
import { redirect } from 'next/navigation';
import { verifyAdminUser } from '@/lib/supabase/admin-auth';
import AdminSidebar from '@/components/admin/AdminSidebar';

export const metadata = {
  title: 'Admin Dashboard | Mantra Acupuncture Clinic',
  robots: {
    index: false,
    follow: false,
  },
};

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isAdmin } = await verifyAdminUser();

  if (!isAdmin) {
    redirect('/admin/login');
  }

  return (
    <div className="min-h-screen bg-[#FAF2EB] flex flex-col md:flex-row antialiased">
      <AdminSidebar />
      <main className="flex-1 p-6 lg:p-10 overflow-y-auto max-w-7xl">
        {children}
      </main>
    </div>
  );
}
