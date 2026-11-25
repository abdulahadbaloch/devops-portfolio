import type { Metadata, Viewport } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import { ThemeProvider } from 'next-themes';
import { profileData } from '@/data/profile';
import { SITE_NAME, SITE_DESCRIPTION } from '@/lib/constants';
import SmoothScrollProvider from '@/components/ui/SmoothScrollProvider';
import ScrollProgressBar from '@/components/ui/ScrollProgressBar';
import CustomCursor from '@/components/ui/CustomCursor';
import '@/styles/globals.scss';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap'
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap'
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL
  ? process.env.NEXT_PUBLIC_SITE_URL
  : process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : 'http://localhost:3000';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${profileData.name} | ${profileData.title}`,
    template: `%s | ${profileData.name}`
  },
  description: profileData.summary,
  authors: [{ name: profileData.name, url: profileData.linkedIn }],
  creator: profileData.name,
  keywords: [
    'DevOps Engineer',
    'Cloud Architect',
    'AWS Infrastructure',
    'Terraform',
    'Kubernetes',
    'EKS',
    'CI/CD Automation',
    'Docker',
    'Ansible',
    'Islamabad Pakistan'
  ],
  alternates: {
    canonical: '/'
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteUrl,
    title: `${profileData.name} | ${profileData.title}`,
    description: profileData.summary,
    siteName: SITE_NAME
  },
  twitter: {
    card: 'summary_large_image',
    title: `${profileData.name} | ${profileData.title}`,
    description: profileData.summary
  },
  icons: {
    icon: '/favicon.ico'
  }
};

export const viewport: Viewport = {
  themeColor: '#070b14',
  width: 'device-width',
  initialScale: 1
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const personJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: profileData.name,
    jobTitle: 'DevOps Engineer | Cloud Architect',
    description: profileData.summary,
    url: siteUrl,
    sameAs: [profileData.linkedIn],
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Islamabad',
      addressCountry: 'Pakistan'
    },
    alumniOf: {
      '@type': 'EducationalOrganization',
      name: 'Gomal University'
    },
    knowsAbout: [
      'AWS',
      'Terraform',
      'Kubernetes',
      'Docker',
      'CI/CD Pipelines',
      'Cloud Architecture',
      'Ansible',
      'Prometheus',
      'Grafana'
    ]
  };

  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} ${jetbrainsMono.variable}`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
      </head>
      <body>
        <ThemeProvider
          attribute="data-theme"
          defaultTheme="dark"
          enableSystem={true}
          disableTransitionOnChange
        >
          <SmoothScrollProvider>
            <ScrollProgressBar />
            <CustomCursor />
            <div className="ambient-bg" aria-hidden="true">
              <div className="ambient-glow-1" />
              <div className="ambient-glow-2" />
              <div className="grid-pattern" />
            </div>
            {children}
          </SmoothScrollProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
