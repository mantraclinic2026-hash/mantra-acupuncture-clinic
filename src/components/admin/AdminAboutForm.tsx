'use client';

import React, { useState } from 'react';
import { Save, Plus, Trash2, BookOpen, Clock, Edit2, X, Loader2, AlertCircle } from 'lucide-react';
import { AboutContent, TreatmentProcessStep } from '@/lib/types';
import { updateAboutAction, upsertProcessStepAction, deleteProcessStepAction } from '@/lib/actions/admin';

interface AdminAboutFormProps {
  about: AboutContent;
  steps: TreatmentProcessStep[];
}

export default function AdminAboutForm({ about, steps }: AdminAboutFormProps) {
  // About Section State
  const [isEditingAbout, setIsEditingAbout] = useState(false);
  const [currentAbout, setCurrentAbout] = useState<AboutContent>(about);
  const [isSavingAbout, setIsSavingAbout] = useState(false);
  const [aboutError, setAboutError] = useState<string | null>(null);

  // Treatment Process Steps State
  const [editingStep, setEditingStep] = useState<Partial<TreatmentProcessStep> | null>(null);
  const [isSavingStep, setIsSavingStep] = useState(false);
  const [stepError, setStepError] = useState<string | null>(null);

  const paragraphsText = (currentAbout.story_paragraphs || []).join('\n\n');

  const handleAboutSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSavingAbout(true);
    setAboutError(null);
    try {
      const formData = new FormData(e.currentTarget);
      await updateAboutAction(formData);

      const rawParagraphs = formData.get('story_paragraphs')?.toString() || '';
      const paragraphs = rawParagraphs
        .split('\n\n')
        .map((p) => p.trim())
        .filter(Boolean);

      setCurrentAbout((prev) => ({
        ...prev,
        eyebrow: formData.get('eyebrow')?.toString() || prev.eyebrow,
        headline: formData.get('headline')?.toString() || prev.headline,
        learn_more_text: formData.get('learn_more_text')?.toString() || prev.learn_more_text,
        story_paragraphs: paragraphs.length > 0 ? paragraphs : prev.story_paragraphs,
      }));

      setIsEditingAbout(false);
    } catch (err: unknown) {
      setAboutError(err instanceof Error ? err.message : 'Failed to save about section');
    } finally {
      setIsSavingAbout(false);
    }
  };

  const handleStepSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSavingStep(true);
    setStepError(null);
    try {
      const formData = new FormData(e.currentTarget);
      await upsertProcessStepAction(formData);
      setEditingStep(null);
    } catch (err: unknown) {
      setStepError(err instanceof Error ? err.message : 'Failed to save process step');
    } finally {
      setIsSavingStep(false);
    }
  };

  return (
    <div className="space-y-10">
      {/* 1. ABOUT MANTRA MAIN CONTENT SECTION */}
      {!isEditingAbout ? (
        /* PREVIEW CARD */
        <div className="bg-[#EEE4D8] rounded-3xl border border-[#E6DFD3] overflow-hidden">
          <div className="flex items-center justify-between px-6 py-4 border-b border-[#E6DFD3]">
            <div>
              <h2 className="font-serif text-lg font-bold text-[#1B3B2B] flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-[#C5A059]" />
                <span>About Mantra Section</span>
              </h2>
              <p className="text-xs text-[#586962] mt-0.5">
                Homepage clinic narrative & philosophy overview
              </p>
            </div>
            <button
              onClick={() => setIsEditingAbout(true)}
              className="p-2 rounded-xl bg-[#FAF2EB] border border-[#E6DFD3] text-[#1B3B2B] hover:text-[#C5A059] transition-colors"
              aria-label="Edit About Section"
            >
              <Edit2 className="w-4 h-4" />
            </button>
          </div>

          <div className="p-6 space-y-3">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#C5A059] bg-[#FAF2EB] px-2.5 py-1 rounded-full border border-[#E6DFD3]">
              {currentAbout.eyebrow || 'ABOUT MANTRA'}
            </span>
            <h3 className="font-serif text-base sm:text-lg font-bold text-[#1B3B2B]">
              {currentAbout.headline}
            </h3>
            <p className="text-xs text-[#586962] line-clamp-3 leading-relaxed">
              {(currentAbout.story_paragraphs || [])[0] || '—'}
            </p>
            <div className="pt-2 flex items-center gap-2">
              <span className="px-2.5 py-1 rounded-full bg-[#1B3B2B]/10 text-[#1B3B2B] text-[10px] font-medium">
                CTA: {currentAbout.learn_more_text || 'Learn More'}
              </span>
              <span className="px-2.5 py-1 rounded-full bg-[#FAF2EB] border border-[#E6DFD3] text-[#586962] text-[10px] font-medium">
                {(currentAbout.story_paragraphs || []).length} Paragraphs
              </span>
            </div>
          </div>
        </div>
      ) : (
        /* EDIT FORM */
        <form
          onSubmit={handleAboutSubmit}
          className="bg-[#EEE4D8] rounded-3xl p-6 sm:p-8 border border-[#E6DFD3] space-y-6"
        >
          <div className="flex items-center justify-between border-b border-[#E6DFD3] pb-4">
            <div>
              <h2 className="font-serif text-xl font-bold text-[#1B3B2B] flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-[#C5A059]" />
                <span>Edit About Mantra Content</span>
              </h2>
              <p className="text-xs text-[#586962] mt-0.5">
                Configure clinic philosophy story, headline, and button labels.
              </p>
            </div>
            <button
              type="button"
              onClick={() => {
                setIsEditingAbout(false);
                setAboutError(null);
              }}
              className="p-2 rounded-xl bg-[#FAF2EB] border border-[#E6DFD3] text-[#586962] hover:text-red-600 transition-colors"
              aria-label="Cancel editing"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {aboutError && (
            <div className="flex items-center gap-3 p-4 bg-red-50 border border-red-200 rounded-2xl text-red-800">
              <AlertCircle className="w-5 h-5 shrink-0 text-red-600" />
              <p className="text-sm font-medium">{aboutError}</p>
            </div>
          )}

          {currentAbout.id && currentAbout.id !== 'default' && (
            <input type="hidden" name="id" value={currentAbout.id} />
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#1B3B2B] mb-1.5">
                Section Eyebrow / Tag
              </label>
              <input
                type="text"
                name="eyebrow"
                defaultValue={currentAbout.eyebrow || 'ABOUT MANTRA'}
                className="w-full px-4 py-3 rounded-xl bg-[#FAF2EB] border border-[#E6DFD3] text-sm text-[#2C3531]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#1B3B2B] mb-1.5">
                Learn More CTA Text
              </label>
              <input
                type="text"
                name="learn_more_text"
                defaultValue={currentAbout.learn_more_text || 'Learn More'}
                className="w-full px-4 py-3 rounded-xl bg-[#FAF2EB] border border-[#E6DFD3] text-sm text-[#2C3531]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#1B3B2B] mb-1.5">
              Main Headline
            </label>
            <input
              type="text"
              name="headline"
              defaultValue={currentAbout.headline}
              required
              className="w-full px-4 py-3 rounded-xl bg-[#FAF2EB] border border-[#E6DFD3] text-sm font-serif font-bold text-[#1B3B2B]"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#1B3B2B] mb-1.5">
              Story Paragraphs (Separate each paragraph with a blank line)
            </label>
            <textarea
              rows={6}
              name="story_paragraphs"
              defaultValue={paragraphsText}
              required
              className="w-full px-4 py-3 rounded-xl bg-[#FAF2EB] border border-[#E6DFD3] text-sm text-[#2C3531] leading-relaxed"
            />
          </div>

          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={() => {
                setIsEditingAbout(false);
                setAboutError(null);
              }}
              className="px-5 py-3 rounded-full border border-[#E6DFD3] text-sm font-medium text-[#586962] hover:bg-[#DED5C5] transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSavingAbout}
              className="px-6 py-3 rounded-full bg-[#1B3B2B] hover:bg-[#12291E] disabled:opacity-60 text-white text-xs sm:text-sm font-medium transition-all shadow-md flex items-center gap-2"
            >
              {isSavingAbout ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Save className="w-4 h-4" />
              )}
              <span>{isSavingAbout ? 'Saving...' : 'Save About Changes'}</span>
            </button>
          </div>
        </form>
      )}

      {/* 2. TREATMENT PROCESS STEPS CMS */}
      <div className="bg-[#EEE4D8] rounded-3xl p-6 sm:p-8 border border-[#E6DFD3] space-y-6">
        <div className="flex items-center justify-between border-b border-[#E6DFD3] pb-4">
          <div>
            <h2 className="font-serif text-xl font-bold text-[#1B3B2B] flex items-center gap-2">
              <Clock className="w-5 h-5 text-[#C5A059]" />
              <span>Treatment Process Steps ({steps.length})</span>
            </h2>
            <p className="text-xs text-[#586962] mt-0.5">
              The 4 sequential care steps displayed beside the About section.
            </p>
          </div>

          <button
            type="button"
            onClick={() => {
              setEditingStep({
                step_number: steps.length + 1,
                title: '',
                description: '',
                icon_name: 'CheckCircle2',
                display_order: steps.length + 1,
              });
              setStepError(null);
            }}
            className="px-4 py-2 rounded-full bg-[#1B3B2B] text-white text-xs font-medium hover:bg-[#12291E] flex items-center gap-1.5"
          >
            <Plus className="w-4 h-4" />
            <span>Add Step</span>
          </button>
        </div>

        {/* Modal / Step Edit Form */}
        {editingStep && (
          <form
            onSubmit={handleStepSubmit}
            className="bg-[#FAF2EB] p-5 rounded-2xl border border-[#C5A059]/40 space-y-4 shadow-sm"
          >
            <div className="flex items-center justify-between">
              <h3 className="font-serif font-bold text-[#1B3B2B] text-base">
                {editingStep.id ? 'Edit Process Step' : 'New Process Step'}
              </h3>
              <button
                type="button"
                onClick={() => setEditingStep(null)}
                className="p-1.5 text-[#586962] hover:text-red-600 rounded-lg"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {stepError && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-xs text-red-700">
                {stepError}
              </div>
            )}

            {editingStep.id && <input type="hidden" name="id" value={editingStep.id} />}

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#1B3B2B] mb-1">
                  Step #
                </label>
                <input
                  type="number"
                  name="step_number"
                  defaultValue={editingStep.step_number || 1}
                  required
                  className="w-full px-3 py-2 rounded-xl bg-white border border-[#E6DFD3] text-sm text-[#1B3B2B]"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-bold uppercase tracking-wider text-[#1B3B2B] mb-1">
                  Step Title
                </label>
                <input
                  type="text"
                  name="title"
                  defaultValue={editingStep.title || ''}
                  required
                  placeholder="e.g. Consultation"
                  className="w-full px-3 py-2 rounded-xl bg-white border border-[#E6DFD3] text-sm text-[#1B3B2B]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#1B3B2B] mb-1">
                Description
              </label>
              <textarea
                rows={2}
                name="description"
                defaultValue={editingStep.description || ''}
                required
                placeholder="e.g. Understand your concerns, lifestyle and health goals."
                className="w-full px-3 py-2 rounded-xl bg-white border border-[#E6DFD3] text-sm text-[#1B3B2B]"
              />
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setEditingStep(null)}
                className="px-4 py-2 rounded-xl border border-[#E6DFD3] text-xs font-medium text-[#586962] hover:bg-[#EEE4D8]"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSavingStep}
                className="px-4 py-2 rounded-xl bg-[#1B3B2B] text-white text-xs font-medium hover:bg-[#12291E] disabled:opacity-60 flex items-center gap-1.5"
              >
                {isSavingStep ? (
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                ) : (
                  <Save className="w-3.5 h-3.5" />
                )}
                <span>{isSavingStep ? 'Saving...' : 'Save Step'}</span>
              </button>
            </div>
          </form>
        )}

        {/* Existing Steps List */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {steps.map((step) => (
            <div
              key={step.id}
              className="bg-[#FAF2EB] p-4 rounded-2xl border border-[#E6DFD3] flex items-start justify-between gap-3"
            >
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-[#1B3B2B] text-[#C5A059] flex items-center justify-center font-bold text-xs shrink-0">
                  {step.step_number}
                </div>
                <div>
                  <h4 className="font-serif font-bold text-[#1B3B2B] text-sm sm:text-base">
                    {step.title}
                  </h4>
                  <p className="text-xs text-[#586962] mt-0.5 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1 shrink-0">
                <button
                  type="button"
                  onClick={() => {
                    setEditingStep(step);
                    setStepError(null);
                  }}
                  className="px-2.5 py-1 text-xs text-[#1B3B2B] hover:bg-[#EAE3D5] rounded-lg font-medium"
                >
                  Edit
                </button>
                {step.id && !step.id.startsWith('default') && (
                  <button
                    type="button"
                    onClick={async () => {
                      if (confirm('Delete this step?')) {
                        await deleteProcessStepAction(step.id);
                      }
                    }}
                    className="p-1 text-red-500 hover:text-red-700"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
