import { NextRequest, NextResponse } from 'next/server';
import { verifyAdminUser } from '@/lib/supabase/admin-auth';
import { cloudinary } from '@/lib/cloudinary/client';
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';

export async function POST(req: NextRequest) {
  try {
    const { isAdmin } = await verifyAdminUser();
    if (!isAdmin) {
      return NextResponse.json({ error: 'Unauthorized: Admin access required.' }, { status: 401 });
    }

    const formData = await req.formData();
    const file = formData.get('file') as File | null;

    if (!file) {
      return NextResponse.json({ error: 'No file provided in request.' }, { status: 400 });
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // 1. Try uploading to Cloudinary via server SDK
    const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
    const apiKey = process.env.CLOUDINARY_API_KEY;
    const apiSecret = process.env.CLOUDINARY_API_SECRET;

    if (cloudName && apiKey && apiSecret) {
      try {
        const uploadResult = await new Promise<{ secure_url: string; public_id: string }>(
          (resolve, reject) => {
            const uploadStream = cloudinary.uploader.upload_stream(
              {
                folder: 'mantra_acupuncture_clinic',
                resource_type: 'image',
              },
              (error, result) => {
                if (error || !result) {
                  reject(error || new Error('Cloudinary upload stream returned empty'));
                } else {
                  resolve({
                    secure_url: result.secure_url,
                    public_id: result.public_id,
                  });
                }
              }
            );
            uploadStream.end(buffer);
          }
        );

        return NextResponse.json({
          success: true,
          url: uploadResult.secure_url,
          publicId: uploadResult.public_id,
          provider: 'cloudinary',
        });
      } catch (cloudinaryErr) {
        console.warn('Cloudinary upload failed, falling back to local storage:', cloudinaryErr);
      }
    }

    // 2. Reliable Fallback: Save directly to public/uploads directory
    const uploadsDir = path.join(process.cwd(), 'public', 'uploads');
    await mkdir(uploadsDir, { recursive: true });

    const safeName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_').toLowerCase();
    const uniqueFileName = `${Date.now()}_${safeName}`;
    const filePath = path.join(uploadsDir, uniqueFileName);

    await writeFile(filePath, buffer);

    const localUrl = `/uploads/${uniqueFileName}`;

    return NextResponse.json({
      success: true,
      url: localUrl,
      provider: 'local',
    });
  } catch (error: unknown) {
    console.error('Upload handler error:', error);
    const message = error instanceof Error ? error.message : 'Internal upload error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
