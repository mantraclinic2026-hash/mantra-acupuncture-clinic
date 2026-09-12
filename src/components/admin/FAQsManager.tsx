'use client';

import React, { useState } from 'react';
import { Plus, Edit2, Trash2, Save, X } from 'lucide-react';
import { FAQItem } from '@/lib/types';
import { upsertFAQAction, deleteFAQAction } from '@/lib/actions/admin';

interface FAQsManagerProps {
  initialFAQs: FAQItem[];
}

export default function FAQsManager({ initialFAQs }: FAQsManagerProps) {
  const [editingFAQ, setEditingFAQ] = useState<Partial<FAQItem> | null>(null);

  const startNewFAQ = () => {
    setEditingFAQ({
      question: '',
      answer: '',
      category: 'General',
      display_order: initialFAQs.length + 1,
      is_published: true,
    });
  };

  const startEditFAQ = (item: FAQItem) => {
    setEditingFAQ(item);
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this FAQ?')) {
      await deleteFAQAction(id);
    }
  };

  return (
    <div className="space-y-6">
      
      <div className="flex items-center justify-between">
        <h2 className="font-serif text-xl font-bold text-[#1B3B2B]">
          Current FAQs ({initialFAQs.length})
        </h2>
        <button
          onClick={startNewFAQ}
          className="px-4 py-2 rounded-full bg-[#1B3B2B] text-white text-xs font-medium hover:bg-[#12291E] flex items-center gap-1.5"
        >
          <Plus className="w-4 h-4" />
          <span>Add New FAQ</span>
        </button>
      </div>

      <div className="space-y-4">
        {initialFAQs.map((faq) => (
          <div
            key={faq.id}
            className="p-5 bg-[#EEE4D8] rounded-2xl border border-[#E6DFD3] flex flex-col sm:flex-row sm:items-center justify-between gap-4"
          >
            <div className="space-y-1">
              <span className="text-[10px] uppercase font-bold text-[#C5A059] bg-[#FAF2EB] px-2 py-0.5 rounded border border-[#E6DFD3]">
                {faq.category || 'General'}
              </span>
              <h3 className="font-serif text-base font-bold text-[#1B3B2B] pt-1">{faq.question}</h3>
              <p className="text-xs text-[#586962] line-clamp-2">{faq.answer}</p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => startEditFAQ(faq)}
                className="p-2 rounded-xl bg-[#FAF2EB] border border-[#E6DFD3] text-[#1B3B2B] hover:text-[#C5A059]"
              >
                <Edit2 className="w-4 h-4" />
              </button>
              <button
                onClick={() => handleDelete(faq.id)}
                className="p-2 rounded-xl bg-[#FAF2EB] border border-[#E6DFD3] text-red-600 hover:bg-red-50"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {editingFAQ && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#12291E]/60 backdrop-blur-sm">
          <div className="bg-[#FAF2EB] rounded-3xl p-6 sm:p-8 max-w-xl w-full shadow-2xl space-y-6 border border-[#E6DFD3]">
            
            <div className="flex items-center justify-between border-b border-[#E6DFD3] pb-4">
              <h3 className="font-serif text-xl font-bold text-[#1B3B2B]">
                {editingFAQ.id ? 'Edit FAQ' : 'Create FAQ'}
              </h3>
              <button onClick={() => setEditingFAQ(null)} className="text-[#586962] hover:text-[#1B3B2B]">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form action={upsertFAQAction} onSubmit={() => setEditingFAQ(null)} className="space-y-4">
              {editingFAQ.id && <input type="hidden" name="id" value={editingFAQ.id} />}

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#1B3B2B] mb-1">Question</label>
                <input
                  type="text"
                  name="question"
                  required
                  defaultValue={editingFAQ.question}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#EEE4D8] border border-[#E6DFD3] text-sm text-[#1B3B2B]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#1B3B2B] mb-1">Answer</label>
                <textarea
                  name="answer"
                  required
                  rows={4}
                  defaultValue={editingFAQ.answer}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#EEE4D8] border border-[#E6DFD3] text-xs text-[#1B3B2B]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#1B3B2B] mb-1">Category</label>
                  <input
                    type="text"
                    name="category"
                    defaultValue={editingFAQ.category || 'General'}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#EEE4D8] border border-[#E6DFD3] text-sm text-[#1B3B2B]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#1B3B2B] mb-1">Display Order</label>
                  <input
                    type="number"
                    name="display_order"
                    defaultValue={editingFAQ.display_order || 0}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#EEE4D8] border border-[#E6DFD3] text-sm text-[#1B3B2B]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#1B3B2B] mb-1">Status</label>
                <select
                  name="is_published"
                  defaultValue={editingFAQ.is_published ? 'true' : 'false'}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#EEE4D8] border border-[#E6DFD3] text-sm text-[#1B3B2B]"
                >
                  <option value="true">Published</option>
                  <option value="false">Unpublished</option>
                </select>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-[#E6DFD3]">
                <button
                  type="button"
                  onClick={() => setEditingFAQ(null)}
                  className="px-4 py-2.5 rounded-full border border-[#E6DFD3] text-xs font-medium text-[#586962]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-full bg-[#1B3B2B] text-white text-xs font-medium hover:bg-[#12291E] flex items-center gap-1.5"
                >
                  <Save className="w-4 h-4" />
                  <span>Save FAQ</span>
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

    </div>
  );
}
