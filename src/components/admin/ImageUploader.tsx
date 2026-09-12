'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Upload, Check, AlertCircle, Loader2, X, Link as LinkIcon, Image as ImageIcon } from 'lucide-react';
import ImageFallback from '@/components/public/ImageFallback';

interface ImageUploaderProps {
  currentUrl?: string | null;
  onUploadSuccess: (url: string, publicId?: string) => void;
  label?: string;
  helperText?: string;
}

export default function ImageUploader({
  currentUrl,
  onUploadSuccess,
  label = 'Upload Image (Cloudinary or Direct Path)',
  helperText = 'Visible on the public webpage cards and detail pages.',
}: ImageUploaderProps) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [preview, setPreview] = useState<string | null>(currentUrl || null);
  const [urlInput, setUrlInput] = useState<string>(currentUrl || '');
  const [showUrlInput, setShowUrlInput] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const dragCounterRef = useRef(0);

  useEffect(() => {
    setPreview(currentUrl || null);
    setUrlInput(currentUrl || '');
  }, [currentUrl]);

  const uploadFile = async (file: File) => {
    if (!file.type.startsWith('image/')) {
      setError('Please upload a valid image file (PNG, JPG, WEBP, etc.)');
      return;
    }

    setUploading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append('file', file);

      const res = await fetch('/api/admin/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();

      if (!res.ok || !data.url) {
        throw new Error(data.error || 'Upload failed');
      }

      setPreview(data.url);
      setUrlInput(data.url);
      onUploadSuccess(data.url, data.publicId);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Upload failed');
    } finally {
      setUploading(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      uploadFile(file);
    }
    // Reset file input value so re-selecting same file triggers onChange
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  // Drag and drop event handlers
  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    dragCounterRef.current += 1;
    if (e.dataTransfer.items && e.dataTransfer.items.length > 0) {
      setIsDragging(true);
    }
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    dragCounterRef.current -= 1;
    if (dragCounterRef.current <= 0) {
      setIsDragging(false);
      dragCounterRef.current = 0;
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.dataTransfer) {
      e.dataTransfer.dropEffect = 'copy';
    }
    setIsDragging(true);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    dragCounterRef.current = 0;

    const file = e.dataTransfer.files?.[0];
    if (file) {
      uploadFile(file);
    }
  };

  const handleManualUrlApply = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const clean = urlInput.trim();
    setPreview(clean || null);
    onUploadSuccess(clean);
  };

  const handleClear = () => {
    setPreview(null);
    setUrlInput('');
    onUploadSuccess('');
  };

  return (
    <div className="space-y-3">
      {/* Header Label */}
      <div className="flex items-center justify-between">
        <label className="block text-xs font-bold uppercase tracking-wider text-[#1B3B2B]">
          {label}
        </label>
        {helperText && (
          <span className="text-[11px] text-[#586962]">{helperText}</span>
        )}
      </div>

      {/* DRAG & DROP UPLOAD ZONE */}
      <div
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        onClick={() => {
          if (!uploading && fileInputRef.current) {
            fileInputRef.current.click();
          }
        }}
        className={`
          relative
          w-full
          rounded-2xl
          border-2
          border-dashed
          transition-all
          duration-300
          cursor-pointer
          p-5
          flex
          flex-col
          items-center
          justify-center
          text-center
          select-none
          ${
            isDragging
              ? 'border-[#C5A059] bg-[#C5A059]/15 scale-[1.01] ring-4 ring-[#C5A059]/20 shadow-md'
              : 'border-[#E6DFD3] bg-[#FAF2EB]/70 hover:bg-[#FAF2EB] hover:border-[#C5A059]'
          }
          ${uploading ? 'pointer-events-none opacity-80' : ''}
        `}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          disabled={uploading}
          className="hidden"
        />

        {uploading ? (
          <div className="py-4 flex flex-col items-center gap-2 text-[#1B3B2B]">
            <Loader2 className="w-8 h-8 text-[#C5A059] animate-spin" />
            <p className="text-xs font-semibold">Uploading image to Cloudinary...</p>
            <p className="text-[11px] text-[#586962]">Optimizing & storing asset securely</p>
          </div>
        ) : isDragging ? (
          <div className="py-4 flex flex-col items-center gap-2 text-[#1B3B2B]">
            <div className="w-12 h-12 rounded-full bg-[#C5A059] text-white flex items-center justify-center shadow-lg animate-bounce">
              <Upload className="w-6 h-6" />
            </div>
            <p className="text-sm font-serif font-bold text-[#1B3B2B]">
              Drop your image here to upload
            </p>
            <p className="text-xs text-[#586962]">
              File will be uploaded automatically
            </p>
          </div>
        ) : (
          <div className="py-2 flex flex-col items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-[#EEE4D8] border border-[#E6DFD3] text-[#1B3B2B] flex items-center justify-center">
              <Upload className="w-5 h-5 text-[#C5A059]" />
            </div>

            <div className="space-y-0.5">
              <p className="text-xs sm:text-sm font-semibold text-[#1B3B2B]">
                <span className="text-[#C5A059] underline underline-offset-2">Click to browse</span> or drag and drop image here
              </p>
              <p className="text-[11px] text-[#586962]">
                Supports PNG, JPG, WEBP, SVG • Fast Cloudinary processing
              </p>
            </div>
          </div>
        )}
      </div>

      {/* ACTIVE IMAGE PREVIEW CARD */}
      {preview && (
        <div className="flex items-start gap-4 p-3 bg-[#FAF2EB] rounded-2xl border border-[#E6DFD3] shadow-sm">
          <div className="relative w-36 h-24 rounded-xl overflow-hidden bg-[#FAF6F0] border border-[#E6DFD3] shrink-0 flex items-center justify-center">
            <ImageFallback
              src={preview}
              alt="Uploaded preview"
              width={144}
              height={96}
              aspectRatio="auto"
              objectFit={preview.includes('.png') ? 'contain' : 'cover'}
              className="w-full h-full"
              imgClassName="p-1"
            />
          </div>

          <div className="flex-1 min-w-0 space-y-1.5 py-1">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-[#1B3B2B] flex items-center gap-1">
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span>Image Active</span>
              </span>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleClear();
                }}
                className="text-xs text-red-600 hover:text-red-700 flex items-center gap-1 font-medium px-2 py-0.5 rounded hover:bg-red-50 transition-colors"
              >
                <X className="w-3.5 h-3.5" />
                <span>Remove</span>
              </button>
            </div>
            <p className="text-[11px] text-[#586962] font-mono truncate" title={preview}>
              {preview}
            </p>
            <p className="text-[10px] text-emerald-700 font-medium">
              ✓ This image will be rendered on the website cards and detail views.
            </p>
          </div>
        </div>
      )}

      {/* Error display */}
      {error && (
        <p className="text-xs text-red-600 flex items-center gap-1.5 p-2.5 bg-red-50 rounded-xl border border-red-200">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{error}</span>
        </p>
      )}

      {/* Alternative URL / Direct Path Toggle */}
      <div className="flex items-center justify-between pt-1">
        <button
          type="button"
          onClick={() => setShowUrlInput(!showUrlInput)}
          className="inline-flex items-center gap-1.5 text-xs text-[#586962] hover:text-[#1B3B2B] font-medium transition-colors"
        >
          <LinkIcon className="w-3.5 h-3.5" />
          <span>{showUrlInput ? 'Hide manual image URL/path' : 'Or enter custom image path / URL (e.g. /images/acupuncture.png)'}</span>
        </button>
      </div>

      {/* Direct URL or Relative Path input */}
      {showUrlInput && (
        <div className="p-3 bg-[#FAF2EB] rounded-xl border border-[#E6DFD3] space-y-2">
          <label className="block text-[11px] font-semibold text-[#1B3B2B]">
            Direct Image URL or Relative Path:
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              value={urlInput}
              onChange={(e) => setUrlInput(e.target.value)}
              placeholder="e.g. /images/acupuncture.png or https://..."
              className="flex-1 px-3 py-1.5 rounded-lg bg-[#EEE4D8] border border-[#E6DFD3] text-xs text-[#1B3B2B] font-mono"
            />
            <button
              type="button"
              onClick={() => handleManualUrlApply()}
              className="px-3.5 py-1.5 rounded-lg bg-[#1B3B2B] text-white text-xs font-medium hover:bg-[#12291E]"
            >
              Apply
            </button>
          </div>
          <p className="text-[10px] text-[#586962]">
            Tip: You can use existing clinic images like <code className="bg-[#E6DFD3] px-1 rounded">/images/acupuncture.png</code> or paste any Cloudinary/Web image URL.
          </p>
        </div>
      )}
    </div>
  );
}
