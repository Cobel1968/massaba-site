import type { Metadata, Viewport } from 'next'
import './globals.css'
import Navbar from '@/components/navbar'
import { COMPANY_INFO, SOCIAL_LINKS } from '@/lib/constants'
import Link from 'next/link'
import EnhancedAIAssistant from '@/components/EnhancedAIAssistant'

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
        <Navbar />
        <main className="pt-16">
          {children}
        </main>
        <footer className="border-t border-slate-800 bg-slate-900 py-12">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <img src="/massaba-logo.png" alt="Massaba" className="h-10 w-auto" />
                  <div>
                    <h3 className="text-white font-bold text-lg">Massaba</h3>
                    <p className="text-amber-500 text-xs">Consulting</p>
                  </div>
                </div>
                <p className="text-slate-400 text-sm">
                  Connecting People & Opportunities
                </p>
              </div>
              
              <div>
                <h3 className="text-white font-bold mb-4">Quick Links</h3>
                <ul className="space-y-2">
                  <li><Link href="/" className="text-slate-400 hover:text-amber-500 text-sm transition">Home</Link></li>
                  <li><Link href="/services" className="text-slate-400 hover:text-amber-500 text-sm transition">Services</Link></li>
                  <li><Link href="/about" className="text-slate-400 hover:text-amber-500 text-sm transition">About Us</Link></li>
                  <li><Link href="/contact" className="text-slate-400 hover:text-amber-500 text-sm transition">Contact</Link></li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-white font-bold mb-4">Contact</h3>
                <p className="text-slate-400 text-sm">
                  Tel: {COMPANY_INFO.phone}<br />
                  WhatsApp: {COMPANY_INFO.whatsapp}<br />
                  Email: {COMPANY_INFO.email}
                </p>
              </div>
              
              <div>
                <h3 className="text-white font-bold mb-4">Address</h3>
                <p className="text-slate-400 text-sm">
                  {COMPANY_INFO.address}
                </p>
                <h3 className="text-white font-bold mt-4 mb-2">Business Hours</h3>
                <p className="text-slate-400 text-sm">
                  {COMPANY_INFO.businessHours}
                </p>
                <div className="flex gap-3 mt-4">
                  {SOCIAL_LINKS.instagram && (
                    <a href={SOCIAL_LINKS.instagram} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-amber-500 transition">
                       Instagram
                    </a>
                  )}
                  {SOCIAL_LINKS.facebook && (
                    <a href={SOCIAL_LINKS.facebook} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-amber-500 transition">
                       Facebook
                    </a>
                  )}
                </div>
              </div>
            </div>
            
            <div className="border-t border-slate-800 mt-8 pt-8 text-center">
              <p className="text-slate-500 text-sm">
                &copy; {new Date().getFullYear()} Massaba Consulting. All rights reserved.
              </p>
            </div>
          </div>
        </footer>
        <EnhancedAIAssistant />
      </body>
    </html>
  )
}