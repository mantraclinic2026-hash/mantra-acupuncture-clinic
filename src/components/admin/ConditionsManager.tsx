'use client';
import React, { useState } from 'react';
import {
  Plus,
  Edit2,
  Trash2,
  Save,
  X,
  Loader2,
  Activity,
  Sparkles,
  ShieldCheck,
  Wind,
  HeartPulse,
  FolderPlus,
} from 'lucide-react';
import { ConditionItem } from '@/lib/types';
import { upsertConditionAction, deleteConditionAction } from '@/lib/actions/admin';
import ImageUploader from './ImageUploader';
import ImageFallback from '@/components/public/ImageFallback';

export const STANDARD_CATEGORIES = [
  'Pain',
  'Stress',
  'Digestive',
  'Respiratory',
  'Women and Health',
] as const;

export const normalizeCategory = (cat?: string | null): string => {
  if (!cat) return 'Pain';
  const trimmed = cat.trim();
  const lower = trimmed.toLowerCase();
  if (lower === 'pain' || lower.includes('pain') || lower.includes('musculoskeletal')) return 'Pain';
  if (lower === 'stress' || lower.includes('stress') || lower.includes('sleep') || lower.includes('mental')) return 'Stress';
  if (lower === 'digestive' || lower.includes('digest')) return 'Digestive';
  if (lower === 'respiratory' || lower.includes('respirat') || lower.includes('asthma') || lower.includes('sinus') || lower.includes('rhinitis') || lower.includes('breath')) return 'Respiratory';
  if (lower.includes('women') || lower.includes('menstrual') || lower.includes('fertility') || lower.includes('pelvic')) return 'Women and Health';
  return trimmed;
};

interface ConditionsManagerProps {
  initialConditions: ConditionItem[];
}

