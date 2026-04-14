'use client'
import Navbar from '@/components/navbar'
import { COMPANY_INFO, SOCIAL_LINKS } from '@/lib/constants'
import Link from 'next/link'
import IntroVideo from '@/components/IntroVideo'
import { useIntroVideo } from '@/hooks/useIntroVideo'

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const { showIntro, handleIntroComplete } = useIntroVideo()

  return (
    <>
      {showIntro && (
        <IntroVideo 
          videoSrc="/videos/intro.mp4" 
          onComplete={handleIntroComplete}
        />
      )}
      <div className={showIntro ? 'hidden' : ''}>
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
                      📷 Instagram
                    </a>
                  )}
                  {SOCIAL_LINKS.facebook && (
                    <a href={SOCIAL_LINKS.facebook} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-amber-500 transition">
                      📘 Facebook
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
      </div>
    </>
  )
}