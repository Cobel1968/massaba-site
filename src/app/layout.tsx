import type { Metadata } from 'next'
import './globals.css'  // Adjust path if needed
import Navbar from '@/components/navbar'  // Import your navbar

export const metadata: Metadata = {
  title: 'Massaba Global Consultancy | Connecting People & Opportunities',
  description: 'Expert services in B2B consultancy, university placement, government liaison, visa assistance, Omra travel, and vehicle import/export.',
  icons: {
    icon: '/favicon.ico',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body className="antialiased bg-slate-950 text-slate-100 font-sans">
        <Navbar />
        <main className="min-h-screen pt-20"> {/* Add padding for fixed navbar */}
          {children}
        </main>
        <footer className="border-t border-slate-800 bg-slate-950/50 backdrop-blur-sm py-12 text-center text-sm text-slate-400">
          <div className="max-w-7xl mx-auto px-4">
            <p>&copy; {new Date().getFullYear()} Massaba Global Consultancy. Tous droits réservés.</p>
            <p className="mt-2 text-slate-500 text-xs">Connecting People & Opportunities</p>
          </div>
        </footer>
      </body>
    </html>
  )
}