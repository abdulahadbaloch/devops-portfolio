import { NextResponse } from 'next/server';
import { z } from 'zod';

const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  message: z.string().min(10, 'Message must be at least 10 characters')
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = contactSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Invalid form input', details: parsed.error.format() },
        { status: 400 }
      );
    }

    const { name, email, message } = parsed.data;
    const apiKey = process.env.RESEND_API_KEY;
    const toEmail = process.env.CONTACT_TO_EMAIL || 'abdul12101ahad@gmail.com';

    // If Resend API key is configured, send the email via Resend REST API
    if (apiKey) {
      try {
        const res = await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${apiKey}`
          },
          body: JSON.stringify({
            from: 'Portfolio Contact <onboarding@resend.dev>',
            to: [toEmail],
            reply_to: email,
            subject: `Portfolio Message from ${name}`,
            text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
          })
        });

        if (res.ok) {
          return NextResponse.json({ success: true, method: 'resend' });
        }
      } catch (err) {
        // Fall back gracefully if request fails
      }
    }

    // Graceful fallback: signal client to open prefilled mailto
    const mailtoSubject = encodeURIComponent(`Portfolio Inquiry from ${name}`);
    const mailtoBody = encodeURIComponent(`Hi Abdul,\n\n${message}\n\nFrom: ${name} (${email})`);
    const mailtoUrl = `mailto:${toEmail}?subject=${mailtoSubject}&body=${mailtoBody}`;

    return NextResponse.json({
      success: true,
      fallback: true,
      mailtoUrl,
      message: 'Email service unconfigured. Opening default mail client.'
    });
  } catch (err) {
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
