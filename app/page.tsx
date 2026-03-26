import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export default function Home() {
  return (
    <div>
      {/* Hero Section */}
      <div className="min-h-[80vh] flex items-center justify-center bg-gradient-to-b from-slate-900 to-slate-950">
        <div className="text-center px-4">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
            Connecting People &{' '}
            <span className="text-amber-500">Opportunities</span>
          </h1>
          <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
            Expert consultancy services in B2B, education, government liaison, visa assistance, 
            Omra travel, and vehicle import/export.
          </p>
          <div className="flex gap-4 justify-center">
            <Link href="/services" className="bg-amber-500 hover:bg-amber-600 text-slate-900 font-semibold px-8 py-3 rounded-full transition">
              Explore Services
            </Link>
            <Link href="/contact" className="border border-amber-500 text-amber-500 hover:bg-amber-500 hover:text-slate-900 font-semibold px-8 py-3 rounded-full transition">
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}