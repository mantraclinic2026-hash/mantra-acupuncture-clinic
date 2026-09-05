'use client';

import React, { useState } from 'react';
import { Plus, Edit2, Trash2, Save, X } from 'lucide-react';
import { ServiceItem } from '@/lib/types';
import { upsertServiceAction, deleteServiceAction } from '@/lib/actions/admin';
import ImageUploader from './ImageUploader';

interface ServicesManagerProps {
  initialServices: ServiceItem[];
}

export default function ServicesManager({ initialServices }: ServicesManagerProps) {
  const [editingService, setEditingService] = useState<Partial<ServiceItem> | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  const startNewService = () => {
    setEditingService({
      title: '',
      slug: '',
      short_description: '',
      full_description: '',
      icon_name: 'Sparkles',
      display_order: initialServices.length + 1,
      is_published: true,
    });
    setImageUrl(null);
  };

  const startEditService = (service: ServiceItem) => {
    setEditingService(service);
    setImageUrl(service.image_url);
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this service?')) {
      await deleteServiceAction(id);
    }
  };

  return (
    <div className="space-y-6">
      
      <div className="flex items-center justify-between">
        <h2 className="font-serif text-xl font-bold text-[#1B3B2B]">
          Current Services ({initialServices.length})
        </h2>
        <button
          onClick={startNewService}
          className="px-4 py-2 rounded-full bg-[#1B3B2B] text-white text-xs font-medium hover:bg-[#12291E] flex items-center gap-1.5"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Service</span>
        </button>
      </div>

      {/* Services List */}
      <div className="grid grid-cols-1 gap-4">
        {initialServices.map((service) => (
          <div
            key={service.id}
            className="p-5 bg-[#F4EFE6] rounded-2xl border border-[#E6DFD3] flex flex-col sm:flex-row sm:items-center justify-between gap-4"
          >
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="font-bold text-[#1B3B2B] text-base">{service.title}</span>
                <span className="text-xs text-[#C5A059] font-mono">/{service.slug}</span>
                {!service.is_published && (
                  <span className="text-[10px] bg-gray-200 text-gray-700 px-2 py-0.5 rounded font-bold">Unpublished</span>
                )}
              </div>
              <p className="text-xs text-[#586962] line-clamp-1">{service.short_description}</p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => startEditService(service)}
                className="p-2 rounded-xl bg-[#FDFBF7] border border-[#E6DFD3] text-[#1B3B2B] hover:text-[#C5A059]"
                aria-label="Edit Service"
              >
                <Edit2 className="w-4 h-4" />
              </button>
              <button
                onClick={() => handleDelete(service.id)}
                className="p-2 rounded-xl bg-[#FDFBF7] border border-[#E6DFD3] text-red-600 hover:bg-red-50"
                aria-label="Delete Service"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Upsert Modal / Drawer */}
      {editingService && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#12291E]/60 backdrop-blur-sm">
          <div className="bg-[#FDFBF7] rounded-3xl p-6 sm:p-8 max-w-2xl w-full shadow-2xl space-y-6 border border-[#E6DFD3] max-h-[90vh] overflow-y-auto">
            
            <div className="flex items-center justify-between border-b border-[#E6DFD3] pb-4">
              <h3 className="font-serif text-xl font-bold text-[#1B3B2B]">
                {editingService.id ? 'Edit Service' : 'Create New Service'}
              </h3>
              <button onClick={() => setEditingService(null)} className="text-[#586962] hover:text-[#1B3B2B]">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form action={upsertServiceAction} onSubmit={() => setEditingService(null)} className="space-y-4">
              {editingService.id && <input type="hidden" name="id" value={editingService.id} />}
              <input type="hidden" name="image_url" value={imageUrl || ''} />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#1B3B2B] mb-1">Title</label>
                  <input
                    type="text"
                    name="title"
                    required
                    defaultValue={editingService.title}
                    onChange={(e) => {
                      if (!editingService.id) {
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
                    defaultValue={editingService.slug}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#F4EFE6] border border-[#E6DFD3] text-sm font-mono text-[#1B3B2B]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#1B3B2B] mb-1">Short Description</label>
                <textarea
                  name="short_description"
                  required
                  rows={2}
                  defaultValue={editingService.short_description}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#F4EFE6] border border-[#E6DFD3] text-xs text-[#1B3B2B]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#1B3B2B] mb-1">Full Detailed Description</label>
                <textarea
                  name="full_description"
                  required
                  rows={4}
                  defaultValue={editingService.full_description}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#F4EFE6] border border-[#E6DFD3] text-xs text-[#1B3B2B]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#1B3B2B] mb-1">Display Order</label>
                  <input
                    type="number"
                    name="display_order"
                    defaultValue={editingService.display_order || 0}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#F4EFE6] border border-[#E6DFD3] text-sm text-[#1B3B2B]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#1B3B2B] mb-1">Publication Status</label>
                  <select
                    name="is_published"
                    defaultValue={editingService.is_published ? 'true' : 'false'}
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
                label="Service Image (Cloudinary)"
              />

              <div className="flex justify-end gap-3 pt-4 border-t border-[#E6DFD3]">
                <button
                  type="button"
                  onClick={() => setEditingService(null)}
                  className="px-4 py-2.5 rounded-full border border-[#E6DFD3] text-xs font-medium text-[#586962]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-full bg-[#1B3B2B] text-white text-xs font-medium hover:bg-[#12291E] flex items-center gap-1.5"
                >
                  <Save className="w-4 h-4" />
                  <span>Save Service</span>
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

    </div>
  );
}
