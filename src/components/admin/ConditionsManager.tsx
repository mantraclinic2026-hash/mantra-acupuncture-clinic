'use client';

import React, { useState } from 'react';
import { Plus, Edit2, Trash2, Save, X } from 'lucide-react';
import { ConditionItem } from '@/lib/types';
import { upsertConditionAction, deleteConditionAction } from '@/lib/actions/admin';
import ImageUploader from './ImageUploader';

interface ConditionsManagerProps {
  initialConditions: ConditionItem[];
}

export default function ConditionsManager({ initialConditions }: ConditionsManagerProps) {
  const [editingCondition, setEditingCondition] = useState<Partial<ConditionItem> | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  const startNewCondition = () => {
    setEditingCondition({
      title: '',
      slug: '',
      short_description: '',
      full_description: '',
      category: 'Musculoskeletal',
      display_order: initialConditions.length + 1,
      is_published: true,
    });
    setImageUrl(null);
  };

  const startEditCondition = (item: ConditionItem) => {
    setEditingCondition(item);
    setImageUrl(item.image_url);
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this condition?')) {
      await deleteConditionAction(id);
    }
  };

  return (
    <div className="space-y-6">
      
      <div className="flex items-center justify-between">
        <h2 className="font-serif text-xl font-bold text-[#1B3B2B]">
          Supported Conditions ({initialConditions.length})
        </h2>
        <button
          onClick={startNewCondition}
          className="px-4 py-2 rounded-full bg-[#1B3B2B] text-white text-xs font-medium hover:bg-[#12291E] flex items-center gap-1.5"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Condition</span>
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {initialConditions.map((item) => (
          <div
            key={item.id}
            className="p-5 bg-[#F4EFE6] rounded-2xl border border-[#E6DFD3] flex flex-col justify-between gap-4"
          >
            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-[10px] uppercase font-bold text-[#C5A059] bg-[#FDFBF7] px-2 py-0.5 rounded border border-[#E6DFD3]">
                  {item.category || 'General'}
                </span>
                <span className="text-xs text-[#586962] font-mono">/{item.slug}</span>
              </div>
              <h3 className="font-serif text-lg font-bold text-[#1B3B2B] pt-1">{item.title}</h3>
              <p className="text-xs text-[#586962] line-clamp-2">{item.short_description}</p>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-[#E6DFD3]">
              <button
                onClick={() => startEditCondition(item)}
                className="p-2 rounded-xl bg-[#FDFBF7] border border-[#E6DFD3] text-[#1B3B2B] hover:text-[#C5A059]"
              >
                <Edit2 className="w-4 h-4" />
              </button>
              <button
                onClick={() => handleDelete(item.id)}
                className="p-2 rounded-xl bg-[#FDFBF7] border border-[#E6DFD3] text-red-600 hover:bg-red-50"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {editingCondition && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#12291E]/60 backdrop-blur-sm">
          <div className="bg-[#FDFBF7] rounded-3xl p-6 sm:p-8 max-w-2xl w-full shadow-2xl space-y-6 border border-[#E6DFD3] max-h-[90vh] overflow-y-auto">
            
            <div className="flex items-center justify-between border-b border-[#E6DFD3] pb-4">
              <h3 className="font-serif text-xl font-bold text-[#1B3B2B]">
                {editingCondition.id ? 'Edit Condition' : 'Create Condition'}
              </h3>
              <button onClick={() => setEditingCondition(null)} className="text-[#586962] hover:text-[#1B3B2B]">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form action={upsertConditionAction} onSubmit={() => setEditingCondition(null)} className="space-y-4">
              {editingCondition.id && <input type="hidden" name="id" value={editingCondition.id} />}
              <input type="hidden" name="image_url" value={imageUrl || ''} />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#1B3B2B] mb-1">Title</label>
                  <input
                    type="text"
                    name="title"
                    required
                    defaultValue={editingCondition.title}
                    onChange={(e) => {
                      if (!editingCondition.id) {
                        const slug = e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
                        (document.querySelector('input[name="slug"]') as HTMLInputElement).value = slug;
                      }
                    }}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#F4EFE6] border border-[#E6DFD3] text-sm text-[#1B3B2B]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#1B3B2B] mb-1">URL Slug</label>
                  <input
                    type="text"
                    name="slug"
                    required
                    defaultValue={editingCondition.slug}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#F4EFE6] border border-[#E6DFD3] text-sm font-mono text-[#1B3B2B]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#1B3B2B] mb-1">Category</label>
                <input
                  type="text"
                  name="category"
                  defaultValue={editingCondition.category || 'Musculoskeletal'}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#F4EFE6] border border-[#E6DFD3] text-sm text-[#1B3B2B]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#1B3B2B] mb-1">Short Description</label>
                <textarea
                  name="short_description"
                  required
                  rows={2}
                  defaultValue={editingCondition.short_description}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#F4EFE6] border border-[#E6DFD3] text-xs text-[#1B3B2B]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#1B3B2B] mb-1">Full Description</label>
                <textarea
                  name="full_description"
                  required
                  rows={4}
                  defaultValue={editingCondition.full_description}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#F4EFE6] border border-[#E6DFD3] text-xs text-[#1B3B2B]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#1B3B2B] mb-1">Display Order</label>
                  <input
                    type="number"
                    name="display_order"
                    defaultValue={editingCondition.display_order || 0}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#F4EFE6] border border-[#E6DFD3] text-sm text-[#1B3B2B]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#1B3B2B] mb-1">Publication Status</label>
                  <select
                    name="is_published"
                    defaultValue={editingCondition.is_published ? 'true' : 'false'}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#F4EFE6] border border-[#E6DFD3] text-sm text-[#1B3B2B]"
                  >
                    <option value="true">Published (Live)</option>
                    <option value="false">Unpublished (Hidden)</option>
                  </select>
                </div>
              </div>

              <ImageUploader
                currentUrl={imageUrl}
                onUploadSuccess={(url) => setImageUrl(url)}
                label="Condition Image (Cloudinary)"
              />

              <div className="flex justify-end gap-3 pt-4 border-t border-[#E6DFD3]">
                <button
                  type="button"
                  onClick={() => setEditingCondition(null)}
                  className="px-4 py-2.5 rounded-full border border-[#E6DFD3] text-xs font-medium text-[#586962]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-full bg-[#1B3B2B] text-white text-xs font-medium hover:bg-[#12291E] flex items-center gap-1.5"
                >
                  <Save className="w-4 h-4" />
                  <span>Save Condition</span>
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

    </div>
  );
}
