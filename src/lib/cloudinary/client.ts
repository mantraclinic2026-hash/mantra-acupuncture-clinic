import { v2 as cloudinary } from 'cloudinary';
export { getOptimizedImageUrl } from './url';

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

export { cloudinary };

/**
 * Server-only helper to generate signed upload parameters for Cloudinary
 */
export function generateCloudinarySignature(folder: string = 'mantra_acupuncture') {
  const timestamp = Math.round(new Date().getTime() / 1000);
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  const apiKey = process.env.CLOUDINARY_API_KEY;
  const apiSecret = process.env.CLOUDINARY_API_SECRET;

  if (!apiSecret || !apiKey || !cloudName) {
    throw new Error('Cloudinary credentials missing on server');
  }

  const paramsToSign = {
    timestamp,
    folder,
  };

  const signature = cloudinary.utils.api_sign_request(paramsToSign, apiSecret);

  return {
    timestamp,
    signature,
    apiKey,
    cloudName,
    folder,
  };
}

/**
 * Server-only helper to delete an image asset from Cloudinary by public ID
 */
export async function deleteCloudinaryImage(publicId: string): Promise<boolean> {
  try {
    if (!publicId) return false;
    const result = await cloudinary.uploader.destroy(publicId);
    return result?.result === 'ok';
  } catch (err) {
    console.error('Failed to delete image from Cloudinary:', err);
    return false;
  }
}
