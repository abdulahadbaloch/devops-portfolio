'use client';

import { useState, type FormEvent } from 'react';
import { profileData } from '@/data/profile';
import { buildMailto, contactSchema, type ContactInput, type ContactResponse } from '@/lib/contact';

type Status =
  | { kind: 'idle' }
  | { kind: 'sending' }
  | { kind: 'sent' }
  | { kind: 'fallback'; reason: string; mailto: string };

type FieldErrors = Partial<Record<keyof ContactInput, string>>;

const FALLBACK_REASONS: Record<string, string> = {
  not_configured: 'The form can’t send email right now.',
  send_failed: 'Your message couldn’t be sent.',
  rate_limited: 'Too many messages were sent from your connection.',
  network: 'The form couldn’t reach the server.'
};

export default function ContactForm() {
  const [status, setStatus] = useState<Status>({ kind: 'idle' });
  const [errors, setErrors] = useState<FieldErrors>({});

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const values = Object.fromEntries(new FormData(form)) as Record<string, string>;

    const parsed = contactSchema.safeParse(values);
    if (!parsed.success) {
      const flat = parsed.error.flatten().fieldErrors;
      setErrors({ name: flat.name?.[0], email: flat.email?.[0], message: flat.message?.[0] });
      return;
    }

    setErrors({});
    setStatus({ kind: 'sending' });
    const mailto = buildMailto(profileData.email, parsed.data);

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(parsed.data)
      });
      const data = (await res.json()) as ContactResponse;

      if (data.ok) {
        form.reset();
        setStatus({ kind: 'sent' });
        return;
      }
      if (data.error === 'invalid') {
        setErrors(data.fieldErrors ?? {});
        setStatus({ kind: 'idle' });
        return;
      }
      setStatus({ kind: 'fallback', reason: FALLBACK_REASONS[data.error], mailto });
    } catch {
      setStatus({ kind: 'fallback', reason: FALLBACK_REASONS.network, mailto });
    }
  }

  const sending = status.kind === 'sending';

  return (
    <form className="contact-form" onSubmit={handleSubmit} noValidate>
      <div className="field">
        <label htmlFor="contact-name">Name</label>
        <input
          id="contact-name"
          name="name"
          type="text"
          autoComplete="name"
          required
          aria-invalid={Boolean(errors.name)}
          aria-describedby={errors.name ? 'contact-name-error' : undefined}
        />
        {errors.name && (
          <p id="contact-name-error" className="field-error">
            {errors.name}
          </p>
        )}
      </div>

      <div className="field">
        <label htmlFor="contact-email">Email</label>
        <input
          id="contact-email"
          name="email"
          type="email"
          autoComplete="email"
          required
          aria-invalid={Boolean(errors.email)}
          aria-describedby={errors.email ? 'contact-email-error' : undefined}
        />
        {errors.email && (
          <p id="contact-email-error" className="field-error">
            {errors.email}
          </p>
        )}
      </div>

      <div className="field">
        <label htmlFor="contact-message">Message</label>
        <textarea
          id="contact-message"
          name="message"
          rows={6}
          required
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? 'contact-message-error' : undefined}
        />
        {errors.message && (
          <p id="contact-message-error" className="field-error">
            {errors.message}
          </p>
        )}
      </div>

      {/* Honeypot, hidden from people and screen readers */}
      <div className="honeypot" aria-hidden="true">
        <label htmlFor="contact-website">Website</label>
        <input id="contact-website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <button type="submit" className="button button-primary" disabled={sending}>
        {sending ? 'Sending…' : 'Send message'}
      </button>

      <div role="status" aria-live="polite">
        {status.kind === 'sent' && (
          <p className="form-note form-note-success">Thanks, your message was sent. I’ll reply by email.</p>
        )}
        {status.kind === 'fallback' && (
          <div className="form-note form-note-warning">
            <p>
              {status.reason} Your message has not been sent yet. You can send it from your own email app
              instead. It will open with your text already filled in.
            </p>
            <a className="button" href={status.mailto}>
              Open in email app
            </a>
          </div>
        )}
      </div>
    </form>
  );
}