export default function ConditionsManager({ initialConditions }: ConditionsManagerProps) {
  const [editingCondition, setEditingCondition] = useState<Partial<ConditionItem> | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [selectedTab, setSelectedTab] = useState<string>('all');

  const startNewCondition = (category: string = 'Pain') => {
    setEditingCondition({
      title: '',
      slug: '',
      category: category,
      short_description: '',
      full_description: '',
      display_order: initialConditions.length + 1,
      is_published: true,
    });
    setImageUrl(null);
    setSaveError(null);
  };

  const startEditCondition = (item: ConditionItem) => {
    setEditingCondition(item);
    setImageUrl(item.image_url);
    setSaveError(null);
  };

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSaving(true);
    setSaveError(null);
    try {
      const formData = new FormData(e.currentTarget);
      await upsertConditionAction(formData);
      setEditingCondition(null);
    } catch (err: unknown) {
      setSaveError(err instanceof Error ? err.message : 'Failed to save condition');
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this condition point?')) {
      await deleteConditionAction(id);
    }
  };

  // Group conditions by category
  const categoryMap = new Map<string, ConditionItem[]>();
  for (const cat of STANDARD_CATEGORIES) {
    categoryMap.set(cat, []);
  }

  for (const item of initialConditions) {
    const cat = normalizeCategory(item.category);
    if (!categoryMap.has(cat)) {
      categoryMap.set(cat, []);
    }
    categoryMap.get(cat)!.push(item);
  }

  // All category keys to display
  const allCategories = Array.from(categoryMap.keys());

  // Filtered categories according to tab
  const displayCategories =
    selectedTab === 'all'
      ? allCategories
      : allCategories.filter((c) => c.toLowerCase() === selectedTab.toLowerCase());

  const getCategoryIcon = (cat: string) => {
    switch (cat) {
      case 'Pain':
        return <Activity className="w-4 h-4 text-[#C5A059]" />;
      case 'Stress':
        return <Sparkles className="w-4 h-4 text-[#C5A059]" />;
      case 'Digestive':
        return <ShieldCheck className="w-4 h-4 text-[#C5A059]" />;
      case 'Respiratory':
        return <Wind className="w-4 h-4 text-[#C5A059]" />;
      case 'Women and Health':
        return <HeartPulse className="w-4 h-4 text-[#C5A059]" />;
      default:
        return <Activity className="w-4 h-4 text-[#C5A059]" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-serif text-xl font-bold text-[#1B3B2B]">
            Supported Conditions CMS ({initialConditions.length} Points)
          </h2>
          <p className="text-xs text-[#586962] mt-0.5">
            Organize health conditions by category: Pain, Stress, Digestive, Respiratory, and Women and Health.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => startNewCondition('Pain')}
            className="px-4 py-2.5 rounded-full bg-[#1B3B2B] text-white text-xs font-medium hover:bg-[#12291E] flex items-center gap-1.5 shadow-sm transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Condition</span>
          </button>
        </div>
      </div>

      {/* Category Filter Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
        <button
          onClick={() => setSelectedTab('all')}
          className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
            selectedTab === 'all'
              ? 'bg-[#1B3B2B] text-white shadow-sm'
              : 'bg-[#EEE4D8] text-[#586962] hover:bg-[#E6DFD3] hover:text-[#1B3B2B]'
          }`}
        >
          All Categories ({initialConditions.length})
        </button>
        {allCategories.map((cat) => {
          const count = categoryMap.get(cat)?.length || 0;
          const isActive = selectedTab.toLowerCase() === cat.toLowerCase();
          return (
            <button
              key={cat}
              onClick={() => setSelectedTab(cat)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap flex items-center gap-1.5 transition-all ${
                isActive
                  ? 'bg-[#1B3B2B] text-white shadow-sm'
                  : 'bg-[#EEE4D8] text-[#586962] hover:bg-[#E6DFD3] hover:text-[#1B3B2B]'
              }`}
            >
              <span>{cat}</span>
              <span
                className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                  isActive ? 'bg-white/20 text-white' : 'bg-[#E6DFD3] text-[#1B3B2B]'
                }`}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Category Sections */}
      <div className="space-y-8">
        {displayCategories.map((catName) => {
          const items = categoryMap.get(catName) || [];

          return (
            <div
              key={catName}
              className="bg-[#FAF2EB] rounded-3xl p-5 sm:p-6 border border-[#E6DFD3] shadow-sm space-y-4"
            >
              {/* Category Header with + Add Point button */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#E6DFD3]">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-xl bg-[#EEE4D8] border border-[#E6DFD3]">
                    {getCategoryIcon(catName)}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-serif text-lg font-bold text-[#1B3B2B]">{catName}</h3>
                      <span className="text-[11px] font-semibold text-[#C5A059] bg-[#EEE4D8] px-2.5 py-0.5 rounded-full border border-[#E6DFD3]">
                        {items.length} {items.length === 1 ? 'Point' : 'Points'}
                      </span>
                    </div>
                    <p className="text-[11px] text-[#586962]">
                      Conditions & functional concerns under {catName}
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => startNewCondition(catName)}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#1B3B2B] text-white text-xs font-semibold hover:bg-[#12291E] transition-colors self-start sm:self-auto"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Point to {catName}</span>
                </button>
              </div>

              {/* Items List Inside This Category */}
              {items.length === 0 ? (
                <div className="py-8 text-center bg-[#EEE4D8]/50 rounded-2xl border border-dashed border-[#E6DFD3] space-y-2">
                  <p className="text-xs text-[#586962]">
                    No condition points added under <span className="font-bold">{catName}</span> yet.
                  </p>
                  <button
                    onClick={() => startNewCondition(catName)}
                    className="inline-flex items-center gap-1.5 text-xs text-[#C5A059] hover:text-[#1B3B2B] font-semibold underline underline-offset-2"
                  >
                    <FolderPlus className="w-3.5 h-3.5" />
                    <span>Add the first condition point</span>
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                  {items.map((item) => (
                    <div
                      key={item.id}
                      className="p-4 bg-[#EEE4D8] rounded-2xl border border-[#E6DFD3] flex flex-col justify-between gap-3 hover:border-[#C5A059]/40 transition-colors"
                    >
                      <div className="flex items-start gap-3">
                        {/* Thumbnail if present */}
                        {item.image_url ? (
                          <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-[#FAF6F0] border border-[#E6DFD3] shrink-0">
                            <ImageFallback
                              src={item.image_url}
                              alt={item.title}
                              width={48}
                              height={48}
                              aspectRatio="square"
                              className="w-full h-full"
                            />
                          </div>
                        ) : (
                          <div className="w-12 h-12 rounded-xl bg-[#FAF6F0] border border-[#E6DFD3] shrink-0 flex items-center justify-center">
                            <span className="w-2 h-2 rounded-full bg-[#C5A059]" />
                          </div>
                        )}

                        <div className="space-y-0.5 min-w-0 flex-1">
                          <div className="flex items-center justify-between gap-2 flex-wrap">
                            <span className="text-xs text-[#586962] font-mono">/{item.slug}</span>
                            {item.is_published ? (
                              <span className="text-[10px] bg-emerald-100 text-emerald-800 border border-emerald-300 px-2 py-0.2 rounded font-semibold">
                                Live
                              </span>
                            ) : (
                              <span className="text-[10px] bg-gray-200 text-gray-700 px-2 py-0.2 rounded font-semibold">
                                Draft
                              </span>
                            )}
                          </div>
                          <h4 className="font-serif text-base font-bold text-[#1B3B2B] pt-0.5">
                            {item.title}
                          </h4>
                          <p className="text-xs text-[#586962] line-clamp-2">
                            {item.short_description || 'No description provided.'}
                          </p>
                        </div>
                      </div>

                      {/* Footer Actions */}
                      <div className="flex items-center justify-between gap-2 pt-2.5 border-t border-[#E6DFD3]/80">
                        <span className="text-[10px] text-[#586962]">
                          Order: <span className="font-mono">{item.display_order || 0}</span>
                        </span>
                        <div className="flex items-center gap-1.5">
                          <button
                            onClick={() => startEditCondition(item)}
                            className="p-1.5 rounded-lg bg-[#FAF2EB] border border-[#E6DFD3] text-[#1B3B2B] hover:text-[#C5A059] transition-colors"
                            aria-label="Edit Condition Point"
                            title="Edit Point"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleDelete(item.id)}
                            className="p-1.5 rounded-lg bg-[#FAF2EB] border border-[#E6DFD3] text-red-600 hover:bg-red-50 transition-colors"
                            aria-label="Delete Condition Point"
                            title="Delete Point"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Edit / Create Condition Modal Form */}
      {editingCondition && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#12291E]/60 backdrop-blur-sm">
          <div className="bg-[#FAF2EB] rounded-3xl p-6 sm:p-8 max-w-2xl w-full shadow-2xl space-y-6 border border-[#E6DFD3] max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-[#E6DFD3] pb-4">
              <h3 className="font-serif text-xl font-bold text-[#1B3B2B]">
                {editingCondition.id ? 'Edit Condition Point' : 'Add Condition Point'}
              </h3>
              <button
                onClick={() => setEditingCondition(null)}
                className="text-[#586962] hover:text-[#1B3B2B] transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleFormSubmit} className="space-y-4">
              {editingCondition.id && <input type="hidden" name="id" value={editingCondition.id} />}
              <input type="hidden" name="image_url" value={imageUrl || ''} />

              {saveError && (
                <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-medium">
                  {saveError}
                </div>
              )}

              {/* Category Selector */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#1B3B2B] mb-1">
                  Category
                </label>
                <select
                  name="category"
                  defaultValue={normalizeCategory(editingCondition.category)}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#EEE4D8] border border-[#E6DFD3] text-sm font-semibold text-[#1B3B2B]"
                >
                  {STANDARD_CATEGORIES.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
                <p className="text-[11px] text-[#586962] mt-1">
                  Assign this point to Pain, Stress, Digestive, Respiratory, or Women and Health.
                </p>
              </div>

              {/* Title & Slug */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#1B3B2B] mb-1">
                    Point Title
                  </label>
                  <input
                    type="text"
                    name="title"
                    required
                    placeholder="e.g. Low Back Pain, Sciatica, IBS"
                    defaultValue={editingCondition.title}
                    onChange={(e) => {
                      if (!editingCondition.id) {
                        const slug = e.target.value
                          .toLowerCase()
                          .replace(/[^a-z0-9]+/g, '-')
                          .replace(/(^-|-$)/g, '');
                        const slugInput = document.querySelector(
                          'input[name="slug"]'
                        ) as HTMLInputElement;
                        if (slugInput) slugInput.value = slug;
                      }
                    }}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#EEE4D8] border border-[#E6DFD3] text-sm text-[#1B3B2B]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#1B3B2B] mb-1">
                    URL Slug
                  </label>
                  <input
                    type="text"
                    name="slug"
                    required
                    placeholder="e.g. low-back-pain"
                    defaultValue={editingCondition.slug}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#EEE4D8] border border-[#E6DFD3] text-sm font-mono text-[#1B3B2B]"
                  />
                </div>
              </div>

              {/* Short Description */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#1B3B2B] mb-1">
                  Short Description (Shown on card & summary)
                </label>
                <textarea
                  name="short_description"
                  required
                  rows={2}
                  placeholder="Concise overview of how acupuncture supports this condition..."
                  defaultValue={editingCondition.short_description}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#EEE4D8] border border-[#E6DFD3] text-xs text-[#1B3B2B]"
                />
              </div>

              {/* Full Description */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#1B3B2B] mb-1">
                  Full Description (Shown on detail page)
                </label>
                <textarea
                  name="full_description"
                  rows={4}
                  placeholder="Detailed explanation of supportive care, clinical rationale, and treatment expectations..."
                  defaultValue={editingCondition.full_description}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#EEE4D8] border border-[#E6DFD3] text-xs text-[#1B3B2B]"
                />
              </div>

              {/* Order & Status */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#1B3B2B] mb-1">
                    Display Order
                  </label>
                  <input
                    type="number"
                    name="display_order"
                    defaultValue={editingCondition.display_order || 0}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#EEE4D8] border border-[#E6DFD3] text-sm text-[#1B3B2B]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#1B3B2B] mb-1">
                    Publication Status
                  </label>
                  <select
                    name="is_published"
                    defaultValue={editingCondition.is_published ? 'true' : 'false'}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#EEE4D8] border border-[#E6DFD3] text-sm text-[#1B3B2B]"
                  >
                    <option value="true">Published (Live on Website)</option>
                    <option value="false">Unpublished (Draft / Hidden)</option>
                  </select>
                </div>
              </div>

              {/* Image Uploader */}
              <ImageUploader
                currentUrl={imageUrl}
                onUploadSuccess={(url) => setImageUrl(url)}
                label="Condition Thumbnail Image (Cloudinary)"
              />

              {/* Form Buttons */}
              <div className="flex justify-end gap-3 pt-4 border-t border-[#E6DFD3]">
                <button
                  type="button"
                  onClick={() => setEditingCondition(null)}
                  disabled={isSaving}
                  className="px-4 py-2.5 rounded-full border border-[#E6DFD3] text-xs font-medium text-[#586962] disabled:opacity-50 hover:bg-[#EEE4D8] transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSaving}
                  className="px-6 py-2.5 rounded-full bg-[#1B3B2B] text-white text-xs font-medium hover:bg-[#12291E] flex items-center gap-1.5 disabled:opacity-50 transition-colors shadow-sm"
                >
                  {isSaving ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Save className="w-4 h-4" />
                  )}
                  <span>{isSaving ? 'Saving...' : 'Save Condition Point'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
