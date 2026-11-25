import type { Metadata, Viewport } from 'next';
import { IBM_Plex_Sans, IBM_Plex_Mono } from 'next/font/google';
import { ThemeProvider } from 'next-themes';
import { profileData } from '@/data/profile';
import { getSiteUrl } from '@/lib/constants';
import '@/styles/globals.scss';

const sans = IBM_Plex_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-sans',
  display: 'swap'
});

const mono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-mono',
  display: 'swap'
});

const siteUrl = getSiteUrl();
const pageTitle = `${profileData.name} | ${profileData.title}`;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: pageTitle,
  description: profileData.summary,
  authors: [{ name: profileData.name, url: profileData.linkedIn }],
  creator: profileData.name,
  keywords: ['DevOps Engineer', 'AWS', 'Terraform', 'Kubernetes', 'EKS', 'CI/CD', 'Docker', 'Islamabad'],
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteUrl,
    title: pageTitle,
    description: profileData.summary,
    siteName: profileData.name
  },
  twitter: {
    card: 'summary_large_image',
    title: pageTitle,
    description: profileData.summary
  },
  icons: { icon: { url: '/favicon.svg', type: 'image/svg+xml' } }
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#fafaf8' },
    { media: '(prefers-color-scheme: dark)', color: '#131518' }
  ]
};

const personJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: profileData.name,
  jobTitle: profileData.title,
  description: profileData.summary,
  url: siteUrl,
  email: `mailto:${profileData.email}`,
  sameAs: [profileData.linkedIn],
  address: { '@type': 'PostalAddress', addressLocality: 'Islamabad', addressCountry: 'PK' },
  alumniOf: { '@type': 'CollegeOrUniversity', name: 'Gomal University' },
  knowsAbout: ['AWS', 'Terraform', 'Kubernetes', 'Docker', 'CI/CD', 'Ansible', 'Prometheus', 'Grafana']
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className={`${sans.variable} ${mono.variable}`}>
      <body>
        {/* Marks JS as available so scroll-reveal styles only apply when they can be undone. */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <ThemeProvider attribute="data-theme" defaultTheme="system" enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
