'use client'

import Link from 'next/link'
import Image from 'next/image'
import { User } from 'lucide-react'

export default function Navbar() {
  return (
    <header className="fixed top-0 z-50 w-full border-b border-slate-800 bg-slate-950/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        
        {/* Official Massaba Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="relative h-10 w-10 overflow-hidden rounded-md bg-slate-800/50 flex items-center justify-center border border-slate-700 group-hover:border-amber-500/50 transition-colors">
            <Image
              src="/massaba-logo.png"
              alt="Massaba Global Consultancy"
              width={40}
              height={40}
              className="object-contain p-1"
            />
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-black tracking-tighter text-white uppercase leading-none">Massaba</span>
            <span className="text-[10px] font-mono text-amber-500 uppercase tracking-[0.2em]">Consultancy</span>
          </div>
        </Link>

        {/* Navigation Links */}
        <nav className="hidden items-center gap-8 text-[11px] font-mono uppercase tracking-widest text-slate-400 md:flex">
          <Link href="/" className="transition hover:text-amber-400">Home</Link>
          <Link href="/services" className="transition hover:text-amber-400">Services</Link>
          <Link href="/process" className="transition hover:text-amber-400">Process</Link>
          <Link href="/about" className="transition hover:text-amber-400">About</Link>
          <Link href="/contact" className="transition hover:text-amber-400">Contact</Link>
        </nav>

        {/* Portal Access Button */}
        <div className="flex items-center gap-4">
          <Link 
            href="/portal" 
            className="flex items-center gap-2 rounded-full bg-amber-500 px-6 py-2.5 text-[11px] font-bold uppercase tracking-widest text-slate-900 transition-all hover:bg-amber-600 hover:shadow-lg hover:shadow-amber-500/25 active:scale-95"
          >
            <User className="h-3.5 w-3.5" />
            Client Portal
          </Link>
        </div>
      </div>
    </header>
  )
}