'use client';

import React, { useState, useTransition } from 'react';
import { Phone, Mail, Calendar, Save, Loader2, Check } from 'lucide-react';
import { ConsultationInquiry, InquiryStatus } from '@/lib/types';
import { updateInquiryStatusAction } from '@/lib/actions/admin';

interface InquiryTableProps {
  inquiries: ConsultationInquiry[];
}

const STATUSES: InquiryStatus[] = ['new', 'contacted', 'scheduled', 'completed', 'cancelled', 'archived'];

export default function InquiryTable({ inquiries }: InquiryTableProps) {
  const [activeTab, setActiveTab] = useState<string>('all');
  const [selectedInquiry, setSelectedInquiry] = useState<ConsultationInquiry | null>(null);
  const [adminNotes, setAdminNotes] = useState<string>('');
  const [selectedStatus, setSelectedStatus] = useState<InquiryStatus>('new');
  const [isPending, startTransition] = useTransition();
  const [savedSuccess, setSavedSuccess] = useState(false);

  const filteredInquiries = inquiries.filter((inq) => {
    if (activeTab === 'all') return true;
    return inq.status === activeTab;
  });

  const openManageModal = (inq: ConsultationInquiry) => {
    setSelectedInquiry(inq);
    setSelectedStatus(inq.status);
    setAdminNotes(inq.admin_notes || '');
    setSavedSuccess(false);
  };

  const handleUpdateStatus = () => {
    if (!selectedInquiry) return;

    startTransition(async () => {
      await updateInquiryStatusAction(selectedInquiry.id, selectedStatus, adminNotes);
      setSavedSuccess(true);
      setTimeout(() => {
        setSavedSuccess(false);
      }, 2000);
    });
  };

  return (
    <div className="space-y-6">
      
      {/* Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2">
        <button
          onClick={() => setActiveTab('all')}
          className={`px-4 py-2 rounded-full text-xs font-bold transition-colors ${
            activeTab === 'all' ? 'bg-[#1B3B2B] text-white' : 'bg-[#EEE4D8] text-[#2C3531] hover:bg-[#EAE3D5]'
          }`}
        >
          All ({inquiries.length})
        </button>
        {STATUSES.map((st) => {
          const count = inquiries.filter((i) => i.status === st).length;
          return (
            <button
              key={st}
              onClick={() => setActiveTab(st)}
              className={`px-4 py-2 rounded-full text-xs font-bold capitalize transition-colors ${
                activeTab === st ? 'bg-[#1B3B2B] text-white' : 'bg-[#EEE4D8] text-[#2C3531] hover:bg-[#EAE3D5]'
              }`}
            >
              {st} ({count})
            </button>
          );
        })}
      </div>

      {/* Inquiries Table / Cards */}
      {filteredInquiries.length === 0 ? (
        <div className="p-12 text-center bg-[#EEE4D8] rounded-3xl border border-[#E6DFD3] text-sm text-[#586962]">
          No inquiries found matching selected status filter.
        </div>
      ) : (
        <div className="bg-[#EEE4D8] rounded-3xl border border-[#E6DFD3] overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-[#EAE3D5] text-[#1B3B2B] font-bold uppercase tracking-wider text-[11px]">
                <tr>
                  <th className="p-4">Patient Name</th>
                  <th className="p-4">Phone / Contact</th>
                  <th className="p-4">Preferred Date</th>
                  <th className="p-4">Submitted On</th>
                  <th className="p-4">Status</th>
                  <th className="p-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E6DFD3]">
                {filteredInquiries.map((inq) => (
                  <tr key={inq.id} className="hover:bg-[#FAF2EB]/60 transition-colors">
                    <td className="p-4 font-bold text-[#1B3B2B]">
                      {inq.full_name}
                      {inq.email && <span className="block text-xs font-normal text-[#586962]">{inq.email}</span>}
                    </td>
                    <td className="p-4 text-[#2C3531]">
                      <a href={`tel:${inq.phone}`} className="hover:underline flex items-center gap-1 font-medium">
                        <Phone className="w-3.5 h-3.5 text-[#C5A059]" />
                        {inq.phone}
                      </a>
                    </td>
                    <td className="p-4 text-[#586962]">
                      {inq.preferred_date ? new Date(inq.preferred_date).toLocaleDateString() : 'Flexible'}
                    </td>
                    <td className="p-4 text-[#586962]">
                      {new Date(inq.created_at).toLocaleDateString()}
                    </td>
                    <td className="p-4">
                      <span className={`inline-block px-2.5 py-1 rounded-md text-[11px] font-bold uppercase ${
                        inq.status === 'new'
                          ? 'bg-amber-100 text-amber-800'
                          : inq.status === 'scheduled'
                          ? 'bg-blue-100 text-blue-800'
                          : inq.status === 'completed'
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-gray-200 text-gray-800'
                      }`}>
                        {inq.status}
                      </span>
                    </td>
                    <td className="p-4 text-right">
                      <button
                        onClick={() => openManageModal(inq)}
                        className="px-3.5 py-1.5 rounded-xl bg-[#1B3B2B] text-white text-xs font-medium hover:bg-[#12291E]"
                      >
                        Manage
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Inquiry Detail Modal */}
      {selectedInquiry && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#12291E]/60 backdrop-blur-sm">
          <div className="bg-[#FAF2EB] rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl space-y-6 border border-[#E6DFD3] max-h-[90vh] overflow-y-auto">
            
            <div className="flex items-center justify-between border-b border-[#E6DFD3] pb-4">
              <div>
                <h3 className="font-serif text-xl font-bold text-[#1B3B2B]">
                  Inquiry: {selectedInquiry.full_name}
                </h3>
                <p className="text-xs text-[#586962]">Submitted: {new Date(selectedInquiry.created_at).toLocaleString()}</p>
              </div>
              <button
                onClick={() => setSelectedInquiry(null)}
                className="text-xs font-bold text-[#586962] hover:text-[#1B3B2B]"
              >
                Close
              </button>
            </div>

            <div className="space-y-3 text-xs sm:text-sm text-[#2C3531]">
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#C5A059]" />
                <span className="font-bold">Phone:</span>
                <a href={`tel:${selectedInquiry.phone}`} className="underline font-semibold text-[#1B3B2B]">{selectedInquiry.phone}</a>
              </div>

              {selectedInquiry.email && (
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-[#C5A059]" />
                  <span className="font-bold">Email:</span>
                  <span>{selectedInquiry.email}</span>
                </div>
              )}

              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-[#C5A059]" />
                <span className="font-bold">Preferred Date:</span>
                <span>{selectedInquiry.preferred_date || 'Flexible'}</span>
              </div>

              {selectedInquiry.message && (
                <div className="pt-2">
                  <span className="font-bold block mb-1">Patient Concern / Note:</span>
                  <div className="p-3 bg-[#EEE4D8] rounded-xl text-xs leading-relaxed italic text-[#586962]">
                    &quot;{selectedInquiry.message}&quot;
                  </div>
                </div>
              )}
            </div>

            {/* Status Update Form */}
            <div className="space-y-4 pt-4 border-t border-[#E6DFD3]">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#1B3B2B] mb-1.5">
                  Update Inquiry Status
                </label>
                <select
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value as InquiryStatus)}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#EEE4D8] border border-[#E6DFD3] text-sm font-medium text-[#1B3B2B]"
                >
                  {STATUSES.map((st) => (
                    <option key={st} value={st}>
                      {st.toUpperCase()}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#1B3B2B] mb-1.5">
                  Admin Internal Notes (Private)
                </label>
                <textarea
                  rows={3}
                  value={adminNotes}
                  onChange={(e) => setAdminNotes(e.target.value)}
                  placeholder="Record call outcome, scheduled slot, or receptionist notes..."
                  className="w-full px-4 py-2.5 rounded-xl bg-[#EEE4D8] border border-[#E6DFD3] text-xs text-[#2C3531]"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                {savedSuccess && (
                  <span className="text-xs text-[#25D366] font-bold flex items-center gap-1">
                    <Check className="w-4 h-4" />
                    <span>Saved!</span>
                  </span>
                )}

                <button
                  onClick={handleUpdateStatus}
                  disabled={isPending}
                  className="px-5 py-2.5 rounded-full bg-[#1B3B2B] text-white text-xs font-medium hover:bg-[#12291E] flex items-center gap-2 disabled:opacity-60"
                >
                  {isPending ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Updating...</span>
                    </>
                  ) : (
                    <>
                      <Save className="w-4 h-4" />
                      <span>Save Status & Notes</span>
                    </>
                  )}
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
