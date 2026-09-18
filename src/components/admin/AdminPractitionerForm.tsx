'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Save, Edit2, Trash2, Plus, X, Loader2, AlertCircle, User, CheckCircle2, Eye, EyeOff, AlertTriangle, ArrowLeft } from 'lucide-react';
import { Practitioner } from '@/lib/types';
import { updatePractitionerAction, deletePractitionerAction } from '@/lib/actions/admin';
import ImageUploader from './ImageUploader';

interface AdminPractitionerFormProps {
  practitioners?: Practitioner[];
  practitioner?: Practitioner;
}

export default function AdminPractitionerForm({
  practitioners: initialList,
  practitioner: singlePractitioner,
}: AdminPractitionerFormProps) {
  const router = useRouter();

  // Normalize initial list
  const defaultList = initialList && initialList.length > 0
    ? initialList
    : singlePractitioner
    ? [singlePractitioner]
    : [];

  const [practitionersList, setPractitionersList] = useState<Practitioner[]>(defaultList);
  const [editingPractitioner, setEditingPractitioner] = useState<Partial<Practitioner> | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [profileUrl, setProfileUrl] = useState<string | null>(null);
  const [qualificationsText, setQualificationsText] = useState<string>('');
  const [isSaving, setIsSaving] = useState(false);
  const [deletingPractitioner, setDeletingPractitioner] = useState<Practitioner | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);

  const cancelEdit = (shouldPopHistory = true) => {
    setEditingPractitioner(null);
    setIsNew(false);
    setProfileUrl(null);
    setQualificationsText('');
    setSaveError(null);

    if (typeof window !== 'undefined') {
      if (shouldPopHistory && window.history.state?.formOpen) {
        window.history.back();
      } else if (window.location.search.includes('action=')) {
        window.history.replaceState({}, '', window.location.pathname);
      }
    }
  };

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Check if opened via URL query params on initial load
    const params = new URLSearchParams(window.location.search);
    const action = params.get('action');
    const id = params.get('id');

    if (action === 'new') {
      setIsNew(true);
      setEditingPractitioner({
        id: '',
        full_name: '',
        title: 'Acupuncture & Naturopathy Specialist',
        qualifications: [],
        bio: '',
        profile_image_url: null,
        profile_image_alt: '',
        display_order: defaultList.length + 1,
        is_active: true,
      });
      setProfileUrl(null);
      setQualificationsText('');
    } else if (action === 'edit' && id) {
      const found = defaultList.find((p) => p.id === id);
      if (found) {
        setIsNew(false);
        setEditingPractitioner(found);
        setProfileUrl(found.profile_image_url || null);
        setQualificationsText(
          Array.isArray(found.qualifications) ? found.qualifications.join('\n') : ''
        );
      }
    }

    const handlePopState = () => {
      // Browser back button was pressed - close the form and return to practitioners list
      cancelEdit(false);
    };

    window.addEventListener('popstate', handlePopState);
    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);

  const startAddNew = () => {
    if (typeof window !== 'undefined') {
      window.history.pushState({ formOpen: true, action: 'new' }, '', '?action=new');
    }
    setIsNew(true);
    setEditingPractitioner({
      id: '',
      full_name: '',
      title: 'Acupuncture & Naturopathy Specialist',
      qualifications: [],
      bio: '',
      profile_image_url: null,
      profile_image_alt: '',
      display_order: practitionersList.length + 1,
      is_active: true,
    });
    setProfileUrl(null); // No fixed/prefilled photo
    setQualificationsText('');
    setSaveError(null);
  };

  const startEdit = (p: Practitioner) => {
    if (typeof window !== 'undefined') {
      window.history.pushState({ formOpen: true, action: 'edit', id: p.id }, '', `?action=edit&id=${p.id}`);
    }
    setIsNew(false);
    setEditingPractitioner(p);
    setProfileUrl(p.profile_image_url || null); // Only use what is actually saved
    setQualificationsText(
      Array.isArray(p.qualifications) ? p.qualifications.join('\n') : ''
    );
    setSaveError(null);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSaving(true);
    setSaveError(null);

    try {
      const formData = new FormData(e.currentTarget);
      
      const qualsArray = qualificationsText
        .split('\n')
        .map((q) => q.trim())
        .filter(Boolean);
      
      formData.set('qualifications', JSON.stringify(qualsArray));
      formData.set('profile_image_url', (profileUrl || '').trim());

      const res = await updatePractitionerAction(formData);

      if (res?.practitioner) {
        if (isNew) {
          setPractitionersList((prev) => [...prev, res.practitioner]);
        } else {
          setPractitionersList((prev) =>
            prev.map((item) =>
              item.id === res.practitioner.id || item.id === editingPractitioner?.id
                ? res.practitioner
                : item
            )
          );
        }
      }

      if (typeof window !== 'undefined' && window.location.search.includes('action=')) {
        window.history.replaceState({}, '', window.location.pathname);
      }
      cancelEdit(false);
      router.refresh();
    } catch (err: unknown) {
      setSaveError(err instanceof Error ? err.message : 'Failed to save practitioner profile');
    } finally {
      setIsSaving(false);
    }
  };

  const confirmDelete = async () => {
    if (!deletingPractitioner) return;
    setIsDeleting(true);

    try {
      if (deletingPractitioner.id && deletingPractitioner.id !== 'default') {
        await deletePractitionerAction(deletingPractitioner.id);
      }
      setPractitionersList((prev) => prev.filter((item) => item.id !== deletingPractitioner.id));
      if (editingPractitioner?.id === deletingPractitioner.id) {
        cancelEdit(true);
      }
      setDeletingPractitioner(null);
      router.refresh();
    } catch (err: unknown) {
      alert(err instanceof Error ? err.message : 'Failed to delete practitioner');
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* ─── CUSTOM CONFIRMATION POPUP MODAL (NO BROWSER ALERT) ────────────────── */}
      {deletingPractitioner && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-[#FAF2EB] rounded-3xl p-6 sm:p-8 max-w-md w-full border border-[#E6DFD3] shadow-2xl space-y-5">
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-2xl bg-red-100 border border-red-200 text-red-600 flex items-center justify-center shrink-0">
                <AlertTriangle className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-serif text-lg font-bold text-[#1B3B2B]">
                  Delete Practitioner
                </h3>
                <p className="text-xs text-[#586962] mt-0.5">
                  Confirm profile removal
                </p>
              </div>
            </div>

            <p className="text-sm text-[#2C3531] leading-relaxed">
              Are you sure you want to remove <span className="font-bold text-[#1B3B2B]">“{deletingPractitioner.full_name}”</span>? This practitioner will be permanently deleted from the database and removed from all website pages.
            </p>

            <div className="flex items-center justify-end gap-3 pt-3 border-t border-[#E6DFD3]">
              <button
                type="button"
                onClick={() => setDeletingPractitioner(null)}
                disabled={isDeleting}
                className="px-5 py-2.5 rounded-full border border-[#E6DFD3] text-xs font-semibold text-[#586962] hover:bg-[#EEE4D8] transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={confirmDelete}
                disabled={isDeleting}
                className="px-5 py-2.5 rounded-full bg-red-600 hover:bg-red-700 text-white text-xs font-semibold shadow-sm transition-all flex items-center gap-2 cursor-pointer disabled:opacity-60"
              >
                {isDeleting ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    <span>Removing...</span>
                  </>
                ) : (
                  <>
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Yes, Delete</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Action Bar / Controls (Only show when NOT editing/adding) */}
      {!editingPractitioner && (
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="font-serif text-xl font-bold text-[#1B3B2B]">
              All Practitioners ({practitionersList.length})
            </h2>
            <p className="text-xs text-[#586962] mt-0.5">
              Add, update, or reorganize clinic doctors & healthcare practitioners.
            </p>
          </div>

          <button
            type="button"
            onClick={startAddNew}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#1B3B2B] hover:bg-[#12291E] text-white text-xs font-semibold shadow-sm transition-all self-start sm:self-auto cursor-pointer"
          >
            <Plus className="w-4 h-4 text-[#C5A059]" />
            <span>Add New Practitioner</span>
          </button>
        </div>
      )}

      {/* ─── ADD / EDIT FORM MODAL / PANEL ─────────────────────────────────────── */}
      {editingPractitioner && (
        <form
          onSubmit={handleSubmit}
          className="bg-[#EEE4D8] rounded-3xl p-6 sm:p-8 border-2 border-[#C5A059]/40 shadow-lg space-y-6 transition-all"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#E6DFD3] pb-4">
            <div>
              <button
                type="button"
                onClick={() => cancelEdit(true)}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#1B3B2B] hover:text-[#C5A059] mb-2.5 transition-colors cursor-pointer group"
              >
                <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1 text-[#C5A059]" />
                <span>← Back to Practitioners</span>
              </button>
              <div className="flex items-center gap-2">
                <span className="text-[10px] uppercase tracking-widest text-[#C5A059] font-bold">
                  {isNew ? 'New Entry' : 'Editing Profile'}
                </span>
              </div>
              <h2 className="font-serif text-xl font-bold text-[#1B3B2B] mt-0.5">
                {isNew ? 'Add New Practitioner' : `Edit: ${editingPractitioner.full_name || 'Practitioner'}`}
              </h2>
              <p className="text-xs text-[#586962] mt-0.5">
                Fill in the professional qualifications, credentials, bio, and portrait photo.
              </p>
            </div>
            <button
              type="button"
              onClick={() => cancelEdit(true)}
              className="p-2 rounded-xl bg-[#FAF2EB] border border-[#E6DFD3] text-[#586962] hover:text-red-600 hover:bg-red-50 transition-colors cursor-pointer self-end sm:self-center"
              aria-label="Back to practitioners"
              title="Back to Practitioners"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {saveError && (
            <div className="flex items-center gap-3 p-4 bg-red-50 border border-red-200 rounded-2xl text-red-800">
              <AlertCircle className="w-5 h-5 shrink-0 text-red-600" />
              <p className="text-sm font-medium">{saveError}</p>
            </div>
          )}

          {editingPractitioner.id &&
            editingPractitioner.id !== 'default' &&
            !editingPractitioner.id.startsWith('temp-') && (
              <input type="hidden" name="id" value={editingPractitioner.id} />
            )}
          <input type="hidden" name="profile_image_url" value={profileUrl || ''} />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#1B3B2B] mb-1.5">
                Full Name <span className="text-red-600">*</span>
              </label>
              <input
                type="text"
                name="full_name"
                defaultValue={editingPractitioner.full_name || ''}
                placeholder="e.g. Dr. Jane Doe"
                required
                className="w-full px-4 py-3 rounded-xl bg-[#FAF2EB] border border-[#E6DFD3] text-sm text-[#2C3531] focus:ring-2 focus:ring-[#C5A059] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#1B3B2B] mb-1.5">
                Clinical Title <span className="text-red-600">*</span>
              </label>
              <input
                type="text"
                name="title"
                defaultValue={editingPractitioner.title || ''}
                placeholder="e.g. Associate Naturopathy Specialist"
                required
                className="w-full px-4 py-3 rounded-xl bg-[#FAF2EB] border border-[#E6DFD3] text-sm text-[#2C3531] focus:ring-2 focus:ring-[#C5A059] focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#1B3B2B] mb-1.5">
                Display Order
              </label>
              <input
                type="number"
                name="display_order"
                defaultValue={editingPractitioner.display_order ?? practitionersList.length + 1}
                min={0}
                className="w-full px-4 py-3 rounded-xl bg-[#FAF2EB] border border-[#E6DFD3] text-sm text-[#2C3531] focus:ring-2 focus:ring-[#C5A059] focus:outline-none"
              />
              <p className="text-[11px] text-[#586962] mt-1">
                Lower numbers appear first on the website (e.g. 1, 2, 3).
              </p>
            </div>

            <div className="flex flex-col justify-center">
              <label className="block text-xs font-bold uppercase tracking-wider text-[#1B3B2B] mb-2">
                Visibility Status
              </label>
              <label className="flex items-center gap-3 cursor-pointer select-none bg-[#FAF2EB] p-3 rounded-xl border border-[#E6DFD3]">
                <input
                  type="checkbox"
                  name="is_active"
                  value="true"
                  defaultChecked={editingPractitioner.is_active !== false}
                  className="w-4 h-4 rounded text-[#1B3B2B] focus:ring-[#C5A059]"
                />
                <span className="text-xs font-medium text-[#2C3531]">
                  Active (Display on website)
                </span>
              </label>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#1B3B2B] mb-1.5">
              Qualifications (One degree / credential per line)
            </label>
            <textarea
              rows={3}
              value={qualificationsText}
              onChange={(e) => setQualificationsText(e.target.value)}
              placeholder="Bachelor of Naturopathy and Yogic Sciences (BNYS)&#10;Master Degree in Naturopathy (MD)&#10;Master Degree in Acupuncture"
              className="w-full px-4 py-3 rounded-xl bg-[#FAF2EB] border border-[#E6DFD3] text-sm text-[#2C3531] leading-relaxed focus:ring-2 focus:ring-[#C5A059] focus:outline-none"
            />
            <p className="text-[11px] text-[#586962] mt-1">
              Enter each medical qualification or certification on a separate line.
            </p>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#1B3B2B] mb-1.5">
              Practitioner Bio / Clinical Philosophy <span className="text-red-600">*</span>
            </label>
            <textarea
              rows={4}
              name="bio"
              defaultValue={editingPractitioner.bio || ''}
              placeholder="A patient-focused clinical approach centered on understanding the individual..."
              required
              className="w-full px-4 py-3 rounded-xl bg-[#FAF2EB] border border-[#E6DFD3] text-sm text-[#2C3531] leading-relaxed focus:ring-2 focus:ring-[#C5A059] focus:outline-none"
            />
          </div>

          {/* Direct Photo URL and Preview */}
          <div className="p-4 bg-[#FAF2EB] rounded-2xl border border-[#E6DFD3] space-y-4">
            <div className="flex items-center justify-between">
              <label className="block text-xs font-bold uppercase tracking-wider text-[#1B3B2B]">
                Profile Photo (Optional)
              </label>
              <span className="text-[11px] text-[#586962]">
                Only the photo you upload or add will be shown
              </span>
            </div>

            {/* Live photo preview: ONLY shows when profileUrl is provided */}
            <div className="flex items-center gap-4">
              <div className="w-20 h-20 rounded-full ring-3 ring-[#C5A059] overflow-hidden bg-white shrink-0 shadow-sm flex items-center justify-center">
                {profileUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={profileUrl}
                    alt="Doctor preview"
                    className="w-full h-full object-cover"
                    onError={() => setProfileUrl(null)}
                  />
                ) : (
                  <User className="w-9 h-9 text-[#A0907A]/70" />
                )}
              </div>
              <div className="flex-1 min-w-0 space-y-1">
                <p className="text-xs font-semibold text-[#1B3B2B]">
                  {profileUrl ? 'Photo Added' : 'No Photo Selected (Avatar icon will be displayed)'}
                </p>
                <input
                  type="text"
                  value={profileUrl || ''}
                  onChange={(e) => setProfileUrl(e.target.value.trim() || null)}
                  placeholder="Paste direct image URL or upload below..."
                  className="w-full px-3 py-2 rounded-xl bg-[#EEE4D8] border border-[#E6DFD3] text-xs font-mono text-[#2C3531] focus:ring-2 focus:ring-[#C5A059] focus:outline-none"
                />
                {profileUrl && (
                  <button
                    type="button"
                    onClick={() => setProfileUrl(null)}
                    className="text-[11px] text-red-600 hover:underline inline-block pt-0.5 cursor-pointer"
                  >
                    Remove Photo
                  </button>
                )}
              </div>
            </div>

            <ImageUploader
              currentUrl={profileUrl}
              onUploadSuccess={(url) => setProfileUrl(url)}
              label="Upload Photo File (Cloudinary / Device)"
              helperText="Upload an image from your computer or phone."
            />
          </div>

          <div className="pt-4 flex items-center justify-end gap-3 border-t border-[#E6DFD3]">
            <button
              type="button"
              onClick={() => cancelEdit(true)}
              className="px-5 py-2.5 rounded-full border border-[#E6DFD3] text-xs font-semibold text-[#586962] hover:bg-[#DED5C5] transition-colors cursor-pointer flex items-center gap-1.5"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Practitioners</span>
            </button>
            <button
              type="submit"
              disabled={isSaving}
              className="px-6 py-3 rounded-full bg-[#1B3B2B] hover:bg-[#12291E] disabled:opacity-60 text-white text-xs font-semibold transition-all shadow-md flex items-center gap-2 cursor-pointer"
            >
              {isSaving ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Save className="w-4 h-4 text-[#C5A059]" />
              )}
              <span>{isSaving ? 'Saving...' : isNew ? 'Create Practitioner' : 'Save Changes'}</span>
            </button>
          </div>
        </form>
      )}

      {/* ─── PRACTITIONER CARDS LIST: ONLY SHOWN WHEN NOT ADDING/EDITING ───────── */}
      {!editingPractitioner && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {practitionersList.map((p, index) => {
            return (
              <div
                key={p.id || `practitioner-${index}`}
                className="bg-[#EEE4D8] rounded-3xl border border-[#E6DFD3] overflow-hidden shadow-sm flex flex-col justify-between transition-all"
              >
                {/* Card Header */}
                <div className="flex items-center justify-between px-5 py-3.5 border-b border-[#E6DFD3] bg-[#FAF2EB]/60">
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-[#1B3B2B] text-[#C5A059] flex items-center justify-center font-bold text-[10px]">
                      {p.display_order ?? index + 1}
                    </span>
                    <span className="text-xs font-bold uppercase tracking-wider text-[#1B3B2B]">
                      Order #{p.display_order ?? index + 1}
                    </span>
                    {p.is_active !== false ? (
                      <span className="px-2 py-0.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-[10px] font-semibold inline-flex items-center gap-1">
                        <Eye className="w-2.5 h-2.5" /> Active
                      </span>
                    ) : (
                      <span className="px-2 py-0.5 rounded-full bg-stone-100 border border-stone-200 text-stone-600 text-[10px] font-semibold inline-flex items-center gap-1">
                        <EyeOff className="w-2.5 h-2.5" /> Hidden
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      onClick={() => startEdit(p)}
                      className="p-2 rounded-xl bg-white border border-[#E6DFD3] text-[#1B3B2B] hover:text-[#C5A059] hover:border-[#C5A059] transition-colors cursor-pointer"
                      title="Edit Practitioner"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>

                    <button
                      type="button"
                      onClick={() => setDeletingPractitioner(p)}
                      className="p-2 rounded-xl bg-white border border-[#E6DFD3] text-[#586962] hover:text-red-600 hover:border-red-200 transition-colors cursor-pointer"
                      title="Delete Practitioner"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-5 flex items-start gap-4 flex-1">
                  {/* Avatar Thumbnail */}
                  <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full ring-3 ring-[#C5A059]/60 ring-offset-2 ring-offset-white overflow-hidden bg-white shrink-0 flex items-center justify-center shadow-sm">
                    {p.profile_image_url ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={p.profile_image_url}
                        alt={p.full_name}
                        className="w-full h-full object-cover object-[center_top] scale-95 rounded-full"
                      />
                    ) : (
                      <User className="w-8 h-8 text-[#A0907A]" />
                    )}
                  </div>

                  {/* Info */}
                  <div className="space-y-1.5 flex-1 min-w-0">
                    <div>
                      <h3 className="font-serif text-base sm:text-lg font-bold text-[#1B3B2B] truncate">
                        {p.full_name}
                      </h3>
                      <p className="text-xs text-[#C5A059] font-medium truncate">
                        {p.title}
                      </p>
                    </div>

                    {/* Qualifications Badges */}
                    <div className="flex flex-wrap gap-1 pt-0.5">
                      {(p.qualifications || []).slice(0, 3).map((qual, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-0.5 rounded-md bg-[#FAF2EB] border border-[#E6DFD3] text-[9px] text-[#2C3531] font-medium truncate max-w-full"
                        >
                          {qual}
                        </span>
                      ))}
                      {(p.qualifications || []).length > 3 && (
                        <span className="text-[9px] text-[#586962] font-semibold self-center">
                          +{p.qualifications.length - 3} more
                        </span>
                      )}
                    </div>

                    <p className="text-xs text-[#586962] line-clamp-2 leading-relaxed pt-1">
                      {p.bio}
                    </p>

                    {p.profile_image_url ? (
                      <div className="pt-1">
                        <span className="text-[10px] text-emerald-700 font-medium inline-flex items-center gap-1">
                          <CheckCircle2 className="w-2.5 h-2.5" /> Photo Configured
                        </span>
                      </div>
                    ) : (
                      <div className="pt-1">
                        <span className="text-[10px] text-stone-500 font-medium inline-flex items-center gap-1">
                          <User className="w-2.5 h-2.5" /> Default Avatar
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
