# Abdul Ahad: Portfolio

Personal site built with Next.js 14 (App Router), TypeScript and plain SCSS.

## Run it

```bash
npm install
npm run dev        # http://localhost:3000
npm run build && npm start
npm run lint
npm run typecheck
```

Requires Node 20 or newer.

## Where things live

| What | File |
|---|---|
| Name, contact details, intro, About text | `data/profile.ts` |
| Jobs | `data/experience.ts` |
| Projects | `data/projects.ts` |
| Skills | `data/skills.ts` |
| Education | `data/education.ts` |
| Styles and colours (light and dark) | `styles/globals.scss` |
| Résumé PDF | `public/Abdul_Ahad_DevOps_Resume.pdf` |

To update the résumé, replace the PDF and keep the same filename (or change `RESUME_PATH` in `lib/constants.ts`).

## Contact form

The form posts to `/api/contact`, which sends email through [Resend](https://resend.com). Set these in `.env.local` or in your host's environment settings:

- `RESEND_API_KEY`: required for the form to send.
- `CONTACT_TO_EMAIL`: inbox to deliver to (defaults to the email in `data/profile.ts`).
- `CONTACT_FROM_EMAIL`: sender on a domain you have verified in Resend.

Without a key, the form says it can't send and offers to open the visitor's email app with the message filled in. It never reports success unless the email was accepted. The endpoint validates input, caps lengths, rate-limits to 5 messages per IP per 10 minutes, and has a hidden honeypot field to catch bots.

## Deploy (Vercel)

1. Push the repo to GitHub and import it in Vercel.
2. Add the environment variables above, plus `NEXT_PUBLIC_SITE_URL` once you have a domain.
3. Deploy.
