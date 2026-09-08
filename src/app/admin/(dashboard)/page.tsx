import React from 'react';
import Link from 'next/link';
import { Inbox, Activity, Stethoscope, Settings, ArrowRight, Clock, Phone, Calendar } from 'lucide-react';
import { createServerSupabaseClient } from '@/lib/supabase/server';
import { ConsultationInquiry } from '@/lib/types';

export default async function AdminDashboardOverview() {
  const supabase = await createServerSupabaseClient();

  const [
    { count: totalInquiries },
    { count: newInquiries },
    { count: servicesCount },
    { count: conditionsCount },
    { data: recentInquiries },
  ] = await Promise.all([
    supabase.from('consultation_inquiries').select('*', { count: 'exact', head: true }),
    supabase.from('consultation_inquiries').select('*', { count: 'exact', head: true }).eq('status', 'new'),
    supabase.from('services').select('*', { count: 'exact', head: true }).eq('is_published', true),
    supabase.from('conditions').select('*', { count: 'exact', head: true }).eq('is_published', true),
    supabase.from('consultation_inquiries').select('*').order('created_at', { ascending: false }).limit(5),
  ]);

  const inquiriesList = (recentInquiries || []) as ConsultationInquiry[];

  return (
    <div className="space-y-8">
      
      {/* Title */}
      <div>
        <h1 className="font-serif text-3xl font-bold text-[#1B3B2B]">
          Dashboard Overview
        </h1>
        <p className="text-xs sm:text-sm text-[#586962] mt-1">
          Welcome to Mantra Acupuncture Clinic Content Management System.
        </p>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        
        <div className="bg-[#F4EFE6] p-6 rounded-3xl border border-[#E6DFD3] space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-[#586962]">New Inquiries</span>
            <Inbox className="w-5 h-5 text-[#C5A059]" />
          </div>
          <p className="text-3xl font-bold text-[#1B3B2B]">{newInquiries || 0}</p>
          <span className="text-[11px] text-[#25D366] font-medium">Requires Admin Attention</span>
        </div>

        <div className="bg-[#F4EFE6] p-6 rounded-3xl border border-[#E6DFD3] space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-[#586962]">Total Inquiries</span>
            <Calendar className="w-5 h-5 text-[#1B3B2B]" />
          </div>
          <p className="text-3xl font-bold text-[#1B3B2B]">{totalInquiries || 0}</p>
          <span className="text-[11px] text-[#586962]">All Received Enquiries</span>
        </div>

        <div className="bg-[#F4EFE6] p-6 rounded-3xl border border-[#E6DFD3] space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-[#586962]">Active Services</span>
            <Activity className="w-5 h-5 text-[#1B3B2B]" />
          </div>
          <p className="text-3xl font-bold text-[#1B3B2B]">{servicesCount || 0}</p>
          <span className="text-[11px] text-[#586962]">Live CMS Services</span>
        </div>

        <div className="bg-[#F4EFE6] p-6 rounded-3xl border border-[#E6DFD3] space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-[#586962]">Active Conditions</span>
            <Stethoscope className="w-5 h-5 text-[#1B3B2B]" />
          </div>
          <p className="text-3xl font-bold text-[#1B3B2B]">{conditionsCount || 0}</p>
          <span className="text-[11px] text-[#586962]">Supported Conditions</span>
        </div>

      </div>

      {/* Recent Inquiries Section */}
      <div className="bg-[#F4EFE6] rounded-3xl p-6 border border-[#E6DFD3] space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-serif text-xl font-bold text-[#1B3B2B]">
              Recent Patient Inquiries
            </h2>
            <p className="text-xs text-[#586962]">Latest appointment requests submitted via consultation form</p>
          </div>
          <Link
            href="/admin/inquiries"
            className="inline-flex items-center text-xs font-bold text-[#1B3B2B] hover:text-[#C5A059] transition-colors"
          >
            <span>View All Inquiries</span>
            <ArrowRight className="w-4 h-4 ml-1" />
          </Link>
        </div>

        {inquiriesList.length === 0 ? (
          <div className="p-8 text-center bg-[#FDFBF7] rounded-2xl border border-[#E6DFD3] text-sm text-[#586962]">
            No patient inquiries received yet. Submit test entry via consultation form to verify.
          </div>
        ) : (
          <div className="space-y-3">
            {inquiriesList.map((inq) => (
              <div
                key={inq.id}
                className="bg-[#FDFBF7] p-4 rounded-2xl border border-[#E6DFD3] flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-[#1B3B2B] text-sm sm:text-base">{inq.full_name}</span>
                    <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded-md ${
                      inq.status === 'new' ? 'bg-amber-100 text-amber-800' : 'bg-emerald-100 text-emerald-800'
                    }`}>
                      {inq.status}
                    </span>
                  </div>
                  <div className="flex items-center gap-4 text-xs text-[#586962]">
                    <span className="flex items-center gap-1">
                      <Phone className="w-3.5 h-3.5" />
                      {inq.phone}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      {new Date(inq.created_at).toLocaleDateString()}
                    </span>
                  </div>
                </div>

                <Link
                  href="/admin/inquiries"
                  className="inline-flex items-center justify-center px-4 py-2 rounded-xl bg-[#1B3B2B] text-white text-xs font-medium hover:bg-[#12291E]"
                >
                  Manage Inquiry
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Quick CMS Action Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Link href="/admin/settings" className="p-6 bg-[#FDFBF7] rounded-2xl border border-[#E6DFD3] hover:border-[#C5A059] transition-colors space-y-2 group">
          <Settings className="w-6 h-6 text-[#1B3B2B] group-hover:text-[#C5A059]" />
          <h3 className="font-bold text-[#1B3B2B]">Site & Contact Settings</h3>
          <p className="text-xs text-[#586962]">Update phone numbers, WhatsApp prompts, address, working hours, and CTA button labels.</p>
        </Link>

        <Link href="/admin/services" className="p-6 bg-[#FDFBF7] rounded-2xl border border-[#E6DFD3] hover:border-[#C5A059] transition-colors space-y-2 group">
          <Activity className="w-6 h-6 text-[#1B3B2B] group-hover:text-[#C5A059]" />
          <h3 className="font-bold text-[#1B3B2B]">Manage Services</h3>
          <p className="text-xs text-[#586962]">Create, edit, reorder, or update images for treatment services.</p>
        </Link>

        <Link href="/admin/conditions" className="p-6 bg-[#FDFBF7] rounded-2xl border border-[#E6DFD3] hover:border-[#C5A059] transition-colors space-y-2 group">
          <Stethoscope className="w-6 h-6 text-[#1B3B2B] group-hover:text-[#C5A059]" />
          <h3 className="font-bold text-[#1B3B2B]">Manage Conditions</h3>
          <p className="text-xs text-[#586962]">Control supported health concerns and medical disclaimer information.</p>
        </Link>
      </div>

    </div>
  );
}
