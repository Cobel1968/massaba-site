import type { Metadata } from 'next'
import './globals.css'
import Navbar from '@/components/navbar'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Massaba Consulting | Connecting People & Opportunities',
  description: 'Expert services in B2B consultancy, education, government liaison, visa services, Omra travel, and vehicle import/export.',
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
        <footer className="border-t border-slate-800 bg-slate-900 py-8 mt-20">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="flex items-center gap-2">
                <img src="/massaba-logo.png" alt="Massaba" className="h-8 w-auto" />
                <span className="text-white font-bold">Massaba Consulting</span>
              </div>
              <p className="text-slate-500 text-sm">
                &copy; {new Date().getFullYear()} All rights reserved.
              </p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  )
}