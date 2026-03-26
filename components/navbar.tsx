'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { User, LogIn, UserPlus, LogOut } from 'lucide-react'
import { supabase } from '@/lib/supabase'

export default function Navbar() {
  const [user, setUser] = useState(null)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null)
    })

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
    })

    return () => subscription.unsubscribe()
  }, [])

  const handleLogout = async () => {
    await supabase.auth.signOut()
  }

  return (
    <nav className="fixed top-0 w-full bg-slate-900/95 backdrop-blur-sm border-b border-slate-800 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <img 
              src="/massaba-logo.png"
              alt="Massaba Consulting"
              className="h-10 w-auto"
            />
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

          {/* Auth Buttons */}
          <div className="flex items-center gap-3">
            {user ? (
              <>
                <Link 
                  href="/portal" 
                  className="flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-slate-900 px-4 py-2 rounded-full text-sm font-bold transition"
                >
                  <User size={16} />
                  Dashboard
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-slate-300 px-3 py-2 rounded-full text-sm transition"
                >
                  <LogOut size={14} />
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link 
                  href="/login" 
                  className="flex items-center gap-2 text-slate-300 hover:text-amber-500 transition text-sm"
                >
                  <LogIn size={14} />
                  Sign In
                </Link>
                <Link 
                  href="/signup" 
                  className="bg-amber-500 hover:bg-amber-600 text-slate-900 px-4 py-2 rounded-full text-sm font-bold transition"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}