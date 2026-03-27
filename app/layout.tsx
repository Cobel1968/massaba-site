import type { Metadata } from 'next'
import './globals.css'
import Navbar from '@/components/navbar'
import { COMPANY_INFO, SOCIAL_LINKS } from '@/lib/constants'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Massaba Consulting | Connecting People & Opportunities',
  description: 'Expert services in B2B consultancy, university placement, government liaison, visa assistance, Omra travel, and vehicle import/export.',
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
              {/* Logo Section */}
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
              
              {/* Quick Links */}
              <div>
                <h3 className="text-white font-bold mb-4">Quick Links</h3>
                <ul className="space-y-2">
                  <li><Link href="/" className="text-slate-400 hover:text-amber-500 text-sm transition">Home</Link></li>
                  <li><Link href="/services" className="text-slate-400 hover:text-amber-500 text-sm transition">Services</Link></li>
                  <li><Link href="/about" className="text-slate-400 hover:text-amber-500 text-sm transition">About Us</Link></li>
                  <li><Link href="/contact" className="text-slate-400 hover:text-amber-500 text-sm transition">Contact</Link></li>
                </ul>
              </div>
              
              {/* Contact Info */}
              <div>
                <h3 className="text-white font-bold mb-4">Contact</h3>
                <p className="text-slate-400 text-sm">
                  Tel: {COMPANY_INFO.phone}<br />
                  WhatsApp: {COMPANY_INFO.whatsapp}<br />
                  Email: {COMPANY_INFO.email}
                </p>
              </div>
              
              {/* Address & Hours */}
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
      </body>
    </html>
  )
}