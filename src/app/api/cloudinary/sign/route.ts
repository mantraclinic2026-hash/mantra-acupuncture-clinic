import { NextResponse } from 'next/server';
import { verifyAdminUser } from '@/lib/supabase/admin-auth';
import { generateCloudinarySignature } from '@/lib/cloudinary/client';

export async function POST() {
  try {
    const { isAdmin } = await verifyAdminUser();
    if (!isAdmin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const signatureData = generateCloudinarySignature('mantra_acupuncture_clinic');
    return NextResponse.json(signatureData);
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Upload signing failed';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
