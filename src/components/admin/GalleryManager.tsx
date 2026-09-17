'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Plus, Edit2, Trash2, Save, X, ExternalLink, Loader2 } from 'lucide-react';
import { GalleryItem } from '@/lib/types';
import { upsertGalleryItemAction, deleteGalleryItemAction } from '@/lib/actions/admin';
import ImageUploader from './ImageUploader';
import ImageFallback from '@/components/public/ImageFallback';

interface GalleryManagerProps {
  initialItems: GalleryItem[];
}

export default function GalleryManager({ initialItems }: GalleryManagerProps) {
  const router = useRouter();
  const [editingItem, setEditingItem] = useState<Partial<GalleryItem> | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [publicId, setPublicId] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);

  const MAX_IMAGES = 12;
  const isLimitReached = initialItems.length >= MAX_IMAGES;

  const startNewItem = () => {
    if (isLimitReached) {
      alert('Gallery limit of 12 images reached. Please delete an existing image first before adding a new one.');
      return;
    }
    setEditingItem({
      title: '',
      category: 'Clinic Environment',
      image_alt: '',
      display_order: initialItems.length + 1,
      is_published: true,
    });
    setImageUrl(null);
    setPublicId(null);
    setSaveError(null);
  };

  const startEditItem = (item: GalleryItem) => {
    setEditingItem(item);
    setImageUrl(item.image_url);
    setPublicId(item.image_public_id);
    setSaveError(null);
  };

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!editingItem?.id && isLimitReached) {
      setSaveError('Cannot add more than 12 images. Please delete an older photo first.');
      return;
    }
    setIsSaving(true);
    setSaveError(null);
    try {
      const formData = new FormData(e.currentTarget);
      await upsertGalleryItemAction(formData);
      setEditingItem(null);
      router.refresh();
    } catch (err: unknown) {
      setSaveError(err instanceof Error ? err.message : 'Failed to save gallery photo');
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this gallery image? This will also remove the image file from Cloudinary to free up storage.')) {
      await deleteGalleryItemAction(id);
      router.refresh();
    }
  };

  return (
    <div className="space-y-6">
      
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="font-serif text-xl font-bold text-[#1B3B2B]">
              Gallery Items ({initialItems.length}/{MAX_IMAGES})
            </h2>
            <span
              className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full ${
                isLimitReached
                  ? 'bg-amber-100 text-amber-900 border border-amber-300'
                  : 'bg-[#FAF2EB] text-[#586962] border border-[#E6DFD3]'
              }`}
            >
              {isLimitReached ? '12/12 Slots Full' : `${MAX_IMAGES - initialItems.length} slots available`}
            </span>
          </div>
          <p className="text-xs text-[#586962] mt-0.5">
            Photos of clinic atmosphere and treatment rooms (capped at 12 images to optimize storage).
          </p>
        </div>

        <div className="flex items-center gap-3">
          <a
            href="/gallery"
            target="_blank"
            rel="noopener noreferrer"
            className="px-3.5 py-2 rounded-full bg-[#FAF2EB] border border-[#E6DFD3] text-[#1B3B2B] hover:text-[#C5A059] text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-sm"
          >
            <span>View on Webpage</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
          <button
            onClick={startNewItem}
            disabled={isLimitReached}
            className={`px-4 py-2 rounded-full text-xs font-medium flex items-center gap-1.5 shadow-sm transition-all ${
              isLimitReached
                ? 'bg-gray-300 text-gray-600 cursor-not-allowed'
                : 'bg-[#1B3B2B] text-white hover:bg-[#12291E]'
            }`}
            title={
              isLimitReached
                ? 'Gallery limit of 12 images reached. Delete an older photo to add a new one.'
                : 'Add a new photo'
            }
          >
            <Plus className="w-4 h-4" />
            <span>{isLimitReached ? 'Limit Reached (12/12)' : 'Add Gallery Photo'}</span>
          </button>
        </div>
      </div>

      {/* Storage Alert Banner when 12 images reached */}
      {isLimitReached && (
        <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs leading-relaxed">
          <div>
            <span className="font-bold block text-sm mb-0.5">⚠️ Gallery Limit Reached (12 of 12 Images)</span>
            <span>
              To prevent Cloudinary and Supabase storage overflow, a maximum of 12 photos is allowed. To upload a 13th photo, please delete any older photo below.
            </span>
          </div>
        </div>
      )}

      {initialItems.length === 0 ? (
        <div className="p-8 text-center bg-[#EEE4D8] rounded-3xl border border-[#E6DFD3] text-sm text-[#586962]">
          No gallery photos uploaded yet. Click &quot;Add Gallery Photo&quot; to upload your first clinic photo.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {initialItems.map((item, idx) => (
            <div
              key={item.id}
              className="bg-[#EEE4D8] rounded-2xl border border-[#E6DFD3] overflow-hidden flex flex-col justify-between shadow-sm"
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
                  <span className="text-[10px] uppercase font-bold text-[#C5A059] bg-[#FAF2EB] px-2 py-0.5 rounded border border-[#E6DFD3]">
                    {item.category || 'Clinic'}
                  </span>
                  <div className="flex items-center gap-1.5">
                    <span className="text-[10px] font-mono text-[#586962] bg-[#FAF2EB] px-1.5 py-0.5 rounded border border-[#E6DFD3]">
                      Slot {idx + 1}/{MAX_IMAGES}
                    </span>
                    {!item.is_published && (
                      <span className="text-[10px] bg-gray-200 text-gray-700 px-2 py-0.5 rounded font-bold">
                        Hidden
                      </span>
                    )}
                  </div>
                </div>
                <h3 className="font-bold text-[#1B3B2B] text-sm">{item.title}</h3>
                {item.image_alt && <p className="text-xs text-[#586962] italic">Alt: {item.image_alt}</p>}
              </div>

              <div className="p-3 bg-[#FAF2EB] border-t border-[#E6DFD3] flex items-center justify-end gap-2">
                <button
                  onClick={() => startEditItem(item)}
                  className="p-2 rounded-xl bg-[#EEE4D8] border border-[#E6DFD3] text-[#1B3B2B] hover:text-[#C5A059]"
                  aria-label="Edit Gallery Item"
                  title="Edit details"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDelete(item.id)}
                  className="p-2 rounded-xl bg-[#EEE4D8] border border-[#E6DFD3] text-red-600 hover:bg-red-50 hover:border-red-200"
                  aria-label="Delete Gallery Item"
                  title="Delete image (frees 1 slot & cleans Cloudinary storage)"
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
          <div className="bg-[#FAF2EB] rounded-3xl p-6 sm:p-8 max-w-xl w-full shadow-2xl space-y-6 border border-[#E6DFD3] max-h-[90vh] overflow-y-auto">
            
            <div className="flex items-center justify-between border-b border-[#E6DFD3] pb-4">
              <h3 className="font-serif text-xl font-bold text-[#1B3B2B]">
                {editingItem.id ? 'Edit Gallery Photo' : 'Add Gallery Photo'}
              </h3>
              <button onClick={() => setEditingItem(null)} className="text-[#586962] hover:text-[#1B3B2B]">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleFormSubmit} className="space-y-4">
              {editingItem.id && <input type="hidden" name="id" value={editingItem.id} />}
              <input type="hidden" name="image_url" value={imageUrl || ''} />
              <input type="hidden" name="image_public_id" value={publicId || ''} />

              {saveError && (
                <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-medium">
                  {saveError}
                </div>
              )}

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
                  className="w-full px-4 py-2.5 rounded-xl bg-[#EEE4D8] border border-[#E6DFD3] text-sm text-[#1B3B2B]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#1B3B2B] mb-1">Image Alt Text (Accessibility)</label>
                <input
                  type="text"
                  name="image_alt"
                  defaultValue={editingItem.image_alt || ''}
                  placeholder="e.g. Clean acupuncture treatment table with natural lighting"
                  className="w-full px-4 py-2.5 rounded-xl bg-[#EEE4D8] border border-[#E6DFD3] text-sm text-[#1B3B2B]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#1B3B2B] mb-1">Category</label>
                  <input
                    type="text"
                    name="category"
                    defaultValue={editingItem.category || 'Clinic Environment'}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#EEE4D8] border border-[#E6DFD3] text-sm text-[#1B3B2B]"
                  />
                </div>

                {/* Hidden display_order — auto-assigned */}
                <input
                  type="hidden"
                  name="display_order"
                  value={editingItem.display_order ?? initialItems.length + 1}
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#1B3B2B] mb-1">Status</label>
                <select
                  name="is_published"
                  defaultValue={editingItem.is_published ? 'true' : 'false'}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#EEE4D8] border border-[#E6DFD3] text-sm text-[#1B3B2B]"
                >
                  <option value="true">Published (Visible)</option>
                  <option value="false">Unpublished (Hidden)</option>
                </select>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-[#E6DFD3]">
                <button
                  type="button"
                  onClick={() => setEditingItem(null)}
                  disabled={isSaving}
                  className="px-4 py-2.5 rounded-full border border-[#E6DFD3] text-xs font-medium text-[#586962] disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={!imageUrl || isSaving}
                  className="px-6 py-2.5 rounded-full bg-[#1B3B2B] text-white text-xs font-medium hover:bg-[#12291E] flex items-center gap-1.5 disabled:opacity-50"
                >
                  {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                  <span>{isSaving ? 'Saving...' : 'Save Gallery Item'}</span>
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

    </div>
  );
}
