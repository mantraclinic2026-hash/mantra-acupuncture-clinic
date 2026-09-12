'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  LayoutDashboard,
  Inbox,
  Settings,
  Sparkles,
  Stethoscope,
  Activity,
  HelpCircle,
  UserCheck,
  LogOut,
  Image as ImageIcon,
  BookOpen,
} from 'lucide-react';
import { createClient } from '@/lib/supabase/client';

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const handleSignOut = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push('/admin/login');
    router.refresh();
  };

  const navItems = [
    { label: 'Overview', href: '/admin', icon: LayoutDashboard },
    { label: 'Patient Inquiries', href: '/admin/inquiries', icon: Inbox },
    { label: 'Site Settings', href: '/admin/settings', icon: Settings },
    { label: 'Hero Content', href: '/admin/hero', icon: Sparkles },
    { label: 'About & Process', href: '/admin/about', icon: BookOpen },
    { label: 'Services CMS', href: '/admin/services', icon: Activity },
    { label: 'Conditions CMS', href: '/admin/conditions', icon: Stethoscope },
    { label: 'Practitioner', href: '/admin/practitioner', icon: UserCheck },
    { label: 'FAQs CMS', href: '/admin/faqs', icon: HelpCircle },
    { label: 'Gallery CMS', href: '/admin/gallery', icon: ImageIcon },
  ];

  return (
    <aside className="w-64 bg-[#12291E] text-[#EBF2EE] flex flex-col justify-between p-6 shrink-0 min-h-screen">
      <div className="space-y-8">
        
        {/* Brand */}
        <div>
          <Link href="/admin" className="block">
            <span className="font-serif text-xl font-bold text-white block">
              Mantra CMS
            </span>
            <span className="text-[10px] uppercase tracking-widest text-[#C5A059] block font-medium">
              Admin Portal
            </span>
          </Link>
        </div>

        {/* Links */}
        <nav className="space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-[#C5A059] text-white font-semibold'
                    : 'text-[#EBF2EE]/80 hover:bg-[#1B3B2B] hover:text-white'
                }`}
              >
                <Icon className="w-4 h-4 shrink-0" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

      </div>

      {/* Footer Controls */}
      <div className="pt-6 border-t border-[#C5A059]/20 space-y-3">
        <button
          onClick={handleSignOut}
          className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-medium text-red-400 hover:text-red-300 hover:bg-red-950/30 transition-colors"
        >
          <LogOut className="w-4 h-4" />
          <span>Sign Out Admin</span>
        </button>
      </div>
    </aside>
  );
}
