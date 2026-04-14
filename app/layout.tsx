import type { Metadata, Viewport } from 'next'
import './globals.css'
import Navbar from '@/components/navbar'
import { COMPANY_INFO, SOCIAL_LINKS } from '@/lib/constants'
import Link from 'next/link'
import ClientLayout from '@/components/ClientLayout'

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
}

export const metadata: Metadata = {
  metadataBase: new URL('https://massaba.app'),
  title: {
    default: 'Massaba Consulting | Connecting People & Opportunities',
    template: '%s | Massaba Consulting'
  },
  description: 'Expert consultancy services in B2B, education, government liaison, visa assistance, Omra travel, and vehicle import/export in UAE.',
  keywords: [
    'Massaba Consulting',
    'B2B consultancy Dubai',
    'education consultancy UAE',
    'government liaison services',
    'visa services UAE',
    'Omra travel packages',
    'vehicle import export Dubai'
  ],
  authors: [{ name: 'Massaba Consulting', url: 'https://massaba.app' }],
  creator: 'Massaba Consulting',
  publisher: 'Massaba Consulting',
  formatDetection: {
    email: true,
    address: true,
    telephone: true,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    title: 'Massaba Consulting | Connecting People & Opportunities',
    description: 'Expert consultancy services in B2B, education, government liaison, visa assistance, Omra travel, and vehicle import/export.',
    url: 'https://massaba.app',
    siteName: 'Massaba Consulting',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Massaba Consulting - Connecting People & Opportunities',
      },
    ],
    locale: 'en_AE',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Massaba Consulting | Connecting People & Opportunities',
    description: 'Expert consultancy services in UAE and globally.',
    images: ['/og-image.jpg'],
    creator: '@massaba',
    site: '@massaba',
  },
  alternates: {
    canonical: 'https://massaba.app',
  },
  category: 'business',
  classification: 'Consultancy Services',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="bg-slate-950">
        <ClientLayout>
          {children}
        </ClientLayout>
      </body>
    </html>
  )
}