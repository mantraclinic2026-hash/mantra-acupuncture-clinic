'use client';

import React, { useState } from 'react';
import { Plus, Edit2, Trash2, Save, X } from 'lucide-react';
import { GalleryItem } from '@/lib/types';
import { upsertGalleryItemAction, deleteGalleryItemAction } from '@/lib/actions/admin';
import ImageUploader from './ImageUploader';
import ImageFallback from '@/components/public/ImageFallback';

interface GalleryManagerProps {
  initialItems: GalleryItem[];
}

export default function GalleryManager({ initialItems }: GalleryManagerProps) {
  const [editingItem, setEditingItem] = useState<Partial<GalleryItem> | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [publicId, setPublicId] = useState<string | null>(null);

  const startNewItem = () => {
    setEditingItem({
      title: '',
      category: 'Clinic Environment',
      image_alt: '',
      display_order: initialItems.length + 1,
      is_published: true,
    });
    setImageUrl(null);
    setPublicId(null);
  };

  const startEditItem = (item: GalleryItem) => {
    setEditingItem(item);
    setImageUrl(item.image_url);
    setPublicId(item.image_public_id);
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this gallery image?')) {
      await deleteGalleryItemAction(id);
    }
  };

  return (
    <div className="space-y-6">
      
      <div className="flex items-center justify-between">
        <h2 className="font-serif text-xl font-bold text-[#1B3B2B]">
          Gallery Items ({initialItems.length})
        </h2>
        <button
          onClick={startNewItem}
          className="px-4 py-2 rounded-full bg-[#1B3B2B] text-white text-xs font-medium hover:bg-[#12291E] flex items-center gap-1.5"
        >
          <Plus className="w-4 h-4" />
          <span>Add Gallery Photo</span>
        </button>
      </div>

      {initialItems.length === 0 ? (
        <div className="p-8 text-center bg-[#F4EFE6] rounded-3xl border border-[#E6DFD3] text-sm text-[#586962]">
          No gallery photos uploaded yet. Click &quot;Add Gallery Photo&quot; to upload your first clinic photo.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {initialItems.map((item) => (
            <div
              key={item.id}
              className="bg-[#F4EFE6] rounded-2xl border border-[#E6DFD3] overflow-hidden flex flex-col justify-between shadow-sm"
            >
              <div className="relative aspect-video">
                <ImageFallback
                  src={item.image_url}
                  alt={item.image_alt || item.title}
                  width={400}
                  height={225}
                  aspectRatio="video"
                />
              </div>

              <div className="p-4 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] uppercase font-bold text-[#C5A059] bg-[#FDFBF7] px-2 py-0.5 rounded border border-[#E6DFD3]">
                    {item.category || 'Clinic'}
                  </span>
                  {!item.is_published && (
                    <span className="text-[10px] bg-gray-200 text-gray-700 px-2 py-0.5 rounded font-bold">
                      Hidden
                    </span>
                  )}
                </div>
                <h3 className="font-bold text-[#1B3B2B] text-sm">{item.title}</h3>
                {item.image_alt && <p className="text-xs text-[#586962] italic">Alt: {item.image_alt}</p>}
              </div>

              <div className="p-3 bg-[#FDFBF7] border-t border-[#E6DFD3] flex items-center justify-end gap-2">
                <button
                  onClick={() => startEditItem(item)}
                  className="p-2 rounded-xl bg-[#F4EFE6] border border-[#E6DFD3] text-[#1B3B2B] hover:text-[#C5A059]"
                  aria-label="Edit Gallery Item"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDelete(item.id)}
                  className="p-2 rounded-xl bg-[#F4EFE6] border border-[#E6DFD3] text-red-600 hover:bg-red-50"
                  aria-label="Delete Gallery Item"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Upsert Modal */}
      {editingItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#12291E]/60 backdrop-blur-sm">
          <div className="bg-[#FDFBF7] rounded-3xl p-6 sm:p-8 max-w-xl w-full shadow-2xl space-y-6 border border-[#E6DFD3] max-h-[90vh] overflow-y-auto">
            
            <div className="flex items-center justify-between border-b border-[#E6DFD3] pb-4">
              <h3 className="font-serif text-xl font-bold text-[#1B3B2B]">
                {editingItem.id ? 'Edit Gallery Photo' : 'Add Gallery Photo'}
              </h3>
              <button onClick={() => setEditingItem(null)} className="text-[#586962] hover:text-[#1B3B2B]">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form action={upsertGalleryItemAction} onSubmit={() => setEditingItem(null)} className="space-y-4">
              {editingItem.id && <input type="hidden" name="id" value={editingItem.id} />}
              <input type="hidden" name="image_url" value={imageUrl || ''} />
              <input type="hidden" name="image_public_id" value={publicId || ''} />

              <ImageUploader
                currentUrl={imageUrl}
                onUploadSuccess={(url, pid) => {
                  setImageUrl(url);
                  if (pid) setPublicId(pid);
                }}
                label="Gallery Photo File (Cloudinary)"
              />

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#1B3B2B] mb-1">Title / Caption</label>
                <input
                  type="text"
                  name="title"
                  required
                  defaultValue={editingItem.title}
                  placeholder="e.g. Treatment Room & Serene Atmosphere"
                  className="w-full px-4 py-2.5 rounded-xl bg-[#F4EFE6] border border-[#E6DFD3] text-sm text-[#1B3B2B]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#1B3B2B] mb-1">Image Alt Text (Accessibility)</label>
                <input
                  type="text"
                  name="image_alt"
                  defaultValue={editingItem.image_alt || ''}
                  placeholder="e.g. Clean acupuncture treatment table with natural lighting"
                  className="w-full px-4 py-2.5 rounded-xl bg-[#F4EFE6] border border-[#E6DFD3] text-sm text-[#1B3B2B]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#1B3B2B] mb-1">Category</label>
                  <input
                    type="text"
                    name="category"
                    defaultValue={editingItem.category || 'Clinic Environment'}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#F4EFE6] border border-[#E6DFD3] text-sm text-[#1B3B2B]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#1B3B2B] mb-1">Display Order</label>
                  <input
                    type="number"
                    name="display_order"
                    defaultValue={editingItem.display_order || 0}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#F4EFE6] border border-[#E6DFD3] text-sm text-[#1B3B2B]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#1B3B2B] mb-1">Status</label>
                <select
                  name="is_published"
                  defaultValue={editingItem.is_published ? 'true' : 'false'}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#F4EFE6] border border-[#E6DFD3] text-sm text-[#1B3B2B]"
                >
                  <option value="true">Published (Visible)</option>
                  <option value="false">Unpublished (Hidden)</option>
                </select>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-[#E6DFD3]">
                <button
                  type="button"
                  onClick={() => setEditingItem(null)}
                  className="px-4 py-2.5 rounded-full border border-[#E6DFD3] text-xs font-medium text-[#586962]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={!imageUrl}
                  className="px-6 py-2.5 rounded-full bg-[#1B3B2B] text-white text-xs font-medium hover:bg-[#12291E] flex items-center gap-1.5 disabled:opacity-50"
                >
                  <Save className="w-4 h-4" />
                  <span>Save Gallery Item</span>
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

    </div>
  );
}
