/**
 * Normalizes phone number to international wa.me format (e.g. "+91 81296 27829" -> "918129627829")
 */
export function normalizeWhatsAppNumber(phone: string): string {
  return phone.replace(/[^0-9]/g, '');
}

export function buildWhatsAppUrl(phone: string, message?: string): string {
  const normalized = normalizeWhatsAppNumber(phone);
  const encodedMessage = message ? encodeURIComponent(message) : '';
  return `https://wa.me/${normalized}${encodedMessage ? `?text=${encodedMessage}` : ''}`;
}
