export const RESUME_PATH = '/Abdul_Ahad_DevOps_Resume.pdf';
export const RESUME_FILENAME = 'Abdul_Ahad_DevOps_Resume.pdf';

export const NAV_ITEMS = [
  { id: 'about', label: 'About' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'skills', label: 'Skills' },
  { id: 'contact', label: 'Contact' }
] as const;

/**
 * Canonical site URL. Set NEXT_PUBLIC_SITE_URL in production.
 * Falls back to Vercel's production/preview URL, then localhost.
 */
export function getSiteUrl(): string {
  if (process.env.NEXT_PUBLIC_SITE_URL) return process.env.NEXT_PUBLIC_SITE_URL.replace(/\/$/, '');
  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  return 'http://localhost:3000';
}
