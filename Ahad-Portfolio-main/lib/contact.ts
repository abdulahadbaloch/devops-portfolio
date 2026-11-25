import { z } from 'zod';

/** Shared by the contact form (client) and /api/contact (server). */
export const contactSchema = z.object({
  name: z.string().trim().min(2, 'Please enter your name.').max(100, 'Name is too long.'),
  email: z.string().trim().email('Please enter a valid email address.').max(200, 'Email is too long.'),
  message: z
    .string()
    .trim()
    .min(10, 'Please write at least 10 characters.')
    .max(5000, 'Message is too long (5,000 characters max).'),
  // Honeypot: real visitors never see or fill this field.
  website: z.string().max(500).optional()
});

export type ContactInput = z.infer<typeof contactSchema>;

export type ContactErrorCode = 'invalid' | 'rate_limited' | 'not_configured' | 'send_failed';

export type ContactResponse =
  | { ok: true }
  | { ok: false; error: ContactErrorCode; fieldErrors?: Partial<Record<keyof ContactInput, string>> };

export function buildMailto(to: string, input: Pick<ContactInput, 'name' | 'email' | 'message'>): string {
  const subject = encodeURIComponent(`Portfolio enquiry from ${input.name}`);
  const body = encodeURIComponent(`${input.message}\n\n${input.name}\n${input.email}`);
  return `mailto:${to}?subject=${subject}&body=${body}`;
}
