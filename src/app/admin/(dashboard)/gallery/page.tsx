import React from 'react';
import { createServerSupabaseClient } from '@/lib/supabase/server';
import { GalleryItem } from '@/lib/types';
import GalleryManager from '@/components/admin/GalleryManager';

export default async function AdminGalleryPage() {
  const supabase = await createServerSupabaseClient();
  const { data } = await supabase
    .from('gallery_items')
    .select('*')
    .order('display_order', { ascending: true });

  const items = (data || []) as GalleryItem[];

  return (
    <div className="space-y-8 max-w-5xl">
      <div>
        <h1 className="font-serif text-3xl font-bold text-[#1B3B2B]">
          Gallery CMS
        </h1>
        <p className="text-xs sm:text-sm text-[#586962] mt-1">
          Upload, manage, caption, and organize clinic gallery photos.
        </p>
      </div>

      <GalleryManager initialItems={items} />
    </div>
  );
}
