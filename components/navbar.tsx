'use client'

import Link from 'next/link'
import { User } from 'lucide-react'

export default function Navbar() {
  return (
    <nav className="fixed top-0 w-full bg-slate-900/95 backdrop-blur-sm border-b border-slate-800 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Massaba Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center border border-slate-700 group-hover:border-amber-500 transition-all overflow-hidden">
              <img 
                src="/massaba-logo.png"
                alt="Massaba Consulting"
                className="w-full h-full object-contain"
              />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-black tracking-tighter text-white uppercase leading-none">Massaba</span>
              <span className="text-[10px] font-mono text-amber-500 uppercase tracking-[0.2em] font-semibold">Consulting</span>
            </div>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center gap-8">
            <Link href="/" className="text-slate-300 hover:text-amber-500 transition text-sm font-medium">Home</Link>
            <Link href="/services" className="text-slate-300 hover:text-amber-500 transition text-sm font-medium">Services</Link>
            <Link href="/process" className="text-slate-300 hover:text-amber-500 transition text-sm font-medium">Process</Link>
            <Link href="/about" className="text-slate-300 hover:text-amber-500 transition text-sm font-medium">About</Link>
            <Link href="/contact" className="text-slate-300 hover:text-amber-500 transition text-sm font-medium">Contact</Link>
          </div>

          {/* Portal Button */}
          <Link 
            href="/portal" 
            className="flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-slate-900 px-4 py-2 rounded-full text-sm font-bold transition"
          >
            <User size={16} />
            Client Portal
          </Link>
        </div>
      </div>
    </nav>
  )
}