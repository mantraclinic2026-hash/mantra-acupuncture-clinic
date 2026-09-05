/**
 * Pure string transformation for Cloudinary URLs (Browser Safe - No Node.js 'fs' or SDK dependency)
 */
export function getOptimizedImageUrl(
  url: string | null | undefined,
  options?: { width?: number; height?: number; crop?: string }
): string | null {
  if (!url) return null;

  // Check if it is a Cloudinary URL
  if (url.includes('res.cloudinary.com')) {
    const parts = url.split('/upload/');
    if (parts.length === 2) {
      const transformParams: string[] = ['f_auto', 'q_auto'];
      if (options?.crop) transformParams.push(`c_${options.crop}`);
      if (options?.width) transformParams.push(`w_${options.width}`);
      if (options?.height) transformParams.push(`h_${options.height}`);

      return `${parts[0]}/upload/${transformParams.join(',')}/${parts[1]}`;
    }
  }

  return url;
}

export const getCloudinaryUrl = getOptimizedImageUrl;

