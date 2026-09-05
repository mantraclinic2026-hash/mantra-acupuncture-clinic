'use client';

import React, { useState } from 'react';
import { Upload, Check, AlertCircle, Loader2 } from 'lucide-react';
import ImageFallback from '@/components/public/ImageFallback';

interface ImageUploaderProps {
  currentUrl?: string | null;
  onUploadSuccess: (url: string, publicId?: string) => void;
  label?: string;
}

export default function ImageUploader({
  currentUrl,
  onUploadSuccess,
  label = 'Upload Image to Cloudinary',
}: ImageUploaderProps) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [preview, setPreview] = useState<string | null>(currentUrl || null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setError(null);

    try {
      // 1. Get signed params from server API route
      const signRes = await fetch('/api/cloudinary/sign', { method: 'POST' });
      if (!signRes.ok) {
        throw new Error('Failed to obtain Cloudinary upload signature');
      }

      const signData = await signRes.json();

      // 2. Upload directly to Cloudinary
      const formData = new FormData();
      formData.append('file', file);
      formData.append('api_key', signData.apiKey);
      formData.append('timestamp', signData.timestamp.toString());
      formData.append('signature', signData.signature);
      formData.append('folder', signData.folder);

      const cloudinaryUrl = `https://api.cloudinary.com/v1_1/${signData.cloudName}/image/upload`;
      const uploadRes = await fetch(cloudinaryUrl, {
        method: 'POST',
        body: formData,
      });

      if (!uploadRes.ok) {
        throw new Error('Cloudinary media upload failed');
      }

      const uploadData = await uploadRes.json();
      const secureUrl = uploadData.secure_url;
      const publicId = uploadData.public_id;

      setPreview(secureUrl);
      onUploadSuccess(secureUrl, publicId);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Upload failed');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-3">
      <label className="block text-xs font-bold uppercase tracking-wider text-[#1B3B2B]">
        {label}
      </label>

      {preview && (
        <div className="relative w-40 h-28 rounded-2xl overflow-hidden border border-[#E6DFD3]">
          <ImageFallback src={preview} alt="Uploaded preview" width={160} height={112} aspectRatio="video" />
        </div>
      )}

      {error && (
        <p className="text-xs text-red-600 flex items-center gap-1">
          <AlertCircle className="w-4 h-4" />
          <span>{error}</span>
        </p>
      )}

      <div className="flex items-center gap-3">
        <label className="inline-flex items-center justify-center px-4 py-2 rounded-xl bg-[#1B3B2B] text-white text-xs font-medium cursor-pointer hover:bg-[#12291E] transition-colors focus:ring-2 focus:ring-[#C5A059]">
          {uploading ? (
            <>
              <Loader2 className="w-4 h-4 mr-1.5 animate-spin" />
              <span>Uploading to Cloudinary...</span>
            </>
          ) : (
            <>
              <Upload className="w-4 h-4 mr-1.5" />
              <span>{preview ? 'Change Photo' : 'Select Photo File'}</span>
            </>
          )}
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            disabled={uploading}
            className="hidden"
          />
        </label>

        {preview && (
          <span className="text-xs text-[#25D366] flex items-center gap-1 font-medium">
            <Check className="w-4 h-4" />
            <span>Image Attached</span>
          </span>
        )}
      </div>
    </div>
  );
}
